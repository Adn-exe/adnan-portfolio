import React, { useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { useAudio } from '../hooks/useAudio';
import { TechIcon } from './Icons';

const PIPELINE_STEPS = [
  { label: 'Natural Language', short: 'NLP', icon: '⌘' },
  { label: 'AI Parsing', short: 'PARSE', icon: '◈' },
  { label: 'Price Intel', short: 'PRICE', icon: '◇' },
  { label: 'Smart Route', short: 'ROUTE', icon: '△' },
];

export const Experience: React.FC = () => {
  const { playClick, playHover } = useAudio();
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [imageHover, setImageHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const techStack = ['React', 'TypeScript', 'Node.js', 'Gemini API', 'Leaflet', 'PWA'];

  const highlights = [
    'Built an AI shopping-list parser using Google Gemini to convert natural-language requests into structured grocery items.',
    'Integrated grocery pricing and promotional data with price-comparison and multi-store optimization logic.',
    'Developed a responsive PWA with interactive maps, route visualization, and a mobile-first shopping workflow.',
  ];

  // Parallax effect on the project image
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    imageRef.current.style.setProperty('--px', `${x}px`);
    imageRef.current.style.setProperty('--py', `${y}px`);
  };

  // Mouse-following ambient glow on the card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative z-10 overflow-hidden bg-primary transition-colors duration-500"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="w-full mb-12 sm:mb-16 px-1">
          <ScrollReveal animation="fade-right">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-white" />
              <span className="text-accent font-mono font-semibold text-xs tracking-widest uppercase">
                Experience / 01
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-theme-text tracking-tighter leading-tight">
              Work beyond the <span className="text-gradient">classroom.</span>
            </h2>

          </ScrollReveal>
        </div>

        {/* Main Experience Card with Mouse-Following Glow */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          className="relative border border-white/10 dark:border-white/10 [.light_&]:border-stone-300/70 bg-surface/50 dark:bg-[#0a0d15]/90 [.light_&]:bg-[#F8F4EC] backdrop-blur-xl shadow-2xl overflow-hidden group/card"
        >
          {/* Animated gradient accent line at the top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-white/60 to-accent bg-[length:200%_auto] animate-gradient" />

          {/* Mouse-following ambient glow orb */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.06,
            }}
          />

          {/* Large Background Watermark */}
          <div className="absolute -right-8 -top-10 text-[200px] sm:text-[260px] font-display font-black text-theme-text/[0.02] dark:text-white/[0.025] [.light_&]:text-stone-900/[0.03] leading-none tracking-tighter pointer-events-none select-none">
            01
          </div>

          {/* Top Metadata Strip */}
          <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-3.5 border-b border-white/8 dark:border-white/8 [.light_&]:border-stone-300/60 text-xs font-mono">
            <span className="text-accent font-semibold tracking-wider uppercase">Freelance Developer · Independent</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400/90 font-medium tracking-wider text-[11px] uppercase">Paid</span>
            </div>
          </div>

          {/* Content Body */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* LEFT: Project Image with Floating Perspective */}
              <div className="lg:col-span-5">
                {/* Image Container */}
                <div
                  className="relative overflow-hidden border border-white/10 dark:border-white/15 [.light_&]:border-stone-300/70 bg-black/20 [.light_&]:bg-stone-100 shadow-[0_20px_60px_rgba(0,0,0,0.4)] [.light_&]:shadow-[0_15px_40px_rgba(0,0,0,0.1)]"
                >
                  <img
                    src="/projectImages/smartHandel.webp"
                    alt="SmartHandel — AI Grocery Shopping Assistant"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Animated Pipeline Strip */}
                <div className="mt-5 relative">
                  {/* Pipeline track */}
                  <div className="p-3.5 sm:p-4 border border-white/8 dark:border-white/8 [.light_&]:border-stone-300/60 bg-surface/30 dark:bg-[#080a11]/50 [.light_&]:bg-white/60 relative overflow-hidden">
                    {/* Animated flowing pulse along the pipeline */}
                    <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
                      <div
                        className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-shimmer"
                        style={{ animationDuration: '3s' }}
                      />
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      {PIPELINE_STEPS.map((step, idx) => (
                        <React.Fragment key={step.short}>
                          {/* Node */}
                          <div
                            className="flex flex-col items-center gap-1.5 cursor-default"
                            onMouseEnter={() => { setHoveredNode(idx); playHover(); }}
                            onMouseLeave={() => setHoveredNode(null)}
                          >
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-none flex items-center justify-center border text-sm font-mono transition-all duration-300 ${
                                hoveredNode === idx
                                  ? 'bg-accent/20 border-accent text-accent shadow-[0_0_16px_rgba(0,209,255,0.3)] [.light_&]:shadow-[0_0_16px_rgba(217,119,6,0.3)] scale-110'
                                  : 'bg-surface/60 dark:bg-black/40 [.light_&]:bg-white border-white/10 dark:border-white/10 [.light_&]:border-stone-300 text-theme-secondary/80'
                              }`}
                            >
                              {step.icon}
                            </div>
                            <span
                              className={`text-[9px] sm:text-[10px] font-mono tracking-wider uppercase transition-colors duration-200 ${
                                hoveredNode === idx
                                  ? 'text-accent font-bold'
                                  : 'text-theme-secondary/60'
                              }`}
                            >
                              {step.short}
                            </span>
                          </div>
                          {/* Connector */}
                          {idx < PIPELINE_STEPS.length - 1 && (
                            <div className="flex-1 flex items-center mx-1 sm:mx-2 relative">
                              <div
                                className={`w-full h-px transition-colors duration-300 ${
                                  hoveredNode !== null && (hoveredNode === idx || hoveredNode === idx + 1)
                                    ? 'bg-accent/60'
                                    : 'bg-white/10 dark:bg-white/10 [.light_&]:bg-stone-300/60'
                                }`}
                              />
                              {/* Directional arrow */}
                              <div
                                className={`absolute right-0 -translate-y-px text-[8px] transition-colors duration-300 ${
                                  hoveredNode !== null && (hoveredNode === idx || hoveredNode === idx + 1)
                                    ? 'text-accent/80'
                                    : 'text-white/20 dark:text-white/20 [.light_&]:text-stone-400/50'
                                }`}
                              >
                                ›
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Editorial Content */}
              <div className="lg:col-span-7 flex flex-col">
                {/* Project Title */}
                <div className="mb-5">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-theme-text tracking-tight leading-[1.1]">
                    SmartHandel
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-theme-secondary mt-1.5 tracking-wide">
                    AI Grocery Shopping Assistant · Norway
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-[15px] font-lora text-theme-text/85 leading-relaxed mb-6">
                  Developed SmartHandel as a paid freelance project — an AI-powered grocery shopping
                  experience that combines natural-language shopping lists, price comparison, store optimization,
                  and interactive maps for the Norwegian market.
                </p>

                {/* Highlights */}
                <ul className="space-y-3 mb-7">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-lora text-theme-secondary leading-relaxed group/hi">
                      <span className="w-1.5 h-1.5 rounded-none bg-accent/50 group-hover/hi:bg-accent mt-2 shrink-0 transition-colors duration-200" />
                      <span className="group-hover/hi:text-theme-text transition-colors duration-200">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {techStack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-[11px] font-mono font-medium rounded-none bg-surface/80 dark:bg-black/40 [.light_&]:bg-white border border-white/10 dark:border-white/10 [.light_&]:border-stone-300 text-theme-secondary hover:text-accent hover:border-accent/30 transition-colors duration-200 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-5 border-t border-white/8 dark:border-white/8 [.light_&]:border-stone-300/60 flex items-center gap-4">
                  <a
                    href="https://github.com/Adn-exe/smarthandel-mvp"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none text-xs sm:text-sm font-mono font-bold tracking-wider text-primary bg-accent hover:scale-[1.03] transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.2)] [.light_&]:shadow-[0_0_15px_rgba(217,119,6,0.25)] hover:shadow-[0_0_30px_rgba(0,209,255,0.35)] [.light_&]:hover:shadow-[0_0_25px_rgba(217,119,6,0.35)]"
                  >
                    <TechIcon name="github" className="w-4 h-4" />
                    <span>View project ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
