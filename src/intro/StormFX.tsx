import { Line, Sparkles } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PointLight,
  Vector3,
} from "three"
import { IMPACT_AT, mulberry32, range, type TimeRef } from "./timeline"

type Props = {
  tRef: TimeRef
}

function makeBolt(seed: number): Vector3[] {
  const rand = mulberry32(seed)
  const points: Vector3[] = []
  for (let i = 0; i < 12; i += 1) {
    const u = i / 11
    points.push(
      new Vector3(
        -2.1 + (rand() - 0.5) * 1.4 + u * 0.4,
        7.2 - u * 6.4,
        -1.2 + (rand() - 0.5) * 1.8,
      ),
    )
  }
  return points
}

export function StormFX({ tRef }: Props) {
  const flash = useRef<PointLight>(null)
  const ring = useRef<Mesh>(null)
  const bolts = useRef<Group>(null)
  const boltPoints = useMemo(() => [makeBolt(11), makeBolt(23), makeBolt(41)], [])
  const cyan = useMemo(() => new Color("#7ef0d4"), [])

  useFrame(() => {
    const t = tRef.current
    const age = t - IMPACT_AT
    const windup = range(t, 2.4, 3.7)
    const pulse =
      Math.max(0, Math.sin(t * 17) * 0.5 + 0.5) * windup * (t < IMPACT_AT ? 1 : 0)
    const hit = t >= IMPACT_AT ? Math.exp(-Math.max(0, age) * 3.6) : 0

    if (flash.current) {
      flash.current.intensity = pulse * 18 + hit * 55
    }
    if (bolts.current) {
      bolts.current.visible = pulse > 0.55 || hit > 0.08
    }
    if (ring.current) {
      const grow = Math.max(0, age)
      ring.current.visible = t >= IMPACT_AT && grow < 1.6
      const s = 0.2 + grow * 7.5
      ring.current.scale.set(s, s, s)
      const mat = ring.current.material
      if (mat instanceof MeshBasicMaterial) {
        mat.opacity = Math.max(0, 0.55 - grow * 0.4)
      }
    }
  })

  return (
    <group>
      <pointLight
        ref={flash}
        position={[-2.2, 2.4, 0.6]}
        color={cyan}
        intensity={0}
        distance={18}
      />
      <group ref={bolts} visible={false}>
        {boltPoints.map((points, i) => (
          <Line
            key={`bolt-${String(i)}`}
            points={points}
            color="#c8fff6"
            lineWidth={1.6}
            transparent
            opacity={0.9}
          />
        ))}
      </group>
      <mesh ref={ring} position={[-2.32, 1.42, 0.2]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.42, 0.5, 48]} />
        <meshBasicMaterial
          color="#7ef0d4"
          transparent
          opacity={0.5}
          side={DoubleSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <Sparkles
        count={70}
        scale={[10, 4, 8]}
        size={2.4}
        speed={0.35}
        opacity={0.45}
        color="#9cf4ea"
        position={[0, 2.2, 0]}
      />
      <Sparkles
        count={48}
        scale={[3.4, 2.2, 2.2]}
        size={6}
        speed={1.6}
        opacity={0.9}
        color="#e8fffb"
        position={[-2.3, 1.45, 0.25]}
      />
    </group>
  )
}
