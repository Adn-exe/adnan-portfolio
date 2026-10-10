# 🌌 Adnan's Developer Portfolio

> A cinematic, high-performance, and deeply interactive developer portfolio engineered with **React 19**, **TypeScript**, **Tailwind CSS**, **GSAP**, **Framer Motion**, and **WebGL (OGL)**.

[![React](https://img.shields.io/badge/React-19.x-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-green?style=flat-square&logo=greensock)](https://greensock.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Designed for software engineers, AI/ML developers, and creative technologists who want an editorial, high-polish showcase that stands out from standard template portfolios.

---

## 📑 Table of Contents

- [✨ Core Features & Interactions](#-core-features--interactions)
- [💻 Tech Stack & Architecture](#-tech-stack--architecture)
- [🛠️ Quick Start & Local Setup](#️-quick-start--local-setup)
- [🎨 Customization Guide (Use as Your Own Portfolio)](#-customization-guide-use-as-your-own-portfolio)
  - [1. Personal Data & Projects (`constants.ts`)](#1-personal-data--projects-constantsts)
  - [2. Hero & Headline Copy (`components/Hero.tsx`)](#2-hero--headline-copy-componentsherotsx)
  - [3. Editorial About Section (`components/About.tsx`)](#3-editorial-about-section-componentsabouttsx)
  - [4. Contact Form & Integrations (`components/Contact.tsx`)](#4-contact-form--integrations-componentscontacttsx)
  - [5. Theme Colors & Custom Palettes (`index.html`)](#5-theme-colors--custom-palettes-indexhtml)
  - [6. Navigation & Resume Modal (`components/Navbar.tsx`)](#6-navigation--resume-modal-componentsnavbartsx)
  - [7. Favicon, Logos & Metadata](#7-favicon-logos--metadata)
- [💻 Interactive Developer Terminal (`Terminal.tsx`)](#-interactive-developer-terminal-terminaltsx)
- [⚡ Performance & Animation Engineering](#-performance--animation-engineering)
- [📁 Complete Project Architecture](#-complete-project-architecture)
- [🚢 Production Deployment](#-production-deployment)
- [❓ FAQ & Troubleshooting](#-faq--troubleshooting)
- [📄 License & Attribution](#-license--attribution)

---

## ✨ Core Features & Interactions

- **WebGL Dark Veil Atmosphere**: An organic, fluid shader rendered using OGL and GLSL shaders in the Hero section. Automatically throttles rendering when scrolled out of view to preserve GPU cycles.
- **Card Stacking Showcase (`ScrollStack`)**: Sticky 3D project cards that stack and scale seamlessly with subpixel transform pinning, synced frame-by-frame with Lenis scroll velocity.
- **Physical Pull-Cord Light Switch (`ThemeToggle`)**: An interactive, spring-simulated lightbulb pull-string toggling between Deep Cosmic Dark and Luxurious Warm Ivory Light modes using modern View Transitions.
- **Dynamic Morphing Menu Button**: A morphing corner toggle that smoothly dissolves between a vector monogram logo and clean `MENU` typography.
- **Interactive Geometric Radar (`RadarChart`)**: An HTML5 Canvas radar chart visualizing domain proficiencies across languages, frameworks, AI/ML, and system architecture with live hover coordinate tracking.
- **Infinite Skill Velocity Loop (`ScrollVelocityText` & `Skills`)**: Calibrated infinite marquee with bidirectional scroll velocity physics.
- **Interactive Developer Console (`Terminal`)**: A retro-futuristic hacker terminal with sound effects, command history, and interactive easter eggs.
- **Custom Haptic Cursor (`SmoothCursor`)**: Trailing pointer with magnetic snapping, state-aware scaling, click feedback, and audio triggers.
- **Curated Micro-Interactions**: Easter egg tooltip cards, shuffle text scramblers, and an interactive pulsing like-heart with localStorage persistence.

---

## 💻 Tech Stack & Architecture

| Layer | Library / Tool | Purpose |
| --- | --- | --- |
| **Framework** | [React 19](https://react.dev/) | Modern concurrent rendering and component tree |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict end-to-end type safety |
| **Build Tool** | [Vite 6](https://vitejs.dev/) | Sub-second HMR and optimized roll-up chunk splitting |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Design utility tokens and custom theme variants |
| **Animations** | [GSAP](https://greensock.com/) + [Framer Motion](https://www.framer.com/motion/) | Orchestrated timelines, spring physics, and scroll triggers |
| **Smooth Scroll** | [Lenis](https://github.com/darkroomengineering/lenis) | Native momentum-based scroll smoothing |
| **3D & Shaders** | [OGL](https://github.com/oframe/ogl) | Ultra-lightweight WebGL shader rendering (~12KB gzipped) |
| **Iconography** | [Hugeicons](https://hugeicons.com/) & [Lucide](https://lucide.dev/) | Consistent SVG icon systems |

---

## 🛠️ Quick Start & Local Setup

### Prerequisites

- **Node.js**: `v18.0.0` or later
- **npm** (or `pnpm` / `yarn`)

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Adn-exe/adnan-portfolio.git

# Enter the project directory
cd adnan-portfolio

# Install dependencies
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The development server starts at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

The production output will be generated inside the `/dist` directory. You can preview the production bundle locally with:

```bash
npm run preview
```

---

## 🎨 Customization Guide (Use as Your Own Portfolio)

This repository is built to be easily forkable. You can adapt this entire site into your own portfolio by editing a few central files without breaking any of the underlying GSAP/Lenis animations.

### 1. Personal Data & Projects (`constants.ts`)

Open [`constants.ts`](file:///Users/mohammedadnan/Projects/adnan-portfolio/constants.ts) to update your core portfolio data:

#### Adding or Editing Projects:
```typescript
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Your Project Name',
    solution: 'A one-sentence summary of the core engineering problem solved.',
    bulletPoints: [
      'Key accomplishment or architecture highlight.',
      'Performance improvement, scale metric, or technical detail.',
      'Frameworks or APIs integrated.'
    ],
    description: 'Short paragraph description.',
    image: '/projectImages/your-image.webp', // Place image in /public/projectImages/
    tags: ['React', 'TypeScript', 'Node.js', 'FastAPI'],
    badges: ['Featured', 'Full Stack'],
    link: 'https://your-live-demo.com',     // Set to '' if no demo
    github: 'https://github.com/username/project',
    role: 'Lead Architect'
  },
  // Add more projects...
];
```

#### Configuring Project Color Accents (`components/Projects.tsx`):
Each project card has a dedicated ambient glow and border accent color configured in `projectAccents`:
```typescript
const projectAccents: Record<string, { border: string; glow: string; text: string; bg: string; stroke: string; date: string }> = {
  '1': {
    border: 'border-[#00D1FF]/40',
    glow: 'rgba(0, 209, 255, 0.18)',
    text: 'text-[#00D1FF]',
    bg: 'bg-[#00D1FF]/10',
    stroke: '#00D1FF',
    date: '2025'
  },
  // Map accents for your other project IDs...
};
```

#### Configuring the Skills Radar (`constants.ts`):
```typescript
export const RADAR_DOMAINS: RadarDomain[] = [
  {
    name: 'Languages',
    angleDeg: -90,    // Polar angle position
    baseline: 85,     // Proficiency percentage (0-100)
    description: 'TypeScript, Python, Go, Rust',
  },
  // Customize the other 5 domain axes...
];
```

#### Configuring Skills Marquee (`constants.ts`):
Add or reorder items in the `SKILLS` array to update the infinite scrolling marquee. Icons map to identifiers in [`components/Icons.tsx`](file:///Users/mohammedadnan/Projects/adnan-portfolio/components/Icons.tsx).

---

### 2. Hero & Headline Copy (`components/Hero.tsx`)

In [`components/Hero.tsx`](file:///Users/mohammedadnan/Projects/adnan-portfolio/components/Hero.tsx):
- Update the large hero display name:
  ```tsx
  <span className="text-white ...">YOUR NAME</span>
  ```
- Change the subtitle, status pill (*"Available for work"*), and opening tagline.

---

### 3. Editorial About Section (`components/About.tsx`)

In [`components/About.tsx`](file:///Users/mohammedadnan/Projects/adnan-portfolio/components/About.tsx):
- Replace the narrative paragraphs detailing your engineering philosophy, background, and approach.
- Drop your portrait photographs into `/public/`:
  - `public/aboutmeDark.webp`: Displayed when in Dark Mode.
  - `public/aboutmeLight.webp`: Displayed when in Light Mode.

---

### 4. Contact Form & Integrations (`components/Contact.tsx`)

In [`components/Contact.tsx`](file:///Users/mohammedadnan/Projects/adnan-portfolio/components/Contact.tsx):
- Update the contact badges (Email, LinkedIn, GitHub).
- **Form Submission**: The contact form currently simulates an API call. To connect it to a live mail provider:
  ```typescript
  // Example integration with Formspree or Web3Forms
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const response = await fetch("https://formspree.io/f/your_form_id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState)
    });
    
    if (response.ok) {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    }
  };
  ```

---

### 5. Theme Colors & Custom Palettes (`index.html`)

Global theme tokens are defined via CSS variables in the `<style>` block in [`index.html`](file:///Users/mohammedadnan/Projects/adnan-portfolio/index.html):

```css
:root {
  --bg-primary: #000000;         /* Deep cosmic black */
  --bg-surface: #121212;         /* Card background */
  --text-primary: #F8FAFC;       /* Heading text */
  --text-secondary: #94A3B8;     /* Body text */
  --accent: #00D1FF;             /* Primary electric cyan accent */
  --border-color: rgba(255, 255, 255, 0.05);
}

.light {
  --bg-primary: #FAF8F2;         /* Warm Ivory */
  --bg-surface: #F3EEE3;         /* Champagne Gold tint */
  --text-primary: #1F1A14;       /* Warm Charcoal */
  --text-secondary: #706554;     /* Slate Gold */
  --accent: #D97706;             /* Amber Gold accent */
  --border-color: rgba(180, 130, 20, 0.15);
}
```

---

### 6. Navigation & Resume Modal (`components/Navbar.tsx`)

In [`components/Navbar.tsx`](file:///Users/mohammedadnan/Projects/adnan-portfolio/components/Navbar.tsx):
- Update the Google Drive view and direct download links for your resume:
  ```typescript
  const viewLink = "https://drive.google.com/file/d/YOUR_FILE_ID/view";
  const downloadLink = "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID";
  ```

---

### 7. Favicon, Logos & Metadata

- Replace `public/adlogo.svg` with your personal monogram or logo SVG.
- Update `<title>`, `<meta name="description">`, and OpenGraph tags in [`index.html`](file:///Users/mohammedadnan/Projects/adnan-portfolio/index.html).

---

## 💻 Interactive Developer Terminal (`Terminal.tsx`)

The portfolio includes an interactive UNIX-style developer shell. Users can open it using the floating action button at the bottom left or pressing **`Ctrl + ~`** / **`Cmd + ~`**.

### Available Terminal Commands:

| Command | Action |
| --- | --- |
| `help` | Lists all available shell commands |
| `about` | Prints bio, core philosophy, and background |
| `projects` | Interactive list of featured creations with direct URLs |
| `skills` | Dumps primary programming languages, frameworks, and tools |
| `contact` | Displays direct email, social links, and handles |
| `clear` | Clears terminal scrollback history |
| `matrix` | Runs animated green digital rain effect |
| `neofetch` | Displays ASCII system telemetry and tech stack stats |
| `theme` | Toggles the active portfolio theme directly from the shell |
| `echo <msg>` | Prints arguments to stdout |
| `sudo` | Secret administrator authorization easter egg |

To add custom commands, expand the `handleCommand` dispatcher in [`components/Terminal.tsx`](file:///Users/mohammedadnan/Projects/adnan-portfolio/components/Terminal.tsx).

---

## ⚡ Performance & Animation Engineering

- **IntersectionObserver Shader Pause**: In [`components/DarkVeil.jsx`](file:///Users/mohammedadnan/Projects/adnan-portfolio/components/DarkVeil.jsx), the OGL WebGL loop automatically pauses whenever the Hero section is scrolled out of view, preventing unnecessary background GPU overhead.
- **Code Splitting**: The terminal emulator, WebGL canvas, and heavy icon bundles are split into dedicated chunks in [`vite.config.ts`](file:///Users/mohammedadnan/Projects/adnan-portfolio/vite.config.ts) using `manualChunks`.
- **Hardware-Accelerated Pinning**: The `ScrollStack` component uses `translate3d(0, y, 0)` with subpixel rounding to prevent repaint layout jitter during momentum scrolling.
- **Image Preloading**: Key bio images and logos are preloaded in the document `<head>` with `fetchpriority="high"`.

---

## 📁 Complete Project Architecture

```text
├── components/
│   ├── ui/
│   │   ├── animated-theme-toggler.tsx   # View Transitions theme wrapper
│   │   ├── dia-text-reveal.tsx          # Dynamic gradient shimmer reveal
│   │   ├── interactive-hover-button.tsx # Tactile button with audio triggers
│   │   ├── magic-card.tsx               # Spotlight glow container
│   │   ├── morphing-menu-toggle.tsx     # Clean logo-to-MENU dissolve toggle
│   │   ├── project-button.tsx           # Magnetic interactive link pills
│   │   ├── smooth-cursor.tsx            # Custom canvas/DOM trailing pointer
│   │   └── tooltip-card.tsx             # Floating hover tooltip cards
│   ├── About.tsx                        # Editorial narrative with scroll scrub
│   ├── Contact.tsx                      # Message form and contact links
│   ├── DarkVeil.jsx                     # WebGL OGL fluid hero background
│   ├── Footer.tsx                       # Brand footer with pulsing heart counter
│   ├── Hero.tsx                         # Opening choreography & display typography
│   ├── Icons.tsx                        # Unified SVG icon dictionary
│   ├── Loader.tsx                       # First-visit loading sequence
│   ├── Navbar.tsx                       # Staggered menu controller & Resume modal
│   ├── Projects.tsx                     # Featured creations stacking section
│   ├── PulseHeart.tsx                   # Interactive like-heart component
│   ├── RadarChart.tsx                   # Canvas-based skill radar chart
│   ├── ScrollReveal.tsx                 # Viewport entrance animation wrapper
│   ├── ScrollStack.jsx                  # Sticky 3D project card pinning engine
│   ├── ScrollVelocityText.tsx           # Infinite marquee with scroll velocity
│   ├── Skills.tsx                       # Technical skills grid & radar layout
│   ├── StaggeredMenu.jsx                # Corner flyout navigation panel
│   ├── Terminal.tsx                     # Executable CLI terminal emulator
│   ├── TerminalFab.tsx                  # Floating quick-open terminal button
│   ├── ThemeToggle.tsx                  # Physical spring-simulated pull lamp
│   └── Writings.tsx                     # Blog articles and external publications
├── hooks/
│   └── useAudio.ts                      # Web Audio click feedback and triggers
├── public/                              # Images, logos, and static project media
├── constants.ts                         # Centralized portfolio data
├── types.ts                             # Global TypeScript interfaces
├── App.tsx                              # App root, progress bar & layout shell
├── index.html                           # Design system tokens, font preconnects
└── vite.config.ts                       # Build rules and manual bundle chunks
```

---

## 🚢 Production Deployment

### Deploying to Vercel (Recommended)
1. Fork or push your customized repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select your repository. Vercel automatically detects Vite.
4. Click **Deploy**. Future pushes to `main` will trigger automatic preview and production deployments.

### Deploying to Netlify
1. Connect your repository on [Netlify](https://www.netlify.com/).
2. Set Build command: `npm run build`
3. Set Publish directory: `dist`
4. Click **Deploy Site**.

---

## ❓ FAQ & Troubleshooting

#### Q: How do I disable or change the sound effects?
The audio hooks live in [`hooks/useAudio.ts`](file:///Users/mohammedadnan/Projects/adnan-portfolio/hooks/useAudio.ts). You can mute sounds globally by setting audio volumes to `0` or removing audio calls on button clicks.

#### Q: The scrollbar doesn't appear on the page. How do I enable it?
The browser scrollbar is hidden in [`index.html`](file:///Users/mohammedadnan/Projects/adnan-portfolio/index.html) (`scrollbar-width: none;` and `::-webkit-scrollbar { display: none; }`) in favor of the clean top progress bar. To restore it, remove those rules from the `<style>` block in `index.html`.

#### Q: How do I add my own easter eggs?
Add key-value pairs to the `EASTER_EGGS` object in [`constants.ts`](file:///Users/mohammedadnan/Projects/adnan-portfolio/constants.ts). Words in the bio matching those phrases will automatically wrap in an interactive easter egg hover card.

---

## 📄 License & Attribution

This codebase is open source under the **[MIT License](https://opensource.org/licenses/MIT)**.

You are welcome to fork, modify, and use this project as the foundation for your own developer portfolio. If you find it helpful, giving a star ⭐ to the repository is warmly appreciated!

---

Crafted with care and precision by [Mohammed Adnan](https://github.com/Adn-exe).
