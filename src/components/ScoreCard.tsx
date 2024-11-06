import React from 'react';
import { Twitter, Trophy, ArrowRight } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  totalQuestions: number;
}

export default function ScoreCard({ score, totalQuestions }: ScoreCardProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const getMessage = () => {
    if (percentage === 100) return 'Mükemmel! Bir dahisin! 🏆';
    if (percentage >= 80) return 'Harika! Çok iyisin! 🌟';
    if (percentage >= 60) return 'Güzel! Gelişiyorsun! 👏';
    if (percentage >= 40) return 'Fena değil! Devam et! 💪';
    return 'Daha iyisini yapabilirsin! 🎯';
  };

  // const shareOnTwitter = () => {
  //   const text = `BilgiYarışı'nda ${score}/${totalQuestions} puan aldım! ${getMessage()} Siz de deneyin:`;
  //   const url = window.location.href;
  //   const imageUrl = `https://og-image.vercel.app/**${encodeURIComponent(
  //     `BilgiYarışı Skorum: ${score}/${totalQuestions}`
  //   )}**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;

  //   const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  //     imageUrl
  //   )}&cards=summary_large_image`;

  //   window.open(twitterUrl, '_blank');
  // };

  return (
    <div className="text-center py-12">
      <Trophy className="w-16 h-16 mx-auto mb-6 text-cream" />
      <h2 className="text-3xl font-bold mb-4">Yarışma Tamamlandı!</h2>
      <div className="mb-8">
        <p className="text-4xl font-bold mb-2">
          {score}/{totalQuestions}
        </p>
        <p className="text-xl text-primary-600">{getMessage()}</p>
      </div>

      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        {/* <button
          onClick={shareOnTwitter}
          className="group bg-secondary-light text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary-light/90 transition-all flex items-center justify-center gap-2"
        >
          <Twitter className="w-5 h-5" />
          Twitter'da Paylaş
        </button>
         */}
        <button
          onClick={() => window.location.reload()}
          className="group bg-gradient-to-r from-primary-900 to-primary-600 text-cream px-8 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-primary-900 transition-all flex items-center justify-center gap-2"
        >
          Tekrar Dene
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
