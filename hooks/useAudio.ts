import { useState, useEffect, useCallback } from 'react';

// Sound Assets (Using data URIs for portability/performance in this demo context, 
// normally these would be files in /public)
const SOUNDS = {
    hover: 'data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=', // Placeholder - will replace with real short beep
    click: 'data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=', // Placeholder
};

// Real minimal "high-tech" beep generation using Web Audio API to avoid external file dependencies
const createOscillator = (ctx: AudioContext, type: OscillatorType, freq: number, duration: number, vol: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
};

export const useAudio = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

    useEffect(() => {
        // Initialize Audio Context lazily on interaction
        const initAudio = () => {
            if (!audioCtx) {
                const Ctx = window.AudioContext || (window as any).webkitAudioContext;
                if (Ctx) setAudioCtx(new Ctx());
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, [audioCtx]);

    const playHover = useCallback(() => {
        if (isMuted || !audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        // High pitched short blip
        createOscillator(audioCtx, 'sine', 800, 0.05, 0.05);
    }, [isMuted, audioCtx]);

    const playClick = useCallback(() => {
        if (isMuted || !audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        // Deeper confirmation thud
        createOscillator(audioCtx, 'triangle', 300, 0.1, 0.1);
    }, [isMuted, audioCtx]);

    const toggleMute = () => setIsMuted(prev => !prev);

    return { isMuted, toggleMute, playHover, playClick };
};
