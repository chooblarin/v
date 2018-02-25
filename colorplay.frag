#define PI 3.14159265359

precision mediump float;
uniform vec2 resolution;
uniform float time;

vec3 hsb2rgb(in vec3 c){
    vec3 rgb = clamp(
      abs(
        mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0)
        -3.0
      ) -1.0, 0.0, 1.0
    );
    rgb = rgb * rgb * (3.0 -2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

float plot(vec2 p, float pct){
  return  smoothstep( pct - 0.01, pct, p.y) -
          smoothstep( pct, pct + 0.01, p.y);
}

void main(void) {
  vec2 p = 2.0 * gl_FragCoord.xy / resolution.xy - 1.0;
  p.x *= resolution.x / resolution.y;

  vec3 color = vec3(0.0);

  vec2 toCenter = -p;
  float angle = atan(toCenter.y, toCenter.x);
  float radius = length(toCenter);

  float l = 0.4 + 0.1 * sin(3.0 * time);
  float b = 0.01;
  float w = 0.1 * 0.5 * (cos(3.0 * time) + 1.0);

  float f = smoothstep(l - b, l, radius) - smoothstep(l + w, l + w + b, radius);

  color = hsb2rgb(vec3(fract(angle / (2.0 * PI) + 0.5 + time), 2.0 * radius, f));

  gl_FragColor = vec4(color, 1.0);
}
