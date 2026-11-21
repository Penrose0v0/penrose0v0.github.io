(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,21168,e=>{"use strict";let t="#050608";e.s(["STACKED_LAYOUT_QUERY",0,"(max-width: 820px), (max-aspect-ratio: 9/10)","heroLayout",0,{maxWidth:1600},"pageBackground",0,t,"particleConfig",0,{count:{high:45e4,medium:26e4,low:14e4},minCount:6e4,render:{size:.5,sizeDepthBoost:.35,opacity:.4,exposure:1.9,depthFade:.86,shimmer:.4,shimmerSpeed:.22,energyGlint:.5},colorBright:"#dfe8f6",colorDeep:"#6283b5",background:t,placement:{wide:{centerX:.705,centerY:.52,radiusByWidth:.27,radiusByHeight:.4},stacked:{centerX:.5,centerY:.35,radiusByWidth:.43,radiusByHeight:.25}},shape:{threadSpacing:.0036,threadLength:[.25,.8],threadsPerBundle:14,bundleSpread:.05,fieldScale:2,fieldDetail:.5,fieldCirculation:.8,radialDrift:.5,innerRadius:.22,radialBias:.56,escapeFraction:1,escapeSpread:.01,edgeLooseness:2.2,threadWidth:.0014,veilFraction:.36,veilWidth:.011,dustFraction:.14,dustSpread:.035},edge:{fadeStart:.8,fadeEnd:1.24,fadeVariation:.3},rotationSpeed:.04,rotationShear:.35,tilt:.32,flowIntensity:.07,flowScale:2.2,flowSpeed:.15,streamPeriod:9,streamTravel:.2,disturbance:{resolution:192,radius:.1,strength:3.2,life:3.2,spread:1.4,selfAdvection:.9,carry:.05,coupling:6.5},repulsionRadius:.32,repulsionStrength:5.6,repulsionCore:.07,repulsionSpeedBoost:.25,pointerDrag:.8,pointerSwirl:.6,pointerFade:5,springStiffness:24,damping:3.3,cameraDistance:4.4,maxPixelRatio:2,slowFrameMs:21},"typographyConfig",0,{color:"#e6eaf0",mutedColor:"rgba(216, 224, 236, 0.6)",faintColor:"rgba(216, 224, 236, 0.46)",titleWeight:300,titleSize:"clamp(2.75rem, 5.3cqw, 5.4rem)",titleTracking:"0.012em",titleLeading:1.08,subtitleWeight:400,subtitleSize:"clamp(0.98rem, 1.2cqw, 1.14rem)",subtitleTracking:"0.022em",subtitleLeading:1.7,eyebrowWeight:500,eyebrowSize:"0.7rem",eyebrowTracking:"0.3em"}])},34133,e=>{"use strict";let t=`
uniform float uFieldScale;
uniform float uFieldDetail;
uniform float uFieldCirculation;
uniform float uRadialDrift;

const vec3 THREAD_AXIS = vec3(0.26, 0.93, -0.26);

vec3 threadOctave(vec3 p, float f, float amp, float o) {
  float u1 = p.x * f + 1.3 + o;
  float v1 = p.y * f * 1.1 + 0.4 + o * 2.0;
  float u2 = p.y * f + 2.1 + o * 3.0;
  float v2 = p.z * f * 1.2 + 1.7 + o;
  float u3 = p.z * f + 0.6 + o * 2.0;
  float v3 = p.x * f * 0.9 + 2.9 + o * 3.0;
  return amp * vec3(
    cos(u1) * cos(v1) - 0.9 * sin(u3) * sin(v3),
    cos(u2) * cos(v2) - 1.1 * sin(u1) * sin(v1),
    cos(u3) * cos(v3) - 1.2 * sin(u2) * sin(v2)
  );
}

vec3 threadField(vec3 p) {
  vec3 g = uFieldCirculation * THREAD_AXIS
    + threadOctave(p, uFieldScale, 1.0, 0.0)
    + threadOctave(p, uFieldScale * 2.3, uFieldDetail, 1.9);
  float r = max(length(p), 1e-4);
  vec3 n = p / r;
  vec3 v = cross(n, g);
  v += n * uRadialDrift * sin(p.x * uFieldScale * 0.7 + p.y * uFieldScale * 0.9 + 1.1) * max(1.0 - r, 0.0);
  return v;
}
`,r=`#version 300 es
precision highp float;

layout(location = 0) in vec4 aHome; // xyz = rest position, w = random seed
layout(location = 1) in vec3 aPos;
layout(location = 2) in vec3 aVel;
layout(location = 3) in vec2 aFiber;  // x = 0..1 along its thread, y = per-thread random

uniform float uTime;
uniform float uDt;
uniform float uSnap;          // 1 → jump straight to the target (no physics)

uniform float uStreamPeriod;  // seconds for one pass of a thread along its streamline
uniform float uStreamTravel;  // how far it slides in that time (scaled by local field speed)

uniform sampler2D uDisturbance;   // persistent disturbance field (gb = velocity)
uniform float uDisturbanceExtent; // half-size of the field in world units
uniform float uDisturbanceCoupling;
uniform float uCamDist;

uniform float uRotSpeed;
uniform float uRotShear;
uniform float uTilt;
uniform float uFlowAmp;
uniform float uFlowScale;
uniform float uFlowSpeed;

uniform vec3  uRayOrigin;     // pointer ray, world space
uniform vec3  uRayDir;
uniform vec3  uPointerVel;    // pointer velocity on the z = 0 plane
uniform float uPointerActive; // 0..1
uniform float uRepRadius;
uniform float uRepStrength;
uniform float uRepCore;
uniform float uRepSpeedBoost;
uniform float uPointerDrag;
uniform float uPointerSwirl;

uniform float uStiffness;
uniform float uDamping;

out vec3 vPos;
out vec3 vVel;
${t}
// Divergence-free, domain-warped trigonometric flow (ABC-flow style).
// Cheap, perfectly smooth in space and time, and full of slow local swirls.
vec3 flow(vec3 p, float t) {
  vec3 q = p + 0.55 * vec3(
    sin(p.y * 1.31 + t * 0.71),
    sin(p.z * 1.17 - t * 0.53),
    sin(p.x * 1.43 + t * 0.61)
  );
  vec3 a = vec3(
    sin(q.y + t) + cos(q.z * 1.27 - t * 0.83),
    sin(q.z - t * 0.91) + cos(q.x * 1.19 + t * 0.67),
    sin(q.x + t * 0.77) + cos(q.y * 1.33 - t)
  );
  vec3 r = q * 2.17 + 3.7;
  vec3 b = vec3(
    sin(r.y - t * 1.3) + cos(r.z + t * 1.1),
    sin(r.z + t * 1.2) + cos(r.x - t * 1.4),
    sin(r.x - t * 1.1) + cos(r.y + t * 1.3)
  );
  return a * 0.5 + b * 0.22;
}

vec3 targetPosition(vec3 home, float phase) {
  float r = length(home);

  // Streaming: every thread slides along its own streamline, at the local
  // speed of the field, then fades out and starts again (phases are staggered
  // per thread). Neighbouring eddies move in different directions and at
  // different speeds, so the interior flows instead of turning as one body.
  float travel = (phase - 0.5) * uStreamTravel;
  vec3 mid = home + threadField(home) * travel * 0.5;
  vec3 slid = home + threadField(mid) * travel;
  slid *= r / max(length(slid), 1e-4);

  // Slow breathing of the whole structure, kept mostly tangential so the
  // silhouette stays a sphere.
  vec3 n = slid / max(r, 1e-3);
  vec3 f = flow(slid * uFlowScale, uTime * uFlowSpeed);
  f -= 0.72 * dot(f, n) * n;
  vec3 p = slid + uFlowAmp * f;

  // Slow rotation; radial layers drift at slightly different rates.
  float layer = 1.0 + uRotShear * sin(r * 7.0 + 1.3);
  float ang = uTime * uRotSpeed * layer;
  float c = cos(ang), s = sin(ang);
  p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);

  // Fixed axis tilt.
  float ct = cos(uTilt), st = sin(uTilt);
  p = vec3(ct * p.x - st * p.y, st * p.x + ct * p.y, p.z);
  return p;
}

void main() {
  float seed = fract(aHome.w);
  float phase = fract(uTime / uStreamPeriod + aFiber.y);
  vec3 target = targetPosition(aHome.xyz, phase);

  // Jump (invisibly – the thread is fully faded here) when its cycle restarts.
  if (uSnap > 0.5 || phase * uStreamPeriod < uDt * 1.5) {
    vPos = target;
    vVel = vec3(0.0);
    return;
  }

  vec3 pos = aPos;
  vec3 vel = aVel;

  // Spring back to the structure. Slight per-particle variation keeps the
  // return organic instead of everything arriving on the same frame.
  float k = uStiffness * (0.88 + 0.24 * fract(seed * 17.31));
  vec3 force = (target - pos) * k - vel * uDamping * (0.94 + 0.12 * fract(seed * 5.77));

  // Pointer repulsion: push away from the pointer ray with a smooth falloff.
  // The push eases to zero on the ray itself (uRepCore), so strands part
  // around the pointer instead of being cut off at a hard edge.
  vec3 rel = pos - uRayOrigin;
  vec3 perp = rel - dot(rel, uRayDir) * uRayDir;
  float d = length(perp);
  float sigma = uRepRadius * 0.5;
  float fall = exp(-(d * d) / (2.0 * sigma * sigma)) * uPointerActive;
  float core = d / sqrt(d * d + uRepCore * uRepCore + 1e-6);
  float pointerSpeed = min(length(uPointerVel), 4.0);
  vec3 away = perp / max(d, 1e-4);
  force += away * fall * core * uRepStrength * (1.0 + uRepSpeedBoost * pointerSpeed);

  // Drag: a moving pointer carries particles with it. Outside the core the
  // force follows the return flow around a moving body (a dipole), which
  // curls the displaced strands back around both sides of the stroke.
  vec3 pv = uPointerVel * (pointerSpeed / max(length(uPointerVel), 1e-4));
  float dd = max(d, sigma);
  vec3 dipole = (sigma * sigma) / (dd * dd) * (2.0 * dot(pv, away) * away - pv);
  vec3 carried = mix(pv, dipole, smoothstep(0.6 * sigma, 1.5 * sigma, d));
  float reach = exp(-(d * d) / (2.0 * 4.0 * sigma * sigma)) * uPointerActive;
  force += mix(pv * fall, carried * reach, uPointerSwirl) * uPointerDrag;

  // Persistent disturbance: whatever the pointer stirred up keeps pushing the
  // particles here for as long as it lives in the field, wherever it has
  // drifted to since.
  float persp = uCamDist / max(uCamDist - pos.z, 0.2);
  vec2 fieldUv = pos.xy * persp / uDisturbanceExtent * 0.5 + 0.5;
  vec2 stir = texture(uDisturbance, fieldUv).gb;
  force += vec3(stir, 0.0) * uDisturbanceCoupling;

  // Semi-implicit Euler.
  vel += force * uDt;
  float speed = length(vel);
  if (speed > 9.0) vel *= 9.0 / speed;
  pos += vel * uDt;

  vPos = pos;
  vVel = vel;
}
`,i=`#version 300 es
precision lowp float;
out vec4 outColor;
void main() { outColor = vec4(0.0); }
`,a=`#version 300 es
precision highp float;

uniform sampler2D uPrev;     // r = stream function, gb = velocity
uniform vec2  uTexel;
uniform float uExtent;       // half-size of the field in world units
uniform float uDt;
uniform float uTime;
uniform vec2  uPointer;      // world units, view plane
uniform vec2  uPointerVel;
uniform float uPointerActive;
uniform float uRadius;
uniform float uInject;
uniform float uLife;         // seconds for a disturbance to fade to ~37%
uniform float uSpread;       // diffusion rate
uniform float uSelfAdvect;   // how strongly the disturbance carries itself
uniform float uCarry;        // gentle ambient drift that keeps old disturbances moving
out vec4 outColor;

// Velocity is the curl of the stream function, so it is always divergence-free:
// it swirls and folds but never piles particles up or tears holes.
vec2 velocityAt(vec2 uv) {
  float n = texture(uPrev, uv + vec2(0.0, uTexel.y)).r;
  float s = texture(uPrev, uv - vec2(0.0, uTexel.y)).r;
  float e = texture(uPrev, uv + vec2(uTexel.x, 0.0)).r;
  float w = texture(uPrev, uv - vec2(uTexel.x, 0.0)).r;
  float cell = 2.0 * uExtent * uTexel.x;   // world size of one texel
  return vec2(n - s, w - e) / (2.0 * cell);
}

void main() {
  vec2 uv = gl_FragCoord.xy * uTexel;
  vec2 world = (uv * 2.0 - 1.0) * uExtent;
  vec2 vel = velocityAt(uv);

  // Slow ambient drift (also a curl, so also divergence-free).
  float t = uTime * 0.11;
  vec2 drift = uCarry * vec2(
    cos(world.y * 1.7 + t) + 0.6 * cos(world.y * 3.1 - world.x * 1.3 - t * 1.4),
    sin(world.x * 1.9 - t * 0.8) + 0.6 * sin(world.x * 2.7 + world.y * 1.1 + t * 1.2)
  );

  // Semi-Lagrangian transport: the disturbance is carried by its own flow.
  vec2 back = uv - (vel * uSelfAdvect + drift) * uDt / (2.0 * uExtent);
  float psi = texture(uPrev, back).r;

  // Spread a little, then fade.
  float around = 0.25 * (
    texture(uPrev, back + vec2(uTexel.x, 0.0)).r + texture(uPrev, back - vec2(uTexel.x, 0.0)).r +
    texture(uPrev, back + vec2(0.0, uTexel.y)).r + texture(uPrev, back - vec2(0.0, uTexel.y)).r
  );
  psi = mix(psi, around, clamp(uSpread * uDt, 0.0, 0.8));
  psi *= exp(-uDt / uLife);

  // The pointer writes a dipole: a jet along its motion with return flow on
  // both sides, i.e. a pair of counter-rotating eddies left in its wake.
  vec2 d = world - uPointer;
  float g = exp(-dot(d, d) / (2.0 * uRadius * uRadius));
  float speed = length(uPointerVel);
  vec2 push = uPointerVel * (min(speed, 5.0) / max(speed, 1e-4));
  psi += (push.x * d.y - push.y * d.x) * g * uInject * uPointerActive * uDt;

  // Keep it bounded and let it die out towards the border of the field.
  psi = clamp(psi, -2.0, 2.0);
  vec2 edge = smoothstep(vec2(0.0), vec2(0.12), uv) * smoothstep(vec2(0.0), vec2(0.12), 1.0 - uv);
  psi *= edge.x * edge.y;

  outColor = vec4(psi, vel, 1.0);
}
`,o=`#version 300 es
precision highp float;

layout(location = 0) in vec4 aHome;   // xyz = rest position, w = random seed
layout(location = 1) in vec3 aPos;
layout(location = 2) in vec3 aVel;
layout(location = 3) in vec2 aFiber;  // x = 0..1 along its thread, y = per-thread random

uniform vec2  uCenter;      // sphere centre in NDC
uniform vec2  uScale;       // NDC units per world unit at z = 0
uniform vec2  uResolution;  // render target size in px
uniform float uCamDist;
uniform float uTime;
uniform float uSize;        // particle diameter in device px
uniform float uSizeDepthBoost;
uniform float uOpacity;
uniform float uDepthFade;
uniform float uShimmer;
uniform float uShimmerSpeed;
uniform float uEnergyGlint;
uniform float uStreamPeriod;
uniform float uEdgeStart;
uniform float uEdgeEnd;
uniform float uEdgeVariation;
uniform vec3  uColorBright;
uniform vec3  uColorDeep;

out vec3 vColor;
flat out vec2 vCenterPx;
flat out float vInvTwoSigma2;

void main() {
  float seed = aHome.w;
  float persp = uCamDist / max(uCamDist - aPos.z, 0.2);
  vec2 ndc = uCenter + aPos.xy * persp * uScale;
  gl_Position = vec4(ndc, 0.0, 1.0);

  // 0 at the far side of the sphere, 1 at the near side.
  float front = clamp(aPos.z * 0.5 + 0.5, 0.0, 1.0);

  // Target diameter. Anything narrower than the pixel grid can resolve is drawn
  // at the minimum footprint and made fainter instead: true sub-pixel points.
  float diameter = uSize * persp * (1.0 + uSizeDepthBoost * (front - 0.5)) * mix(0.8, 1.2, fract(seed * 91.17));
  float sigma = max(diameter * 0.5, 0.42);
  float coverage = min((diameter * diameter) / (4.0 * sigma * sigma), 1.0);

  // Threads fade in and out at their ends, and a slow pulse of light travels along them.
  float taper = smoothstep(0.0, 0.12, aFiber.x) * smoothstep(1.0, 0.88, aFiber.x);
  float wave = sin(6.2832 * (aFiber.x * (1.5 + 2.0 * aFiber.y) - uTime * uShimmerSpeed * (0.6 + 0.8 * aFiber.y) + aFiber.y * 7.0));
  float shimmer = 1.0 + uShimmer * wave;

  // Each thread fades in, streams along its path, and fades out again.
  float phase = fract(uTime / uStreamPeriod + aFiber.y);
  float life = smoothstep(0.0, 0.2, phase) * smoothstep(1.0, 0.8, phase);

  // The sphere has no surface: threads thin out with radius, each starting to
  // fade at a slightly different distance, so the outline frays into the dark.
  float homeRadius = length(aHome.xyz);
  float edgeStart = uEdgeStart + (aFiber.y - 0.5) * uEdgeVariation;
  float edge = 1.0 - smoothstep(edgeStart, uEdgeEnd, homeRadius);

  // Depth: the far side recedes (dimmer, cooler), the near side comes forward.
  float depth = mix(1.0, front * front * (3.0 - 2.0 * front), uDepthFade);
  float energy = smoothstep(0.15, 3.0, length(aVel));

  vec3 color = mix(uColorDeep, uColorBright, front);
  color = mix(color, vec3(0.94, 0.97, 1.0), energy * 0.6);

  float alpha = uOpacity * coverage * taper * shimmer * depth * life * edge * edge
    * mix(0.65, 1.35, fract(seed * 37.73)) * (1.0 + uEnergyGlint * energy);

  vColor = color * alpha;
  vCenterPx = (ndc * 0.5 + 0.5) * uResolution;
  vInvTwoSigma2 = 1.0 / (2.0 * sigma * sigma);
  gl_PointSize = ceil(sigma * 5.0) + 1.0;
}
`,n=`#version 300 es
precision highp float;

in vec3 vColor;
flat in vec2 vCenterPx;
flat in float vInvTwoSigma2;
out vec4 outColor;

void main() {
  // Analytic anti-aliasing: a Gaussian centred on the particle's exact
  // sub-pixel position, so points never snap to the pixel grid as they move.
  vec2 d = gl_FragCoord.xy - vCenterPx;
  float w = exp(-dot(d, d) * vInvTwoSigma2);
  outColor = vec4(vColor * w, 0.0);
}
`,l=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,u=`#version 300 es
precision highp float;

uniform sampler2D uLight;
uniform vec3  uBackground;
uniform float uExposure;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

void main() {
  // Exactly one texel per pixel – no filtering, no blur.
  vec3 light = texelFetch(uLight, ivec2(gl_FragCoord.xy), 0).rgb * uExposure;

  // Soft shoulder on luminance (keeps hue): overlapping strands stay distinct
  // instead of burning out to flat white.
  float lum = dot(light, vec3(0.299, 0.587, 0.114));
  float mapped = 1.0 - exp(-lum);
  vec3 color = light * (mapped / max(lum, 1e-5));

  float n = hash(gl_FragCoord.xy) + hash(gl_FragCoord.xy + 17.13) - 1.0;
  outColor = vec4(uBackground + color + n / 255.0, 1.0);
}
`;e.s(["ATTRIB",0,{home:0,pos:1,vel:2,fiber:3},"FIELD_FRAG",0,a,"POINT_FRAG",0,n,"POINT_VERT",0,o,"RESOLVE_FRAG",0,u,"SCREEN_VERT",0,l,"SIM_FRAG",0,i,"SIM_VERT",0,r])},63736,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(21168);let a={system:{a:1.4,center:[-3.4,-3.4,-3.4],extent:10.8,timeScale:.11},count:{high:45e4,medium:26e4,low:14e4},minCount:6e4,seeding:{lifetime:24,threadSpacing:.003,threadLength:[.3,1],threadsPerBundle:5,bundleSpread:.02,threadWidth:.0015,veilFraction:.3,veilWidth:.009,dustFraction:.12,dustSpread:.03},view:{tilt:0,spin:.8,driftAmount:.14,driftPeriod:46},render:{size:.5,sizeDepthBoost:.35,opacity:.26,exposure:1.7,depthFade:.82,shimmer:.3,shimmerSpeed:.2,energyGlint:.6,fadeRadius:[1.25,1.6]},colorBright:"#dfe8f6",colorDeep:"#6283b5",background:i.pageBackground,placement:{wide:{centerX:.77,centerY:.6,radiusByWidth:.42,radiusByHeight:.64},stacked:{centerX:.5,centerY:.5,radiusByWidth:.66,radiusByHeight:.34}},pointer:{radius:.13,strength:5,core:.08,speedBoost:.15,drag:.45,decay:.45,fade:5},disturbance:{resolution:192,radius:.1,strength:2.2,life:2.6,spread:1.4,selfAdvection:.9,carry:.05,coupling:.1},escapeRadius:1.9,cameraDistance:4.4,maxPixelRatio:2,slowFrameMs:21};function o(e,t,r=1){let i,{a,center:n,extent:l}=t.system,u=t.seeding,s=(i=0x1203ebb,()=>{let e=i=i+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}),d=()=>Math.sqrt(-2*Math.log(Math.max(s(),1e-7)))*Math.cos(2*Math.PI*s()),c=[0,0,0],f=(e,t,r)=>{c[0]=-a*e-4*t-4*r-t*t,c[1]=-a*t-4*r-4*e-r*r,c[2]=-a*r-4*e-4*t-e*e},m=[-1.48,-1.51,2.04],h=(e,t)=>{let[r,i,a]=e;f(r,i,a);let o=c[0],n=c[1],l=c[2];f(r+o*t/2,i+n*t/2,a+l*t/2);let u=c[0],s=c[1],d=c[2];f(r+u*t/2,i+s*t/2,a+d*t/2);let m=c[0],h=c[1],p=c[2];f(r+m*t,i+h*t,a+p*t),e[0]=r+t/6*(o+2*u+2*m+c[0]),e[1]=i+t/6*(n+2*s+2*h+c[1]),e[2]=a+t/6*(l+2*d+2*p+c[2])};for(let e=0;e<4e3;e++)h(m,.003);let p=new Float32Array(6*e),v=u.threadSpacing*r*l,[g,y]=u.threadLength,x=[0,0,0],b=0;for(;b<e;){let t=40+Math.floor(260*s());for(let e=0;e<t;e++)h(m,.003);for(let t=0;t<u.threadsPerBundle&&b<e;t++){x[0]=m[0]+d()*u.bundleSpread*l,x[1]=m[1]+d()*u.bundleSpread*l,x[2]=m[2]+d()*u.bundleSpread*l;let t=s(),i=Math.min(Math.max(8,Math.round((g+(y-g)*s())/(u.threadSpacing*r))),e-b);for(let e=0;e<i;e++){f(x[0],x[1],x[2]),h(x,Math.min(v/(Math.hypot(c[0],c[1],c[2])||1),.01));let r=s(),a=(r<u.dustFraction?u.dustSpread:r<u.dustFraction+u.veilFraction?u.veilWidth:u.threadWidth)*l,o=6*b;p[o]=(x[0]+d()*a-n[0])/l,p[o+1]=(x[1]+d()*a-n[1])/l,p[o+2]=(x[2]+d()*a-n[2])/l,p[o+3]=s(),p[o+4]=i>1?e/(i-1):.5,p[o+5]=t,b++}}}return p}var n=e.i(34133);let l=`#version 300 es
precision highp float;

layout(location = 0) in vec4 aSeed;    // xyz = release point, w = random
layout(location = 1) in vec3 aPos;     // state q
layout(location = 2) in vec3 aVel;     // injected (pointer) velocity, decays
layout(location = 3) in vec2 aThread;  // x = 0..1 along its thread, y = per-thread random

uniform float uTime;
uniform float uDt;
uniform float uSnap;          // 1 → place every particle on its release point

uniform float uA;
uniform vec3  uCenter;
uniform float uExtent;
uniform float uTimeScale;     // attractor time per second
uniform float uLifetime;
uniform float uEscapeRadius;

uniform mat3  uView;
uniform float uCamDist;

uniform vec3  uRayOrigin;     // pointer ray, world space
uniform vec3  uRayDir;
uniform vec3  uPointerVel;
uniform float uPointerActive;
uniform float uPushRadius;
uniform float uPushStrength;
uniform float uPushCore;
uniform float uPushSpeedBoost;
uniform float uPointerDrag;
uniform float uPushDecay;

uniform sampler2D uDisturbance;
uniform float uDisturbanceExtent;
uniform float uDisturbanceCoupling;

out vec3 vPos;
out vec3 vVel;

// Halvorsen's cyclically symmetric system, in normalised coordinates.
vec3 halvorsen(vec3 q) {
  vec3 p = q * uExtent + uCenter;
  vec3 dp = vec3(
    -uA * p.x - 4.0 * p.y - 4.0 * p.z - p.y * p.y,
    -uA * p.y - 4.0 * p.z - 4.0 * p.x - p.z * p.z,
    -uA * p.z - 4.0 * p.x - 4.0 * p.y - p.x * p.x
  );
  return dp / uExtent;
}

void main() {
  // Release cycle: staggered per thread; the thread is fully faded out at the
  // moment it is put back on its release points.
  float phase = fract(uTime / uLifetime + aThread.y);
  if (uSnap > 0.5 || phase * uLifetime < uDt * 1.5) {
    vPos = aSeed.xyz;
    vVel = vec3(0.0);
    return;
  }

  vec3 q = aPos;
  vec3 kick = aVel;

  // ---- pointer: adds velocity, never a target ----
  vec3 world = uView * q;
  vec3 rel = world - uRayOrigin;
  vec3 perp = rel - dot(rel, uRayDir) * uRayDir;
  float d = length(perp);
  float sigma = uPushRadius * 0.5;
  float fall = exp(-(d * d) / (2.0 * sigma * sigma)) * uPointerActive;
  float core = d / sqrt(d * d + uPushCore * uPushCore + 1e-6);
  float speed = min(length(uPointerVel), 4.0);
  vec3 away = perp / max(d, 1e-4);
  vec3 pv = uPointerVel * (speed / max(length(uPointerVel), 1e-4));
  vec3 accel = away * fall * core * uPushStrength * (1.0 + uPushSpeedBoost * speed)
             + pv * fall * uPointerDrag;

  // World → state space (uView is a rotation, so its transpose is its inverse).
  kick += (accel * uView) * uDt;
  kick *= exp(-uDt / uPushDecay);

  // Lingering wake of earlier strokes: carried along like a current.
  float persp = uCamDist / max(uCamDist - world.z, 0.2);
  vec2 stir = texture(uDisturbance, world.xy * persp / uDisturbanceExtent * 0.5 + 0.5).gb;
  vec3 current = vec3(stir, 0.0) * uView * uDisturbanceCoupling;

  // ---- the attractor: midpoint (RK2) step of the ODE ----
  float h = uDt * uTimeScale;
  vec3 k1 = halvorsen(q);
  vec3 k2 = halvorsen(q + k1 * h * 0.5);
  q += k2 * h + (kick + current) * uDt;

  // Outside the basin of attraction the system runs away to infinity;
  // anything that gets that far (or turns NaN) is simply released again.
  if (!(dot(q, q) < uEscapeRadius * uEscapeRadius)) {
    q = aSeed.xyz;
    kick = vec3(0.0);
  }

  vPos = q;
  vVel = kick;
}
`,u=`#version 300 es
precision highp float;

layout(location = 0) in vec4 aSeed;
layout(location = 1) in vec3 aPos;
layout(location = 2) in vec3 aVel;
layout(location = 3) in vec2 aThread;

uniform mat3  uView;
uniform vec2  uCenter;      // centre in NDC
uniform vec2  uScale;       // NDC units per world unit at z = 0
uniform vec2  uResolution;
uniform float uCamDist;
uniform float uTime;
uniform float uLifetime;
uniform float uSize;        // particle diameter in device px
uniform float uSizeDepthBoost;
uniform float uOpacity;
uniform float uDepthFade;
uniform float uShimmer;
uniform float uShimmerSpeed;
uniform float uEnergyGlint;
uniform vec2  uFadeRadius;
uniform vec3  uColorBright;
uniform vec3  uColorDeep;

out vec3 vColor;
flat out vec2 vCenterPx;
flat out float vInvTwoSigma2;

void main() {
  float seed = aSeed.w;
  vec3 world = uView * aPos;
  float persp = uCamDist / max(uCamDist - world.z, 0.2);
  vec2 ndc = uCenter + world.xy * persp * uScale;
  gl_Position = vec4(ndc, 0.0, 1.0);

  float front = clamp(world.z * 0.5 + 0.5, 0.0, 1.0);

  // Sub-pixel points: below what the pixel grid resolves, get fainter, not smaller.
  float diameter = uSize * persp * (1.0 + uSizeDepthBoost * (front - 0.5)) * mix(0.8, 1.2, fract(seed * 91.17));
  float sigma = max(diameter * 0.5, 0.42);
  float coverage = min((diameter * diameter) / (4.0 * sigma * sigma), 1.0);

  // Thread ends taper; a slow pulse of light travels along each thread.
  float taper = smoothstep(0.0, 0.12, aThread.x) * smoothstep(1.0, 0.88, aThread.x);
  float wave = sin(6.2832 * (aThread.x * (1.5 + 2.0 * aThread.y) - uTime * uShimmerSpeed * (0.6 + 0.8 * aThread.y) + aThread.y * 7.0));
  float shimmer = 1.0 + uShimmer * wave;

  // Each thread fades in after release and out before the next one.
  float phase = fract(uTime / uLifetime + aThread.y);
  float life = smoothstep(0.0, 0.1, phase) * smoothstep(1.0, 0.86, phase);

  // Particles flung far from the attractor dissolve instead of streaking away.
  float stray = 1.0 - smoothstep(uFadeRadius.x, uFadeRadius.y, length(aPos));

  float depth = mix(1.0, front * front * (3.0 - 2.0 * front), uDepthFade);
  float energy = smoothstep(0.05, 1.2, length(aVel));

  vec3 color = mix(uColorDeep, uColorBright, front);
  color = mix(color, vec3(0.94, 0.97, 1.0), energy * 0.6);

  float alpha = uOpacity * coverage * taper * shimmer * depth * life * stray
    * mix(0.65, 1.35, fract(seed * 37.73)) * (1.0 + uEnergyGlint * energy);

  vColor = color * alpha;
  vCenterPx = (ndc * 0.5 + 0.5) * uResolution;
  vInvTwoSigma2 = 1.0 / (2.0 * sigma * sigma);
  gl_PointSize = ceil(sigma * 5.0) + 1.0;
}
`;function s(e){let t=e.replace("#",""),r=parseInt(3===t.length?t.replace(/./g,e=>e+e):t,16);return[(r>>16&255)/255,(r>>8&255)/255,(255&r)/255]}function d(e,t,r){let i=e.createShader(t);if(e.shaderSource(i,r),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(i);throw e.deleteShader(i),Error(`Shader compile failed: ${t}`)}return i}function c(e,t,r,i){let a=e.createProgram(),o=d(e,e.VERTEX_SHADER,t),n=d(e,e.FRAGMENT_SHADER,r);if(e.attachShader(a,o),e.attachShader(a,n),i&&e.transformFeedbackVaryings(a,i,e.INTERLEAVED_ATTRIBS),e.linkProgram(a),e.deleteShader(o),e.deleteShader(n),!e.getProgramParameter(a,e.LINK_STATUS)){let t=e.getProgramInfoLog(a);throw e.deleteProgram(a),Error(`Program link failed: ${t}`)}return a}function f(e,t,r){let i={};for(let a of r)i[a]=e.getUniformLocation(t,a);return i}function m(e,t,r,i=!1){let a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,t,r);let o=i?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0);let l=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return(e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,null),l)?{texture:a,framebuffer:n,width:t,height:r}:(e.deleteTexture(a),e.deleteFramebuffer(n),null)}function h(e,t){let r=1/Math.sqrt(3),i=[1/Math.SQRT2,-1/Math.SQRT2,0],a=[1/Math.sqrt(6),1/Math.sqrt(6),-2/Math.sqrt(6)],o=[r,r,r],n=t/e.driftPeriod*Math.PI*2,l=e.tilt+e.driftAmount*Math.sin(n),u=e.spin+.8*e.driftAmount*Math.sin(.63*n+1.3),s=Math.cos(l),d=Math.sin(l),c=Math.cos(u),f=Math.sin(u),m=[];for(let e of[0,1,2]){let t=i[e],r=a[e],n=o[e],l=c*t-f*r,u=f*t+c*r;m.push([l,s*u-d*n,d*u+s*n])}return new Float32Array([...m[0],...m[1],...m[2]])}function p(e){let t=e.offsetParent;return t instanceof HTMLElement?{width:t.clientWidth,left:t.getBoundingClientRect().left-e.getBoundingClientRect().left}:{width:e.clientWidth,left:0}}function v(e,t,r,i){let a=i?e.placement.stacked:e.placement.wide;return{cx:t*a.centerX,cy:r*a.centerY,radius:Math.max(40,Math.min(t*a.radiusByWidth,r*a.radiusByHeight))}}function g(e,t){let r=e.getContext("2d");if(!r)return null;let a=o(14e3,t,t.count.high/14e3),n=window.matchMedia(i.STACKED_LAYOUT_QUERY),[l,u,d]=s(t.colorBright).map(e=>Math.round(255*e)),c=()=>{let i=e.clientWidth,o=e.clientHeight;if(!i||!o)return;let s=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(i*s),e.height=Math.round(o*s),r.setTransform(s,0,0,s,0,0),r.fillStyle=t.background,r.fillRect(0,0,i,o);let c=p(e),f=v(t,c.width,o,n.matches),{cy:m,radius:g}=f,y=f.cx+c.left,x=h(t.view,0);for(let e=0;e<14e3;e++){let i=a[6*e],o=a[6*e+1],n=a[6*e+2],s=x[0]*i+x[3]*o+x[6]*n,c=x[1]*i+x[4]*o+x[7]*n,f=x[2]*i+x[5]*o+x[8]*n,h=t.cameraDistance/(t.cameraDistance-f),p=.5*f+.5;r.fillStyle=`rgba(${l},${u},${d},${.1+.5*p*p})`,r.fillRect(y+s*h*g,m-c*h*g,1,1)}},f=new ResizeObserver(c);return f.observe(e),c(),{dispose:()=>f.disconnect()}}e.s(["default",0,function({className:e}){let d=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=d.current;if(!e)return;let t=function(e,t){if(!function(){let e=document.createElement("canvas").getContext("webgl2");if(!e)return!1;let t=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float");return e.getExtension("WEBGL_lose_context")?.loseContext(),t}())return g(e,t);let r=e.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!r)return g(e,t);r.getExtension("EXT_color_buffer_float")||r.getExtension("EXT_color_buffer_half_float");let a=t.render,d=function(e){let t=navigator,r=window.matchMedia("(pointer: coarse)").matches,i=700>Math.min(window.innerWidth,window.innerHeight);if(r||i)return e.count.low;let a=t.hardwareConcurrency??8,o=t.deviceMemory??8;return a<=4||o<=4?e.count.medium:e.count.high}(t),y=o(d,t,t.count.high/d),x=window.matchMedia("(prefers-reduced-motion: reduce)"),b=window.matchMedia(i.STACKED_LAYOUT_QUERY),E=!1,w=0,R=!0,T=x.matches,_=d,S=1,A=0,F=0,P=1,M={cx:0,cy:0,radius:1},D=0,L=0,C=0,B=T,k=0,I=0,V=45,j={clientX:0,clientY:0,hasPosition:!1,present:!1,active:0,x:0,y:0,vx:0,vy:0,initialised:!1},N=["uTime","uDt","uSnap","uA","uCenter","uExtent","uTimeScale","uLifetime","uEscapeRadius","uView","uCamDist","uRayOrigin","uRayDir","uPointerVel","uPointerActive","uPushRadius","uPushStrength","uPushCore","uPushSpeedBoost","uPointerDrag","uPushDecay","uDisturbance","uDisturbanceExtent","uDisturbanceCoupling"],U=["uPrev","uTexel","uExtent","uDt","uTime","uPointer","uPointerVel","uPointerActive","uRadius","uInject","uLife","uSpread","uSelfAdvect","uCarry"],O=["uView","uCenter","uScale","uResolution","uCamDist","uTime","uLifetime","uSize","uSizeDepthBoost","uOpacity","uDepthFade","uShimmer","uShimmerSpeed","uEnergyGlint","uFadeRadius","uColorBright","uColorDeep"],z=["uLight","uBackground","uExposure"],W=null,G=t.disturbance,X=null,Y=0,q=null;function H(){let e=c(r,l,n.SIM_FRAG,["vPos","vVel"]),t=c(r,n.SCREEN_VERT,n.FIELD_FRAG),i=c(r,u,n.POINT_FRAG),a=Math.max(32,Math.round(G.resolution)),o=m(r,a,a,!0),s=m(r,a,a,!0);if(!o||!s)throw Error("Float render targets are not available");for(let e of[o,s])r.bindFramebuffer(r.FRAMEBUFFER,e.framebuffer),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT);r.bindFramebuffer(r.FRAMEBUFFER,null),X=[o,s],Y=0;let h=c(r,n.SCREEN_VERT,n.RESOLVE_FRAG),p=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,p),r.bufferData(r.ARRAY_BUFFER,y,r.STATIC_DRAW);let v=new Float32Array(6*d);for(let e=0;e<d;e++)v[6*e]=y[6*e],v[6*e+1]=y[6*e+1],v[6*e+2]=y[6*e+2];let g=()=>{let e=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,e),r.bufferData(r.ARRAY_BUFFER,v,r.DYNAMIC_COPY),e},x=[g(),g()],b=e=>{let t=r.createVertexArray();return r.bindVertexArray(t),r.bindBuffer(r.ARRAY_BUFFER,p),r.enableVertexAttribArray(n.ATTRIB.home),r.vertexAttribPointer(n.ATTRIB.home,4,r.FLOAT,!1,24,0),r.enableVertexAttribArray(n.ATTRIB.fiber),r.vertexAttribPointer(n.ATTRIB.fiber,2,r.FLOAT,!1,24,16),r.bindBuffer(r.ARRAY_BUFFER,e),r.enableVertexAttribArray(n.ATTRIB.pos),r.vertexAttribPointer(n.ATTRIB.pos,3,r.FLOAT,!1,24,0),r.enableVertexAttribArray(n.ATTRIB.vel),r.vertexAttribPointer(n.ATTRIB.vel,3,r.FLOAT,!1,24,12),r.bindVertexArray(null),t},E=[b(x[0]),b(x[1])];r.bindBuffer(r.ARRAY_BUFFER,null);let w=r.createTransformFeedback(),R=r.createVertexArray();return r.disable(r.DEPTH_TEST),r.blendFunc(r.ONE,r.ONE),r.clearColor(0,0,0,0),{simProgram:e,fieldProgram:t,pointProgram:i,resolveProgram:h,homeBuffer:p,stateBuffers:x,vaos:E,screenVao:R,feedback:w,sim:f(r,e,N),field:f(r,t,U),point:f(r,i,O),resolve:f(r,h,z)}}function Z(){W&&(r.deleteTexture(W.texture),r.deleteFramebuffer(W.framebuffer),W=null)}function K(){var i,a;let o=e.clientWidth,n=e.clientHeight;if(!o||!n)return;A=o,F=n;let l=Math.max(1,Math.round(o*(P=Math.min(window.devicePixelRatio||1,t.maxPixelRatio)*S))),u=Math.max(1,Math.round(n*P));(e.width!==l||e.height!==u)&&(e.width=l,e.height=u);let s=p(e);M=v(t,s.width,n,b.matches),M.cx+=s.left,i=e.width,a=e.height,(!W||W.width!==i||W.height!==a)&&(Z(),(W=m(r,i,a))||console.error("[Attractor] float render target is not available")),T&&et()}function $(e,i){if(!q)return;let a=q.sim;r.useProgram(q.simProgram),r.uniform1f(a.uTime,D),r.uniform1f(a.uDt,e),r.uniform1f(a.uSnap,+!!i),r.uniform1f(a.uA,t.system.a),r.uniform3fv(a.uCenter,t.system.center),r.uniform1f(a.uExtent,t.system.extent),r.uniform1f(a.uTimeScale,t.system.timeScale),r.uniform1f(a.uLifetime,t.seeding.lifetime),r.uniform1f(a.uEscapeRadius,t.escapeRadius),r.uniformMatrix3fv(a.uView,!1,h(t.view,D)),r.uniform1f(a.uCamDist,t.cameraDistance);let o=t.cameraDistance,n=Math.hypot(j.x,j.y,o);r.uniform3f(a.uRayOrigin,0,0,o),r.uniform3f(a.uRayDir,j.x/n,j.y/n,-o/n),r.uniform3f(a.uPointerVel,j.vx,j.vy,0),r.uniform1f(a.uPointerActive,j.active),r.uniform1f(a.uPushRadius,t.pointer.radius),r.uniform1f(a.uPushStrength,t.pointer.strength),r.uniform1f(a.uPushCore,t.pointer.core),r.uniform1f(a.uPushSpeedBoost,t.pointer.speedBoost),r.uniform1f(a.uPointerDrag,t.pointer.drag),r.uniform1f(a.uPushDecay,t.pointer.decay),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,X?X[Y].texture:null),r.uniform1i(a.uDisturbance,0),r.uniform1f(a.uDisturbanceExtent,1.6),r.uniform1f(a.uDisturbanceCoupling,G.coupling);let l=1-C;r.bindVertexArray(q.vaos[C]),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,q.feedback),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,q.stateBuffers[l]),r.enable(r.RASTERIZER_DISCARD),r.beginTransformFeedback(r.POINTS),r.drawArrays(r.POINTS,0,_),r.endTransformFeedback(),r.disable(r.RASTERIZER_DISCARD),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,null),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,null),C=l}function Q(){if(!q||!W||!A)return;let i=q.point;r.bindFramebuffer(r.FRAMEBUFFER,W.framebuffer),r.viewport(0,0,W.width,W.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.useProgram(q.pointProgram),r.uniform2f(i.uCenter,M.cx/A*2-1,1-M.cy/F*2),r.uniform2f(i.uScale,2*M.radius/A,2*M.radius/F),r.uniform2f(i.uResolution,W.width,W.height),r.uniform1f(i.uCamDist,t.cameraDistance),r.uniform1f(i.uTime,D),r.uniform1f(i.uSize,a.size*P),r.uniform1f(i.uSizeDepthBoost,a.sizeDepthBoost);let o=M.radius*P,n=t.count.high/_,l=1/(a.size*P)**2;r.uniform1f(i.uOpacity,a.opacity*(o*o/518400)*n*Math.max(l,1)),r.uniform1f(i.uDepthFade,a.depthFade),r.uniform1f(i.uShimmer,a.shimmer),r.uniform1f(i.uShimmerSpeed,a.shimmerSpeed),r.uniform1f(i.uEnergyGlint,a.energyGlint),r.uniformMatrix3fv(i.uView,!1,h(t.view,D)),r.uniform1f(i.uLifetime,t.seeding.lifetime),r.uniform2f(i.uFadeRadius,a.fadeRadius[0],a.fadeRadius[1]),r.uniform3fv(i.uColorBright,s(t.colorBright)),r.uniform3fv(i.uColorDeep,s(t.colorDeep)),r.bindVertexArray(q.vaos[C]),r.drawArrays(r.POINTS,0,_),r.disable(r.BLEND);let u=q.resolve;r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,e.width,e.height),r.useProgram(q.resolveProgram),r.bindVertexArray(q.screenVao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,W.texture),r.uniform1i(u.uLight,0),r.uniform3fv(u.uBackground,s(t.background)),r.uniform1f(u.uExposure,a.exposure),r.drawArrays(r.TRIANGLES,0,3),r.bindTexture(r.TEXTURE_2D,null),r.bindVertexArray(null)}function J(i){if(w=0,E||!q)return;let a=L?i-L:16.7;L=i;let o=Math.min(Math.max(a/1e3,1/240),1/30);D+=o,function(r){let i=j.present&&j.hasPosition?1:0;if(j.active+=(i-j.active)*(1-Math.exp(-r*t.pointer.fade)),!j.hasPosition)return;let a=e.getBoundingClientRect(),o=(j.clientX-a.left-M.cx)/M.radius,n=-(j.clientY-a.top-M.cy)/M.radius;if(!j.initialised){j.x=o,j.y=n,j.vx=0,j.vy=0,j.initialised=!0;return}let l=1-Math.exp(-(28*r)),u=j.x+(o-j.x)*l,s=j.y+(n-j.y)*l,d=1-Math.exp(-(10*r));j.vx+=((u-j.x)/r-j.vx)*d,j.vy+=((s-j.y)/r-j.vy)*d,j.x=u,j.y=s}(o),function(e){if(!q||!X)return;let t=X[Y],i=X[1-Y],a=q.field;r.bindFramebuffer(r.FRAMEBUFFER,i.framebuffer),r.viewport(0,0,i.width,i.height),r.disable(r.BLEND),r.useProgram(q.fieldProgram),r.bindVertexArray(q.screenVao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,t.texture),r.uniform1i(a.uPrev,0),r.uniform2f(a.uTexel,1/i.width,1/i.height),r.uniform1f(a.uExtent,1.6),r.uniform1f(a.uDt,e),r.uniform1f(a.uTime,D),r.uniform2f(a.uPointer,j.x,j.y),r.uniform2f(a.uPointerVel,j.vx,j.vy),r.uniform1f(a.uPointerActive,j.active),r.uniform1f(a.uRadius,G.radius),r.uniform1f(a.uInject,G.strength),r.uniform1f(a.uLife,G.life),r.uniform1f(a.uSpread,G.spread),r.uniform1f(a.uSelfAdvect,G.selfAdvection),r.uniform1f(a.uCarry,G.carry),r.drawArrays(r.TRIANGLES,0,3),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindVertexArray(null),Y=1-Y}(o),$(o,!1),Q(),function(e){if(V>0)return V--;if(I+=e,++k<75)return;let r=I/k;if(I=0,k=0,r<=t.slowFrameMs)return;let i=Math.min(window.devicePixelRatio||1,t.maxPixelRatio);i*S>1.3?(S=Math.max(1.25/i,.75*S),K()):_>t.minCount&&(_=Math.max(t.minCount,Math.floor(.65*_))),V=30}(a),ee()}function ee(){w||E||T||!R||document.hidden||!q||(w=requestAnimationFrame(J))}function et(){w||E||!q||(w=requestAnimationFrame(()=>{w=0,!E&&q&&(B&&($(0,!0),B=!1),Q())}))}let er=e=>{j.clientX=e.clientX,j.clientY=e.clientY,j.hasPosition=!0,j.present||(j.initialised=!1),j.present=!0},ei=()=>{j.present=!1},ea=e=>{"mouse"!==e.pointerType&&(j.present=!1)},eo=()=>{L=0,ee()},en=()=>{T=x.matches,L=0,T?(B=!0,et()):ee()},el=e=>{e.preventDefault(),cancelAnimationFrame(w),w=0,q=null,W=null,X=null},eu=()=>{try{q=H()}catch(e){console.error("[Attractor]",e);return}C=0,L=0,B=T,K(),ee()};try{q=H()}catch(e){return console.error("[Attractor]",e),null}let es=new ResizeObserver(K);es.observe(e);let ed=new IntersectionObserver(([e])=>{R=e.isIntersecting,L=0,ee()});return ed.observe(e),window.addEventListener("pointermove",er,{passive:!0}),window.addEventListener("pointerdown",er,{passive:!0}),window.addEventListener("pointerup",ea,{passive:!0}),window.addEventListener("pointercancel",ea,{passive:!0}),window.addEventListener("blur",ei),document.documentElement.addEventListener("pointerleave",ei),document.addEventListener("visibilitychange",eo),x.addEventListener("change",en),b.addEventListener("change",K),e.addEventListener("webglcontextlost",el),e.addEventListener("webglcontextrestored",eu),K(),T?et():ee(),{dispose(){if(E=!0,cancelAnimationFrame(w),es.disconnect(),ed.disconnect(),window.removeEventListener("pointermove",er),window.removeEventListener("pointerdown",er),window.removeEventListener("pointerup",ea),window.removeEventListener("pointercancel",ea),window.removeEventListener("blur",ei),document.documentElement.removeEventListener("pointerleave",ei),document.removeEventListener("visibilitychange",eo),x.removeEventListener("change",en),b.removeEventListener("change",K),e.removeEventListener("webglcontextlost",el),e.removeEventListener("webglcontextrestored",eu),q){if(r.deleteProgram(q.simProgram),r.deleteProgram(q.fieldProgram),r.deleteProgram(q.pointProgram),X){for(let e of X)r.deleteTexture(e.texture),r.deleteFramebuffer(e.framebuffer);X=null}r.deleteProgram(q.resolveProgram),r.deleteVertexArray(q.screenVao),r.deleteBuffer(q.homeBuffer),q.stateBuffers.forEach(e=>r.deleteBuffer(e)),q.vaos.forEach(e=>r.deleteVertexArray(e)),r.deleteTransformFeedback(q.feedback),q=null,Z()}}}}(e,a);return()=>t?.dispose()},[]),(0,t.jsx)("canvas",{ref:d,className:e,"aria-hidden":"true"})}],63736)},49357,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(21168);function a(e,t,r=1){let i,o=(i=0x1352900,()=>{let e=i=i+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}),n=()=>Math.sqrt(-2*Math.log(Math.max(o(),1e-7)))*Math.cos(2*Math.PI*o()),l=new Float32Array(6*e),u=[0,0,0],s=t.fieldScale,d=t.fieldDetail,c=[0,0,0],f=(e,t,r,i,a,o)=>{let n=e*i+1.3+o,l=t*i*1.1+.4+2*o,u=t*i+2.1+3*o,s=r*i*1.2+1.7+o,d=r*i+.6+2*o,f=e*i*.9+2.9+3*o;c[0]+=a*(Math.cos(n)*Math.cos(l)-.9*Math.sin(d)*Math.sin(f)),c[1]+=a*(Math.cos(u)*Math.cos(s)-1.1*Math.sin(n)*Math.sin(l)),c[2]+=a*(Math.cos(d)*Math.cos(f)-1.2*Math.sin(u)*Math.sin(s))},m=(e,r,i)=>{let a=t.fieldCirculation;c[0]=.26*a,c[1]=.93*a,c[2]=-.26*a,f(e,r,i,s,1,0),f(e,r,i,2.3*s,d,1.9);let o=Math.sqrt(e*e+r*r+i*i)||1,n=e/o,l=r/o,m=i/o,h=l*c[2]-m*c[1],p=m*c[0]-n*c[2],v=n*c[1]-l*c[0],g=t.radialDrift*Math.sin(e*s*.7+r*s*.9+1.1)*Math.max(1-o,0),y=Math.sqrt((h+=g*n)*h+(p+=g*l)*p+(v+=g*m)*v)||1;u[0]=h/y,u[1]=p/y,u[2]=v/y},h=t.threadSpacing*r,[p,v]=t.threadLength,g=0;for(;g<e;){let r=2*o()-1,i=o()*Math.PI*2,a=Math.sqrt(1-r*r),s=t.innerRadius+(1-t.innerRadius)*Math.pow(o(),t.radialBias);o()<t.escapeFraction&&(s=.9+Math.abs(n())*t.escapeSpread);let d=a*Math.cos(i)*(s=Math.min(s,1.32)),c=r*s,f=a*Math.sin(i)*s;for(let r=0;r<t.threadsPerBundle&&g<e;r++){let r=d+n()*t.bundleSpread,i=c+n()*t.bundleSpread,a=f+n()*t.bundleSpread,s=o(),y=Math.min(Math.max((Math.sqrt(r*r+i*i+a*a)-.82)/.3,0),1),x=1-.5*y,b=1+t.edgeLooseness*y,E=Math.min(Math.max(8,Math.round((p+(v-p)*o())*x/h)),e-g);for(let e=0;e<E;e++){m(r,i,a),m(r+u[0]*h*.5,i+u[1]*h*.5,a+u[2]*h*.5),r+=u[0]*h,i+=u[1]*h,a+=u[2]*h;let d=o(),c=d<t.dustFraction?t.dustSpread:d<t.dustFraction+t.veilFraction?t.veilWidth:t.threadWidth,f=6*g;l[f]=r+n()*c*b,l[f+1]=i+n()*c*b,l[f+2]=a+n()*c*b,l[f+3]=o(),l[f+4]=E>1?e/(E-1):.5,l[f+5]=s,g++}}}return l}var o=e.i(34133);function n(e){let t=e.replace("#",""),r=parseInt(3===t.length?t.replace(/./g,e=>e+e):t,16);return[(r>>16&255)/255,(r>>8&255)/255,(255&r)/255]}function l(e,t,r){let i=e.createShader(t);if(e.shaderSource(i,r),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(i);throw e.deleteShader(i),Error(`Shader compile failed: ${t}`)}return i}function u(e,t,r,i){let a=e.createProgram(),o=l(e,e.VERTEX_SHADER,t),n=l(e,e.FRAGMENT_SHADER,r);if(e.attachShader(a,o),e.attachShader(a,n),i&&e.transformFeedbackVaryings(a,i,e.INTERLEAVED_ATTRIBS),e.linkProgram(a),e.deleteShader(o),e.deleteShader(n),!e.getProgramParameter(a,e.LINK_STATUS)){let t=e.getProgramInfoLog(a);throw e.deleteProgram(a),Error(`Program link failed: ${t}`)}return a}function s(e,t,r){let i={};for(let a of r)i[a]=e.getUniformLocation(t,a);return i}function d(e,t,r,i=!1){let a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,t,r);let o=i?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0);let l=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return(e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,null),l)?{texture:a,framebuffer:n,width:t,height:r}:(e.deleteTexture(a),e.deleteFramebuffer(n),null)}function c(e){let t=e.offsetParent;return t instanceof HTMLElement?{width:t.clientWidth,left:t.getBoundingClientRect().left-e.getBoundingClientRect().left}:{width:e.clientWidth,left:0}}function f(e,t,r,i){let a=i?e.placement.stacked:e.placement.wide;return{cx:t*a.centerX,cy:r*a.centerY,radius:Math.max(40,Math.min(t*a.radiusByWidth,r*a.radiusByHeight))}}function m(e,t){let r=e.getContext("2d");if(!r)return null;let o=a(14e3,t.shape,t.count.high/14e3),l=window.matchMedia(i.STACKED_LAYOUT_QUERY),[u,s,d]=n(t.colorBright).map(e=>Math.round(255*e)),m=()=>{let i=e.clientWidth,a=e.clientHeight;if(!i||!a)return;let n=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(i*n),e.height=Math.round(a*n),r.setTransform(n,0,0,n,0,0),r.fillStyle=t.background,r.fillRect(0,0,i,a);let m=c(e),h=f(t,m.width,a,l.matches),{cy:p,radius:v}=h,g=h.cx+m.left;for(let e=0;e<14e3;e++){let i=o[6*e],a=o[6*e+1],n=o[6*e+2],l=t.cameraDistance/(t.cameraDistance-n),c=.5*n+.5;r.fillStyle=`rgba(${u},${s},${d},${.1+.5*c*c})`,r.fillRect(g+i*l*v,p-a*l*v,1,1)}},h=new ResizeObserver(m);return h.observe(e),m(),{dispose:()=>h.disconnect()}}e.s(["default",0,function({className:e}){let l=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=l.current;if(!e)return;let t=function(e,t){if(!function(){let e=document.createElement("canvas").getContext("webgl2");if(!e)return!1;let t=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float");return e.getExtension("WEBGL_lose_context")?.loseContext(),t}())return m(e,t);let r=e.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!r)return m(e,t);r.getExtension("EXT_color_buffer_float")||r.getExtension("EXT_color_buffer_half_float");let l=t.render,h=function(e){let t=navigator,r=window.matchMedia("(pointer: coarse)").matches,i=700>Math.min(window.innerWidth,window.innerHeight);if(r||i)return e.count.low;let a=t.hardwareConcurrency??8,o=t.deviceMemory??8;return a<=4||o<=4?e.count.medium:e.count.high}(t),p=a(h,t.shape,t.count.high/h),v=window.matchMedia("(prefers-reduced-motion: reduce)"),g=window.matchMedia(i.STACKED_LAYOUT_QUERY),y=!1,x=0,b=!0,E=v.matches,w=h,R=1,T=0,_=0,S=1,A={cx:0,cy:0,radius:1},F=0,P=0,M=0,D=E,L=0,C=0,B=45,k={clientX:0,clientY:0,hasPosition:!1,present:!1,active:0,x:0,y:0,vx:0,vy:0,initialised:!1},I=["uTime","uDt","uSnap","uRotSpeed","uRotShear","uTilt","uFlowAmp","uFlowScale","uFlowSpeed","uRayOrigin","uRayDir","uPointerVel","uPointerActive","uRepRadius","uRepStrength","uRepCore","uRepSpeedBoost","uPointerDrag","uPointerSwirl","uStiffness","uDamping","uStreamPeriod","uStreamTravel","uDisturbance","uDisturbanceExtent","uDisturbanceCoupling","uCamDist","uFieldScale","uFieldDetail","uFieldCirculation","uRadialDrift"],V=["uPrev","uTexel","uExtent","uDt","uTime","uPointer","uPointerVel","uPointerActive","uRadius","uInject","uLife","uSpread","uSelfAdvect","uCarry"],j=["uCenter","uScale","uResolution","uCamDist","uTime","uSize","uSizeDepthBoost","uOpacity","uDepthFade","uShimmer","uShimmerSpeed","uEnergyGlint","uStreamPeriod","uEdgeStart","uEdgeEnd","uEdgeVariation","uColorBright","uColorDeep"],N=["uLight","uBackground","uExposure"],U=null,O=t.disturbance,z=null,W=0,G=null;function X(){let e=u(r,o.SIM_VERT,o.SIM_FRAG,["vPos","vVel"]),i=u(r,o.SCREEN_VERT,o.FIELD_FRAG),a=u(r,o.POINT_VERT,o.POINT_FRAG),n=Math.max(32,Math.round(O.resolution)),l=d(r,n,n,!0),c=d(r,n,n,!0);if(!l||!c)throw Error("Float render targets are not available");for(let e of[l,c])r.bindFramebuffer(r.FRAMEBUFFER,e.framebuffer),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT);r.bindFramebuffer(r.FRAMEBUFFER,null),z=[l,c],W=0;let f=u(r,o.SCREEN_VERT,o.RESOLVE_FRAG),m=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,m),r.bufferData(r.ARRAY_BUFFER,p,r.STATIC_DRAW);let v=new Float32Array(6*h),g=Math.cos(t.tilt),y=Math.sin(t.tilt);for(let e=0;e<h;e++){let t=6*e,r=1.06+.16*p[t+3],i=p[t]*r,a=p[t+1]*r;v[6*e]=g*i-y*a,v[6*e+1]=y*i+g*a,v[6*e+2]=p[t+2]*r}let x=()=>{let e=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,e),r.bufferData(r.ARRAY_BUFFER,v,r.DYNAMIC_COPY),e},b=[x(),x()],E=e=>{let t=r.createVertexArray();return r.bindVertexArray(t),r.bindBuffer(r.ARRAY_BUFFER,m),r.enableVertexAttribArray(o.ATTRIB.home),r.vertexAttribPointer(o.ATTRIB.home,4,r.FLOAT,!1,24,0),r.enableVertexAttribArray(o.ATTRIB.fiber),r.vertexAttribPointer(o.ATTRIB.fiber,2,r.FLOAT,!1,24,16),r.bindBuffer(r.ARRAY_BUFFER,e),r.enableVertexAttribArray(o.ATTRIB.pos),r.vertexAttribPointer(o.ATTRIB.pos,3,r.FLOAT,!1,24,0),r.enableVertexAttribArray(o.ATTRIB.vel),r.vertexAttribPointer(o.ATTRIB.vel,3,r.FLOAT,!1,24,12),r.bindVertexArray(null),t},w=[E(b[0]),E(b[1])];r.bindBuffer(r.ARRAY_BUFFER,null);let R=r.createTransformFeedback(),T=r.createVertexArray();return r.disable(r.DEPTH_TEST),r.blendFunc(r.ONE,r.ONE),r.clearColor(0,0,0,0),{simProgram:e,fieldProgram:i,pointProgram:a,resolveProgram:f,homeBuffer:m,stateBuffers:b,vaos:w,screenVao:T,feedback:R,sim:s(r,e,I),field:s(r,i,V),point:s(r,a,j),resolve:s(r,f,N)}}function Y(){U&&(r.deleteTexture(U.texture),r.deleteFramebuffer(U.framebuffer),U=null)}function q(){var i,a;let o=e.clientWidth,n=e.clientHeight;if(!o||!n)return;T=o,_=n;let l=Math.max(1,Math.round(o*(S=Math.min(window.devicePixelRatio||1,t.maxPixelRatio)*R))),u=Math.max(1,Math.round(n*S));(e.width!==l||e.height!==u)&&(e.width=l,e.height=u);let s=c(e);A=f(t,s.width,n,g.matches),A.cx+=s.left,i=e.width,a=e.height,(!U||U.width!==i||U.height!==a)&&(Y(),(U=d(r,i,a))||console.error("[ParticleSphere] float render target is not available")),E&&Q()}function H(e,i){if(!G)return;let a=G.sim;r.useProgram(G.simProgram),r.uniform1f(a.uTime,F),r.uniform1f(a.uDt,e),r.uniform1f(a.uSnap,+!!i),r.uniform1f(a.uRotSpeed,t.rotationSpeed),r.uniform1f(a.uRotShear,t.rotationShear),r.uniform1f(a.uTilt,t.tilt),r.uniform1f(a.uFlowAmp,t.flowIntensity),r.uniform1f(a.uFlowScale,t.flowScale),r.uniform1f(a.uFlowSpeed,t.flowSpeed);let o=t.cameraDistance,n=Math.hypot(k.x,k.y,o);r.uniform3f(a.uRayOrigin,0,0,o),r.uniform3f(a.uRayDir,k.x/n,k.y/n,-o/n),r.uniform3f(a.uPointerVel,k.vx,k.vy,0),r.uniform1f(a.uPointerActive,k.active),r.uniform1f(a.uRepRadius,t.repulsionRadius),r.uniform1f(a.uRepStrength,t.repulsionStrength),r.uniform1f(a.uRepCore,t.repulsionCore),r.uniform1f(a.uPointerSwirl,t.pointerSwirl),r.uniform1f(a.uRepSpeedBoost,t.repulsionSpeedBoost),r.uniform1f(a.uPointerDrag,t.pointerDrag),r.uniform1f(a.uStiffness,t.springStiffness),r.uniform1f(a.uDamping,t.damping),r.uniform1f(a.uStreamPeriod,t.streamPeriod),r.uniform1f(a.uStreamTravel,t.streamTravel),r.uniform1f(a.uCamDist,t.cameraDistance),r.uniform1f(a.uFieldScale,t.shape.fieldScale),r.uniform1f(a.uFieldDetail,t.shape.fieldDetail),r.uniform1f(a.uFieldCirculation,t.shape.fieldCirculation),r.uniform1f(a.uRadialDrift,t.shape.radialDrift),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,z?z[W].texture:null),r.uniform1i(a.uDisturbance,0),r.uniform1f(a.uDisturbanceExtent,1.6),r.uniform1f(a.uDisturbanceCoupling,O.coupling);let l=1-M;r.bindVertexArray(G.vaos[M]),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,G.feedback),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,G.stateBuffers[l]),r.enable(r.RASTERIZER_DISCARD),r.beginTransformFeedback(r.POINTS),r.drawArrays(r.POINTS,0,w),r.endTransformFeedback(),r.disable(r.RASTERIZER_DISCARD),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,null),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,null),M=l}function Z(){if(!G||!U||!T)return;let i=G.point;r.bindFramebuffer(r.FRAMEBUFFER,U.framebuffer),r.viewport(0,0,U.width,U.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.useProgram(G.pointProgram),r.uniform2f(i.uCenter,A.cx/T*2-1,1-A.cy/_*2),r.uniform2f(i.uScale,2*A.radius/T,2*A.radius/_),r.uniform2f(i.uResolution,U.width,U.height),r.uniform1f(i.uCamDist,t.cameraDistance),r.uniform1f(i.uTime,F),r.uniform1f(i.uSize,l.size*S),r.uniform1f(i.uSizeDepthBoost,l.sizeDepthBoost);let a=A.radius*S,o=t.count.high/w,u=1/(l.size*S)**2;r.uniform1f(i.uOpacity,l.opacity*(a*a/518400)*o*Math.max(u,1)),r.uniform1f(i.uDepthFade,l.depthFade),r.uniform1f(i.uShimmer,l.shimmer),r.uniform1f(i.uShimmerSpeed,l.shimmerSpeed),r.uniform1f(i.uEnergyGlint,l.energyGlint),r.uniform1f(i.uStreamPeriod,t.streamPeriod),r.uniform1f(i.uEdgeStart,t.edge.fadeStart),r.uniform1f(i.uEdgeEnd,t.edge.fadeEnd),r.uniform1f(i.uEdgeVariation,t.edge.fadeVariation),r.uniform3fv(i.uColorBright,n(t.colorBright)),r.uniform3fv(i.uColorDeep,n(t.colorDeep)),r.bindVertexArray(G.vaos[M]),r.drawArrays(r.POINTS,0,w),r.disable(r.BLEND);let s=G.resolve;r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,e.width,e.height),r.useProgram(G.resolveProgram),r.bindVertexArray(G.screenVao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,U.texture),r.uniform1i(s.uLight,0),r.uniform3fv(s.uBackground,n(t.background)),r.uniform1f(s.uExposure,l.exposure),r.drawArrays(r.TRIANGLES,0,3),r.bindTexture(r.TEXTURE_2D,null),r.bindVertexArray(null)}function K(i){if(x=0,y||!G)return;let a=P?i-P:16.7;P=i;let o=Math.min(Math.max(a/1e3,1/240),1/30);F+=o,function(r){let i=k.present&&k.hasPosition?1:0;if(k.active+=(i-k.active)*(1-Math.exp(-r*t.pointerFade)),!k.hasPosition)return;let a=e.getBoundingClientRect(),o=(k.clientX-a.left-A.cx)/A.radius,n=-(k.clientY-a.top-A.cy)/A.radius;if(!k.initialised){k.x=o,k.y=n,k.vx=0,k.vy=0,k.initialised=!0;return}let l=1-Math.exp(-(28*r)),u=k.x+(o-k.x)*l,s=k.y+(n-k.y)*l,d=1-Math.exp(-(10*r));k.vx+=((u-k.x)/r-k.vx)*d,k.vy+=((s-k.y)/r-k.vy)*d,k.x=u,k.y=s}(o),function(e){if(!G||!z)return;let t=z[W],i=z[1-W],a=G.field;r.bindFramebuffer(r.FRAMEBUFFER,i.framebuffer),r.viewport(0,0,i.width,i.height),r.disable(r.BLEND),r.useProgram(G.fieldProgram),r.bindVertexArray(G.screenVao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,t.texture),r.uniform1i(a.uPrev,0),r.uniform2f(a.uTexel,1/i.width,1/i.height),r.uniform1f(a.uExtent,1.6),r.uniform1f(a.uDt,e),r.uniform1f(a.uTime,F),r.uniform2f(a.uPointer,k.x,k.y),r.uniform2f(a.uPointerVel,k.vx,k.vy),r.uniform1f(a.uPointerActive,k.active),r.uniform1f(a.uRadius,O.radius),r.uniform1f(a.uInject,O.strength),r.uniform1f(a.uLife,O.life),r.uniform1f(a.uSpread,O.spread),r.uniform1f(a.uSelfAdvect,O.selfAdvection),r.uniform1f(a.uCarry,O.carry),r.drawArrays(r.TRIANGLES,0,3),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindVertexArray(null),W=1-W}(o),H(o,!1),Z(),function(e){if(B>0)return B--;if(C+=e,++L<75)return;let r=C/L;if(C=0,L=0,r<=t.slowFrameMs)return;let i=Math.min(window.devicePixelRatio||1,t.maxPixelRatio);i*R>1.3?(R=Math.max(1.25/i,.75*R),q()):w>t.minCount&&(w=Math.max(t.minCount,Math.floor(.65*w))),B=30}(a),$()}function $(){x||y||E||!b||document.hidden||!G||(x=requestAnimationFrame(K))}function Q(){x||y||!G||(x=requestAnimationFrame(()=>{x=0,!y&&G&&(D&&(H(0,!0),D=!1),Z())}))}let J=e=>{k.clientX=e.clientX,k.clientY=e.clientY,k.hasPosition=!0,k.present||(k.initialised=!1),k.present=!0},ee=()=>{k.present=!1},et=e=>{"mouse"!==e.pointerType&&(k.present=!1)},er=()=>{P=0,$()},ei=()=>{E=v.matches,P=0,E?(D=!0,Q()):$()},ea=e=>{e.preventDefault(),cancelAnimationFrame(x),x=0,G=null,U=null,z=null},eo=()=>{try{G=X()}catch(e){console.error("[ParticleSphere]",e);return}M=0,P=0,D=E,q(),$()};try{G=X()}catch(e){return console.error("[ParticleSphere]",e),null}let en=new ResizeObserver(q);en.observe(e);let el=new IntersectionObserver(([e])=>{b=e.isIntersecting,P=0,$()});return el.observe(e),window.addEventListener("pointermove",J,{passive:!0}),window.addEventListener("pointerdown",J,{passive:!0}),window.addEventListener("pointerup",et,{passive:!0}),window.addEventListener("pointercancel",et,{passive:!0}),window.addEventListener("blur",ee),document.documentElement.addEventListener("pointerleave",ee),document.addEventListener("visibilitychange",er),v.addEventListener("change",ei),g.addEventListener("change",q),e.addEventListener("webglcontextlost",ea),e.addEventListener("webglcontextrestored",eo),q(),E?Q():$(),{dispose(){if(y=!0,cancelAnimationFrame(x),en.disconnect(),el.disconnect(),window.removeEventListener("pointermove",J),window.removeEventListener("pointerdown",J),window.removeEventListener("pointerup",et),window.removeEventListener("pointercancel",et),window.removeEventListener("blur",ee),document.documentElement.removeEventListener("pointerleave",ee),document.removeEventListener("visibilitychange",er),v.removeEventListener("change",ei),g.removeEventListener("change",q),e.removeEventListener("webglcontextlost",ea),e.removeEventListener("webglcontextrestored",eo),G){if(r.deleteProgram(G.simProgram),r.deleteProgram(G.fieldProgram),r.deleteProgram(G.pointProgram),z){for(let e of z)r.deleteTexture(e.texture),r.deleteFramebuffer(e.framebuffer);z=null}r.deleteProgram(G.resolveProgram),r.deleteVertexArray(G.screenVao),r.deleteBuffer(G.homeBuffer),G.stateBuffers.forEach(e=>r.deleteBuffer(e)),G.vaos.forEach(e=>r.deleteVertexArray(e)),r.deleteTransformFeedback(G.feedback),G=null,Y()}}}}(e,i.particleConfig);return()=>t?.dispose()},[]),(0,t.jsx)("canvas",{ref:l,className:e,"aria-hidden":"true"})}],49357)},92645,e=>{e.v({layer:"hero-reveal-module__ZZVcyW__layer",panel:"hero-reveal-module__ZZVcyW__panel",pin:"hero-reveal-module__ZZVcyW__pin",root:"hero-reveal-module__ZZVcyW__root",shade:"hero-reveal-module__ZZVcyW__shade",track:"hero-reveal-module__ZZVcyW__track",under:"hero-reveal-module__ZZVcyW__under",underLayer:"hero-reveal-module__ZZVcyW__underLayer",underShade:"hero-reveal-module__ZZVcyW__underShade"})},70366,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(92645);e.s(["default",0,function({hero:e,children:a,after:o,afterId:n}){let l=(0,r.useRef)(null),u=(0,r.useRef)(null),s=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=l.current,t=u.current;if(!e||!t)return;let r=0,i=-1,a=-1,o=()=>{r=0;let o=window.innerHeight||1,{top:n,bottom:l}=t.getBoundingClientRect(),u=Math.min(1,Math.max(0,1-n/o));Math.abs(u-i)>=5e-4&&(i=u,e.style.setProperty("--reveal",u.toFixed(4)));let d=Math.min(1,Math.max(0,1-l/o));Math.abs(d-a)>=5e-4&&(a=d,e.style.setProperty("--exit",d.toFixed(4)));let c=s.current;c&&(c.toggleAttribute("data-held",c.offsetHeight<=o),c.toggleAttribute("data-waiting",l>=o))},n=()=>{r||(r=requestAnimationFrame(o))};return o(),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),()=>{cancelAnimationFrame(r),window.removeEventListener("scroll",n),window.removeEventListener("resize",n)}},[]),(0,t.jsxs)("div",{ref:l,className:i.default.root,children:[(0,t.jsx)("div",{className:i.default.track,children:(0,t.jsxs)("div",{className:i.default.pin,children:[(0,t.jsx)("div",{className:i.default.layer,children:e}),(0,t.jsx)("div",{className:i.default.shade,"aria-hidden":"true"})]})}),(0,t.jsx)("div",{ref:u,className:i.default.panel,children:a}),o?(0,t.jsxs)(t.Fragment,{children:[n?(0,t.jsx)("div",{id:n,"aria-hidden":"true"}):null,(0,t.jsxs)("div",{ref:s,className:i.default.under,children:[(0,t.jsx)("div",{className:i.default.underLayer,children:o}),(0,t.jsx)("div",{className:i.default.underShade,"aria-hidden":"true"})]})]}):null]})}])},71158,e=>{e.v({article:"projects-module__MILkoW__article",body:"projects-module__MILkoW__body",detail:"projects-module__MILkoW__detail","detail-in":"projects-module__MILkoW__detail-in",frame:"projects-module__MILkoW__frame",grid:"projects-module__MILkoW__grid",inner:"projects-module__MILkoW__inner",label:"projects-module__MILkoW__label",layout:"projects-module__MILkoW__layout",link:"projects-module__MILkoW__link",links:"projects-module__MILkoW__links",media:"projects-module__MILkoW__media",page:"projects-module__MILkoW__page",pager:"projects-module__MILkoW__pager",projects:"projects-module__MILkoW__projects",stage:"projects-module__MILkoW__stage",tech:"projects-module__MILkoW__tech",thumb:"projects-module__MILkoW__thumb",tile:"projects-module__MILkoW__tile",tileTitle:"projects-module__MILkoW__tileTitle",title:"projects-module__MILkoW__title",year:"projects-module__MILkoW__year"})},75998,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(21168);let a=[{year:"2026",tech:["Swift","MLX","MCP"],thumbSrc:"/amai-thumb.svg",thumbAlt:"Amai wordmark",gallery:[{src:"/amai-promo.mp4",alt:"Amai promo video",width:1280,height:720,kind:"video",posterSrc:"/amai-promo-poster.webp"}],links:[{label:"GitHub",href:"https://github.com/Penrose0v0/Amai"}],i18n:{zh:{title:"Amai：环境式个人 AI",summary:"在后台记下你在电脑上做的事，整理成每日时间线和长期记忆：纯 Markdown，保存在本机，AI Agent 也能读取。",description:"Amai 是一款 macOS 菜单栏应用。它定期截取屏幕，用本机运行的视觉模型（MLX 上的 Gemma）结合 OCR 理解正在做的事，整理成每日时间线，并在夜间更新综合、工作、健康、财务、目标五个领域的长期记忆。截图不会离开电脑，记忆以纯 Markdown 文件保存，每一条都能追溯到来源日期；内置的只读 MCP 服务器让 Claude 等 AI Agent 在授权范围内检索这些记忆。"},ja:{title:"Amai：アンビエントなパーソナル AI",summary:"パソコンでの作業をバックグラウンドで記録し、日々のタイムラインと長期記憶に整理。記憶は手元のプレーンな Markdown で、AI エージェントからも参照できます。",description:"Amai は macOS のメニューバーアプリです。定期的に画面を撮影し、ローカルで動くビジョンモデル（MLX 上の Gemma）と OCR で作業内容を理解してタイムラインにまとめ、夜間に総合・仕事・健康・財務・目標の 5 分野の長期記憶を更新します。スクリーンショットはパソコンの外に出ず、記憶はプレーンな Markdown ファイルとして保存され、各項目から元の日付にさかのぼれます。同梱の読み取り専用 MCP サーバーにより、Claude などのエージェントが許可した範囲で記憶を検索できます。"},en:{title:"Amai: Ambient Personal AI",summary:"Quietly notes what you do on your computer and turns it into a daily timeline and long-term memory: plain Markdown, on your device, ready for your AI agents.",description:"Amai is a macOS menu bar app. It captures the screen periodically, understands the activity with OCR and a vision model running on the device (Gemma on MLX), and writes it into a daily timeline; overnight it updates long-term memory across five areas: general, work, health, finance and goals. Screenshots never leave the computer, memory is kept as plain Markdown files with every entry traceable to the day it came from, and a bundled read-only MCP server lets agents such as Claude search that memory within the scope you allow."}}},{year:"2024",tech:["Ruby","LLM","Web"],thumbSrc:"/llm-web-game-screenshot.png",thumbAlt:"LLM web game screenshot",gallery:[{src:"/llm-web-game-demo.mp4",alt:"LLM web game demo video",width:1152,height:720,kind:"video",posterSrc:"/llm-web-game-demo-poster.jpg"}],i18n:{zh:{title:"融合 LLM 的回合制网页游戏",summary:"基于 Ruby 开发的、融合大语言模型交互体验的回合制网页游戏。",description:"我围绕“语言模型如何增强玩家交互体验”这一方向，设计并实现了一款极简主义网页游戏。项目以宝可梦式回合制玩法为基础，将 LLM 融入游戏流程与反馈机制中，让原本简单的对战过程具备更强的故事性与叙事感。这个项目更像是一次关于叙事、交互与系统实现的综合实验，而不仅仅是为游戏接入一个模型接口。"},ja:{title:"LLM を融合したターン制バトル Web ゲーム",summary:"Ruby で開発した、LLM による対話体験を取り入れたターン制 Web ゲーム。",description:"『言語モデルがプレイヤーのインタラクション体験をどう拡張できるか』をテーマに、ミニマルな Web ゲームを設計・実装しました。ゲームはポケモン風のターン制バトルをベースにしており、LLM を進行やフィードバック機構に組み込むことで、シンプルな対戦に物語性と叙事性を持たせています。このプロジェクトは、単にゲームへモデルを接続するのではなく、物語・インタラクション・システム実装をまとめて検証した総合的な実験です。"},en:{title:"LLM-Enhanced turn-based Web Game",summary:"A turn-based web game built in Ruby that integrates LLM-driven interaction into the player experience.",description:"This project explored how language models could enrich the player's interactive experience. I designed and implemented a minimalist web game built around Pokémon-style turn-based gameplay, then integrated an LLM into the game flow and feedback loop so that a simple battle system could carry stronger narrative and storytelling qualities. The result was less about attaching a model to a game and more about a combined experiment in narrative, interaction, and system design."}}},{year:"2023",tech:["PHP","SQL","Web"],thumbSrc:"/campus-map-social-app.png",thumbAlt:"Campus map social app screenshot",gallery:[{src:"/campus-map-social-app.png",alt:"Campus map social app screenshot",width:1730,height:1082}],i18n:{zh:{title:"校园地图社交 Web 应用",summary:"面向校园场景的社交 Web 应用，支持围绕地图位置进行留言与发布。",description:"我使用 PHP 与 SQL 搭建了一个以大学地图为核心的社交 Web 应用，让用户能够围绕具体地点发布内容、留下评论并共享校园周边信息。重点在于把地理语境和轻量社交交互自然结合起来。"},ja:{title:"キャンパスマップ連動型ソーシャル Web アプリ",summary:"大学マップ上の場所に紐づけて投稿やコメントができるソーシャル Web アプリ。",description:"PHP と SQL を用いて、大学キャンパスの地図を中心にしたソーシャル Web アプリケーションを開発しました。ユーザーが場所ごとに投稿やコメントを残せるようにし、地理情報と軽量なコミュニティ体験を自然につなぐことを重視しました。"},en:{title:"Campus Map Social Web App",summary:"A social web application that let users post and comment around locations on a university map.",description:"Built with PHP and SQL, this project centered on a campus map where users could leave posts and comments tied to specific locations. The main goal was to connect lightweight social interaction with spatial context in a way that felt practical and intuitive for everyday campus use."}}},{year:"2023",tech:["Python","PyTorch"],thumbSrc:"/semg-architecture.png",thumbAlt:"sEMG model architecture diagram",gallery:[{src:"/semg-architecture.png",alt:"sEMG model architecture diagram",width:2116,height:508}],i18n:{zh:{title:"基于深度学习的 sEMG 手势识别模型",summary:"基于深度学习的 sEMG 手势识别模型，面向肌电信号驱动的人机交互研究。",description:"这个项目聚焦于使用针对时序列的深度学习方法处理表面肌电（sEMG）信号，并完成手势识别模型的设计与实现，为更自然的人机接口提供技术基础。"},ja:{title:"深層学習ベースの sEMG ジェスチャー認識モデル",summary:"筋電信号駆動のヒューマンコンピュータインタラクション研究に向けた、深層学習ベースの sEMG ジェスチャー認識モデル。",description:"このプロジェクトでは、時系列向けの深層学習手法を用いて表面筋電（sEMG）信号を処理し、ジェスチャー認識モデルの設計と実装を行いました。より自然なヒューマンコンピュータインタフェースを実現するための技術基盤を目指したものです。"},en:{title:"Deep Learning sEMG Gesture Recognition Model",summary:"A deep-learning-based sEMG gesture recognition model aimed at EMG-driven human-computer interaction research.",description:"This project focused on processing surface electromyography (sEMG) signals with deep learning methods designed for time-series data, and on building a gesture recognition model from that pipeline. The goal was to provide a technical foundation for more natural human-computer interfaces."}}},{year:"2022",tech:["Raspberry Pi","MediaPipe","Fusion360"],thumbSrc:"/ar-ui-demo-poster-v2.jpg",thumbAlt:"First frame of the AR glasses demo video",gallery:[{src:"/ar-ui-demo.mp4",alt:"Gesture-driven AR glasses demo video",width:640,height:480,kind:"video",posterSrc:"/ar-ui-demo-poster.jpg"},{src:"/ar-ui-sketch.png",alt:"AR glasses structural sketch",width:475,height:272},{src:"/ar-ui-prototype.png",alt:"AR glasses prototype photo",width:1238,height:596}],i18n:{zh:{title:"手势驱动的 AR 眼镜原型",summary:"在 Raspberry Pi 上实现基于手势识别的交互界面，并完成 AR 眼镜原型制作。",description:"在 Raspberry Pi 上结合 MediaPipe 构建了一个由手势识别驱动的 UI 原型，并基于此制作了一套利用分光棱镜实现显示叠加的 AR 眼镜系统。项目重点不仅在于完成手势识别本身，也在于探索更自然、低负担的无接触式交互方式。"},ja:{title:"ジェスチャー駆動型 AR グラス試作機",summary:"Raspberry Pi 上でジェスチャー認識ベースの UI を実装し、AR グラスの試作機を制作。",description:"Raspberry Pi 上で MediaPipe と組み合わせ、ジェスチャー認識で駆動する UI プロトタイプを構築し、それをもとに分光プリズムによる表示重畳を用いた AR グラスシステムを制作しました。焦点はジェスチャー認識そのものだけでなく、より自然で負担の少ない非接触インタラクションを探ることにもありました。"},en:{title:"Gesture-Driven AR Glasses Prototype",summary:"An AR glasses prototype with a gesture-based UI built on Raspberry Pi using MediaPipe.",description:"On Raspberry Pi, I built a gesture-recognition-driven UI prototype with MediaPipe and used it to create an AR glasses system that overlaid visuals through a beam-splitter prism design. The point of the project was not only to get gesture recognition working, but also to explore a more natural and lower-friction form of contactless interaction."}}}],o=e=>a.map(({year:t,tech:r,thumbSrc:i,thumbAlt:a,gallery:o,links:n,i18n:l})=>({year:t,tech:r,thumbSrc:i,thumbAlt:a,gallery:o,links:n,...l[e]})),n={zh:o("zh"),ja:o("ja"),en:o("en")};var l=e.i(71158),u=e.i(52504);let s=n.en,d=3/4;function c({item:e}){return"video"===e.kind?(0,t.jsx)("video",{className:l.default.media,src:e.src,poster:e.posterSrc,"aria-label":e.alt,controls:!0,autoPlay:!0,muted:!0,loop:!0,playsInline:!0},e.src):(0,t.jsx)("img",{className:l.default.media,src:e.src,alt:e.alt,decoding:"async"},e.src)}e.s(["default",0,function(){var e;let[a,o]=(0,r.useState)(0),[n,f]=(0,r.useState)(0),m=(0,r.useRef)(null),h=s[a],p=h.gallery[Math.min(n,h.gallery.length-1)];return(0,t.jsx)("section",{id:"projects",className:l.default.projects,"aria-labelledby":"projects-title",children:(0,t.jsx)("div",{className:l.default.frame,children:(0,t.jsxs)("div",{className:l.default.inner,children:[(0,t.jsx)("h2",{id:"projects-title",className:l.default.label,children:"Projects"}),(0,t.jsxs)("div",{className:l.default.layout,children:[(0,t.jsx)("ul",{className:l.default.grid,children:s.map((e,r)=>(0,t.jsx)("li",{children:(0,t.jsxs)("button",{type:"button",className:l.default.tile,"aria-pressed":r===a,onClick:()=>(e=>{o(e),f(0);let t=m.current;if(t&&window.matchMedia(i.STACKED_LAYOUT_QUERY).matches){let e=(0,u.getLenis)();e?e.scrollTo(t,{offset:-96}):t.scrollIntoView({behavior:"smooth"})}})(r),children:[(0,t.jsx)("span",{className:l.default.thumb,children:(0,t.jsx)("img",{src:e.thumbSrc,alt:"",loading:"lazy",decoding:"async"})}),(0,t.jsx)("span",{className:l.default.tileTitle,children:e.title})]})},e.title))}),(0,t.jsx)("div",{ref:m,className:l.default.detail,"aria-live":"polite",children:(0,t.jsxs)("article",{className:l.default.article,children:[(0,t.jsx)("div",{className:l.default.stage,style:{aspectRatio:Math.min(4.5,Math.max(d,(e=h.gallery[0]).width/e.height))},children:(0,t.jsx)(c,{item:p})}),h.gallery.length>1?(0,t.jsx)("div",{className:l.default.pager,children:h.gallery.map((e,r)=>(0,t.jsx)("button",{type:"button",className:l.default.page,"aria-pressed":e===p,"aria-label":`Show media ${r+1}`,onClick:()=>f(r),children:String(r+1).padStart(2,"0")},e.src))}):null,(0,t.jsx)("p",{className:l.default.year,children:h.year}),(0,t.jsx)("h3",{className:l.default.title,children:h.title}),(0,t.jsx)("p",{className:l.default.tech,children:h.tech.join(" · ")}),h.links?.length?(0,t.jsx)("ul",{className:l.default.links,children:h.links.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:e.href,className:l.default.link,target:"_blank",rel:"noreferrer",children:e.label})},e.href))}):null,(0,t.jsx)("p",{className:l.default.body,children:h.summary}),(0,t.jsx)("p",{className:l.default.body,children:h.description})]},a)})]})]})})})}],75998)},7728,e=>{e.v({backdrop:"site-header-module__wBaYfG__backdrop",bar:"site-header-module__wBaYfG__bar",drawer:"site-header-module__wBaYfG__drawer",drawerLink:"site-header-module__wBaYfG__drawerLink",drawerList:"site-header-module__wBaYfG__drawerList",header:"site-header-module__wBaYfG__header",inlineNav:"site-header-module__wBaYfG__inlineNav",logo:"site-header-module__wBaYfG__logo",menuButton:"site-header-module__wBaYfG__menuButton",menuLine:"site-header-module__wBaYfG__menuLine",navLink:"site-header-module__wBaYfG__navLink",navList:"site-header-module__wBaYfG__navList",root:"site-header-module__wBaYfG__root"})},3020,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(21168),a=e.i(7728),o=e.i(52504);let n=[{label:"About",href:"#about"},{label:"Research",href:"#research"},{label:"Projects",href:"#projects"}],l={"--hero-max-width":`${i.heroLayout.maxWidth}px`,"--type-color":i.typographyConfig.color};e.s(["default",0,function(){let[e,i]=(0,r.useState)(!1),[u,s]=(0,r.useState)(!1),d=(0,r.useId)();(0,r.useEffect)(()=>{let e=window.scrollY,t=e,r=0,i=0,a=()=>{i=0;let a=window.scrollY,o=a-e;if(e=a,a<=80)return void s(!1);if(0===o)return;let n=o>0?1:-1;n!==r&&(r=n,t=a-o),Math.abs(a-t)>=8&&s(r>0)},o=()=>{i||(i=requestAnimationFrame(a))};return window.addEventListener("scroll",o,{passive:!0}),()=>{cancelAnimationFrame(i),window.removeEventListener("scroll",o)}},[]),(0,r.useEffect)(()=>{if(!e)return;let t=e=>{"Escape"===e.key&&i(!1)},r=()=>i(!1),a=document.body.style.overflow;document.body.style.overflow="hidden";let n=(0,o.getLenis)();return n?.stop(),window.addEventListener("keydown",t),window.addEventListener("resize",r),()=>{document.body.style.overflow=a,n?.start(),window.removeEventListener("keydown",t),window.removeEventListener("resize",r)}},[e]);let c=()=>i(!1),f=e=>{(0,o.scrollToHash)(e,e.currentTarget.getAttribute("href")??""),c()};return(0,t.jsxs)("div",{className:a.default.root,style:l,children:[(0,t.jsx)("header",{className:a.default.header,"data-hidden":u&&!e||void 0,onFocus:()=>s(!1),children:(0,t.jsxs)("div",{className:a.default.bar,children:[(0,t.jsx)("a",{href:"#home",className:a.default.logo,"aria-label":"Home",onClick:f,children:(0,t.jsx)("img",{src:"/logo.svg",alt:"",width:84,height:94})}),(0,t.jsx)("nav",{"aria-label":"Primary",className:a.default.inlineNav,children:(0,t.jsx)("ul",{className:a.default.navList,children:n.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:e.href,className:a.default.navLink,onClick:f,children:e.label})},e.href))})}),(0,t.jsxs)("button",{type:"button",className:a.default.menuButton,"aria-expanded":e,"aria-controls":d,"aria-label":e?"Close menu":"Open menu","data-open":e||void 0,onClick:()=>i(e=>!e),children:[(0,t.jsx)("span",{className:a.default.menuLine}),(0,t.jsx)("span",{className:a.default.menuLine})]})]})}),(0,t.jsx)("div",{className:a.default.backdrop,"data-open":e||void 0,onClick:c,"aria-hidden":"true"}),(0,t.jsx)("nav",{id:d,"aria-label":"Primary",className:a.default.drawer,"data-open":e||void 0,inert:!e,children:(0,t.jsx)("ul",{className:a.default.drawerList,children:n.map((e,r)=>(0,t.jsx)("li",{style:{"--i":r},children:(0,t.jsx)("a",{href:e.href,className:a.default.drawerLink,onClick:f,children:e.label})},e.href))})})]})}])}]);