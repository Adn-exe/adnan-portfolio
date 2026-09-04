import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { PROJECTS, SKILLS } from '../constants';
import { useAudio } from '../hooks/useAudio';

const COMMANDS = [
  { cmd: 'help', desc: 'List all available commands' },
  { cmd: 'about', desc: 'Display information about me' },
  { cmd: 'projects', desc: 'List featured projects' },
  { cmd: 'skills', desc: 'Show technical arsenal' },
  { cmd: 'contact', desc: 'Get contact details' },
  { cmd: 'whoami', desc: 'Display current user identity' },
  { cmd: 'clear', desc: 'Clear the terminal screen' },
  { cmd: 'exit', desc: 'Close the command center' },
  { cmd: 'matrix', desc: 'Enter the matrix (easter egg)' },
  { cmd: 'sudo', desc: 'Attempt superuser access (easter egg)' },
  { cmd: 'date', desc: 'Show current date and time' },
  { cmd: 'echo', desc: 'Echo a message (usage: echo <message>)' },
  { cmd: 'secret', desc: '???' },
  { cmd: 'quantum', desc: 'Simulate quantum state collapse' },
  { cmd: 'train', desc: 'Train neural network model (simulation)' },
  { cmd: 'achieve', desc: 'Show unlocked achievements' },
  { cmd: 'resume', desc: 'Open/Download my professional resume' },
];

const ASCII_ART = `
  █████╗  ██████╗  ███╗   ██╗ █████╗  ███╗   ██╗
 ██╔══██╗ ██╔══██╗ ████╗  ██║██╔══██╗ ████╗  ██║
 ███████║ ██║  ██║ ██╔██╗ ██║███████║ ██╔██╗ ██║
 ██╔══██║ ██║  ██║ ██║╚██╗██║██╔══██║ ██║╚██╗██║
 ██║  ██║ ██████╔╝ ██║ ╚████║██║  ██║ ██║ ╚████║
 ╚═╝  ╚═╝ ╚═════╝  ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═╝  ╚═══╝
             [ >_ ] COMMAND CENTER v1.0.4
`;

const QuantumSimulator: React.FC = () => {
  const [qubits, setQubits] = useState(['|0⟩', '|0⟩', '|0⟩']);
  const [phase, setPhase] = useState(0);
  const [status, setStatus] = useState('Superposition Active');

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setPhase((prev) => (prev + 12) % 360);
      
      setQubits(prev => prev.map(() => {
        const rand = Math.random();
        if (rand < 0.3) return 'α|0⟩ + β|1⟩';
        if (rand < 0.6) return '(|0⟩ - |1⟩)/√2';
        return '(|0⟩ + |1⟩)/√2';
      }));

      if (frame > 25) {
        clearInterval(interval);
        const finalStates = ['|0⟩', '|1⟩', '|0⟩'];
        setQubits(finalStates);
        setStatus('Collapsed to State |010⟩ (Prob: 37.4%)');
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-accent space-y-2 py-2 border-l border-accent/20 pl-4 mt-2">
      <div className="text-[10px] text-white/50 uppercase tracking-widest">Quantum Engine initialized...</div>
      <div className="flex gap-4 text-xs font-bold">
        {qubits.map((q, i) => (
          <div key={i} className="bg-accent/10 px-3 py-1 rounded border border-accent/20">
            Q[{i}]: {q}
          </div>
        ))}
      </div>
      <div className="text-[11px] text-white">
        Phase Offset: <span className="text-yellow-400">{phase}°</span> // State: <span className={status.startsWith('Collapsed') ? 'text-emerald-400 font-bold' : 'text-accent animate-pulse'}>{status}</span>
      </div>
    </div>
  );
};

