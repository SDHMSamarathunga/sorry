import React, { useState, useEffect, useRef } from 'react';

export default function VirtualJoystick({ activeTab }) {
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [joystickDelta, setJoystickDelta] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [clickPulse, setClickPulse] = useState(false);

  const joystickRef = useRef(null);
  const animationFrameRef = useRef(null);
  const currentPosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const deltaRef = useRef({ x: 0, y: 0 });

  // Detect mobile screen width (<= 768px)
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        currentPosRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        setCursorPos(currentPosRef.current);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Continuous physics loop for smooth virtual cursor gliding via Joystick (only on home tab)
  useEffect(() => {
    if (!isMobile || activeTab !== 'home') return;

    const speed = 7.5;

    const updateLoop = () => {
      if (deltaRef.current.x !== 0 || deltaRef.current.y !== 0) {
        let newX = currentPosRef.current.x + deltaRef.current.x * speed;
        let newY = currentPosRef.current.y + deltaRef.current.y * speed;

        // Clamp inside screen bounds
        newX = Math.max(10, Math.min(window.innerWidth - 10, newX));
        newY = Math.max(10, Math.min(window.innerHeight - 10, newY));

        currentPosRef.current = { x: newX, y: newY };
        setCursorPos({ x: newX, y: newY });

        // Dispatch synthetic mousemove event so EvasiveButton detects cursor
        const event = new MouseEvent('mousemove', {
          clientX: newX,
          clientY: newY,
          bubbles: true,
        });
        window.dispatchEvent(event);
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMobile, activeTab]);

  // Touch Handlers for Virtual Joystick Base
  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateJoystickPos(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    updateJoystickPos(e.touches[0]);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    deltaRef.current = { x: 0, y: 0 };
    setJoystickDelta({ x: 0, y: 0 });
  };

  const updateJoystickPos = (touch) => {
    if (!joystickRef.current) return;
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    const maxRadius = 45;

    const dist = Math.hypot(dx, dy);
    if (dist > maxRadius) {
      dx = (dx / dist) * maxRadius;
      dy = (dy / dist) * maxRadius;
    }

    const normX = dx / maxRadius;
    const normY = dy / maxRadius;

    deltaRef.current = { x: normX, y: normY };
    setJoystickDelta({ x: dx, y: dy });
  };

  // Perform Virtual Mouse Click at Target Cursor Position
  const handleVirtualClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setClickPulse(true);
    setTimeout(() => setClickPulse(false), 200);

    const x = currentPosRef.current.x;
    const y = currentPosRef.current.y;

    // Direct detection for green forgive button
    const greenBtn = document.getElementById('green-forgive-button');
    if (greenBtn) {
      const rect = greenBtn.getBoundingClientRect();
      if (
        x >= rect.left - 30 &&
        x <= rect.right + 30 &&
        y >= rect.top - 30 &&
        y <= rect.bottom + 30
      ) {
        greenBtn.click();
        return;
      }
    }

    // Fallback: elementsFromPoint
    const elements = document.elementsFromPoint(x, y);
    const targetEl = elements.find((el) => {
      if (!el || el.classList.contains('touch-overlay-mask')) return false;
      const tag = el.tagName.toLowerCase();
      return tag === 'button' || tag === 'a' || el.onclick || el.getAttribute('role') === 'button';
    });

    if (targetEl) {
      targetEl.click();
    }
  };

  // Render Joystick ONLY on mobile AND on the Home tab!
  if (!isMobile || activeTab !== 'home') return null;

  return (
    <>
      {/* Virtual Mouse Cursor Overlay */}
      <div
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        className={`fixed z-[10000] pointer-events-none transition-transform duration-75 flex items-center justify-center ${
          clickPulse ? 'scale-150' : 'scale-100'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-rose-500/40 border-2 border-rose-400 shadow-lg shadow-rose-500/50 flex items-center justify-center text-base animate-pulse">
          🎯
        </div>
        <div className="absolute w-12 h-12 rounded-full border border-pink-400/30 animate-ping" />
      </div>

      {/* Controller HUD Bar (Bottom of screen) */}
      <div className="fixed bottom-4 left-4 right-4 z-[9999] flex items-center justify-between pointer-events-auto">
        {/* Virtual Joystick Base */}
        <div
          ref={joystickRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-28 h-28 rounded-full bg-slate-950/85 border-2 border-rose-500/40 backdrop-blur-xl shadow-2xl flex items-center justify-center relative touch-none select-none"
        >
          {/* Outer Guide Ring */}
          <div className="w-20 h-20 rounded-full border border-rose-500/20 flex items-center justify-center text-[10px] text-rose-300/40 font-mono">
            JOYSTICK
          </div>

          {/* Joystick Stick / Knob */}
          <div
            style={{
              transform: `translate(${joystickDelta.x}px, ${joystickDelta.y}px)`,
            }}
            className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-lg shadow-rose-500/50 border border-white/40 flex items-center justify-center text-white text-xs font-bold transition-transform duration-75"
          >
            🕹️
          </div>
        </div>

        {/* Big Action Click Button (A / ❤️ Button) */}
        <button
          onClick={handleVirtualClick}
          onTouchStart={handleVirtualClick}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-green-500 border-2 border-white/50 text-white font-bold text-lg shadow-2xl shadow-emerald-500/50 active:scale-90 transition-transform flex flex-col items-center justify-center gap-0.5 touch-none cursor-pointer"
        >
          <span className="text-2xl">❤️</span>
          <span className="text-[10px] font-black tracking-widest uppercase">PRESS</span>
        </button>
      </div>

      {/* Screen Overlay to disable direct touch clicks on Home page so Joystick MUST be used */}
      <div className="touch-overlay-mask fixed inset-x-0 top-16 bottom-36 z-[90] pointer-events-auto bg-transparent touch-none" />
    </>
  );
}
