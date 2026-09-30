import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function GamePage({ partnerName, onNavigate, onForgive }) {
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [targets, setTargets] = useState([]);

  const targetEmojis = ['❤️', '💖', '💗', '🌸', '✨', '🧸'];

  // Spawn game targets
  useEffect(() => {
    if (gameWon) return;

    const interval = setInterval(() => {
      if (targets.length < 6) {
        const newTarget = {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 15,
          emoji: targetEmojis[Math.floor(Math.random() * targetEmojis.length)],
          size: Math.floor(Math.random() * 20) + 30,
        };
        setTargets((prev) => [...prev, newTarget]);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [targets, gameWon]);

  const handleCatch = (id) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
    const newScore = score + 15;
    setScore(newScore);

    if (newScore >= 100) {
      setGameWon(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameWon(false);
    setTargets([]);
  };

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          🎮 Forgiveness Mini-Game
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          හදවත් එකතු කිරීමේ ගේම් එක!
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          පහත වැටෙන හදවත් Click කරලා මීටරය 100% පුරවා {partnerName || 'මැණික'}ගේ සමාව ලබාගන්න!
        </p>
      </div>

      {/* Game Stage Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Top Game Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 z-10">
          <div>
            <span className="text-xs text-purple-300 font-bold uppercase block">
              ආදර මීටරය (Love Meter)
            </span>
            <div className="w-48 sm:w-64 h-3.5 bg-slate-950 rounded-full overflow-hidden border border-purple-500/30 mt-1">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 transition-all duration-300"
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-white font-mono">
              {Math.min(score, 100)}%
            </span>
            <button
              onClick={resetGame}
              className="block text-[11px] text-slate-400 hover:text-white underline mt-0.5"
            >
              නැවත මුල සිට 🔄
            </button>
          </div>
        </div>

        {/* Game Play Area */}
        {!gameWon ? (
          <div className="relative flex-1 my-4 min-h-[260px] cursor-crosshair">
            {targets.map((t) => (
              <button
                key={t.id}
                onClick={() => handleCatch(t.id)}
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  fontSize: `${t.size}px`,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-bounce cursor-pointer hover:scale-125 active:scale-90 transition-transform select-none focus:outline-none"
              >
                {t.emoji}
              </button>
            ))}

            {targets.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 animate-pulse">
                හදවත් මතුවෙමින් පවතී... 💖
              </div>
            )}
          </div>
        ) : (
          /* Game Win State */
          <div className="my-8 text-center space-y-4 animate-fade-in z-20">
            <div className="text-6xl animate-bounce">🎉🥰💖</div>
            <h3 className="text-2xl font-bold text-white">
              සුභ පැතුම්! ඔයා ආදර මීටරය 100% කලා!
            </h3>
            <p className="text-sm text-purple-200 max-w-sm mx-auto">
              දැන් තරහ ඔක්කොම ඉවරයි! {partnerName || 'මැණික'}ගේ සමාව සම්පූර්ණයෙන්ම ලැබුනා!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onForgive}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 hover:brightness-110 active:scale-95 transition-all"
              >
                🥰 සමාව තහවුරු කරන්න
              </button>
              <button
                onClick={() => onNavigate('final')}
                className="px-6 py-3.5 rounded-2xl bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-500/30 hover:bg-rose-400 transition-all"
              >
                අවසන් පිටුවට යන්න 💖
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
          💡 හදවත් 7ක් Click කරලා 100% සම්පූර්ණ කරන්න!
        </div>
      </div>
    </div>
  );
}