const ModelTrainer: React.FC = () => {
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(0.98);
  const [accuracy, setAccuracy] = useState(0.12);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEpoch((prev) => {
        const next = prev + 1;
        if (next >= 10) {
          clearInterval(interval);
          setIsFinished(true);
          setProgress(100);
          setLoss(0.043);
          setAccuracy(0.987);
          return 10;
        }
        
        setLoss((prevLoss) => Math.max(0.05, prevLoss - Math.random() * 0.15));
        setAccuracy((prevAcc) => Math.min(0.99, prevAcc + Math.random() * 0.1));
        setProgress(next * 10);
        return next;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const barLength = 20;
  const filledLength = Math.round((progress / 100) * barLength);
  const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);

  return (
    <div className="font-mono text-xs text-theme-text/80 space-y-2 py-2 border-l border-white/10 pl-4 mt-2">
      <div className="text-yellow-400 font-bold">TRAINING: NeuralNetworkClassifier (Optimizer: Adam, lr: 0.001)</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px]">
        <div>Epoch: <span className="text-white font-bold">{epoch}/10</span></div>
        <div>Loss: <span className="text-red-400 font-bold">{loss.toFixed(4)}</span></div>
        <div>Accuracy: <span className="text-emerald-400 font-bold">{(accuracy * 100).toFixed(1)}%</span></div>
        <div>Progress: <span className="text-accent font-bold">{progress}%</span></div>
      </div>
      <div className="text-[10px] text-accent/60 tracking-wider">
        {bar} {progress}%
      </div>
      {isFinished && (
        <div className="text-emerald-400 font-bold text-[10px] animate-pulse">
          ✓ MODEL TRAINING SUCCEEDED. Weights saved to adnan-mainframe-01.h5
        </div>
      )}
    </div>
  );
};

