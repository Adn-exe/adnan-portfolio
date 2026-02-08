
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [cursorText, setCursorText] = useState('');

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const cursorXSpring = cursorX;
    const cursorYSpring = cursorY;

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isSelectable = target.closest('a, button, [data-cursor]');

            if (isSelectable) {
                setIsHovered(true);
                const text = (isSelectable as HTMLElement).getAttribute('data-cursor');
                setCursorText(text || '');
            } else {
                setIsHovered(false);
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovered ? 4 : 1,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-accent/30 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.5 : 1,
                }}
            />
            {isHovered && cursorText && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[10000] text-[8px] font-mono text-white uppercase tracking-widest font-bold"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                        translateX: '-50%',
                        translateY: '20px',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {cursorText}
                </motion.div>
            )}
        </>
    );
};

export default CustomCursor;
