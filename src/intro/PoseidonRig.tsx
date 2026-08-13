import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group, PointLight } from "three"
import { IMPACT_AT, lerp, range, type TimeRef } from "./timeline"

type Props = {
  tRef: TimeRef
}

function Gold() {
  return (
    <meshStandardMaterial
      color="#d7b056"
      metalness={1}
      roughness={0.22}
      emissive="#5a3a08"
      emissiveIntensity={0.45}
    />
  )
}

function Skin() {
  return (
    <meshPhysicalMaterial
      color="#6d7c82"
      roughness={0.38}
      metalness={0.12}
      sheen={0.4}
      sheenColor="#9ec9c8"
      clearcoat={0.35}
      clearcoatRoughness={0.4}
    />
  )
}

function Hair() {
  return <meshStandardMaterial color="#121417" roughness={0.55} metalness={0.04} />
}

export function PoseidonRig({ tRef }: Props) {
  const root = useRef<Group>(null)
  const torso = useRef<Group>(null)
  const arm = useRef<Group>(null)
  const trident = useRef<Group>(null)
  const tipLight = useRef<PointLight>(null)

  useFrame(() => {
    const t = tRef.current
    const node = root.current
    const body = torso.current
    const strikingArm = arm.current
    const fork = trident.current
    if (!node || !body || !strikingArm || !fork) return

    const windup = range(t, 2.05, 3.55)
    const strike = range(t, 3.62, 4.2)
    const portal = range(t, 6.6, 8.6)
    const bob = Math.sin(t * 1.7) * 0.045 * (1 - strike)

    node.position.set(
      lerp(2.22, 0.42, strike) + (1 - strike) * 0.12 * windup,
      0.12 + bob,
      lerp(0.05, -0.35, strike),
    )
    node.rotation.set(
      lerp(-0.04, 0.18, strike),
      lerp(0.42, -0.72, strike) + windup * 0.55 * (1 - strike),
      lerp(0.04, -0.12, strike),
    )
    node.scale.setScalar(lerp(1, 1.04, strike) * (1 - portal * 0.08))

    body.rotation.z = lerp(0.04, -0.18, strike)
    strikingArm.rotation.set(
      lerp(-0.35, -1.15, windup) + strike * 1.55,
      lerp(0.15, 0.55, windup) - strike * 0.85,
      lerp(0.55, 1.35, windup) - strike * 1.85,
    )
    fork.rotation.x = lerp(0.15, -0.55, strike)
    fork.rotation.z = lerp(0.08, 0.42, strike)

    if (tipLight.current) {
      const after = Math.max(0, t - IMPACT_AT)
      const burst = t >= IMPACT_AT ? Math.exp(-after * 3.2) * 22 : windup * 3.4
      tipLight.current.intensity = 1.6 + burst
    }
  })

  return (
    <group ref={root} position={[2.22, 0.12, 0.05]}>
      <group ref={torso}>
        <mesh position={[0, 1.28, 0]} castShadow>
          <sphereGeometry args={[0.42, 22, 16]} />
          <Skin />
        </mesh>
        <mesh position={[0, 0.92, 0.02]} scale={[0.92, 0.7, 0.62]} castShadow>
          <sphereGeometry args={[0.4, 22, 16]} />
          <Skin />
        </mesh>
        <mesh position={[0, 0.62, 0.01]} scale={[0.72, 0.55, 0.5]} castShadow>
          <sphereGeometry args={[0.38, 18, 14]} />
          <Skin />
        </mesh>
        <mesh position={[0.34, 1.48, 0]} castShadow>
          <sphereGeometry args={[0.2, 14, 12]} />
          <Skin />
        </mesh>
        <mesh position={[-0.34, 1.48, 0]} castShadow>
          <sphereGeometry args={[0.2, 14, 12]} />
          <Skin />
        </mesh>
        <mesh position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.055, 10, 28]} />
          <Gold />
        </mesh>
        <mesh position={[0, 0.38, 0.04]} rotation={[0.4, 0, 0]} scale={[1.05, 0.7, 0.8]}>
          <sphereGeometry args={[0.36, 16, 10]} />
          <meshStandardMaterial color="#0a3640" roughness={0.62} metalness={0.08} />
        </mesh>
      </group>

      <group position={[0, 1.78, 0.02]}>
        <mesh castShadow>
          <sphereGeometry args={[0.2, 18, 14]} />
          <Skin />
        </mesh>
        <mesh position={[0, 0.08, 0.02]}>
          <sphereGeometry args={[0.17, 14, 12]} />
          <Hair />
        </mesh>
        {[-0.08, 0, 0.08, -0.14, 0.14, -0.05, 0.05].map((x, i) => (
          <mesh
            key={`hair-${String(i)}`}
            position={[x, 0.16 + (i % 3) * 0.04, -0.04 - (i % 2) * 0.05]}
            rotation={[0.7 + i * 0.08, 0, x * 1.4]}
          >
            <capsuleGeometry args={[0.035, 0.28, 4, 8]} />
            <Hair />
          </mesh>
        ))}
        {[-0.1, -0.04, 0.04, 0.1].map((x, i) => (
          <mesh
            key={`beard-${String(i)}`}
            position={[x, -0.12, 0.08]}
            rotation={[0.9, 0, x * 0.8]}
          >
            <capsuleGeometry args={[0.03, 0.16, 4, 8]} />
            <Hair />
          </mesh>
        ))}
      </group>

      <group position={[0.52, 1.38, 0.05]} rotation={[0.15, 0, -0.55]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.42, 4, 10]} />
          <Skin />
        </mesh>
        <mesh position={[0.02, -0.62, 0.04]} rotation={[0.35, 0, 0.2]}>
          <capsuleGeometry args={[0.085, 0.38, 4, 10]} />
          <Skin />
        </mesh>
        <mesh position={[0.04, -0.48, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.028, 8, 16]} />
          <Gold />
        </mesh>
      </group>

      <group ref={arm} position={[-0.5, 1.4, 0.08]}>
        <mesh position={[-0.08, -0.22, 0]} rotation={[0.2, 0, 0.45]} castShadow>
          <capsuleGeometry args={[0.11, 0.46, 4, 10]} />
          <Skin />
        </mesh>
        <mesh position={[-0.22, -0.58, 0.12]} rotation={[0.55, 0.2, 0.35]} castShadow>
          <capsuleGeometry args={[0.09, 0.4, 4, 10]} />
          <Skin />
        </mesh>
        <mesh position={[-0.18, -0.42, 0.08]} rotation={[Math.PI / 2, 0.3, 0]}>
          <torusGeometry args={[0.105, 0.03, 8, 18]} />
          <Gold />
        </mesh>
        <group ref={trident} position={[-0.38, -0.82, 0.22]} rotation={[0.2, 0.4, 0.35]}>
          <mesh>
            <cylinderGeometry args={[0.028, 0.034, 2.35, 10]} />
            <Gold />
          </mesh>
          <mesh position={[0, 1.22, 0]}>
            <coneGeometry args={[0.055, 0.28, 8]} />
            <Gold />
          </mesh>
          <mesh position={[-0.12, 1.12, 0]} rotation={[0, 0, 0.35]}>
            <coneGeometry args={[0.045, 0.26, 8]} />
            <Gold />
          </mesh>
          <mesh position={[0.12, 1.12, 0]} rotation={[0, 0, -0.35]}>
            <coneGeometry args={[0.045, 0.26, 8]} />
            <Gold />
          </mesh>
          <pointLight
            ref={tipLight}
            position={[0, 1.18, 0]}
            color="#7ef0d4"
            intensity={2}
            distance={8}
          />
        </group>
      </group>

      <mesh position={[0.16, 0.18, 0.02]} rotation={[0.1, 0, 0.08]}>
        <capsuleGeometry args={[0.12, 0.55, 4, 10]} />
        <Skin />
      </mesh>
      <mesh position={[-0.16, 0.18, 0.02]} rotation={[0.1, 0, -0.08]}>
        <capsuleGeometry args={[0.12, 0.55, 4, 10]} />
        <Skin />
      </mesh>
    </group>
  )
}
