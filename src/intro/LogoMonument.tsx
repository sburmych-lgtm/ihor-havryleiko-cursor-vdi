import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import {
  CanvasTexture,
  DynamicDrawUsage,
  Euler,
  Group,
  InstancedMesh,
  Object3D,
  SRGBColorSpace,
  Vector3,
} from "three"
import { IMPACT_AT, mulberry32, type TimeRef } from "./timeline"

type Shard = {
  origin: Vector3
  velocity: Vector3
  spin: Euler
  scale: Vector3
}

type Props = {
  tRef: TimeRef
}

function makeNameMap(): CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 160
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.fillStyle = "#dfe7ea"
    ctx.fillRect(0, 0, 1024, 160)
    ctx.fillStyle = "#101418"
    ctx.font = "700 64px Segoe UI, system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("IGOR GAVRILEYKO", 512, 80)
  }
  const map = new CanvasTexture(canvas)
  map.colorSpace = SRGBColorSpace
  map.anisotropy = 8
  return map
}

function makeShards(count: number): Shard[] {
  const rand = mulberry32(7)
  const shards: Shard[] = []
  for (let i = 0; i < count; i += 1) {
    const inI = rand() > 0.46
    const x = inI ? -0.55 + (rand() - 0.5) * 0.42 : 0.42 + (rand() - 0.5) * 0.9
    const y = (rand() - 0.5) * 1.7
    const z = (rand() - 0.5) * 0.32
    const origin = new Vector3(x, y, z)
    const away = origin.clone().add(new Vector3(-0.15, 0.2, 0.55)).normalize()
    const velocity = away.multiplyScalar(3.4 + rand() * 6.8)
    velocity.y += 1.8 + rand() * 3.4
    shards.push({
      origin,
      velocity,
      spin: new Euler((rand() - 0.5) * 8, (rand() - 0.5) * 10, (rand() - 0.5) * 8),
      scale: new Vector3(0.08 + rand() * 0.16, 0.06 + rand() * 0.22, 0.05 + rand() * 0.1),
    })
  }
  return shards
}

export function LogoMonument({ tRef }: Props) {
  const carved = useRef<Group>(null)
  const debris = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const shards = useMemo(() => makeShards(118), [])
  const nameMap = useMemo(() => makeNameMap(), [])
  const started = useRef(false)

  useFrame((_, delta) => {
    const t = tRef.current
    const flying = debris.current
    const monument = carved.current
    if (!flying || !monument) return

    const exploded = t >= IMPACT_AT
    monument.visible = !exploded
    flying.visible = exploded
    if (!exploded) return

    if (!started.current) {
      flying.instanceMatrix.setUsage(DynamicDrawUsage)
      started.current = true
    }

    const dt = Math.min(delta, 1 / 20)
    const age = t - IMPACT_AT
    shards.forEach((shard, i) => {
      shard.velocity.y -= 7.4 * dt
      shard.origin.addScaledVector(shard.velocity, dt)
      dummy.position.copy(shard.origin)
      dummy.scale.copy(shard.scale)
      dummy.rotation.set(shard.spin.x * age, shard.spin.y * age, shard.spin.z * age)
      dummy.updateMatrix()
      flying.setMatrixAt(i, dummy.matrix)
    })
    flying.instanceMatrix.needsUpdate = true
  })

  return (
    <group position={[-2.32, 1.42, 0.18]}>
      <mesh position={[0, 0, -0.28]} scale={[3.2, 2.6, 1]}>
        <sphereGeometry args={[0.7, 18, 14]} />
        <meshBasicMaterial color="#2ad4e8" transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <group ref={carved}>
        <mesh position={[-0.52, 0.08, 0.02]} castShadow>
          <boxGeometry args={[0.5, 1.82, 0.4]} />
          <meshStandardMaterial color="#eef3f4" roughness={0.62} metalness={0.08} />
        </mesh>
        <mesh position={[0.5, 0.08, 0.02]} rotation={[0, 0, -0.35]} castShadow>
          <torusGeometry args={[0.72, 0.2, 12, 40, Math.PI * 1.55]} />
          <meshStandardMaterial color="#eef3f4" roughness={0.62} metalness={0.08} />
        </mesh>
        <mesh position={[0.82, -0.12, 0.02]} castShadow>
          <boxGeometry args={[0.58, 0.22, 0.4]} />
          <meshStandardMaterial color="#eef3f4" roughness={0.62} metalness={0.08} />
        </mesh>
        <mesh position={[0, -0.72, 0.22]}>
          <planeGeometry args={[2.35, 0.28]} />
          <meshStandardMaterial map={nameMap} roughness={0.55} metalness={0.04} />
        </mesh>
      </group>
      <instancedMesh
        ref={debris}
        args={[undefined, undefined, shards.length]}
        frustumCulled={false}
        visible={false}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#f3f7f8"
          roughness={0.48}
          metalness={0.12}
          emissive="#7ef0d4"
          emissiveIntensity={0.4}
        />
      </instancedMesh>
    </group>
  )
}
