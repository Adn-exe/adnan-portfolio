import React from 'react';

export const SectionDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full my-8 md:my-14 flex items-center justify-center pointer-events-none select-none z-20 ${className}`}>
      {/* Left Gradient Line */}
      <div className="flex-1 max-w-xl h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-cyan-300 [.light_&]:via-amber-500/80 [.light_&]:to-amber-600" />
      
      {/* Center Rotated Diamond */}
      <div className="relative flex items-center justify-center mx-4 md:mx-7">
        {/* Outer Rotated Diamond Border */}
        <div className="w-4 h-4 md:w-5 md:h-5 rotate-45 border-2 border-cyan-400 [.light_&]:border-amber-500 bg-slate-950 [.light_&]:bg-amber-50 backdrop-blur-md flex items-center justify-center">
          {/* Inner Diamond Core */}
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-300 [.light_&]:bg-amber-600 rounded-[0.5px]" />
        </div>
      </div>

      {/* Right Gradient Line */}
      <div className="flex-1 max-w-xl h-[1.5px] bg-gradient-to-l from-transparent via-cyan-400/80 to-cyan-300 [.light_&]:via-amber-500/80 [.light_&]:to-amber-600" />
    </div>
  );
};

export default SectionDivider;
