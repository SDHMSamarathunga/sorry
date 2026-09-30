import React, { useMemo } from 'react';

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 24 + 12,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
      emoji: ['❤️', '💖', '💕', '💗', '🌸', '✨', '🥺'][Math.floor(Math.random() * 7)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float"
          style={{
            left: `${h.left}%`,
            top: `-5%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationIterationCount: 'infinite',
            transform: `translateY(${Math.random() * 100}vh)`,
          }}
        >
          {h.emoji}
        </div>
      ))}
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </div>
  );
}
