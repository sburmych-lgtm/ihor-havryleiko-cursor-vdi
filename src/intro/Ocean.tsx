import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Color, DoubleSide, ShaderMaterial, Vector3 } from "three"
import type { TimeRef } from "./timeline"

const VERTEX = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  varying vec3 vNormalW;
  varying float vHeight;
  varying float vFoam;

  vec3 gerstner(vec3 p, vec2 dir, float steep, float lambda, float speed) {
    float k = 6.28318530718 / lambda;
    float a = steep / k;
    float f = k * (dot(dir, p.xz) - speed * uTime);
    p.x += dir.x * a * cos(f);
    p.z += dir.y * a * cos(f);
    p.y += a * sin(f);
    return p;
  }

  void main() {
    vec3 p = position;
    p = gerstner(p, normalize(vec2(1.0, 0.28)), 0.32, 7.4, 1.35);
    p = gerstner(p, normalize(vec2(-0.55, 1.0)), 0.22, 3.8, 1.7);
    p = gerstner(p, normalize(vec2(0.2, -1.0)), 0.16, 2.1, 2.15);
    p = gerstner(p, normalize(vec2(-1.0, -0.4)), 0.11, 1.15, 2.6);

    vec3 t1 = gerstner(position + vec3(0.08, 0.0, 0.0), normalize(vec2(1.0, 0.28)), 0.32, 7.4, 1.35);
    vec3 t2 = gerstner(position + vec3(0.0, 0.0, 0.08), normalize(vec2(-0.55, 1.0)), 0.22, 3.8, 1.7);
    vec3 n = normalize(cross(t1 - p, t2 - p));

    vWorld = (modelMatrix * vec4(p, 1.0)).xyz;
    vNormalW = normalize(mat3(modelMatrix) * n);
    vHeight = p.y;
    vFoam = pow(clamp(p.y * 1.8 + 0.15, 0.0, 1.0), 1.4);
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
  varying vec3 vNormalW;
  varying float vHeight;
  varying float vFoam;

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 view = normalize(uCam - vWorld);
    float fres = pow(1.0 - max(dot(n, view), 0.0), 3.2);
    float slope = 1.0 - abs(n.y);
    vec3 col = mix(uDeep, uMid, clamp(vHeight * 1.4 + 0.35, 0.0, 1.0));
    col = mix(col, uFoam, vFoam * 0.85 + slope * 0.35);
    col += uGlow * (0.18 + 0.55 * (1.0 - vFoam)) * (0.25 + 0.75 * fres);
    col += vec3(0.75, 0.95, 1.0) * fres * 0.35;
    gl_FragColor = vec4(col, 1.0);
  }
`

type Props = {
  tRef: TimeRef
}

export function Ocean({ tRef }: Props) {
  const material = useRef<ShaderMaterial>(null)
  const segs = typeof window !== "undefined" && window.innerWidth < 720 ? 72 : 140

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new Color("#031018") },
      uMid: { value: new Color("#0a3a4a") },
      uFoam: { value: new Color("#d7f7f2") },
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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[48, 48, segs, segs]} />
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
