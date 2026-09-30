import React from 'react';

export default function Navbar({ activeTab, setActiveTab, unlockedTabs = ['home'], isMuted, toggleAudio }) {
  const navItems = [
    { id: 'home', label: 'මුල් පිටුව', icon: '🏠' },
    { id: 'apology', label: 'සමාව ඉල්ලීම', icon: '💌' },
    { id: 'promises', label: 'පොරොන්දු & කූපන්', icon: '🎁' },
    { id: 'final', label: 'ආදරය ප්‍රකාශය', icon: '💖' },
  ];

  return (
    <header className="sticky top-3 z-50 px-4 flex justify-center w-full">
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-full bg-slate-950/80 border border-slate-800 backdrop-blur-xl shadow-2xl shadow-rose-950/30 max-w-full overflow-x-auto scrollbar-none">
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isUnlocked = unlockedTabs.includes(item.id);

            return (
              <button
                key={item.id}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && setActiveTab(item.id)}
                title={!isUnlocked ? 'ලොක් කර ඇත 🔒 (පළමුව සමාව ලබාදෙන්න)' : item.label}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  !isUnlocked
                    ? 'opacity-40 cursor-not-allowed text-slate-500 bg-slate-900/40 border border-transparent'
                    : isActive
                    ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-lg shadow-rose-500/40 scale-105 cursor-pointer'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80 cursor-pointer'
                }`}
              >
                <span className="text-sm">{!isUnlocked ? '🔒' : item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 pl-2 border-l border-slate-800 shrink-0">
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full text-xs transition-colors cursor-pointer ${
              !isMuted ? 'text-rose-400 bg-rose-500/20' : 'text-slate-400 hover:bg-slate-800'
            }`}
            title={isMuted ? 'සංගීතය ဖွင့်න්න' : 'සංගීතය නවත්වන්න'}
          >
            {isMuted ? '🔇' : '🎵'}
          </button>
        </div>
      </div>
    </header>
  );
}
