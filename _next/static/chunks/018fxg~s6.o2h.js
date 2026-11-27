(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,69553,e=>{e.v({canvas:"bamboo-grove-module__0B7RTq__canvas"})},21168,e=>{"use strict";let t="#050608";e.s(["STACKED_LAYOUT_QUERY",0,"(max-width: 820px), (max-aspect-ratio: 9/10)","cosmosConfig",0,{enabled:!0,photo:{src:"/starfield.webp",opacity:1,duration:90},dim:.65,driftAngle:1.06*Math.PI,layers:[{density:.05,size:[.6,1.1],brightness:[.4,.8],speed:4},{density:.02,size:[.9,1.4],brightness:[.6,.95],speed:7}],starColors:["#ffffff","#dfe8f6","#bcd6ff","#9fd0ff"],twinkle:.55,twinkleSpeed:.8,fps:30,maxPixelRatio:2},"heroLayout",0,{maxWidth:1600},"pageBackground",0,t,"particleConfig",0,{count:{high:45e4,medium:26e4,low:14e4},minCount:6e4,render:{size:.5,sizeDepthBoost:.35,opacity:.4,exposure:1.9,depthFade:.86,shimmer:.4,shimmerSpeed:.22,energyGlint:.5},colorBright:"#dfe8f6",colorDeep:"#6283b5",background:t,placement:{wide:{centerX:.705,centerY:.52,radiusByWidth:.27,radiusByHeight:.4},stacked:{centerX:.5,centerY:.35,radiusByWidth:.43,radiusByHeight:.25}},shape:{threadSpacing:.0036,threadLength:[.25,.8],threadsPerBundle:14,bundleSpread:.05,fieldScale:2,fieldDetail:.5,fieldCirculation:.8,radialDrift:.5,innerRadius:.22,radialBias:.56,escapeFraction:1,escapeSpread:.01,edgeLooseness:2.2,threadWidth:.0014,veilFraction:.36,veilWidth:.011,dustFraction:.14,dustSpread:.035},edge:{fadeStart:.8,fadeEnd:1.24,fadeVariation:.3},rotationSpeed:.04,rotationShear:.35,tilt:.32,flowIntensity:.07,flowScale:2.2,flowSpeed:.15,streamPeriod:9,streamTravel:.2,disturbance:{resolution:192,radius:.1,strength:3.2,life:3.2,spread:1.4,selfAdvection:.9,carry:.05,coupling:6.5},repulsionRadius:.32,repulsionStrength:5.6,repulsionCore:.07,repulsionSpeedBoost:.25,pointerDrag:.8,pointerSwirl:.6,pointerFade:5,springStiffness:24,damping:3.3,cameraDistance:4.4,maxPixelRatio:2,slowFrameMs:21},"typographyConfig",0,{color:"#f0f3f7",mutedColor:"rgba(224, 230, 240, 0.7)",faintColor:"rgba(224, 230, 240, 0.56)",titleWeight:300,titleSize:"clamp(2.75rem, 5.3cqw, 5.4rem)",titleTracking:"0.012em",titleLeading:1.08,subtitleWeight:400,subtitleSize:"clamp(0.98rem, 1.2cqw, 1.14rem)",subtitleTracking:"0.022em",subtitleLeading:1.7,eyebrowWeight:500,eyebrowSize:"0.7rem",eyebrowTracking:"0.3em"}])},67627,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let a={seed:0x1352905,designWidth:1440,scaleRange:[.62,1.2],layout:{fan:{roots:[.3,1.04],crowding:1.35,lean:[-.015,.045],bow:[-.015,.075],top:[.06,.74]},side:{centre:.1,spread:.04,top:[.74,.86],share:.14},foreground:{count:4,centre:.11,spread:.06,top:[.36,.66]},extra:[{x:.46,top:.4,depth:.64,bow:.03}],travel:.2},grove:{culms:34,minCulms:12,radius:12,internode:[5.5,9],leafLength:[3.2,5.2],foliage:.62,crown:.7,maxLeaves:9e3},depth:{focus:.68,farBlur:4,nearBlur:10,farLight:.22,nearLight:.42,farParallax:.84,nearParallax:1.1},wind:{sway:34,frequency:.42,flutter:.16,flutterFrequency:1.5,speed:1},dissolve:{scale:780,range:[.48,.8],rise:.08,standing:.3,drift:[0,0],morph:0,offset:[400,-220],phase:1.55,hold:{centre:.91,halfWidth:.1,level:.28,strength:1},cell:2.3},particles:{count:36e3,size:[1.2,3.1],reach:[40,340],brightness:.95},glyphs:{columns:170,length:[4,15],size:15,brightness:1.25,changeRate:.35},shield:{dim:.3,blur:0,pad:20,fade:130},narrow:{below:820,sceneWidth:1e3},veil:{darken:.3,blur:.5},post:{exposure:1,bloom:.07,bottomFade:180},maxPixelRatio:1.75,slowFrameMs:24,idleFrameMs:30};var o=e.i(69553),i=e.i(21168);function n(e){let t=e>>>0;return()=>{let e=t=t+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}}function l(e,t){let r=43758.5453123*Math.sin(127.1*e+311.7*t);return r-Math.floor(r)}let s=(e,t,r)=>{let a=Math.min(1,Math.max(0,(r-e)/(t-e)));return a*a*(3-2*a)};function u(e,t){return e<=t?.28+.72*Math.pow(e/t,1.35):1+(e-t)/(1-t)*1.1}function d(e,t){e.sort((e,t)=>e.z-t.z);let r=new Float32Array(e.length*t),a=Array(7).fill(e.length),o=-1;for(let i=0;i<e.length;i++){let n=e[i],l=Math.min(5,Math.floor(6*n.z));for(;o<l;)a[++o]=i;r.set(n.v,i*t)}for(;o<5;)a[++o]=e.length;return a[6]=e.length,{data:r,count:e.length,binStart:a}}let f=`
uniform float uTime;
uniform vec2 uView;        // viewport, css px
uniform float uDpr;
uniform float uOriginY;    // screen y of world y = 0
uniform float uOriginX;    // screen x of world x = 0
uniform float uK;          // viewport scale (1 at the design width)
uniform vec4 uDepth;       // focus, far blur, near blur, -
uniform vec4 uLight;       // far light, near light, far parallax, near parallax
uniform vec4 uSway;        // base y of the culms, sway length, wave number, -
uniform vec4 uFlutter;     // amount, frequency, -, -
uniform vec4 uDissolve;    // 1 / scale, range lo, range hi, morph speed
uniform vec2 uDrift;
uniform vec3 uField;       // field offset (px), shape phase
uniform vec4 uHold;        // centre x and half width (px), level, strength
uniform vec4 uRise;        // strength, grove height, standing digit columns, -

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}
float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float depthBlur(float z) {
  float f = uDepth.x;
  float behind = max(0.0, (f - z) / f - 0.06);
  float front = max(0.0, (z - f) / (1.0 - f) - 0.1);
  return (behind * uDepth.y + front * uDepth.z) * uK;
}
float depthLight(float z) {
  float f = uDepth.x;
  return z < f ? mix(uLight.x, 1.0, smoothstep(0.0, 1.0, z / f)) : mix(1.0, uLight.y, (z - f) / (1.0 - f));
}
float depthParallax(float z) {
  float f = uDepth.x;
  return z < f ? mix(uLight.z, 1.0, z / f) : mix(1.0, uLight.w, (z - f) / (1.0 - f));
}
/** 1 in the far background, 0 from the focal plane on. */
float farness(float z) {
  return 1.0 - smoothstep(0.0, uDepth.x, z);
}

vec4 toClip(vec2 screen) {
  return vec4((screen.x + uOriginX) / uView.x * 2.0 - 1.0, 1.0 - screen.y / uView.y * 2.0, 0.0, 1.0);
}

/** Gusts travelling across the grove, -1 … 1. */
float gust(float x) {
  float t = uTime;
  return sin(x * 0.0021 - t * 0.33) * 0.5
       + sin(x * 0.0047 - t * 0.21 + 1.7) * 0.3
       + sin(x * 0.0009 + t * 0.13 + 4.1) * 0.2;
}
/** How windy it is at x right now, 0.2 … 1: the breeze comes and goes. */
float windAt(float x) {
  float lull = 0.5 + 0.5 * sin(uTime * 0.071 + 1.0) * sin(uTime * 0.043 + 2.3);
  return 0.2 + 0.8 * clamp(0.5 + 0.5 * gust(x) + 0.35 * (lull - 0.5), 0.0, 1.0);
}

/**
 * Horizontal sway of a culm at world y. anchor = (x0, phase, omega, amplitude).
 * A cantilever: next to nothing at the base, most at the top, plus a slow
 * travelling bend so a culm visibly flexes within one screen.
 */
float culmSway(float y, vec4 anchor) {
  float t = uTime;
  float h = clamp((uSway.x - y) / uSway.y, 0.0, 1.6);
  float profile = 0.1 + pow(h, 1.6);
  float w = sin(anchor.z * t + anchor.y) * 0.55
          + sin(anchor.z * 0.43 * t + anchor.y * 1.7 + 1.3) * 0.3
          + gust(anchor.x) * 0.8;
  float bend = sin(y * uSway.z + anchor.y * 2.1 + t * anchor.z * 0.6) * 0.2 * windAt(anchor.x);
  return anchor.w * (profile * w * (0.45 + 0.55 * windAt(anchor.x)) + bend);
}

/** Extra motion of a branch (and everything on it), growing with the distance from the culm. */
vec2 branchSway(float reach, float phase, float x) {
  float t = uTime;
  vec2 s = vec2(
    sin(t * 0.9 + phase) + 0.5 * sin(t * 1.7 + phase * 2.3),
    0.7 * cos(t * 0.8 + phase * 1.3)
  );
  return s * reach * 0.034 * windAt(x);
}

/** 0 where bamboo is solid, 1 where it has fully come apart. Drifts and changes shape slowly. */
float dissolveAt(vec2 world, float z) {
  vec2 p = (world + uDrift * uTime + uField.xy) * uDissolve.x + vec2(z * 3.1, z * 1.7);
  float m = uTime * uDissolve.w + uField.z;
  p += 0.45 * vec2(vnoise(p * 0.7 + vec2(m, 0.0)), vnoise(p * 0.7 + vec2(5.2, -m)));
  float n = vnoise(p) * 0.62 + vnoise(p * 2.1 + 7.3) * 0.28 + vnoise(p * 4.3 + 1.9) * 0.1;
  // More so towards the top: solid culm bases, crowns breaking up, digits above them.
  n += uRise.x * (0.4 - world.y / uRise.y);
  float d = smoothstep(uDissolve.y, uDissolve.z, n);
  // A band held at a set stage (a little uneven, so it does not look stamped on).
  float held = clamp(uHold.z + (n - 0.5) * 0.5 * min(1.0, uHold.z * 6.0), 0.0, 1.0);   // level 0 is solid throughout
  float inBand = 1.0 - smoothstep(uHold.y * 0.7, uHold.y * 1.3, abs(world.x - uHold.x));
  return mix(d, held, inBand * uHold.w);
}

/** The digital side's colours: mostly cyan and green, some blue, a little violet, the odd warm one. */
vec3 palette(float h) {
  if (h < 0.4) return vec3(0.22, 0.82, 0.92);
  if (h < 0.66) return vec3(0.24, 0.86, 0.58);
  if (h < 0.8) return vec3(0.28, 0.5, 1.0);
  if (h < 0.91) return vec3(0.66, 0.42, 1.0);
  return vec3(0.95, 0.8, 0.36);
}
`,c=`
uniform float uCell;       // mosaic cell, px
uniform float uGlow;

/**
 * Breaks a surface into a mosaic of dots as it dissolves. local is in px on the
 * surface, so the dots travel with it. Returns (coverage, mix towards glow colour, cell hash).
 */
vec3 mosaic(vec2 local, float d, float seed, float detail) {
  // Turned by an angle of its own, so no two surfaces share a grid direction.
  float turn = 0.6 + seed * 5.0;
  vec2 q = mat2(cos(turn), -sin(turn), sin(turn), cos(turn)) * local / uCell;
  vec2 id = floor(q);
  float g = hash21(id + seed * 61.0);
  float g2 = hash21(id * 1.7 + seed * 17.0);
  // Each grain shrinks from filling its cell to a small dot, off-centre and of its own size.
  float shrink = smoothstep(0.0, 0.4, d);
  float radius = mix(0.95, mix(0.22, 0.42, g2), shrink);
  vec2 centre = (vec2(g2, fract(g * 7.13)) - 0.5) * 2.0 * max(0.0, 0.5 - radius) * shrink;
  float dotMask = 1.0 - smoothstep(radius - 0.22, radius, length(fract(q) - 0.5 - centre));
  // Grains leave one by one; none is missing while the surface is still whole.
  // (They start leaving only once they have shrunk: holes in a whole surface read as damage.)
  float leave = max(0.0, d - 0.3) * 1.25;
  float keep = smoothstep(leave - 0.03, leave + 0.04, g + 0.04);
  float coverage = mix(1.0 - d, keep * dotMask, detail);
  return vec3(coverage, smoothstep(0.1, 0.62, d), g2);
}
`,m=`#version 300 es
precision highp float;
${f}
uniform float uYRef;
layout(location = 0) in vec2 aStrip;   // 0…1 down the screen, side
layout(location = 1) in vec4 iShape;   // x0, lean, bow at the tip (px), radius
layout(location = 2) in vec4 iSway;    // phase, omega, amplitude, depth
layout(location = 3) in vec4 iLook;    // internode, hue, node offset, seed
layout(location = 4) in vec4 iTip;     // top y, taper length, y the bend starts at, -

out float vU;
out float vV;
out float vRadius;
out float vBlur;
out float vLight;
out float vFar;
out float vDissolve;
out float vShow;
out vec3 vLook;

float centre(float y) {
  // Straight below, bent under the weight of the crown above (mirrored by culmX in geometry.ts).
  float t = clamp((iTip.z - y) / (iTip.z - iTip.x), 0.0, 1.3);
  return iShape.x + iShape.y * (y - uYRef) + iShape.z * t * t + culmSway(y, vec4(iShape.x, iSway.xyz));
}

void main() {
  float z = iSway.w;
  float blur = depthBlur(z);
  // The strip always spans the screen; the culm is as long as the page.
  float sy = mix(-80.0, uView.y + 80.0, aStrip.x);
  float y = sy - uOriginY * depthParallax(z);
  float x = centre(y);
  float slope = (centre(y + 8.0) - centre(y - 8.0)) / 16.0;
  vec2 normal = normalize(vec2(1.0, -slope));
  // Thinner towards the tip (mirrored by culmRadius in geometry.ts).
  float radius = iShape.w * (0.2 + 0.8 * smoothstep(0.0, iTip.y, y - iTip.x));
  float halfWidth = radius * 1.12 + blur * 1.7 + 1.0;
  vec2 pos = vec2(x, sy) + normal * aStrip.y * halfWidth;

  vU = aStrip.y * halfWidth / radius;
  vV = y - iLook.z;
  vRadius = radius;
  vBlur = blur;
  vLight = depthLight(z);
  vFar = farness(z);
  vDissolve = dissolveAt(vec2(x, y), z);
  // In front of the focal plane only foliage reaches into the frame: a culm
  // that close would be a wide blurred band across the page.
  vShow = (1.0 - smoothstep(0.79, 0.85, z)) * smoothstep(-blur, 10.0 + blur, y - iTip.x);
  vLook = iLook.xyw;
  gl_Position = toClip(pos);
}
`,h=`#version 300 es
precision highp float;
${f}
${c}
in float vU;
in float vV;
in float vRadius;
in float vBlur;
in float vLight;
in float vFar;
in float vDissolve;
in float vShow;
in vec3 vLook;   // internode, hue, seed
out vec4 outColor;

void main() {
  float internode = vLook.x;
  float f = vV / internode;
  float index = floor(f);
  float along = (f - index) * internode;           // px below the node above
  float toNode = min(along, internode - along);     // px to the nearest node
  float r = vRadius;

  // Silhouette: a slight swelling at every node, a faint taper in between.
  float swell = 1.0 + 0.085 * exp(-toNode * toNode / (r * r * 0.5)) - 0.02 * sin(3.14159 * along / internode);
  float soft = 0.75 + vBlur;
  float alpha = 1.0 - smoothstep(-soft, soft, (abs(vU) - swell) * r);
  alpha *= r / (r + vBlur * 0.55) * vShow;
  if (alpha < 0.003) discard;

  float detail = clamp(1.0 - vBlur / 4.5, 0.0, 1.0);
  float u = clamp(vU / swell, -1.0, 1.0);
  float nz = sqrt(max(0.0, 1.0 - u * u));
  vec3 n = vec3(u, 0.0, nz);

  // Bark: young green to olive, each internode a touch different, fibres running lengthwise.
  float seed = vLook.z;
  float tone = hash11(index * 3.7 + seed * 91.0);
  vec3 albedo = mix(vec3(0.13, 0.31, 0.12), vec3(0.37, 0.46, 0.15), vLook.y * 0.75 + tone * 0.25);
  albedo = mix(albedo, vec3(0.07, 0.33, 0.36), vFar * 0.8);
  float around = asin(u);
  float fibre = vnoise(vec2(around * 13.0 + seed * 40.0, vV * 0.006 + seed * 9.0)) * 0.6
              + vnoise(vec2(around * 37.0, vV * 0.021)) * 0.4;
  float blotch = vnoise(vec2(around * 1.6 + index * 5.0, vV * 0.011 + seed * 3.0));
  albedo *= 1.0 + detail * (0.34 * (fibre - 0.5) + 0.3 * (blotch - 0.5));
  // Paler and drier just below a node, fresher lower down.
  albedo = mix(albedo, albedo * vec3(1.18, 1.14, 0.96), detail * (1.0 - smoothstep(0.0, internode * 0.45, along)) * 0.5);

  // The node: a dark groove with a pale, waxy ring under it.
  float px = max(1.0, r / 11.0);
  float groove = (1.0 - smoothstep(0.4 * px, 1.7 * px, toNode)) * detail;
  float ring = exp(-pow((along - 3.6 * px) / (2.2 * px), 2.0)) * detail;
  albedo = mix(albedo, vec3(0.6, 0.68, 0.56), ring * 0.55);

  // Light from the front left; a glossy streak; cool rim light from the digital side.
  vec3 L = normalize(vec3(-0.6, 0.12, 0.79));
  float diffuse = max(dot(n, L), 0.0);
  float wrap = 0.5 + 0.5 * dot(n, L);
  float spec = pow(max(dot(n, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0), 46.0);
  float rim = pow(1.0 - nz, 2.4);
  vec3 color = albedo * (0.07 + 0.7 * diffuse + 0.3 * wrap * wrap);
  color += spec * 0.2 * vec3(0.75, 1.0, 0.86) * (0.4 + 0.6 * detail);
  color += rim * (u < 0.0 ? vec3(0.1, 0.5, 0.56) * 0.5 : vec3(0.22, 0.2, 0.5) * 0.22);
  color *= 1.0 - 0.72 * groove;
  color *= vLight;

  // Coming apart.
  float d = vDissolve;
  vec3 m = mosaic(vec2(vU * r, vV), d, seed, detail);
  vec3 glow = palette(m.z) * uGlow * mix(0.55, 1.0, vLight);
  color += vec3(0.05, 0.3, 0.34) * smoothstep(0.0, 0.35, d) * 0.3 * vLight;   // lit by the particles around it
  // Nodes outlast the bark as glowing rings.
  float nodeGlow = exp(-toNode * toNode / (3.0 * px * px)) * smoothstep(0.3, 0.75, d) * (1.0 - smoothstep(0.8, 1.0, d));
  color = mix(color, glow, m.y);
  float coverage = max(m.x, nodeGlow * 0.5);
  color += palette(hash11(index + seed * 31.0)) * nodeGlow * 0.14 * uGlow;

  alpha *= coverage;
  outColor = vec4(color * alpha, alpha * (1.0 - 0.45 * m.y));
}
`,p=`#version 300 es
precision highp float;
${f}
layout(location = 0) in vec2 aQuad;     // 0…1 along, side
layout(location = 1) in vec4 iEnds;     // p0, p1
layout(location = 2) in vec4 iLook;     // half width at p0 and p1, depth, seed
layout(location = 3) in vec4 iAnchor;   // culm x0, phase, omega, amplitude
layout(location = 4) in vec4 iBranch;   // reach at p0 and p1, branch phase, attach y

out float vU;
out float vWidth;
out float vBlur;
out float vLight;
out float vFar;
out float vDissolve;

void main() {
  float z = iLook.z;
  float blur = depthBlur(z);
  float t = aQuad.x;
  vec2 sway0 = vec2(culmSway(iBranch.w, iAnchor), 0.0);
  vec2 p0 = iEnds.xy + sway0 + branchSway(iBranch.x, iBranch.z, iAnchor.x);
  vec2 p1 = iEnds.zw + sway0 + branchSway(iBranch.y, iBranch.z, iAnchor.x);
  vec2 dir = normalize(p1 - p0 + vec2(1e-4, 0.0));
  vec2 normal = vec2(-dir.y, dir.x);
  float width = mix(iLook.x, iLook.y, t);
  float halfWidth = width + blur * 1.6 + 1.0;
  vec2 pos = mix(p0, p1, t) + normal * aQuad.y * halfWidth;
  pos.y += uOriginY * depthParallax(z);

  vU = aQuad.y * halfWidth;
  vWidth = width;
  vBlur = blur;
  vLight = depthLight(z);
  vFar = farness(z);
  vDissolve = dissolveAt(mix(iEnds.xy, iEnds.zw, t), z);
  gl_Position = toClip(pos);
}
`,v=`#version 300 es
precision highp float;
in float vU;
in float vWidth;
in float vBlur;
in float vLight;
in float vFar;
in float vDissolve;
out vec4 outColor;

void main() {
  float soft = 0.7 + vBlur;
  float alpha = 1.0 - smoothstep(-soft, soft, abs(vU) - vWidth);
  alpha *= vWidth / (vWidth + vBlur * 0.6);
  alpha *= 1.0 - smoothstep(0.1, 0.55, vDissolve);
  vec3 color = mix(vec3(0.2, 0.3, 0.12), vec3(0.07, 0.27, 0.29), vFar * 0.8);
  color *= (0.75 + 0.35 * clamp(-vU / max(vWidth, 0.5), -1.0, 1.0)) * vLight;
  outColor = vec4(color * alpha, alpha);
}
`,g=`#version 300 es
precision highp float;
${f}
layout(location = 0) in vec2 aStrip;    // 0…1 along the blade, side
layout(location = 1) in vec4 iBlade;    // base, angle, length
layout(location = 2) in vec4 iLook;     // half width, bend, seed, hue (sign: lit half)
layout(location = 3) in vec4 iAnchor;   // culm x0, phase, omega, amplitude
layout(location = 4) in vec4 iBranch;   // reach, branch phase, attach y, depth

out float vT;
out float vU;
out float vHalfWidth;
out float vLength;
out float vBlur;
out float vLight;
out float vFar;
out float vDissolve;
out vec3 vLook;   // seed, hue, fold

void main() {
  float z = iBranch.w;
  float blur = depthBlur(z);
  float seed = iLook.z;
  float t = aStrip.x;
  float time = uTime;

  // Each leaf flutters on its own, harder when a gust passes.
  float wind = windAt(iAnchor.x);
  float rate = uFlutter.y * (0.7 + 0.6 * seed);
  float flutter = sin(time * rate + seed * 50.0) * 0.6 + sin(time * rate * 2.7 + seed * 91.0) * 0.25;
  float angle = iBlade.z + flutter * uFlutter.x * wind;
  // Turning about its own axis shows as a change of apparent width.
  float twist = 1.0 - 0.42 * (0.5 + 0.5 * sin(time * rate * 0.8 + seed * 33.0)) * wind;
  float halfWidth = iLook.x * twist;

  vec2 dir = vec2(cos(angle), sin(angle));
  vec2 normal = vec2(-dir.y, dir.x);
  float len = iBlade.w;
  float pad = blur * 1.6 + 1.0;
  float along = mix(-pad, len + pad, t);
  float tt = clamp(along / len, 0.0, 1.0);

  // The blade's own curve: some hang nearly straight, some droop deeply, and a
  // second, weaker bow the other way gives many of them a slight S.
  float droop = (iLook.y * mix(0.6, 2.0, fract(seed * 29.7)) + flutter * 0.03 * wind) * len;
  float sway = (fract(seed * 19.3) - 0.5) * 0.14 * len;
  float offset = droop * tt * tt + sway * sin(3.14159 * tt);
  float slope = (2.0 * droop * tt + sway * 3.14159 * cos(3.14159 * tt)) / len;
  // Width is measured square to the curved midrib, not to the leaf's initial direction.
  vec2 tangent = normalize(dir + normal * slope);
  vec2 across = vec2(-tangent.y, tangent.x);
  // Room at the sides for an off-centre midrib (see the fragment shader).
  float reach = halfWidth * 1.22 + pad;

  vec2 pos = iBlade.xy + dir * along + normal * offset + across * aStrip.y * reach;
  pos.x += culmSway(iBranch.z, iAnchor);
  pos += branchSway(iBranch.x, iBranch.y, iAnchor.x);
  pos.y += uOriginY * depthParallax(z);

  vT = along / len;
  vU = aStrip.y * reach / halfWidth;
  vHalfWidth = halfWidth;
  vLength = len;
  vBlur = blur;
  vLight = depthLight(z);
  vFar = farness(z);
  vDissolve = dissolveAt(iBlade.xy + dir * len * 0.5, z);
  vLook = vec3(seed, abs(iLook.w), sign(iLook.w) * mix(0.35, 1.0, twist));
  gl_Position = toClip(pos);
}
`,x=`#version 300 es
precision highp float;
${f}
${c}
in float vT;
in float vU;
in float vHalfWidth;
in float vLength;
in float vBlur;
in float vLight;
in float vFar;
in float vDissolve;
in vec3 vLook;
out vec4 outColor;

void main() {
  float t = clamp(vT, 0.0, 1.0);
  float seed = vLook.x;
  // A handful of independent random numbers per leaf.
  float tone = fract(seed * 7.31);
  float age = fract(seed * 13.7);
  float form = fract(seed * 23.1);
  float turn = fract(seed * 41.3);
  float wear = fract(seed * 57.9);
  float detail = clamp(1.0 - vBlur / 4.5, 0.0, 1.0);

  /* ---- outline: no two blades alike ---- */

  // Lanceolate – rounded base, long pointed tip – but the widest point sits
  // anywhere from a quarter to nearly half way along, and the taper varies.
  float profile = pow(sin(3.14159 * pow(t, mix(0.5, 0.8, form))), mix(0.95, 1.35, wear));
  // Gently wavy margins.
  profile *= 1.0 + 0.05 * detail * sin(t * mix(9.0, 19.0, form) + seed * 30.0);

  // Seen in three dimensions a blade is rarely flat on to the viewer: most
  // turn away towards the tip (narrowing), and some make a half twist, pinching
  // to an edge-on line and showing their other side beyond it.
  float fold = vLook.z;
  if (turn > 0.76) {
    float at = mix(0.48, 0.8, fract(seed * 67.1));
    float side = 1.0 - 2.0 * smoothstep(at - 0.17, at + 0.17, t);   // 1 → -1 through the twist
    profile *= mix(1.0, max(abs(side), 0.1), 0.92);
    fold *= side >= 0.0 ? 1.0 : -0.8;
  } else if (turn > 0.25) {
    profile *= mix(1.0, mix(0.4, 0.85, tone), smoothstep(0.3, 0.95, t));
  }

  // The midrib is rarely dead centre: one half of the blade is a little broader.
  float skew = (fract(seed * 83.7) - 0.5) * 0.36;
  float across = vU - skew * profile;

  float soft = 0.7 + vBlur;
  float w = vHalfWidth;
  float alpha = 1.0 - smoothstep(-soft, soft, (abs(across) - profile) * w);
  // Ends: the same softness, measured along the blade.
  alpha *= smoothstep(-soft, soft, vT * vLength) * (1.0 - smoothstep(-soft, soft, (vT - 1.0) * vLength));
  // Some tips have dried and broken off, leaving a ragged end.
  float broken = step(0.86, wear);
  float cut = mix(0.7, 0.9, fract(seed * 91.3)) + 0.035 * sin(across * 7.0 + seed * 70.0);
  alpha *= 1.0 - broken * smoothstep(-soft, soft, (vT - cut) * vLength);
  alpha *= w / (w + vBlur * 0.5);
  if (alpha < 0.003) discard;

  float u = clamp(across / max(profile, 0.06), -1.0, 1.0);

  /* ---- colour: young, mature, yellowing and dry leaves side by side ---- */

  vec3 albedo;
  float sheen = 1.0;
  if (age < 0.2) {
    // Young: bright yellow-green, thin enough to glow when lit from behind.
    albedo = mix(vec3(0.24, 0.46, 0.12), vec3(0.38, 0.56, 0.16), tone);
  } else if (age < 0.8) {
    // Mature: deep green, some of them bluish.
    albedo = mix(vec3(0.05, 0.22, 0.08), vec3(0.2, 0.41, 0.13), vLook.y);
    albedo = mix(albedo, vec3(0.07, 0.31, 0.25), smoothstep(0.6, 1.0, tone) * 0.7);
  } else if (age < 0.94) {
    // Yellowing from the tip and the margins inwards.
    albedo = mix(vec3(0.16, 0.36, 0.11), vec3(0.3, 0.42, 0.13), tone);
    float turned = clamp(smoothstep(0.35, 1.0, t) * 0.8 + smoothstep(0.45, 1.0, abs(u)) * 0.5, 0.0, 1.0);
    albedo = mix(albedo, vec3(0.5, 0.48, 0.16), turned * mix(0.5, 1.0, tone));
    sheen = 0.6;
  } else {
    // Dry: straw-coloured and dull.
    albedo = mix(vec3(0.42, 0.37, 0.18), vec3(0.54, 0.47, 0.24), tone);
    sheen = 0.25;
  }
  // Drying tips, and brown at a broken end.
  albedo = mix(albedo, vec3(0.46, 0.45, 0.18), smoothstep(0.82, 1.0, t) * 0.4 * step(0.35, age));
  albedo = mix(albedo, vec3(0.34, 0.26, 0.12), broken * smoothstep(cut - 0.16, cut, vT) * 0.75);
  // Uneven patches along the blade.
  float mottle = vnoise(vec2(t * 5.0 + seed * 9.0, u * 1.3 + seed * 3.0));
  albedo *= 1.0 + detail * 0.36 * (mottle - 0.5);
  albedo = mix(albedo, vec3(0.05, 0.31, 0.34), vFar * 0.82);

  /* ---- shading ---- */

  // Folded along the midrib: one half faces the light, the other is in shade.
  float lit = mix(0.48, 1.15, smoothstep(-0.16, 0.16, u * fold));
  lit = mix(0.85, lit, 0.35 + 0.65 * detail);
  float midrib = (1.0 - smoothstep(0.02, 0.1, abs(u))) * detail;
  float veins = 1.0 + detail * 0.07 * sin(u * 24.0 + seed * 6.0);
  float gloss = pow(max(0.0, 1.0 - abs(u - 0.5 * sign(fold))), 5.0) * (0.3 + 0.7 * sin(3.14159 * t)) * detail * sheen;
  float edge = smoothstep(0.65, 1.0, abs(u));
  // One margin curls towards the viewer on many blades: a thin bright line just inside it.
  float curlSide = fract(seed * 37.9) < 0.5 ? 1.0 : -1.0;
  float curl = step(0.45, form) * smoothstep(0.66, 0.84, u * curlSide) * (1.0 - smoothstep(0.9, 1.0, abs(u))) * detail;

  vec3 color = albedo * lit * veins * (0.8 + 0.4 * tone);
  color = mix(color, albedo * 1.5 + vec3(0.02, 0.04, 0.0), midrib * 0.45);
  color += gloss * vec3(0.3, 0.5, 0.4) * 0.3;
  color += curl * albedo * 0.55;
  color += edge * vec3(0.04, 0.2, 0.2) * 0.35 * sheen;   // thin, translucent margin catching cool light
  color *= mix(0.72, 1.0, smoothstep(0.0, 0.25, t));   // darker where it leaves the twig
  color *= vLight;

  // Coming apart.
  float d = vDissolve;
  vec3 m = mosaic(vec2(vT * vLength, vU * w), d, seed, detail);
  vec3 glow = palette(m.z) * uGlow * mix(0.5, 1.0, vLight);
  color += vec3(0.04, 0.26, 0.3) * smoothstep(0.0, 0.35, d) * 0.3 * vLight;
  color = mix(color, glow, m.y);

  alpha *= m.x;
  outColor = vec4(color * alpha, alpha * (1.0 - 0.45 * m.y));
}
`,y=`#version 300 es
precision highp float;
${f}
uniform vec4 uParticle;   // min size, max size, min reach, max reach
uniform float uBrightness;
layout(location = 0) in vec4 aHome;     // home, depth, ambient
layout(location = 1) in vec4 aAnchor;   // culm x0, phase, omega, amplitude
layout(location = 2) in vec4 aBranch;   // reach, branch phase, attach y, random
layout(location = 3) in vec4 aRandom;   // random \xd73, depth scale

out vec3 vColor;
out float vSoft;

void main() {
  float z = aHome.z;
  float blur = depthBlur(z);
  float time = uTime;
  float s1 = aBranch.w;
  float s2 = aRandom.x;
  float s3 = aRandom.y;
  float s4 = aRandom.z;
  float scale = aRandom.w;

  float d = mix(dissolveAt(aHome.xy, z), 0.5 + 0.2 * sin(time * 0.1 + s1 * 30.0), aHome.w);
  // How far it has left the surface: 0 still sitting on it, 1 fully adrift.
  float free = smoothstep(0.1, 0.95, d);

  // While attached it moves with its leaf; adrift it follows the air instead.
  vec2 sway = vec2(culmSway(aBranch.z, aAnchor), 0.0) + branchSway(aBranch.x, aBranch.y, aAnchor.x);
  float angle = s1 * 6.2832;
  vec2 dir = vec2(cos(angle), sin(angle)) * 0.8 + vec2(-0.5, -0.32);
  float reach = mix(uParticle.z, uParticle.w, s2 * s2) * uK * scale;
  vec2 wander = vec2(
    sin(time * (0.21 + 0.5 * s3) + s1 * 40.0) + 0.5 * sin(time * (0.47 + 0.3 * s2) + s4 * 20.0),
    cos(time * (0.17 + 0.4 * s2) + s3 * 30.0) + 0.5 * cos(time * (0.39 + 0.3 * s4) + s1 * 15.0)
  ) * (2.0 + 26.0 * free) * uK * scale;
  vec2 breeze = vec2(gust(aHome.x) * 16.0, 0.0) * free * uK;
  vec2 pos = aHome.xy + sway * (1.0 - 0.75 * free) + dir * reach * pow(free, 1.5) + wander + breeze;
  pos.y += uOriginY * depthParallax(z);

  float twinkle = 0.55 + 0.45 * sin(time * (0.5 + 1.9 * s4) + s2 * 50.0);
  float show = smoothstep(0.03, 0.26, d) * (1.0 - 0.72 * smoothstep(0.7, 1.0, d));
  vec3 leaf = mix(vec3(0.3, 0.72, 0.4), vec3(0.2, 0.7, 0.66), farness(z));
  vec3 color = mix(leaf, palette(s4), smoothstep(0.0, 0.45, free));

  float size = mix(uParticle.x, uParticle.y, s3 * s3) * mix(0.75, 1.25, clamp(scale, 0.0, 1.4));
  float spread = 1.0 + blur * 0.35;
  vColor = color * show * twinkle * uBrightness * mix(0.5, 1.0, depthLight(z)) / (spread * spread) * (1.0 + blur * 0.25);
  vSoft = blur;
  gl_PointSize = max(1.0, size * spread * uDpr);
  gl_Position = toClip(pos);
}
`,b=`#version 300 es
precision highp float;
in vec3 vColor;
in float vSoft;
out vec4 outColor;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  // In focus: a small, nearly square pixel. Out of focus: a soft disc.
  float square = max(abs(c.x), abs(c.y)) * 2.0;
  float disc = length(c) * 2.0;
  float shape = mix(square, disc, clamp(0.35 + vSoft * 0.4, 0.0, 1.0));
  float a = 1.0 - smoothstep(0.55, 1.0, shape);
  outColor = vec4(vColor * a, 0.0);   // additive
}
`,w=`#version 300 es
precision highp float;
${f}
uniform float uBrightness;
uniform float uChangeRate;
layout(location = 0) in vec2 aQuad;     // -0.5 … 0.5
layout(location = 1) in vec4 iCell;     // x, y, size, depth
layout(location = 2) in vec4 iLook;     // column seed, seed, index, column length

out vec2 vUv;
out vec3 vColor;
out float vLod;

void main() {
  float z = iCell.w;
  float blur = depthBlur(z);
  float time = uTime;
  float column = iLook.x;
  float seed = iLook.y;

  // Digits only exist where the bamboo has come apart.
  float d = dissolveAt(iCell.xy, z);
  float show = max(smoothstep(0.16, 0.6, d), step(1.0 - uRise.z, fract(column * 11.3)) * 0.85);

  // The glyph changes now and then; some cells stay empty for a while.
  float tick = floor(time * uChangeRate * (0.4 + 1.2 * seed) + seed * 100.0);
  float pick = hash21(vec2(seed * 91.7, tick));
  float glyph = pick < 0.36 ? 0.0 : pick < 0.68 ? 1.0 : floor(2.0 + (pick - 0.68) / 0.32 * 5.999);
  float present = step(0.16, hash21(vec2(seed * 13.1, floor(time * 0.11 + seed * 10.0))));

  // A slow pulse runs down each column; individual glyphs flicker faintly.
  float phase = fract(time * (0.035 + 0.05 * column) - iLook.z / iLook.w * 0.8 + column * 7.0);
  float pulse = 0.45 + 0.55 * pow(1.0 - phase, 3.0);
  float flicker = 0.8 + 0.2 * sin(time * (1.3 + 3.0 * seed) + seed * 40.0);

  float size = iCell.z;
  float grow = 1.0 + blur * 0.12;
  vec2 pos = iCell.xy + aQuad * vec2(size * 0.64, size) * grow;
  pos.x += gust(iCell.x) * 5.0 * uK;
  pos.y += sin(time * 0.13 + column * 20.0) * 6.0 * uK;
  pos.y += uOriginY * depthParallax(z);

  vec2 uv = aQuad + 0.5;
  vUv = vec2((glyph + uv.x) / float(8), uv.y);
  vec3 tint = palette(fract(column * 3.7 + step(0.9, seed) * 0.37));
  vColor = tint * show * present * pulse * flicker * uBrightness * mix(0.45, 1.0, depthLight(z)) / grow;
  vLod = log2(1.0 + blur * 0.9);
  gl_Position = toClip(pos);
}
`,T=`#version 300 es
precision highp float;
uniform sampler2D uAtlas;
in vec2 vUv;
in vec3 vColor;
in float vLod;
out vec4 outColor;

void main() {
  float a = texture(uAtlas, vUv, vLod).r;
  outColor = vec4(vColor * a, 0.0);   // additive
}
`,E=`#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,R=`#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform vec2 uTexel;   // of the source
in vec2 vUv;
out vec4 outColor;
void main() {
  vec4 sum = texture(uSource, vUv) * 4.0;
  sum += texture(uSource, vUv + uTexel * vec2(-1.0, -1.0));
  sum += texture(uSource, vUv + uTexel * vec2(1.0, -1.0));
  sum += texture(uSource, vUv + uTexel * vec2(-1.0, 1.0));
  sum += texture(uSource, vUv + uTexel * vec2(1.0, 1.0));
  outColor = sum / 8.0;
}
`,S=`#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec4 sum = texture(uSource, vUv + uTexel * vec2(-2.0, 0.0));
  sum += texture(uSource, vUv + uTexel * vec2(2.0, 0.0));
  sum += texture(uSource, vUv + uTexel * vec2(0.0, -2.0));
  sum += texture(uSource, vUv + uTexel * vec2(0.0, 2.0));
  sum += texture(uSource, vUv + uTexel * vec2(-1.0, 1.0)) * 2.0;
  sum += texture(uSource, vUv + uTexel * vec2(1.0, 1.0)) * 2.0;
  sum += texture(uSource, vUv + uTexel * vec2(-1.0, -1.0)) * 2.0;
  sum += texture(uSource, vUv + uTexel * vec2(1.0, -1.0)) * 2.0;
  outColor = sum / 12.0;
}
`,A=`#version 300 es
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uBlurred;
uniform vec2 uView;
uniform float uDpr;
uniform vec2 uBand;        // screen y of the top of the first section and the bottom of the last
uniform vec3 uBackground;
uniform vec4 uShield;      // dim, blur, -, -
uniform vec4 uPost;        // exposure, bloom, bottom fade, -
uniform vec2 uVeil;        // darken, blur
uniform vec4 uRects[12];   // centre, half size (css px)
uniform vec2 uRectFade[12];   // px over which the left/right and top/bottom edges fade (0: hard; negative: inwards)
uniform int uRectCount;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uView;   // css px, y down

  // Plain rectangles with a hard edge (one device pixel of anti-aliasing);
  // where asked for, edges fade out beyond the rectangle instead.
  float shield = 0.0;
  for (int i = 0; i < 12; i++) {
    if (i >= uRectCount) break;
    vec4 r = uRects[i];
    vec2 q = abs(p - r.xy) - r.zw;
    vec2 fade = uRectFade[i];
    float mx = fade.x > 0.0 ? 1.0 - smoothstep(0.0, fade.x, q.x) : clamp(0.5 - q.x * uDpr, 0.0, 1.0);
    // A negative length fades inwards: nothing at the edge itself, full strength that far inside.
    float my = fade.y > 0.0 ? 1.0 - smoothstep(0.0, fade.y, q.y)
             : fade.y < 0.0 ? smoothstep(0.0, -fade.y, -q.y)
             : clamp(0.5 - q.y * uDpr, 0.0, 1.0);
    shield = max(shield, mx * my);
  }

  vec3 sharp = texture(uScene, vUv).rgb;
  vec3 blurred = texture(uBlurred, vUv).rgb;
  // The veil over everything first, then whatever the shields add to it.
  vec3 color = mix(sharp, blurred, max(uVeil.y, shield * uShield.y));
  color += blurred * uPost.y;
  color *= (1.0 - uVeil.x) * mix(1.0, uShield.x, shield);

  // The scene only shows between the two ends of the sections it belongs to.
  float fade = smoothstep(0.0, 70.0, p.y - uBand.x) * (1.0 - smoothstep(uBand.y - uPost.z, uBand.y - 10.0, p.y));
  color *= fade * uPost.x;

  // Soft shoulder, so overlapping glows never clip to flat white.
  color = 1.0 - exp(-color * 1.15);
  color += uBackground;
  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  outColor = vec4(color, 1.0);
}
`,_=[1,3,5].map(e=>parseInt(i.pageBackground.slice(e,e+2),16)/255);function M(e,t,r){let a=e.createShader(t);if(e.shaderSource(a,r),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(a);throw e.deleteShader(a),Error(`Shader compile failed: ${t}`)}return a}function F(e,t,r){let a=e.createProgram(),o=M(e,e.VERTEX_SHADER,t),i=M(e,e.FRAGMENT_SHADER,r);if(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.deleteShader(o),e.deleteShader(i),!e.getProgramParameter(a,e.LINK_STATUS)){let t=e.getProgramInfoLog(a);throw e.deleteProgram(a),Error(`Program link failed: ${t}`)}let n=new Map;return{program:a,uniform:t=>(n.has(t)||n.set(t,e.getUniformLocation(a,t)),n.get(t))}}function P(e,t,r){let a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA8,t,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{texture:a,framebuffer:o,width:t,height:r}}e.s(["default",0,function(){let e=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=e.current;if(!t)return;let r=function(e,t){let r=document.querySelector('[data-bamboo="start"]'),a=document.querySelector('[data-bamboo="end"]');if(!r||!a)return null;let o=e.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!o)return null;let i=window.matchMedia("(prefers-reduced-motion: reduce)"),f=!1,c=0,M=i.matches,D=null,L=null,B=null,C=null,k=[],z=0,U=0,I=1,V=1,N=0,O=0,j=0,W=[],X=new Float32Array(48),q=new Float32Array(24),G=0,H=0,Y=40,K=0,$=0,Q=NaN,Z=NaN,J=!0,ee=!1,et=0,er=0,ea=45;function eo(){let e,t,r,a,i=e=>{let t=o.createBuffer();return o.bindBuffer(o.ARRAY_BUFFER,t),o.bufferData(o.ARRAY_BUFFER,new Float32Array(e),o.STATIC_DRAW),t},n=e=>{let t=[];for(let r=0;r<e;r++)t.push(r/(e-1),-1,r/(e-1),1);return t};return{culm:F(o,m,h),branch:F(o,p,v),leaf:F(o,g,x),particle:F(o,y,b),glyph:F(o,w,T),blurDown:F(o,E,R),blurUp:F(o,E,S),composite:F(o,E,A),culmStrip:i(n(40)),leafStrip:i(n(10)),segmentQuad:i([0,-1,0,1,1,-1,1,1]),glyphQuad:i([-.5,-.5,.5,-.5,-.5,.5,.5,.5]),atlas:((e=document.createElement("canvas")).width=512,e.height=100,(t=e.getContext("2d")).fillStyle="#000",t.fillRect(0,0,e.width,e.height),t.strokeStyle="#fff",t.lineWidth=9,t.lineCap="round",t.lineJoin="round",(r=(e,r)=>{t.save(),t.translate(64*e,0),t.beginPath(),r(t),t.stroke(),t.restore()})(0,e=>e.roundRect(16,18,32,64,11)),r(1,e=>{e.moveTo(32,18),e.lineTo(32,82)}),r(2,e=>{e.moveTo(23,30),e.lineTo(34,18),e.lineTo(34,82)}),r(3,e=>e.roundRect(16,38,32,44,10)),r(4,e=>{e.moveTo(16,18),e.lineTo(16,70),e.quadraticCurveTo(16,82,28,82),e.lineTo(36,82),e.quadraticCurveTo(48,82,48,70),e.lineTo(48,18)}),r(5,e=>{e.moveTo(48,18),e.lineTo(28,18),e.quadraticCurveTo(16,18,16,30),e.lineTo(16,70),e.quadraticCurveTo(16,82,28,82),e.lineTo(48,82)}),r(6,e=>{e.roundRect(16,18,32,24,8),e.roundRect(16,58,32,24,8)}),r(7,e=>{e.moveTo(18,18),e.lineTo(18,82),e.lineTo(48,82)}),a=o.createTexture(),o.bindTexture(o.TEXTURE_2D,a),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,e),o.generateMipmap(o.TEXTURE_2D),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),a),emptyVao:o.createVertexArray()}}function ei(e,t,r){let a=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,a),o.bufferData(o.ARRAY_BUFFER,e.data,o.STATIC_DRAW);let i=4*t,n=[];for(let l=0;l<6;l++){let s=e.binStart[l];if(e.binStart[l+1]-s<=0){n.push(null);continue}let u=o.createVertexArray();o.bindVertexArray(u);let d=0;r&&(o.bindBuffer(o.ARRAY_BUFFER,r),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,2,o.FLOAT,!1,0,0),d=1),o.bindBuffer(o.ARRAY_BUFFER,a);for(let e=0;e<t/4;e++)o.enableVertexAttribArray(d+e),o.vertexAttribPointer(d+e,4,o.FLOAT,!1,i,(r?s*i:0)+16*e),r&&o.vertexAttribDivisor(d+e,1);n.push(u)}return o.bindVertexArray(null),{buffer:a,bins:n,set:e}}function en(){if(B){for(let e of Object.values(B))for(let t of(o.deleteBuffer(e.buffer),e.bins))t&&o.deleteVertexArray(t);B=null}}function el(){return U*(1+t.layout.travel)}function es(){return z<t.narrow.below?Math.max(z,t.narrow.sceneWidth):z}function eu(){for(let e of[C,...k])e&&(o.deleteTexture(e.texture),o.deleteFramebuffer(e.framebuffer));C=null,k=[]}function ed(){let e=r.getBoundingClientRect(),o=a.getBoundingClientRect();for(let r of(O=e.top,j=o.bottom,N=-Math.min(1,Math.max(0,-e.top/Math.max(1,o.bottom-e.top-U)))*t.layout.travel*U,G=0,H=11*O+13*j,W)){if(G>=12)break;let e=r.getBoundingClientRect();if(e.bottom<-200||e.top>U+200||0===e.width)continue;let a=r.dataset.bambooShield??"",o=t.shield.pad,i=e=>{let r=RegExp(`fade-${e}(?!-in)(?::(\\d+))?`).exec(a);return r?r[1]?Number(r[1]):t.shield.fade:0},n=i("x"),l=i("y")||-i("y-in"),s=a.includes("flush-x")||n>0?0:o,u=a.includes("flush-y")||0!==l?0:o,d=e.left-s,f=a.includes("bleed-right")?z+2:e.right+s,c=e.top-(a.includes("flush-top")?0:u),m=a.includes("bleed-bottom")?Math.max(e.bottom,j)+2:e.bottom+u,h=4*G;X[h]=(d+f)/2,X[h+1]=(c+m)/2,X[h+2]=(f-d)/2,X[h+3]=(m-c)/2,q[2*G]=n,q[2*G+1]=l,H+=e.left+3*e.top+5*e.width+7*e.height,G++}return e.top>=U+100||o.bottom<=-100?"off":r.closest("[data-waiting]")?"waiting":"on"}function ef(){if(f||!D)return;let r=e.clientWidth,a=e.clientHeight;if(0===r||0===a)return;let i=r!==z;z=r,U=a;let c=Math.max(1,Math.round(r*(I=Math.min(window.devicePixelRatio||1,t.maxPixelRatio)*V))),m=Math.max(1,Math.round(a*I));if(e.width!==c||e.height!==m||!C){e.width=c,e.height=m,eu(),C=P(o,c,m);let t=c,r=m;for(let e=0;e<4;e++)t=Math.max(1,t>>1),r=Math.max(1,r>>1),k.push(P(o,t,r))}W=Array.from(document.querySelectorAll("[data-bamboo-shield]")),ed(),(i||!L||Math.abs(el()-L.height)>40)&&D&&0!==z&&(en(),B={culms:ei((L=function(e,t,r){let a=n(r.seed),o=()=>a(),i=(e,t)=>e+(t-e)*o(),f=()=>(o()+o()+o()+o()-2)/2,c=Math.min(r.scaleRange[1],Math.max(r.scaleRange[0],e/r.designWidth)),m=r.depth.focus,h=t+300*c,p=r.layout,v=p.fan,g=Math.max(r.grove.minCulms,Math.round(r.grove.culms*Math.min(1.25,e/r.designWidth))),x=Math.round(g*p.side.share),y=[];for(let a=0;a<g;a++){let n,l,s,d,h,g=a<x,b=o();if(g)n=b<.5?i(.04,.3):i(.88,1),l=p.side.centre+2*f()*p.side.spread,s=.05*f(),d=0,h=i(p.side.top[0],p.side.top[1]);else{n=b<.3?i(.05,.36):b<.62?i(.36,.58):i(.58,.78);let e=Math.pow(o(),v.crowding);l=v.roots[1]-(v.roots[1]-v.roots[0])*e+.025*f(),s=v.lean[0]+(v.lean[1]-v.lean[0])*e+.05*f(),d=(v.bow[0]+(v.bow[1]-v.bow[0])*e)*i(.5,1.25);let t=Math.min(1,Math.max(0,Math.pow(e,.85)+.14*f()+.06*(n<.36)));h=v.top[0]+(v.top[1]-v.top[0])*t}let w=u(n,m),T=r.grove.radius*c*w*i(.72,1.22);y.push({x0:l*e,lean:s,curve:-d*e*Math.pow(Math.min(1,(1-h)/.9),1.5),radius:T,phase:i(0,2*Math.PI),omega:r.wind.frequency*i(.65,1.5)*(1.15-.3*Math.min(1,w)),amp:r.wind.sway*c*w*i(.6,1.3),z:n,internode:2*T*i(r.grove.internode[0],r.grove.internode[1]),hue:o(),nodeOffset:i(0,400),seed:o(),scale:w,top:h*t,taper:i(320,560)*c*Math.min(1,w+.2),bendFrom:h*t+(1-h)*t*i(.45,.65)})}a=n(r.seed+31);for(let a=0;a<p.foreground.count;a++){let a=i(.88,1),n=u(a,m),l=r.grove.radius*c*n*i(.72,1.22),s=i(p.foreground.top[0],p.foreground.top[1]);y.push({x0:(p.foreground.centre+2*f()*p.foreground.spread)*e,lean:.05*f(),curve:0,radius:l,phase:i(0,2*Math.PI),omega:r.wind.frequency*i(.65,1.5)*.85,amp:r.wind.sway*c*n*i(.6,1.3),z:a,internode:2*l*i(r.grove.internode[0],r.grove.internode[1]),hue:o(),nodeOffset:i(0,400),seed:o(),scale:n,top:s*t,taper:i(320,560)*c,bendFrom:s*t+(1-s)*t*.5})}for(let l of(a=n(r.seed+47),p.extra)){let a=l.depth,n=u(a,m),s=r.grove.radius*c*n*i(.85,1.1);y.push({x0:l.x*e,lean:.02*f(),curve:-l.bow*e,radius:s,phase:i(0,2*Math.PI),omega:r.wind.frequency*i(.65,1.5)*(1.15-.3*Math.min(1,n)),amp:r.wind.sway*c*n*i(.6,1.3),z:a,internode:2*s*i(r.grove.internode[0],r.grove.internode[1]),hue:o(),nodeOffset:i(0,400),seed:o(),scale:n,top:l.top*t,taper:i(320,560)*c*Math.min(1,n+.2),bendFrom:l.top*t+(1-l.top)*t*i(.45,.65)})}let b=(e,r)=>{let a=Math.min(1.3,Math.max(0,(e.bendFrom-r)/(e.bendFrom-e.top)));return e.x0+e.lean*(r-t)+e.curve*a*a},w=(e,t)=>e.radius*(.2+.8*s(0,e.taper,t-e.top)),T=[],E=[],R=new Map,S=r.grove.foliage,A=1-S-.14,_=1-S+.14,M=(e,t,r,a,i,n,l,s,u,d,f)=>{T.push({z:e.z,v:[t,r,a,i,n,l,e.z,o(),e.x0,e.phase,e.omega,e.amp,s,u,d,f]})};for(let e=0;e<y.length;e++){let u=y[e];a=n(r.seed+7919*(e+1));let d=2*u.radius,m=.5>o()?-1:1,p=Math.max(520*c*u.scale,(t-u.top)*r.grove.crown),v=Math.ceil((u.top+2*u.radius-u.nodeOffset)/u.internode);for(let e=v;;e++){let t=u.nodeOffset+e*u.internode;if(t>h)break;m=-m;let a=.3+.7*s(A,_,function(e,t){let r=Math.floor(e),a=Math.floor(t),o=e-r,i=t-a,n=o*o*(3-2*o),s=i*i*(3-2*i),u=l(r,a),d=l(r+1,a),f=l(r,a+1);return u+(d-u)*n+(f-u)*s+(u-d-f+l(r+1,a+1))*n*s}(b(u,t)/(420*c)+9.1*u.z,t/(360*c)+5.3*u.z));if(a*=(1-s(.6,1,(t-u.top)/p))*Math.min(1,.35+.65*u.scale),o()>a)continue;let n=.28>o()?2:1;for(let e=0;e<n;e++){let a=0===e?m:-m,n=b(u,t)+a*w(u,t)*.8,l=i(0,2*Math.PI),c=d*i(3.2,8.5)*(.55+.45*s(0,.6*u.taper,t-u.top)),h=i(.6,1.3),p=a*Math.sin(h),v=-Math.cos(h),g=i(.2,.6),x=n+p*c*.6,y=t+v*c*.6,T=n+p*c,S=t+v*c+c*g,A=e=>{let r=1-e;return[r*r*n+2*r*e*x+e*e*T,r*r*t+2*r*e*y+e*e*S]},_=e=>{let r=2*(1-e)*(x-n)+2*e*(T-x),a=2*(1-e)*(y-t)+2*e*(S-y),o=Math.hypot(r,a)||1;return[r/o,a/o]},F=Math.max(.55,.15*u.radius),P=Math.max(.4,.06*u.radius);for(let e=0;e<5;e++){let r=e/5,a=(e+1)/5,[o,i]=A(r),[n,s]=A(a);M(u,o,i,n,s,F+(P-F)*r,F+(P-F)*a,c*r,c*a,l,t)}let D=[1];for(let e of(.85>o()&&D.push(i(.62,.8)),.6>o()&&D.push(i(.38,.55)),.3>o()&&D.push(i(.2,.34)),D)){let[a,n]=A(e),[s,m]=_(e),h=1===e?.25*f():(.5>o()?-1:1)*i(.35,.95),p=Math.cos(h),v=Math.sin(h),g=s*p-m*v,x=s*v+m*p+.35,y=Math.hypot(g,x)||1;g/=y,x/=y;let b=d*(1===e?i(.5,1.1):i(.8,2)),w=a+g*b,T=n+x*b;M(u,a,n,w,T,1.1*P,.7*P,c*e,c*e+b,l,t);let S=Math.atan2(x,g),F=3+Math.floor(4*o()),D=.5>o()?-1:1;for(let s=0;s<F;s++){let m=s===F-1,h=m?1:.3+.7*s/(F-1)+.04*f(),p=a+g*b*h,v=n+x*b*h;D=-D;let y=S+(m?.2*f():D*i(.3,.8)),w=Math.PI/2-y;y+=(w=Math.atan2(Math.sin(w),Math.cos(w)))*i(.2,.55);let T=c*e+b*h,A=d*i(r.grove.leafLength[0],r.grove.leafLength[1])*(m?1:i(.7,1)),_=Math.max(.9,A/i(6.2,8.6)*.5*i(.55,1.1)),M=(Math.cos(y)>=0?1:-1)*i(.03,.22),P={x:p,y:v,angle:y,length:A,halfWidth:_,culm:u,reach:T,branchPhase:l,attachY:t};E.push(P),R.set(P,[p,v,y,A,_,M,o(),(.5*u.hue+.5*o())*(.5>o()?1:-1),u.x0,u.phase,u.omega,u.amp,T,l,t,u.z])}}}}}if(a=n(r.seed+1),E.length>r.grove.maxLeaves){let e=r.grove.maxLeaves/E.length;E=E.filter(()=>o()<e)}let F=E.map(e=>({z:e.culm.z,v:R.get(e)})),P=[],D=Math.round(r.particles.count*Math.min(1.2,Math.max(.4,e/r.designWidth)));for(let e=0;e<D;e++){let e=o();if(E.length>0&&e<.66){let t=E[Math.floor(o()*E.length)],r=t.culm,a=o(),i=+(e>.58),n=i?170*c*r.scale:.8*t.halfWidth,l=t.x+Math.cos(t.angle)*t.length*a+f()*n,s=t.y+Math.sin(t.angle)*t.length*a+f()*n;P.push({z:r.z,v:[l,s,r.z,i,r.x0,r.phase,r.omega,r.amp,t.reach,t.branchPhase,t.attachY,o(),o(),o(),o(),r.scale]})}else{let e=y[Math.floor(o()*g)],t=i(e.top,h),r=b(e,t)+(2*o()-1)*w(e,t);P.push({z:e.z,v:[r,t,e.z,0,e.x0,e.phase,e.omega,e.amp,0,0,t,o(),o(),o(),o(),e.scale]})}}let L=[],B=Math.round(r.glyphs.columns*Math.min(1.2,Math.max(.5,e/r.designWidth)));for(let e=0;e<B;e++){let e=y[Math.floor(o()*g)],a=Math.min(m+.04,Math.max(.12,e.z+.12*f())),n=u(a,m),l=Math.max(6,r.glyphs.size*c*n*i(.8,1.15)),s=i(Math.max(.04*t,e.top-.22*t),.96*t),d=b(e,Math.max(s,e.top))+2*f()*90*c,h=Math.round(i(r.glyphs.length[0],r.glyphs.length[1])),p=o();for(let e=0;e<h;e++)L.push({z:a,v:[d,s+e*l*1.22,l,a,p,o(),e,h]})}return{culms:d(y.map(e=>({z:e.z,v:[e.x0,e.lean,e.curve,e.radius,e.phase,e.omega,e.amp,e.z,e.internode,e.hue,e.nodeOffset,e.seed,e.top,e.taper,e.bendFrom,0]})),16),branches:d(T,16),leaves:d(F,16),particles:d(P,16),glyphs:d(L,8),height:t,scale:c,yRef:t}}(es(),el(),t)).culms,16,D.culmStrip),branches:ei(L.branches,16,D.segmentQuad),leaves:ei(L.leaves,16,D.leafStrip),particles:ei(L.particles,16,null),glyphs:ei(L.glyphs,8,D.glyphQuad)},J=!0),J=!0,eg()}function ec(e){let r=L.scale,a=t.depth;o.useProgram(e.program),o.uniform1f(e.uniform("uTime"),Y*t.wind.speed),o.uniform2f(e.uniform("uView"),z,U),o.uniform1f(e.uniform("uDpr"),I),o.uniform1f(e.uniform("uOriginY"),N),o.uniform1f(e.uniform("uOriginX"),z-es()),o.uniform1f(e.uniform("uK"),r),o.uniform4f(e.uniform("uDepth"),a.focus,a.farBlur,a.nearBlur,0),o.uniform4f(e.uniform("uLight"),a.farLight,a.nearLight,a.farParallax,a.nearParallax),o.uniform4f(e.uniform("uSway"),L.height+200*r,2600*r,.0035/r,0),o.uniform4f(e.uniform("uFlutter"),t.wind.flutter,t.wind.flutterFrequency,0,0),o.uniform4f(e.uniform("uDissolve"),1/(t.dissolve.scale*r),t.dissolve.range[0],t.dissolve.range[1],t.dissolve.morph),o.uniform2f(e.uniform("uDrift"),t.dissolve.drift[0],t.dissolve.drift[1]),o.uniform3f(e.uniform("uField"),t.dissolve.offset[0],t.dissolve.offset[1],t.dissolve.phase);let i=t.dissolve.hold;o.uniform4f(e.uniform("uHold"),i.centre*es(),i.halfWidth*es(),i.level,i.strength),o.uniform4f(e.uniform("uRise"),t.dissolve.rise,L.height,t.dissolve.standing,0),o.uniform1f(e.uniform("uCell"),t.dissolve.cell),o.uniform1f(e.uniform("uGlow"),.9)}function em(t,r,a){o.bindFramebuffer(o.FRAMEBUFFER,a?a.framebuffer:null),o.viewport(0,0,a?a.width:e.width,a?a.height:e.height),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,r.texture),o.uniform1i(t.uniform("uSource"),0),o.uniform2f(t.uniform("uTexel"),1/r.width,1/r.height),o.drawArrays(o.TRIANGLES,0,3)}function eh(t){ee!==t&&(ee=t,e.style.visibility=t?"visible":"hidden")}function ep(e){if(c=0,f||!D)return;let r=ed();if("on"!==r){eh(!1),K=0,"waiting"===r&&eg();return}let a=K?e-K:16.7;K=e;let o=J||N!==Q||H!==Z;if(M){o&&ev(e);return}!function(e){if(ea>0)return ea--;if(er+=e,++et<75)return;let r=er/et;if(er=0,et=0,r<=t.slowFrameMs)return;let a=Math.min(window.devicePixelRatio||1,t.maxPixelRatio);a*V<=.8||(V=Math.max(.75/a,.78*V),ea=30,ef())}(a),(o||e-$>=t.idleFrameMs)&&(Y+=Math.min((e-($||e-16.7))/1e3,.1),ev(e)),eg()}function ev(r){!function(){if(!D||!L||!B||!C)return;let r=L.scale;o.bindFramebuffer(o.FRAMEBUFFER,C.framebuffer),o.viewport(0,0,C.width,C.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),ec(D.culm),o.uniform1f(D.culm.uniform("uYRef"),L.yRef),ec(D.branch),ec(D.leaf),ec(D.particle),o.uniform4f(D.particle.uniform("uParticle"),t.particles.size[0],t.particles.size[1],t.particles.reach[0],t.particles.reach[1]),o.uniform1f(D.particle.uniform("uBrightness"),t.particles.brightness),ec(D.glyph),o.uniform1f(D.glyph.uniform("uBrightness"),t.glyphs.brightness),o.uniform1f(D.glyph.uniform("uChangeRate"),t.glyphs.changeRate),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,D.atlas),o.uniform1i(D.glyph.uniform("uAtlas"),0);let a=(e,t,r,a)=>{let i=t.bins[r];i&&(o.useProgram(e.program),o.bindVertexArray(i),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,a,t.set.binStart[r+1]-t.set.binStart[r]))};for(let e=0;e<6;e++){a(D.culm,B.culms,e,80),a(D.branch,B.branches,e,4),a(D.leaf,B.leaves,e,20),a(D.glyph,B.glyphs,e,4);let t=B.particles.bins[e];if(t){let r=B.particles.set;o.useProgram(D.particle.program),o.bindVertexArray(t),o.drawArrays(o.POINTS,r.binStart[e],r.binStart[e+1]-r.binStart[e])}}o.disable(o.BLEND),o.bindVertexArray(D.emptyVao),o.useProgram(D.blurDown.program);let i=C;for(let e of k)em(D.blurDown,i,e),i=e;o.useProgram(D.blurUp.program);for(let e=k.length-2;e>=0;e--)em(D.blurUp,k[e+1],k[e]);let n=D.composite;o.useProgram(n.program),o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,e.width,e.height),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,C.texture),o.uniform1i(n.uniform("uScene"),0),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,k[0].texture),o.uniform1i(n.uniform("uBlurred"),1),o.uniform2f(n.uniform("uView"),z,U),o.uniform1f(n.uniform("uDpr"),I),o.uniform2f(n.uniform("uBand"),O,j),o.uniform3f(n.uniform("uBackground"),_[0],_[1],_[2]),o.uniform4f(n.uniform("uShield"),t.shield.dim,t.shield.blur,0,0),o.uniform4f(n.uniform("uPost"),t.post.exposure,t.post.bloom,t.post.bottomFade*r,0),o.uniform2f(n.uniform("uVeil"),t.veil.darken,t.veil.blur),o.uniform4fv(n.uniform("uRects"),X),o.uniform2fv(n.uniform("uRectFade"),q),o.uniform1i(n.uniform("uRectCount"),G),o.drawArrays(o.TRIANGLES,0,3),o.activeTexture(o.TEXTURE0),o.bindVertexArray(null)}(),eh(!0),$=r,Q=N,Z=H,J=!1}function eg(){c||f||document.hidden||!D||(c=requestAnimationFrame(ep))}let ex=()=>eg(),ey=()=>{K=0,$=0,eg()},eb=()=>{M=i.matches,J=!0,K=0,$=0,eg()},ew=e=>{e.preventDefault(),cancelAnimationFrame(c),c=0,D=null,B=null,C=null,k=[],L=null},eT=()=>{try{D=eo()}catch(e){console.error("[Bamboo]",e);return}z=0,ef()};try{D=eo()}catch(e){return console.error("[Bamboo]",e),null}let eE=new ResizeObserver(ef);return eE.observe(e),eE.observe(r),eE.observe(a),window.addEventListener("scroll",ex,{passive:!0}),document.addEventListener("visibilitychange",ey),i.addEventListener("change",eb),e.addEventListener("webglcontextlost",ew),e.addEventListener("webglcontextrestored",eT),e.style.visibility="hidden",ef(),eg(),{dispose(){if(f=!0,cancelAnimationFrame(c),eE.disconnect(),window.removeEventListener("scroll",ex),document.removeEventListener("visibilitychange",ey),i.removeEventListener("change",eb),e.removeEventListener("webglcontextlost",ew),e.removeEventListener("webglcontextrestored",eT),en(),eu(),D){for(let e of[D.culm,D.branch,D.leaf,D.particle,D.glyph,D.blurDown,D.blurUp,D.composite])o.deleteProgram(e.program);for(let e of[D.culmStrip,D.leafStrip,D.segmentQuad,D.glyphQuad])o.deleteBuffer(e);o.deleteTexture(D.atlas),o.deleteVertexArray(D.emptyVao),D=null}}}}(t,a);return()=>r?.dispose()},[]),(0,t.jsx)("canvas",{ref:e,className:o.default.canvas,"aria-hidden":"true"})}],67627)},34133,e=>{"use strict";let t=`
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
`,a=`#version 300 es
precision lowp float;
out vec4 outColor;
void main() { outColor = vec4(0.0); }
`,o=`#version 300 es
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
`,i=`#version 300 es
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
`,s=`#version 300 es
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
`;e.s(["ATTRIB",0,{home:0,pos:1,vel:2,fiber:3},"FIELD_FRAG",0,o,"POINT_FRAG",0,n,"POINT_VERT",0,i,"RESOLVE_FRAG",0,s,"SCREEN_VERT",0,l,"SIM_FRAG",0,a,"SIM_VERT",0,r])},63736,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(21168);let o={system:{a:1.4,center:[-3.4,-3.4,-3.4],extent:8.8,timeScale:.11},count:{high:45e4,medium:26e4,low:14e4},minCount:6e4,seeding:{lifetime:24,threadSpacing:.3,threadLength:[.3,1],threadsPerBundle:5,bundleSpread:.02,threadWidth:.0015,veilFraction:.3,veilWidth:.009,dustFraction:.12,dustSpread:.03},view:{tilt:0,spin:.7,stackedSpin:.9,driftAmount:.14,driftPeriod:46},render:{size:.5,sizeDepthBoost:.35,opacity:.26,exposure:2.1,depthFade:.82,shimmer:.3,shimmerSpeed:.2,energyGlint:.6,fadeRadius:[1.25,1.6],streak:{length:75,minLength:.45,softness:1.7,referenceSpeed:3},depthOfField:{amount:2.2,focus:.2,maxBlur:2.2},silk:{strength:1.2,level:3,knee:.25},bloom:{strength:.6,levels:6,knee:.5},scatter:{fraction:.3,spread:.035,tail:1.6,brightness:1,tint:.45,tintColor:"#7cc4e0"}},palette:[{at:.25,color:"#ffb86a"},{at:.42,color:"#ec9c94"},{at:.6,color:"#b994d4"},{at:.8,color:"#8c8ae0"},{at:1.05,color:"#6eaee0"}],paletteJitter:0,depthShade:.3,background:a.pageBackground,placement:{wide:{centerX:.77,centerY:.6,radiusByWidth:.42,radiusByHeight:.64},stacked:{centerX:.5,centerY:.5,radiusByWidth:.66,radiusByHeight:.34}},pointer:{radius:.13,strength:5,core:.08,speedBoost:.15,drag:.45,decay:.45,fade:5},disturbance:{resolution:192,radius:.1,strength:2.2,life:2.6,spread:1.4,selfAdvection:.9,carry:.05,coupling:.1},escapeRadius:1.9,cameraDistance:4.4,maxPixelRatio:2,slowFrameMs:21};function i(e,t,r=1){let a,{a:o,center:n,extent:l}=t.system,s=t.seeding,u=(a=0x1203ebb,()=>{let e=a=a+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}),d=()=>Math.sqrt(-2*Math.log(Math.max(u(),1e-7)))*Math.cos(2*Math.PI*u()),f=[0,0,0],c=(e,t,r)=>{f[0]=-o*e-4*t-4*r-t*t,f[1]=-o*t-4*r-4*e-r*r,f[2]=-o*r-4*e-4*t-e*e},m=[-1.48,-1.51,2.04],h=(e,t)=>{let[r,a,o]=e;c(r,a,o);let i=f[0],n=f[1],l=f[2];c(r+i*t/2,a+n*t/2,o+l*t/2);let s=f[0],u=f[1],d=f[2];c(r+s*t/2,a+u*t/2,o+d*t/2);let m=f[0],h=f[1],p=f[2];c(r+m*t,a+h*t,o+p*t),e[0]=r+t/6*(i+2*s+2*m+f[0]),e[1]=a+t/6*(n+2*u+2*h+f[1]),e[2]=o+t/6*(l+2*d+2*p+f[2])};for(let e=0;e<4e3;e++)h(m,.003);let p=new Float32Array(6*e),v=s.threadSpacing*r*l,[g,x]=s.threadLength,y=[0,0,0],b=0;for(;b<e;){let t=40+Math.floor(260*u());for(let e=0;e<t;e++)h(m,.003);for(let t=0;t<s.threadsPerBundle&&b<e;t++){y[0]=m[0]+d()*s.bundleSpread*l,y[1]=m[1]+d()*s.bundleSpread*l,y[2]=m[2]+d()*s.bundleSpread*l;let t=u(),a=Math.min(Math.max(8,Math.round((g+(x-g)*u())/(s.threadSpacing*r))),e-b);for(let e=0;e<a;e++){c(y[0],y[1],y[2]),h(y,Math.min(v/(Math.hypot(f[0],f[1],f[2])||1),.01));let r=u(),o=(r<s.dustFraction?s.dustSpread:r<s.dustFraction+s.veilFraction?s.veilWidth:s.threadWidth)*l,i=6*b;p[i]=(y[0]+d()*o-n[0])/l,p[i+1]=(y[1]+d()*o-n[1])/l,p[i+2]=(y[2]+d()*o-n[2])/l,p[i+3]=u(),p[i+4]=a>1?e/(a-1):.5,p[i+5]=t,b++}}}return p}var n=e.i(34133);let l=`#version 300 es
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
`,s=`#version 300 es
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
uniform float uHaloFraction;  // share of particles that scatter off their strand
uniform float uHaloSpread;    // typical scatter distance (normalised units)
uniform float uHaloTail;      // > 1 = a few particles stray much further
uniform float uHaloBrightness;
uniform vec3  uPalette[5];
uniform float uPaletteAt[5];
uniform float uPaletteJitter;
uniform float uDepthShade;
uniform float uHaloTint;
uniform vec3  uHaloTintColor;

