import React, { useState } from 'react';

export default function NameModal({ isOpen, onClose, currentName, onSaveName }) {
  const [inputName, setInputName] = useState(currentName || '');

  if (!isOpen) return null;

  const quickNames = ['සූදූ', 'බබා', 'මැණික', 'චූටි', 'සුදු මැණික', 'පැටියෝ', 'රත්තරං'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      onSaveName(inputName.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-3xl p-6 shadow-2xl shadow-rose-950/50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 text-2xl flex items-center justify-center mx-auto mb-3 border border-rose-500/30">
            ✍️
          </div>
          <h2 className="text-xl font-bold text-white mb-1">
            ඔයාගේ විශේෂ එක්කෙනාගේ නම
          </h2>
          <p className="text-xs text-rose-300/80">
            ඔයාගේ පෙම්වතා / පෙම්වතියගේ ආදරණීය නම ඇතුළත් කරන්න
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              ආදරණීය නම (Nickname):
            </label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="උදා: සූදූ / බබා / මැණික"
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm font-medium"
              autoFocus
            />
          </div>

          <div>
            <span className="block text-[11px] font-semibold text-slate-400 mb-2">
              නැතහොත් මේවායින් එකක් තෝරන්න:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickNames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setInputName(name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    inputName === name
                      ? 'bg-rose-500 text-white border border-rose-400'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {name} ❤️
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
            >
              අවලංගු කරන්න
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-500/25 transition-all"
            >
              තහවුරු කරන්න ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
