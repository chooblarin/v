#define PI 3.14159265359

precision mediump float;
uniform vec2 resolution;
uniform float time;

float circle(in vec2 p, in vec2 center, in float radius) {
  float dist = distance(p, center);
  float b = 0.005;
  return smoothstep(radius - b, radius + b, dist);
}

void main(void) {

  vec2 p = 2.0 * gl_FragCoord.xy / resolution.xy - 1.0;
  p.x *= resolution.x / resolution.y;

  int n = 6;

  float a = atan(p.y, p.x);
  float r = 2.0 * PI / float(n);

  a = a + 0.1 * time;

  float d = cos(floor(0.5 + a/r) * r - a) * length(p);
  float f = smoothstep(0.5 * r, 0.5 * r + 0.05, d);

  vec3 color = vec3(1.0 - f);

  gl_FragColor = vec4(color, 1.0);
}
