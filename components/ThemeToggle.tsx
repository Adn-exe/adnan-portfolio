import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';

const ThemeToggle: React.FC = () => {
    const [isLight, setIsLight] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dragControls = useDragControls();

    useEffect(() => {
        // Check initial theme
        if (document.documentElement.classList.contains('light')) {
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
        } else {
            document.documentElement.classList.remove('light');
        }
    };

    const wireHeight = isMobile ? (isLight ? 70 : 45) : (isLight ? 120 : 80);

    return (
        <div className="fixed top-0 right-4 md:right-12 z-[200] flex flex-col items-center">
            {/* Wire */}
            <motion.div
                className="w-[2px] bg-slate-500/50 origin-top"
                style={{ height: wireHeight }}
                animate={{ height: wireHeight }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            {/* Bulb Wrapper */}
            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: isMobile ? 35 : 60 }}
                dragElastic={0.2}
                dragControls={dragControls}
                onDragEnd={(_, info) => {
                    if (info.offset.y > 30) {
                        toggleTheme();
                    }
                }}
                onClick={toggleTheme}
                className="cursor-pointer relative flex flex-col items-center"
            >
                {/* Socket */}
                <div className="w-6 h-4 bg-slate-400 rounded-t-sm border-b border-black/20" />

                {/* Bulb Body */}
                <motion.div
                    className={`w-10 h-10 rounded-full transition-shadow duration-500 relative ${isLight
                            ? 'bg-yellow-100 shadow-[0_0_50px_rgba(253,224,71,0.8)]'
                            : 'bg-slate-700 shadow-inner'
                        }`}
                    animate={{ scale: isLight ? 1.05 : 1 }}
                >
                    {/* Filament Effect */}
                    {isLight && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1 h-4 bg-yellow-400 blur-[1px] rounded-full opacity-60" />
                        </div>
                    )}
                </motion.div>

                {/* Interaction Label */}
                <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -bottom-8 whitespace-nowrap text-[8px] font-mono uppercase tracking-widest text-slate-500"
                >
                    {isLight ? 'Turn Off' : 'Pull for Light'}
                </motion.span>
            </motion.div>
        </div>
    );
};

export default ThemeToggle;
