import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreePerfumeScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Set field of view, aspect ratio, and clipping planes
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for mobile GPU health
    containerRef.current.appendChild(renderer.domElement);

    // 2. Create the Luxury Faceted Gemstone (representing perfume spirit)
    const gemGroup = new THREE.Group();
    scene.add(gemGroup);

    // Geometry & Material
    // Icosahedron with 0 details gives a gorgeous 20-faceted classic gemstone structure
    const gemGeometry = new THREE.IcosahedronGeometry(1.6, 0);
    const gemMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gold
      metalness: 0.9,
      roughness: 0.15,
      flatShading: true, // Crucial for facet reflections!
    });

    const mainGem = new THREE.Mesh(gemGeometry, gemMaterial);
    gemGroup.add(mainGem);

    // Add a delicate outer wireframe for that tech-luxury high-end feel
    const wireGeometry = new THREE.IcosahedronGeometry(1.62, 0);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const gemWire = new THREE.Mesh(wireGeometry, wireMaterial);
    gemGroup.add(gemWire);

    // 3. Create smaller floating satellite crystal particles
    const particleCount = 24;
    const particlesGroup = new THREE.Group();
    scene.add(particlesGroup);

    const particles = [];
    const particleGeometry = new THREE.DodecahedronGeometry(0.12, 0);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff0b3,
      metalness: 0.8,
      roughness: 0.1,
      flatShading: true
    });

    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(particleGeometry, particleMaterial);
      
      // Distribute in a sphere radius around the main gemstone
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 1.5; // distance from center

      mesh.position.x = r * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = r * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = r * Math.cos(phi);

      mesh.userData = {
        speedX: (Math.random() - 0.5) * 0.015,
        speedY: (Math.random() - 0.5) * 0.015,
        speedZ: (Math.random() - 0.5) * 0.015,
        rotSpeed: (Math.random() - 0.5) * 0.02
      };

      particlesGroup.add(mesh);
      particles.push(mesh);
    }

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0d0, 2.5); // Warm gold key light
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8a2be2, 1.8); // Purple fill light for vibrant bounce
    fillLight.position.set(-5, -3, 2);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xffffff, 2, 10);
    backLight.position.set(0, 0, -4);
    scene.add(backLight);

    // 5. Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let scrollY = 0;
    let targetScrollY = 0;

    // Detect mouse move
    const handleMouseMove = (event) => {
      // Coordinates normalized to [-1, 1]
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Detect scroll
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 6. Animation loop
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerping
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Smooth scroll lerping
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Apply rotations to main crystal gemstone
      mainGem.rotation.y += 0.006;
      mainGem.rotation.x += 0.003;
      gemWire.rotation.y -= 0.004;

      // React to mouse movement (tilt)
      gemGroup.rotation.y = targetX * 0.6;
      gemGroup.rotation.x = -targetY * 0.6;

      // React to scroll movement (translate and rotate)
      gemGroup.position.y = -scrollY * 0.0018;
      gemGroup.rotation.z = scrollY * 0.001;

      // Animate floating satellites
      particles.forEach((p) => {
        p.position.x += p.userData.speedX;
        p.position.y += p.userData.speedY;
        p.position.z += p.userData.speedZ;

        // Keep them bounded in a box
        if (Math.abs(p.position.x) > 4) p.userData.speedX *= -1;
        if (Math.abs(p.position.y) > 4) p.userData.speedY *= -1;
        if (Math.abs(p.position.z) > 4) p.userData.speedZ *= -1;

        p.rotation.x += p.userData.rotSpeed;
        p.rotation.y += p.userData.rotSpeed;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects to prevent GPU memory leaks
      gemGeometry.dispose();
      gemMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ThreePerfumeScene;
