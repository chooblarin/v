// replication of this (https://www.youtube.com/watch?v=emjuqqyq_qc)

precision mediump float;
uniform float time;
uniform vec2 resolution;

float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

#define octaves 14 //could probably reduce octaves but meh
float fbm (in vec2 p) {

    float value = 0.0;
    float freq = 1.0;
    float amp = 0.5;

    for (int i = 0; i < octaves; i++) {
        value += amp * (noise((p - vec2(1.0)) * freq));
        freq *= 1.9;
        amp *= 0.6;
    }
    return value;
}

void main(void) {
  vec2 p = 2.0 * gl_FragCoord.xy / resolution.xy - 1.0;
  p.x *= resolution.x / resolution.y;

  float background = smoothstep(-0.25, 0.20, p.x);

  p.x -= 0.8;

  vec3 col = vec3(1.0);

  float r = length(p);

  float ss = 0.5 + sin(4.0 * time);
  float anim = 1.0 + 0.1 * ss * clamp(1.0 - r, 0.0, 1.0);
  r  *= anim;

  if (r < 0.8) {
    col = vec3(0.0, 0.3, 0.4);
    float f = fbm(5.0 * p);
    col = mix(col, vec3(0.2, 0.5, 0.4), f);

    f = 1.0 - smoothstep(0.25, 0.6, r);
    col = mix(col, vec3(0.9, 0.4, 0.3), f);

    float a = atan(p.y, p.x);
    a += 0.1 * fbm(20.0 * p);

    f = fbm(vec2(5.0 * r, 10.0 * a));
    f = smoothstep(0.2, 1.2, f);
    col = mix(col, vec3(1.0), f);

    f = smoothstep(0.4, 0.9, fbm(vec2(8.0 * r, 12.0 * a)));
    col *= (1.0 - 0.6 * f);

    f = smoothstep(0.5, 0.85, r);
    col *= (1.0 - 0.7 * f);

    f = smoothstep(0.2, 0.25, r);
    col *= f;

    f = 1.0 - smoothstep(0.0, 0.4, length(p - vec2(0.18, 0.2)));
    col += vec3(1.0, 0.6, 0.8) * f * 0.8;

    f = smoothstep(0.75, 0.8, r);
    col = mix(col, vec3(1.0), f);
  }

  gl_FragColor = vec4(col * background, 1.0);
}
