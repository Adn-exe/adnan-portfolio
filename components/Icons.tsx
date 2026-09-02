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

  // Official Python Logo
  if (n.includes('python')) return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#3776AB" d="M63.6 2c-15.6 0-25.2 6.8-25.2 20.3v15h25.7v3.8H26.3C12.4 41.1 0 51.6 0 71.7c0 19.8 11.2 30.6 26.3 30.6h8.8v-14.6c0-14.7 12.6-26.7 27.8-26.7h25.4c12.2 0 22.1-9.9 22.1-22.1V22.3C110.4 8.7 99.4 2 83.8 2H63.6zm-13.8 9.5c3.7 0 6.7 3 6.7 6.8s-3 6.8-6.7 6.8c-3.8 0-6.8-3-6.8-6.8s3-6.8 6.8-6.8z" />
      <path fill="#FFD343" d="M64.4 126c15.6 0 25.2-6.8 25.2-20.3v-15H63.9v-3.8h37.8c13.9 0 26.3-10.5 26.3-30.6 0-19.8-11.2-30.6-26.3-30.6h-8.8v14.6c0 14.7-12.6 26.7-27.8 26.7H39.7c-12.2 0-22.1 9.9-22.1 22.1v16.6c0 13.6 11 20.3 26.6 20.3h20.2zm13.8-9.5c-3.7 0-6.7-3-6.7-6.8s3-6.8 6.7-6.8c3.8 0 6.8 3 6.8 6.8s-3 6.8-6.8 6.8z" />
    </svg>
  );

  // Official C Language Logo
  if (n === 'c' || n === 'c language') return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#00599C" d="M64 0l55.4 32v64L64 128 8.6 96V32z" />
      <path fill="#004481" d="M64 0l55.4 32v64L64 128z" opacity="0.3" />
      <path fill="#FFFFFF" d="M63.7 34c-17.5 0-31.7 14.2-31.7 31.7s14.2 31.7 31.7 31.7c11.8 0 22.1-6.5 27.5-16.1l-11.8-6.8c-3.1 6.3-9.5 10.6-16.7 10.6-10.5 0-19-8.5-19-19s8.5-19 19-19c7.2 0 13.6 4.3 16.7 10.6l11.8-6.8C85.8 40.5 75.5 34 63.7 34z" />
    </svg>
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
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="currentColor" d="M72 16h-4V8h8a4 4 0 000-8H52a4 4 0 000 8h8v8h-4c-4.4 0-8 3.6-8 8v36.8L20.8 98.4A24 24 0 0039.6 128h48.8a24 24 0 0018.8-29.6L80 62.8V24c0-4.4-3.6-8-8-8zm-8 56a6 6 0 110-12 6 6 0 010 12zm16 26a8 8 0 110-16 8 8 0 010 16z" />
    </svg>
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
    <svg viewBox="0 0 128 128" className={className}>
      <rect width="128" height="128" rx="16" fill="#F7DF1E" />
      <path fill="#000000" d="M67.3 100.3c3.5 2 7.6 3.3 11.8 3.3 6.9 0 11.2-3.4 11.2-8.5 0-5.8-4.7-8-12.7-11.4-11.6-4.9-19.1-11.1-19.1-23.4 0-13 10-22.9 25.8-22.9 7.6 0 13.5 1.8 17.5 4.1l-4.7 11.9c-3.2-1.8-7.3-3.2-12.3-3.2-6.5 0-10.2 3.3-10.2 7.7 0 5.4 4.3 7.5 12.3 10.9 12.5 5.3 19.6 11.5 19.6 24 0 13.4-10.4 23.9-27.7 23.9-8.7 0-16.1-2.4-20.2-5.1l4.7-11.3zM25.7 101.4l14.2-2.3c.7 4.1 2.5 6.9 7.3 6.9 4.3 0 7.1-2 7.1-9.9V39.4h15.2v56.7c0 16.1-9.3 22.4-22.3 22.4-11.8 0-19.6-6-21.5-17.1z" />
    </svg>
  );

  if (n === 'email') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
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

export const ElysiumLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L95 27.5V72.5L50 95L5 72.5V27.5L50 5Z" stroke="currentColor" strokeWidth="4" />
    <path d="M50 25L75 37.5V62.5L50 75L25 62.5V37.5L50 25Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
);