// System (for the direction of motion) and streak / depth-of-field shaping.
uniform float uA;
uniform vec3  uSysCenter;
uniform float uExtent;
uniform float uTimeScale;
uniform float uStreakLength;  // device px at the reference speed
uniform float uStreakWidth;   // softness: multiplier on the cross-section
uniform float uSpeedRef;      // projected speed (normalised units / s) that gives uStreakLength
uniform float uStreakMin;     // shortest streak, as a fraction of uStreakLength
uniform float uDofAmount;
uniform float uDofFocus;      // world z of the focal plane (0 = attractor centre, +1 = front)
uniform float uMaxSigma;      // device px

out vec3 vColor;
out vec2 vLocal;              // px in the streak's frame: x along, y across
flat out float vHalfLen;
flat out float vInvTwoSigma2;

vec3 halvorsen(vec3 q) {
  vec3 p = q * uExtent + uSysCenter;
  vec3 dp = vec3(
    -uA * p.x - 4.0 * p.y - 4.0 * p.z - p.y * p.y,
    -uA * p.y - 4.0 * p.z - 4.0 * p.x - p.z * p.z,
    -uA * p.z - 4.0 * p.x - 4.0 * p.y - p.x * p.x
  );
  return dp / uExtent;
}

void main() {
  float seed = aSeed.w;

  // Scatter: a share of particles is drawn at a fixed random offset from its
  // strand, with distances that thin out gradually (exponential, long tail).
  // Density then falls off smoothly instead of stopping at a crisp edge. The
  // offset is applied only when drawing – the simulated state stays on the
  // attractor, so the dynamics are unaffected.
  float h1 = fract(seed * 53.17 + 0.13);
  float h2 = fract(seed * 129.898 + 0.31);
  float h3 = fract(seed * 78.233 + 0.71);
  float h4 = fract(seed * 41.37 + 0.17);
  float halo = step(h1, uHaloFraction);
  float cz = h2 * 2.0 - 1.0;
  float ang = h3 * 6.2832;
  vec3 dir = vec3(sqrt(1.0 - cz * cz) * vec2(cos(ang), sin(ang)), cz);
  float dist = uHaloSpread * pow(-log(max(h4, 1e-4)), uHaloTail);
  vec3 drawPos = aPos + dir * dist * halo;

  vec3 world = uView * drawPos;
  float persp = uCamDist / max(uCamDist - world.z, 0.2);
  vec2 ndc = uCenter + world.xy * persp * uScale;

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

  // Colour by distance from the centre: piecewise-linear through the palette.
  // Each particle looks its colour up at a randomly shifted radius, so
  // neighbouring hues interleave and the transitions read as a smooth blend.
  float jitter = (fract(seed * 17.31 + 0.47) + fract(seed * 63.71 + 0.83) - 1.0) * uPaletteJitter;
  float r = length(aPos) + jitter;
  vec3 color = uPalette[0];
  for (int i = 1; i < 5; i++) {
    float t = clamp((r - uPaletteAt[i - 1]) / max(uPaletteAt[i] - uPaletteAt[i - 1], 1e-4), 0.0, 1.0);
    color = mix(color, uPalette[i], t);
  }
  color = mix(color, uHaloTintColor, halo * uHaloTint);
  color *= mix(1.0 - uDepthShade, 1.0, front);
  color = mix(color, vec3(0.94, 0.97, 1.0), energy * 0.6);

  float alpha = uOpacity * coverage * taper * shimmer * depth * life * stray * mix(1.0, uHaloBrightness, halo)
    * mix(0.65, 1.35, fract(seed * 37.73)) * (1.0 + uEnergyGlint * energy);

  // ---- streak: stretched along the projected direction of motion ----
  // Velocity = the ODE's own flow plus any pointer kick (both per second).
  vec3 vel = uView * (halvorsen(aPos) * uTimeScale + aVel);
  vec2 screenVel = vel.xy * persp * uScale * uResolution; // ∝ px / s (direction only matters)
  float projSpeed = length(vel.xy) * persp;
  vec2 motionDir = length(screenVel) > 1e-6 ? normalize(screenVel) : vec2(1.0, 0.0);
  float len = uStreakLength * clamp(projSpeed / uSpeedRef, uStreakMin, 2.5);

  // Depth of field: away from the focal plane the cross-section widens.
  float blur = 1.0 + uDofAmount * pow(abs(world.z - uDofFocus), 1.5);
  float sigma0 = sigma;
  sigma = min(sigma * uStreakWidth * blur, uMaxSigma);

  // Same total light as the original point, now spread over the streak – so
  // single particles get fainter and softer and neighbours melt together.
  float area = 6.2832 * sigma * sigma + 2.5066 * sigma * len;
  alpha *= 6.2832 * sigma0 * sigma0 / area;

  vColor = color * alpha;
  vHalfLen = 0.5 * len;
  vInvTwoSigma2 = 1.0 / (2.0 * sigma * sigma);

  // Faded-out particles cost nothing: collapse the quad off screen.
  if (alpha < 1e-6) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    vLocal = vec2(0.0);
    return;
  }

  vec2 corner = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)) * 2.0 - 1.0;
  vec2 extent = vec2(vHalfLen + 3.0 * sigma, 3.0 * sigma);
  vLocal = corner * extent;
  vec2 centerPx = (ndc * 0.5 + 0.5) * uResolution;
  vec2 px = centerPx + motionDir * vLocal.x + vec2(-motionDir.y, motionDir.x) * vLocal.y;
  gl_Position = vec4(px / uResolution * 2.0 - 1.0, 0.0, 1.0);
}
`,u=`#version 300 es
precision highp float;

