import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [cursorText, setCursorText] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice(
                window.matchMedia('(pointer: coarse)').matches ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            );
        };
        checkTouch();
    }, []);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring configuration for trailing ring
    const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
    const cursorOuterX = useSpring(cursorX, springConfig);
    const cursorOuterY = useSpring(cursorY, springConfig);

    // Velocity vectors to calculate speed and angle of motion
    const xVelocity = useVelocity(cursorX);
    const yVelocity = useVelocity(cursorY);

    const speed = useTransform([xVelocity, yVelocity], (latest) => {
        const vx = latest[0] as number;
        const vy = latest[1] as number;
        return Math.min(Math.sqrt(vx * vx + vy * vy) / 1500, 1.5);
    });

    // Dynamic scale stretching based on speed
    const stretchScaleX = useTransform(speed, [0, 1.5], [1, 1.5]);
    const stretchScaleY = useTransform(speed, [0, 1.5], [1, 0.6]);

    // Rotation angle based on velocity vector
    const rotate = useTransform([xVelocity, yVelocity], (latest) => {
        const vx = latest[0] as number;
        const vy = latest[1] as number;
        return vx === 0 && vy === 0 ? 0 : Math.atan2(vy, vx) * (180 / Math.PI);
    });

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

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Custom PNG Cursor - moves instantly */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicked ? 0.85 : isHovered ? 1.25 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                <img 
                    src="/cursor.png" 
                    alt="custom cursor" 
                    className="w-full h-full object-contain custom-cursor-icon"
                />
            </motion.div>
            {/* Outer Ring - trails with spring physics & squishes based on velocity */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-accent/40 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: cursorOuterX,
                    y: cursorOuterY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scaleX: stretchScaleX,
                    scaleY: stretchScaleY,
                    rotate: rotate,
                }}
                animate={{
                    scale: isClicked ? 1.6 : isHovered ? 1.4 : 1,
                    opacity: isHovered ? 0.4 : 1,
                    borderColor: isHovered ? 'rgba(0, 209, 255, 0.7)' : 'rgba(0, 209, 255, 0.3)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            {/* Hover text label */}
            {isHovered && cursorText && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[10000] text-[8px] font-mono text-white uppercase tracking-widest font-black"
                    style={{
                        x: cursorOuterX,
                        y: cursorOuterY,
                        translateX: '-50%',
                        translateY: '24px',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    {cursorText}
                </motion.div>
            )}
        </>
    );
};

export default CustomCursor;
