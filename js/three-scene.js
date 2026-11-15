/**
 * 3D Interactive WebGL Scene for Portfolio with 3D Developer Platform & Multi-Theme Switching
 * Powered by Three.js
 *
 * Featured Themes:
 * 0: 3D Developer Floating Platform with Laptop & Orbiting Angular Tech Cards (Primary Requested Masterpiece)
 * 1: Cosmic Celestial Sphere with Neon Orbital Rings & Floating Bubbles (Sample 1)
 * 2: Quantum Interlocking Torus Rings with Planet Horizon (Sample 2)
 * 3: Faceted Cyber Crystal & Glowing Nucleus
 * 4: Stellar Nebula Galaxy Vortex
 */

(function () {
    'use strict';

    function isWebGLAvailable() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    if (!isWebGLAvailable() || typeof THREE === 'undefined') {
        console.warn('WebGL or Three.js not available. Using CSS animations fallback.');
        return;
    }

    // --- PROCEDURAL TEXTURES GENERATORS ---
    function createGlowTexture(coreColor, rimColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, coreColor || 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, rimColor || 'rgba(167, 139, 250, 0.8)');
        gradient.addColorStop(0.6, 'rgba(139, 53, 255, 0.25)');
        gradient.addColorStop(1, 'rgba(3, 4, 11, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // Angular Shield Logo Texture
    function createAngularLogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Dark rounded card bg
        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        // Glowing border
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#dd0031';
        ctx.stroke();

        // Angular Shield Polygon
        ctx.save();
        ctx.translate(128, 128);
        ctx.beginPath();
        ctx.moveTo(0, -78);
        ctx.lineTo(68, -44);
        ctx.lineTo(54, 48);
        ctx.lineTo(0, 78);
        ctx.lineTo(-54, 48);
        ctx.lineTo(-68, -44);
        ctx.closePath();

        const shieldGrad = ctx.createLinearGradient(-60, -70, 60, 70);
        shieldGrad.addColorStop(0, '#dd0031');
        shieldGrad.addColorStop(1, '#c3002f');
        ctx.fillStyle = shieldGrad;
        ctx.shadowColor = '#ff2a5f';
        ctx.shadowBlur = 25;
        ctx.fill();

        // White Angular "A"
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(0, -56);
        ctx.lineTo(44, 42);
        ctx.lineTo(26, 42);
        ctx.lineTo(16, 18);
        ctx.lineTo(-16, 18);
        ctx.lineTo(-26, 42);
        ctx.lineTo(-44, 42);
        ctx.closePath();
        ctx.fill();

        // Center cutout of A
        ctx.fillStyle = '#c3002f';
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(11, 4);
        ctx.lineTo(-11, 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // TypeScript Logo Texture
    function createTSLogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#3178c6';
        ctx.stroke();

        // TS Blue box
        ctx.fillStyle = '#3178c6';
        ctx.beginPath();
        ctx.roundRect(36, 36, 184, 184, 28);
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 20;
        ctx.fill();

        // "TS" Text
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 100px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('TS', 128, 134);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // Three.js Logo Texture
    function createThreeLogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#00d5ff';
        ctx.stroke();

        // Three.js wireframe triangle
        ctx.save();
        ctx.translate(128, 110);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.shadowColor = '#00d5ff';
        ctx.shadowBlur = 18;

        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.lineTo(50, 40);
        ctx.lineTo(-50, 40);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.lineTo(0, 40);
        ctx.moveTo(50, 40);
        ctx.lineTo(-25, -5);
        ctx.moveTo(-50, 40);
        ctx.lineTo(25, -5);
        ctx.stroke();
        ctx.restore();

        // "three.js" text below
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 32px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('three.js', 128, 206);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // JavaScript Logo Texture
    function createJSLogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#f7df1e';
        ctx.stroke();

        ctx.fillStyle = '#f7df1e';
        ctx.beginPath();
        ctx.roundRect(36, 36, 184, 184, 28);
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 20;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#000000';
        ctx.font = '900 106px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('JS', 130, 138);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // Hoodie Code Logo Texture
    function createCodeBracketsTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, 128, 128);

        ctx.fillStyle = '#247bff';
        ctx.shadowColor = '#00d5ff';
        ctx.shadowBlur = 15;
        ctx.font = 'bold 70px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('</>', 64, 64);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // SCSS Logo Texture
    function createSCSSLogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#cf649a';
        ctx.stroke();

        ctx.fillStyle = '#cf649a';
        ctx.font = 'bold 72px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 18;
        ctx.fillText('SCSS', 128, 128);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // HTML5 Logo Texture
    function createHTML5LogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#e34f26';
        ctx.stroke();

        ctx.fillStyle = '#e34f26';
        ctx.beginPath();
        ctx.moveTo(68, 48);
        ctx.lineTo(188, 48);
        ctx.lineTo(178, 178);
        ctx.lineTo(128, 208);
        ctx.lineTo(78, 178);
        ctx.closePath();
        ctx.shadowColor = '#ff6b35';
        ctx.shadowBlur = 18;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 88px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('5', 128, 124);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // RxJS Logo Texture
    function createRxJSLogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#d80064';
        ctx.stroke();

        // RxJS Magenta Hexagon Badge
        ctx.save();
        ctx.translate(128, 128);
        ctx.fillStyle = '#d80064';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3 - Math.PI / 6;
            const x = Math.cos(angle) * 78;
            const y = Math.sin(angle) * 78;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // RxJS Text inside
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 64px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Rx', -4, -8);

        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillText('JS', 2, 38);
        ctx.restore();

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // Procedural Alien Planet Surface with Craters & Rocky Terrain
    function createAlienPlanetTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        // Dark basalt/obsidian base with deep purple-navy gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
        bgGrad.addColorStop(0, '#0d0b1a');
        bgGrad.addColorStop(0.5, '#070612');
        bgGrad.addColorStop(1, '#04030a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 1024);

        // Rocky terrain noise and craters
        const rng = (seed) => {
            let s = seed;
            return () => {
                s = (s * 9301 + 49297) % 233280;
                return s / 233280;
            };
        };
        const rand = rng(42);

        for (let i = 0; i < 65; i++) {
            const cx = rand() * 1024;
            const cy = rand() * 1024;
            const r = 8 + rand() * 45;

            // Crater shadow interior
            const craterGrad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 1, cx, cy, r);
            craterGrad.addColorStop(0, '#030206');
            craterGrad.addColorStop(0.7, '#070612');
            craterGrad.addColorStop(0.9, '#181432');
            craterGrad.addColorStop(1, 'rgba(40, 30, 70, 0)');
            ctx.fillStyle = craterGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();

            // Crater rim light (lit from top-left with electric-blue & purple rim)
            ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 213, 255, 0.45)' : 'rgba(180, 77, 255, 0.5)';
            ctx.lineWidth = 1.5 + rand() * 2.5;
            ctx.beginPath();
            ctx.arc(cx, cy, r, Math.PI * 0.8, Math.PI * 1.8);
            ctx.stroke();

            // Dark inner shadow rim opposite side
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.lineWidth = 2 + rand() * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, r, -Math.PI * 0.2, Math.PI * 0.8);
            ctx.stroke();
        }

        // Atmospheric dust / nebula mist overlay
        const dustGrad = ctx.createRadialGradient(512, 100, 100, 512, 512, 600);
        dustGrad.addColorStop(0, 'rgba(139, 53, 255, 0.12)');
        dustGrad.addColorStop(0.6, 'rgba(36, 123, 255, 0.08)');
        dustGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = dustGrad;
        ctx.fillRect(0, 0, 1024, 1024);

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        return texture;
    }

    // Atmospheric Haze Texture (Purple & Cyan Horizon Mist)
    function createAtmosphericHazeTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        const grad = ctx.createLinearGradient(0, 128, 0, 0);
        grad.addColorStop(0, 'rgba(0, 213, 255, 0.6)');
        grad.addColorStop(0.3, 'rgba(139, 53, 255, 0.4)');
        grad.addColorStop(0.7, 'rgba(36, 123, 255, 0.15)');
        grad.addColorStop(1, 'rgba(3, 4, 11, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 128);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // --- SETUP THREE.JS SCENE, CAMERA, RENDERER ---
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.065);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const purpleDirLight = new THREE.DirectionalLight(0x8b35ff, 2.8);
    purpleDirLight.position.set(30, 35, 40);
    scene.add(purpleDirLight);

    const blueDirLight = new THREE.DirectionalLight(0x247bff, 2.2);
    blueDirLight.position.set(-30, -25, 30);
    scene.add(blueDirLight);

    const cyanPointLight = new THREE.PointLight(0x00d5ff, 2.0, 50);
    cyanPointLight.position.set(15, 6, 20);
    scene.add(cyanPointLight);

    const particleTexture = createGlowTexture();
    const angularLogoTex = createAngularLogoTexture();
    const tsLogoTex = createTSLogoTexture();
    const threeLogoTex = createThreeLogoTexture();
    const jsLogoTex = createJSLogoTexture();
    const codeBracketsTex = createCodeBracketsTexture();
    const rxjsLogoTex = createRxJSLogoTexture();
    const alienPlanetTex = createAlienPlanetTexture();
    const atmosphericHazeTex = createAtmosphericHazeTexture();

    // MOUSE & SCROLL STATE
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);

    // =========================================================================
    // THEME 0: ISOMETRIC CYBER-GLASS ENGINEERING STAGE (FLAGSHIP SHOWCASE)
    // =========================================================================
    const devThemeGroup = new THREE.Group();
    scene.add(devThemeGroup);

    // 1. Architectural Micro-Grid Floor at y = -2.2 with Cyan/Slate Lines & Fog Dissolve
    const gridHelper = new THREE.GridHelper(36, 72, 0x38bdf8, 0x1e293b);
    gridHelper.position.set(0, -2.2, 0);
    if (gridHelper.material) {
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.14;
        gridHelper.material.depthWrite = false;
    }
    devThemeGroup.add(gridHelper);

    // Floor Target Concentric Rings on the perspective grid
    const floorRingGeo1 = new THREE.RingGeometry(1.6, 1.62, 64);
    const floorRingMat1 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    const floorRing1 = new THREE.Mesh(floorRingGeo1, floorRingMat1);
    floorRing1.rotation.x = -Math.PI / 2;
    floorRing1.position.set(2.6, -2.19, 0);
    devThemeGroup.add(floorRing1);

    const floorRingGeo2 = new THREE.RingGeometry(2.4, 2.42, 64);
    const floorRingMat2 = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    const floorRing2 = new THREE.Mesh(floorRingGeo2, floorRingMat2);
    floorRing2.rotation.x = -Math.PI / 2;
    floorRing2.position.set(2.6, -2.19, 0);
    devThemeGroup.add(floorRing2);

    // 3D Energy Shockwave Horizontal Ring across grid floor
    const floorShockwaveGeo = new THREE.RingGeometry(0.2, 0.45, 64);
    const floorShockwaveMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const floorShockwaveRing = new THREE.Mesh(floorShockwaveGeo, floorShockwaveMat);
    floorShockwaveRing.rotation.x = -Math.PI / 2;
    floorShockwaveRing.position.set(2.6, -2.18, 0);
    devThemeGroup.add(floorShockwaveRing);

    let devBurstProgress = 1.0; // 0 to 1 when bursting

    function triggerDevEnergyBurst() {
        devBurstProgress = 0.0;
    }

    // 2. Multi-Tiered Isometric Glass Platform Assembly
    const stageGroup = new THREE.Group();
    // Desktop initial position: x = +2.6, y = 0.1, z = 0
    stageGroup.position.set(2.6, 0.1, 0);
    stageGroup.rotation.set(0.42, -0.55, 0);
    devThemeGroup.add(stageGroup);

    // Tier 1: Base Tier - Dark brushed-obsidian beveled slab
    const baseSlabGeo = new THREE.CylinderGeometry(2.15, 2.35, 0.26, 6);
    const baseSlabMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a0f1d,
        roughness: 0.25,
        metalness: 0.82,
        clearcoat: 0.7,
        clearcoatRoughness: 0.2
    });
    const baseSlab = new THREE.Mesh(baseSlabGeo, baseSlabMat);
    baseSlab.position.y = -0.32;

    const baseEdgesGeo = new THREE.EdgesGeometry(baseSlabGeo);
    const baseEdgesMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75
    });
    const baseEdges = new THREE.LineSegments(baseEdgesGeo, baseEdgesMat);
    baseSlab.add(baseEdges);
    stageGroup.add(baseSlab);

    // Tier 2: Middle Tier - Frosted translucent glass slab
    const glassSlabGeo = new THREE.CylinderGeometry(1.8, 1.92, 0.14, 6);
    const glassSlabMat = new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        transmission: 0.65,
        opacity: 0.45,
        transparent: true,
        roughness: 0.15,
        ior: 1.45,
        reflectivity: 0.75,
        depthWrite: false
    });
    const glassSlab = new THREE.Mesh(glassSlabGeo, glassSlabMat);
    glassSlab.position.y = 0.02;

    const glassEdgesGeo = new THREE.EdgesGeometry(glassSlabGeo);
    const glassEdgesMat = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.65
    });
    const glassEdges = new THREE.LineSegments(glassEdgesGeo, glassEdgesMat);
    glassSlab.add(glassEdges);

    // Subtle circuit / architecture trace lines on frosted glass surface
    const traceGeo = new THREE.RingGeometry(0.5, 1.35, 6);
    const traceMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending
    });
    const traceMesh = new THREE.Mesh(traceGeo, traceMat);
    traceMesh.rotation.x = -Math.PI / 2;
    traceMesh.position.y = 0.08;
    glassSlab.add(traceMesh);
    stageGroup.add(glassSlab);

    // Tier 3: Top Core Assembly (Reactive Architecture Core)
    const coreGroup = new THREE.Group();
    coreGroup.position.y = 1.05;

    // A. Reactive Architecture Core (Crisp wireframe + translucent faceted icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.72, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x060913,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.45,
        roughness: 0.2,
        metalness: 0.85,
        transparent: true,
        opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);

    const coreEdgesGeo = new THREE.EdgesGeometry(coreGeo);
    const coreEdgesMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.95
    });
    const coreCage = new THREE.LineSegments(coreEdgesGeo, coreEdgesMat);
    coreMesh.add(coreCage);
    coreGroup.add(coreMesh);

    // Inner Luminous Precision Crystal (Octahedron)
    const stageOctaGeo = new THREE.OctahedronGeometry(0.34, 0);
    const stageOctaMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const stageOctaMesh = new THREE.Mesh(stageOctaGeo, stageOctaMat);
    coreGroup.add(stageOctaMesh);

    // B. 2 Tilted Thin Orbital Data Rings
    const orbitRingGeo1 = new THREE.TorusGeometry(1.28, 0.015, 16, 100);
    const orbitRingMat1 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const orbitRing1 = new THREE.Mesh(orbitRingGeo1, orbitRingMat1);
    orbitRing1.rotation.set(0.78, 0.38, 0.2);
    coreGroup.add(orbitRing1);

    const orbitRingGeo2 = new THREE.TorusGeometry(1.54, 0.012, 16, 100);
    const orbitRingMat2 = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });
    const orbitRing2 = new THREE.Mesh(orbitRingGeo2, orbitRingMat2);
    orbitRing2.rotation.set(-0.62, -0.68, 0.46);
    coreGroup.add(orbitRing2);

    // C. 6–8 Glowing Micro-Nodes Connected by Delicate Curved Data Splines
    const microNodes = [];
    const nodeCount = 7;
    const nodeSphGeo = new THREE.SphereGeometry(0.052, 16, 16);

    for (let i = 0; i < nodeCount; i++) {
        const isCyan = i % 2 === 0;
        const nodeMat = new THREE.MeshBasicMaterial({
            color: isCyan ? 0x38bdf8 : 0x10b981,
            transparent: true,
            opacity: 0.95
        });
        const nodeMesh = new THREE.Mesh(nodeSphGeo, nodeMat);
        const radius = 1.15 + (i % 3) * 0.18;
        const speed = 0.5 + (i % 4) * 0.15;
        const phase = (i / nodeCount) * Math.PI * 2;
        nodeMesh.userData = { radius, speed, phase, isCyan };
        coreGroup.add(nodeMesh);
        microNodes.push(nodeMesh);

        // Curved spline line connecting core center to micro-node
        const lineGeo = new THREE.BufferGeometry();
        const lineMat = new THREE.LineBasicMaterial({
            color: isCyan ? 0x38bdf8 : 0x6366f1,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending
        });
        const lineMesh = new THREE.Line(lineGeo, lineMat);
        coreGroup.add(lineMesh);
        nodeMesh.userData.splineLine = lineMesh;
    }
    stageGroup.add(coreGroup);

    // 3. Controlled Ambient Particles: ~120 sparse, slow-drifting micro-data motes
    const motesCount = 120;
    const motesPositions = new Float32Array(motesCount * 3);
    const motesColors = new Float32Array(motesCount * 3);
    const motesData = [];

    const cCyan = new THREE.Color(0x38bdf8);
    const cIndigo = new THREE.Color(0x6366f1);

    for (let i = 0; i < motesCount; i++) {
        const x = 2.6 + (Math.random() - 0.5) * 7.5;
        const y = -2.0 + Math.random() * 6.5;
        const z = (Math.random() - 0.5) * 6.0;
        motesPositions[i * 3] = x;
        motesPositions[i * 3 + 1] = y;
        motesPositions[i * 3 + 2] = z;

        const mixColor = Math.random() > 0.4 ? cCyan : cIndigo;
        motesColors[i * 3] = mixColor.r;
        motesColors[i * 3 + 1] = mixColor.g;
        motesColors[i * 3 + 2] = mixColor.b;

        motesData.push({
            speed: 0.003 + Math.random() * 0.005,
            baseX: x,
            swayFreq: 0.5 + Math.random() * 1.2,
            swayAmp: 0.08 + Math.random() * 0.12
        });
    }

    const motesGeo = new THREE.BufferGeometry();
    motesGeo.setAttribute('position', new THREE.BufferAttribute(motesPositions, 3));
    motesGeo.setAttribute('color', new THREE.BufferAttribute(motesColors, 3));
    const motesMat = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const motesMesh = new THREE.Points(motesGeo, motesMat);
    devThemeGroup.add(motesMesh);

    // 4. Studio Lighting for Theme 0
    const devAmbient = new THREE.AmbientLight(0x1e293b, 1.2);
    devThemeGroup.add(devAmbient);

    const devKeyLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    devKeyLight.position.set(6, 8, 5);
    devThemeGroup.add(devKeyLight);

    const devFillLight = new THREE.DirectionalLight(0x6366f1, 1.8);
    devFillLight.position.set(-6, -4, 4);
    devThemeGroup.add(devFillLight);

    const devPointLight = new THREE.PointLight(0x38bdf8, 1.2, 12);
    devPointLight.position.set(2.6, 2.5, 2.0);
    devThemeGroup.add(devPointLight);

    // THEME 1: COSMIC CELESTIAL SPHERE (SAMPLE 1)
    // =========================================================================
    const theme1Group = new THREE.Group();
    scene.add(theme1Group);

    const sphereGeo = new THREE.SphereGeometry(11, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
        color: 0x0c0b1a,
        emissive: 0x2b1055,
        specular: 0x8a2be2,
        shininess: 90,
        transparent: true,
        opacity: 0.96
    });
    const mainSphere = new THREE.Mesh(sphereGeo, sphereMat);
    theme1Group.add(mainSphere);

    const atmosphereGeo = new THREE.SphereGeometry(11.4, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    theme1Group.add(atmosphereMesh);

    function createThinNeonRing(radius, tube, color, rotX, rotY) {
        const geo = new THREE.TorusGeometry(radius, tube, 16, 120);
        const mat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = rotX;
        mesh.rotation.y = rotY;
        return mesh;
    }

    const ringT1_1 = createThinNeonRing(17.5, 0.16, 0x38bdf8, Math.PI / 3, Math.PI / 5);
    const ringT1_2 = createThinNeonRing(19.5, 0.14, 0xc084fc, -Math.PI / 3.5, Math.PI / 3);
    const ringT1_3 = createThinNeonRing(22.0, 0.10, 0x00f2fe, Math.PI / 2.2, -Math.PI / 8);
    theme1Group.add(ringT1_1);
    theme1Group.add(ringT1_2);
    theme1Group.add(ringT1_3);

    const theme1Bubbles = [];
    const bubbleGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const bubbleMat = new THREE.MeshPhongMaterial({
        color: 0x1e1b4b,
        emissive: 0x3b82f6,
        specular: 0xffffff,
        shininess: 120,
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < 6; i++) {
        const bubble = new THREE.Mesh(bubbleGeo, bubbleMat.clone());
        const scale = 0.5 + Math.random() * 0.8;
        bubble.scale.set(scale, scale, scale);
        const angle = (i / 6) * Math.PI * 2;
        const dist = 16 + Math.random() * 8;
        bubble.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 12, Math.sin(angle) * dist);
        bubble.userData = { angle: angle, dist: dist, speed: 0.008 + Math.random() * 0.012, yOffset: (Math.random() - 0.5) * 6 };
        theme1Group.add(bubble);
        theme1Bubbles.push(bubble);
    }

    // =========================================================================
    // THEME 2: QUANTUM INTERLOCKING TORUS RINGS + PLANET HORIZON (SAMPLE 2)
    // =========================================================================
    const theme2Group = new THREE.Group();
    scene.add(theme2Group);

    const torusGeo = new THREE.TorusGeometry(13.5, 2.0, 36, 100);
    const torusMatCyan = new THREE.MeshStandardMaterial({
        color: 0x00d2ff,
        emissive: 0x00558f,
        roughness: 0.2,
        metalness: 0.7
    });
    const torusCyan = new THREE.Mesh(torusGeo, torusMatCyan);
    torusCyan.rotation.set(Math.PI / 4, Math.PI / 6, 0);
    theme2Group.add(torusCyan);

    const torusMatPurple = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x581c87,
        roughness: 0.2,
        metalness: 0.7
    });
    const torusPurple = new THREE.Mesh(torusGeo, torusMatPurple);
    torusPurple.rotation.set(-Math.PI / 4, -Math.PI / 6, Math.PI / 4);
    theme2Group.add(torusPurple);

    const orbitTrack2 = createThinNeonRing(22, 0.12, 0xc084fc, Math.PI / 2.5, Math.PI / 8);
    theme2Group.add(orbitTrack2);

    const theme2Bubbles = [];
    for (let i = 0; i < 7; i++) {
        const orb = new THREE.Mesh(bubbleGeo, bubbleMat.clone());
        const scale = 0.6 + Math.random() * 0.9;
        orb.scale.set(scale, scale, scale);
        const angle = (i / 7) * Math.PI * 2;
        const dist = 18 + Math.random() * 10;
        orb.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 14, Math.sin(angle) * dist);
        orb.userData = { angle: angle, dist: dist, speed: 0.01 + Math.random() * 0.015, yOffset: (Math.random() - 0.5) * 8 };
        theme2Group.add(orb);
        theme2Bubbles.push(orb);
    }

    // Horizon sphere at bottom left
    const horizonGeo = new THREE.SphereGeometry(55, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x2e1065, transparent: true, opacity: 0.75 });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.position.set(-42, -50, -10);
    theme2Group.add(horizonMesh);

    // =========================================================================
    // THEME 3: CYBER CRYSTAL (SAMPLE 3)
    // =========================================================================
    const theme3Group = new THREE.Group();
    scene.add(theme3Group);

    const crystalGeo = new THREE.IcosahedronGeometry(12, 1);
    const crystalMat = new THREE.MeshBasicMaterial({ color: 0x7f5af0, wireframe: true, transparent: true, opacity: 0.5 });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    theme3Group.add(crystalMesh);

    const crystalNucleusGeo = new THREE.DodecahedronGeometry(6.5, 0);
    const crystalNucleusMat = new THREE.MeshStandardMaterial({ color: 0x2cb67d, emissive: 0x136a43, roughness: 0.2, metalness: 0.8 });
    const crystalNucleus = new THREE.Mesh(crystalNucleusGeo, crystalNucleusMat);
    theme3Group.add(crystalNucleus);

    const crystalRing1 = createThinNeonRing(17, 0.1, 0x2cb67d, Math.PI / 3, Math.PI / 4);
    const crystalRing2 = createThinNeonRing(19, 0.1, 0x7f5af0, -Math.PI / 4, Math.PI / 3);
    theme3Group.add(crystalRing1);
    theme3Group.add(crystalRing2);

    // =========================================================================
    // THEME 4: STELLAR NEBULA VORTEX (SAMPLE 4)
    // =========================================================================
    const theme4Group = new THREE.Group();
    scene.add(theme4Group);

    const vortexCount = 1200;
    const vortexGeo = new THREE.BufferGeometry();
    const vortexPositions = new Float32Array(vortexCount * 3);
    const vortexColors = new Float32Array(vortexCount * 3);

    const colRose = new THREE.Color(0xf43f5e);
    const colViolet = new THREE.Color(0x8b5cf6);
    const colCyan = new THREE.Color(0x06b6d4);

    for (let i = 0; i < vortexCount; i++) {
        const arm = i % 3;
        const angle = (i / vortexCount) * Math.PI * 6 + (arm * (Math.PI * 2 / 3));
        const dist = 3 + (i / vortexCount) * 22;
        vortexPositions[i * 3] = Math.cos(angle) * dist + (Math.random() - 0.5) * 3;
        vortexPositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
        vortexPositions[i * 3 + 2] = Math.sin(angle) * dist + (Math.random() - 0.5) * 3;

        const mixCol = (arm === 0) ? colRose : (arm === 1 ? colViolet : colCyan);
        vortexColors[i * 3] = mixCol.r;
        vortexColors[i * 3 + 1] = mixCol.g;
        vortexColors[i * 3 + 2] = mixCol.b;
    }
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3));
    vortexGeo.setAttribute('color', new THREE.BufferAttribute(vortexColors, 3));

    const vortexMat = new THREE.PointsMaterial({
        size: 1.6,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const vortexMesh = new THREE.Points(vortexGeo, vortexMat);
    theme4Group.add(vortexMesh);

    // Theme collection
    const themeGroups = [devThemeGroup, theme1Group, theme2Group, theme3Group, theme4Group];

    // =========================================================================
    // COMMON BACKGROUND: DEEP SPACE STARS & CYBER WAVE
    // =========================================================================
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 240;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 220;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
        size: 1.2,
        map: particleTexture,
        color: 0xa6a9bc,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Undulating Cyber Wave
    const waveCols = 38;
    const waveRows = 38;
    const waveCount = waveCols * waveRows;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);

    const cWave1 = new THREE.Color(0x8b35ff);
    const cWave2 = new THREE.Color(0x247bff);

    let idx = 0;
    for (let ix = 0; ix < waveCols; ix++) {
        for (let iy = 0; iy < waveRows; iy++) {
            wavePositions[idx * 3] = (ix - waveCols / 2) * 3.8;
            wavePositions[idx * 3 + 1] = -26;
            wavePositions[idx * 3 + 2] = (iy - waveRows / 2) * 3.8 - 15;

            const col = cWave1.clone().lerp(cWave2, (ix + iy) / (waveCols + waveRows));
            waveColors[idx * 3] = col.r;
            waveColors[idx * 3 + 1] = col.g;
            waveColors[idx * 3 + 2] = col.b;
            idx++;
        }
    }
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
        size: 1.5,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const waveMesh = new THREE.Points(waveGeo, waveMat);
    scene.add(waveMesh);

    // =========================================================================
    // DYNAMIC POSITIONING & THEME DATA
    // =========================================================================
    function getThemeBasePos(index) {
        const isDesktop = window.innerWidth > 968;
        if (index === 0) {
            // Theme 0: Isometric Cyber-Glass Engineering Stage centered with stageGroup at x = +2.6
            return {
                x: 0,
                y: 0,
                z: 0
            };
        }
        return {
            x: isDesktop ? 18 : 0,
            y: isDesktop ? 3 : -3,
            z: 10
        };
    }

    function positionThemeGroups() {
        themeGroups.forEach((grp, i) => {
            const pos = getThemeBasePos(i);
            grp.position.set(pos.x, pos.y, pos.z);
        });
    }
    positionThemeGroups();

    const THEME_DATA = [
        {
            id: 0,
            name: 'Cyber Engineering Stage',
            eyebrow: "AVAILABLE FOR OPPORTUNITIES",
            subtitle: "Senior Angular Developer",
            tagline: "Bridging creative design and robust frontend engineering at scale — building high-performance enterprise Angular applications in Hamburg.",
            accent: '#38bdf8',
            primaryAccent: '#38bdf8',
            secondaryAccent: '#6366f1',
            bgPrimary: '#060913',
            surfaceGlass: 'rgba(11, 18, 36, 0.74)'
        },
        {
            id: 1,
            name: 'Cosmic Sphere (Sample 1)',
            eyebrow: "HELLO, I'M",
            subtitle: "Senior Angular Developer",
            tagline: "I build modern, interactive and performant web experiences with Three.js and modern technologies.",
            accent: '#818cf8'
        },
        {
            id: 2,
            name: 'Quantum Rings (Sample 2)',
            eyebrow: "WELCOME TO MY PORTFOLIO",
            subtitle: "Senior Angular Developer",
            tagline: "I build modern, interactive and performant web experiences with Three.js and modern technologies.",
            accent: '#00d2ff'
        },
        {
            id: 3,
            name: 'Cyber Crystal',
            eyebrow: "SENIOR FRONTEND ENGINEER",
            subtitle: "Senior Angular Developer",
            tagline: "Architecting scalable enterprise Angular & WebGL web apps with precision & craft.",
            accent: '#2cb67d'
        },
        {
            id: 4,
            name: 'Stellar Nebula',
            eyebrow: "CREATIVE TECH ARCHITECT",
            subtitle: "Senior Angular Developer",
            tagline: "Bridging creative design and robust frontend engineering at scale in Hamburg.",
            accent: '#f43f5e'
        }
    ];

    function getDateAutoThemeIndex() {
        const day = new Date().getDate(); // 1 to 31
        return (day - 1) % 5;
    }

    let currentThemeIndex = 0; // Default to the 3D Developer Platform!
    let isAutoMode = false;
    let isEcoMode = false;

    function applyTheme(index, isManual = false) {
        if (index < 0 || index >= themeGroups.length) index = 0;
        currentThemeIndex = index;
        if (isManual) isAutoMode = false;

        themeGroups.forEach((grp, i) => {
            grp.visible = (i === index);
            if (i === index) {
                grp.scale.set(0.3, 0.3, 0.3);
            }
        });

        const data = THEME_DATA[index];
        const eyebrowEl = document.getElementById('heroEyebrow');
        if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

        const subtitleEl = document.querySelector('.hero-subtitle');
        if (subtitleEl) subtitleEl.textContent = data.subtitle;

        const taglineEl = document.querySelector('.hero-tagline');
        if (taglineEl) taglineEl.textContent = data.tagline;

        const themeLabelEl = document.getElementById('themeLabel');
        if (themeLabelEl) {
            themeLabelEl.textContent = isAutoMode ? `📅 ${data.name.split(' ')[0]} (Day ${new Date().getDate()})` : data.name.split(' ')[0];
        }

        document.body.setAttribute('data-theme', `theme-${index}`);

        document.querySelectorAll('.theme-opt, .theme-card-opt').forEach(btn => {
            const btnTheme = btn.getAttribute('data-theme');
            if (isAutoMode && btnTheme === 'auto') {
                btn.classList.add('active');
            } else if (!isAutoMode && parseInt(btnTheme, 10) === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        createShockwave(0.3, 0);
    }

    // =========================================================================
    // INTERACTIVE SHOCKWAVE SYSTEM
    // =========================================================================
    const shockwaves = [];
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.45, 32);

    function createShockwave(x, y) {
        const vector = new THREE.Vector3(x, y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z + 10;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        const mat = new THREE.MeshBasicMaterial({
            color: currentThemeIndex === 0 ? 0x38bdf8 : (currentThemeIndex === 2 ? 0x00d2ff : 0xb44dff),
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const shockwave = new THREE.Mesh(shockwaveGeo, mat);
        shockwave.position.copy(pos);
        shockwave.lookAt(camera.position);
        shockwave.userData = { scale: 1, opacity: 0.9, growth: 2.0 };
        scene.add(shockwave);
        shockwaves.push(shockwave);
    }

    // EVENT LISTENERS
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
        maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    }, { passive: true });

    window.addEventListener('click', (e) => {
        if (e.target.closest('button, a, input, select, .theme-menu')) return;
        const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
        const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
        createShockwave(ndcX, ndcY);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        positionThemeGroups();
        maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    });

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });

    // =========================================================================
    // ANIMATION LOOP
    // =========================================================================
    const clock = new THREE.Clock();

    function animate() {
        if (isEcoMode) return;
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        scrollY += (targetScrollY - scrollY) * 0.08;
        const scrollFraction = Math.min(1, Math.max(0, scrollY / maxScroll));

        const basePos = getThemeBasePos(currentThemeIndex);

        // 1. ANIMATE THEME 0 (ISOMETRIC CYBER-GLASS ENGINEERING STAGE)
        if (devThemeGroup.visible) {
            devThemeGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);

            const isDesktop = window.innerWidth > 968;
            const targetPosX = isDesktop ? 2.6 : 0;
            const targetPosY = isDesktop ? 0.1 : -0.6;
            const targetPosZ = isDesktop ? 0 : -1.5;
            const targetScale = isDesktop ? 1.0 : 0.72;

            stageGroup.position.x = THREE.MathUtils.lerp(stageGroup.position.x, targetPosX, 0.08);
            stageGroup.position.y = THREE.MathUtils.lerp(stageGroup.position.y, targetPosY, 0.08);
            stageGroup.position.z = THREE.MathUtils.lerp(stageGroup.position.z, targetPosZ, 0.08);
            stageGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

            // Harmonic levitation with layered phase offset
            baseSlab.position.y = -0.32 + Math.sin(elapsedTime * 1.1) * 0.04;
            glassSlab.position.y = 0.02 + Math.sin(elapsedTime * 1.1 + 0.3) * 0.06;
            coreGroup.position.y = 1.05 + Math.sin(elapsedTime * 1.1 + 0.6) * 0.09;

            // Core rotations
            coreMesh.rotation.y = elapsedTime * 0.35;
            coreMesh.rotation.x = elapsedTime * 0.15;
            stageOctaMesh.rotation.y = -elapsedTime * 0.52;

            orbitRing1.rotation.z = elapsedTime * 0.40;
            orbitRing2.rotation.z = -elapsedTime * 0.32;

            // Micro-nodes orbit & curved splines update
            const corePos = new THREE.Vector3(0, 0, 0);
            microNodes.forEach((node) => {
                const angle = elapsedTime * node.userData.speed + node.userData.phase;
                const r = node.userData.radius;
                const ny = Math.sin(angle * 1.6) * 0.38;
                const nx = Math.cos(angle) * r;
                const nz = Math.sin(angle) * r;
                node.position.set(nx, ny, nz);

                if (node.userData.splineLine) {
                    const midPoint = new THREE.Vector3(nx * 0.5, ny * 0.5 + 0.12, nz * 0.5);
                    const curve = new THREE.QuadraticBezierCurve3(corePos, midPoint, node.position);
                    const pts = curve.getPoints(12);
                    node.userData.splineLine.geometry.setFromPoints(pts);
                }
            });

            // Micro-data motes slow upward drift & subtle sway
            const positions = motesGeo.attributes.position.array;
            for (let i = 0; i < motesCount; i++) {
                const m = motesData[i];
                positions[i * 3 + 1] += m.speed;
                positions[i * 3] = m.baseX + Math.sin(elapsedTime * m.swayFreq) * m.swayAmp;
                if (positions[i * 3 + 1] > 4.5) {
                    positions[i * 3 + 1] = -2.0;
                }
            }
            motesGeo.attributes.position.needsUpdate = true;

            // Precision mouse parallax (lerp 0.05)
            stageGroup.rotation.y = THREE.MathUtils.lerp(stageGroup.rotation.y, -0.55 + mouse.x * 0.25, 0.05);
            stageGroup.rotation.x = THREE.MathUtils.lerp(stageGroup.rotation.x, 0.42 - mouse.y * 0.18, 0.05);

            if (waveMesh) waveMesh.visible = false;

            // Scroll parallax
            devThemeGroup.position.y = -scrollFraction * 4.0;
            devThemeGroup.position.z = -scrollFraction * 6.0;

            // 3D Energy Shockwave expansion
            if (devBurstProgress < 1.0) {
                devBurstProgress += 0.028;
                const shockRadius = 1 + devBurstProgress * 22;
                floorShockwaveRing.scale.set(shockRadius, shockRadius, 1);
                floorShockwaveMat.opacity = Math.max(0, (1 - devBurstProgress) * 0.88);
                coreMat.emissiveIntensity = 0.45 + Math.max(0, (1 - devBurstProgress) * 2.2);
                orbitRingMat1.opacity = 0.85 + Math.max(0, (1 - devBurstProgress) * 0.5);
                orbitRingMat2.opacity = 0.75 + Math.max(0, (1 - devBurstProgress) * 0.5);
            } else {
                floorShockwaveMat.opacity = 0;
            }
        } else {
            if (waveMesh) waveMesh.visible = true;
        }

        // 2. ANIMATE THEME 1 (Cosmic Sphere)
        if (theme1Group.visible) {
            theme1Group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
            mainSphere.rotation.y = elapsedTime * 0.2;
            atmosphereMesh.rotation.y = -elapsedTime * 0.25;

            ringT1_1.rotation.z = elapsedTime * 0.35;
            ringT1_2.rotation.z = -elapsedTime * 0.28;
            ringT1_3.rotation.y = elapsedTime * 0.2;

            theme1Bubbles.forEach(b => {
                b.userData.angle += b.userData.speed;
                b.position.x = Math.cos(b.userData.angle) * b.userData.dist;
                b.position.z = Math.sin(b.userData.angle) * b.userData.dist;
                b.position.y = b.userData.yOffset + Math.sin(elapsedTime * 1.5 + b.userData.angle) * 2;
            });

            theme1Group.rotation.y = mouse.x * 0.45;
            theme1Group.rotation.x = -mouse.y * 0.3;
            theme1Group.position.x = basePos.x;
            theme1Group.position.y = basePos.y + scrollFraction * 20;
            theme1Group.position.z = basePos.z - scrollFraction * 25;
        }

        // 3. ANIMATE THEME 2 (Quantum Rings)
        if (theme2Group.visible) {
            theme2Group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
            torusCyan.rotation.x = elapsedTime * 0.4;
            torusCyan.rotation.y = elapsedTime * 0.5;

            torusPurple.rotation.x = -elapsedTime * 0.35;
            torusPurple.rotation.z = elapsedTime * 0.45;

            orbitTrack2.rotation.z = elapsedTime * 0.2;

            theme2Bubbles.forEach(b => {
                b.userData.angle += b.userData.speed;
                b.position.x = Math.cos(b.userData.angle) * b.userData.dist;
                b.position.z = Math.sin(b.userData.angle) * b.userData.dist;
                b.position.y = b.userData.yOffset + Math.cos(elapsedTime * 1.2 + b.userData.angle) * 2.5;
            });

            theme2Group.rotation.y = mouse.x * 0.45;
            theme2Group.rotation.x = -mouse.y * 0.3;
            theme2Group.position.x = basePos.x;
            theme2Group.position.y = basePos.y + scrollFraction * 20;
            theme2Group.position.z = basePos.z - scrollFraction * 25;
        }

        // 4. ANIMATE THEME 3 (Cyber Crystal)
        if (theme3Group.visible) {
            theme3Group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
            crystalMesh.rotation.x = elapsedTime * 0.3;
            crystalMesh.rotation.y = elapsedTime * 0.4;
            crystalNucleus.rotation.x = -elapsedTime * 0.4;
            crystalNucleus.rotation.y = elapsedTime * 0.5;

            crystalRing1.rotation.z = elapsedTime * 0.4;
            crystalRing2.rotation.z = -elapsedTime * 0.3;

            theme3Group.rotation.y = mouse.x * 0.45;
            theme3Group.rotation.x = -mouse.y * 0.3;
            theme3Group.position.x = basePos.x;
            theme3Group.position.y = basePos.y + scrollFraction * 20;
            theme3Group.position.z = basePos.z - scrollFraction * 25;
        }

        // 5. ANIMATE THEME 4 (Stellar Nebula)
        if (theme4Group.visible) {
            theme4Group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
            vortexMesh.rotation.y = elapsedTime * 0.45;
            vortexMesh.rotation.x = 0.2 + Math.sin(elapsedTime * 0.2) * 0.1;

            theme4Group.rotation.y = mouse.x * 0.45;
            theme4Group.rotation.x = -mouse.y * 0.3;
            theme4Group.position.x = basePos.x;
            theme4Group.position.y = basePos.y + scrollFraction * 20;
            theme4Group.position.z = basePos.z - scrollFraction * 25;
        }

        // Cyber Wave Matrix
        const wavePos = waveGeo.attributes.position.array;
        let pIndex = 0;
        for (let ix = 0; ix < waveCols; ix++) {
            for (let iy = 0; iy < waveRows; iy++) {
                const u = ix * 0.18 + elapsedTime * 1.2;
                const v = iy * 0.18 + elapsedTime * 1.0;
                const waveY = (Math.sin(u) * 3.5) + (Math.cos(v) * 2.8) + (Math.sin(u * 0.5 + v * 0.5) * 1.8);
                wavePos[pIndex * 3 + 1] = -26 + waveY;
                pIndex++;
            }
        }
        waveGeo.attributes.position.needsUpdate = true;
        waveMesh.rotation.y = elapsedTime * 0.02 + mouse.x * 0.1;

        // Shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
            const sw = shockwaves[i];
            sw.userData.scale += sw.userData.growth;
            sw.scale.set(sw.userData.scale, sw.userData.scale, sw.userData.scale);
            sw.userData.opacity -= 0.035;
            sw.material.opacity = Math.max(0, sw.userData.opacity);

            if (sw.userData.opacity <= 0) {
                scene.remove(sw);
                sw.geometry.dispose();
                sw.material.dispose();
                shockwaves.splice(i, 1);
            }
        }

        // Camera Parallax & Depth
        camera.position.x += (mouse.x * 4.5 - camera.position.x) * 0.04;
        camera.position.y += (-mouse.y * 3.5 - (scrollY * 0.03) - camera.position.y) * 0.04;
        camera.lookAt(0, -scrollY * 0.025, 0);

        renderer.render(scene, camera);
    }

    animate();

    // =========================================================================
    // UI THEME SWITCHER CONTROLS INITIALIZATION
    // =========================================================================
    function initThemeSwitcher() {
        const themeBtn = document.getElementById('themeBtn');
        const themeMenu = document.getElementById('themeMenu');

        if (themeBtn && themeMenu) {
            themeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                themeMenu.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                themeMenu.classList.remove('show');
            });

            document.querySelectorAll('.theme-opt, .theme-card-opt').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const themeVal = btn.getAttribute('data-theme');
                    try {
                        localStorage.setItem('portfolio_saved_theme', themeVal);
                    } catch (err) {}

                    if (themeVal === 'auto') {
                        isAutoMode = true;
                        applyTheme(getDateAutoThemeIndex(), false);
                    } else {
                        const idx = parseInt(themeVal, 10);
                        applyTheme(idx, true);
                    }
                    themeMenu.classList.remove('show');
                });
            });
        }

        // Restore saved theme from localStorage, or default to Theme 0 (3D Developer Platform)
        let initialTheme = 0;
        try {
            const saved = localStorage.getItem('portfolio_saved_theme');
            if (saved === 'auto') {
                isAutoMode = true;
                applyTheme(getDateAutoThemeIndex(), false);
                return;
            } else if (saved !== null && !isNaN(parseInt(saved, 10))) {
                initialTheme = parseInt(saved, 10);
            }
        } catch (err) {}

        applyTheme(initialTheme, false);
    }

    // =========================================================================
    // 3D CARD TILT INITIALIZATION
    // =========================================================================
    function initCardTilt() {
        const tiltCards = document.querySelectorAll(
            '.hero-floating-glass-card, .stat-box, .skill-cat-card, .service-card, .timeline-item, .project-card, .about-portrait-card, .contact-info-card, .contact-form-card'
        );

        tiltCards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease';

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -9;
                const rotateY = ((x - centerX) / centerX) * 9;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px) scale3d(1.02, 1.02, 1.02)`;

                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                card.style.setProperty('--glare-x', `${glareX}%`);
                card.style.setProperty('--glare-y', `${glareY}%`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initThemeSwitcher();
            initCardTilt();
        });
    } else {
        initThemeSwitcher();
        initCardTilt();
    }

    // ECO MODE & REDUCED MOTION MANAGEMENT
    let animFrameReq = null;

    function toggleEcoMode() {
        isEcoMode = !isEcoMode;
        const ecoBtn = document.getElementById('ecoModeToggle');
        const pillEl = document.getElementById('threeModePill');
        if (ecoBtn) ecoBtn.classList.toggle('active', isEcoMode);
        if (pillEl) {
            const subEl = pillEl.querySelector('.pill-sub');
            if (subEl) subEl.textContent = isEcoMode ? 'Paused (Eco Mode)' : 'Click for Burst';
        }
        if (!isEcoMode) {
            requestAnimationFrame(animate);
        } else {
            renderer.render(scene, camera);
        }
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        isEcoMode = true;
        const ecoBtn = document.getElementById('ecoModeToggle');
        if (ecoBtn) ecoBtn.classList.add('active');
    }

    // Window global API
    window.portfolio3D = {
        switchTheme: function (index) {
            applyTheme(index, true);
        },
        setAutoMode: function () {
            isAutoMode = true;
            applyTheme(getDateAutoThemeIndex(), false);
        },
        pulse: function () {
            triggerDevEnergyBurst();
            createShockwave(0, 0);
        },
        explode: function () {
            triggerDevEnergyBurst();
            createShockwave(0, 0);
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const rx = (Math.random() - 0.5) * 1.5;
                    const ry = (Math.random() - 0.5) * 1.5;
                    createShockwave(rx, ry);
                }, i * 110);
            }
        },
        toggleEcoMode: function () {
            toggleEcoMode();
        }
    };

})();
