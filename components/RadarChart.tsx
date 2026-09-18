import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RADAR_DOMAINS, SKILLS } from '../constants';
import { Skill } from '../types';
import { TechIcon } from './Icons';

interface RadarChartProps {
  endSkills: Skill[]; // Array of 6 skills (one for each of the 6 web ends)
  selectedSkill: Skill;
  onSelectSkill: (skill: Skill) => void;
  onDropSkillOnEnd?: (skill: Skill, targetIndex: number) => void;
  onDropSkillOnWeb?: (skill: Skill) => void;
  draggedSkill?: Skill | null;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  endSkills,
  selectedSkill,
  onSelectSkill,
  onDropSkillOnEnd,
  onDropSkillOnWeb,
  draggedSkill = null,
  className = ''
}) => {
  // SVG ViewBox dimensions: width 700 x height 580 for generous horizontal & vertical clearance
  const width = 700;
  const height = 580;
  const centerX = width / 2; // 350
  const centerY = height / 2; // 290
  const maxRadius = 140; // outer 100% hexagon
  const axisLength = 172; // radial dotted axis line length (~172px)
  const chipGap = 16; // clean gap between axis arrow and chip boundary
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0]; // 5 concentric polygon tiers

  // Drag & drop local tracking
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragOverWeb, setIsDragOverWeb] = useState(false);

  // Hexagon points at radius r
  const getHexagonPoints = (radius: number) => {
    return RADAR_DOMAINS.map((domain) => {
      const angleRad = (domain.angleDeg * Math.PI) / 180;
      const x = centerX + radius * Math.cos(angleRad);
      const y = centerY + radius * Math.sin(angleRad);
      return `${x},${y}`;
    }).join(' ');
  };

  // Coordinates for the 6 web ends with directional outwards anchoring to prevent ANY overlap
  const endPositions = useMemo(() => {
    return RADAR_DOMAINS.map((domain, i) => {
      const angleRad = (domain.angleDeg * Math.PI) / 180;
      const axisEndX = centerX + axisLength * Math.cos(angleRad);
      const axisEndY = centerY + axisLength * Math.sin(angleRad);

      let x = axisEndX;
      let y = axisEndY;
      let transform = 'translate(-50%, -50%)';

      if (domain.angleDeg === -90) {
        // Top: Anchor above the axis arrow (grows upwards)
        y = axisEndY - chipGap;
        transform = 'translate(-50%, -100%)';
      } else if (domain.angleDeg === 90) {
        // Bottom: Anchor below the axis arrow (grows downwards)
        y = axisEndY + chipGap;
        transform = 'translate(-50%, 0%)';
      } else if (Math.cos(angleRad) > 0) {
        // Right side (-30° and 30°): Anchor on left edge (grows rightwards)
        x = axisEndX + chipGap;
        y = axisEndY;
        transform = 'translate(0%, -50%)';
      } else {
        // Left side (150° and 210°): Anchor on right edge (grows leftwards)
        x = axisEndX - chipGap;
        y = axisEndY;
        transform = 'translate(-100%, -50%)';
      }

      return {
        domainIndex: i,
        domainName: domain.name,
        angleDeg: domain.angleDeg,
        x,
        y,
        transform,
        axisEndX,
        axisEndY,
        xPercent: (x / width) * 100,
        yPercent: (y / height) * 100,
      };
    });
  }, [centerX, centerY, axisLength, width, height, chipGap]);

  // Polygon data points calculated from the currently displayed end skills' levels
  const polygonPoints = useMemo(() => {
    return RADAR_DOMAINS.map((domain, i) => {
      const currentSkill = endSkills[i];
      const level = currentSkill?.level ?? domain.baseline;
      const r = (level / 100) * maxRadius;
      const angleRad = (domain.angleDeg * Math.PI) / 180;
      const x = centerX + r * Math.cos(angleRad);
      const y = centerY + r * Math.sin(angleRad);
      return { x, y, r, angleRad, level, index: i, skill: currentSkill };
    });
  }, [endSkills, centerX, centerY, maxRadius]);

  const polygonSvgPoints = polygonPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Helper to extract skill from drag event
  const resolveDroppedSkill = (e: React.DragEvent): Skill | null => {
    if (draggedSkill) return draggedSkill;
    try {
      const skillName = e.dataTransfer.getData('text/plain');
      if (skillName) {
        return SKILLS.find((s) => s.name === skillName) || null;
      }
    } catch (err) {}
    return null;
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        if (!isDragOverWeb) setIsDragOverWeb(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDragOverWeb(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        const dropped = resolveDroppedSkill(e);
        if (dropped && onDropSkillOnWeb) {
          onDropSkillOnWeb(dropped);
        }
        setIsDragOverWeb(false);
        setDragOverIndex(null);
      }}
      className={`relative w-full max-w-[700px] aspect-[700/580] flex items-center justify-center select-none ${className}`}
    >
      {/* Background SVG Radar Web */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible filter drop-shadow-2xl"
      >
        <defs>
          {/* Cyber Blue Gradient for Dark Mode */}
          <linearGradient id="radarFillDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.12" />
          </linearGradient>

          {/* Native Amber Gold Gradient for Light Mode */}
          <linearGradient id="radarFillLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.50" />
            <stop offset="45%" stopColor="#B45309" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0.15" />
          </linearGradient>

          {/* High-Tech Super Glow Filter */}
          <filter id="radarSuperGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feGaussianBlur stdDeviation="2" result="sharpBlur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="sharpBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrowhead Marker */}
          <marker
            id="axisArrowEnd"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d="M 0 1 L 7 4 L 0 7 z"
              className="fill-zinc-400 dark:fill-zinc-400 [.light_&]:fill-zinc-500"
            />
          </marker>
        </defs>

        {/* --- Concentric Hexagonal Tiers (Clean Grid Spider Web) --- */}
        {levels.map((level, idx) => {
          const r = maxRadius * level;
          const points = getHexagonPoints(r);
          const isOuter = idx === levels.length - 1;

          return (
            <polygon
              key={`level-${idx}`}
              points={points}
              className={`
                transition-colors duration-300
                ${
                  idx % 2 === 0
                    ? 'fill-white/[0.035] dark:fill-white/[0.03] [.light_&]:fill-black/[0.03]'
                    : 'fill-white/[0.06] dark:fill-white/[0.05] [.light_&]:fill-black/[0.045]'
                }
                ${
                  isOuter
                    ? 'stroke-accent/70 dark:stroke-[#00D1FF]/70 [.light_&]:stroke-[#D97706]/70 stroke-[1.75]'
                    : 'stroke-zinc-500/40 dark:stroke-zinc-400/30 [.light_&]:stroke-zinc-400/50 stroke-[1.2]'
                }
              `}
            />
          );
        })}

        {/* --- Radial Dotted Axes with Arrows & Leader Lines to Chips --- */}
        {endPositions.map((pos, i) => {
          const isHighlighted = selectedSkill?.domainIndex === i;
          const isTargetedByDrag = dragOverIndex === i;

          return (
            <g key={`axis-group-${i}`}>
              {/* Leader guide line from arrow end to chip edge anchor */}
              <line
                x1={pos.axisEndX}
                y1={pos.axisEndY}
                x2={pos.x}
                y2={pos.y}
                strokeDasharray="2 3"
                className={`
                  transition-all duration-300
                  ${
                    isTargetedByDrag
                      ? 'stroke-accent dark:stroke-[#00D1FF] [.light_&]:stroke-[#D97706] stroke-[2.5] opacity-100'
                      : isHighlighted
                      ? 'stroke-[#00D1FF] dark:stroke-[#00D1FF] [.light_&]:stroke-[#D97706] stroke-[1.5] opacity-90'
                      : 'stroke-zinc-500/40 dark:stroke-zinc-600/50 [.light_&]:stroke-zinc-400/50 stroke-[1] opacity-60'
                  }
                `}
              />

              {/* Radial axis line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={pos.axisEndX}
                y2={pos.axisEndY}
                strokeDasharray="3 4"
                className={`
                  transition-all duration-300
                  ${
                    isTargetedByDrag
                      ? 'stroke-accent dark:stroke-[#00D1FF] [.light_&]:stroke-[#D97706] stroke-[3] opacity-100'
                      : isHighlighted
                      ? 'stroke-[#00D1FF] dark:stroke-[#00D1FF] [.light_&]:stroke-[#D97706] stroke-[2.5] opacity-100'
                      : 'stroke-zinc-400/60 dark:stroke-zinc-400/50 [.light_&]:stroke-zinc-400/70 stroke-[1.2] opacity-80'
                  }
                `}
                markerEnd="url(#axisArrowEnd)"
              />
            </g>
          );
        })}

        {/* --- Stepped Inner Holographic Layers --- */}
        {[0.4, 0.72].map((step, sIdx) => {
          const innerSvgPoints = polygonPoints
            .map((p) => {
              const ix = centerX + (p.x - centerX) * step;
              const iy = centerY + (p.y - centerY) * step;
              return `${ix},${iy}`;
            })
            .join(' ');

          return (
            <polygon
              key={`inner-layer-${sIdx}`}
              points={innerSvgPoints}
              className="pointer-events-none transition-all duration-500 fill-[#00D1FF]/[0.08] dark:fill-[#00D1FF]/[0.08] [.light_&]:fill-[#D97706]/[0.08] stroke-[#00D1FF]/40 dark:stroke-[#00D1FF]/40 [.light_&]:stroke-[#D97706]/40 stroke-[1]"
              strokeDasharray="3 4"
            />
          );
        })}

        {/* --- Main Active Radar Data Polygon (Dark Mode: Cyber Blue) --- */}
        <motion.polygon
          points={polygonSvgPoints}
          fill="url(#radarFillDark)"
          stroke="#00D1FF"
          strokeWidth={isDragOverWeb ? '4' : '3'}
          strokeLinejoin="round"
          filter="url(#radarSuperGlow)"
          className="transition-all duration-500 cursor-pointer block [.light_&]:hidden"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* --- Main Active Radar Data Polygon (Light Mode: Native Amber Gold) --- */}
        <motion.polygon
          points={polygonSvgPoints}
          fill="url(#radarFillLight)"
          stroke="#D97706"
          strokeWidth={isDragOverWeb ? '4' : '3'}
          strokeLinejoin="round"
          filter="url(#radarSuperGlow)"
          className="transition-all duration-500 cursor-pointer hidden [.light_&]:block"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* --- Center High-Tech HUD Reticle --- */}
        <g className="pointer-events-none">
          <circle
            cx={centerX}
            cy={centerY}
            r={isDragOverWeb ? '22' : '16'}
            fill="none"
            className="stroke-accent/30 dark:stroke-[#00D1FF]/30 [.light_&]:stroke-[#D97706]/30 stroke-[1] transition-all duration-300"
            strokeDasharray="3 3"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={isDragOverWeb ? '10' : '7'}
            fill="none"
            className="stroke-accent/60 dark:stroke-[#00D1FF]/60 [.light_&]:stroke-[#D97706]/60 stroke-[1.2] transition-all duration-300"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r="3"
            className="fill-accent dark:fill-[#00D1FF] [.light_&]:fill-[#D97706]"
          />
          {/* Subtle crosshair ticks */}
          <line
            x1={centerX - 11}
            y1={centerY}
            x2={centerX - 4}
            y2={centerY}
            className="stroke-accent/70 dark:stroke-[#00D1FF]/70 [.light_&]:stroke-[#D97706]/70 stroke-[1.2]"
          />
          <line
            x1={centerX + 4}
            y1={centerY}
            x2={centerX + 11}
            y2={centerY}
            className="stroke-accent/70 dark:stroke-[#00D1FF]/70 [.light_&]:stroke-[#D97706]/70 stroke-[1.2]"
          />
          <line
            x1={centerX}
            y1={centerY - 11}
            x2={centerX}
            y2={centerY - 4}
            className="stroke-accent/70 dark:stroke-[#00D1FF]/70 [.light_&]:stroke-[#D97706]/70 stroke-[1.2]"
          />
          <line
            x1={centerX}
            y1={centerY + 4}
            x2={centerX}
            y2={centerY + 11}
            className="stroke-accent/70 dark:stroke-[#00D1FF]/70 [.light_&]:stroke-[#D97706]/70 stroke-[1.2]"
          />
        </g>

        {/* --- Vertex Dots and Pulse Rings --- */}
        {polygonPoints.map((p, i) => {
          const isHighlighted = selectedSkill?.domainIndex === i;
          const isTargeted = dragOverIndex === i;

          return (
            <g
              key={`vertex-${i}`}
              onClick={() => {
                if (endSkills[i]) onSelectSkill(endSkills[i]);
              }}
              className="cursor-pointer group"
            >
              {/* Highlighted Dual Pulse Ripple */}
              {(isHighlighted || isTargeted) && (
                <>
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    className="text-[#00D1FF] dark:text-[#00D1FF] [.light_&]:text-[#D97706]"
                    strokeWidth="2"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 2.6, opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    className="text-[#00D1FF] dark:text-[#00D1FF] [.light_&]:text-[#D97706]"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 1.6, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                </>
              )}

              {/* Node Halo */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHighlighted || isTargeted ? '8' : '5'}
                className={`
                  transition-all duration-300
                  ${
                    isHighlighted || isTargeted
                      ? 'fill-white/20 dark:fill-white/20 [.light_&]:fill-black/10'
                      : 'fill-transparent group-hover:fill-accent/20'
                  }
                `}
              />

              {/* Main Node Dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHighlighted || isTargeted ? '6' : '4'}
                className={`
                  transition-all duration-300
                  ${
                    isHighlighted || isTargeted
                      ? 'fill-white stroke-[#00D1FF] dark:stroke-[#00D1FF] [.light_&]:stroke-[#D97706] stroke-[3]'
                      : 'fill-[#00D1FF] dark:fill-[#00D1FF] [.light_&]:fill-[#D97706] stroke-white/90 dark:stroke-[#0B0B14] [.light_&]:stroke-white stroke-[2] group-hover:scale-125'
                  }
                `}
              />

              {/* Crisp Center Pinpoint */}
              {(isHighlighted || isTargeted) && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="2"
                  className="fill-[#00D1FF] dark:fill-[#00D1FF] [.light_&]:fill-[#D97706]"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* --- HUD Guidance Pill while dragging --- */}
      <AnimatePresence>
        {(draggedSkill || isDragOverWeb) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
          >
            <div
              className={`
                px-3.5 py-1.5 rounded-none text-[10.5px] font-mono font-bold tracking-widest uppercase transition-all duration-200 border whitespace-nowrap shadow-xl
                ${
                  dragOverIndex !== null
                    ? 'bg-accent text-black dark:text-black [.light_&]:text-white border-accent shadow-[0_0_25px_var(--accent)] scale-105'
                    : isDragOverWeb
                    ? 'bg-surface text-accent border-accent shadow-[0_0_20px_var(--accent)]/40 backdrop-blur-md'
                    : 'bg-[#0B0B14]/90 dark:bg-[#0B0B14]/90 [.light_&]:bg-white/95 text-theme-secondary border-theme-border/80 backdrop-blur-md'
                }
              `}
            >
              {dragOverIndex !== null
                ? `Release to Mount on ${RADAR_DOMAINS[dragOverIndex].name}`
                : isDragOverWeb
                ? 'Drop to Equip on Web'
                : 'Drop on Any Web Vertex'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE 6 TECH STACK CHIPS AT THE WEB ENDS --- */}
      {endPositions.map((pos) => {
        const currentSkill = endSkills[pos.domainIndex];
        if (!currentSkill) return null;

        const isSelected = selectedSkill?.name === currentSkill.name;
        const isTargeted = dragOverIndex === pos.domainIndex;

        return (
          <div
            key={`end-chip-pos-${pos.domainIndex}`}
            style={{
              position: 'absolute',
              left: `${pos.xPercent}%`,
              top: `${pos.yPercent}%`,
              transform: pos.transform,
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.dataTransfer.dropEffect = 'copy';
              if (dragOverIndex !== pos.domainIndex) {
                setDragOverIndex(pos.domainIndex);
              }
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setDragOverIndex(null);
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const dropped = resolveDroppedSkill(e);
              if (dropped && onDropSkillOnEnd) {
                onDropSkillOnEnd(dropped, pos.domainIndex);
              }
              setDragOverIndex(null);
              setIsDragOverWeb(false);
            }}
            className="z-20 pointer-events-auto"
          >
            {/* Pulsing drop aura when any chip is being dragged */}
            {draggedSkill && (
              <div
                className={`
                  absolute inset-0 -m-2 pointer-events-none transition-all duration-200
                  ${
                    isTargeted
                      ? 'border-2 border-accent bg-accent/25 shadow-[0_0_25px_var(--accent)] scale-110'
                      : 'border-2 border-dashed border-accent/40 bg-accent/5 animate-pulse'
                  }
                `}
              />
            )}

            <AnimatePresence mode="wait">
              <motion.button
                key={currentSkill.name}
                onClick={() => onSelectSkill(currentSkill)}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', currentSkill.name);
                  e.dataTransfer.effectAllowed = 'copyMove';
                }}
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{
                  opacity: 1,
                  scale: isTargeted ? 1.1 : isSelected ? 1.05 : 1,
                  y: 0
                }}
                exit={{ opacity: 0, scale: 0.85, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`
                  group/end-chip relative flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-none border transition-all duration-300 whitespace-nowrap shadow-xl cursor-grab active:cursor-grabbing
                  ${
                    isTargeted
                      ? 'bg-accent/25 text-white dark:text-white [.light_&]:text-amber-950 border-accent shadow-[0_0_30px_var(--accent)] ring-2 ring-accent'
                      : isSelected
                      ? 'bg-accent/20 dark:bg-accent/20 text-white dark:text-white [.light_&]:text-amber-950 border-accent shadow-[0_0_25px_rgba(0,209,255,0.35)] [.light_&]:shadow-[0_0_20px_rgba(217,119,6,0.3)] ring-1 ring-accent'
                      : 'bg-zinc-900/90 dark:bg-[#161B26]/90 text-white dark:text-zinc-100 [.light_&]:bg-[#FAF8F2] [.light_&]:text-zinc-900 border-white/15 dark:border-white/20 [.light_&]:border-amber-600/30 hover:border-accent/70 hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl'
                  }
                `}
                title={`${currentSkill.name} - ${currentSkill.level}% Proficiency (Drag to swap or drop onto another end)`}
              >
                {/* Tech Icon */}
                <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 flex items-center justify-center transition-transform duration-200 group-hover/end-chip:scale-110">
                  <TechIcon name={currentSkill.icon} className="w-full h-full object-contain" />
                </div>

                {/* Tech Name */}
                <span
                  className={`text-xs sm:text-[13px] font-sans tracking-wide ${
                    isSelected || isTargeted
                      ? 'font-bold text-accent dark:text-[#00D1FF] [.light_&]:text-[#D97706]'
                      : 'font-semibold text-white dark:text-zinc-100 [.light_&]:text-zinc-900'
                  }`}
                >
                  {currentSkill.name}
                </span>

                {/* Level Badge at the end */}
                <span
                  className={`
                    text-[10px] sm:text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-none tabular-nums
                    ${
                      isSelected || isTargeted
                        ? 'bg-accent/30 text-accent dark:text-[#00D1FF] [.light_&]:text-[#D97706] border border-accent/60'
                        : 'bg-accent/15 text-accent dark:text-[#00D1FF] [.light_&]:text-[#D97706] border border-accent/30'
                    }
                  `}
                >
                  {currentSkill.level}%
                </span>
              </motion.button>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default RadarChart;
