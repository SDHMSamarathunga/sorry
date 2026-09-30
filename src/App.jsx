import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FloatingHearts from './components/FloatingHearts';
import NameModal from './components/NameModal';
import AudioPlayer from './components/AudioPlayer';
import VirtualJoystick from './components/VirtualJoystick';

import HomePage from './pages/HomePage';
import ApologyPage from './pages/ApologyPage';
import PromisesPage from './pages/PromisesPage';
import FinalPage from './pages/FinalPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [unlockedTabs, setUnlockedTabs] = useState(['home']);
  const [partnerName, setPartnerName] = useState('සූදූ');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const unlockAndNavigate = (targetTab) => {
    setUnlockedTabs((prev) => (prev.includes(targetTab) ? prev : [...prev, targetTab]));
    setActiveTab(targetTab);
  };

  const handleHomeForgive = () => {
    setShowToast(true);
    setTimeout(() => {
      unlockAndNavigate('apology');
      setShowToast(false);
    }, 900);
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            partnerName={partnerName}
            unlockedTabs={unlockedTabs}
            onNavigate={unlockAndNavigate}
            onForgive={handleHomeForgive}
          />
        );
      case 'apology':
        return (
          <ApologyPage
            partnerName={partnerName}
            onNavigate={unlockAndNavigate}
            onForgive={() => unlockAndNavigate('promises')}
          />
        );
      case 'promises':
        return (
          <PromisesPage
            partnerName={partnerName}
            onNavigate={unlockAndNavigate}
          />
        );
      case 'final':
        return (
          <FinalPage
            partnerName={partnerName}
            onNavigate={setActiveTab}
          />
        );
      default:
        return (
          <HomePage
            partnerName={partnerName}
            unlockedTabs={unlockedTabs}
            onNavigate={unlockAndNavigate}
            onForgive={handleHomeForgive}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Noto_Sans_Sinhala',sans-serif] selection:bg-rose-500 selection:text-white relative overflow-hidden">
      {/* Animated Floating Hearts & Orbs Background */}
      <FloatingHearts />

      {/* Ambient Audio Player */}
      <AudioPlayer isMuted={isMuted} />

      {/* Virtual Joystick & Target Cursor for Mobile Responsiveness */}
      <VirtualJoystick activeTab={activeTab} />

      {/* Top Navbar with Sequential Lock Logic */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unlockedTabs={unlockedTabs}
        partnerName={partnerName}
        onOpenCustomizer={() => setIsNameModalOpen(true)}
        isMuted={isMuted}
        toggleAudio={() => setIsMuted(!isMuted)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 sm:py-6 z-10 pb-32 sm:pb-6">
        {renderCurrentPage()}
      </main>

      {/* Toast Notification when Forgiven */}
      {showToast && (
        <div className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-[10001] bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3.5 rounded-2xl shadow-2xl shadow-emerald-950 flex items-center gap-3 border border-emerald-400/40 animate-bounce">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-sm font-bold">ස්තූතියි {partnerName}! ❤️</p>
            <p className="text-xs text-emerald-100">පළමු පියවර සාර්ථකයි! ලියුම ඇරී ඇත...</p>
          </div>
        </div>
      )}

      {/* Name Customization Modal */}
      <NameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        currentName={partnerName}
        onSaveName={(newName) => setPartnerName(newName)}
      />
    </div>
  );
}