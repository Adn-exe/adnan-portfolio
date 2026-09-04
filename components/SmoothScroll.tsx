import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // Enable smooth scrolling down to tablet screen sizes
        if (window.innerWidth < 768) return;

        const lenis = new Lenis({
            lerp: 0.1,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.2,
            autoRaf: false,
        });

        lenis.scrollTo(0, { immediate: true });

        // Synchronize Lenis scroll position with GSAP ScrollTrigger on every frame
        lenis.on('scroll', ScrollTrigger.update);

        const updateRaf = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateRaf);
        // Restore GSAP lagSmoothing so dropped frames are smoothed gracefully instead of hitching
        gsap.ticker.lagSmoothing(500, 33);

        return () => {
            gsap.ticker.remove(updateRaf);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