in vec3 vColor;
in vec2 vLocal;
flat in float vHalfLen;
flat in float vInvTwoSigma2;
out vec4 outColor;

void main() {
  // Gaussian capsule: distance to the streak's centre segment, tapered towards
  // its ends so it reads as a fine filament rather than a bar.
  float dx = max(abs(vLocal.x) - vHalfLen, 0.0);
  float w = exp(-(dx * dx + vLocal.y * vLocal.y) * vInvTwoSigma2);
  float t = clamp(abs(vLocal.x) / max(vHalfLen, 1e-3), 0.0, 1.0);
  w *= 1.0 - 0.45 * t * t;
  outColor = vec4(vColor * w, 0.0);
}
`,d=`#version 300 es
precision highp float;

uniform sampler2D uSrc;
uniform vec2 uSrcTexel;
uniform vec2 uDstTexel;
out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy * uDstTexel;
  vec2 o = uSrcTexel;
  vec3 sum = texture(uSrc, uv).rgb * 4.0
    + texture(uSrc, uv - o).rgb
    + texture(uSrc, uv + o).rgb
    + texture(uSrc, uv + vec2(o.x, -o.y)).rgb
    + texture(uSrc, uv - vec2(o.x, -o.y)).rgb;
  outColor = vec4(sum / 8.0, 1.0);
}
`,f=`#version 300 es
precision highp float;

