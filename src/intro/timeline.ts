import type { RefObject } from "react"

export type TimeRef = RefObject<number>

export const INTRO_DURATION = 9.15
export const IGNITE_AT = 4.35

export type IntroPhase = "skim" | "rise" | "ignite" | "portal"

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

export function range(t: number, start: number, end: number): number {
  return smoothstep(start, end, t)
}

export function phaseAt(t: number): IntroPhase {
  if (t < 2.2) return "skim"
  if (t < 4.35) return "rise"
  if (t < 6.55) return "ignite"
  return "portal"
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled intro phase: ${String(value)}`)
}
