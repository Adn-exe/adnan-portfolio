
import React from 'react';

const NoiseOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden backface-hidden">
            <div
                className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150 brightness-150 animate-noise"
                style={{ backgroundSize: '200px 200px' }}
            ></div>
        </div>
    );
};

export default NoiseOverlay;
