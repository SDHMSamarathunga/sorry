import React, { useState, useEffect, useRef } from 'react';

export default function EvasiveButton({ onForgive, partnerName }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const noBtnRef = useRef(null);
  const lastEvadeRef = useRef(0);

  const evadeMessages = [
    'නෑ, තරහයි! 😤',
    'හිතන්නවත් එපා 😜',
    'තවම තරහයි! 🙈',
    'අනේ බෑ බෑ 🙈',
    'ඇල්ලුවොත් තමයි 🏃‍♂️',
    'අනේ ප්ලීස්.. 🥺',
    'හදවත රිදෙනවා 💔',
    'සමාව දෙන්නකෝ ❤️',
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!noBtnRef.current) return;

      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dx = btnCenterX - e.clientX;
      const dy = btnCenterY - e.clientY;
      const dist = Math.hypot(dx, dy);

      // Trigger smooth evasion when mouse gets within 130px
      if (dist < 130) {
        const now = Date.now();
        if (now - lastEvadeRef.current < 50) return;
        lastEvadeRef.current = now;

        let angle = Math.atan2(dy, dx);
        if (dist === 0) angle = Math.random() * Math.PI * 2;

        const pushDist = 110;
        let nextX = offset.x + Math.cos(angle) * pushDist;
        let nextY = offset.y + Math.sin(angle) * pushDist;

        // Bound offsets so button stays 100% visible inside view
        const limitX = Math.min(320, window.innerWidth / 2 - 100);
        const limitY = 120;

        if (Math.abs(nextX) > limitX) {
          nextX = -nextX * 0.6;
        }
        if (Math.abs(nextY) > limitY) {
          nextY = -nextY * 0.6;
        }

        setOffset({ x: nextX, y: nextY });
        setHoverCount((prev) => prev + 1);

        // Controlled button scaling (capped for mobile responsiveness)
        const isMobile = window.innerWidth <= 768;
        const maxScale = isMobile ? 1.25 : 1.8;
        setYesScale((prev) => Math.min(prev + 0.05, maxScale));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [offset]);

  const currentNoText = evadeMessages[hoverCount % evadeMessages.length];

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-2 relative w-full">
      {/* Yes Button (Grows moderately) */}
      <button
        id="green-forgive-button"
        onClick={onForgive}
        style={{ transform: `scale(${yesScale})` }}
        className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white font-bold text-sm sm:text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 z-10"
      >
        <span>🥰</span>
        <span>සමාව දුන්නා, {partnerName}!</span>
        <span>❤️</span>
      </button>

      {/* Smoothly Evasive No Button */}
      <div className="relative flex justify-center items-center w-full min-h-[50px]">
        <button
          ref={noBtnRef}
          onClick={(e) => e.preventDefault()}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.22s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="px-6 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 font-semibold text-sm hover:border-rose-500/60 hover:text-rose-300 shadow-2xl select-none cursor-not-allowed whitespace-nowrap backdrop-blur-md opacity-100 z-20 pointer-events-auto"
        >
          {currentNoText}
        </button>
      </div>
    </div>
  );
}
