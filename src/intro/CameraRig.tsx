import { useFrame } from "@react-three/fiber"
import { useMemo } from "react"
import { MathUtils, PerspectiveCamera, Vector3 } from "three"
import {
  IMPACT_AT,
  lerp,
  range,
  type TimeRef,
} from "./timeline"

type Props = {
  tRef: TimeRef
}

export function CameraRig({ tRef }: Props) {
  const pos = useMemo(() => new Vector3(), [])
  const look = useMemo(() => new Vector3(), [])
  const desired = useMemo(() => new Vector3(), [])
  const desiredLook = useMemo(() => new Vector3(), [])

  useFrame((state, delta) => {
    const t = tRef.current
    const cam = state.camera
    if (!(cam instanceof PerspectiveCamera)) return

    const dt = Math.min(delta, 1 / 20)
    const establish = 1 - range(t, 1.6, 2.2)
    const windup = range(t, 2.0, 3.5)
    const strike = range(t, 3.7, 4.2)
    const shatter = range(t, 4.18, 5.4)
    const portal = range(t, 6.5, 8.6)

    desired.set(
      lerp(lerp(0.62, -0.15, windup), -0.85, strike) + portal * 0.2,
      lerp(1.62, 1.38, windup + strike * 0.2) + portal * 0.15,
      lerp(lerp(7.35, 5.55, windup), 4.35, strike) - portal * 3.4,
    )
    desiredLook.set(
      lerp(-0.35, -1.6, strike + shatter * 0.35) + portal * 0.4,
      lerp(1.22, 1.05, strike) + portal * 0.35,
      lerp(0.05, -0.4, portal),
    )

    const follow = 1 - Math.exp(-dt * (2.4 + strike * 6))
    pos.lerp(desired, follow)
    look.lerp(desiredLook, follow)

    const impactAge = Math.max(0, t - IMPACT_AT)
    const shakeAmp =
      (0.012 + 0.018 * establish) * (1 - portal) +
      Math.exp(-impactAge * 4.2) * 0.22 * (t >= IMPACT_AT ? 1 : 0)
    const shakeX = Math.sin(t * 27.0) * shakeAmp
    const shakeY = Math.cos(t * 23.5) * shakeAmp * 0.7

    cam.position.set(pos.x + shakeX, pos.y + shakeY, pos.z)
    cam.lookAt(look.x, look.y, look.z)
    cam.fov = MathUtils.lerp(36.5, 54, portal)
    cam.updateProjectionMatrix()
  })

  return null
}
