import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useSpring } from 'framer-motion';

const Globe: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const r = useSpring(0, {
        mass: 1,
        stiffness: 280,
        damping: 40,
        restDelta: 0.001,
    });

    useEffect(() => {
        let phi = 0;
        let width = 0;

        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 1, // Reduced for performance
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 8000, // Reduced from 16000 for better performance
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [0.5, 0.5, 1],
            opacity: 0.8,
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.0060], size: 0.03 },
                { location: [51.5074, -0.1278], size: 0.03 },
                { location: [12.9716, 77.5946], size: 0.08 },
                { location: [35.6762, 139.6503], size: 0.03 },
            ],
            onRender: (state) => {
                // This prevents rotation while dragging
                if (!pointerInteracting.current) {
                    // Called on every animation frame.
                    // `state` will be an empty object, return updated params.
                    phi += 0.005;
                }
                state.phi = phi + r.get();
                state.width = width * 2;
                state.height = width * 2;
            }
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, [r]);

    return (
        <div className="relative w-full max-w-[600px] aspect-square mx-auto flex items-center justify-center">
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    contain: 'layout paint size',
                    cursor: 'grab',
                }}
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                    canvasRef.current.style.cursor = 'grabbing';
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current.style.cursor = 'grab';
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasRef.current.style.cursor = 'grab';
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        r.set(delta / 200);
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        r.set(delta / 100);
                    }
                }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#010206] to-transparent pointer-events-none" />
        </div>
    );
};

export default Globe;
