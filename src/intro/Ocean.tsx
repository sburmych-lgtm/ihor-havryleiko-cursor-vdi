import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Color, DoubleSide, ShaderMaterial, Vector3 } from "three"
import type { TimeRef } from "./timeline"

const VERTEX = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  varying vec3 vN;
  varying float vH;

  vec3 gerstner(vec3 p, vec2 d, float steep, float lambda, float speed) {
    float k = 6.28318530718 / lambda;
    float a = steep / k;
    float f = k * (dot(d, p.xz) - speed * uTime);
    p.x += d.x * a * cos(f);
    p.z += d.y * a * cos(f);
    p.y += a * sin(f);
    return p;
  }

  vec3 sea(vec3 p) {
    p = gerstner(p, normalize(vec2(1.0, 0.22)), 0.38, 8.2, 1.15);
    p = gerstner(p, normalize(vec2(-0.62, 1.0)), 0.24, 4.1, 1.55);
    p = gerstner(p, normalize(vec2(0.18, -1.0)), 0.16, 2.2, 2.05);
    p = gerstner(p, normalize(vec2(-1.0, -0.35)), 0.1, 1.05, 2.55);
    return p;
  }

  void main() {
    vec3 p = sea(position);
    vec3 t1 = sea(position + vec3(0.12, 0.0, 0.0));
    vec3 t2 = sea(position + vec3(0.0, 0.0, 0.12));
    vN = normalize(mat3(modelMatrix) * normalize(cross(t1 - p, t2 - p)));
    vWorld = (modelMatrix * vec4(p, 1.0)).xyz;
    vH = p.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uFoam;
  uniform vec3 uGlow;
  uniform vec3 uCam;
  varying vec3 vWorld;
  varying vec3 vN;
  varying float vH;

  void main() {
    vec3 n = normalize(vN);
    vec3 view = normalize(uCam - vWorld);
    float fres = pow(1.0 - max(dot(n, view), 0.0), 3.4);
    float slope = 1.0 - abs(n.y);
    float foam = pow(clamp(vH * 1.55 + 0.12, 0.0, 1.0), 1.35);
    vec3 col = mix(uDeep, uMid, clamp(vH * 1.2 + 0.32, 0.0, 1.0));
    col = mix(col, uFoam, foam * 0.78 + slope * 0.32);
    col += uGlow * (0.16 + 0.5 * (1.0 - foam)) * (0.22 + 0.78 * fres);
    col += vec3(0.78, 0.96, 1.0) * fres * 0.42;
    gl_FragColor = vec4(col, 1.0);
  }
`

type Props = {
  tRef: TimeRef
}

export function Ocean({ tRef }: Props) {
  const material = useRef<ShaderMaterial>(null)
  const segs = typeof window !== "undefined" && window.innerWidth < 720 ? 80 : 150
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new Color("#021018") },
      uMid: { value: new Color("#0a3d4c") },
      uFoam: { value: new Color("#d9f7f1") },
      uGlow: { value: new Color("#2ad4e8") },
      uCam: { value: new Vector3() },
    }),
    [],
  )

  useFrame(({ camera }) => {
    const mat = material.current
    if (!mat) return
    mat.uniforms.uTime.value = tRef.current
    mat.uniforms.uCam.value.copy(camera.position)
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[56, 56, segs, segs]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        side={DoubleSide}
      />
    </mesh>
  )
}
