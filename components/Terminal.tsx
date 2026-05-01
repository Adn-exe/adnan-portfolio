import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
];

interface TerminalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const { playHover, playClick } = useAudio();
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: React.ReactNode }[]>([
    { type: 'output', content: 'Welcome to the Command Center v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playClick();
    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, { type: 'input', content: input }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {COMMANDS.map((c) => (
                <div key={c.cmd} className="text-[11px]">
                  <span className="text-accent font-bold">{c.cmd}</span> - {c.desc}
                </div>
              ))}
            </div>
          ),
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          content: "I'm an AIML engineering student passionate about building intelligent systems. My focus lies in understanding the fundamentals of how systems behave at their core, bridging the gap between theory and practical engineering.",
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-3 mt-2">
              {PROJECTS.map((p) => (
                <div key={p.id} className="border-l border-accent/30 pl-3">
                  <div className="text-accent font-bold text-xs uppercase tracking-wider">{p.title}</div>
                  <div className="text-[10px] text-theme-secondary leading-relaxed">{p.description}</div>
                  <div className="text-[9px] text-accent/50 mt-1">{p.tags.join(' • ')}</div>
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
                <div key={s.name} className="text-[11px] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-theme-text">{s.name}</span>
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
            <div className="space-y-1 mt-1">
              <div>Email: mohammedadnan@portfolio.dev</div>
              <div>GitHub: github.com/Adn-exe</div>
              <div>LinkedIn: linkedin.com/in/mohammed-adnan</div>
            </div>
          ),
        });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', content: 'mohammed_adnan@portfolio:~$ Guest User (Level: Admin Access)' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        break;
      default:
        newHistory.push({
          type: 'output',
          content: `Command not found: ${cmd}. Type "help" for a list of commands.`,
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 40, scale: 0.9, rotateX: -20 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="fixed bottom-28 left-8 z-[100] w-[calc(100vw-4rem)] md:w-[550px] h-[450px] bg-primary/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col perspective-[1000px]"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-white/[0.03] border-b border-white/5 cursor-move">
              <div className="flex gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.3)]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.3)]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.3)]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] font-bold">System Terminal // Adnan-OS</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/20 hover:text-white transition-colors p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 font-mono text-[13px] overflow-y-auto scrollbar-hide space-y-3 selection:bg-accent/30 selection:text-white"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex flex-col gap-1 mb-6">
                <div className="text-accent font-bold opacity-50 text-[10px] tracking-widest uppercase">Initializing kernel...</div>
                <div className="text-white/40 text-[10px]">Connection established via secure-socket-01</div>
                <div className="h-[1px] w-12 bg-accent/20 mt-2" />
              </div>

              {history.map((item, i) => (
                <div key={i} className={item.type === 'input' ? 'text-white' : 'text-theme-secondary'}>
                  {item.type === 'input' ? (
                    <span className="flex items-center gap-3">
                      <span className="text-accent font-black">❯</span> 
                      <span className="opacity-90">{item.content}</span>
                    </span>
                  ) : (
                    <div className="pl-6 border-l border-white/5 ml-1.5 py-1">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex gap-3 items-center group">
                <span className="text-accent font-black group-focus-within:animate-pulse">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 placeholder:text-white/10"
                  placeholder="enter command..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>

            {/* Terminal Footer */}
            <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center">
              <div className="text-[9px] text-white/20 font-mono">UTF-8 // ZSH</div>
              <div className="text-[9px] text-accent/40 font-mono tracking-widest uppercase">Adnan-Portfolio-v1.0</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
