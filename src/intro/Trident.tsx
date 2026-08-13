import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Group, MeshPhysicalMaterial } from "three"
import { lerp, range, type TimeRef } from "./timeline"

type Props = {
  tRef: TimeRef
}

export function Trident({ tRef }: Props) {
  const root = useRef<Group>(null)
  const gold = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: "#e4c56a",
        metalness: 1,
        roughness: 0.18,
        emissive: "#5a3d0a",
        emissiveIntensity: 0.28,
        clearcoat: 0.55,
        clearcoatRoughness: 0.2,
      }),
    [],
  )

  useFrame(() => {
    const t = tRef.current
    const node = root.current
    if (!node) return
    const rise = range(t, 1.7, 4.05)
    const ignite = range(t, 4.2, 5.6)
    const portal = range(t, 6.5, 8.8)
    node.position.set(
      lerp(2.55, 1.55, rise) + ignite * -0.35,
      lerp(-2.8, 1.15, rise) + portal * 0.15,
      lerp(0.4, 0.05, rise),
    )
    node.rotation.set(
      lerp(0.55, 0.08, rise) + ignite * -0.18,
      lerp(0.35, -0.42, ignite),
      lerp(-0.25, 0.12, rise) + ignite * 0.2,
    )
    gold.emissiveIntensity = 0.28 + ignite * 1.15 + Math.sin(t * 6) * 0.08
  })

  return (
    <group ref={root} position={[2.55, -2.8, 0.4]}>
      <mesh material={gold} castShadow>
        <cylinderGeometry args={[0.045, 0.06, 4.4, 14]} />
      </mesh>
      <mesh position={[0, 1.35, 0]} material={gold}>
        <torusGeometry args={[0.09, 0.028, 10, 22]} />
      </mesh>
      <mesh position={[0, 1.55, 0]} material={gold}>
        <torusGeometry args={[0.08, 0.022, 10, 20]} />
      </mesh>
      <mesh position={[0, 2.28, 0]} material={gold} castShadow>
        <coneGeometry args={[0.07, 0.55, 10]} />
      </mesh>
      <mesh position={[-0.22, 2.08, 0]} rotation={[0, 0, 0.42]} material={gold} castShadow>
        <coneGeometry args={[0.055, 0.48, 10]} />
      </mesh>
      <mesh position={[0.22, 2.08, 0]} rotation={[0, 0, -0.42]} material={gold} castShadow>
        <coneGeometry args={[0.055, 0.48, 10]} />
      </mesh>
      <mesh position={[-0.18, 1.82, 0]} rotation={[0, 0, 1.15]} material={gold}>
        <cylinderGeometry args={[0.018, 0.018, 0.32, 8]} />
      </mesh>
      <mesh position={[0.18, 1.82, 0]} rotation={[0, 0, -1.15]} material={gold}>
        <cylinderGeometry args={[0.018, 0.018, 0.32, 8]} />
      </mesh>
      <pointLight position={[0, 2.2, 0.1]} color="#ffe7a8" intensity={2.4} distance={7} />
    </group>
  )
}
