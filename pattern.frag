precision mediump float;
uniform vec2 resolution;
uniform float time;

vec2 brickTile(vec2 p, float zoom) {
  p *= zoom;
  p.x += step(1.0, mod(p.y, 2.0)) * 0.5;
  return fract(p);
}

float box(vec2 p, vec2 size) {
  size = vec2(0.5) - 0.5 * size;
  float b = 1e-4;
  vec2 q = smoothstep(size, size + b, p);
  q *= smoothstep(size, size + b, 1.0 - p);
  return q.x * q.y;
}

void main(void) {

  vec2 p = gl_FragCoord.xy / resolution.xy;

  float zoom = 10.0;

  p.x += 0.1 * sin(time) * (2.0 * step(1.0, mod(zoom * p.y, 2.0)) - 1.0);
  p.y += 0.1 * cos(3.0 * time) * (2.0 * step(1.0, mod(zoom * p.x, 2.0)) - 1.0);
  p /= vec2(1.5, 0.6) / 1.5;

  p = brickTile(p, 10.0);

  float f = box(p, vec2(0.9));
  f = min(0.4, f);
  vec3 color = vec3(f);

  gl_FragColor = vec4(color, 1.0);
}
