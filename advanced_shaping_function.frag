// http://www.iquilezles.org/www/articles/functions/functions.htm

#define PI 3.14159265359

precision mediump float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float plot(vec2 p, float pct){
  return  smoothstep( pct - 0.01, pct, p.y) -
          smoothstep( pct, pct + 0.01, p.y);
}

float almostIdentity(float x, float th, float n) {
  if (th < x) {
    return x;
  }
  float a = 2.0 * n - th;
  float b = 2.0 * th - 3.0 * n;
  float t = x / th;
  return (a * t + b) * t * t + n;
}

float impulse(float k, float x) {
  float h = k * x;
  return h * exp(1.0 - h);
}

float cubicPulse(float c, float w, float x) {
  x = abs(x - c);
  if (w < x) {
    return 0.0;
  } else {
    x /= w;
    return 1.0 - x * x * (3.0 - 2.0 * x);
  }
}

float parabola(float k, float x) {
  return pow(4.0 * x * (1.0 - x), k);
}

float sinc(float k, float x) {
  float a = PI * (k * x - 1.0);
  return sin(a) / a;
}

void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;

  vec3 col = vec3(0.4);

  float y;
  float t;

  y = almostIdentity(p.x, 0.5, 0.2);
  t = plot(p, y);
  col = mix(col, vec3(1.0, 0.0, 0.0), t);

  y = 0.8 * impulse(10.0, p.x);
  t = plot(p, y);
  col = mix(col, vec3(0.0, 1.0, 0.0), t);

  y = 0.8 * cubicPulse(0.5, 0.3, p.x);
  t = plot(p, y);
  col = mix(col, vec3(0.0, 0.0, 1.0), t);

  y = parabola(1.0, p.x);
  t = plot(p, y);
  col = mix(col, vec3(0.0, 1.0, 1.0), t);

  y = 0.5 * sinc(8.0, p.x) + 0.2;
  t = plot(p, y);
  col = mix(col, vec3(1.0, 1.0, 0.0), t);

  gl_FragColor = vec4(col, 1.0);
}
