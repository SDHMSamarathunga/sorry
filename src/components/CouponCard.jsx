import React from 'react';

export default function CouponCard({ coupon }) {
  return (
    <div className="relative rounded-3xl p-5 border glass-card hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-950/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Background Decorative Shape */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-rose-500/10 to-pink-500/5 rounded-full blur-xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-3xl p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
            {coupon.icon}
          </span>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
            සක්‍රීයයි ✨
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-100 mb-1.5 leading-snug">
          {coupon.title}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {coupon.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-400 font-mono">
          VALIDITY: forever ❤️
        </span>
      </div>
    </div>
  );
}
