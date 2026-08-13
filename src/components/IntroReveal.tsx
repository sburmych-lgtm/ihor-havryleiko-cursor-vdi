import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

type Props = {
  onDone: () => void
}

export function IntroReveal({ onDone }: Props) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<"logo" | "strike" | "leave">("logo")
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduce) {
      setVisible(false)
      onDone()
      return
    }

    const strike = window.setTimeout(() => setPhase("strike"), 900)
    const leave = window.setTimeout(() => setPhase("leave"), 1750)
    const gone = window.setTimeout(() => setVisible(false), 2500)
    return () => {
      window.clearTimeout(strike)
      window.clearTimeout(leave)
      window.clearTimeout(gone)
    }
  }, [onDone, reduce])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible ? (
        <motion.div
          className="intro"
          key="intro"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(50% 0 50% 0)",
            opacity: 0.2,
          }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="intro-caustic" />
          <motion.div
            className="intro-logo"
            initial={{ opacity: 0, scale: 0.82, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.12, visualDuration: 0.85 }}
          >
            <img
              src="/media/photos/logo-gold.png"
              alt="Igor Gavrileyko"
            />
          </motion.div>
          <Paddler visible={phase !== "logo"} />
          <div className={`intro-slash ${phase !== "logo" ? "is-on" : ""}`} />
          <div className={`intro-rings ${phase !== "logo" ? "is-on" : ""}`} />
          <p className="intro-caption">сила з води</p>
          <button
            type="button"
            className="intro-skip"
            onClick={() => setVisible(false)}
          >
            Пропустити
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Paddler({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      className="intro-figure"
      viewBox="0 0 800 600"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0, x: -80, y: 40 }}
      animate={
        visible
          ? { opacity: 0.92, x: 40, y: -10 }
          : { opacity: 0, x: -80, y: 40 }
      }
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <path
        d="M268 402 C 290 318, 318 248, 352 198 C 372 168, 402 148, 428 168 C 448 184, 452 214, 438 242 L 410 298 L 486 262 L 508 292 L 412 338 L 448 412 C 402 428, 348 432, 304 418 Z"
        fill="rgba(10,28,38,0.88)"
        stroke="#7ef0d4"
        strokeWidth="3"
      />
      <path
        d="M96 86 L 214 168 L 702 486 L 668 518 L 186 196 L 78 122 Z"
        fill="#2ad4e8"
        opacity="0.92"
      />
      <circle cx="432" cy="142" r="28" fill="#0c2432" stroke="#e8f7f3" strokeWidth="3" />
    </motion.svg>
  )
}
