import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { CameraRig } from "./CameraRig"
import { LogoMonument } from "./LogoMonument"
import { Ocean } from "./Ocean"
import { PoseidonRig } from "./PoseidonRig"
import { StormFX } from "./StormFX"
import { INTRO_DURATION } from "./timeline"

type Props = {
  onComplete: () => void
}

export function PoseidonScene({ onComplete }: Props) {
  const tRef = useRef(0)
  const done = useRef(false)

  useFrame((_, delta) => {
    tRef.current += Math.min(delta, 1 / 20)
    if (!done.current && tRef.current >= INTRO_DURATION) {
      done.current = true
      onComplete()
    }
  })

  return (
    <>
      <CameraRig tRef={tRef} />
      <color attach="background" args={["#03090d"]} />
      <fog attach="fog" args={["#03090d", 9, 26]} />
      <ambientLight intensity={0.18} color="#1a3a44" />
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.35}
        color="#c9e7ea"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-7, 3, -2]} intensity={0.55} color="#2ad4e8" />
      <pointLight position={[-2.3, 1.6, 1.2]} intensity={4.5} color="#7ef0d4" distance={10} />
      <Ocean tRef={tRef} />
      <PoseidonRig tRef={tRef} />
      <LogoMonument tRef={tRef} />
      <StormFX tRef={tRef} />
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom intensity={1.15} luminanceThreshold={0.28} luminanceSmoothing={0.2} mipmapBlur />
        <Vignette offset={0.25} darkness={0.72} />
      </EffectComposer>
    </>
  )
}
