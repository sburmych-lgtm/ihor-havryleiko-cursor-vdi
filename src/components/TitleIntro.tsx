import { Canvas } from "@react-three/fiber"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCallback, useEffect, useState } from "react"
import { TitleScene } from "../intro/TitleScene"

type Props = {
  onDone: () => void
}

const EXIT_EASE = [0.76, 0, 0.24, 1] as const

export function TitleIntro({ onDone }: Props) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(!reduce)

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    if (reduce) {
      onDone()
    }
  }, [onDone, reduce])

  if (reduce) {
    return null
  }

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible ? (
        <motion.div
          key="title-intro"
          className="intro"
          initial={{ clipPath: "circle(160% at 38% 48%)", opacity: 1 }}
          animate={{ clipPath: "circle(160% at 38% 48%)", opacity: 1 }}
          exit={{
            clipPath: "circle(0% at 38% 48%)",
            opacity: 0.15,
          }}
          transition={{ duration: 1.05, ease: EXIT_EASE }}
        >
          <Canvas
            className="intro-film"
            style={{ position: "absolute", inset: 0 }}
            dpr={[1, 1.6]}
            shadows="soft"
            camera={{ position: [0.35, 1.08, 8.5], fov: 34, near: 0.1, far: 80 }}
            gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
          >
            <TitleScene onComplete={close} />
          </Canvas>
          <div className="intro-vignette" />
          <motion.button
            type="button"
            className="intro-skip"
            onClick={close}
            whileTap={{ scale: 0.98 }}
          >
            Пропустити
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
