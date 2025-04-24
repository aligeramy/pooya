"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function MarbleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    )
    camera.position.z = 3
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0) // Transparent background
    
    // Add renderer to DOM
    containerRef.current.appendChild(renderer.domElement)
    
    // Mouse position
    const mouse = new THREE.Vector2(0, 0)
    const target = new THREE.Vector2(0, 0)
    
    // Create shader material
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColor1: { value: new THREE.Color("#f8f5f2") },     // Light beige
      uColor2: { value: new THREE.Color("#e2d8cc") },     // Darker beige with more contrast
      uColor3: { value: new THREE.Color("#ede4d7") },     // Medium beige
      uOpacity: { value: 0.25 },                          // Higher opacity
      uSpeed: { value: 0.04 },                            // Slightly faster movement
      uContrast: { value: 1.5 }                           // Added contrast
    }
    
    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uOpacity;
      uniform float uSpeed;
      uniform float uContrast;
      varying vec2 vUv;
      
      // Simplex 3D Noise 
      // by Ian McEwan, Ashima Arts
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      
      float snoise(vec3 v) { 
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        
        // First corner
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;
        
        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1. + 3.0 * C.xxx;
        
        // Permutations
        i = mod(i, 289.0 ); 
        vec4 p = permute( permute( permute( 
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                
        // Gradients
        float n_ = 1.0/7.0; // N=7
        vec3  ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        
        // Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                      dot(p2,x2), dot(p3,x3) ) );
      }
      
      float fbm(vec3 p) {
        float sum = 0.0;
        float amp = 1.0;
        float freq = 1.0;
        // Four octaves for more detail
        for (int i = 0; i < 4; i++) {
          sum += amp * snoise(p * freq);
          amp *= 0.5;
          freq *= 2.0;
        }
        return sum;
      }
      
      // Function to adjust contrast
      vec3 adjustContrast(vec3 color, float contrast) {
        return 0.5 + (contrast * (color - 0.5));
      }
      
      void main() {
        // Enhanced mouse influence for more reactivity
        vec2 mouseInfluence = (uMouse - 0.5) * 0.15;
        vec2 adjustedUV = vUv + mouseInfluence;
        
        // Time scale for animation
        float time = uTime * uSpeed;
        
        // Create more pronounced marble veins with added detail
        float noise1 = fbm(vec3(adjustedUV * 3.0, time * 0.1));
        float noise2 = fbm(vec3(adjustedUV * 6.0, time * 0.15 + 100.0));
        float noise3 = fbm(vec3(adjustedUV * 1.5, time * 0.05 - 50.0));
        
        // Create more defined marble veins
        float pattern = smoothstep(0.2, 0.8, noise1 * 0.5 + 0.5);
        pattern = mix(pattern, smoothstep(0.3, 0.7, noise2 * 0.5 + 0.5), 0.4);
        
        // Add swirling effect that follows mouse
        float swirl = fbm(vec3(
          adjustedUV.x * 4.0 + sin(time * 0.2 + adjustedUV.y * 3.0) * 0.2,
          adjustedUV.y * 4.0 + cos(time * 0.2 + adjustedUV.x * 3.0) * 0.2,
          time * 0.1
        ));
        
        pattern = mix(pattern, swirl, 0.3);
        
        // Create luxury marble effect with three colors and more contrast
        vec3 finalColor = mix(uColor1, uColor2, pattern);
        finalColor = mix(finalColor, uColor3, smoothstep(0.4, 0.6, noise3));
        
        // Add veins/lines that are more visible
        float veins = smoothstep(0.4, 0.6, 
          fbm(vec3(adjustedUV * 8.0 + mouseInfluence * 2.0, time * 0.2)));
        finalColor = mix(finalColor, uColor2 * 0.9, veins * 0.3);
        
        // Add subtle glow near mouse position
        float mouseDist = length(vUv - (uMouse * 0.8 + 0.1));
        float mouseGlow = smoothstep(0.4, 0.0, mouseDist);
        finalColor = mix(finalColor, uColor1 * 1.1, mouseGlow * 0.1);
        
        // Add subtle vignette 
        float vignette = smoothstep(0.0, 0.8, length(vUv - 0.5));
        finalColor = mix(finalColor, uColor1 * 0.9, vignette * 0.25);
        
        // Apply contrast adjustment
        finalColor = adjustContrast(finalColor, uContrast);
        
        // Output with increased opacity
        gl_FragColor = vec4(finalColor, uOpacity);
      }
    `
    
    const geometry = new THREE.PlaneGeometry(15, 15, 32, 32) // Larger plane to cover screen
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false
    })
    
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)
    
    // More responsive mouse move event with less throttling
    let lastMouseMoveTime = 0
    const mouseMoveThreshold = 20 // ms - lower threshold for more responsiveness
    
    const onMouseMove = (event: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseMoveTime < mouseMoveThreshold) return
      
      lastMouseMoveTime = now
      mouse.x = (event.clientX / window.innerWidth)
      mouse.y = 1 - (event.clientY / window.innerHeight)
    }
    
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    
    // Animation loop
    const clock = new THREE.Clock()
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      
      // Smoother mouse target update
      target.x += (mouse.x - target.x) * 0.04
      target.y += (mouse.y - target.y) * 0.04
      
      uniforms.uTime.value = elapsedTime
      uniforms.uMouse.value = target
      
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    
    animate()
    
    // Handle window resize with debouncing
    let resizeTimeout: NodeJS.Timeout
    
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
      }, 250)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      
      clearTimeout(resizeTimeout)
      
      renderer.dispose()
      material.dispose()
      geometry.dispose()
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
} 