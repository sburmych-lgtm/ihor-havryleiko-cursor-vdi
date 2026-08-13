import { useFrame } from "@react-three/fiber"
import { useMemo } from "react"
import { MathUtils, PerspectiveCamera, Vector3 } from "three"
import { lerp, range, type TimeRef } from "./timeline"

type Props = {
  tRef: TimeRef
}

export function CameraRig({ tRef }: Props) {
  const pos = useMemo(() => new Vector3(0.2, 1.05, 8.4), [])
  const look = useMemo(() => new Vector3(0.1, 0.85, 0), [])
  const desired = useMemo(() => new Vector3(), [])
  const desiredLook = useMemo(() => new Vector3(), [])

  useFrame((state, delta) => {
    const t = tRef.current
    const cam = state.camera
    if (!(cam instanceof PerspectiveCamera)) return
    const dt = Math.min(delta, 1 / 20)
    const rise = range(t, 1.8, 4.1)
    const ignite = range(t, 4.2, 6.2)
    const portal = range(t, 6.4, 8.9)

    desired.set(
      lerp(lerp(0.35, 1.15, rise), -0.35, ignite) + portal * -0.15,
      lerp(lerp(1.08, 1.85, rise), 1.55, ignite) + portal * 0.2,
      lerp(lerp(8.5, 6.2, rise), 4.7, ignite) - portal * 3.8,
    )
    desiredLook.set(
      lerp(0.4, -1.35, ignite) + portal * 0.2,
      lerp(1.05, 1.35, rise) + portal * 0.25,
      lerp(0.2, -0.55, portal),
    )

    const follow = 1 - Math.exp(-dt * (1.8 + ignite * 2.4 + portal * 3.2))
    pos.lerp(desired, follow)
    look.lerp(desiredLook, follow)

    const skim = 1 - range(t, 1.4, 2.4)
    const shake = 0.008 * skim + Math.sin(t * 1.7) * 0.012 * (1 - portal)
    cam.position.set(pos.x + shake, pos.y, pos.z)
    cam.lookAt(look.x, look.y, look.z)
    cam.fov = MathUtils.lerp(34, 51, portal)
    cam.updateProjectionMatrix()
  })

  return null
}
