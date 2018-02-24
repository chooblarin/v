#define PI 3.14159265359

precision mediump float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float plot(vec2 p, float pct){
  return  smoothstep( pct - 0.01, pct, p.y) -
          smoothstep( pct, pct + 0.01, p.y);
}

void main() {
	vec2 p = gl_FragCoord.xy / resolution.xy;

  vec3 color = vec3(0.0);

  float y = p.x;
  float t = plot(p, y);
  color = mix(color, vec3(1.0, 0.0, 0.0), t);

  y = exp(p.x) - 1.0;
  t = plot(p, y);
  color = mix(color, vec3(0.0, 1.0, 0.0), t);

  y = 0.45 * sin(2.0 * PI * p.x + time) + 0.5;
  t = plot(p, y);
  color = mix(color, vec3(0.0, 0.0, 1.0), t);

  y = pow(p.x, 5.0);
  t = plot(p, y);
  color = mix(color, vec3(0.0, 1.0, 1.0), t);

  y = sqrt(p.x);
  t = plot(p, y);
  color = mix(color, vec3(1.0, 0.0, 1.0), t);

  y = 0.8 * step(0.5, p.x) + 0.1;
  t = plot(p, y);
  color = mix(color, vec3(1.0, 1.0, 0.0), t);

	gl_FragColor = vec4(color, 1.0);
}
