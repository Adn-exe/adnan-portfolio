import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TechIcon } from './Icons';
import ScrollReveal from './ScrollReveal';
import { useAudio } from '../hooks/useAudio';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const { playHover, playClick } = useAudio();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setStatus('success');
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    const contactInfo = [
        { icon: 'email', label: 'Email', value: 'mohdadnan916786@gmail.com', href: 'mailto:mohdadnan916786@gmail.com' },
        { icon: 'linkedin', label: 'LinkedIn', value: 'Mohammed Adnan', href: 'https://www.linkedin.com/in/mohammed-adnan-956763297/' },
        { icon: 'github', label: 'GitHub', value: 'Adn-exe', href: 'https://github.com/Adn-exe' }
    ];

    return (
        <section id="contact" className="py-32 px-6 relative z-20 overflow-hidden bg-gradient-to-b from-primary via-primary to-[#022b40] [.light_&]:from-[#FAF8F2] [.light_&]:via-[#FAF8F2] [.light_&]:to-[#FDF1D0] transition-colors duration-500">
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Column: Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        <ScrollReveal>
                            <div className="space-y-4">
                                <span className="inline-block text-accent font-mono text-[10px] tracking-[0.2em] uppercase bg-accent/10 px-3.5 py-1 rounded-full border border-accent/30 font-bold">
                                    Get In Touch
                                </span>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-theme-text tracking-tight leading-tight">
                                    Let's build something <br />
                                    <span className="text-gradient">extraordinary.</span>
                                </h2>
                                <p className="text-theme-secondary text-sm leading-relaxed max-w-sm">
                                    Have an idea? Say Hi!
                                </p>
                            </div>
                        </ScrollReveal>

                        <div className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <ScrollReveal key={item.label} delay={index * 0.1}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-surface border border-theme-border hover:border-accent/40 transition-all duration-300 backdrop-blur-sm"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/40 flex items-center justify-center border border-theme-border group-hover:border-accent/50 group-hover:bg-accent/10 transition-colors">
                                            <TechIcon name={item.icon} className="w-4 h-4 text-theme-secondary group-hover:text-accent transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-theme-secondary font-mono uppercase tracking-wider mb-0.5">{item.label}</p>
                                            <p className="text-sm text-theme-text font-medium group-hover:text-accent transition-colors">{item.value}</p>
                                        </div>
                                    </a>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <ScrollReveal delay={0.2}>
                        <div className="relative p-8 md:p-10 rounded-3xl bg-surface border border-theme-border backdrop-blur-md shadow-2xl">
                            <form onSubmit={handleSubmit} className="relative space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-theme-secondary ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-primary border border-theme-border rounded-xl px-4 py-4 text-theme-text focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-theme-secondary/40"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-theme-secondary ml-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-primary border border-theme-border rounded-xl px-4 py-4 text-theme-text focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-theme-secondary/40"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-theme-secondary ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-primary border border-theme-border rounded-xl px-4 py-4 text-theme-text focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-theme-secondary/40 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || status === 'success'}
                                        onMouseEnter={playHover}
                                        onClick={() => {
                                            if (!isSubmitting && status === 'idle') playClick();
                                        }}
                                        className="group relative w-full py-4 px-6 rounded-2xl font-sans font-semibold text-xs sm:text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 flex items-center justify-center gap-3 border shadow-lg cursor-pointer disabled:cursor-not-allowed bg-accent text-primary border-accent/40 shadow-accent/15 hover:shadow-accent/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] [.light_&]:bg-accent [.light_&]:text-[#FAF8F2] [.light_&]:border-amber-600/30 disabled:opacity-80 disabled:hover:scale-100"
                                    >
                                        {/* Subtle ambient highlight */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        {/* Content based on status */}
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2.5">
                                                <svg className="animate-spin h-4 w-4 text-primary [.light_&]:text-[#FAF8F2]" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span className="font-medium tracking-widest text-xs">Sending Message...</span>
                                            </div>
                                        ) : status === 'success' ? (
                                            <div className="flex items-center gap-2 text-primary [.light_&]:text-[#FAF8F2]">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="font-semibold tracking-widest text-xs">Message Sent!</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2.5">
                                                <span className="font-semibold tracking-widest">Submit Request</span>
                                                <svg
                                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};

export default Contact;
