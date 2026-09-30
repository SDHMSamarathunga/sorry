import React, { useEffect, useRef } from 'react';

export default function AudioPlayer({ isMuted }) {
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isMuted) {
      startTune();
    } else {
      stopTune();
    }
    return () => stopTune();
  }, [isMuted]);

  const startTune = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      isPlayingRef.current = true;

      // Soft lullaby sequence notes (Frequencies for C4, E4, G4, A4, C5 notes)
      const notes = [261.63, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63];
      let step = 0;

      const playNextNote = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;

        const freq = notes[step % notes.length];
        step++;

        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

        // Very soft gain envelope
        gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, audioCtxRef.current.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 1.3);

        timerRef.current = setTimeout(playNextNote, 1400);
      };

      playNextNote();
    } catch (err) {
      console.log('Audio playback initialized on interaction:', err);
    }
  };

  const stopTune = () => {
    isPlayingRef.current = false;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  return null; // Silent background manager component
}
