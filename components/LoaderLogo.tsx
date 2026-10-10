import React from 'react';
import { motion } from 'framer-motion';

interface LoaderLogoProps {
  progress: number;
  isFinishing: boolean;
  className?: string;
}

// Master path extracted from adlogo.svg
const LOGO_PATH =
  "M811.5 681.43C790.97 660.34 770.4 639.51 747.29 621.19C700.88 584.41 647.69 557.75 593.08 535.44C552.98 519.06 511.83 505.5 471.96 488.53C445.32 477.18 418.01 462.83 397.39 442.11C389.82 434.5 382.86 426.23 377.76 416.72C374.88 411.33 372.41 405.46 371.11 399.47C363.59 364.8 390.36 337.23 415.9 318.43C459.01 286.68 518.46 270.93 571.5 272.28C579.79 272.49 588.22 273.03 596.42 274.31C602.82 275.31 609.1 277.42 615.5 278.1C630.3 248.28 643.61 212.84 650.72 180.34C652.37 172.76 653.77 164.99 654.56 157.27C655.14 151.69 655.18 145.95 656.28 140.5C658.35 144.69 659.23 150.53 660.41 155.19C662.64 163.93 665.07 172.61 667.29 181.35C674.01 207.77 681.12 234.1 688.12 260.45C710.72 345.5 732.6 430.84 757.24 515.34C764.96 541.82 772.7 568.29 780.72 594.68C784.52 607.19 787.84 619.97 792.26 632.29C796.2 643.28 799.91 654.3 804.46 665.06C806.64 670.21 811.45 676.03 811.5 681.43ZM606.01 297.5C558.86 270.09 487.69 279.1 445 311.5C413.25 335.59 395.04 373.19 418.06 410.4C428.29 426.94 444.3 438.74 460.32 449.15C485.5 465.54 513.28 477.21 540.19 490.35C576.01 507.84 611.79 525.28 646.43 545.03C675.47 561.59 702.3 580.87 729.5 600.16C729.62 593 725.34 584.34 723.01 577.49C717.55 561.5 712.48 545.35 707.32 529.26C690.39 476.5 673.42 423.68 655.27 371.31C648.81 352.67 642.48 333.11 630.03 317.47C625.86 312.23 620.55 306.16 614.5 303.21C609.74 313.14 605.47 323.31 600.76 333.27C585.88 364.71 569.88 395.66 554.26 426.74C548.35 438.51 542.42 450.26 536.53 462.04C533.91 467.26 531.73 474.78 527.5 478.74C520.97 475.33 514.44 471.91 507.92 468.5C515.52 455.09 524.33 442.18 532.71 429.23C548.16 405.37 562.48 380.8 576.66 356.18C583.78 343.8 590.52 331.17 596.86 318.37C600.14 311.76 604.45 304.7 606.01 297.5ZM900.18 424.5C895.98 426.92 890.29 427.27 885.5 427.8C871.38 429.39 856.8 427.87 843.04 424.49C807.62 415.79 776.96 396.94 747.84 375.64C739.99 369.9 732.54 363.66 725.31 357.17C722.86 354.97 719.35 352.76 717.53 349.98C714.73 345.71 710.73 327.87 710.22 322.5C714.86 324.83 718.96 329.18 723.17 332.35C732.08 339.08 740.98 345.85 749.7 352.82C781.13 377.95 825.24 413.81 864.74 422.63C876.73 425.31 888.07 424.75 900.18 424.5ZM802.93 637.5C807.73 637.53 821.36 644.15 827.57 645.8C843.45 650 860.06 652.2 876.5 651.81C938.33 650.32 1003.27 621.43 1040.14 570.68C1055.49 549.55 1068.06 523.29 1062.86 496.54C1055.8 460.26 1015.18 444.43 982.5 441.76C942.44 438.48 902.8 444.97 863.5 452.07C832.41 457.7 800.55 465.31 768.89 459.5C776.58 457.68 785.47 459.27 793.44 458.62C808.65 457.38 823.62 454.33 838.45 450.82C879.4 441.13 918.91 426.13 960.43 418.71C984.2 414.46 1009.81 412.32 1033.56 417.76C1065.11 424.98 1096.03 440.03 1103.7 474.66C1110.98 507.52 1093.88 540.33 1073.08 564.6C1029.7 615.26 961.91 646.74 896.53 655.27C867.56 659.05 826.27 657.81 802.93 637.5ZM513.06 511.5C509.54 518.9 506.02 526.3 502.5 533.69C491.27 532.63 480.04 531.56 468.82 530.5C474.87 520.83 480.93 511.17 486.99 501.5C495.68 504.83 504.37 508.17 513.06 511.5ZM989.05 869.5C970.5 875.86 950.86 876.54 931.49 874.24C916.56 872.47 901.91 868.23 888.04 862.47C843.54 843.98 809.85 808.24 784.06 768.4C760.3 731.71 740.5 691.98 711.86 658.68C668.95 608.77 606.65 573.51 543.23 557.38C509.16 548.71 473.6 544.48 438.5 543.15C348.57 539.74 251.82 556.9 176.8 609.33C147 630.17 114.5 661.06 111.1 699.5C107.36 741.78 141.04 767.37 179.25 773.41C220.89 780 266.35 765.97 301.75 744.27C313.72 736.93 325.69 728.81 335.5 718.7C334.06 724.73 326.37 730.1 321.62 734.1C307.53 745.97 290.89 756.27 273.93 763.45C263.49 767.88 253.15 772.36 242.29 775.71C233.19 778.51 223.81 781.04 214.46 782.8C175.46 790.15 129.35 789.6 98.64 760.89C90.08 752.88 83.27 743.11 79.54 731.94C68.47 698.8 89.3 667.68 111.4 644.9C157.25 597.66 228.63 566.65 291.82 551.43C408.57 523.3 546.7 530.11 657.15 579.4C711.46 603.64 756.2 637.87 799.84 677.64C832.25 707.18 860.56 742.83 883.33 780.21C900.5 808.4 912.85 843.23 942.7 860.81C951.8 866.17 962.01 868.82 972.5 869.32C977.92 869.58 983.89 868.38 989.05 869.5ZM498.02 554.5C496.82 563.05 490.39 572.19 486.45 579.93C476.77 598.95 465.77 617.61 453.61 635.14C404.58 705.79 343.76 769.31 269.97 814.46C248.32 827.7 226.23 839.49 202.84 849.39C197.45 851.67 182.28 859.12 177.36 858.5C204.9 845.04 231.07 829.9 254.9 810.43C320.77 756.61 368.99 682.61 416.85 613.32C430.92 592.93 442.43 570.78 456.61 550.5C467.08 549.13 487.26 552.38 498.02 554.5ZM617.5 593.2C629.78 595.03 628.94 603.38 629.76 613.5C631.21 631.49 629.44 649.29 625.41 666.82C614.07 716.18 580.22 758.88 540.08 788.56C531.36 795.01 522.41 801.04 513.05 806.54C509.17 808.82 504.96 812.4 500.54 812.5C570.95 765.58 626 680.28 617.5 593.2Z";

