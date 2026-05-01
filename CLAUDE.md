# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server (port 3000)
npm run dev

# Production build
npm run build
```

## Architecture

This is a single-page React portfolio built with Vite, featuring cinematic animations and a "Magic Bento" design system.

### Tech Stack
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom theme variables
- **Animations**: Framer Motion for all motion effects
- **Build**: Vite with React plugin

### Project Structure

**Root-level files:**
- `App.tsx` - Main application entry point, orchestrates all sections
- `constants.ts` - Central data source for PROJECTS and SKILLS arrays
- `types.ts` - TypeScript interfaces (Project, Skill)
- `index.html` - HTML entry point with meta tags

**Components directory:**
- `Hero.tsx` - Landing section with animated text and visual effects
- `Skills.tsx` - "Magic Bento" grid with spotlight effect and 100px/s skill marquee
- `Projects.tsx` - Project gallery with hover effects and parallax
- `Navbar.tsx` - Navigation with theme toggle and terminal trigger
- `Terminal.tsx` - Draggable command center with CLI-style interface
- `Contact.tsx` - Contact section
- `Loader.tsx` - Initial loading animation
- `ScrollReveal.tsx` - Reusable scroll-triggered animation wrapper
- `Magnetic.tsx` - Magnetic hover effect component
- `CustomCursor.tsx` - Custom cursor following mouse
- `ThemeToggle.tsx` - Dark/light mode switcher
- `Icons.tsx` - TechIcon component for rendering technology icons
- `TechBackground.tsx` - Background decorative elements

**Hooks directory:**
- `useAudio.ts` - Web Audio API hook for hover/click sound effects

### Key Patterns

**Animation System:**
- All scroll animations use `ScrollReveal` wrapper with `animation`, `delay`, and `distance` props
- Framer Motion's `useMotionValue`, `useSpring`, and `useTransform` for smooth mouse-following effects
- No "pulse" effects - animations are stable and cinematic

**Data Flow:**
- All content data lives in `constants.ts` (PROJECTS, SKILLS)
- Components import directly from constants
- Terminal component mirrors this data for CLI-style display

**Terminal Component:**
- Draggable, animated command center
- Commands: `help`, `about`, `projects`, `skills`, `contact`, `whoami`, `clear`, `exit`
- Uses `useAudio` hook for sound feedback
- Maintains command history in state

**Styling:**
- Tailwind with custom theme variables (`--accent-color`, `--theme-text`, etc.)
- Glassmorphic design with backdrop-blur
- Custom scrollbar hiding via `scrollbar-hide` class

### Environment Variables

The project uses `.env.local` for API keys (currently configured for GEMINI_API_KEY in vite.config.ts). Use `.env.example` as a template.

### TypeScript Configuration

- Target: ES2022
- JSX: react-jsx
- Path alias: `@/*` maps to project root
