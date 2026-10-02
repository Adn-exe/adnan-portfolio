"use client"

import { useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion"

import { cn } from "@/lib/utils"

const DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

const sweepEase = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2

function parseColor(input: string): [number, number, number] {
  if (input.startsWith("#")) {
    let c = input.slice(1)
    if (c.length === 3) c = c.split("").map((x) => x + x).join("")
    const num = parseInt(c, 16)
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
  }
  const match = input.match(/\d+/g)
  if (match && match.length >= 3) {
    return [parseInt(match[0], 10), parseInt(match[1], 10), parseInt(match[2], 10)]
  }
  return [0, 209, 255]
}

function interpolateColors(c1: string, c2: string, t: number): string {
  const [r1, g1, b1] = parseColor(c1)
  const [r2, g2, b2] = parseColor(c2)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}

function buildGradient(pos: number, colors: string[], textColor: string) {
  const isGradient =
    textColor.startsWith("linear-gradient") ||
    textColor.startsWith("radial-gradient") ||
    textColor.includes("gradient")

  const bandStart = pos - BAND_HALF
  const bandEnd = pos + BAND_HALF

  if (pos >= SWEEP_END || bandStart >= 100) {
    return isGradient ? textColor : `linear-gradient(90deg, ${textColor}, ${textColor})`
  }

  const parts: string[] = []

  if (bandStart > 0) {
    const gradientMatches = isGradient
      ? textColor.match(/#(?:[0-9a-fA-F]{3,8})|rgba?\([^)]+\)/g)
      : null

    if (gradientMatches && gradientMatches.length > 1) {
      const stopsCount = gradientMatches.length
      const step = 100 / (stopsCount - 1)

      parts.push(`${gradientMatches[0]} 0%`)

      for (let i = 1; i < stopsCount; i++) {
        const stopPct = i * step
        if (stopPct < bandStart) {
          parts.push(`${gradientMatches[i]} ${stopPct.toFixed(2)}%`)
        } else {
          const prevPct = (i - 1) * step
          const t = Math.max(0, Math.min(1, (bandStart - prevPct) / (stopPct - prevPct)))
          const interpolated = interpolateColors(gradientMatches[i - 1], gradientMatches[i], t)
          parts.push(`${interpolated} ${bandStart.toFixed(2)}%`)
          break
        }
      }
    } else {
      parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`)
    }
  }

  const n = colors.length
  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2
    parts.push(`${c} ${pct.toFixed(2)}%`)
  })

  if (bandEnd < 100) {
    parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`)
  }

  return `linear-gradient(90deg, ${parts.join(", ")})`
}

function measureWidths(el: HTMLElement, texts: string[]) {
  const ghost = el.cloneNode() as HTMLElement
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "auto",
    whiteSpace: "nowrap",
  })
  el.parentElement!.appendChild(ghost)
  const widths = texts.map((t) => {
    ghost.textContent = t
    return ghost.getBoundingClientRect().width
  })
  ghost.remove()
  return widths
}

/**
 * Props for {@link DiaTextReveal}.
 */
export interface DiaTextRevealProps extends Omit<
  HTMLMotionProps<"span">,
  "ref" | "children" | "style" | "animate" | "transition" | "color"
