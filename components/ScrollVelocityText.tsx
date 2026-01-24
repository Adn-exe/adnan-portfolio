import React from "react";
import './marquee.css';

interface MarqueeProps {
    children: string;
    direction?: 'normal' | 'reverse';
}

const MarqueeText: React.FC<MarqueeProps> = ({ children, direction = 'normal' }) => {
    return (
        <div className="flex overflow-hidden relative w-full">
            <div className={`flex flex-nowrap whitespace-nowrap shrink-0 ${direction === 'normal' ? 'animate-marquee' : 'animate-marquee-reverse'} will-change-transform`}>
                <span className="block text-6xl md:text-9xl font-display font-black uppercase text-white/5 mr-12">{children} </span>
                <span className="block text-6xl md:text-9xl font-display font-black uppercase text-white/5 mr-12">{children} </span>
                <span className="block text-6xl md:text-9xl font-display font-black uppercase text-white/5 mr-12">{children} </span>
                <span className="block text-6xl md:text-9xl font-display font-black uppercase text-white/5 mr-12">{children} </span>
            </div>
            <div className={`flex flex-nowrap whitespace-nowrap shrink-0 ${direction === 'normal' ? 'animate-marquee' : 'animate-marquee-reverse'} will-change-transform`}>
                <span className="block text-6xl md:text-9xl font-display font-black uppercase text-white/5 mr-12">{children} </span>
                <span className="block text-6xl md:text-9xl font-display font-black uppercase text-white/5 mr-12">{children} </span>
                <span className="block text-6xl md:text-9xl font-display font-black uppercase text-white/5 mr-12">{children} </span>
                <span className="block text-6xl md:text-9xl font-display font-black uppercase text-white/5 mr-12">{children} </span>
            </div>
        </div>
    );
};

const ScrollVelocityText: React.FC = () => {
    return (
        <section className="py-12 md:py-24 overflow-hidden relative z-0 pointer-events-none select-none flex flex-col gap-4">
            <MarqueeText direction="normal">Innovation Intelligence Architecture</MarqueeText>
            <MarqueeText direction="reverse">Design Engineering Systems</MarqueeText>
        </section>
    );
};

export default ScrollVelocityText;
