import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import './Ferrofluid.css';

type FlowDirection = 'up' | 'down' | 'left' | 'right';

type Props = {
  className?: string;
  dpr?: number;
  paused?: boolean;
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  flowDirection?: FlowDirection;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mouseDampening?: number;
  mixBlendMode?: string;
};

const MAX_COLORS = 8;

const hexToRGB = (hex: string) => {
  const color = hex.replace('#', '').padEnd(6, '0');
  return [
    parseInt(color.slice(0, 2), 16) / 255,
    parseInt(color.slice(2, 4), 16) / 255,
    parseInt(color.slice(4, 6), 16) / 255,
  ];
};

const prepColors = (input: string[]) => {
  const base = (input.length ? input : ['#4F46E5', '#06B6D4', '#E0F2FE']).slice(0, MAX_COLORS);
  const count = base.length;
  const arr: number[][] = [];
  for (let i = 0; i < MAX_COLORS; i += 1) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
  return { arr, count };
};

const flowVec = (direction: FlowDirection) => {
  if (direction === 'up') return [0, 1];
  if (direction === 'left') return [-1, 0];
  if (direction === 'right') return [1, 0];
  return [0, -1];
};

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;
uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;
uniform int uColorCount;
uniform vec2 uFlow;
uniform float uSpeed;
uniform float uScale;
uniform float uTurbulence;
uniform float uFluidity;
uniform float uRimWidth;
uniform float uSharpness;
uniform float uShimmer;
uniform float uGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;
varying vec2 vUv;
#define PI 3.14159265

vec3 palette(float h) {
  int count = uColorCount;
  if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0;
  if (idx == 1) return uColor1;
  if (idx == 2) return uColor2;
  if (idx == 3) return uColor3;
  if (idx == 4) return uColor4;
  if (idx == 5) return uColor5;
  if (idx == 6) return uColor6;
  return uColor7;
}

