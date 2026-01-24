import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import TechBackground from './components/TechBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Loader from './components/Loader';
import { TechIcon } from './components/Icons';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Magnetic from './components/Magnetic';
import ScrollVelocityText from './components/ScrollVelocityText';
import ScrollReveal from './components/ScrollReveal';
import Globe from './components/Globe';
import { useAudio } from './hooks/useAudio';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [photoRotate, setPhotoRotate] = useState({ x: 0, y: 0 });
  const { playHover, playClick } = useAudio();

  const { scrollY, scrollYProgress } = useScroll(); // Added scrollY
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Prismatic Scroll Effect
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30
  });
  const skewY = useTransform(skewVelocity, [-1000, 1000], [-2, 2]);

  const digitalThreadHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Parallax for headings
  const aboutHeadingParallax = useTransform(scrollYProgress, [0.1, 0.3], [100, -100]);

  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setPhotoRotate({
      x: (y - centerY) / 10,
      y: (centerX - x) / 10
    });
  };

  const handlePhotoLeave = () => {
    setPhotoRotate({ x: 0, y: 0 });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes('@')) return;

    playClick(); // Sound feedback on submit
    setEmailStatus('sending');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: "Portfolio Visitor",
          email: formData.email,
          message: formData.message,
          subject: "New Message from Portfolio",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setEmailStatus('sent');
        setTimeout(() => {
          setFormData({ email: '', message: '' });
          setEmailStatus('idle');
        }, 3000);
      } else {
        console.error("Submission failed:", result);
        setEmailStatus('idle');
        alert("Something went wrong. Please try again or use the direct email link.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setEmailStatus('idle');
      alert("Failed to send message. Please check your connection.");
    }
  };

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen relative selection:bg-accent/30 selection:text-white bg-primary overflow-x-hidden animate-fadeIn cursor-none">
        <CustomCursor />
        <NoiseOverlay />

        {/* Horizontal Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-purple to-accent z-[200] origin-left"
          style={{ scaleX }}
        />

        {/* Digital Thread - Vertical Scroll Guide */}
        <div className="fixed left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/5 z-0 hidden md:block" />
        <motion.div
          className="fixed left-6 md:left-12 top-0 w-[1px] bg-gradient-to-b from-accent/0 via-accent/50 to-accent z-0 hidden md:block shadow-[0_0_10px_#38BDF8]"
          style={{ height: digitalThreadHeight }}
        />

        <TechBackground />
        <Navbar />

        <motion.main className="relative z-10" style={{ skewY, willChange: 'transform' }}>
          <Hero />

          {/* Atmospheric Gradient Blend */}
          <div className="relative h-24 -mt-12 bg-gradient-to-b from-transparent to-surface/5 z-20 pointer-events-none" />

          <ScrollVelocityText />

          {/* Statistics Section */}
          <section className="py-32 border-y border-white/5 bg-surface/5 backdrop-blur-sm overflow-hidden relative z-20">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                  { val: 'AI/ML', label: 'Primary Focus', delay: 0 },
                  { val: 'PYTHON', label: 'Specialization', delay: 0.1 },
                  { val: 'Builder', label: 'Hands-on DNA', delay: 0.2 },
                  { val: 'BLOG', label: 'WRITER', delay: 0.3 }
                ].map((s, i) => (
                  <ScrollReveal
                    key={i}
                    delay={s.delay * 1000}
                    className="text-center group"
                    animation="fade-up"
                  >
                    <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tighter uppercase tabular-nums group-hover:text-accent transition-colors duration-500">
                      {s.val}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.5em] text-accent-purple font-black opacity-40 group-hover:opacity-100 transition-opacity">
                      {s.label}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-48 px-6 relative overflow-hidden z-10">
            <div className="container mx-auto max-w-7xl">
              <div className="space-y-24">
                <ScrollReveal>
                  <motion.div style={{ y: aboutHeadingParallax }}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-[1px] bg-gradient-to-r from-accent to-accent-purple opacity-40"></div>
                      <span className="text-accent-purple font-mono text-[11px] tracking-[0.4em] uppercase font-bold opacity-60">01 — About</span>
                    </div>
                    <h2 className="text-7xl md:text-9xl font-display font-black leading-[0.8] tracking-tighter uppercase italic">
                      <span className="text-gradient">ABOUT ME</span>
                    </h2>
                  </motion.div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  <div className="lg:col-span-8 space-y-16">
                    <ScrollReveal delay={200} className="relative space-y-12 text-slate-400">
                      <p className="text-xl md:text-2xl font-light leading-relaxed tracking-wide border-l-2 border-accent/20 pl-8 premium-spacing group hover:border-accent transition-colors duration-700">
                        As an <span className="text-white font-black italic">AI/ML Student</span>, I'm driven by curiosity about how intelligent systems actually work. I go beyond just implementing algorithms — I focus on understanding the <span className="text-accent font-black">core principles</span> that make models learn, adapt, and solve complex problems.
                      </p>

                      <p className="text-xl md:text-2xl font-light leading-relaxed tracking-wide border-l-2 border-accent-purple/20 pl-8 premium-spacing group hover:border-accent-purple transition-colors duration-700">
                        I approach engineering with <span className="text-white font-black italic">structured thinking</span>. By breaking down complex challenges into clear, testable solutions, I bridge the gap between deep technical knowledge and practical <span className="text-accent-purple font-black">system design</span>.
                      </p>

                      <p className="text-xl md:text-2xl font-light leading-relaxed tracking-wide border-l-2 border-white/10 pl-8 premium-spacing group hover:border-white transition-colors duration-700">
                        My goal is to combine strong fundamentals with <span className="text-white font-black italic">hands-on building</span>. I'm looking for collaborative environments where I can work on real problems and grow through <span className="text-white font-medium underline decoration-accent/30 underline-offset-8">mentorship and experience</span>.
                      </p>
                    </ScrollReveal>

                    <ScrollReveal delay={400} className="flex flex-wrap gap-16 pt-16 border-t border-white/5">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold">Focus</span>
                        <span className="text-[12px] font-display font-black text-white uppercase tracking-widest flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                          AI & Machine Learning
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold">Status</span>
                        <span className="text-[12px] font-display font-black text-accent uppercase tracking-widest italic">Learning & Building</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold">Location</span>
                        <span className="text-[12px] font-display font-black text-white uppercase tracking-widest">Open to Remote</span>
                      </div>
                    </ScrollReveal>
                  </div>

                  <div className="lg:col-span-4 relative hidden lg:block sticky top-32">
                    <ScrollReveal delay={600} animation="zoom-in">
                      <div className="aspect-square relative flex items-center justify-center perspective-[2000px]">
                        {/* Interactive 3D Photo Frame - Rounded Full */}
                        <div
                          className="w-full aspect-square relative group cursor-none transition-all duration-700 ease-out"
                          onMouseMove={handlePhotoMove}
                          onMouseLeave={handlePhotoLeave}
                          style={{
                            transform: `rotateX(${photoRotate.x}deg) rotateY(${photoRotate.y}deg)`,
                            transformStyle: 'preserve-3d'
                          }}
                          data-cursor="CORE_MEM"
                        >
                          <div className="absolute inset-0 rounded-full bg-accent/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>

                          <div className="w-full h-full relative overflow-hidden rounded-full border border-white/10 glass transition-all duration-1000 group-hover:border-accent/60 group-hover:shadow-[0_0_80px_rgba(56,189,248,0.25)]">
                            <div className="absolute inset-0 overflow-hidden">
                              <img
                                src="/profile.jpg"
                                className="w-full h-full object-cover grayscale brightness-50 transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-90"
                                alt="Profile"
                              />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="absolute inset-x-0 bottom-8 translate-z-100 transform transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 flex justify-center">
                              <div className="glass px-6 py-3 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                                <h4 className="text-[10px] font-display font-bold text-white tracking-[0.2em] uppercase">Mohammed Adnan</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Projects />

          <Skills />

          {/* Enhanced Contact Section */}
          <section id="contact" className="py-32 px-6 relative z-20 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">

                <div className="space-y-16">
                  <ScrollReveal className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_15px_#A855F7] animate-pulse"></div>
                      <span className="text-accent-purple font-mono text-[10px] tracking-[0.4em] uppercase font-bold">04 — Contact</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-none tracking-tighter uppercase italic whitespace-nowrap">
                      Let's <span className="text-gradient">Connect.</span>
                    </h2>
                    <p className="text-slate-500 text-xl font-light leading-relaxed max-w-sm">
                      Open to collaborations on <span className="text-white font-bold">AI/ML projects</span> or software engineering opportunities.
                    </p>
                  </ScrollReveal>

                  <div className="flex flex-col gap-12">
                    {/* Replaced Icon Links with Holographic Globe Area */}
                    <div className="relative h-64 lg:h-80 w-full rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-purple/5 opacity-50"></div>
                      <Globe />
                      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Global Connectivity_Active</span>
                      </div>
                    </div>

                    <ScrollReveal delay={200} className="pt-12 border-t border-white/5">
                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-4 font-bold">Email:</span>
                      <a
                        href="mailto:mohdadnan916786@gmail.com"
                        className="text-3xl md:text-4xl font-display font-black text-white hover:text-accent transition-all duration-500 tracking-tighter"
                        data-cursor="EMAIL"
                        onMouseEnter={playHover}
                        onClick={playClick}
                      >
                        mohdadnan916786<span className="text-accent-purple font-light italic">@</span>gmail.com
                      </a>
                    </ScrollReveal>

                    {/* Social Links Moved Below */}
                    <div className="flex items-center gap-8 mt-4">
                      <Magnetic>
                        <a href="https://www.linkedin.com/in/mohammed-adnan-956763297/" target="_blank" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group" onMouseEnter={playHover}>
                          <TechIcon name="linkedin" className="w-5 h-5 text-accent-purple group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-mono uppercase tracking-widest font-bold">LinkedIn</span>
                        </a>
                      </Magnetic>
                      <Magnetic>
                        <a href="https://github.com/Adn-exe" target="_blank" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group" onMouseEnter={playHover}>
                          <TechIcon name="github" className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-mono uppercase tracking-widest font-bold">GitHub</span>
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </div>

                <ScrollReveal delay={400} animation="fade-left" className="relative group/form">
                  <div className="relative p-12 md:p-16 bg-surface/40 backdrop-blur-3xl border border-white/5 overflow-hidden shadow-2xl transition-all duration-1000 group-hover/form:border-accent/30"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/40"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/40"></div>

                    {/* Scanline & HUD Elements */}
                    <div className="absolute inset-0 bg-scanline opacity-[0.02] pointer-events-none"></div>
                    <div className="absolute top-6 right-10 flex gap-4 opacity-20 group-hover/form:opacity-60 transition-opacity">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    </div>

                    <form onSubmit={handleEmailSubmit} className="relative z-10 space-y-12">
                      <div className="space-y-4">
                        <label className="text-[10px] font-mono text-accent-purple uppercase tracking-[0.4em] ml-2 font-bold opacity-60">Your Email</label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onMouseEnter={playHover}
                            placeholder="you@example.com"
                            className="w-full bg-white/5 border-b border-white/10 px-8 py-6 text-sm text-white focus:outline-none focus:border-accent-purple transition-all placeholder:text-slate-800 font-mono tracking-widest"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20"><TechIcon name="rest" className="w-5 h-5" /></div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-mono text-accent uppercase tracking-[0.4em] ml-2 font-bold opacity-60">Your Message</label>
                        <div className="relative">
                          <textarea
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            onMouseEnter={playHover}
                            placeholder="ENTER YOUR MESSAGE..."
                            className="w-full bg-white/5 border-b border-white/10 px-8 py-6 text-sm text-white focus:outline-none focus:border-accent transition-all placeholder:text-slate-800 resize-none font-mono tracking-widest min-h-[150px]"
                          />
                        </div>
                      </div>

                      <div className="pt-6">
                        <Magnetic>
                          <button
                            type="submit"
                            disabled={emailStatus !== 'idle'}
                            className={`w-full py-6 rounded-none font-display font-black text-[12px] tracking-[0.4em] uppercase transition-all duration-700 relative overflow-hidden flex items-center justify-center gap-6 group/btn shadow-2xl ${emailStatus === 'sent'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                              : 'bg-white text-primary border border-white hover:scale-[1.02] shadow-[0_0_50px_rgba(56,189,248,0.3)]'
                              }`}
                            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)' }}
                            data-cursor="UPLINK"
                            onMouseEnter={playHover}
                          >
                            <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white group-hover/btn:italic">
                              {emailStatus === 'sending' ? 'Sending...' : emailStatus === 'sent' ? 'Message Sent!' : 'Send Message'}
                            </span>

                            <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-purple to-accent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out"></div>
                            <div className="absolute inset-0 bg-[#081b33] opacity-0 group-hover/btn:opacity-95 transition-opacity duration-300 -z-10"></div>
                          </button>
                        </Magnetic>
                      </div>
                    </form>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </motion.main>

        <footer className="py-24 border-t border-white/5 bg-primary relative z-30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-4 space-y-6">
                <a href="#" className="text-2xl font-display font-bold text-white tracking-tighter block">
                  Mohammed Adnan
                </a>
                <p className="text-slate-500 font-light text-sm leading-relaxed max-w-xs">
                  Constructing intelligent systems and digital architectures with precision and passion.
                </p>
              </div>

              <div className="md:col-span-2 md:col-start-7 space-y-6">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Index</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-sm text-slate-400 hover:text-accent transition-colors">Home</a></li>
                  <li><a href="#about" className="text-sm text-slate-400 hover:text-accent transition-colors">About</a></li>
                  <li><a href="#projects" className="text-sm text-slate-400 hover:text-accent transition-colors">Works</a></li>
                </ul>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Services</h4>
                <ul className="space-y-4">
                  <li><span className="text-sm text-slate-400 hover:text-accent transition-colors cursor-default">AI Solutions</span></li>
                  <li><span className="text-sm text-slate-400 hover:text-accent transition-colors cursor-default">Neural Systems</span></li>
                  <li><span className="text-sm text-slate-400 hover:text-accent transition-colors cursor-default">Web Architecture</span></li>
                </ul>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Legal</h4>
                <ul className="space-y-4">
                  <li><span className="text-sm text-slate-600 cursor-not-allowed">Privacy</span></li>
                  <li><span className="text-sm text-slate-600 cursor-not-allowed">Terms</span></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                © 2026 Adnan Portfolio. All Rights Reserved.
              </div>
              <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Designed & Built by <span className="text-white">Adnan</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
};

export default App;
