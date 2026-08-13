import { Canvas } from "@react-three/fiber"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCallback, useEffect, useState } from "react"
import { PoseidonScene } from "../intro/PoseidonScene"

type Props = {
  onDone: () => void
}

export function IntroReveal({ onDone }: Props) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(!reduce)
  const [flash, setFlash] = useState(false)

  const close = useCallback(() => {
    setFlash(true)
    window.setTimeout(() => setVisible(false), 180)
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
          className={`intro ${flash ? "is-flash" : ""}`}
          key="intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(18px)",
          }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <Canvas
            className="intro-film"
            style={{ position: "absolute", inset: 0 }}
            dpr={[1, 1.6]}
            shadows="soft"
            camera={{ position: [0.62, 1.62, 7.35], fov: 36.5, near: 0.1, far: 80 }}
            gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
          >
            <PoseidonScene onComplete={close} />
          </Canvas>
          <div className="intro-vignette" />
          <div className="intro-flash" />
          <button type="button" className="intro-skip" onClick={close}>
            Пропустити
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
