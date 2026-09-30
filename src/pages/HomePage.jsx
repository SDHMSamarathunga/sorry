import React from 'react';
import EvasiveButton from '../components/EvasiveButton';

export default function HomePage({ partnerName, unlockedTabs = ['home'], onNavigate, onForgive }) {
  const isApologyUnlocked = unlockedTabs.includes('apology');
  const isPromisesUnlocked = unlockedTabs.includes('promises');

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="relative inline-block">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-rose-500/30 via-pink-500/20 to-purple-500/20 p-1.5 shadow-2xl shadow-rose-500/30 mx-auto animate-float">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl sm:text-7xl border border-rose-500/40 shadow-inner">
              🥺
            </div>
          </div>
          <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-rose-300/30 animate-pulse">
            සමාවෙන්න! ❤️
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            අනේ මට සමාවෙන්න,{' '}
            <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent underline decoration-rose-500/50 decoration-wavy decoration-2">
              {partnerName || 'මගේ මැණික'}
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            මම කරපු වැරැද්දට මට ඇත්තටම ගොඩක් කනගාටුයි.. ඔයා නැතුව මට පාලුයි. මගේ හදවතින්ම ඉල්ලන්නේ එකම එක සමාවයි! 🌹
          </p>
        </div>
      </section>

      {/* The Evasive Button Section */}
      <section className="glass-card-pink rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          ඔයා මට සමාව දෙනවද? 🥺
        </h2>

        <EvasiveButton onForgive={onForgive} partnerName={partnerName} />
      </section>

      {/* Quick Navigation Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          disabled={!isApologyUnlocked}
          onClick={() => isApologyUnlocked && onNavigate('apology')}
          className={`glass-card rounded-2xl p-5 text-left transition-all group relative overflow-hidden ${isApologyUnlocked
              ? 'hover:border-rose-500/50 hover:bg-slate-900/80 cursor-pointer'
              : 'opacity-40 cursor-not-allowed border-slate-800 bg-slate-950/40 pointer-events-none'
            }`}
        >
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
            💌
          </div>
          <h3 className="font-bold text-white text-base mb-1">
            ආදරණීය ලියුම
          </h3>
          <p className="text-xs text-slate-400">
            මම ඔයා වෙනුවෙන් ලියපු විශේෂ ආදර ලියුම කියවන්න...
          </p>
        </button>

        <button
          disabled={!isPromisesUnlocked}
          onClick={() => isPromisesUnlocked && onNavigate('promises')}
          className={`glass-card rounded-2xl p-5 text-left transition-all group relative overflow-hidden ${isPromisesUnlocked
              ? 'hover:border-rose-500/50 hover:bg-slate-900/80 cursor-pointer'
              : 'opacity-40 cursor-not-allowed border-slate-800 bg-slate-950/40 pointer-events-none'
            }`}
        >
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
            🎁
          </div>
          <h3 className="font-bold text-white text-base mb-1">
            පොරොන්දු & කූපන්
          </h3>
          <p className="text-xs text-slate-400">
            ඔයා වෙනුවෙන් මම දෙන පොරොන්දු සහ නොමිලේ කූපන් ලබාගන්න...
          </p>
        </button>
      </section>
    </div>
  );
}
