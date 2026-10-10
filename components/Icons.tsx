import React from 'react';

export const TechIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  const n = name.toLowerCase();

  if (n === 'linkedin') return (
    <svg viewBox="0 0 24 24" fill="#0077B5" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );

  if (n === 'github') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  if (n === 'discord') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );

  // Official Python Logo
  if (n.includes('python')) return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#3776AB" d="M63.6 2c-15.6 0-25.2 6.8-25.2 20.3v15h25.7v3.8H26.3C12.4 41.1 0 51.6 0 71.7c0 19.8 11.2 30.6 26.3 30.6h8.8v-14.6c0-14.7 12.6-26.7 27.8-26.7h25.4c12.2 0 22.1-9.9 22.1-22.1V22.3C110.4 8.7 99.4 2 83.8 2H63.6zm-13.8 9.5c3.7 0 6.7 3 6.7 6.8s-3 6.8-6.7 6.8c-3.8 0-6.8-3-6.8-6.8s3-6.8 6.8-6.8z" />
      <path fill="#FFD343" d="M64.4 126c15.6 0 25.2-6.8 25.2-20.3v-15H63.9v-3.8h37.8c13.9 0 26.3-10.5 26.3-30.6 0-19.8-11.2-30.6-26.3-30.6h-8.8v14.6c0 14.7-12.6 26.7-27.8 26.7H39.7c-12.2 0-22.1 9.9-22.1 22.1v16.6c0 13.6 11 20.3 26.6 20.3h20.2zm13.8-9.5c-3.7 0-6.7-3-6.7-6.8s3-6.8 6.7-6.8c3.8 0 6.8 3 6.8 6.8s-3 6.8-6.8 6.8z" />
    </svg>
  );

  // Official C Language Logo
  if (n === 'c' || n === 'c language') return (
    <img src="/logos/c.png" alt="C" className={`${className} object-contain`} />
  );

  if (n === 'c++') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#00599C" d="M64 0l55.4 32v64L64 128 8.6 96V32z" />
      <path fill="#004481" d="M64 0l55.4 32v64L64 128z" opacity="0.3" />
      <path fill="#FFFFFF" d="M53 38c-14.4 0-26 11.6-26 26s11.6 26 26 26c9.7 0 18.2-5.3 22.6-13.2l-9.7-5.6c-2.6 5.2-7.8 8.8-13.7 8.8-8.6 0-15.6-7-15.6-15.6s7-15.6 15.6-15.6c5.9 0 11.1 3.6 13.7 8.8l9.7-5.6C71.2 43.3 62.7 38 53 38zm34 21v-8h-6v8h-8v6h8v8h6v-8h8v-6h-8zm20 0v-8h-6v8h-8v6h8v8h6v-8h8v-6h-8z" />
    </svg>
  );

  // Official TypeScript Logo
  if (n.includes('typescript')) return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path fill="#FFFFFF" d="M72.8 54.8h-18v50.7H41.6V54.8h-18V42.5h49.2v12.3zm41.7 13.5c-3.7-2.1-8.5-3.8-14.4-5.2-4.2-1-7.2-2.1-9-3.3-1.8-1.2-2.7-2.7-2.7-4.5 0-1.8.8-3.3 2.5-4.4 1.7-1.1 4-1.6 6.9-1.6 3.1 0 5.8.6 8 1.9 2.2 1.3 3.9 3.1 5 5.5l10.9-6.9c-2.3-4.1-5.8-7.3-10.6-9.6-4.8-2.3-10.6-3.4-17.4-3.4-6.4 0-11.8 1.1-16.1 3.3-4.3 2.2-7.6 5.3-9.9 9.3s-3.4 8.6-3.4 13.8c0 5.4 1.4 9.8 4.2 13.2 2.8 3.4 7.2 6.1 13.2 8.1 4.5 1.5 8.1 2.8 10.8 3.9 2.7 1.1 4.5 2.3 5.4 3.6.9 1.3 1.4 2.8 1.4 4.5 0 2.2-.9 4-2.8 5.4-1.9 1.4-4.8 2.1-8.7 2.1-4.7 0-8.8-1.1-12.3-3.3-3.5-2.2-5.9-5.4-7.2-9.6L54 100.9c2.2 6.1 6.2 10.8 12 14.1s12.8 5 21 5c7.3 0 13.4-1.2 18.2-3.6 4.8-2.4 8.5-5.8 11-10.2 2.5-4.4 3.8-9.4 3.8-15.1 0-5.6-1.5-10.1-4.4-13.6-2.9-3.4-7.5-6.2-13.7-8.2z" />
    </svg>
  );

  // Official R Project Logo
  if (n === 'r' || n === 'r programming') return (
    <svg viewBox="0 0 128 128" className={className}>
      <ellipse cx="64" cy="64" rx="58" ry="44" fill="#CBDAE4" />
      <ellipse cx="64" cy="64" rx="40" ry="28" fill="#FFFFFF" />
      <path fill="#276DC3" d="M50 38h28c11 0 19 6 19 16 0 8-5 14-12 16l14 20h-16l-12-18h-7v18H50V38zm14 12v12h12c5 0 8-2 8-6s-3-6-8-6H64z" />
      <path fill="#195B9B" d="M81 70l14 20h-16l-12-18h-5v-6h11c3 0 6 1 8 4z" />
    </svg>
  );

  // Official NumPy Logo
  if (n === 'numpy') return (
    <svg viewBox="0 0 128 128" className={className}>
      <polygon points="64,8 116,38 116,98 64,128 12,98 12,38" fill="#4D77CF" opacity="0.15" />
      <path fill="#4DABCF" d="M64 12l48 27.7v55.6L64 123 16 95.3V39.7L64 12zm0 8.5L23.4 43.8v47.7L64 114.8l40.6-23.3V43.8L64 20.5z" />
      <path fill="#013243" d="M36 44h14v18.5l26-18.5h16v48H78V73.5L52 92H36V44z" />
      <path fill="#4D77CF" d="M52 64l26-18.5v18L52 82V64z" />
    </svg>
  );

  // Official Pandas Logo
  if (n === 'pandas') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect x="20" y="20" width="38" height="38" rx="8" fill="#150458" />
      <rect x="70" y="20" width="38" height="38" rx="8" fill="#FFD43B" />
      <rect x="20" y="70" width="38" height="38" rx="8" fill="#00A3E0" />
      <rect x="70" y="70" width="38" height="38" rx="8" fill="#E70488" />
      <circle cx="39" cy="39" r="7" fill="#FFFFFF" />
      <circle cx="89" cy="89" r="7" fill="#FFFFFF" />
    </svg>
  );

  // Official React Logo
  if (n === 'react') return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );

  // Official Scikit-learn Logo
  if (n === 'sklearn' || n === 'scikit-learn') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#F89939" d="M24 74c0-23.2 18.8-42 42-42 9.8 0 18.8 3.4 26 9.1L82 51c-4.5-3.8-10.4-6-16.7-6-14.4 0-26 11.6-26 26s11.6 26 26 26c6.3 0 12.2-2.2 16.7-6l10 9.9c-7.2 5.7-16.2 9.1-26 9.1-23.2 0-42-18.8-42-42z" />
      <circle cx="66" cy="32" r="14" fill="#3499CD" />
      <circle cx="98" cy="54" r="12" fill="#F89939" />
      <circle cx="98" cy="94" r="14" fill="#3499CD" />
      <line x1="66" y1="32" x2="98" y2="54" stroke="#000" strokeWidth="4" opacity="0.3" />
      <line x1="98" y1="54" x2="98" y2="94" stroke="#000" strokeWidth="4" opacity="0.3" />
    </svg>
  );

  // Official Project Jupyter Logo
  if (n === 'jupyter') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#F37626" d="M64 16c21.5 0 39.5 14.3 45.2 34.1-3.6-2-7.8-3.1-12.2-3.1-14.4 0-26 11.6-26 26 0 2.4.3 4.7 1 6.9-2.6.7-5.3 1.1-8 1.1-21.5 0-39.5-14.3-45.2-34.1 3.6 2 7.8 3.1 12.2 3.1 14.4 0 26-11.6 26-26 0-2.4-.3-4.7-1-6.9 2.6-.7 5.3-1.1 8-1.1z" />
      <circle cx="97" cy="73" r="10" fill="#767677" />
      <circle cx="64" cy="110" r="8" fill="#F37626" />
      <circle cx="31" cy="40" r="6" fill="#767677" />
    </svg>
  );

  // Official Git Logo
  if (n.includes('git')) return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#F05032" d="M125.7 57.5L70.5 2.3c-3.1-3.1-8.1-3.1-11.2 0L46.8 14.8l14.2 14.2c3.3-1.1 7.2-.4 9.9 2.3 2.7 2.7 3.5 6.6 2.3 9.9l13.7 13.7c3.3-1.1 7.2-.4 9.9 2.3 3.8 3.8 3.8 9.9 0 13.7s-9.9 3.8-13.7 0c-2.9-2.9-3.6-7.2-2-10.6L67.7 46.9v35.3c1 .5 1.9 1.2 2.7 2 3.8 3.8 3.8 9.9 0 13.7s-9.9 3.8-13.7 0c-3.8-3.8-3.8-9.9 0-13.7.9-.9 2-1.6 3.2-2.1V46.1c-1.2-.5-2.3-1.2-3.2-2.1-2.9-2.9-3.6-7.1-2.1-10.5L40.3 19.3 2.3 57.3c-3.1 3.1-3.1 8.1 0 11.2l55.2 55.2c3.1 3.1 8.1 3.1 11.2 0l57-55c3.1-3.1 3.1-8.1 0-11.2z" />
    </svg>
  );

  // Official Flask Logo
  if (n === 'flask') return (
    <img src="/logos/flask.png" alt="Flask" className={`${className} object-contain rounded-[3px]`} />
  );

  // Professional REST API Logo
  if (n.includes('rest')) return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect x="10" y="24" width="108" height="80" rx="16" fill="#0284C7" opacity="0.2" />
      <rect x="10" y="24" width="108" height="80" rx="16" stroke="#00D1FF" strokeWidth="6" fill="none" />
      <path fill="#00D1FF" d="M34 52h14c6.6 0 12 4.5 12 10.5S54.6 73 48 73h-6v15H34V52zm8 14h6c2.8 0 5-1.6 5-3.5s-2.2-3.5-5-3.5h-6v7zM64 52h26v7H72v7h16v7H72v8h18v7H64V52zm34 0h10v29h16v7H98V52z" />
    </svg>
  );

  // Official W3C HTML5 Logo
  if (n === 'html' || n === 'html5') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#E34F26" d="M19.2 115.8L8.6 0h110.8l-10.6 115.8L64 128z" />
      <path fill="#EF652A" d="M64 117.8l38.2-10.6L111 10.6H64z" />
      <path fill="#EBEBEB" d="M64 53.6H43.8l-1.4-15.8H64V23H26.8l4.2 46.4H64zM64 92.4l-.2.1-16.3-4.4-1-11.7H31.7l2.1 23.3 30.2 8.4z" />
      <path fill="#FFFFFF" d="M64 53.6h20.2l-1.9 21.4-18.3 4.9V92.4l30.2-8.4 4.2-46.2H64zM64 23v14.8h37.4l.7-14.8z" />
    </svg>
  );

  // Official W3C CSS3 Logo
  if (n === 'css' || n === 'css3') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#1572B6" d="M19.2 115.8L8.6 0h110.8l-10.6 115.8L64 128z" />
      <path fill="#33A9DC" d="M64 117.8l38.2-10.6L111 10.6H64z" />
      <path fill="#EBEBEB" d="M64 53.6H43.8l-1.4-15.8H64V23H26.8l4.2 46.4H64zM64 92.4l-.2.1-16.3-4.4-1-11.7H31.7l2.1 23.3 30.2 8.4z" />
      <path fill="#FFFFFF" d="M64 53.6h20.2l-1.9 21.4-18.3 4.9V92.4l30.2-8.4 4.2-46.2H64zM64 23v14.8h37.4l.7-14.8z" />
    </svg>
  );

  if (n === 'tailwind' || n === 'tailwind css') return (
    <svg viewBox="0 0 24 24" fill="#06B6D4" className={className}>
      <path d="M12 6.018c-3.333 0-5 1.667-5 5s1.667 5 5 5 5-1.667 5-5-1.667-5-5-5zm0 2c1.667 0 2.5.833 2.5 2.5s-.833 2.5-2.5 2.5-2.5-.833-2.5-2.5.833-2.5 2.5-2.5zM12 12.018c-3.333 0-5 1.667-5 5s1.667 5 5 5 5-1.667 5-5-1.667-5-5-5zm0 2c1.667 0 2.5.833 2.5 2.5s-.833 2.5-2.5 2.5-2.5-.833-2.5-2.5.833-2.5 2.5-2.5z" />
    </svg>
  );

  if (n === 'js' || n === 'javascript') return (
    <img src="/logos/javascript.png" alt="JavaScript" className={`${className} object-contain rounded-[3px]`} />
  );

  if (n === 'email') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  // Prompt Engineering Icon (Sparkle/Wand)
  if (n === 'prompt' || n === 'prompt engineering') return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path d="M64 8l8 24h24l-20 16 8 24-20-16-20 16 8-24-20-16h24z" fill="#A855F7" />
      <path d="M96 56l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill="#C084FC" />
      <path d="M32 56l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill="#C084FC" />
      <rect x="56" y="80" width="16" height="40" rx="8" fill="#A855F7" opacity="0.7" />
      <circle cx="64" cy="80" r="6" fill="#E9D5FF" />
    </svg>
  );

  // Context Engineering Icon (Brain/Network)
  if (n === 'context' || n === 'context engineering') return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="40" r="20" stroke="#EC4899" strokeWidth="6" fill="#EC4899" fillOpacity="0.15" />
      <circle cx="28" cy="90" r="14" stroke="#EC4899" strokeWidth="5" fill="#EC4899" fillOpacity="0.15" />
      <circle cx="100" cy="90" r="14" stroke="#EC4899" strokeWidth="5" fill="#EC4899" fillOpacity="0.15" />
      <line x1="52" y1="56" x2="36" y2="78" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
      <line x1="76" y1="56" x2="92" y2="78" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
      <line x1="42" y1="90" x2="86" y2="90" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
      <circle cx="64" cy="40" r="6" fill="#F9A8D4" />
      <circle cx="28" cy="90" r="4" fill="#F9A8D4" />
      <circle cx="100" cy="90" r="4" fill="#F9A8D4" />
    </svg>
  );

  // Java Icon
  if (n === 'java') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#EA2D2E" d="M46.7 91.5c0 0-4.8 2.8 3.4 3.7 9.9 1.1 15.3 1 26.6-.9 0 0 3.7 2.3 8.8 4.3-30.8 13.1-61.9-2.2-38.8-7.1zM44.4 75.6c0 0-5.4 3.9 3.8 4.7 11.2 1 20.3 1.2 35.5-1.7 0 0 2.5 1.7 6.1 3.2-36.8 11.1-68.2.7-45.4-6.2z"/>
      <path fill="#5382A1" d="M68.5 45.4c4.6 5.3-1.2 10.1-1.2 10.1s11.7-6 6.3-13.6c-5.2-7.3-9.5-10.9 12.8-23.9 0 0-25.2 6.3-17.9 27.4zM78.6 19.3c8.1 9.4-4.8 15.8-4.8 15.8s15.9-8.2 8.5-18.7C74.9 6.2 70.8 2.2 99.4 0c0 0-31.8 6.4-20.8 19.3zM40.7 110.8c24.6 1.6 51.5-1.1 52.8-8.1 0 0-1.8 2.9-8.4 4.5-23.7 5.7-53.1 4.5-66.5 1.5 0 0 3.3 1.4 22.1 2.1zM34.8 124.9c36.4 2.3 75.8-1.5 77.8-12.7 0 0-3.9 4.3-15.8 6.6-35.8 6.9-79.6 4.9-92.4 1.3 0 0 4.1 2.5 30.4 4.8z"/>
      <path fill="#EA2D2E" d="M83.9 65.4s4.9-5.1-4.7-9.3c-11.6-5.1-17.1-7.6-5.8-18.9 0 0-23.5 6.3-15.6 22.5 8.8 18.2 26.1 5.7 26.1 5.7z"/>
      <path fill="#5382A1" d="M91.3 84.8c18.5-10.1 9.9-19.8 9.9-19.8-7.9 7.7-18.2 8.7-25.2 9.2 18.9 4.8 15.3 10.6 15.3 10.6z"/>
    </svg>
  );

  // FastAPI Icon
  if (n === 'fastapi' || n === 'fast api') return (
    <svg viewBox="0 0 128 128" className={className}>
      <circle cx="64" cy="64" r="60" fill="#05998B" />
      <path fill="#FFFFFF" d="M68 20L34 74h28l-8 34 38-54H64l8-34z" />
    </svg>
  );

  // LangChain Icon
  if (n === 'langchain') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="28" fill="#1C3C3C" />
      <path fill="#10B981" d="M42 44c0-8.8 7.2-16 16-16h24c8.8 0 16 7.2 16 16v8c0 4.4-3.6 8-8 8s-8-3.6-8-8v-8H58v8c0 4.4-3.6 8-8 8s-8-3.6-8-8v-8z" />
      <path fill="#34D399" d="M86 84c0 8.8-7.2 16-16 16H46c-8.8 0-16-7.2-16-16v-8c0-4.4 3.6-8 8-8s8 3.6 8 8v8h24v-8c0-4.4 3.6-8 8-8s8 3.6 8 8v8z" />
      <circle cx="50" cy="64" r="8" fill="#F59E0B" />
      <circle cx="78" cy="64" r="8" fill="#F59E0B" />
    </svg>
  );

  // Node.js Icon
  if (n === 'node' || n === 'node.js' || n === 'nodejs') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#539E43" d="M64 5.2L10.4 36.1v61.8L64 128.8l53.6-30.9V36.1L64 5.2zm38.2 84.4c-.6.9-1.4 1.8-2.4 2.5l-6.7 3.9c-2.4 1.4-5.3 1.4-7.7 0l-17-9.8c-1.3-.8-2.1-2.1-2.1-3.6V63.3c0-1.5.8-2.9 2.1-3.6l17-9.8c2.4-1.4 5.3-1.4 7.7 0l6.7 3.9c2.4 1.4 3.9 3.9 3.9 6.7v24.6c0 1.9-.6 3.6-1.5 4.5zM61.9 43.1L45 52.9c-2.4 1.4-3.9 3.9-3.9 6.7v19.6c0 2.8 1.5 5.3 3.9 6.7l16.9 9.8c2.4 1.4 5.3 1.4 7.7 0l6.7-3.9c1.8-1 2.9-2.8 3.3-4.7l-7.7-4.5c-.7.6-1.6.9-2.5.9-.9 0-1.8-.3-2.5-.9l-11.7-6.8c-.8-.5-1.3-1.3-1.3-2.3v-13c0-.9.5-1.8 1.3-2.3l11.7-6.8c1.6-.9 3.5-.9 5.1 0l11.7 6.8c.8.5 1.3 1.3 1.3 2.3v3.7l9-5.2v-1.2c0-2.8-1.5-5.3-3.9-6.7L76.9 43.1c-2.4-1.4-5.3-1.4-7.7 0z"/>
    </svg>
  );

  // SQL Icon
  if (n === 'sql') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#00758F" d="M64 12c-28.7 0-52 6.3-52 14v76c0 7.7 23.3 14 52 14s52-6.3 52-14V26c0-7.7-23.3-14-52-14z"/>
      <path fill="#0094B3" d="M64 16c26 0 46 5.4 46 10s-20 10-46 10-46-5.4-46-10 20-10 46-10z"/>
      <path fill="#005B70" d="M18 48c6.6 4.3 26 8 46 8s39.4-3.7 46-8v16c-6.6 4.3-26 8-46 8s-39.4-3.7-46-8V48zm0 28c6.6 4.3 26 8 46 8s39.4-3.7 46-8v16c-6.6 4.3-26 8-46 8s-39.4-3.7-46-8V76z"/>
      <text x="64" y="80" fill="#FFFFFF" fontFamily="monospace" fontWeight="900" fontSize="28" textAnchor="middle" letterSpacing="1">SQL</text>
    </svg>
  );

  // Django Icon
  if (n === 'django') return (
    <img src="/logos/django.png" alt="Django" className={`${className} object-contain rounded-[3px]`} />
  );

  // Stitch Icon
  if (n === 'stitch') return (
    <img src="/logos/stitch.png" alt="Stitch" className={`${className} object-contain rounded-[3px]`} />
  );

  // Codex Icon
  if (n === 'codex') return (
    <img src="/logos/codex.png" alt="Codex" className={`${className} object-contain rounded-[3px]`} />
  );

  // Antigravity Icon
  if (n === 'antigravity') return (
    <img src="/logos/antigravity.png" alt="Antigravity" className={`${className} object-contain`} />
  );

  // Canva Icon
  if (n === 'canva') return (
    <img src="/logos/canva.png" alt="Canva" className={`${className} object-contain rounded-[3px]`} />
  );

  // MySQL Icon
  if (n === 'mysql') return (
    <img src="/logos/mysql.png" alt="MySQL" className={`${className} object-contain rounded-[3px]`} />
  );

  // MongoDB Icon
  if (n === 'mongodb' || n === 'mangodb') return (
    <img src="/logos/mangoDB.png" alt="MongoDB" className={`${className} object-contain rounded-[3px]`} />
  );

  // Supabase Icon
  if (n === 'supabase') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#17221E"/>
      <path fill="#3ECF8E" d="M68.5 18c1.3-2.2 4.5-2.2 5.8 0l37.8 62.5c1.4 2.3-.2 5.3-2.9 5.3H63.6l3.9-38.3-23.7 21.6L68.5 18z"/>
      <path fill="#24B47E" d="M59.5 110c-1.3 2.2-4.5 2.2-5.8 0L15.9 47.5c-1.4-2.3.2-5.3 2.9-5.3h45.6l-3.9 38.3 23.7-21.6L59.5 110z"/>
    </svg>
  );

  // Firebase Icon
  if (n === 'firebase') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#1C1812"/>
      <path fill="#FFA000" d="M26.5 95.8L47.7 21.3c.7-2.4 4-2.7 5.1-.4l15 28.5L26.5 95.8z"/>
      <path fill="#F57C00" d="M72.2 55.4l8.2-15.6c1.1-2.1 4.2-2.1 5.3 0l15.8 56-29.3-40.4z"/>
      <path fill="#FFCA28" d="M26.5 95.8l37.5 21c1.9 1 4.1 1 6 0l31.5-17.6-75-3.4z"/>
      <path fill="#FFA000" d="M67.8 49.4L26.5 95.8l43.5 24.3c1.9 1 4.1 1 6 0L101.5 95.8 67.8 49.4z" opacity="0.3"/>
    </svg>
  );

  // Teamwork Icon
  if (n === 'teamwork') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#0C4A6E"/>
      <circle cx="64" cy="42" r="16" fill="#38BDF8"/>
      <circle cx="34" cy="52" r="12" fill="#7DD3FC"/>
      <circle cx="94" cy="52" r="12" fill="#7DD3FC"/>
      <path fill="#0284C7" d="M64 64c-17.7 0-32 12-32 26v6h64v-6c0-14-14.3-26-32-26z"/>
      <path fill="#0369A1" d="M34 70c-11 0-20 8-20 18v6h16v-6c0-7 2-13 6-18h-2zm60 0c4 5 6 11 6 18v6h16v-6c0-10-9-18-20-18h-2z"/>
    </svg>
  );

  // Problem Solving Icon
  if (n === 'problem-solving' || n === 'problem solving') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#451A03"/>
      <path fill="#F59E0B" d="M64 24c-17.7 0-32 14.3-32 32 0 11.2 5.8 21.1 14.6 26.8V90c0 3.3 2.7 6 6 6h22.8c3.3 0 6-2.7 6-6v-7.2C89.2 77.1 96 67.2 96 56c0-17.7-14.3-32-32-32z"/>
      <path fill="#FDE68A" d="M52 102c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4v-2H52v2z"/>
      <path fill="#B45309" d="M58 54h12v18H58z"/>
      <circle cx="64" cy="46" r="6" fill="#FFFFFF"/>
    </svg>
  );

  // Critical Thinking Icon
  if (n === 'critical-thinking' || n === 'critical thinking') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#2E1065"/>
      <circle cx="64" cy="64" r="32" fill="none" stroke="#8B5CF6" strokeWidth="6"/>
      <circle cx="64" cy="64" r="18" fill="none" stroke="#C4B5FD" strokeWidth="4" strokeDasharray="6 6"/>
      <circle cx="64" cy="64" r="8" fill="#A855F7"/>
      <circle cx="64" cy="24" r="6" fill="#A855F7"/>
      <circle cx="64" cy="104" r="6" fill="#A855F7"/>
      <circle cx="24" cy="64" r="6" fill="#A855F7"/>
      <circle cx="104" cy="64" r="6" fill="#A855F7"/>
      <line x1="64" y1="30" x2="64" y2="46" stroke="#8B5CF6" strokeWidth="4"/>
      <line x1="64" y1="82" x2="64" y2="98" stroke="#8B5CF6" strokeWidth="4"/>
      <line x1="30" y1="64" x2="46" y2="64" stroke="#8B5CF6" strokeWidth="4"/>
      <line x1="82" y1="64" x2="98" y2="64" stroke="#8B5CF6" strokeWidth="4"/>
    </svg>
  );

  // Time Management Icon
  if (n === 'time-management' || n === 'time management') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#064E3B"/>
      <circle cx="64" cy="64" r="42" fill="none" stroke="#10B981" strokeWidth="8"/>
      <circle cx="64" cy="64" r="5" fill="#34D399"/>
      <polyline points="64,36 64,64 82,76" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="64" cy="22" r="3" fill="#34D399"/>
      <circle cx="106" cy="64" r="3" fill="#34D399"/>
      <circle cx="64" cy="106" r="3" fill="#34D399"/>
      <circle cx="22" cy="64" r="3" fill="#34D399"/>
    </svg>
  );

  // Adaptability Icon
  if (n === 'adaptability') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#500724"/>
      <path d="M64 26a38 38 0 0 1 35 24" fill="none" stroke="#EC4899" strokeWidth="7" strokeLinecap="round"/>
      <polyline points="102,40 102,54 88,54" fill="none" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M64 102a38 38 0 0 1-35-24" fill="none" stroke="#F472B6" strokeWidth="7" strokeLinecap="round"/>
      <polyline points="26,88 26,74 40,74" fill="none" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="64" cy="64" r="10" fill="#EC4899"/>
    </svg>
  );

  // Creative Writing Icon
  if (n === 'creative-writing' || n === 'creative writing') return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="20" fill="#3B0764"/>
      {/* Pen nib */}
      <path fill="#E879F9" d="M64 18l18 36-12 12-6-6-6 6-12-12 18-36z"/>
      <path fill="#C026D3" d="M58 60l6 6 6-6 6 22H52l6-22z"/>
      <line x1="64" y1="88" x2="64" y2="108" stroke="#F0ABFC" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="64" cy="62" r="3" fill="#3B0764"/>
      {/* Writing sparkles */}
      <path fill="#F472B6" d="M96 32l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9z"/>
      <circle cx="32" cy="78" r="4" fill="#F0ABFC"/>
      <circle cx="98" cy="88" r="3" fill="#F0ABFC"/>
    </svg>
  );

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
};

