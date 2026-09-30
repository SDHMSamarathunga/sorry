import React from 'react';
import CouponCard from '../components/CouponCard';

export default function PromisesPage({ partnerName, onNavigate }) {
  const promises = [
    { id: 1, text: 'ආයේ කවදාවත් ඔයාට නොකියා තරහ ගස්සන්නේ නෑ ✨' },
    { id: 2, text: 'ඔයා කියන හැමදේම අවධානයෙන් අහගෙන ඉන්නවා 👂' },
    { id: 3, text: 'ඔයාගේ කෑම වේලට කැමතිම කෑමක් අරන් දෙනවා 🍔' },
    { id: 4, text: 'දිනපතා Good Morning & Good Night Msg එවනවා 📱' },
    { id: 5, text: 'ඔයා එක්ක වැඩිපුර කාලය ගත කරනවා ⏰' },
    { id: 6, text: 'හැමදාම ඔයාට ආදරෙයි කියලා මතක් කරනවා 🌹' },
  ];

  const coupons = [
    {
      id: 'coupon-1',
      icon: '🍦',
      title: 'නොමිලේ අයිස්ක්‍රීම් එකක්',
      description: 'ඔයාට කැමතිම flavour එකකින් අයිස්ක්‍රීම් එකක් ලබාගන්නා කූපනයකි!',
    },
    {
      id: 'coupon-2',
      icon: '🤫',
      title: 'තරහ නොවී අහගෙන ඉන්න පැයක්',
      description: 'ඔයා ඕනෑම දෙයක් කියන විට මම තරහ නොවී අහගෙන ඉන්නා බවට සහතිකයකි.',
    },
    {
      id: 'coupon-3',
      icon: '🍔',
      title: 'කැමතිම කෑම වේලක් (Food Treat)',
      description: 'ඔයා ආසම රෙස්ටුරන්ට් එකකින් කැමතිම කෑම එකක් අරන් දීමේ කූපනය.',
    },
    {
      id: 'coupon-4',
      icon: '🤗',
      title: 'අසීමිත Hugs & Huggy Treat',
      description: 'ඔයාට ඕනෑම වෙලාවක ලැබෙන ආදරණීය වැලඳගැනීම් කූපනය.',
    },
    {
      id: 'coupon-5',
      icon: '🎬',
      title: 'Movie Night & Popcorn',
      description: 'ඔයා තෝරන චිත්‍රපටයක් බලන්න එකතු වෙන විශේෂ රාත්‍රියක්.',
    },
    {
      id: 'coupon-6',
      icon: '👑',
      title: 'Queen/King For A Day Voucher',
      description: 'මුළු දවසම ඔයා කියන ඕනෑම දෙයකට පිටුපාන්නේ නැතිව ඉටුකරදීමේ කූපනය.',
    },
  ];

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
          🎁 පොරොන්දු & නොමිලේ කූපන්
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          මම ඔයාට දෙන පොරොන්දු..
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          මගේ {partnerName || 'මැණික'} වෙනුවෙන් මම දෙන සැබෑ පොරොන්දු සහ ලබාගත හැකි කූපන් පත් ❤️
        </p>
      </div>

      {/* Promises Section (Clean cards without checkboxes) */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-rose-500/20 space-y-4">
        <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
          <span>✨</span>
          <span>මගේ පොරොන්දු ලැයිස්තුව (Promises Checklist):</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {promises.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 transition-all hover:border-rose-500/40"
            >
              <span className="text-xs sm:text-sm font-medium">{p.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Coupons Section */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">
            ඔයා වෙනුවෙන් විශේෂ Apology Coupons 🎟️
          </h3>
          <p className="text-xs text-slate-400">
            ඔයා වෙනුවෙන් විශේෂයෙන් සැකසූ කූපන් පත් 6ක්!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <CouponCard key={c.id} coupon={c} />
          ))}
        </div>
      </section>

      {/* Next Step */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('final')}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm shadow-xl shadow-rose-500/30 hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>💖 ආදරය ප්‍රකාශයට යන්න ➡️</span>
        </button>
      </div>
    </div>
  );
}
