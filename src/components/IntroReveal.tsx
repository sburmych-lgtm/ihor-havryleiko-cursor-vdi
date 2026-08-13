import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

type Props = {
  onDone: () => void
}

export function IntroReveal({ onDone }: Props) {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
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

  useEffect(() => {
    const node = videoRef.current
    if (!node) return

    const kick = () => {
      void node.play().catch(() => undefined)
    }

    node.addEventListener("canplay", kick)
    kick()
    return () => node.removeEventListener("canplay", kick)
  }, [])

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
            scale: 1.07,
            filter: "blur(18px)",
          }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <video
            ref={videoRef}
            className="intro-film"
            src="/media/video/poseidon-intro.mp4"
            poster="/media/intro/poster-start.jpg"
            muted
            playsInline
            preload="auto"
            onEnded={close}
          />
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
