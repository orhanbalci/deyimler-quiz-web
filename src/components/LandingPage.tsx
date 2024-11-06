import React from 'react';
import { Brain, Trophy, Users, ArrowRight } from 'lucide-react';

export default function LandingPage({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <div className="min-h-screen bg-secondary text-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Brain className="w-16 h-16 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-900 to-primary-600">
            Atasözü Yarışması
          </h1>
          <p className="text-lg md:text-xl text-secondary-light mb-8">
            Türk Atasözlerini Ne Kadar İyi Biliyorsun?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: <Brain className="w-8 h-8" />,
              title: "Kültürünü Keşfet",
              description: "Atasözlerimizin derinliklerine in"
            },
            {
              icon: <Trophy className="w-8 h-8" />,
              title: "Kendini Test Et",
              description: "Bilgini ölç ve geliştir"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Paylaş ve Yarış",
              description: "Arkadaşlarınla skorunu karşılaştır"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-secondary/50 rounded-xl p-6 hover:bg-secondary/70 transition-all border border-secondary-light/20">
              <div className="text-primary-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-secondary-light">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-600 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-secondary/50 rounded-2xl p-8 text-center border border-secondary-light/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Atasözü Bilgini Test Et!</h2>
            <p className="text-secondary-light mb-6">Türk kültürünün zengin atasözleri dünyasına hoş geldin</p>
            <button
              onClick={onStartQuiz}
              className="group bg-gradient-to-r from-primary-900 to-primary-600 text-cream px-8 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-primary-900 transition-all flex items-center justify-center mx-auto"
            >
              Yarışmaya Başla
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}