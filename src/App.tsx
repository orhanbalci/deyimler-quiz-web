import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
  };

  return (
    <div className="min-h-screen">
      {!gameStarted ? (
        <LandingPage onStartQuiz={() => setGameStarted(true)} />
      ) : (
        <Quiz onFinish={handleQuizComplete} />
      )}
    </div>
  );
}

export default App;