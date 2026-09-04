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

        (window as any).__lenis = lenis;

        // Synchronize Lenis scroll position with GSAP ScrollTrigger on every frame
        lenis.on('scroll', ScrollTrigger.update);

        let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
        const handleScroll = () => {
            if (!document.body.classList.contains('is-scrolling')) {
                document.body.classList.add('is-scrolling');
            }
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
            }, 120);
        };

        lenis.on('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const updateRaf = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateRaf);
        // Restore GSAP lagSmoothing so dropped frames are smoothed gracefully instead of hitching
        gsap.ticker.lagSmoothing(500, 33);

        return () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            document.body.classList.remove('is-scrolling');
            window.removeEventListener('scroll', handleScroll);
            lenis.off('scroll', handleScroll);
            gsap.ticker.remove(updateRaf);
            lenis.destroy();
            delete (window as any).__lenis;
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
