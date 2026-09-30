import React, { useState } from 'react';

export default function ApologyPage({ partnerName, onNavigate, onForgive }) {
  const [isOpen, setIsOpen] = useState(false);

  const reasons = [
    {
      id: 1,
      title: 'ඔයාගේ ලස්සන හිනාව 🌸',
      desc: 'ඔයා හිනාවෙනකොට මුළු ලෝකෙම එලිය වෙනවා වගේ මට දැනෙනවා. ඒ හිනාව නැතුව මට ඉන්න බෑ.',
    },
    {
      id: 2,
      title: 'ඔයාගේ හදවතේ තියෙන ආදරේ ❤️',
      desc: 'මම වැරදි කරත් ඔයා මට දක්වන කරුණාව සහ ආදරේ තරම් වටිනා දෙයක් මගේ ජීවිතේ තවත් නෑ.',
    },
    {
      id: 3,
      title: 'මගේ මුළු ලෝකයම ඔයා 🌍',
      desc: 'මගේ ජීවිතේ හැම සතුටක් පිටුපසම ඉන්නේ ඔයා. ඔයා තරහින් ඉන්නකොට මගේ මුළු ලෝකෙම නතර වෙනවා.',
    },
    {
      id: 4,
      title: 'ආයෙ කවදාවත් රිදවන්නේ නෑ ✨',
      desc: 'මම මේ කරපු වැරැද්දෙන් පාඩමක් ඉගෙන ගත්තා. ආයෙ කවදාවත් ඔයාගේ ඇසට කඳුලක් ගේන්නේ නෑ.',
    },
  ];

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
          💌 විශේෂ සමාව ඉල්ලීමේ ලියුම
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          මගේ හදවතින්ම ලියූ ලියුම..
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          පහත තියෙන ලියුම් කවරය click කරලා ලියුම ඇරලා බලන්න 🥺
        </p>
      </div>

      {/* Interactive Envelope Letter */}
      <div className="flex justify-center">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-full max-w-md bg-gradient-to-br from-rose-900/60 via-slate-900 to-pink-950/60 border-2 border-rose-500/40 rounded-3xl p-8 text-center cursor-pointer shadow-2xl hover:border-rose-400 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform animate-float">
              💌
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {partnerName || 'මගේ රත්තරං'} වෙත..
            </h3>
            <p className="text-xs text-rose-300/80 mb-6 font-medium">
              (ලියුම ඇරීමට මෙතන Click කරන්න ✨)
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-500/30 group-hover:bg-rose-400 transition-colors">
              <span>ලියුම කියවන්න</span>
              <span>✉️</span>
            </div>
          </button>
        ) : (
          <div className="w-full max-w-2xl bg-gradient-to-b from-rose-950/40 via-slate-900 to-slate-950 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-rose-950 relative animate-fade-in space-y-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
            >
              ලියුම වසන්න ✕
            </button>

            <div className="flex items-center gap-3 border-b border-rose-500/20 pb-4">
              <span className="text-3xl">🌹</span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-rose-300">
                  ආදරණීය {partnerName || 'මගේ මැණික'},
                </h3>
                <span className="text-xs text-slate-400">
                  මගේ හදවතේ ගැඹුරුම තැනින්..
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium">
              <p>
                මම කරපු වැරැද්ද නිසා ඔයාගේ හිත රිදුනා නේද? ඒ ගැන මට ඇත්තටම ගොඩක් දුකයි. මගේ අතින් එහෙම දෙයක් වුනේ ඔයාව රිදවන්න හිතාගෙන නෙමෙයි.. 🥺
              </p>
              <p>
                ඔයා නැති ජීවිතයක් ගැන මට හිතන්නවත් බෑ. ඔයාගේ හිනාව, ඔයාගේ කතාබහ, ඔයා මට දක්වන ආදරේ තමයි මගේ මුළු ජීවිතේම සතුට. ඔයා තරහින් ඉන්න හැම තත්පරයක්ම මට මහ ගොඩක් බරයි.
              </p>
              <p className="bg-rose-500/10 border-l-4 border-rose-500 p-4 rounded-r-2xl italic text-rose-200 text-sm">
                "මම පොරොන්දු වෙනවා ආයෙ කවදාවත් මේ වගේ දෙයකින් ඔයාගේ හිත රිදවන්නේ නෑ කියලා. අනේ මට මේ එකම එක පාරක් සමාව දෙන්න.." ❤️
              </p>
              <p className="text-right text-rose-300 font-bold">
                සමාව ඉල්ලන,
                <br />
                ඔයාගේම ආදරණීය එක්කෙනා.. 💖
              </p>
            </div>

            <div className="pt-4 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={onForgive}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 hover:brightness-110 active:scale-95 transition-all"
              >
                🥰 මම සමාව දුන්නා!
              </button>

              <button
                onClick={() => onNavigate('promises')}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-xs border border-slate-700 transition-all"
              >
                ඊළඟ පිටුව: පොරොන්දු බලන්න ➡️
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reasons Why You Should Forgive Me Grid */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-center text-white">
          ඔයා මට විශේෂ වෙන්නේ ඇයි? 💖
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <div
              key={r.id}
              className="glass-card rounded-2xl p-5 border border-rose-500/20 hover:border-rose-500/40 transition-all space-y-2"
            >
              <h4 className="font-bold text-rose-300 text-base flex items-center gap-2">
                <span>{r.title}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