uniform sampler2D uSrc;   // lower (coarser) level
uniform sampler2D uBase;  // this level from the down chain
uniform vec2 uSrcTexel;
uniform vec2 uDstTexel;
out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy * uDstTexel;
  vec2 o = uSrcTexel;
  vec3 sum = texture(uSrc, uv + vec2(-2.0 * o.x, 0.0)).rgb
    + texture(uSrc, uv + vec2(2.0 * o.x, 0.0)).rgb
    + texture(uSrc, uv + vec2(0.0, -2.0 * o.y)).rgb
    + texture(uSrc, uv + vec2(0.0, 2.0 * o.y)).rgb
    + 2.0 * texture(uSrc, uv + vec2(-o.x, o.y)).rgb
    + 2.0 * texture(uSrc, uv + o).rgb
    + 2.0 * texture(uSrc, uv + vec2(o.x, -o.y)).rgb
    + 2.0 * texture(uSrc, uv - o).rgb;
  outColor = vec4(sum / 12.0 + texture(uBase, uv).rgb, 1.0);
}
`,c=`#version 300 es
precision highp float;

uniform sampler2D uLight;
uniform sampler2D uSilk;
uniform sampler2D uBloom;
uniform vec3  uBackground;
uniform float uExposure;
uniform vec2  uSilkTexel;
uniform float uSilkStrength;
uniform float uSilkKnee;
uniform float uBloomStrength;
uniform float uBloomKnee;
uniform float uBloomNorm;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

