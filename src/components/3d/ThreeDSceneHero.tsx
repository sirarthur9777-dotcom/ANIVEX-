import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Sparkles, Layers, RefreshCw, Play, Pause } from 'lucide-react';

interface ThreeDSceneHeroProps {
  className?: string;
}

export const ThreeDSceneHero: React.FC<ThreeDSceneHeroProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'particles'>('solid');
  const [isRotating, setIsRotating] = useState(true);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  // References to keep animation objects accessible in handlers
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const outerWireRef = useRef<THREE.Mesh | null>(null);
  const ringsRef = useRef<THREE.Group[]>([]);
  const satellitesRef = useRef<{ group: THREE.Group; name: string }[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Mouse interaction state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.2, y: 0.4 });
  const currentRotation = useRef({ x: 0.2, y: 0.4 });
  const mouseParallax = useRef({ x: 0, y: 0 });

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlAvailable(false);
        return;
      }
    } catch (e) {
      setWebGlAvailable(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // WebGL Context Lost & Restored
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
    const handleContextRestored = () => {
      // Reload on restore
      window.location.reload();
    };
    canvasRef.current.addEventListener('webglcontextlost', handleContextLost, false);
    canvasRef.current.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 4. Lighting: Three-Point Studio Lighting
    // Key light: Warm Saffron
    const keyLight = new THREE.DirectionalLight(0xf97316, 2.2);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Fill light: Deep Navy / Cool Slate
    const fillLight = new THREE.DirectionalLight(0x0b1f3a, 1.8);
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    // Rim light: Vibrant Emerald / Gold Accent
    const rimLight = new THREE.DirectionalLight(0xd4a72c, 2.5);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // 5. Main 3D Tech Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Inner Core: Futuristic Polyhedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0b1f3a,
      emissive: 0x0b1f3a,
      emissiveIntensity: 0.2,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMeshRef.current = coreMesh;
    mainGroup.add(coreMesh);

    // Outer Wireframe Cage: Geodesic Shell
    const wireGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const wireMaterial = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      roughness: 0.3,
      metalness: 0.8,
    });
    const outerWire = new THREE.Mesh(wireGeometry, wireMaterial);
    outerWireRef.current = outerWire;
    mainGroup.add(outerWire);

    // Orbiting Rings
    const rings: THREE.Group[] = [];
    const ringConfigs = [
      { radius: 2.7, tube: 0.02, color: 0xf97316, rotX: Math.PI / 3, rotY: 0 },
      { radius: 3.2, tube: 0.015, color: 0x15803d, rotX: -Math.PI / 4, rotY: Math.PI / 6 },
      { radius: 3.6, tube: 0.018, color: 0xd4a72c, rotX: Math.PI / 6, rotY: -Math.PI / 3 },
    ];

    ringConfigs.forEach((cfg) => {
      const ringGroup = new THREE.Group();
      ringGroup.rotation.x = cfg.rotX;
      ringGroup.rotation.y = cfg.rotY;

      const torusGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 80);
      const torusMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.9,
        transparent: true,
        opacity: 0.75,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      ringGroup.add(torus);

      mainGroup.add(ringGroup);
      rings.push(ringGroup);
    });
    ringsRef.current = rings;

    // 4 Orbiting Tech Satellite Nodes (Web, ERP, Cloud, Security)
    const satellites: { group: THREE.Group; name: string }[] = [];
    const nodeData = [
      { name: 'Web Architecture', color: 0xf97316, distance: 2.7, speed: 0.8 },
      { name: 'Vyapar ERP Engine', color: 0x15803d, distance: 3.2, speed: -0.6 },
      { name: 'Cloud Infrastructure', color: 0xd4a72c, distance: 3.6, speed: 0.7 },
      { name: 'Encrypted Security', color: 0x3b82f6, distance: 2.9, speed: -0.9 },
    ];

    nodeData.forEach((node) => {
      const satGroup = new THREE.Group();
      
      // Node satellite sphere
      const satGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const satMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.x = node.distance;
      satGroup.add(satMesh);

      // Connecting energy beam to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(node.distance, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      satGroup.add(line);

      mainGroup.add(satGroup);
      satellites.push({ group: satGroup, name: node.name });
    });
    satellitesRef.current = satellites;

    // 3D Particle Constellation Dust
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0xf97316),
      new THREE.Color(0xd4a72c),
      new THREE.Color(0x15803d),
      new THREE.Color(0x0b1f3a),
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);
    particlesRef.current = particles;

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation lerping for user drag and mouse parallax
      currentRotation.current.x += (targetRotation.current.x + mouseParallax.current.y - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y + mouseParallax.current.x - currentRotation.current.y) * 0.08;

      mainGroup.rotation.x = currentRotation.current.x;
      mainGroup.rotation.y = currentRotation.current.y;

      // Continuous automatic rotation if active
      if (isRotating && !isDragging.current) {
        targetRotation.current.y += delta * 0.25;
      }

      // Rotate sub-elements at varying speeds
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y += delta * 0.4;
        coreMeshRef.current.rotation.x += delta * 0.2;
      }

      if (outerWireRef.current) {
        outerWireRef.current.rotation.y -= delta * 0.3;
        outerWireRef.current.rotation.z += delta * 0.15;
      }

      // Orbiting rings
      rings.forEach((ring, idx) => {
        ring.rotation.z += delta * (0.2 + idx * 0.1);
      });

      // Orbiting satellites
      satellites.forEach((sat, idx) => {
        const speed = nodeData[idx].speed;
        sat.group.rotation.y += delta * speed;
        sat.group.rotation.x = Math.sin(elapsedTime * 0.5 + idx) * 0.2;
      });

      // Subtle particle pulsation
      if (particlesRef.current) {
        particlesRef.current.rotation.y -= delta * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('webglcontextlost', handleContextLost);
        canvasRef.current.removeEventListener('webglcontextrestored', handleContextRestored);
      }
      renderer.dispose();
    };
  }, []);

  // Update Visual View Modes
  useEffect(() => {
    if (!coreMeshRef.current || !outerWireRef.current || !particlesRef.current) return;

    if (viewMode === 'solid') {
      (coreMeshRef.current.material as THREE.MeshPhysicalMaterial).wireframe = false;
      outerWireRef.current.visible = true;
      particlesRef.current.visible = true;
    } else if (viewMode === 'wireframe') {
      (coreMeshRef.current.material as THREE.MeshPhysicalMaterial).wireframe = true;
      outerWireRef.current.visible = true;
      particlesRef.current.visible = true;
    } else if (viewMode === 'particles') {
      (coreMeshRef.current.material as THREE.MeshPhysicalMaterial).wireframe = false;
      outerWireRef.current.visible = false;
      particlesRef.current.visible = true;
    }
  }, [viewMode]);

  // Mouse & Touch interaction handlers for 360° Drag & Inspection
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Parallax tracking
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseParallax.current = { x: normX * 0.5, y: normY * 0.5 };
    }

    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    targetRotation.current.y += deltaX * 0.008;
    targetRotation.current.x += deltaY * 0.008;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleReset = () => {
    targetRotation.current = { x: 0.2, y: 0.4 };
    currentRotation.current = { x: 0.2, y: 0.4 };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[440px] md:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0B1F3A] to-[#061224] border border-[#0B1F3A]/20 shadow-2xl flex flex-col justify-between p-4 ${className}`}
    >
      {/* Fallback if WebGL unavailable */}
      {!webGlAvailable ? (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white bg-[#0B1F3A]">
          <div>
            <Layers className="w-12 h-12 text-[#F97316] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg">3D Hardware Acceleration</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-sm">
              Anivex Solution Enterprise Core Architecture (WebGL preview disabled in browser).
            </p>
          </div>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none z-0"
        />
      )}

      {/* Top 3D Status Bar & HUD */}
      <div className="relative z-10 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[11px] font-mono text-slate-200 font-semibold tracking-wide">
            3D Spatial Engine
          </span>
          <span className="text-[10px] font-mono text-emerald-400 pl-1.5 border-l border-white/10">
            60 FPS
          </span>
        </div>

        {/* Rotation & Reset Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsRotating((prev) => !prev)}
            title={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs transition-colors cursor-pointer"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            type="button"
            onClick={handleReset}
            title="Reset 3D Perspective"
            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Middle Interactive Floating Hint */}
      <div className="relative z-10 pointer-events-none text-center self-center opacity-80 hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-[10px] text-slate-300 font-mono tracking-wider uppercase">
          <RotateCw className="w-3 h-3 text-[#F97316] animate-spin" style={{ animationDuration: '6s' }} />
          Drag 360° to Inspect Architecture
        </span>
      </div>

      {/* Bottom Mode Switcher HUD & Interactive Nodes */}
      <div className="relative z-10 space-y-2 pointer-events-auto">
        {/* Interactive Satellite Node Tags */}
        <div className="flex flex-wrap items-center gap-1.5 justify-center">
          {[
            { label: 'Web Tier', color: 'text-[#F97316] border-[#F97316]/30 bg-[#F97316]/10' },
            { label: 'ERP Ledger', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
            { label: 'Cloud Gateway', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
            { label: 'AES-256 Vault', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
          ].map((item, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border backdrop-blur-sm ${item.color}`}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center justify-between p-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('solid')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                viewMode === 'solid'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Solid Core
            </button>
            <button
              type="button"
              onClick={() => setViewMode('wireframe')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                viewMode === 'wireframe'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Wireframe
            </button>
            <button
              type="button"
              onClick={() => setViewMode('particles')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                viewMode === 'particles'
                  ? 'bg-[#F97316] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Particles
            </button>
          </div>

          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline px-2">
            Interactive WebGL 3D
          </span>
        </div>
      </div>
    </div>
  );
};
