import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';

const ThemeToggle: React.FC = () => {
    const [isLight, setIsLight] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isStretched, setIsStretched] = useState(false);
    const dragControls = useDragControls();

    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light' || document.documentElement.classList.contains('light')) {
            document.documentElement.classList.add('light');
            setIsLight(true);
        }

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleTheme = () => {
        const newStatus = !isLight;
        setIsLight(newStatus);
        if (newStatus) {
            document.documentElement.classList.add('light');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            document.documentElement.classList.remove('light');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    };

    const wireLength = isMobile ? (isLight ? 55 : 40) : (isLight ? 90 : 65);

    return (
        <div className="fixed top-0 right-5 md:right-14 z-[200] flex flex-col items-center select-none">
            {/* Hanging Wire */}
            <motion.div
                className="w-[2px] bg-gradient-to-b from-slate-400 via-slate-500 to-amber-400/60 origin-top shadow-sm"
                style={{ height: wireLength }}
                animate={{ height: wireLength }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            />

            {/* Interactive Bulb Container */}
            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: isMobile ? 18 : 24 }}
                dragElastic={0.08}
                dragControls={dragControls}
                onDrag={(_, info) => {
                    if (info.offset.y > 15) {
                        setIsStretched(true);
                    } else {
                        setIsStretched(false);
                    }
                }}
                onDragEnd={(_, info) => {
                    setIsStretched(false);
                    if (info.offset.y > 14) {
                        toggleTheme();
                    }
                }}
                onClick={toggleTheme}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsStretched(false);
                }}
                animate={{
                    rotate: isHovered ? [0, -2, 2, -1, 1, 0] : 0,
                }}
                transition={{
                    rotate: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="cursor-pointer relative flex flex-col items-center group focus:outline-none"
            >
                {/* Light Ray Rays Cone on Light Mode */}
                {isLight && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-6 -left-12 -right-12 -bottom-16 pointer-events-none -z-10 flex items-center justify-center"
                    >
                        {/* Radial Light Aura */}
                        <div className="w-36 h-36 rounded-full bg-amber-300/30 blur-2xl animate-pulse" />
                        <div className="absolute w-24 h-24 rounded-full bg-yellow-200/40 blur-lg" />
                    </motion.div>
                )}

                {/* SVG Light Bulb Design */}
                <div className="relative w-11 h-14 flex flex-col items-center filter drop-shadow-md">
                    <svg
                        viewBox="0 0 64 80"
                        className="w-full h-full overflow-visible"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            {/* Metallic Base Gradient */}
                            <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#475569" />
                                <stop offset="50%" stopColor="#94a3b8" />
                                <stop offset="100%" stopColor="#334155" />
                            </linearGradient>

                            {/* Bulb Glass Gradient (Light Mode) */}
                            <radialGradient id="bulbLightGrad" cx="50%" cy="40%" r="50%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="40%" stopColor="#fef08a" />
                                <stop offset="85%" stopColor="#fde047" />
                                <stop offset="100%" stopColor="#eab308" />
                            </radialGradient>

                            {/* Bulb Glass Gradient (Dark Mode) */}
                            <radialGradient id="bulbDarkGrad" cx="50%" cy="30%" r="55%">
                                <stop offset="0%" stopColor="#334155" stopOpacity="0.9" />
                                <stop offset="60%" stopColor="#1e293b" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
                            </radialGradient>

                            {/* Glow Filter */}
                            <filter id="filamentGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Screw Cap / Socket Fixture */}
                        <rect x="24" y="2" width="16" height="5" rx="1.5" fill="url(#capGradient)" />
                        <rect x="25" y="7" width="14" height="4" rx="1" fill="#64748b" />
                        <path d="M26 11 L38 11 L36 15 L28 15 Z" fill="#475569" />

                        {/* Bulb Outer Glass Body */}
                        <path
                            d="M 28 15 
                               C 20 20, 10 30, 10 44 
                               C 10 58, 22 66, 32 66 
                               C 42 66, 54 58, 54 44 
                               C 54 30, 44 20, 36 15 
                               Z"
                            fill={isLight ? 'url(#bulbLightGrad)' : 'url(#bulbDarkGrad)'}
                            stroke={isLight ? '#facc15' : '#475569'}
                            strokeWidth="1.5"
                            className="transition-colors duration-500"
                        />

                        {/* Glass Reflection Highlight */}
                        <path
                            d="M 16 34 C 15 42, 19 52, 24 56"
                            stroke={isLight ? 'white' : '#64748b'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity={isLight ? "0.7" : "0.3"}
                        />

                        {/* Internal Filament Support Wires */}
                        <path d="M 27 24 L 27 34 L 30 38" stroke={isLight ? '#ca8a04' : '#475569'} strokeWidth="1" />
                        <path d="M 37 24 L 37 34 L 34 38" stroke={isLight ? '#ca8a04' : '#475569'} strokeWidth="1" />

                        {/* Glowing Filament (Tungsten Coil) */}
                        <path
                            d="M 30 38 Q 32 32, 34 38"
                            stroke={isLight ? '#ffffff' : '#38bdf8'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                            filter={isLight ? 'url(#filamentGlow)' : 'none'}
                            className="transition-colors duration-300"
                        />

                        {/* Extra Hot Core Glow on Light Mode */}
                        {isLight && (
                            <circle cx="32" cy="36" r="6" fill="#ffffff" filter="url(#filamentGlow)" opacity="0.9" />
                        )}
                    </svg>
                </div>

                {/* Floating Interactive Funny Tooltip */}
                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{
                        opacity: isHovered || isStretched ? 1 : 0,
                        y: isHovered || isStretched ? 6 : -4,
                        scale: isStretched ? [1, 1.05, 1] : 1
                    }}
                    transition={{ duration: 0.2 }}
                    className={`absolute -bottom-8 whitespace-nowrap px-2.5 py-1 rounded-md border text-[9px] font-mono tracking-wider uppercase backdrop-blur-md shadow-2xl pointer-events-none transition-colors duration-300 ${
                        isStretched
                            ? 'bg-red-950/90 border-red-500 text-red-300 animate-bounce'
                            : 'bg-slate-900/90 border-slate-700 text-amber-300'
                    }`}
                >
                    {isStretched
                        ? '⚡️ Easy! Don’t break my wire!'
                        : isLight
                        ? '💡 Click or Pull to Dim'
                        : '💡 Click or Pull to Light'}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ThemeToggle;
