
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Mouse interactivity
  const mouseX = useSpring(0, { damping: 50, stiffness: 400 });
  const mouseY = useSpring(0, { damping: 50, stiffness: 400 });

  // Scroll transforms for parallax layers
  const gridY = useTransform(scrollY, [0, 5000], [0, -500]);
  const contentY1 = useTransform(scrollY, [0, 5000], [0, -1000]);
  const rotateEffect = useTransform(scrollY, [0, 5000], [0, 20]);

  useEffect(() => {
    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 35;
    const connectionDistance = 150;
    const mouseRadius = 200;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(w: number, h: number, mx: number, my: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse attraction
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius) {
          this.x += dx * 0.01;
          this.y += dy * 0.01;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(56, 189, 248, 0.5)';
        context.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = (mouseX.get() / 100 + 0.5) * canvas.width;
      const my = (mouseY.get() / 100 + 0.5) * canvas.height;

      particles.forEach((p, i) => {
        p.update(canvas.width, canvas.height, mx, my);
        p.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 100);
      mouseY.set((clientY / innerHeight - 0.5) * 100);
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#010206] z-0" />;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden bg-[#010206] pointer-events-none">

      {/* 1. Deep Atmospheric Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_50%_50%,rgba(30,27,75,0.4)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_50%_50%,rgba(49,46,129,0.3)_0%,transparent_70%)]" />
      </div>

      {/* 2. 3D Perspective Grid Floor */}
      <div className="absolute inset-0 perspective-[1000px]">
        <motion.div
          style={{
            rotateX: 65,
            y: gridY,
            z: -100
          }}
          className="absolute bottom-[-50%] left-[-50%] w-[200%] h-[200%] opacity-[0.05] bg-[linear-gradient(to_right,#38BDF8_1px,transparent_1px),linear-gradient(to_bottom,#38BDF8_1px,transparent_1px)] bg-[size:100px_100px]"
        />
      </div>

      {/* 3. Interactive Neural Web (Canvas) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
      />

      {/* 4. Floating Architectural Glyphs */}
      {[...Array(15)].map((_, i) => {
        const glyphType = i % 3;
        return (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: Math.random() * 0.5 + 0.3
            }}
            animate={{
              opacity: [0, 0.25, 0],
              y: [null, (Math.random() - 0.5) * 600 + "px"],
              rotate: [0, glyphType === 0 ? 360 : glyphType === 1 ? -180 : 90]
            }}
            transition={{
              duration: Math.random() * 40 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute pointer-events-none"
          >
            {glyphType === 0 ? (
              <svg width="30" height="30" viewBox="0 0 40 40" className="text-accent/30 fill-none stroke-current stroke-[0.5]">
                <path d="M20 2L37 11V29L20 38L3 29V11L20 2Z" />
              </svg>
            ) : glyphType === 1 ? (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-accent-purple/40 rounded-full" />
                <div className="w-1.5 h-1.5 bg-accent-purple/20 rounded-full" />
                <div className="w-1.5 h-1.5 bg-accent-purple/10 rounded-full" />
              </div>
            ) : (
              <div className="w-6 h-[1px] bg-accent/30" />
            )}
          </motion.div>
        );
      })}

      {/* 5. High-Speed Data Pulses */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "-100%", y: Math.random() * 100 + "%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "circIn"
          }}
          className="absolute h-[1px] w-[400px] bg-gradient-to-r from-transparent via-accent/60 to-transparent blur-[2px]"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[2px] shadow-[0_0_10px_#fff]" />
        </motion.div>
      ))}

      {/* 6. Neural Synthesis Pulse Effects */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.5],
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 4,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full border border-accent/20 blur-[2px]"
        />
      ))}

      {/* 7. Foreground Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,2,6,0.8)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#010206] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#010206] to-transparent" />
    </div>
  );
};

export default TechBackground;