interface TerminalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface HistoryItem {
  type: 'input' | 'output' | 'system';
  content: React.ReactNode;
  typing?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { playHover, playClick, playHover: playTypeSound } = useAudio();
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: <pre className="text-accent leading-none font-bold text-[8px] md:text-[10px] mb-4 opacity-80">{ASCII_ART}</pre> },
    { type: 'system', content: 'SYSTEM BOOT SEQUENCE COMPLETE...' },
    { type: 'system', content: 'ESTABLISHING SECURE PROTOCOL...' },
    { type: 'output', content: 'Welcome, Authorized User. Type "help" to begin.' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Click outside to close terminal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        terminalRef.current &&
        !terminalRef.current.contains(event.target as Node)
      ) {
        const fabButton = document.querySelector('[aria-label="Toggle Terminal"]');
        if (fabButton && fabButton.contains(event.target as Node)) {
          return;
        }
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      if (isMobile) {
        document.body.style.overflow = 'hidden';
      }
      if (inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  // Keyboard shortcut for terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const typeText = (text: string, callback: () => void) => {
    let index = 0;
    const chars = text.split('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < chars.length) {
        setHistory(prev => {
          const newHistory = [...prev];
          const lastItem = newHistory[newHistory.length - 1];
          if (lastItem && lastItem.typing) {
            lastItem.content = text.substring(0, index + 1);
          }
          return newHistory;
        });
        playTypeSound();
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        callback();
      }
    }, 30);

    return interval;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    playClick();
    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, { type: 'input', content: input }];

    // Add to command history
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 mt-2 border-l border-accent/20 pl-4">
              {COMMANDS.map((c) => (
                <div key={c.cmd} className="text-[11px] flex justify-between gap-4">
                  <span className="text-accent font-bold min-w-[70px]">{c.cmd}</span>
                  <span className="text-theme-secondary opacity-60 text-right">{c.desc}</span>
                </div>
              ))}
            </div>
          ),
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          typing: true,
          content: '',
        });
        setHistory(newHistory);
        typeText("I’m an AI/ML student passionate about understanding how intelligent systems work, with a focus on building strong foundations and turning ideas into practical solutions. I enjoy breaking down complex problems, building real-world AI projects, and exploring the intersection of AI and software. I’m always looking to learn, collaborate, and grow through meaningful hands-on work.", () => {
          setHistory(prev => prev.map((item, i) =>
            i === prev.length - 1 ? { ...item, typing: false } : item
          ));
        });
        setInput('');
        return;
      case 'projects':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-4 mt-2">
              {PROJECTS.map((p) => (
                <div key={p.id} className="border-l-2 border-accent/30 pl-4 py-1 hover:border-accent transition-colors">
                  <div className="text-accent font-black text-xs uppercase tracking-tighter">{p.title}</div>
                  <div className="text-[10px] text-theme-secondary/80 leading-relaxed mt-1 font-light">{p.description}</div>
                  <div className="flex gap-2 mt-2">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-accent/10 text-accent px-1.5 py-0.5 rounded uppercase font-bold">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          content: (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
              {SKILLS.map((s) => (
                <div key={s.name} className="text-[11px] flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent transition-colors" />
                  <span className="text-theme-text font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          )
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2 mt-2 border border-white/5 bg-white/[0.02] p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold min-w-[60px]">EMAIL:</span>
                <span className="text-theme-secondary">mohammedadnan@portfolio.dev</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold min-w-[60px]">GITHUB:</span>
                <span className="text-theme-secondary hover:text-accent transition-colors">github.com/Adn-exe</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold min-w-[60px]">LINKEDIN:</span>
                <span className="text-theme-secondary hover:text-accent transition-colors">linkedin.com/in/mohammed-adnan</span>
              </div>
            </div>
          ),
        });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', content: (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500/80">mohammed_adnan@portfolio:~$ Guest User (Level: Admin Access)</span>
          </div>
        )});
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        break;
      case 'matrix':
        newHistory.push({
          type: 'output',
          content: (
            <div className="text-green-400 font-mono text-xs mt-2 space-y-1">
              <div className="animate-pulse">Wake up, Neo...</div>
              <div className="opacity-80">The Matrix has you...</div>
              <div className="opacity-60">Follow the white rabbit. 🐇</div>
              <div className="pt-2 text-[8px] opacity-40">KNOCK, KNOCK.</div>
            </div>
          ),
        });
        break;
      case 'sudo':
        newHistory.push({
          type: 'output',
          content: (
            <div className="text-red-400 font-mono text-xs mt-2 border border-red-500/20 bg-red-500/5 p-3 rounded">
              <div>[sudo] password for guest: ********</div>
              <div className="mt-1 font-bold">PERMISSION DENIED</div>
              <div className="mt-1 text-[10px] opacity-60">This incident will be reported to the orbital strike team.</div>
            </div>
          ),
        });
        break;
      case 'date':
        newHistory.push({
          type: 'output',
          content: <span className="text-accent">{new Date().toString()}</span>,
        });
        break;
      case 'secret':
        newHistory.push({
          type: 'output',
          content: (
            <div className="text-accent space-y-2 p-3 border border-accent/20 bg-accent/5 rounded-lg">
              <div className="font-bold">DECRYPTING CLASSIFIED DATA...</div>
              <div className="text-[10px] opacity-70">
                You've found a hidden node. Try these hidden commands:
                <br />
                <span className="text-white font-mono">• "core" - Access core memories</span>
                <br />
                <span className="text-white font-mono">• "override" - ???</span>
              </div>
            </div>
          )
        });
        break;
      case 'core':
        newHistory.push({
           type: 'output',
           content: (
             <div className="text-purple-400 space-y-1">
               <div>ACCESSING CORE MEMORY VAULT...</div>
               <div className="text-[10px] opacity-60">Status: Entangled // Location: Quantum Plane</div>
               <div className="mt-2 text-white">"Every line of code is a memory of a problem solved."</div>
             </div>
           )
        });
        break;
      case 'achieve':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-3 mt-2">
              <div className="text-accent font-bold uppercase tracking-widest text-[10px]">Unlocked Achievements</div>
              <div className="space-y-2">
                <div className="flex gap-3 items-center opacity-100">
                  <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[8px] text-primary font-bold">✓</div>
                  <div className="text-[11px]"><span className="text-white font-bold">First Contact</span> - Opened the Terminal</div>
                </div>
                <div className="flex gap-3 items-center opacity-40">
                  <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-white font-bold">?</div>
                  <div className="text-[11px]"><span>Master Hacker</span> - ???</div>
                </div>
              </div>
            </div>
          )
        });
        break;
      case 'quantum':
        newHistory.push({
          type: 'output',
          content: <QuantumSimulator />,
        });
        break;
      case 'resume':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2 mt-2 border border-white/5 bg-white/[0.02] p-4 rounded-lg">
              <div className="flex flex-col gap-2">
                <span className="text-accent font-bold">Resume Options:</span>
                <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-6">
                  <a 
                    href="https://drive.google.com/file/d/1UTLmV5K6b1z0jgcAhCU-qIW2rwdiD1RN/view?usp=drive_link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-theme-secondary hover:text-accent transition-colors underline"
                  >
                    [View Resume in Browser]
                  </a>
                  <a 
                    href="https://drive.google.com/uc?export=download&id=1UTLmV5K6b1z0jgcAhCU-qIW2rwdiD1RN" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-theme-secondary hover:text-accent transition-colors underline"
                  >
                    [Download PDF Version]
                  </a>
                </div>
              </div>
            </div>
          )
        });
        window.open('https://drive.google.com/file/d/1UTLmV5K6b1z0jgcAhCU-qIW2rwdiD1RN/view?usp=drive_link', '_blank');
        break;
      case 'train':
        newHistory.push({
          type: 'output',
          content: <ModelTrainer />,
        });
        break;
      default:
        if (cmd.startsWith('echo ')) {
          const message = cmd.substring(5);
          newHistory.push({
            type: 'output',
            content: <span className="italic">"{message}"</span>,
          });
        } else {
          newHistory.push({
            type: 'output',
            content: <span className="text-red-400/80">Command not found: <span className="font-bold underline">{cmd}</span>. Type "help" for a list of commands.</span>,
          });
        }
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find(c => c.cmd.startsWith(input.toLowerCase()));
      if (match && input.length > 0) {
        setInput(match.cmd);
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={terminalRef}
            initial={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, y: 40, scale: 0.9, rotateX: -20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, y: 40, scale: 0.9, rotateX: -20 }}
            transition={isMobile ? { type: 'spring', damping: 25, stiffness: 250 } : undefined}
            drag={isMobile ? false : true}
            dragControls={dragControls}
            dragListener={!isMobile}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-28 md:left-8 md:right-auto z-[100] w-full md:w-[600px] h-[80dvh] md:h-[500px] bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)] flex flex-col perspective-[1000px] ring-1 ring-white/5"
          >
            {/* CRT Overlay Effect */}
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-2xl opacity-[0.03]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-white/5 to-transparent h-20 w-full" />
            </div>

            {/* Terminal Header */}
            <div 
              onPointerDown={(e) => dragControls.start(e)}
              className="flex items-center justify-between px-6 py-4 bg-white/[0.04] border-b border-white/5 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors shadow-[0_0_8px_rgba(255,95,86,0.2)] focus:outline-none"
                  aria-label="Close Terminal"
                />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors shadow-[0_0_8px_rgba(255,189,46,0.2)]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors shadow-[0_0_8px_rgba(39,201,63,0.2)]" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-5 h-5 rounded bg-accent/10 border border-accent/30 text-accent shadow-[0_0_10px_rgba(0,209,255,0.2)]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6-6-6M12 19h8" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.35em] font-black">ADNAN_OS_TERMINAL v1.0.4</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-all p-1 hover:rotate-90 duration-300 focus:outline-none"
                aria-label="Close Terminal"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 p-8 font-mono text-[13px] overflow-y-auto custom-scrollbar space-y-4 selection:bg-accent/40 selection:text-white scroll-smooth"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex flex-col gap-1 mb-8">
                <div className="text-accent font-bold opacity-40 text-[9px] tracking-[0.3em] uppercase">Kernel initialization sequence... [OK]</div>
                <div className="text-white/30 text-[9px] tracking-widest uppercase">Secure node: adnan-mainframe-01</div>
                <div className="h-[1px] w-16 bg-gradient-to-r from-accent/40 to-transparent mt-3" />
              </div>

              {history.map((item, i) => (
                <div key={i} className={item.type === 'input' ? 'text-white' : item.type === 'system' ? 'text-accent/40 text-[10px] tracking-widest italic uppercase' : 'text-theme-secondary'}>
                  {item.type === 'input' ? (
                    <span className="flex items-center gap-4">
                      <span className="text-accent font-black drop-shadow-[0_0_5px_rgba(0,209,255,0.5)]">❯</span>
                      <span className="opacity-95 font-bold tracking-tight">{item.content}</span>
                    </span>
                  ) : (
                    <div className={item.type === 'system' ? 'py-1' : 'pl-7 border-l-2 border-white/5 ml-2 py-1.5 hover:border-accent/20 transition-colors'}>
                      {item.typing ? (
                        <span className="text-accent leading-relaxed">{item.content}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle" /></span>
                      ) : (
                        <div className="leading-relaxed">{item.content}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <form onSubmit={handleCommand} className="flex gap-4 items-center group relative pb-4">
                <span className="text-accent font-black group-focus-within:animate-pulse drop-shadow-[0_0_5px_rgba(0,209,255,0.5)]">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 placeholder:text-white/5 disabled:opacity-50 font-bold"
                  placeholder={isTyping ? 'SYSTEM BUSY...' : 'ENTER COMMAND...'}
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>

            {/* Terminal Footer */}
            <div className="px-8 py-3 bg-white/[0.03] border-t border-white/5 flex justify-between items-center select-none">
              <div className="flex gap-6">
                <div className="text-[9px] text-white/20 font-mono tracking-widest uppercase">UTF-8</div>
                <div className="text-[9px] text-white/20 font-mono tracking-widest uppercase">ZSH-ADNAN</div>
              </div>
              <div className="text-[10px] text-accent/50 font-black tracking-[0.2em] uppercase italic drop-shadow-[0_0_3px_rgba(0,209,255,0.2)]">Command Center v1.0.4</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 209, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 209, 255, 0.3);
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      ` }} />
    </>
  );
};

export default Terminal;

