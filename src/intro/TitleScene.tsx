import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Atmosphere } from "./Atmosphere"
import { CameraRig } from "./CameraRig"
import { LogoMark } from "./LogoMark"
import { Ocean } from "./Ocean"
import { Trident } from "./Trident"
import { INTRO_DURATION } from "./timeline"

type Props = {
  onComplete: () => void
}

export function TitleScene({ onComplete }: Props) {
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
      <fog attach="fog" args={["#03090d", 8, 24]} />
      <ambientLight intensity={0.16} color="#16323c" />
      <directionalLight position={[7, 9, 5]} intensity={1.45} color="#d7eef0" castShadow />
      <directionalLight position={[-8, 2.5, -3]} intensity={0.7} color="#2ad4e8" />
      <Ocean tRef={tRef} />
      <Trident tRef={tRef} />
      <LogoMark tRef={tRef} />
      <Atmosphere tRef={tRef} />
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom intensity={1.05} luminanceThreshold={0.32} luminanceSmoothing={0.22} mipmapBlur />
        <Vignette offset={0.28} darkness={0.68} />
      </EffectComposer>
    </>
  )
}
