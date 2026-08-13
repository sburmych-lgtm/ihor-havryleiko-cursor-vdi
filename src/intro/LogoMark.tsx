import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import {
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SRGBColorSpace,
} from "three"
import { IGNITE_AT, lerp, range, type TimeRef } from "./timeline"

type Props = {
  tRef: TimeRef
}

function makeNameMap(): CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 160
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.clearRect(0, 0, 1024, 160)
    ctx.fillStyle = "#e8f7f3"
    ctx.font = "600 58px Unbounded, Segoe UI, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("IGOR GAVRILEYKO", 512, 80)
  }
  const map = new CanvasTexture(canvas)
  map.colorSpace = SRGBColorSpace
  map.anisotropy = 8
  return map
}

export function LogoMark({ tRef }: Props) {
  const root = useRef<Group>(null)
  const glow = useRef<Mesh>(null)
  const portal = useRef<Mesh>(null)
  const nameMap = useMemo(() => makeNameMap(), [])
  const stone = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: "#e8eef2",
        roughness: 0.48,
        metalness: 0.12,
        clearcoat: 0.35,
        emissive: new Color("#1a4a52"),
        emissiveIntensity: 0.05,
      }),
    [],
  )

  useFrame(() => {
    const t = tRef.current
    const node = root.current
    if (!node) return
    const ignite = range(t, IGNITE_AT, 6.1)
    const portalAmt = range(t, 6.45, 8.7)
    node.position.y = lerp(0.55, 1.48, range(t, 2.4, 4.4))
    node.rotation.y = Math.sin(t * 0.55) * 0.04
    stone.emissiveIntensity = 0.05 + ignite * 1.35
    if (glow.current) {
      glow.current.scale.setScalar(1 + ignite * 1.4)
      const mat = glow.current.material
      if (mat instanceof MeshBasicMaterial) {
        mat.opacity = 0.08 + ignite * 0.28 + portalAmt * 0.2
      }
    }
    if (portal.current) {
      portal.current.visible = portalAmt > 0.02
      const s = 0.15 + portalAmt * 6.4
      portal.current.scale.set(s, s, 1)
    }
  })

  return (
    <group ref={root} position={[-2.15, 0.55, 0.12]}>
      <mesh ref={glow} position={[0.15, 0.1, -0.35]} scale={1}>
        <sphereGeometry args={[1.15, 24, 18]} />
        <meshBasicMaterial color="#2ad4e8" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <mesh position={[-0.52, 0.12, 0]} material={stone} castShadow>
        <boxGeometry args={[0.52, 1.92, 0.42]} />
      </mesh>
      <mesh position={[0.52, 0.12, 0]} rotation={[0, 0, -0.32]} material={stone} castShadow>
        <torusGeometry args={[0.74, 0.21, 14, 48, Math.PI * 1.55]} />
      </mesh>
      <mesh position={[0.86, -0.08, 0]} material={stone} castShadow>
        <boxGeometry args={[0.62, 0.24, 0.42]} />
      </mesh>
      <mesh position={[0.12, -0.82, 0.24]}>
        <planeGeometry args={[2.4, 0.3]} />
        <meshPhysicalMaterial map={nameMap} transparent roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh ref={portal} position={[0.2, 0.15, 0.55]} rotation={[0, 0, 0]} visible={false}>
        <circleGeometry args={[0.55, 48]} />
        <meshPhysicalMaterial
          color="#071820"
          emissive="#2ad4e8"
          emissiveIntensity={1.4}
          roughness={0.12}
          metalness={0.65}
          transparent
          opacity={0.92}
        />
      </mesh>
    </group>
  )
}
