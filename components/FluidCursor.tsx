import React, { useEffect, useRef } from 'react';

const FluidCursor: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);
    const mouse = useRef({ x: -100, y: -100 });
    const lastMouse = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const colors = ['#38BDF8', '#818cf8', '#A855F7', '#c084fc'];

        const render = () => {
            // Add new particles based on mouse movement
            const dx = mouse.current.x - lastMouse.current.x;
            const dy = mouse.current.y - lastMouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 2) {
                // Number of particles proportional to speed
                const numParticles = Math.min(5, Math.ceil(dist / 5));
                for (let i = 0; i < numParticles; i++) {
                    particles.current.push({
                        x: lastMouse.current.x + (dx * i) / numParticles + (Math.random() - 0.5) * 5,
                        y: lastMouse.current.y + (dy * i) / numParticles + (Math.random() - 0.5) * 5,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        life: 1.0,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    });
                }
            }

            lastMouse.current = { ...mouse.current };

            // Clear with trail effect
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            ctx.globalCompositeOperation = 'lighter';

            // Update and draw particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.life * 3, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life * 0.5;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9997]" />;
};

export default FluidCursor;