> {
  /**
   * Text to reveal. Pass multiple strings to rotate when {@link DiaTextRevealProps.repeat} is `true`.
   */
  text: string | string[]
  /**
   * Colors sampled across the moving gradient band. Defaults to a built-in palette.
   */
  colors?: string[]
  /**
   * CSS color for revealed text after the sweep and for leading/trailing regions during the animation.
   * @defaultValue `"var(--text-primary, currentColor)"`
   */
  textColor?: string
  /**
   * Duration of one sweep pass, in seconds.
   * @defaultValue `1.5`
   */
  duration?: number
  /**
   * Delay before the sweep starts, in seconds.
   * @defaultValue `0`
   */
  delay?: number
  /**
   * When `text` is an array, replay the sweep and advance to the next string after each completion.
   * @defaultValue `false`
   */
  repeat?: boolean
  /**
   * Pause between cycles when {@link DiaTextRevealProps.repeat} is `true`, in seconds.
   * @defaultValue `0.5`
   */
  repeatDelay?: number
  /**
   * If `true`, the animation starts only after the element enters the viewport.
   * @defaultValue `true`
   */
  startOnView?: boolean
  /**
   * Passed to `useInView`: if `true`, in-view detection fires at most once (no replay on scroll-back).
   * @defaultValue `true`
   */
  once?: boolean
  /**
   * Additional class names for the animated `span` (e.g. typography utilities).
   */
  className?: string
  /**
   * When `text` has multiple entries, use the widest string’s width for layout instead of animating width per line.
   * @defaultValue `false`
   */
  fixedWidth?: boolean
  /**
   * If `true`, only triggers the reveal animation when scrolling downwards (up-to-down).
   * Scrolling upwards will not trigger the sweep, keeping the text revealed.
   * @defaultValue `false`
   */
  scrollDownOnly?: boolean
  /**
   * Custom easing function or framer-motion easing curve.
   */
  ease?: any
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--text-primary, currentColor)",
  duration = 1.5,
  delay = 0,
  ease,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  scrollDownOnly = false,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text]
  const isMulti = texts.length > 1
  const prefersReducedMotion = useReducedMotion()

  const spanRef = useRef<HTMLSpanElement>(null)
  const optsRef = useRef({
    colors,
    textColor,
    duration,
    delay,
    ease: ease ?? sweepEase,
    repeat,
    repeatDelay,
    texts,
  })
  optsRef.current = {
    colors,
    textColor,
    duration,
    delay,
    ease: ease ?? sweepEase,
    repeat,
    repeatDelay,
    texts,
  }

  const indexRef = useRef(0)
  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const controlsRef = useRef<any>(null)
  const scrollDirRef = useRef<"down" | "up">("down")
  const lastScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([])

  const sweepPos = useMotionValue(SWEEP_START)

  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildGradient(pos, optsRef.current.colors, optsRef.current.textColor)
  )

  const isInView = useInView(spanRef, { once: scrollDownOnly ? false : once, amount: 0.1 })

  useEffect(() => {
    if (!scrollDownOnly) return

    const checkReset = () => {
      if (spanRef.current) {
        const rect = spanRef.current.getBoundingClientRect()
        const windowH = window.innerHeight || document.documentElement.clientHeight
        // If element is now completely below the viewport, reset it for the next downward scroll
        if (rect.top >= windowH) {
          if (hasPlayedRef.current) {
            hasPlayedRef.current = false
            sweepPos.set(SWEEP_START)
            controlsRef.current?.stop()
          }
        }
      }
    }

    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop
      if (currentY > lastScrollYRef.current + 2) {
        scrollDirRef.current = "down"
      } else if (currentY < lastScrollYRef.current - 2) {
        scrollDirRef.current = "up"
      }
      lastScrollYRef.current = currentY
      checkReset()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    const lenis = (window as any).__lenis
    const handleLenisScroll = (e: any) => {
      if (e.direction === 1 || e.velocity > 0) {
        scrollDirRef.current = "down"
      } else if (e.direction === -1 || e.velocity < 0) {
        scrollDirRef.current = "up"
      }
      checkReset()
    }

    if (lenis?.on) {
      lenis.on("scroll", handleLenisScroll)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (lenis?.off) {
        lenis.off("scroll", handleLenisScroll)
      }
    }
  }, [scrollDownOnly])

  useEffect(() => {
    const el = spanRef.current
    if (!el || !isMulti) return
    setMeasuredWidths(measureWidths(el, texts))
  }, [Array.isArray(text) ? text.join("\0") : text])

  const play = () => {
    const { duration: dur, delay: d, repeat: rep, repeatDelay: rd, texts: tList } = optsRef.current

    sweepPos.set(SWEEP_START)

    controlsRef.current = animate(sweepPos, SWEEP_END, {
      duration: dur,
      delay: d,
      ease: optsRef.current.ease,
      onComplete() {
        sweepPos.set(SWEEP_END)
        if (!rep) return
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % tList.length
          indexRef.current = next
          setActiveIndex(next)
          play()
        }, rd * 1000)
      },
    })
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END)
      return
    }

    if (startOnView && !isInView) {
      if (!once || scrollDownOnly) {
        if (scrollDownOnly) {
          const rect = spanRef.current?.getBoundingClientRect()
          const windowH = window.innerHeight || document.documentElement.clientHeight
          if (rect && rect.top >= windowH * 0.8) {
            // Exited off the bottom of the viewport
            hasPlayedRef.current = false
            sweepPos.set(SWEEP_START)
            controlsRef.current?.stop()
          } else {
            // Exited off the top of the viewport (user scrolled past it)
            sweepPos.set(SWEEP_END)
          }
        } else {
          hasPlayedRef.current = false
          sweepPos.set(SWEEP_START)
          controlsRef.current?.stop()
        }
      }
      return
    }

    if (scrollDownOnly) {
      // If user is scrolling from down to up, DO NOT trigger the animation!
      if (scrollDirRef.current === "up") {
        sweepPos.set(SWEEP_END)
        hasPlayedRef.current = true
        return
      }
    }

    if (once && !scrollDownOnly && hasPlayedRef.current) return
    hasPlayedRef.current = true
    play()

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [isInView, startOnView, once, prefersReducedMotion, scrollDownOnly])

  const fixedW =
    isMulti && fixedWidth && measuredWidths.length > 0
      ? Math.max(...measuredWidths)
      : undefined

  const animatedW =
    isMulti && !fixedWidth && measuredWidths[activeIndex] != null
      ? measuredWidths[activeIndex]
      : undefined

  return (
    <motion.span
      ref={spanRef}
      className={cn("inline-block align-bottom leading-normal text-inherit", className)}
      style={{
        transform: "translateY(-2px)",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: (optsRef.current.textColor.includes("gradient") || className?.includes("text-gradient")) ? "200% auto" : "100% 100%",
        backgroundImage,
        ...(isMulti && {
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "text-center",
          ...(fixedW != null && { width: fixedW }),
        }),
      }}
      animate={animatedW != null ? { width: animatedW } : undefined}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {texts[activeIndex]}
    </motion.span>
  )
}