export const LoaderLogo: React.FC<LoaderLogoProps> = ({ progress, isFinishing, className = '' }) => {
  // Normalize progress (0 to 1)
  const normProgress = Math.min(1, Math.max(0, progress / 100));

  // Stroke draw completes around 80%
  const strokeProgress = Math.min(1, normProgress / 0.85);

  // Fill opacity begins at 35% and saturates by 95%
  const fillOpacity = Math.max(0, Math.min(1, (normProgress - 0.35) / 0.6));

  // Aura intensity: subtle and refined
  const auraGlow = 0.12 + normProgress * 0.2;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Gentle Supernova Shockwave on Finish */}
      {isFinishing && (
        <motion.div
          className="absolute inset-[-15px] rounded-full border border-accent/40 pointer-events-none"
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}

      {/* Subtle, Lightweight Ambient Backlight */}
      <motion.div
        className="absolute inset-[-25px] blur-xl rounded-full bg-accent/30 pointer-events-none"
        animate={{
          opacity: isFinishing ? 0 : [auraGlow * 0.8, auraGlow * 1.1, auraGlow * 0.8],
          scale: isFinishing ? 1.05 : [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: isFinishing ? 0.4 : 2.4,
          repeat: isFinishing ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Logo Container with 3D Micro-Float */}
      <motion.div
        className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
        animate={{
          scale: isFinishing ? 1.04 : [1, 1.02, 1],
        }}
        transition={{
          duration: isFinishing ? 0.4 : 3,
          repeat: isFinishing ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          viewBox="0 0 1165 1030"
          className="w-full h-full overflow-visible drop-shadow-[0_0_6px_var(--accent)] filter"
        >
          <defs>
            {/* Linear Gradient for High-Voltage Stroke Tracing */}
            <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
            </linearGradient>

            {/* Specular Diagonal Light Sweep Gradient */}
            <linearGradient id="sheenGlint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="45%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
              <stop offset="55%" stopColor="transparent" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Layer 1: Faint Blueprint Guide Track */}
          <path
            d={LOGO_PATH}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeOpacity="0.16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Layer 2: Radiant Inner Core Fill that materializes as progress mounts */}
          <motion.path
            d={LOGO_PATH}
            fillRule="evenodd"
            className="fill-theme-text"
            animate={{
              fillOpacity: fillOpacity,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            stroke="none"
          />

          {/* Layer 3: High-Voltage Dynamic Laser Stroke Traced in Sync with Progress */}
          <motion.path
            d={LOGO_PATH}
            fill="none"
            stroke="url(#laserBeamGrad)"
            strokeWidth={progress > 95 ? 4.5 : 5.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: strokeProgress,
              strokeOpacity: strokeProgress > 0.02 ? 1 : 0,
            }}
            transition={{
              pathLength: { duration: 0.15, ease: 'easeOut' },
            }}
          />

          {/* Layer 4: Laser Particle Head Spark (Glow Accent) */}
          <motion.path
            d={LOGO_PATH}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: Math.min(1, strokeProgress),
              pathOffset: Math.max(0, strokeProgress - 0.08),
              strokeOpacity: strokeProgress < 0.98 ? 1 : 0,
            }}
            transition={{
              duration: 0.15,
              ease: 'easeOut',
            }}
          />
        </svg>

      </motion.div>
    </div>
  );
};

export default LoaderLogo;
