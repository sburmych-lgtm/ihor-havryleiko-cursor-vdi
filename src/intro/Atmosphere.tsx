import { Sparkles } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Color, PointLight } from "three"
import { IGNITE_AT, range, type TimeRef } from "./timeline"

type Props = {
  tRef: TimeRef
}

export function Atmosphere({ tRef }: Props) {
  const flash = useRef<PointLight>(null)
  const cyan = useMemo(() => new Color("#9cf4ea"), [])

  useFrame(() => {
    const t = tRef.current
    const rumble = range(t, 1.2, 3.8)
    const hit = range(t, IGNITE_AT, 5.4)
    const pulse = Math.max(0, Math.sin(t * 11.5)) * rumble
    if (flash.current) {
      flash.current.intensity = pulse * 22 + hit * 18 * Math.exp(-(t - IGNITE_AT) * 1.6)
    }
  })

  return (
    <group>
      <pointLight ref={flash} position={[-1.2, 5.4, -1.8]} color={cyan} intensity={0} distance={22} />
      <mesh position={[3.8, 2.6, -4.8]} scale={[2.4, 3.6, 1.1]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color="#05090c" roughness={1} transparent opacity={0.55} />
      </mesh>
      <Sparkles
        count={90}
        scale={[14, 5, 10]}
        size={2.2}
        speed={0.28}
        opacity={0.4}
        color="#9cf4ea"
        position={[0, 2.4, 0]}
      />
      <Sparkles
        count={36}
        scale={[3.2, 2.4, 2]}
        size={5}
        speed={0.9}
        opacity={0.75}
        color="#e8fffb"
        position={[-2.1, 1.5, 0.3]}
      />
    </group>
  )
}
