import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Rotate3d,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  RefreshCw,
  Server,
  Database,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
} from 'lucide-react';

type ModelType = 'cloud' | 'erp' | 'mobile' | 'security';

interface ModelInfo {
  id: ModelType;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  primaryColor: number;
  accentColor: number;
}

const MODELS_DATA: ModelInfo[] = [
  {
    id: 'cloud',
    title: 'Multi-Tier Cloud Microservices',
    subtitle: 'High-Concurrency Web Architecture',
    description: 'High-availability React and Node.js microservice architecture with sub-second API latency, distributed edge caching, and failover redundancy.',
    specs: [
      { label: 'Edge CDN', value: 'Vite / Cloudflare' },
      { label: 'API Gateway', value: 'Express / TypeScript' },
      { label: 'Data Store', value: 'PostgreSQL & Redis' },
      { label: 'Security', value: 'TLS 1.3 & Rate Limiting' },
    ],
    primaryColor: 0xf97316, // Saffron
    accentColor: 0xd4a72c, // Gold
  },
  {
    id: 'erp',
    title: 'VyaparDesk ERP Engine',
    subtitle: 'GST-Compliant Enterprise Operations',
    description: 'Real-time multi-branch inventory synchronization, HSN/SAC automated tax calculation, and direct WhatsApp PDF invoice dispatch.',
    specs: [
      { label: 'GST Engine', value: 'CGST / SGST / IGST Auto' },
      { label: 'Warehouses', value: 'Multi-location real-time sync' },
      { label: 'Invoicing', value: 'Direct PDF & Thermal Print' },
      { label: 'Audit Trail', value: 'Tamper-proof transactional log' },
    ],
    primaryColor: 0x15803d, // Green
    accentColor: 0xf97316, // Saffron
  },
  {
    id: 'mobile',
    title: 'Progressive Web & Mobile App',
    subtitle: 'Cross-Platform Native Experience',
    description: 'Offline-first database synchronization, hardware biometric authentication, push notification pipeline, and fluid 60 FPS interactions.',
    specs: [
      { label: 'Runtime', value: 'React Native & Android Kotlin' },
      { label: 'Offline Sync', value: 'SQLite Local Cache & Delta Push' },
      { label: 'Auth', value: 'Biometric Fingerprint / Face ID' },
      { label: 'Push Hub', value: 'FCM Background Messaging' },
    ],
    primaryColor: 0x3b82f6, // Blue
    accentColor: 0x15803d, // Green
  },
  {
    id: 'security',
    title: 'Encrypted Security & Vault Engine',
    subtitle: 'Military-Grade Business Protection',
    description: 'Hardware-backed AES-256 database column encryption, automated daily off-site backups, and strict Role-Based Access Control (RBAC).',
    specs: [
      { label: 'Encryption', value: 'AES-256-GCM at rest & in transit' },
      { label: 'Access Control', value: 'Granular Role-Based Permissions' },
      { label: 'Backups', value: 'Multi-region automated snapshots' },
      { label: 'Compliance', value: 'Indian IT Act & ISO Standards' },
    ],
    primaryColor: 0xd4a72c, // Gold
    accentColor: 0x3b82f6, // Blue
  },
];

