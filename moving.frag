#define PI 3.14159265359

precision mediump float;
uniform vec2 resolution;
uniform float time;

float box(in vec2 p, in vec2 size){
  vec2 uv = smoothstep(size, size + vec2(0.001), p);
  uv *= smoothstep(size, size + vec2(0.001), vec2(1.0) - p);
  return uv.x * uv.y;
}

float cross(in vec2 p, float size){
    p += size;
    p += size / 8.0;
    return box(p, vec2(size, size / 4.0)) + box(p, vec2(size / 4.0, size));
}

mat2 rotate2d(float angle){
  return mat2(cos(angle), -sin(angle),
              sin(angle), cos(angle));
}

mat2 scale(vec2 scale){
  return mat2(scale.x, 0.0,
              0.0, scale.y);
}

mat3 yuv2rgb = mat3(1.0, 0.0, 1.13983,
                    1.0, -0.39465, -0.58060,
                    1.0, 2.03211, 0.0);

void main(void) {

  vec2 p = 2.0 * gl_FragCoord.xy / resolution.xy - 1.0;
  p.x *= resolution.x / resolution.y;

  vec2 translate = vec2(cos(time), sin(time));
  translate += vec2(cos(time), 0.0);
  p += 0.4 * translate;

  p = rotate2d(sin(2.0 * time) * 2.0 * PI) * p;
  p = scale(vec2(2.0 + 0.8 * sin(time))) * p;

  float f = cross(p, 0.45);

  float v = 0.5 * sin(10.0 * time) + 1.0;

  vec3 color = f * vec3(v * 0.5 + 0.5, p.x, p.y);

  color = yuv2rgb * color;

  gl_FragColor = vec4(color, 1.0);
}
