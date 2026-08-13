import type { RefObject } from "react"

export type TimeRef = RefObject<number>

export const INTRO_DURATION = 8.8
export const IMPACT_AT = 4.18

export type IntroPhase = "establish" | "windup" | "strike" | "shatter" | "portal"

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

export function smootherstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * t * (t * (t * 6 - 15) + 10)
}

export function range(t: number, start: number, end: number): number {
  return smoothstep(start, end, t)
}

export function phaseAt(t: number): IntroPhase {
  if (t < 2.05) return "establish"
  if (t < 3.72) return "windup"
  if (t < 4.28) return "strike"
  if (t < 6.85) return "shatter"
  return "portal"
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
