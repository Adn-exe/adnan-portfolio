import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TechIcon } from './Icons';
import ScrollReveal from './ScrollReveal';
import StarBorder from './StarBorder';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
            {/* Background Accents (Theme aware - Contained to prevent bleeding) */}
            <div className="absolute top-1/3 right-0 w-[360px] h-[360px] bg-sky-400/15 [.light_&]:bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-[320px] h-[320px] bg-[#00D1FF]/15 [.light_&]:bg-yellow-500/15 rounded-full blur-[80px] pointer-events-none" />

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
                                    Open to AI collaborations and new opportunities.
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
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-blue-500/20 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-1000 pointer-events-none"></div>

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
                                    <StarBorder
                                        as="div"
                                        className="w-full rounded-xl"
                                        color="var(--accent)"
                                        thickness={1.5}
                                    >
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl font-bold text-sm tracking-[0.25em] uppercase relative overflow-hidden group/btn shadow-xl disabled:opacity-70 disabled:cursor-not-allowed bg-accent text-primary hover:opacity-90 transition-all duration-300"
                                        >
                                            <span className="relative z-10 font-mono font-black">
                                                {isSubmitting ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Submit Request'}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none" />
                                        </button>
                                    </StarBorder>
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