export const ThreeDVisualizerSection: React.FC = () => {
  const [activeModel, setActiveModel] = useState<ModelType>('cloud');
  const [isExploded, setIsExploded] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const layersRef = useRef<THREE.Mesh[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Interaction tracking
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotTarget = useRef({ x: 0.3, y: 0.6 });
  const rotCurrent = useRef({ x: 0.3, y: 0.6 });

  const currentInfo = MODELS_DATA.find((m) => m.id === activeModel) || MODELS_DATA[0];

  // Re-build 3D Model when activeModel changes
  const buildModel = (scene: THREE.Scene, type: ModelType) => {
    // Clear existing model group
    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current);
      modelGroupRef.current.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    }

    const group = new THREE.Group();
    scene.add(group);
    modelGroupRef.current = group;
    layersRef.current = [];

    const primaryCol = currentInfo.primaryColor;
    const accentCol = currentInfo.accentColor;

    if (type === 'cloud') {
      // 3 Multi-Tier Cloud Layers (Client, API Server, Database)
      const layerHeights = [-1.4, 0, 1.4];
      const layerColors = [0x0b1f3a, primaryCol, accentCol];
      const layerGeos = [
        new THREE.CylinderGeometry(2.4, 2.4, 0.45, 32),
        new THREE.BoxGeometry(3.6, 0.45, 3.6),
        new THREE.CylinderGeometry(2.2, 2.2, 0.45, 32),
      ];

      layerHeights.forEach((yPos, i) => {
        const mat = new THREE.MeshPhysicalMaterial({
          color: layerColors[i],
          emissive: layerColors[i],
          emissiveIntensity: 0.25,
          metalness: 0.8,
          roughness: 0.2,
          wireframe: isWireframe,
          clearcoat: 0.8,
        });
        const mesh = new THREE.Mesh(layerGeos[i], mat);
        mesh.position.y = yPos;
        mesh.userData = { baseY: yPos, explodedY: yPos * 2.2, index: i };
        group.add(mesh);
        layersRef.current.push(mesh);

        // Small server component nodes on top of each layer
        const subNodeCount = 4;
        for (let j = 0; j < subNodeCount; j++) {
          const subGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
          const subMat = new THREE.MeshStandardMaterial({
            color: j % 2 === 0 ? primaryCol : 0xffffff,
            emissive: j % 2 === 0 ? primaryCol : 0x000000,
            emissiveIntensity: 0.5,
          });
          const subMesh = new THREE.Mesh(subGeo, subMat);
          const angle = (j / subNodeCount) * Math.PI * 2;
          subMesh.position.set(Math.cos(angle) * 1.3, 0.35, Math.sin(angle) * 1.3);
          mesh.add(subMesh);
        }
      });

      // Connecting vertical data transmission conduits
      const conduitGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.6, 8);
      const conduitMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
      const conduit = new THREE.Mesh(conduitGeo, conduitMat);
      group.add(conduit);
    } else if (type === 'erp') {
      // Central ERP Engine Hub with 4 satellite satellite cubes
      const centralGeo = new THREE.DodecahedronGeometry(1.5, 0);
      const centralMat = new THREE.MeshPhysicalMaterial({
        color: 0x0b1f3a,
        emissive: 0x15803d,
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.15,
        wireframe: isWireframe,
      });
      const centralMesh = new THREE.Mesh(centralGeo, centralMat);
      centralMesh.userData = { baseY: 0, explodedY: 0, index: 0 };
      group.add(centralMesh);
      layersRef.current.push(centralMesh);

      // Orbiting ERP Modules: Inventory, GST, Billing, Reports
      const moduleOffsets = [
        { x: 2.2, z: 0, label: 'Inventory' },
        { x: -2.2, z: 0, label: 'GST Ledger' },
        { x: 0, z: 2.2, label: 'Invoicing' },
        { x: 0, z: -2.2, label: 'Analytics' },
      ];

      moduleOffsets.forEach((pos, idx) => {
        const modGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const modMat = new THREE.MeshStandardMaterial({
          color: idx % 2 === 0 ? primaryCol : accentCol,
          emissive: idx % 2 === 0 ? primaryCol : accentCol,
          emissiveIntensity: 0.4,
          metalness: 0.7,
          roughness: 0.3,
          wireframe: isWireframe,
        });
        const modMesh = new THREE.Mesh(modGeo, modMat);
        modMesh.position.set(pos.x, 0, pos.z);
        modMesh.userData = {
          baseX: pos.x,
          baseZ: pos.z,
          explodedX: pos.x * 1.8,
          explodedZ: pos.z * 1.8,
          index: idx + 1,
        };
        group.add(modMesh);
        layersRef.current.push(modMesh);

        // Connector line
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(pos.x, 0, pos.z),
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x15803d, transparent: true, opacity: 0.5 });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      });

      // Protective Orbit Ring
      const ringGeo = new THREE.TorusGeometry(3.0, 0.04, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    } else if (type === 'mobile') {
      // 3D Smartphone Device Mockup with Exploded Interface Layers
      // Layer 0: Phone Chassis
      const chassisGeo = new THREE.BoxGeometry(2.4, 4.4, 0.25);
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x0b1f3a,
        metalness: 0.95,
        roughness: 0.1,
        wireframe: isWireframe,
      });
      const chassis = new THREE.Mesh(chassisGeo, chassisMat);
      chassis.position.z = -0.5;
      chassis.userData = { baseZ: -0.5, explodedZ: -1.4, index: 0 };
      group.add(chassis);
      layersRef.current.push(chassis);

      // Layer 1: Hardware & SQLite Storage Plate
      const hardwareGeo = new THREE.BoxGeometry(2.2, 4.1, 0.08);
      const hardwareMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        emissive: 0x15803d,
        emissiveIntensity: 0.3,
        metalness: 0.8,
        wireframe: isWireframe,
      });
      const hardware = new THREE.Mesh(hardwareGeo, hardwareMat);
      hardware.position.z = 0;
      hardware.userData = { baseZ: 0, explodedZ: 0, index: 1 };
      group.add(hardware);
      layersRef.current.push(hardware);

      // Layer 2: Glass AMOLED Display Screen
      const displayGeo = new THREE.BoxGeometry(2.2, 4.1, 0.05);
      const displayMat = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.4,
        roughness: 0.05,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
        wireframe: isWireframe,
      });
      const display = new THREE.Mesh(displayGeo, displayMat);
      display.position.z = 0.5;
      display.userData = { baseZ: 0.5, explodedZ: 1.4, index: 2 };
      group.add(display);
      layersRef.current.push(display);
    } else if (type === 'security') {
      // 3D Encrypted Security Cylinder with Outer Defensive Shield
      const innerCoreGeo = new THREE.CylinderGeometry(1.2, 1.2, 2.8, 32);
      const innerCoreMat = new THREE.MeshStandardMaterial({
        color: 0x0b1f3a,
        emissive: 0xd4a72c,
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: isWireframe,
      });
      const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      innerCore.userData = { baseY: 0, explodedY: 0, index: 0 };
      group.add(innerCore);
      layersRef.current.push(innerCore);

      // 3 Rotating Outer Encryption Cipher Rings
      const ringHeights = [-0.8, 0, 0.8];
      ringHeights.forEach((y, idx) => {
        const cRingGeo = new THREE.TorusGeometry(1.8 + idx * 0.3, 0.08, 16, 48);
        const cRingMat = new THREE.MeshStandardMaterial({
          color: idx === 1 ? 0xf97316 : 0x3b82f6,
          emissive: idx === 1 ? 0xf97316 : 0x3b82f6,
          emissiveIntensity: 0.5,
          metalness: 0.8,
          wireframe: isWireframe,
        });
        const cRing = new THREE.Mesh(cRingGeo, cRingMat);
        cRing.position.y = y;
        cRing.rotation.x = Math.PI / 2;
        cRing.userData = { baseY: y, explodedY: y * 2.2, index: idx + 1 };
        group.add(cRing);
        layersRef.current.push(cRing);
      });
    }

    // Add surrounding 3D digital particle field
    const pGeo = new THREE.BufferGeometry();
    const pCount = 120;
    const pPositions = new Float32Array(pCount * 3);
    for (let k = 0; k < pCount * 3; k += 3) {
      pPositions[k] = (Math.random() - 0.5) * 8;
      pPositions[k + 1] = (Math.random() - 0.5) * 8;
      pPositions[k + 2] = (Math.random() - 0.5) * 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      color: primaryCol,
      transparent: true,
      opacity: 0.6,
    });
    const pts = new THREE.Points(pGeo, pMat);
    group.add(pts);
  };

  // Initialize Three.js on Mount
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 600;
    const height = 480;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 9);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(amb);

    const dir1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dir1.position.set(5, 8, 5);
    scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0xf97316, 1.5);
    dir2.position.set(-6, -3, 3);
    scene.add(dir2);

    // Build the initial model
    buildModel(scene, activeModel);

    // Resize listener
    const onResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      cameraRef.current.aspect = w / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let clock = new THREE.Clock();
    const renderLoop = () => {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();

      // Smooth rotation lerp
      rotCurrent.current.x += (rotTarget.current.x - rotCurrent.current.x) * 0.08;
      rotCurrent.current.y += (rotTarget.current.y - rotCurrent.current.y) * 0.08;

      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.x = rotCurrent.current.x;
        modelGroupRef.current.rotation.y = rotCurrent.current.y;

        if (isAutoSpin && !isDragging.current) {
          rotTarget.current.y += delta * 0.35;
        }

        // Exploded View Lerping
        layersRef.current.forEach((layer) => {
          if (layer.userData.explodedY !== undefined) {
            const targetY = isExploded ? layer.userData.explodedY : layer.userData.baseY;
            layer.position.y += (targetY - layer.position.y) * 0.1;
          }
          if (layer.userData.explodedX !== undefined) {
            const targetX = isExploded ? layer.userData.explodedX : layer.userData.baseX;
            const targetZ = isExploded ? layer.userData.explodedZ : layer.userData.baseZ;
            layer.position.x += (targetX - layer.position.x) * 0.1;
            layer.position.z += (targetZ - layer.position.z) * 0.1;
          }
          if (layer.userData.explodedZ !== undefined) {
            const targetZ = isExploded ? layer.userData.explodedZ : layer.userData.baseZ;
            layer.position.z += (targetZ - layer.position.z) * 0.1;
          }
        });
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  // Switch model
  useEffect(() => {
    if (sceneRef.current) {
      buildModel(sceneRef.current, activeModel);
    }
  }, [activeModel, isWireframe]);

  // Mouse drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - prevMouse.current.x;
    const deltaY = e.clientY - prevMouse.current.y;
    rotTarget.current.y += deltaX * 0.008;
    rotTarget.current.x += deltaY * 0.008;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleResetCamera = () => {
    rotTarget.current = { x: 0.3, y: 0.6 };
    rotCurrent.current = { x: 0.3, y: 0.6 };
  };

  return (
    <section id="three-d-lab" className="py-20 md:py-28 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* 3D Background Lighting Mesh */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#F97316]/10 via-[#D4A72C]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#15803D]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#F97316] mb-4">
            <Rotate3d className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="uppercase tracking-wider font-mono text-[11px]">Interactive 3D Engineering Lab</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4 leading-tight">
            Explore Our Digital Architecture in 3D.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Rotate, inspect, and explode Anivex Solution's full-stack technology layers. Built for extreme scalability, GST adherence, and zero downtime.
          </p>
        </div>

        {/* 3D System Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'cloud', label: 'Cloud Microservices', icon: Server },
            { id: 'erp', label: 'VyaparDesk ERP Core', icon: Database },
            { id: 'mobile', label: 'Mobile & Progressive App', icon: Smartphone },
            { id: 'security', label: 'AES-256 Vault & Security', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModel === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveModel(tab.id as ModelType);
                  setSelectedLayerIndex(0);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Viewport & Specification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive 3D Canvas Box */}
          <div
            ref={containerRef}
            className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-[#0F294D] to-[#08172E] border border-white/15 shadow-2xl overflow-hidden flex flex-col justify-between p-4"
          >
            {/* Canvas */}
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none z-0"
            />

            {/* Top 3D Control Strip */}
            <div className="relative z-10 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-slate-200 font-semibold">{currentInfo.title}</span>
              </div>

              {/* Action Buttons: Explode, Wireframe, Spin, Reset */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsExploded((prev) => !prev)}
                  title={isExploded ? 'Collapse Layers' : 'Explode 3D Layers'}
                  className={`p-2 rounded-xl backdrop-blur-md border text-xs transition-all cursor-pointer ${
                    isExploded
                      ? 'bg-[#F97316] text-white border-[#F97316]'
                      : 'bg-black/40 hover:bg-black/60 text-slate-200 border-white/15'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsWireframe((prev) => !prev)}
                  title="Toggle Wireframe"
                  className={`p-2 rounded-xl backdrop-blur-md border text-xs transition-all cursor-pointer ${
                    isWireframe
                      ? 'bg-[#F97316] text-white border-[#F97316]'
                      : 'bg-black/40 hover:bg-black/60 text-slate-200 border-white/15'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsAutoSpin((prev) => !prev)}
                  title={isAutoSpin ? 'Pause Orbit' : 'Auto Orbit'}
                  className="p-2 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-slate-200 text-xs transition-all cursor-pointer"
                >
                  <Rotate3d className={`w-4 h-4 ${isAutoSpin ? 'text-emerald-400' : 'text-slate-400'}`} />
                </button>

                <button
                  type="button"
                  onClick={handleResetCamera}
                  title="Reset 3D Angle"
                  className="p-2 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-slate-200 text-xs transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom 3D Drag Guide */}
            <div className="relative z-10 flex items-center justify-between pointer-events-none pt-4">
              <span className="text-[11px] font-mono text-slate-400 bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                ↔ Drag in 360° to rotate perspective
              </span>
              <span className="text-[11px] font-mono text-[#F97316] bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                {isExploded ? 'Mode: Exploded Internal View' : 'Mode: Compact Assembly'}
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Specifications & Tech Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-mono text-[#F97316] uppercase tracking-wider font-bold">
                  {currentInfo.subtitle}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  PROD READY
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl text-white mb-3">
                {currentInfo.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {currentInfo.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
                  Engineering Invariants
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentInfo.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs"
                    >
                      <p className="text-slate-400 text-[11px] mb-0.5">{spec.label}</p>
                      <p className="font-mono font-bold text-white text-[12px]">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Client Source Code Transfer</span>
                </div>
                <span className="font-mono text-[#D4A72C]">Direct Engineering</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm transition-all shadow-lg shadow-[#F97316]/25 hover:shadow-xl cursor-pointer"
            >
              <span>Engineer This System For Your Business</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
