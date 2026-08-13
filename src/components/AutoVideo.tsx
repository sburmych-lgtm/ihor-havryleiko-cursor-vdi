import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
  poster?: string
  className?: string
}

export function AutoVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void node.play().catch(() => undefined)
          } else {
            node.pause()
            setPlaying(false)
          }
        }
      },
      { threshold: 0.15 },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={className ? `video-frame ${className}` : "video-frame"}
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        onPlaying={() => setPlaying(true)}
        className={playing ? "is-on" : ""}
      />
    </div>
  )
}
