import React, { useState, useEffect } from "react";
import { ChevronRight, Timer, AlertCircle, Loader2 } from "lucide-react";
import type { Proverb, Question } from "../types/quiz";
import ScoreCard from "./ScoreCard";
import { Helmet } from "react-helmet";

export default function Quiz({
  onFinish,
}: {
  onFinish: (score: number) => void;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(
    "Atasözleri Ve Deyimler Anlamları",
  );

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        "https://pv-api-zj7q.shuttle.app/proverb/quiz",
      );
      const data = await response.json();
      console.log(JSON.stringify(data.questions));
      if (!Array.isArray(data.questions)) {
        throw new Error("Sorular yüklenirken bir hata oluştu");
      }

      setQuestions(
        data.questions.map((proverb: Proverb, index: number) => ({
          id: index + 1, // Generate an id based on the index
          question: proverb.proverb,
          options: proverb.options,
          correct_answer: proverb.correct_meaning,
          answered: false,
        })),
      );
    } catch (err) {
      setError("Sorular yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);

    const isCorrect =
      questions[currentQuestion].options[optionIndex] ===
      questions[currentQuestion].correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTitle(questions[currentQuestion + 1].question + " anlamı nedir?");
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        onFinish(score + (isCorrect ? 1 : 0));
      }
      questions[currentQuestion].answered = true;
    }, 2000);
  };

  const getOptionStyle = (index: number) => {
    if (selectedAnswer === null) return "!bg-secondary/50";
    const correctAnswerIndex = questions[currentQuestion].options.indexOf(
      questions[currentQuestion].correct_answer,
    );
    if (index === correctAnswerIndex) return "!bg-green-600";
    if (selectedAnswer === index) return "!bg-primary-600";
    return "!bg-secondary/50";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary text-cream flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Atasözleri yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary text-cream flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-primary-600" />
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={fetchQuestions}
            className="bg-gradient-to-r from-primary-900 to-primary-600 text-cream px-6 py-2 rounded-full font-semibold hover:from-primary-600 hover:to-primary-900 transition-all"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) return null;

  return (
    <div className="min-h-screen bg-secondary text-cream p-4">
      <div className="max-w-2xl mx-auto">
        {!showResult ? (
          <>
            <Helmet>
              <title> {title} </title>
              <meta name="description" content={title} />
              <meta name="keywords" content={title} />
            </Helmet>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary-600" />
                <span className="text-sm">
                  Soru {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <div className="bg-secondary/50 px-4 py-1 rounded-full text-sm border border-secondary-light/20">
                Puan: {score}
              </div>
            </div>

            <div className="bg-secondary/50 rounded-xl p-6 mb-6 border border-secondary-light/20">
              <div className="text-sm text-primary-600 mb-2">
                Türk Atasözleri ve Deyimleri
              </div>
              <h2 className="text-xl font-semibold mb-4">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      selectedAnswer === null && handleAnswer(index)
                    }
                    className={`w-full text-left p-4 rounded-lg transition-all ${getOptionStyle(
                      index,
                    )} hover:bg-secondary/70 flex items-center justify-between ${
                      selectedAnswer !== null
                        ? "cursor-default"
                        : "cursor-pointer"
                    } border border-secondary-light/20`}
                    disabled={selectedAnswer !== null}
                  >
                    <span>{option}</span>
                    <ChevronRight
                      className={`w-5 h-5 ${
                        selectedAnswer === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-secondary-light">
              <AlertCircle className="w-4 h-4" />
              <span>
                Cevabınızı dikkatli seçin - seçtikten sonra değiştiremezsiniz!
              </span>
            </div>
          </>
        ) : (
          <ScoreCard score={score} totalQuestions={questions.length} />
        )}
      </div>
    </div>
  );
}