float hash(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float smin(float a, float b, float k) {
  float r = exp2(-a / k) + exp2(-b / k);
  return -k * log2(r);
}
float sinlerp(float a, float b, float w) {
  return mix(a, b, (sin(w * PI - PI / 2.0) + 1.0) / 2.0);
}
float vn(vec2 p, float s, float seed) {
  vec2 cellp = floor(p / s);
  vec2 relp = mod(p, s);
  float g1 = hash(vec3(cellp, seed));
  float g2 = hash(vec3(cellp.x + 1.0, cellp.y, seed));
  float g3 = hash(vec3(cellp.x + 1.0, cellp.y + 1.0, seed));
  float g4 = hash(vec3(cellp.x, cellp.y + 1.0, seed));
  float bx = sinlerp(g1, g2, relp.x / s);
  float tx = sinlerp(g4, g3, relp.x / s);
  return sinlerp(bx, tx, relp.y / s);
}
float dbn(vec2 p, float s, float seed) {
  float o = s / 2.0;
  float n0 = vn(p, s, seed);
  float n1 = vn(p + vec2(o, o), s, seed + 0.1);
  float n2 = vn(p + vec2(-o, o), s, seed + 0.2);
  float n3 = vn(p + vec2(o, -o), s, seed + 0.3);
  float n4 = vn(p + vec2(-o, -o), s, seed + 0.4);
  return (2.0 * n0 + 1.5 * n1 + 1.25 * n2 + 1.125 * n3 + n4) / 7.0;
}
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  float ref = 700.0 / max(uScale, 0.05);
  vec2 p = fragCoord / iResolution.y * ref;
  float spd = 200.0 * uSpeed;
  float t = iTime;
  vec2 dir = uFlow;
  vec2 perp = vec2(-dir.y, dir.x);
  float distort1 = vn(p + perp * (t * spd), 60.0, 10.0) * 50.0 * uTurbulence;
  float distort2 = vn(p - perp * (t * spd), 120.0, 15.0) * 100.0 * uTurbulence;
  float peaks = dbn(p + distort1 + dir * (t * spd * 0.5), 40.0, 1.0);
  float peaks2 = dbn(p + distort2 - dir * (t * spd * 0.5), 40.0, 0.0);
  float mapeaks = smin(peaks, peaks2, max(uFluidity, 0.001));
  float mGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mp = iMouse / iResolution.y * ref;
    float md = length(p - mp) / ref;
    float rr = max(uMouseRadius, 0.02);
    mGlow = exp(-md * md / (rr * rr)) * uMouseStrength;
  }
  float band = (uRimWidth - abs((mapeaks - 0.4) * 2.0)) * 5.0;
  float ltn = clamp(band - vn(p + dir * (t * spd * 0.5), 60.0, 12.0) * uShimmer, 0.0, 1.0);
  ltn = pow(ltn, uSharpness) * uGlow;
  ltn *= clamp(1.0 - mGlow, 0.0, 1.0);
  float h = clamp(0.5 + (peaks - peaks2) * 0.8, 0.0, 1.0);
  vec3 col = palette(h);
  vec3 outc = col * ltn;
  float a = clamp(max(outc.r, max(outc.g, outc.b)), 0.0, 1.0);
  fragColor = vec4(outc, a * uOpacity);
}
void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`;

export default function Ferrofluid({
  className = '',
  dpr = 1.25,
  paused = false,
  colors = ['#28A8FF', '#5CE1E6', '#34D399'],
  speed = 0.3,
  scale = 1.35,
  turbulence = 0.85,
  fluidity = 0.12,
  rimWidth = 0.17,
  sharpness = 3,
  shimmer = 0.8,
  glow = 1.5,
  flowDirection = 'right',
  opacity = 0.55,
  mouseInteraction = true,
  mouseStrength = 0.55,
  mouseRadius = 0.28,
  mouseDampening = 0.18,
  mixBlendMode = 'screen',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let renderer: Renderer | null = null;
    let program: Program | null = null;
    let mesh: Mesh | null = null;
    let geometry: Triangle | null = null;
    let raf = 0;
    let observer: ResizeObserver | null = null;
    let lastTime = 0;
    const mouseTarget = [0, 0];

    try {
      renderer = new Renderer({ dpr, alpha: true, antialias: true });
      const gl = renderer.gl;
      const canvas = gl.canvas as HTMLCanvasElement;
      gl.clearColor(0, 0, 0, 0);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);

      const { arr, count } = prepColors(colors);
      const uniforms = {
        iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
        iMouse: { value: [0, 0] },
        iTime: { value: 0 },
        uColor0: { value: arr[0] },
        uColor1: { value: arr[1] },
        uColor2: { value: arr[2] },
        uColor3: { value: arr[3] },
        uColor4: { value: arr[4] },
        uColor5: { value: arr[5] },
        uColor6: { value: arr[6] },
        uColor7: { value: arr[7] },
        uColorCount: { value: count },
        uFlow: { value: flowVec(flowDirection) },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uTurbulence: { value: turbulence },
        uFluidity: { value: fluidity },
        uRimWidth: { value: rimWidth },
        uSharpness: { value: sharpness },
        uShimmer: { value: shimmer },
        uGlow: { value: glow },
        uOpacity: { value: opacity },
        uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
        uMouseStrength: { value: mouseStrength },
        uMouseRadius: { value: mouseRadius },
      };

      program = new Program(gl, { vertex, fragment, uniforms });
      geometry = new Triangle(gl);
      mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        if (!renderer) return;
        const rect = container.getBoundingClientRect();
        renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height));
        uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
      };
      resize();
      observer = new ResizeObserver(resize);
      observer.observe(container);

      const onPointerMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * dpr;
        const y = (rect.height - (event.clientY - rect.top)) * dpr;
        mouseTarget[0] = x;
        mouseTarget[1] = y;
        if (mouseDampening <= 0) uniforms.iMouse.value = [x, y];
      };

      if (mouseInteraction) canvas.addEventListener('pointermove', onPointerMove);

      const loop = (time: number) => {
        raf = window.requestAnimationFrame(loop);
        uniforms.iTime.value = time * 0.001;

        if (mouseDampening > 0) {
          if (!lastTime) lastTime = time;
          const dt = (time - lastTime) / 1000;
          lastTime = time;
          const factor = Math.min(1, 1 - Math.exp(-dt / Math.max(0.0001, mouseDampening)));
          const current = uniforms.iMouse.value;
          current[0] += (mouseTarget[0] - current[0]) * factor;
          current[1] += (mouseTarget[1] - current[1]) * factor;
        }

        if (!paused && renderer && mesh) renderer.render({ scene: mesh });
      };

      if (paused) renderer.render({ scene: mesh });
      else raf = window.requestAnimationFrame(loop);

      return () => {
        if (raf) window.cancelAnimationFrame(raf);
        if (mouseInteraction) canvas.removeEventListener('pointermove', onPointerMove);
        observer?.disconnect();
        if (canvas.parentElement === container) container.removeChild(canvas);
        const cleanup = (value: unknown, method: string) => {
          const candidate = value as Record<string, unknown> | null;
          const fn = candidate?.[method];
          if (typeof fn === 'function') (fn as () => void).call(value);
        };
        cleanup(program, 'remove');
        cleanup(geometry, 'remove');
        cleanup(mesh, 'remove');
        cleanup(renderer, 'destroy');
      };
    } catch {
      observer?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      return;
    }
  }, [
    colors,
    dpr,
    flowDirection,
    fluidity,
    glow,
    mouseDampening,
    mouseInteraction,
    mouseRadius,
    mouseStrength,
    opacity,
    paused,
    rimWidth,
    scale,
    sharpness,
    shimmer,
    speed,
    turbulence,
  ]);

  return <div ref={containerRef} className={`ferrofluid-container ${className}`} style={{ mixBlendMode }} />;
}
