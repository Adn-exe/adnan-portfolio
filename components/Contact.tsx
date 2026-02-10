import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TechIcon } from './Icons';
import ScrollReveal from './ScrollReveal';

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
        <section id="contact" className="py-32 px-6 relative z-20 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-[#0a1f18] [.light_&]:bg-none [.light_&]:bg-primary transition-colors duration-500">
            {/* Background Accents (Theme aware) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 dark:bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Column: Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        <ScrollReveal>
                            <div className="space-y-4">
                                <span className="text-emerald-500 dark:text-emerald-400 font-mono text-[10px] tracking-[0.2em] uppercase bg-emerald-500/10 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-500/20">
                                    Get In Touch
                                </span>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-theme-text tracking-tight leading-tight">
                                    Let's build something <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">extraordinary.</span>
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
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-surface border border-theme-border hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/40 flex items-center justify-center border border-theme-border group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors">
                                            <TechIcon name={item.icon} className="w-4 h-4 text-theme-secondary group-hover:text-emerald-500 transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-theme-secondary font-mono uppercase tracking-wider mb-0.5">{item.label}</p>
                                            <p className="text-sm text-theme-text font-medium group-hover:text-emerald-500 transition-colors">{item.value}</p>
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
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-1000 pointer-events-none"></div>

                            <form onSubmit={handleSubmit} className="relative space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-theme-secondary ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-primary border border-theme-border rounded-xl px-4 py-4 text-theme-text focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-theme-secondary/40"
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
                                        className="w-full bg-primary border border-theme-border rounded-xl px-4 py-4 text-theme-text focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-theme-secondary/40"
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
                                        className="w-full bg-primary border border-theme-border rounded-xl px-4 py-4 text-theme-text focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-theme-secondary/40 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 rounded-xl font-bold text-lg tracking-widest uppercase relative overflow-hidden group/btn shadow-xl disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-500/20 text-emerald-950"
                                        style={{
                                            background: 'linear-gradient(to right, #FFFFFF, #10B981)',
                                            backgroundSize: '200% auto'
                                        }}
                                    >
                                        <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white">
                                            {isSubmitting ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Submit Request'}
                                        </span>

                                        {/* Blue-Green Flow Gradient on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-400 to-blue-600 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out"></div>

                                        {/* Static Hover State background to ensure it stays colored */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10"></div>
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