void main() {
  vec2 size = vec2(textureSize(uLight, 0));
  vec2 uv = gl_FragCoord.xy / size;
  vec3 light = texelFetch(uLight, ivec2(gl_FragCoord.xy), 0).rgb * uExposure;

  if (uSilkStrength > 0.0) {
    // 4-tap tent so the coarse level upsamples without blockiness.
    vec2 o = uSilkTexel * 0.5;
    vec3 silk = 0.25 * (texture(uSilk, uv + vec2(-o.x, -o.y)).rgb + texture(uSilk, uv + vec2(o.x, -o.y)).rgb
                      + texture(uSilk, uv + vec2(-o.x, o.y)).rgb + texture(uSilk, uv + vec2(o.x, o.y)).rgb) * uExposure;
    float l = luma(silk);
    light += silk * (l / (l + uSilkKnee)) * uSilkStrength;
  }
  if (uBloomStrength > 0.0) {
    vec3 bloom = texture(uBloom, uv).rgb * uBloomNorm * uExposure;
    float l = luma(bloom);
    light += bloom * (l / (l + uBloomKnee)) * uBloomStrength;
  }

  // Soft shoulder on luminance (keeps hue).
  float lum = luma(light);
  float mapped = 1.0 - exp(-lum);
  vec3 color = light * (mapped / max(lum, 1e-5));

  float n = hash(gl_FragCoord.xy) + hash(gl_FragCoord.xy + 17.13) - 1.0;
  outColor = vec4(uBackground + color + n / 255.0, 1.0);
}
`;function m(e){let t=e.replace("#",""),r=parseInt(3===t.length?t.replace(/./g,e=>e+e):t,16);return[(r>>16&255)/255,(r>>8&255)/255,(255&r)/255]}function h(e,t,r){let a=e.createShader(t);if(e.shaderSource(a,r),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(a);throw e.deleteShader(a),Error(`Shader compile failed: ${t}`)}return a}function p(e,t,r,a){let o=e.createProgram(),i=h(e,e.VERTEX_SHADER,t),n=h(e,e.FRAGMENT_SHADER,r);if(e.attachShader(o,i),e.attachShader(o,n),a&&e.transformFeedbackVaryings(o,a,e.INTERLEAVED_ATTRIBS),e.linkProgram(o),e.deleteShader(i),e.deleteShader(n),!e.getProgramParameter(o,e.LINK_STATUS)){let t=e.getProgramInfoLog(o);throw e.deleteProgram(o),Error(`Program link failed: ${t}`)}return o}function v(e,t,r){let a={};for(let o of r)a[o]=e.getUniformLocation(t,o);return a}function g(e,t,r,a=!1){let o=e.createTexture();e.bindTexture(e.TEXTURE_2D,o),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,t,r);let i=a?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0);let l=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return(e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,null),l)?{texture:o,framebuffer:n,width:t,height:r}:(e.deleteTexture(o),e.deleteFramebuffer(n),null)}function x(e,t,r){let a=1/Math.sqrt(3),o=[1/Math.SQRT2,-1/Math.SQRT2,0],i=[1/Math.sqrt(6),1/Math.sqrt(6),-2/Math.sqrt(6)],n=[a,a,a],l=t/e.driftPeriod*Math.PI*2,s=e.tilt+e.driftAmount*Math.sin(l),u=(r?e.stackedSpin:e.spin)+.8*e.driftAmount*Math.sin(.63*l+1.3),d=Math.cos(s),f=Math.sin(s),c=Math.cos(u),m=Math.sin(u),h=[];for(let e of[0,1,2]){let t=o[e],r=i[e],a=n[e],l=c*t-m*r,s=m*t+c*r;h.push([l,d*s-f*a,f*s+d*a])}return new Float32Array([...h[0],...h[1],...h[2]])}function y(e){let t=e.offsetParent;return t instanceof HTMLElement?{width:t.clientWidth,left:t.getBoundingClientRect().left-e.getBoundingClientRect().left}:{width:e.clientWidth,left:0}}function b(e,t,r,a){let o=a?e.placement.stacked:e.placement.wide;return{cx:t*o.centerX,cy:r*o.centerY,radius:Math.max(40,Math.min(t*o.radiusByWidth,r*o.radiusByHeight))}}function w(e){let t=e.palette.slice(0,5);for(;t.length<5;)t.push({...t[t.length-1],at:t[t.length-1].at+1});return{colors:new Float32Array(t.flatMap(e=>[...m(e.color)])),at:new Float32Array(t.map(e=>e.at))}}function T(e,t){let r=e.getContext("2d");if(!r)return null;let o=i(14e3,t,t.count.high/14e3),n=window.matchMedia(a.STACKED_LAYOUT_QUERY),l=()=>{let a=e.clientWidth,i=e.clientHeight;if(!a||!i)return;let l=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(a*l),e.height=Math.round(i*l),r.setTransform(l,0,0,l,0,0),r.fillStyle=t.background,r.fillRect(0,0,a,i);let s=y(e),u=b(t,s.width,i,n.matches),{cy:d,radius:f}=u,c=u.cx+s.left,m=x(t.view,0,n.matches);for(let e=0;e<14e3;e++){let a=o[6*e],i=o[6*e+1],n=o[6*e+2],l=m[0]*a+m[3]*i+m[6]*n,s=m[1]*a+m[4]*i+m[7]*n,u=m[2]*a+m[5]*i+m[8]*n,h=t.cameraDistance/(t.cameraDistance-u),p=.5*u+.5,[v,g,x]=(function(e,t){let{colors:r,at:a}=w(e),o=[r[0],r[1],r[2]];for(let e=1;e<5;e++){let i=Math.min(1,Math.max(0,(t-a[e-1])/Math.max(a[e]-a[e-1],1e-4)));o=o.map((t,a)=>t+(r[3*e+a]-t)*i)}return o})(t,Math.hypot(a,i,n)+(Math.random()+Math.random()-1)*t.paletteJitter).map(e=>Math.round(255*e));r.fillStyle=`rgba(${v},${g},${x},${.1+.5*p*p})`,r.fillRect(c+l*h*f,d-s*h*f,1,1)}},s=new ResizeObserver(l);return s.observe(e),l(),{dispose:()=>s.disconnect()}}e.s(["default",0,function({className:e}){let h=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=h.current;if(!e)return;let t=function(e,t){if(!function(){let e=document.createElement("canvas").getContext("webgl2");if(!e)return!1;let t=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float");return e.getExtension("WEBGL_lose_context")?.loseContext(),t}())return T(e,t);let r=e.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!r)return T(e,t);r.getExtension("EXT_color_buffer_float")||r.getExtension("EXT_color_buffer_half_float");let o=t.render,h=function(e){let t=navigator,r=window.matchMedia("(pointer: coarse)").matches,a=700>Math.min(window.innerWidth,window.innerHeight);if(r||a)return e.count.low;let o=t.hardwareConcurrency??8,i=t.deviceMemory??8;return o<=4||i<=4?e.count.medium:e.count.high}(t),E=i(h,t,t.count.high/h),R=window.matchMedia("(prefers-reduced-motion: reduce)"),S=window.matchMedia(a.STACKED_LAYOUT_QUERY),A=!1,_=0,M=!0,F=R.matches,P=h,D=1,L=0,B=0,C=1,k={cx:0,cy:0,radius:1},z=0,U=0,I=0,V=F,N=0,O=0,j=45,W={clientX:0,clientY:0,hasPosition:!1,present:!1,active:0,x:0,y:0,vx:0,vy:0,initialised:!1},X=["uTime","uDt","uSnap","uA","uCenter","uExtent","uTimeScale","uLifetime","uEscapeRadius","uView","uCamDist","uRayOrigin","uRayDir","uPointerVel","uPointerActive","uPushRadius","uPushStrength","uPushCore","uPushSpeedBoost","uPointerDrag","uPushDecay","uDisturbance","uDisturbanceExtent","uDisturbanceCoupling"],q=["uPrev","uTexel","uExtent","uDt","uTime","uPointer","uPointerVel","uPointerActive","uRadius","uInject","uLife","uSpread","uSelfAdvect","uCarry"],G=["uView","uCenter","uScale","uResolution","uCamDist","uTime","uLifetime","uSize","uSizeDepthBoost","uOpacity","uDepthFade","uShimmer","uShimmerSpeed","uEnergyGlint","uFadeRadius","uHaloFraction","uHaloSpread","uHaloTail","uHaloBrightness","uPalette","uPaletteAt","uPaletteJitter","uDepthShade","uHaloTint","uHaloTintColor","uA","uSysCenter","uExtent","uTimeScale","uStreakLength","uStreakWidth","uSpeedRef","uStreakMin","uDofAmount","uDofFocus","uMaxSigma"],H=["uSrc","uBase","uSrcTexel","uDstTexel"],Y=["uLight","uSilk","uBloom","uBackground","uExposure","uSilkTexel","uSilkStrength","uSilkKnee","uBloomStrength","uBloomKnee","uBloomNorm"],K=null,$=Math.max(2,Math.min(8,Math.round(o.bloom.levels))),Q=[],Z=[],J=t.disturbance,ee=null,et=0,er=null;function ea(){let e=p(r,l,n.SIM_FRAG,["vPos","vVel"]),t=p(r,n.SCREEN_VERT,n.FIELD_FRAG),a=p(r,s,u),o=p(r,n.SCREEN_VERT,d),i=p(r,n.SCREEN_VERT,f),m=Math.max(32,Math.round(J.resolution)),x=g(r,m,m,!0),y=g(r,m,m,!0);if(!x||!y)throw Error("Float render targets are not available");for(let e of[x,y])r.bindFramebuffer(r.FRAMEBUFFER,e.framebuffer),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT);r.bindFramebuffer(r.FRAMEBUFFER,null),ee=[x,y],et=0;let b=p(r,n.SCREEN_VERT,c),w=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,w),r.bufferData(r.ARRAY_BUFFER,E,r.STATIC_DRAW);let T=new Float32Array(6*h);for(let e=0;e<h;e++)T[6*e]=E[6*e],T[6*e+1]=E[6*e+1],T[6*e+2]=E[6*e+2];let R=()=>{let e=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,e),r.bufferData(r.ARRAY_BUFFER,T,r.DYNAMIC_COPY),e},S=[R(),R()],A=(e,t)=>{let a=r.createVertexArray();if(r.bindVertexArray(a),r.bindBuffer(r.ARRAY_BUFFER,w),r.enableVertexAttribArray(n.ATTRIB.home),r.vertexAttribPointer(n.ATTRIB.home,4,r.FLOAT,!1,24,0),r.enableVertexAttribArray(n.ATTRIB.fiber),r.vertexAttribPointer(n.ATTRIB.fiber,2,r.FLOAT,!1,24,16),r.bindBuffer(r.ARRAY_BUFFER,e),r.enableVertexAttribArray(n.ATTRIB.pos),r.vertexAttribPointer(n.ATTRIB.pos,3,r.FLOAT,!1,24,0),r.enableVertexAttribArray(n.ATTRIB.vel),r.vertexAttribPointer(n.ATTRIB.vel,3,r.FLOAT,!1,24,12),t)for(let e of[n.ATTRIB.home,n.ATTRIB.fiber,n.ATTRIB.pos,n.ATTRIB.vel])r.vertexAttribDivisor(e,1);return r.bindVertexArray(null),a},_=[A(S[0],!1),A(S[1],!1)],M=[A(S[0],!0),A(S[1],!0)];r.bindBuffer(r.ARRAY_BUFFER,null);let F=r.createTransformFeedback(),P=r.createVertexArray();return r.disable(r.DEPTH_TEST),r.blendFunc(r.ONE,r.ONE),r.clearColor(0,0,0,0),{simProgram:e,fieldProgram:t,pointProgram:a,downProgram:o,upProgram:i,resolveProgram:b,homeBuffer:w,stateBuffers:S,vaos:_,drawVaos:M,screenVao:P,feedback:F,sim:v(r,e,X),field:v(r,t,q),point:v(r,a,G),down:v(r,o,H),up:v(r,i,H),resolve:v(r,b,Y)}}function eo(){for(let e of[K,...Q,...Z])e&&(r.deleteTexture(e.texture),r.deleteFramebuffer(e.framebuffer));K=null,Q=[],Z=[]}function ei(){let a=e.clientWidth,o=e.clientHeight;if(!a||!o)return;L=a,B=o;let i=Math.max(1,Math.round(a*(C=Math.min(window.devicePixelRatio||1,t.maxPixelRatio)*D))),n=Math.max(1,Math.round(o*C));(e.width!==i||e.height!==n)&&(e.width=i,e.height=n);let l=y(e);k=b(t,l.width,o,S.matches),k.cx+=l.left,function(e,t){if(!K||K.width!==e||K.height!==t){if(eo(),!(K=g(r,e,t,!0)))return console.error("[Attractor] float render target is not available");for(let a=0;a<$;a++){let o=Math.max(1,Math.ceil(e/2**(a+1))),i=Math.max(1,Math.ceil(t/2**(a+1))),n=g(r,o,i,!0),l=a<$-1?g(r,o,i,!0):null;if(!n||a<$-1&&!l){console.error("[Attractor] blur targets are not available"),Q=[],Z=[];return}Q.push(n),l&&Z.push(l)}}}(e.width,e.height),F&&ed()}function en(e,a){if(!er)return;let o=er.sim;r.useProgram(er.simProgram),r.uniform1f(o.uTime,z),r.uniform1f(o.uDt,e),r.uniform1f(o.uSnap,+!!a),r.uniform1f(o.uA,t.system.a),r.uniform3fv(o.uCenter,t.system.center),r.uniform1f(o.uExtent,t.system.extent),r.uniform1f(o.uTimeScale,t.system.timeScale),r.uniform1f(o.uLifetime,t.seeding.lifetime),r.uniform1f(o.uEscapeRadius,t.escapeRadius),r.uniformMatrix3fv(o.uView,!1,x(t.view,z,S.matches)),r.uniform1f(o.uCamDist,t.cameraDistance);let i=t.cameraDistance,n=Math.hypot(W.x,W.y,i);r.uniform3f(o.uRayOrigin,0,0,i),r.uniform3f(o.uRayDir,W.x/n,W.y/n,-i/n),r.uniform3f(o.uPointerVel,W.vx,W.vy,0),r.uniform1f(o.uPointerActive,W.active),r.uniform1f(o.uPushRadius,t.pointer.radius),r.uniform1f(o.uPushStrength,t.pointer.strength),r.uniform1f(o.uPushCore,t.pointer.core),r.uniform1f(o.uPushSpeedBoost,t.pointer.speedBoost),r.uniform1f(o.uPointerDrag,t.pointer.drag),r.uniform1f(o.uPushDecay,t.pointer.decay),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,ee?ee[et].texture:null),r.uniform1i(o.uDisturbance,0),r.uniform1f(o.uDisturbanceExtent,1.6),r.uniform1f(o.uDisturbanceCoupling,J.coupling);let l=1-I;r.bindVertexArray(er.vaos[I]),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,er.feedback),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,er.stateBuffers[l]),r.enable(r.RASTERIZER_DISCARD),r.beginTransformFeedback(r.POINTS),r.drawArrays(r.POINTS,0,P),r.endTransformFeedback(),r.disable(r.RASTERIZER_DISCARD),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,null),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,null),I=l}function el(){if(!er||!K||!L)return;let a=er.point;r.bindFramebuffer(r.FRAMEBUFFER,K.framebuffer),r.viewport(0,0,K.width,K.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.useProgram(er.pointProgram),r.uniform2f(a.uCenter,k.cx/L*2-1,1-k.cy/B*2),r.uniform2f(a.uScale,2*k.radius/L,2*k.radius/B),r.uniform2f(a.uResolution,K.width,K.height),r.uniform1f(a.uCamDist,t.cameraDistance),r.uniform1f(a.uTime,z),r.uniform1f(a.uSize,o.size*C),r.uniform1f(a.uSizeDepthBoost,o.sizeDepthBoost);let i=k.radius*C,n=t.count.high/P,l=1/(o.size*C)**2;r.uniform1f(a.uOpacity,o.opacity*(i*i/518400)*n*Math.max(l,1)),r.uniform1f(a.uDepthFade,o.depthFade),r.uniform1f(a.uShimmer,o.shimmer),r.uniform1f(a.uShimmerSpeed,o.shimmerSpeed),r.uniform1f(a.uEnergyGlint,o.energyGlint),r.uniformMatrix3fv(a.uView,!1,x(t.view,z,S.matches)),r.uniform1f(a.uLifetime,t.seeding.lifetime),r.uniform2f(a.uFadeRadius,o.fadeRadius[0],o.fadeRadius[1]),r.uniform1f(a.uHaloFraction,o.scatter.fraction),r.uniform1f(a.uHaloSpread,o.scatter.spread),r.uniform1f(a.uHaloTail,o.scatter.tail),r.uniform1f(a.uHaloBrightness,o.scatter.brightness);let s=w(t);r.uniform3fv(a.uPalette,s.colors),r.uniform1fv(a.uPaletteAt,s.at),r.uniform1f(a.uPaletteJitter,t.paletteJitter),r.uniform1f(a.uDepthShade,t.depthShade),r.uniform1f(a.uHaloTint,o.scatter.tint),r.uniform3fv(a.uHaloTintColor,m(o.scatter.tintColor)),r.uniform1f(a.uA,t.system.a),r.uniform3fv(a.uSysCenter,t.system.center),r.uniform1f(a.uExtent,t.system.extent),r.uniform1f(a.uTimeScale,t.system.timeScale);let u=K.width/L;r.uniform1f(a.uStreakLength,o.streak.length*u),r.uniform1f(a.uStreakWidth,o.streak.softness),r.uniform1f(a.uSpeedRef,Math.max(1e-4,o.streak.referenceSpeed*t.system.timeScale)),r.uniform1f(a.uStreakMin,o.streak.minLength),r.uniform1f(a.uDofAmount,o.depthOfField.amount),r.uniform1f(a.uDofFocus,o.depthOfField.focus),r.uniform1f(a.uMaxSigma,Math.max(.5,o.depthOfField.maxBlur*u)),r.bindVertexArray(er.drawVaos[I]),r.drawArraysInstanced(r.TRIANGLE_STRIP,0,4,P),r.disable(r.BLEND);let d=(o.silk.strength>0||o.bloom.strength>0)&&Q.length===$;d&&function(e){if(!er)return;r.bindVertexArray(er.screenVao),r.useProgram(er.downProgram),r.uniform1i(er.down.uSrc,0),r.activeTexture(r.TEXTURE0);let t=e;for(let e of Q)r.bindFramebuffer(r.FRAMEBUFFER,e.framebuffer),r.viewport(0,0,e.width,e.height),r.bindTexture(r.TEXTURE_2D,t.texture),r.uniform2f(er.down.uSrcTexel,1/t.width,1/t.height),r.uniform2f(er.down.uDstTexel,1/e.width,1/e.height),r.drawArrays(r.TRIANGLES,0,3),t=e;r.useProgram(er.upProgram),r.uniform1i(er.up.uSrc,0),r.uniform1i(er.up.uBase,1);let a=Q[Q.length-1];for(let e=Z.length-1;e>=0;e--){let t=Z[e];r.bindFramebuffer(r.FRAMEBUFFER,t.framebuffer),r.viewport(0,0,t.width,t.height),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,a.texture),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,Q[e].texture),r.uniform2f(er.up.uSrcTexel,1/a.width,1/a.height),r.uniform2f(er.up.uDstTexel,1/t.width,1/t.height),r.drawArrays(r.TRIANGLES,0,3),a=t}r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,null),r.activeTexture(r.TEXTURE0)}(K);let f=er.resolve;r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,e.width,e.height),r.useProgram(er.resolveProgram),r.bindVertexArray(er.screenVao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,K.texture),r.uniform1i(f.uLight,0),r.uniform3fv(f.uBackground,m(t.background)),r.uniform1f(f.uExposure,o.exposure);let c=Q[Math.min(Math.max(0,Math.round(o.silk.level)-1),Q.length-1)];for(let e of(r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,d?c.texture:K.texture),r.uniform1i(f.uSilk,1),r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,d?Z[0].texture:K.texture),r.uniform1i(f.uBloom,2),r.uniform2f(f.uSilkTexel,d?1/c.width:0,d?1/c.height:0),r.uniform1f(f.uSilkStrength,d?o.silk.strength:0),r.uniform1f(f.uSilkKnee,Math.max(1e-4,o.silk.knee)),r.uniform1f(f.uBloomStrength,d?o.bloom.strength:0),r.uniform1f(f.uBloomKnee,Math.max(1e-4,o.bloom.knee)),r.uniform1f(f.uBloomNorm,1/$),r.drawArrays(r.TRIANGLES,0,3),[r.TEXTURE2,r.TEXTURE1,r.TEXTURE0]))r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,null);r.bindVertexArray(null)}function es(a){if(_=0,A||!er)return;let o=U?a-U:16.7;U=a;let i=Math.min(Math.max(o/1e3,1/240),1/30);z+=i,function(r){let a=W.present&&W.hasPosition?1:0;if(W.active+=(a-W.active)*(1-Math.exp(-r*t.pointer.fade)),!W.hasPosition)return;let o=e.getBoundingClientRect(),i=(W.clientX-o.left-k.cx)/k.radius,n=-(W.clientY-o.top-k.cy)/k.radius;if(!W.initialised){W.x=i,W.y=n,W.vx=0,W.vy=0,W.initialised=!0;return}let l=1-Math.exp(-(28*r)),s=W.x+(i-W.x)*l,u=W.y+(n-W.y)*l,d=1-Math.exp(-(10*r));W.vx+=((s-W.x)/r-W.vx)*d,W.vy+=((u-W.y)/r-W.vy)*d,W.x=s,W.y=u}(i),function(e){if(!er||!ee)return;let t=ee[et],a=ee[1-et],o=er.field;r.bindFramebuffer(r.FRAMEBUFFER,a.framebuffer),r.viewport(0,0,a.width,a.height),r.disable(r.BLEND),r.useProgram(er.fieldProgram),r.bindVertexArray(er.screenVao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,t.texture),r.uniform1i(o.uPrev,0),r.uniform2f(o.uTexel,1/a.width,1/a.height),r.uniform1f(o.uExtent,1.6),r.uniform1f(o.uDt,e),r.uniform1f(o.uTime,z),r.uniform2f(o.uPointer,W.x,W.y),r.uniform2f(o.uPointerVel,W.vx,W.vy),r.uniform1f(o.uPointerActive,W.active),r.uniform1f(o.uRadius,J.radius),r.uniform1f(o.uInject,J.strength),r.uniform1f(o.uLife,J.life),r.uniform1f(o.uSpread,J.spread),r.uniform1f(o.uSelfAdvect,J.selfAdvection),r.uniform1f(o.uCarry,J.carry),r.drawArrays(r.TRIANGLES,0,3),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindVertexArray(null),et=1-et}(i),en(i,!1),el(),function(e){if(j>0)return j--;if(O+=e,++N<75)return;let r=O/N;if(O=0,N=0,r<=t.slowFrameMs)return;let a=Math.min(window.devicePixelRatio||1,t.maxPixelRatio);a*D>1.3?(D=Math.max(1.25/a,.75*D),ei()):P>t.minCount&&(P=Math.max(t.minCount,Math.floor(.65*P))),j=30}(o),eu()}function eu(){_||A||F||!M||document.hidden||!er||(_=requestAnimationFrame(es))}function ed(){_||A||!er||(_=requestAnimationFrame(()=>{_=0,!A&&er&&(V&&(en(0,!0),V=!1),el())}))}let ef=e=>{W.clientX=e.clientX,W.clientY=e.clientY,W.hasPosition=!0,W.present||(W.initialised=!1),W.present=!0},ec=()=>{W.present=!1},em=e=>{"mouse"!==e.pointerType&&(W.present=!1)},eh=()=>{U=0,eu()},ep=()=>{F=R.matches,U=0,F?(V=!0,ed()):eu()},ev=e=>{e.preventDefault(),cancelAnimationFrame(_),_=0,er=null,K=null,Q=[],Z=[],ee=null},eg=()=>{try{er=ea()}catch(e){console.error("[Attractor]",e);return}I=0,U=0,V=F,ei(),eu()};try{er=ea()}catch(e){return console.error("[Attractor]",e),null}let ex=new ResizeObserver(ei);ex.observe(e);let ey=new IntersectionObserver(([e])=>{M=e.isIntersecting,U=0,eu()});return ey.observe(e),window.addEventListener("pointermove",ef,{passive:!0}),window.addEventListener("pointerdown",ef,{passive:!0}),window.addEventListener("pointerup",em,{passive:!0}),window.addEventListener("pointercancel",em,{passive:!0}),window.addEventListener("blur",ec),document.documentElement.addEventListener("pointerleave",ec),document.addEventListener("visibilitychange",eh),R.addEventListener("change",ep),S.addEventListener("change",ei),e.addEventListener("webglcontextlost",ev),e.addEventListener("webglcontextrestored",eg),ei(),F?ed():eu(),{dispose(){if(A=!0,cancelAnimationFrame(_),ex.disconnect(),ey.disconnect(),window.removeEventListener("pointermove",ef),window.removeEventListener("pointerdown",ef),window.removeEventListener("pointerup",em),window.removeEventListener("pointercancel",em),window.removeEventListener("blur",ec),document.documentElement.removeEventListener("pointerleave",ec),document.removeEventListener("visibilitychange",eh),R.removeEventListener("change",ep),S.removeEventListener("change",ei),e.removeEventListener("webglcontextlost",ev),e.removeEventListener("webglcontextrestored",eg),er){if(r.deleteProgram(er.simProgram),r.deleteProgram(er.fieldProgram),r.deleteProgram(er.pointProgram),r.deleteProgram(er.downProgram),r.deleteProgram(er.upProgram),ee){for(let e of ee)r.deleteTexture(e.texture),r.deleteFramebuffer(e.framebuffer);ee=null}r.deleteProgram(er.resolveProgram),r.deleteVertexArray(er.screenVao),r.deleteBuffer(er.homeBuffer),er.stateBuffers.forEach(e=>r.deleteBuffer(e)),er.vaos.forEach(e=>r.deleteVertexArray(e)),er.drawVaos.forEach(e=>r.deleteVertexArray(e)),r.deleteTransformFeedback(er.feedback),er=null,eo()}}}}(e,o);return()=>t?.dispose()},[]),(0,t.jsx)("canvas",{ref:h,className:e,"aria-hidden":"true"})}],63736)},72713,e=>{e.v({dim:"cosmos-background-module__NDqyYq__dim",drift:"cosmos-background-module__NDqyYq__drift",photo:"cosmos-background-module__NDqyYq__photo",root:"cosmos-background-module__NDqyYq__root",stars:"cosmos-background-module__NDqyYq__stars"})},16541,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(21168),o=e.i(72713);let i=(e,t)=>e+Math.random()*(t-e);e.s(["default",0,function({className:e}){let n=(0,r.useRef)(null);(0,r.useEffect)(()=>{let e=n.current,t=e?.getContext("2d");if(!e||!t)return;let r=a.cosmosConfig,o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=Math.cos(r.driftAngle),s=Math.sin(r.driftAngle),u=0,d=0,f=[];function c(){let a,o=Math.min(window.devicePixelRatio||1,r.maxPixelRatio),n=e.getBoundingClientRect(),l=u,s=d;u=n.width,d=n.height,e.width=Math.round(u*o),e.height=Math.round(d*o),t.setTransform(o,0,0,o,0,0),(Math.abs(u-l)>80||Math.abs(d-s)>160||!f.length)&&(a=u*d/1e4,f=r.layers.map(e=>Array.from({length:Math.round(a*e.density)},()=>{let t;return{x:Math.random()*u,y:Math.random()*d,r:i(e.size[0],e.size[1]),a:i(e.brightness[0],e.brightness[1]),phase:Math.random()*Math.PI*2,color:(t=r.starColors)[Math.floor(Math.random()*t.length)]}})))}let m=0;function h(e){m+=e,t.clearRect(0,0,u,d),f.forEach((a,o)=>{let i=r.layers[o].speed,n=l*i*e,c=s*i*e;for(let e of a){e.x+=n,e.y+=c,e.x<-2?e.x+=u+4:e.x>u+2&&(e.x-=u+4),e.y<-2?e.y+=d+4:e.y>d+2&&(e.y-=d+4);let a=1-r.twinkle*(.5+.5*Math.sin(m*r.twinkleSpeed*(1+.4*o)+e.phase));t.globalAlpha=e.a*a,t.fillStyle=e.color,t.beginPath(),t.arc(e.x,e.y,e.r,0,2*Math.PI),t.fill(),o===f.length-1&&e.a>.7&&(t.globalAlpha=e.a*a*.15,t.beginPath(),t.arc(e.x,e.y,3.2*e.r,0,2*Math.PI),t.fill())}}),t.globalAlpha=1}if(c(),o){h(0);let e=()=>{c(),h(0)};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}let p=0,v=performance.now(),g=!0,x=1e3/r.fps;function y(e){p=requestAnimationFrame(y);let t=e-v;t<x-1||(v=e,h(Math.min(t,100)/1e3))}function b(){p||!g||document.hidden||(v=performance.now(),p=requestAnimationFrame(y))}function w(){cancelAnimationFrame(p),p=0}let T=new IntersectionObserver(([e])=>{(g=e.isIntersecting)?b():w()});T.observe(e);let E=()=>document.hidden?w():b();document.addEventListener("visibilitychange",E);let R=new ResizeObserver(()=>c());return R.observe(e),b(),()=>{w(),T.disconnect(),R.disconnect(),document.removeEventListener("visibilitychange",E)}},[]);let l={backgroundImage:`url(${a.cosmosConfig.photo.src})`,opacity:a.cosmosConfig.photo.opacity,animationDuration:`${a.cosmosConfig.photo.duration}s`};return(0,t.jsxs)("div",{className:`${o.default.root} ${e??""}`,"aria-hidden":"true",children:[(0,t.jsx)("div",{className:o.default.photo,style:l}),(0,t.jsx)("div",{className:o.default.dim,style:{opacity:a.cosmosConfig.dim}}),(0,t.jsx)("canvas",{ref:n,className:o.default.stars})]})}])},49357,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(21168);function o(e,t,r=1){let a,i=(a=0x1352900,()=>{let e=a=a+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}),n=()=>Math.sqrt(-2*Math.log(Math.max(i(),1e-7)))*Math.cos(2*Math.PI*i()),l=new Float32Array(6*e),s=[0,0,0],u=t.fieldScale,d=t.fieldDetail,f=[0,0,0],c=(e,t,r,a,o,i)=>{let n=e*a+1.3+i,l=t*a*1.1+.4+2*i,s=t*a+2.1+3*i,u=r*a*1.2+1.7+i,d=r*a+.6+2*i,c=e*a*.9+2.9+3*i;f[0]+=o*(Math.cos(n)*Math.cos(l)-.9*Math.sin(d)*Math.sin(c)),f[1]+=o*(Math.cos(s)*Math.cos(u)-1.1*Math.sin(n)*Math.sin(l)),f[2]+=o*(Math.cos(d)*Math.cos(c)-1.2*Math.sin(s)*Math.sin(u))},m=(e,r,a)=>{let o=t.fieldCirculation;f[0]=.26*o,f[1]=.93*o,f[2]=-.26*o,c(e,r,a,u,1,0),c(e,r,a,2.3*u,d,1.9);let i=Math.sqrt(e*e+r*r+a*a)||1,n=e/i,l=r/i,m=a/i,h=l*f[2]-m*f[1],p=m*f[0]-n*f[2],v=n*f[1]-l*f[0],g=t.radialDrift*Math.sin(e*u*.7+r*u*.9+1.1)*Math.max(1-i,0),x=Math.sqrt((h+=g*n)*h+(p+=g*l)*p+(v+=g*m)*v)||1;s[0]=h/x,s[1]=p/x,s[2]=v/x},h=t.threadSpacing*r,[p,v]=t.threadLength,g=0;for(;g<e;){let r=2*i()-1,a=i()*Math.PI*2,o=Math.sqrt(1-r*r),u=t.innerRadius+(1-t.innerRadius)*Math.pow(i(),t.radialBias);i()<t.escapeFraction&&(u=.9+Math.abs(n())*t.escapeSpread);let d=o*Math.cos(a)*(u=Math.min(u,1.32)),f=r*u,c=o*Math.sin(a)*u;for(let r=0;r<t.threadsPerBundle&&g<e;r++){let r=d+n()*t.bundleSpread,a=f+n()*t.bundleSpread,o=c+n()*t.bundleSpread,u=i(),x=Math.min(Math.max((Math.sqrt(r*r+a*a+o*o)-.82)/.3,0),1),y=1-.5*x,b=1+t.edgeLooseness*x,w=Math.min(Math.max(8,Math.round((p+(v-p)*i())*y/h)),e-g);for(let e=0;e<w;e++){m(r,a,o),m(r+s[0]*h*.5,a+s[1]*h*.5,o+s[2]*h*.5),r+=s[0]*h,a+=s[1]*h,o+=s[2]*h;let d=i(),f=d<t.dustFraction?t.dustSpread:d<t.dustFraction+t.veilFraction?t.veilWidth:t.threadWidth,c=6*g;l[c]=r+n()*f*b,l[c+1]=a+n()*f*b,l[c+2]=o+n()*f*b,l[c+3]=i(),l[c+4]=w>1?e/(w-1):.5,l[c+5]=u,g++}}}return l}var i=e.i(34133);function n(e){let t=e.replace("#",""),r=parseInt(3===t.length?t.replace(/./g,e=>e+e):t,16);return[(r>>16&255)/255,(r>>8&255)/255,(255&r)/255]}function l(e,t,r){let a=e.createShader(t);if(e.shaderSource(a,r),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(a);throw e.deleteShader(a),Error(`Shader compile failed: ${t}`)}return a}function s(e,t,r,a){let o=e.createProgram(),i=l(e,e.VERTEX_SHADER,t),n=l(e,e.FRAGMENT_SHADER,r);if(e.attachShader(o,i),e.attachShader(o,n),a&&e.transformFeedbackVaryings(o,a,e.INTERLEAVED_ATTRIBS),e.linkProgram(o),e.deleteShader(i),e.deleteShader(n),!e.getProgramParameter(o,e.LINK_STATUS)){let t=e.getProgramInfoLog(o);throw e.deleteProgram(o),Error(`Program link failed: ${t}`)}return o}function u(e,t,r){let a={};for(let o of r)a[o]=e.getUniformLocation(t,o);return a}function d(e,t,r,a=!1){let o=e.createTexture();e.bindTexture(e.TEXTURE_2D,o),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,t,r);let i=a?e.LINEAR:e.NEAREST;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0);let l=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return(e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,null),l)?{texture:o,framebuffer:n,width:t,height:r}:(e.deleteTexture(o),e.deleteFramebuffer(n),null)}function f(e){let t=e.offsetParent;return t instanceof HTMLElement?{width:t.clientWidth,left:t.getBoundingClientRect().left-e.getBoundingClientRect().left}:{width:e.clientWidth,left:0}}function c(e,t,r,a){let o=a?e.placement.stacked:e.placement.wide;return{cx:t*o.centerX,cy:r*o.centerY,radius:Math.max(40,Math.min(t*o.radiusByWidth,r*o.radiusByHeight))}}function m(e,t){let r=e.getContext("2d");if(!r)return null;let i=o(14e3,t.shape,t.count.high/14e3),l=window.matchMedia(a.STACKED_LAYOUT_QUERY),[s,u,d]=n(t.colorBright).map(e=>Math.round(255*e)),m=()=>{let a=e.clientWidth,o=e.clientHeight;if(!a||!o)return;let n=Math.min(window.devicePixelRatio||1,2);e.width=Math.round(a*n),e.height=Math.round(o*n),r.setTransform(n,0,0,n,0,0),r.fillStyle=t.background,r.fillRect(0,0,a,o);let m=f(e),h=c(t,m.width,o,l.matches),{cy:p,radius:v}=h,g=h.cx+m.left;for(let e=0;e<14e3;e++){let a=i[6*e],o=i[6*e+1],n=i[6*e+2],l=t.cameraDistance/(t.cameraDistance-n),f=.5*n+.5;r.fillStyle=`rgba(${s},${u},${d},${.1+.5*f*f})`,r.fillRect(g+a*l*v,p-o*l*v,1,1)}},h=new ResizeObserver(m);return h.observe(e),m(),{dispose:()=>h.disconnect()}}e.s(["default",0,function({className:e}){let l=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=l.current;if(!e)return;let t=function(e,t){if(!function(){let e=document.createElement("canvas").getContext("webgl2");if(!e)return!1;let t=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float");return e.getExtension("WEBGL_lose_context")?.loseContext(),t}())return m(e,t);let r=e.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!r)return m(e,t);r.getExtension("EXT_color_buffer_float")||r.getExtension("EXT_color_buffer_half_float");let l=t.render,h=function(e){let t=navigator,r=window.matchMedia("(pointer: coarse)").matches,a=700>Math.min(window.innerWidth,window.innerHeight);if(r||a)return e.count.low;let o=t.hardwareConcurrency??8,i=t.deviceMemory??8;return o<=4||i<=4?e.count.medium:e.count.high}(t),p=o(h,t.shape,t.count.high/h),v=window.matchMedia("(prefers-reduced-motion: reduce)"),g=window.matchMedia(a.STACKED_LAYOUT_QUERY),x=!1,y=0,b=!0,w=v.matches,T=h,E=1,R=0,S=0,A=1,_={cx:0,cy:0,radius:1},M=0,F=0,P=0,D=w,L=0,B=0,C=45,k={clientX:0,clientY:0,hasPosition:!1,present:!1,active:0,x:0,y:0,vx:0,vy:0,initialised:!1},z=["uTime","uDt","uSnap","uRotSpeed","uRotShear","uTilt","uFlowAmp","uFlowScale","uFlowSpeed","uRayOrigin","uRayDir","uPointerVel","uPointerActive","uRepRadius","uRepStrength","uRepCore","uRepSpeedBoost","uPointerDrag","uPointerSwirl","uStiffness","uDamping","uStreamPeriod","uStreamTravel","uDisturbance","uDisturbanceExtent","uDisturbanceCoupling","uCamDist","uFieldScale","uFieldDetail","uFieldCirculation","uRadialDrift"],U=["uPrev","uTexel","uExtent","uDt","uTime","uPointer","uPointerVel","uPointerActive","uRadius","uInject","uLife","uSpread","uSelfAdvect","uCarry"],I=["uCenter","uScale","uResolution","uCamDist","uTime","uSize","uSizeDepthBoost","uOpacity","uDepthFade","uShimmer","uShimmerSpeed","uEnergyGlint","uStreamPeriod","uEdgeStart","uEdgeEnd","uEdgeVariation","uColorBright","uColorDeep"],V=["uLight","uBackground","uExposure"],N=null,O=t.disturbance,j=null,W=0,X=null;function q(){let e=s(r,i.SIM_VERT,i.SIM_FRAG,["vPos","vVel"]),a=s(r,i.SCREEN_VERT,i.FIELD_FRAG),o=s(r,i.POINT_VERT,i.POINT_FRAG),n=Math.max(32,Math.round(O.resolution)),l=d(r,n,n,!0),f=d(r,n,n,!0);if(!l||!f)throw Error("Float render targets are not available");for(let e of[l,f])r.bindFramebuffer(r.FRAMEBUFFER,e.framebuffer),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT);r.bindFramebuffer(r.FRAMEBUFFER,null),j=[l,f],W=0;let c=s(r,i.SCREEN_VERT,i.RESOLVE_FRAG),m=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,m),r.bufferData(r.ARRAY_BUFFER,p,r.STATIC_DRAW);let v=new Float32Array(6*h),g=Math.cos(t.tilt),x=Math.sin(t.tilt);for(let e=0;e<h;e++){let t=6*e,r=1.06+.16*p[t+3],a=p[t]*r,o=p[t+1]*r;v[6*e]=g*a-x*o,v[6*e+1]=x*a+g*o,v[6*e+2]=p[t+2]*r}let y=()=>{let e=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,e),r.bufferData(r.ARRAY_BUFFER,v,r.DYNAMIC_COPY),e},b=[y(),y()],w=e=>{let t=r.createVertexArray();return r.bindVertexArray(t),r.bindBuffer(r.ARRAY_BUFFER,m),r.enableVertexAttribArray(i.ATTRIB.home),r.vertexAttribPointer(i.ATTRIB.home,4,r.FLOAT,!1,24,0),r.enableVertexAttribArray(i.ATTRIB.fiber),r.vertexAttribPointer(i.ATTRIB.fiber,2,r.FLOAT,!1,24,16),r.bindBuffer(r.ARRAY_BUFFER,e),r.enableVertexAttribArray(i.ATTRIB.pos),r.vertexAttribPointer(i.ATTRIB.pos,3,r.FLOAT,!1,24,0),r.enableVertexAttribArray(i.ATTRIB.vel),r.vertexAttribPointer(i.ATTRIB.vel,3,r.FLOAT,!1,24,12),r.bindVertexArray(null),t},T=[w(b[0]),w(b[1])];r.bindBuffer(r.ARRAY_BUFFER,null);let E=r.createTransformFeedback(),R=r.createVertexArray();return r.disable(r.DEPTH_TEST),r.blendFunc(r.ONE,r.ONE),r.clearColor(0,0,0,0),{simProgram:e,fieldProgram:a,pointProgram:o,resolveProgram:c,homeBuffer:m,stateBuffers:b,vaos:T,screenVao:R,feedback:E,sim:u(r,e,z),field:u(r,a,U),point:u(r,o,I),resolve:u(r,c,V)}}function G(){N&&(r.deleteTexture(N.texture),r.deleteFramebuffer(N.framebuffer),N=null)}function H(){var a,o;let i=e.clientWidth,n=e.clientHeight;if(!i||!n)return;R=i,S=n;let l=Math.max(1,Math.round(i*(A=Math.min(window.devicePixelRatio||1,t.maxPixelRatio)*E))),s=Math.max(1,Math.round(n*A));(e.width!==l||e.height!==s)&&(e.width=l,e.height=s);let u=f(e);_=c(t,u.width,n,g.matches),_.cx+=u.left,a=e.width,o=e.height,(!N||N.width!==a||N.height!==o)&&(G(),(N=d(r,a,o))||console.error("[ParticleSphere] float render target is not available")),w&&Z()}function Y(e,a){if(!X)return;let o=X.sim;r.useProgram(X.simProgram),r.uniform1f(o.uTime,M),r.uniform1f(o.uDt,e),r.uniform1f(o.uSnap,+!!a),r.uniform1f(o.uRotSpeed,t.rotationSpeed),r.uniform1f(o.uRotShear,t.rotationShear),r.uniform1f(o.uTilt,t.tilt),r.uniform1f(o.uFlowAmp,t.flowIntensity),r.uniform1f(o.uFlowScale,t.flowScale),r.uniform1f(o.uFlowSpeed,t.flowSpeed);let i=t.cameraDistance,n=Math.hypot(k.x,k.y,i);r.uniform3f(o.uRayOrigin,0,0,i),r.uniform3f(o.uRayDir,k.x/n,k.y/n,-i/n),r.uniform3f(o.uPointerVel,k.vx,k.vy,0),r.uniform1f(o.uPointerActive,k.active),r.uniform1f(o.uRepRadius,t.repulsionRadius),r.uniform1f(o.uRepStrength,t.repulsionStrength),r.uniform1f(o.uRepCore,t.repulsionCore),r.uniform1f(o.uPointerSwirl,t.pointerSwirl),r.uniform1f(o.uRepSpeedBoost,t.repulsionSpeedBoost),r.uniform1f(o.uPointerDrag,t.pointerDrag),r.uniform1f(o.uStiffness,t.springStiffness),r.uniform1f(o.uDamping,t.damping),r.uniform1f(o.uStreamPeriod,t.streamPeriod),r.uniform1f(o.uStreamTravel,t.streamTravel),r.uniform1f(o.uCamDist,t.cameraDistance),r.uniform1f(o.uFieldScale,t.shape.fieldScale),r.uniform1f(o.uFieldDetail,t.shape.fieldDetail),r.uniform1f(o.uFieldCirculation,t.shape.fieldCirculation),r.uniform1f(o.uRadialDrift,t.shape.radialDrift),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,j?j[W].texture:null),r.uniform1i(o.uDisturbance,0),r.uniform1f(o.uDisturbanceExtent,1.6),r.uniform1f(o.uDisturbanceCoupling,O.coupling);let l=1-P;r.bindVertexArray(X.vaos[P]),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,X.feedback),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,X.stateBuffers[l]),r.enable(r.RASTERIZER_DISCARD),r.beginTransformFeedback(r.POINTS),r.drawArrays(r.POINTS,0,T),r.endTransformFeedback(),r.disable(r.RASTERIZER_DISCARD),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,null),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,null),P=l}function K(){if(!X||!N||!R)return;let a=X.point;r.bindFramebuffer(r.FRAMEBUFFER,N.framebuffer),r.viewport(0,0,N.width,N.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.useProgram(X.pointProgram),r.uniform2f(a.uCenter,_.cx/R*2-1,1-_.cy/S*2),r.uniform2f(a.uScale,2*_.radius/R,2*_.radius/S),r.uniform2f(a.uResolution,N.width,N.height),r.uniform1f(a.uCamDist,t.cameraDistance),r.uniform1f(a.uTime,M),r.uniform1f(a.uSize,l.size*A),r.uniform1f(a.uSizeDepthBoost,l.sizeDepthBoost);let o=_.radius*A,i=t.count.high/T,s=1/(l.size*A)**2;r.uniform1f(a.uOpacity,l.opacity*(o*o/518400)*i*Math.max(s,1)),r.uniform1f(a.uDepthFade,l.depthFade),r.uniform1f(a.uShimmer,l.shimmer),r.uniform1f(a.uShimmerSpeed,l.shimmerSpeed),r.uniform1f(a.uEnergyGlint,l.energyGlint),r.uniform1f(a.uStreamPeriod,t.streamPeriod),r.uniform1f(a.uEdgeStart,t.edge.fadeStart),r.uniform1f(a.uEdgeEnd,t.edge.fadeEnd),r.uniform1f(a.uEdgeVariation,t.edge.fadeVariation),r.uniform3fv(a.uColorBright,n(t.colorBright)),r.uniform3fv(a.uColorDeep,n(t.colorDeep)),r.bindVertexArray(X.vaos[P]),r.drawArrays(r.POINTS,0,T),r.disable(r.BLEND);let u=X.resolve;r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,e.width,e.height),r.useProgram(X.resolveProgram),r.bindVertexArray(X.screenVao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,N.texture),r.uniform1i(u.uLight,0),r.uniform3fv(u.uBackground,n(t.background)),r.uniform1f(u.uExposure,l.exposure),r.drawArrays(r.TRIANGLES,0,3),r.bindTexture(r.TEXTURE_2D,null),r.bindVertexArray(null)}function $(a){if(y=0,x||!X)return;let o=F?a-F:16.7;F=a;let i=Math.min(Math.max(o/1e3,1/240),1/30);M+=i,function(r){let a=k.present&&k.hasPosition?1:0;if(k.active+=(a-k.active)*(1-Math.exp(-r*t.pointerFade)),!k.hasPosition)return;let o=e.getBoundingClientRect(),i=(k.clientX-o.left-_.cx)/_.radius,n=-(k.clientY-o.top-_.cy)/_.radius;if(!k.initialised){k.x=i,k.y=n,k.vx=0,k.vy=0,k.initialised=!0;return}let l=1-Math.exp(-(28*r)),s=k.x+(i-k.x)*l,u=k.y+(n-k.y)*l,d=1-Math.exp(-(10*r));k.vx+=((s-k.x)/r-k.vx)*d,k.vy+=((u-k.y)/r-k.vy)*d,k.x=s,k.y=u}(i),function(e){if(!X||!j)return;let t=j[W],a=j[1-W],o=X.field;r.bindFramebuffer(r.FRAMEBUFFER,a.framebuffer),r.viewport(0,0,a.width,a.height),r.disable(r.BLEND),r.useProgram(X.fieldProgram),r.bindVertexArray(X.screenVao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,t.texture),r.uniform1i(o.uPrev,0),r.uniform2f(o.uTexel,1/a.width,1/a.height),r.uniform1f(o.uExtent,1.6),r.uniform1f(o.uDt,e),r.uniform1f(o.uTime,M),r.uniform2f(o.uPointer,k.x,k.y),r.uniform2f(o.uPointerVel,k.vx,k.vy),r.uniform1f(o.uPointerActive,k.active),r.uniform1f(o.uRadius,O.radius),r.uniform1f(o.uInject,O.strength),r.uniform1f(o.uLife,O.life),r.uniform1f(o.uSpread,O.spread),r.uniform1f(o.uSelfAdvect,O.selfAdvection),r.uniform1f(o.uCarry,O.carry),r.drawArrays(r.TRIANGLES,0,3),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindVertexArray(null),W=1-W}(i),Y(i,!1),K(),function(e){if(C>0)return C--;if(B+=e,++L<75)return;let r=B/L;if(B=0,L=0,r<=t.slowFrameMs)return;let a=Math.min(window.devicePixelRatio||1,t.maxPixelRatio);a*E>1.3?(E=Math.max(1.25/a,.75*E),H()):T>t.minCount&&(T=Math.max(t.minCount,Math.floor(.65*T))),C=30}(o),Q()}function Q(){y||x||w||!b||document.hidden||!X||(y=requestAnimationFrame($))}function Z(){y||x||!X||(y=requestAnimationFrame(()=>{y=0,!x&&X&&(D&&(Y(0,!0),D=!1),K())}))}let J=e=>{k.clientX=e.clientX,k.clientY=e.clientY,k.hasPosition=!0,k.present||(k.initialised=!1),k.present=!0},ee=()=>{k.present=!1},et=e=>{"mouse"!==e.pointerType&&(k.present=!1)},er=()=>{F=0,Q()},ea=()=>{w=v.matches,F=0,w?(D=!0,Z()):Q()},eo=e=>{e.preventDefault(),cancelAnimationFrame(y),y=0,X=null,N=null,j=null},ei=()=>{try{X=q()}catch(e){console.error("[ParticleSphere]",e);return}P=0,F=0,D=w,H(),Q()};try{X=q()}catch(e){return console.error("[ParticleSphere]",e),null}let en=new ResizeObserver(H);en.observe(e);let el=new IntersectionObserver(([e])=>{b=e.isIntersecting,F=0,Q()});return el.observe(e),window.addEventListener("pointermove",J,{passive:!0}),window.addEventListener("pointerdown",J,{passive:!0}),window.addEventListener("pointerup",et,{passive:!0}),window.addEventListener("pointercancel",et,{passive:!0}),window.addEventListener("blur",ee),document.documentElement.addEventListener("pointerleave",ee),document.addEventListener("visibilitychange",er),v.addEventListener("change",ea),g.addEventListener("change",H),e.addEventListener("webglcontextlost",eo),e.addEventListener("webglcontextrestored",ei),H(),w?Z():Q(),{dispose(){if(x=!0,cancelAnimationFrame(y),en.disconnect(),el.disconnect(),window.removeEventListener("pointermove",J),window.removeEventListener("pointerdown",J),window.removeEventListener("pointerup",et),window.removeEventListener("pointercancel",et),window.removeEventListener("blur",ee),document.documentElement.removeEventListener("pointerleave",ee),document.removeEventListener("visibilitychange",er),v.removeEventListener("change",ea),g.removeEventListener("change",H),e.removeEventListener("webglcontextlost",eo),e.removeEventListener("webglcontextrestored",ei),X){if(r.deleteProgram(X.simProgram),r.deleteProgram(X.fieldProgram),r.deleteProgram(X.pointProgram),j){for(let e of j)r.deleteTexture(e.texture),r.deleteFramebuffer(e.framebuffer);j=null}r.deleteProgram(X.resolveProgram),r.deleteVertexArray(X.screenVao),r.deleteBuffer(X.homeBuffer),X.stateBuffers.forEach(e=>r.deleteBuffer(e)),X.vaos.forEach(e=>r.deleteVertexArray(e)),r.deleteTransformFeedback(X.feedback),X=null,G()}}}}(e,a.particleConfig);return()=>t?.dispose()},[]),(0,t.jsx)("canvas",{ref:l,className:e,"aria-hidden":"true"})}],49357)},92645,e=>{e.v({layer:"hero-reveal-module__ZZVcyW__layer",panel:"hero-reveal-module__ZZVcyW__panel",pin:"hero-reveal-module__ZZVcyW__pin",root:"hero-reveal-module__ZZVcyW__root",shade:"hero-reveal-module__ZZVcyW__shade",track:"hero-reveal-module__ZZVcyW__track",under:"hero-reveal-module__ZZVcyW__under",underLayer:"hero-reveal-module__ZZVcyW__underLayer",underShade:"hero-reveal-module__ZZVcyW__underShade"})},70366,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(92645);e.s(["default",0,function({hero:e,children:o,after:i,afterId:n}){let l=(0,r.useRef)(null),s=(0,r.useRef)(null),u=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=l.current,t=s.current;if(!e||!t)return;let r=0,a=-1,o=-1,i=-1,n=()=>{r=0;let n=window.innerHeight||1,{top:l,bottom:s}=t.getBoundingClientRect(),d=Math.min(1,Math.max(0,1-l/n));Math.abs(d-a)>=5e-4&&(a=d,e.style.setProperty("--reveal",d.toFixed(4)));let f=Math.min(1,Math.max(0,1-s/n));Math.abs(f-o)>=5e-4&&(o=f,e.style.setProperty("--exit",f.toFixed(4)));let c=u.current;if(c){let t=Math.min(1,Math.max(0,(n-s)/(c.offsetHeight||1)));Math.abs(t-i)>=5e-4&&(i=t,e.style.setProperty("--uncover",t.toFixed(4))),c.toggleAttribute("data-held",c.offsetHeight<=n),c.toggleAttribute("data-waiting",s>=n)}},d=()=>{r||(r=requestAnimationFrame(n))};return n(),window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("resize",d),()=>{cancelAnimationFrame(r),window.removeEventListener("scroll",d),window.removeEventListener("resize",d)}},[]),(0,t.jsxs)("div",{ref:l,className:a.default.root,children:[(0,t.jsx)("div",{className:a.default.track,children:(0,t.jsxs)("div",{className:a.default.pin,children:[(0,t.jsx)("div",{className:a.default.layer,children:e}),(0,t.jsx)("div",{className:a.default.shade,"aria-hidden":"true"})]})}),(0,t.jsx)("div",{ref:s,className:a.default.panel,children:o}),i?(0,t.jsxs)(t.Fragment,{children:[n?(0,t.jsx)("div",{id:n,"aria-hidden":"true"}):null,(0,t.jsxs)("div",{ref:u,className:a.default.under,children:[(0,t.jsx)("div",{className:a.default.underLayer,children:i}),(0,t.jsx)("div",{className:a.default.underShade,"aria-hidden":"true"})]})]}):null]})}])},71158,e=>{e.v({article:"projects-module__MILkoW__article",body:"projects-module__MILkoW__body",detail:"projects-module__MILkoW__detail","detail-in":"projects-module__MILkoW__detail-in",frame:"projects-module__MILkoW__frame",grid:"projects-module__MILkoW__grid",inner:"projects-module__MILkoW__inner",label:"projects-module__MILkoW__label",layout:"projects-module__MILkoW__layout",link:"projects-module__MILkoW__link",links:"projects-module__MILkoW__links",media:"projects-module__MILkoW__media",page:"projects-module__MILkoW__page",pager:"projects-module__MILkoW__pager",projects:"projects-module__MILkoW__projects",stage:"projects-module__MILkoW__stage",tech:"projects-module__MILkoW__tech",thumb:"projects-module__MILkoW__thumb",tile:"projects-module__MILkoW__tile",tileTitle:"projects-module__MILkoW__tileTitle",title:"projects-module__MILkoW__title",year:"projects-module__MILkoW__year"})},75998,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(21168);let o=[{year:"2026",tech:["Swift","MLX","MCP"],thumbSrc:"/amai-thumb.svg",thumbAlt:"Amai wordmark",gallery:[{src:"/amai-promo.mp4",alt:"Amai promo video",width:1280,height:720,kind:"video",posterSrc:"/amai-promo-poster.webp"}],links:[{label:"GitHub",href:"https://github.com/Penrose0v0/Amai"}],i18n:{zh:{title:"Amai：环境式个人 AI",summary:"在后台记下你在电脑上做的事，整理成每日时间线和长期记忆：纯 Markdown，保存在本机，AI Agent 也能读取。",description:"Amai 是一款 macOS 菜单栏应用。它定期截取屏幕，用本机运行的视觉模型（MLX 上的 Gemma）结合 OCR 理解正在做的事，整理成每日时间线，并在夜间更新综合、工作、健康、财务、目标五个领域的长期记忆。截图不会离开电脑，记忆以纯 Markdown 文件保存，每一条都能追溯到来源日期；内置的只读 MCP 服务器让 Claude 等 AI Agent 在授权范围内检索这些记忆。"},ja:{title:"Amai：アンビエントなパーソナル AI",summary:"パソコンでの作業をバックグラウンドで記録し、日々のタイムラインと長期記憶に整理。記憶は手元のプレーンな Markdown で、AI エージェントからも参照できます。",description:"Amai は macOS のメニューバーアプリです。定期的に画面を撮影し、ローカルで動くビジョンモデル（MLX 上の Gemma）と OCR で作業内容を理解してタイムラインにまとめ、夜間に総合・仕事・健康・財務・目標の 5 分野の長期記憶を更新します。スクリーンショットはパソコンの外に出ず、記憶はプレーンな Markdown ファイルとして保存され、各項目から元の日付にさかのぼれます。同梱の読み取り専用 MCP サーバーにより、Claude などのエージェントが許可した範囲で記憶を検索できます。"},en:{title:"Amai: Ambient Personal AI",summary:"Quietly notes what you do on your computer and turns it into a daily timeline and long-term memory: plain Markdown, on your device, ready for your AI agents.",description:"Amai is a macOS menu bar app. It captures the screen periodically, understands the activity with OCR and a vision model running on the device (Gemma on MLX), and writes it into a daily timeline; overnight it updates long-term memory across five areas: general, work, health, finance and goals. Screenshots never leave the computer, memory is kept as plain Markdown files with every entry traceable to the day it came from, and a bundled read-only MCP server lets agents such as Claude search that memory within the scope you allow."}}},{year:"2024",tech:["Ruby","LLM","Web"],thumbSrc:"/llm-web-game-screenshot.png",thumbAlt:"LLM web game screenshot",gallery:[{src:"/llm-web-game-demo.mp4",alt:"LLM web game demo video",width:1152,height:720,kind:"video",posterSrc:"/llm-web-game-demo-poster.jpg"}],i18n:{zh:{title:"融合 LLM 的回合制网页游戏",summary:"基于 Ruby 开发的、融合大语言模型交互体验的回合制网页游戏。",description:"我围绕“语言模型如何增强玩家交互体验”这一方向，设计并实现了一款极简主义网页游戏。项目以宝可梦式回合制玩法为基础，将 LLM 融入游戏流程与反馈机制中，让原本简单的对战过程具备更强的故事性与叙事感。这个项目更像是一次关于叙事、交互与系统实现的综合实验，而不仅仅是为游戏接入一个模型接口。"},ja:{title:"LLM を融合したターン制バトル Web ゲーム",summary:"Ruby で開発した、LLM による対話体験を取り入れたターン制 Web ゲーム。",description:"『言語モデルがプレイヤーのインタラクション体験をどう拡張できるか』をテーマに、ミニマルな Web ゲームを設計・実装しました。ゲームはポケモン風のターン制バトルをベースにしており、LLM を進行やフィードバック機構に組み込むことで、シンプルな対戦に物語性と叙事性を持たせています。このプロジェクトは、単にゲームへモデルを接続するのではなく、物語・インタラクション・システム実装をまとめて検証した総合的な実験です。"},en:{title:"LLM-Enhanced turn-based Web Game",summary:"A turn-based web game built in Ruby that integrates LLM-driven interaction into the player experience.",description:"This project explored how language models could enrich the player's interactive experience. I designed and implemented a minimalist web game built around Pokémon-style turn-based gameplay, then integrated an LLM into the game flow and feedback loop so that a simple battle system could carry stronger narrative and storytelling qualities. The result was less about attaching a model to a game and more about a combined experiment in narrative, interaction, and system design."}}},{year:"2023",tech:["PHP","SQL","Web"],thumbSrc:"/campus-map-social-app.png",thumbAlt:"Campus map social app screenshot",gallery:[{src:"/campus-map-social-app.png",alt:"Campus map social app screenshot",width:1730,height:1082}],i18n:{zh:{title:"校园地图社交 Web 应用",summary:"面向校园场景的社交 Web 应用，支持围绕地图位置进行留言与发布。",description:"我使用 PHP 与 SQL 搭建了一个以大学地图为核心的社交 Web 应用，让用户能够围绕具体地点发布内容、留下评论并共享校园周边信息。重点在于把地理语境和轻量社交交互自然结合起来。"},ja:{title:"キャンパスマップ連動型ソーシャル Web アプリ",summary:"大学マップ上の場所に紐づけて投稿やコメントができるソーシャル Web アプリ。",description:"PHP と SQL を用いて、大学キャンパスの地図を中心にしたソーシャル Web アプリケーションを開発しました。ユーザーが場所ごとに投稿やコメントを残せるようにし、地理情報と軽量なコミュニティ体験を自然につなぐことを重視しました。"},en:{title:"Campus Map Social Web App",summary:"A social web application that let users post and comment around locations on a university map.",description:"Built with PHP and SQL, this project centered on a campus map where users could leave posts and comments tied to specific locations. The main goal was to connect lightweight social interaction with spatial context in a way that felt practical and intuitive for everyday campus use."}}},{year:"2023",tech:["Python","PyTorch"],thumbSrc:"/semg-architecture.png",thumbAlt:"sEMG model architecture diagram",gallery:[{src:"/semg-architecture.png",alt:"sEMG model architecture diagram",width:2116,height:508}],i18n:{zh:{title:"基于深度学习的 sEMG 手势识别模型",summary:"基于深度学习的 sEMG 手势识别模型，面向肌电信号驱动的人机交互研究。",description:"这个项目聚焦于使用针对时序列的深度学习方法处理表面肌电（sEMG）信号，并完成手势识别模型的设计与实现，为更自然的人机接口提供技术基础。"},ja:{title:"深層学習ベースの sEMG ジェスチャー認識モデル",summary:"筋電信号駆動のヒューマンコンピュータインタラクション研究に向けた、深層学習ベースの sEMG ジェスチャー認識モデル。",description:"このプロジェクトでは、時系列向けの深層学習手法を用いて表面筋電（sEMG）信号を処理し、ジェスチャー認識モデルの設計と実装を行いました。より自然なヒューマンコンピュータインタフェースを実現するための技術基盤を目指したものです。"},en:{title:"Deep Learning sEMG Gesture Recognition Model",summary:"A deep-learning-based sEMG gesture recognition model aimed at EMG-driven human-computer interaction research.",description:"This project focused on processing surface electromyography (sEMG) signals with deep learning methods designed for time-series data, and on building a gesture recognition model from that pipeline. The goal was to provide a technical foundation for more natural human-computer interfaces."}}},{year:"2022",tech:["Raspberry Pi","MediaPipe","Fusion360"],thumbSrc:"/ar-ui-demo-poster-v2.jpg",thumbAlt:"First frame of the AR glasses demo video",gallery:[{src:"/ar-ui-demo.mp4",alt:"Gesture-driven AR glasses demo video",width:640,height:480,kind:"video",posterSrc:"/ar-ui-demo-poster.jpg"},{src:"/ar-ui-sketch.png",alt:"AR glasses structural sketch",width:475,height:272},{src:"/ar-ui-prototype.png",alt:"AR glasses prototype photo",width:1238,height:596}],i18n:{zh:{title:"手势驱动的 AR 眼镜原型",summary:"在 Raspberry Pi 上实现基于手势识别的交互界面，并完成 AR 眼镜原型制作。",description:"在 Raspberry Pi 上结合 MediaPipe 构建了一个由手势识别驱动的 UI 原型，并基于此制作了一套利用分光棱镜实现显示叠加的 AR 眼镜系统。项目重点不仅在于完成手势识别本身，也在于探索更自然、低负担的无接触式交互方式。"},ja:{title:"ジェスチャー駆動型 AR グラス試作機",summary:"Raspberry Pi 上でジェスチャー認識ベースの UI を実装し、AR グラスの試作機を制作。",description:"Raspberry Pi 上で MediaPipe と組み合わせ、ジェスチャー認識で駆動する UI プロトタイプを構築し、それをもとに分光プリズムによる表示重畳を用いた AR グラスシステムを制作しました。焦点はジェスチャー認識そのものだけでなく、より自然で負担の少ない非接触インタラクションを探ることにもありました。"},en:{title:"Gesture-Driven AR Glasses Prototype",summary:"An AR glasses prototype with a gesture-based UI built on Raspberry Pi using MediaPipe.",description:"On Raspberry Pi, I built a gesture-recognition-driven UI prototype with MediaPipe and used it to create an AR glasses system that overlaid visuals through a beam-splitter prism design. The point of the project was not only to get gesture recognition working, but also to explore a more natural and lower-friction form of contactless interaction."}}}],i=e=>o.map(({year:t,tech:r,thumbSrc:a,thumbAlt:o,gallery:i,links:n,i18n:l})=>({year:t,tech:r,thumbSrc:a,thumbAlt:o,gallery:i,links:n,...l[e]})),n={zh:i("zh"),ja:i("ja"),en:i("en")};var l=e.i(71158),s=e.i(52504);let u=n.en,d=3/4;function f({item:e}){return"video"===e.kind?(0,t.jsx)("video",{className:l.default.media,src:e.src,poster:e.posterSrc,"aria-label":e.alt,controls:!0,autoPlay:!0,muted:!0,loop:!0,playsInline:!0},e.src):(0,t.jsx)("img",{className:l.default.media,src:e.src,alt:e.alt,decoding:"async"},e.src)}e.s(["default",0,function(){var e;let[o,i]=(0,r.useState)(0),[n,c]=(0,r.useState)(0),m=(0,r.useRef)(null),h=u[o],p=h.gallery[Math.min(n,h.gallery.length-1)];return(0,t.jsx)("section",{id:"projects",className:l.default.projects,"aria-labelledby":"projects-title","data-bamboo":"end",children:(0,t.jsx)("div",{className:l.default.frame,children:(0,t.jsxs)("div",{className:l.default.inner,children:[(0,t.jsx)("h2",{id:"projects-title",className:l.default.label,children:"Projects"}),(0,t.jsxs)("div",{className:l.default.layout,children:[(0,t.jsx)("ul",{className:l.default.grid,children:u.map((e,r)=>(0,t.jsx)("li",{children:(0,t.jsxs)("button",{type:"button",className:l.default.tile,"aria-pressed":r===o,onClick:()=>(e=>{i(e),c(0);let t=m.current;if(t&&window.matchMedia(a.STACKED_LAYOUT_QUERY).matches){let e=(0,s.getLenis)();e?e.scrollTo(t,{offset:-96}):t.scrollIntoView({behavior:"smooth"})}})(r),children:[(0,t.jsx)("span",{className:l.default.thumb,children:(0,t.jsx)("img",{src:e.thumbSrc,alt:"",loading:"lazy",decoding:"async"})}),(0,t.jsx)("span",{className:l.default.tileTitle,children:e.title})]})},e.title))}),(0,t.jsx)("div",{ref:m,className:l.default.detail,"aria-live":"polite",children:(0,t.jsxs)("article",{className:l.default.article,children:[(0,t.jsx)("div",{className:l.default.stage,style:{aspectRatio:Math.min(4.5,Math.max(d,(e=h.gallery[0]).width/e.height))},children:(0,t.jsx)(f,{item:p})}),h.gallery.length>1?(0,t.jsx)("div",{className:l.default.pager,children:h.gallery.map((e,r)=>(0,t.jsx)("button",{type:"button",className:l.default.page,"aria-pressed":e===p,"aria-label":`Show media ${r+1}`,onClick:()=>c(r),children:String(r+1).padStart(2,"0")},e.src))}):null,(0,t.jsx)("p",{className:l.default.year,children:h.year}),(0,t.jsx)("h3",{className:l.default.title,children:h.title}),(0,t.jsx)("p",{className:l.default.tech,children:h.tech.join(" · ")}),h.links?.length?(0,t.jsx)("ul",{className:l.default.links,children:h.links.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:e.href,className:l.default.link,target:"_blank",rel:"noreferrer",children:e.label})},e.href))}):null,(0,t.jsx)("p",{className:l.default.body,children:h.summary}),(0,t.jsx)("p",{className:l.default.body,children:h.description})]},o)})]})]})})})}],75998)},7728,e=>{e.v({backdrop:"site-header-module__wBaYfG__backdrop",bar:"site-header-module__wBaYfG__bar",drawer:"site-header-module__wBaYfG__drawer",drawerLink:"site-header-module__wBaYfG__drawerLink",drawerList:"site-header-module__wBaYfG__drawerList",header:"site-header-module__wBaYfG__header",inlineNav:"site-header-module__wBaYfG__inlineNav",logo:"site-header-module__wBaYfG__logo",menuButton:"site-header-module__wBaYfG__menuButton",menuLine:"site-header-module__wBaYfG__menuLine",navLink:"site-header-module__wBaYfG__navLink",navList:"site-header-module__wBaYfG__navList",root:"site-header-module__wBaYfG__root"})},3020,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(21168),o=e.i(7728),i=e.i(52504);let n=[{label:"About",href:"#about"},{label:"Research",href:"#research"},{label:"Projects",href:"#projects"}],l={"--hero-max-width":`${a.heroLayout.maxWidth}px`,"--type-color":a.typographyConfig.color};e.s(["default",0,function(){let[e,a]=(0,r.useState)(!1),[s,u]=(0,r.useState)(!1),d=(0,r.useId)();(0,r.useEffect)(()=>{let e=window.scrollY,t=e,r=0,a=0,o=()=>{a=0;let o=window.scrollY,i=o-e;if(e=o,o<=80)return void u(!1);if(0===i)return;let n=i>0?1:-1;n!==r&&(r=n,t=o-i),Math.abs(o-t)>=8&&u(r>0)},i=()=>{a||(a=requestAnimationFrame(o))};return window.addEventListener("scroll",i,{passive:!0}),()=>{cancelAnimationFrame(a),window.removeEventListener("scroll",i)}},[]),(0,r.useEffect)(()=>{if(!e)return;let t=e=>{"Escape"===e.key&&a(!1)},r=()=>a(!1),o=document.body.style.overflow;document.body.style.overflow="hidden";let n=(0,i.getLenis)();return n?.stop(),window.addEventListener("keydown",t),window.addEventListener("resize",r),()=>{document.body.style.overflow=o,n?.start(),window.removeEventListener("keydown",t),window.removeEventListener("resize",r)}},[e]);let f=()=>a(!1),c=e=>{(0,i.scrollToHash)(e,e.currentTarget.getAttribute("href")??""),f()};return(0,t.jsxs)("div",{className:o.default.root,style:l,children:[(0,t.jsx)("header",{className:o.default.header,"data-hidden":s&&!e||void 0,onFocus:()=>u(!1),children:(0,t.jsxs)("div",{className:o.default.bar,children:[(0,t.jsx)("a",{href:"#home",className:o.default.logo,"aria-label":"Home",onClick:c,children:(0,t.jsx)("img",{src:"/logo.svg",alt:"",width:84,height:94})}),(0,t.jsx)("nav",{"aria-label":"Primary",className:o.default.inlineNav,children:(0,t.jsx)("ul",{className:o.default.navList,children:n.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:e.href,className:o.default.navLink,onClick:c,children:e.label})},e.href))})}),(0,t.jsxs)("button",{type:"button",className:o.default.menuButton,"aria-expanded":e,"aria-controls":d,"aria-label":e?"Close menu":"Open menu","data-open":e||void 0,onClick:()=>a(e=>!e),children:[(0,t.jsx)("span",{className:o.default.menuLine}),(0,t.jsx)("span",{className:o.default.menuLine})]})]})}),(0,t.jsx)("div",{className:o.default.backdrop,"data-open":e||void 0,onClick:f,"aria-hidden":"true"}),(0,t.jsx)("nav",{id:d,"aria-label":"Primary",className:o.default.drawer,"data-open":e||void 0,inert:!e,children:(0,t.jsx)("ul",{className:o.default.drawerList,children:n.map((e,r)=>(0,t.jsx)("li",{style:{"--i":r},children:(0,t.jsx)("a",{href:e.href,className:o.default.drawerLink,onClick:c,children:e.label})},e.href))})})]})}])}]);