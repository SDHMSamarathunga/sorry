import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function FinalPage({ partnerName, onNavigate }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [blobUrl, setBlobUrl] = useState('/sorry.png');
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    // Fire festive confetti cannon on load!
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Pre-fetch /sorry.png image immediately when component mounts
    // This solves user-gesture expiration issues on mobile & Netlify
    fetch('/sorry.png')
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'sorry.png', { type: 'image/png' });
        setImageFile(file);
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        setIsPreloading(false);
      })
      .catch((err) => {
        console.error('Image pre-fetch error:', err);
        setIsPreloading(false);
      });
  }, []);

  const handleShareClick = async () => {
    // Try native Web Share API directly if image file is ready
    if (
      imageFile &&
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [imageFile] })
    ) {
      try {
        await navigator.share({
          title: 'We are happy now! ❤️',
          text: `සමාව දුන්නා! ❤️ - for ${partnerName || 'මගේ මැණික'}`,
          files: [imageFile],
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Web share native error, opening modal:', err);
          setIsShareModalOpen(true);
        }
        return;
      }
    }

    // Fallback: Open modal immediately
    setIsShareModalOpen(true);
  };

  const shareText = `සමාව දුන්නා! ❤️ - We are happy now! ${window.location.origin}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShareFromModal = async () => {
    if (imageFile && navigator.share) {
      try {
        await navigator.share({
          title: 'We are happy now! ❤️',
          text: `සමාව දුන්නා! ❤️ - for ${partnerName || 'මගේ මැණික'}`,
          files: [imageFile],
        });
      } catch (err) {
        console.log('Modal share error:', err);
      }
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 py-4 sm:py-6 max-w-3xl mx-auto text-center px-4">
      {/* Celebration Header */}
      <div className="space-y-4">
        <div className="inline-flex p-4 rounded-full bg-gradient-to-tr from-rose-500/20 to-pink-500/20 border border-rose-500/30 text-5xl sm:text-6xl animate-bounce">
          💖
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          ස්තූතියි මගේ{' '}
          <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent">
            {partnerName || 'රත්තරං'}!
          </span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-base max-w-lg mx-auto leading-relaxed font-medium">
          ඔයා මට සමාව දුන්න එක ගැන මගේ හදවතින්ම ගොඩක් ස්තූතියි! ඔයා නැතුව මගේ ලෝකේ කිසිම ලස්සනක් නෑ.. මම ඔයාට ගොඩාක් ආදරෙයි! 🌹✨
        </p>
      </div>

      {/* Love Certificate Card */}
      <div className="glass-card-pink rounded-3xl p-5 sm:p-8 border-2 border-rose-500/40 relative overflow-hidden shadow-2xl space-y-6">
        <div className="text-[10px] sm:text-xs font-mono tracking-widest text-rose-300 uppercase">
          OFFICIAL CERTIFICATE OF FORGIVENESS ❤️
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            සමාව දීමේ නිල සහතිකය
          </h3>
          <p className="text-xs text-rose-200 leading-relaxed max-w-md mx-auto">
            මෙම සහතිකයෙන් තහවුරු කරනුයේ {partnerName || 'මගේ මැණික'} විසින් සියලු තරහ මරහ අමතක කර සමාව දුන් බවයි!
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 sm:gap-6 py-4 border-y border-rose-500/20">
          <div>
            <span className="text-[10px] sm:text-xs text-slate-400 block">දිනය:</span>
            <span className="text-xs sm:text-sm font-bold text-white">අද දිනයේ සිට සදාකාලයටම ❤️</span>
          </div>
          <div className="h-8 w-px bg-rose-500/20" />
          <div>
            <span className="text-[10px] sm:text-xs text-slate-400 block">තත්වය:</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400">සමාව දුන්නා ✓</span>
          </div>
        </div>

        {/* Customized Green Forgiveness Share Button */}
        <div className="pt-2">
          <button
            onClick={handleShareClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/40"
          >
            <span className="text-lg">💌</span>
            <span>සමාව දුන්නා නම් මේක මට එවන්න ❤️</span>
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          🏠 මුල් පිටුවට (Home)
        </button>

        <button
          onClick={() => confetti({ particleCount: 100, spread: 70 })}
          className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition-colors cursor-pointer"
        >
          ✨ තව Confetti පාරක්!
        </button>
      </div>

      {/* Share / Download Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-sm bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-center space-y-4 my-auto">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1 pt-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                ආදරණීය පින්තූරය Share කරන්න! 💌
              </h3>
              <p className="text-xs text-rose-300">
                පහත පින්තූරය Download කරගෙන හෝ Direct Share කරන්න
              </p>
            </div>

            {/* Display /sorry.png Preview Image */}
            <div className="p-2 rounded-2xl bg-slate-950 border border-slate-800 relative min-h-[160px] flex items-center justify-center">
              {isPreloading ? (
                <div className="text-xs text-slate-400 animate-pulse">Image Loading...</div>
              ) : (
                <img
                  src={blobUrl}
                  alt="I forgive you!"
                  className="w-full h-auto rounded-xl object-contain max-h-56 mx-auto shadow-md"
                />
              )}
            </div>

            <div className="space-y-2 pt-1">
              {imageFile && navigator.share && (
                <button
                  onClick={handleNativeShareFromModal}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                >
                  <span>📲</span>
                  <span>Direct Image Share කරන්න (Apps / WhatsApp)</span>
                </button>
              )}

              <a
                href={blobUrl}
                download="sorry.png"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>📥</span>
                <span>පින්තූරය (sorry.png) Download කරගන්න</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>💬</span>
                <span>WhatsApp වෙත message එකක් යවන්න</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer"
              >
                {copied ? '✓ Link එක Copy විය!' : '📋 App Link එක Copy කරන්න'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
