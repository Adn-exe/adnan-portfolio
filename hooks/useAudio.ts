import { useState, useCallback } from 'react';

// Shared singleton AudioContext to prevent context proliferation and browser limits
let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!sharedAudioCtx) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
            sharedAudioCtx = new AudioCtxClass();
        }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
        sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
};

// Subtle oscillator for essential tactile interactions
const createOscillator = (ctx: AudioContext, type: OscillatorType, freq: number, duration: number, vol: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
};

export const useAudio = () => {
    const [isMuted, setIsMuted] = useState(false);

    // Realistic aerodynamic swoop / whoosh sound synthesized via Web Audio
    const playSwoop = useCallback((direction: 'expand' | 'contract' = 'expand') => {
        if (isMuted) return;
        const ctx = getAudioContext();
        if (!ctx) return;

        const duration = 0.55;
        const now = ctx.currentTime;

        try {
            // 1. Aerodynamic Noise Sweep (whoosh/swoop)
            const bufferSize = Math.floor(ctx.sampleRate * duration);
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                // Soft pink-like noise
                data[i] = (Math.random() * 2 - 1) * 0.4;
            }

            const noiseSource = ctx.createBufferSource();
            noiseSource.buffer = buffer;

            // Bandpass filter to sculpt and sweep the whoosh
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.Q.setValueAtTime(2.2, now);

            const noiseGain = ctx.createGain();

            if (direction === 'expand') {
                // Light bursting outward: sweeping up into air and opening up
                filter.frequency.setValueAtTime(130, now);
                filter.frequency.exponentialRampToValueAtTime(780, now + duration * 0.4);
                filter.frequency.exponentialRampToValueAtTime(220, now + duration);

                noiseGain.gain.setValueAtTime(0.001, now);
                noiseGain.gain.linearRampToValueAtTime(0.09, now + duration * 0.3);
                noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            } else {
                // Light contracting back into bulb: suction whoosh collapsing downward
                filter.frequency.setValueAtTime(750, now);
                filter.frequency.exponentialRampToValueAtTime(120, now + duration);

                noiseGain.gain.setValueAtTime(0.08, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            }

            noiseSource.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(ctx.destination);

            noiseSource.start(now);
            noiseSource.stop(now + duration);

            // 2. Sub-Harmonic Resonance Swell (gives realistic physical weight)
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            osc.type = 'sine';

            if (direction === 'expand') {
                osc.frequency.setValueAtTime(95, now);
                osc.frequency.exponentialRampToValueAtTime(210, now + duration * 0.35);
                osc.frequency.exponentialRampToValueAtTime(55, now + duration);

                oscGain.gain.setValueAtTime(0.001, now);
                oscGain.gain.linearRampToValueAtTime(0.05, now + duration * 0.25);
                oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            } else {
                osc.frequency.setValueAtTime(190, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + duration);

                oscGain.gain.setValueAtTime(0.04, now);
                oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            }

            osc.connect(oscGain);
            oscGain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch {
            // Silently handle any browser autoplay restrictions
        }
    }, [isMuted]);

    const playHover = useCallback(() => {
        if (isMuted) return;
        const ctx = getAudioContext();
        if (!ctx) return;
        createOscillator(ctx, 'sine', 700, 0.04, 0.03);
    }, [isMuted]);

    const playClick = useCallback(() => {
        if (isMuted) return;
        const ctx = getAudioContext();
        if (!ctx) return;
        createOscillator(ctx, 'triangle', 280, 0.08, 0.08);
    }, [isMuted]);

    const toggleMute = () => setIsMuted(prev => !prev);

    return { isMuted, toggleMute, playHover, playClick, playSwoop };
};
