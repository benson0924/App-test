import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface BlochSphereProps {
  x: number;
  y: number;
  z: number;
  onDrag?: (theta: number, phi: number) => void;
  width?: number;
  height?: number;
}

export default function BlochSphere3D({ x, y, z, onDrag, width = 400, height = 400 }: BlochSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x, y, z });
  stateRef.current = { x, y, z };

  const initScene = useCallback((container: HTMLDivElement) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--sphere-bg').trim() || '#eef2ff');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.5, 1.5, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Sphere wireframe
    const sphereGeo = new THREE.SphereGeometry(1, 32, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    scene.add(new THREE.Mesh(sphereGeo, sphereMat));

    // Axes
    const axisMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.5 });
    [['x', 0xff6b6b], ['y', 0x51cf66], ['z', 0x339af0]].forEach(([_, color], i) => {
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(
        i === 0 ? 1.3 : 0, i === 1 ? 1.3 : 0, i === 2 ? 1.3 : 0
      )];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: color as number });
      scene.add(new THREE.Line(geo, mat));
    });

    // State vector arrow
    const arrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      1,
      0xf59f00,
      0.08,
      0.05
    );
    scene.add(arrow);

    // Labels at poles
    const addLabel = (text: string, pos: THREE.Vector3) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 32;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#6366f1';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, 32, 22);
      const tex = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex }));
      sprite.position.copy(pos);
      sprite.scale.set(0.3, 0.15, 1);
      scene.add(sprite);
    };
    addLabel('|0⟩', new THREE.Vector3(0, 0, 1.15));
    addLabel('|1⟩', new THREE.Vector3(0, 0, -1.15));

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const { x: sx, y: sy, z: sz } = stateRef.current;
      const dir = new THREE.Vector3(sx, sy, sz).normalize();
      arrow.setDirection(dir.length() > 0 ? dir : new THREE.Vector3(0, 0, 1));
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [width, height]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    return initScene(container);
  }, [initScene]);

  return (
    <div ref={containerRef} style={{ borderRadius: 'var(--radius)', overflow: 'hidden', margin: '1rem 0' }} />
  );
}
