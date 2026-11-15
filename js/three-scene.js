/**
 * 3D Interactive WebGL Scene for Portfolio with Date-Based Dynamic Themes
 * Powered by Three.js
 *
 * 4 Themes available:
 * 0: Cosmic Celestial Sphere with Neon Orbital Rings & Floating Bubbles (Sample 1)
 * 1: Quantum Interlocking Torus Rings with Planet Horizon (Sample 2)
 * 2: Faceted Cyber Crystal & Glowing Nucleus
 * 3: Stellar Nebula Galaxy Vortex
 *
 * Includes automatic date-based switching and manual interactive theme selector.
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

    // --- PROCEDURAL TEXTURES ---
    function createGlowTexture(coreColor, rimColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, coreColor || 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, rimColor || 'rgba(167, 139, 250, 0.8)');
        gradient.addColorStop(0.6, 'rgba(127, 90, 240, 0.25)');
        gradient.addColorStop(1, 'rgba(10, 10, 11, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060a, 0.007);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 70);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x7f5af0, 2.5);
    dirLight1.position.set(30, 25, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00d2ff, 2.0);
    dirLight2.position.set(-30, -20, 30);
    scene.add(dirLight2);

    const particleTexture = createGlowTexture();

    // MOUSE & SCROLL STATE
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);

    // =========================================================================
    // THEME 0: COSMIC CELESTIAL SPHERE + NEON ORBITAL RINGS + BUBBLES (SAMPLE 1)
    // =========================================================================
    const theme0Group = new THREE.Group();
    scene.add(theme0Group);

    // Central Celestial Sphere
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
    theme0Group.add(mainSphere);

    // Inner glowing atmospheric mesh
    const atmosphereGeo = new THREE.SphereGeometry(11.4, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    theme0Group.add(atmosphereMesh);

    // Thin glowing neon orbital rings
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

    const ringT0_1 = createThinNeonRing(17.5, 0.16, 0x38bdf8, Math.PI / 3, Math.PI / 5);
    const ringT0_2 = createThinNeonRing(19.5, 0.14, 0xc084fc, -Math.PI / 3.5, Math.PI / 3);
    const ringT0_3 = createThinNeonRing(22.0, 0.10, 0x00f2fe, Math.PI / 2.2, -Math.PI / 8);
    theme0Group.add(ringT0_1);
    theme0Group.add(ringT0_2);
    theme0Group.add(ringT0_3);

    // Floating glass bubbles / liquid orbs
    const bubbleCount = 6;
    const theme0Bubbles = [];
    const bubbleGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const bubbleMat = new THREE.MeshPhongMaterial({
        color: 0x1e1b4b,
        emissive: 0x3b82f6,
        specular: 0xffffff,
        shininess: 120,
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = new THREE.Mesh(bubbleGeo, bubbleMat.clone());
        const scale = 0.5 + Math.random() * 0.8;
        bubble.scale.set(scale, scale, scale);
        const angle = (i / bubbleCount) * Math.PI * 2;
        const dist = 16 + Math.random() * 8;
        bubble.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 12, Math.sin(angle) * dist);
        bubble.userData = { angle: angle, dist: dist, speed: 0.008 + Math.random() * 0.012, yOffset: (Math.random() - 0.5) * 6 };
        theme0Group.add(bubble);
        theme0Bubbles.push(bubble);
    }

    // =========================================================================
    // THEME 1: QUANTUM INTERLOCKING TORUS RINGS + PLANET HORIZON (SAMPLE 2)
    // =========================================================================
    const theme1Group = new THREE.Group();
    scene.add(theme1Group);

    // Dual interlocking thick neon toruses
    const torusGeo = new THREE.TorusGeometry(13.5, 2.0, 36, 100);

    const torusMatCyan = new THREE.MeshStandardMaterial({
        color: 0x00d2ff,
        emissive: 0x00558f,
        roughness: 0.2,
        metalness: 0.7,
        wireframe: false
    });
    const torusCyan = new THREE.Mesh(torusGeo, torusMatCyan);
    torusCyan.rotation.set(Math.PI / 4, Math.PI / 6, 0);
    theme1Group.add(torusCyan);

    const torusMatPurple = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x581c87,
        roughness: 0.2,
        metalness: 0.7,
        wireframe: false
    });
    const torusPurple = new THREE.Mesh(torusGeo, torusMatPurple);
    torusPurple.rotation.set(-Math.PI / 4, -Math.PI / 6, Math.PI / 4);
    theme1Group.add(torusPurple);

    // Outer wireframe glowing rings for texture
    const wireMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.35 });
    const torusWire1 = new THREE.Mesh(new THREE.TorusGeometry(13.6, 2.05, 16, 60), wireMat1);
    torusCyan.add(torusWire1);

    const wireMat2 = new THREE.MeshBasicMaterial({ color: 0xf472b6, wireframe: true, transparent: true, opacity: 0.35 });
    const torusWire2 = new THREE.Mesh(new THREE.TorusGeometry(13.6, 2.05, 16, 60), wireMat2);
    torusPurple.add(torusWire2);

    // Thin orbital light track
    const orbitTrack = createThinNeonRing(22, 0.12, 0xc084fc, Math.PI / 2.5, Math.PI / 8);
    theme1Group.add(orbitTrack);

    // Theme 1 floating neon orbs
    const theme1Bubbles = [];
    for (let i = 0; i < 7; i++) {
        const orb = new THREE.Mesh(bubbleGeo, bubbleMat.clone());
        const scale = 0.6 + Math.random() * 0.9;
        orb.scale.set(scale, scale, scale);
        const angle = (i / 7) * Math.PI * 2;
        const dist = 18 + Math.random() * 10;
        orb.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 14, Math.sin(angle) * dist);
        orb.userData = { angle: angle, dist: dist, speed: 0.01 + Math.random() * 0.015, yOffset: (Math.random() - 0.5) * 8 };
        theme1Group.add(orb);
        theme1Bubbles.push(orb);
    }

    // Glowing Planet Horizon Curve at bottom left (from Sample 2)
    const horizonGeo = new THREE.SphereGeometry(55, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({
        color: 0x2e1065,
        wireframe: false,
        transparent: true,
        opacity: 0.75
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.position.set(-42, -50, -10);
    theme1Group.add(horizonMesh);

    // Planet atmosphere glow rim
    const horizonRimGeo = new THREE.SphereGeometry(56, 32, 32);
    const horizonRimMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
    });
    const horizonRim = new THREE.Mesh(horizonRimGeo, horizonRimMat);
    horizonMesh.add(horizonRim);

    // =========================================================================
    // THEME 2: CYBER CRYSTAL & DATA LATTICE (SAMPLE 3)
    // =========================================================================
    const theme2Group = new THREE.Group();
    scene.add(theme2Group);

    const crystalGeo = new THREE.IcosahedronGeometry(12, 1);
    const crystalMat = new THREE.MeshBasicMaterial({ color: 0x7f5af0, wireframe: true, transparent: true, opacity: 0.5 });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    theme2Group.add(crystalMesh);

    const crystalNucleusGeo = new THREE.DodecahedronGeometry(6.5, 0);
    const crystalNucleusMat = new THREE.MeshStandardMaterial({
        color: 0x2cb67d,
        emissive: 0x136a43,
        roughness: 0.2,
        metalness: 0.8
    });
    const crystalNucleus = new THREE.Mesh(crystalNucleusGeo, crystalNucleusMat);
    theme2Group.add(crystalNucleus);

    const crystalRing1 = createThinNeonRing(17, 0.1, 0x2cb67d, Math.PI / 3, Math.PI / 4);
    const crystalRing2 = createThinNeonRing(19, 0.1, 0x7f5af0, -Math.PI / 4, Math.PI / 3);
    theme2Group.add(crystalRing1);
    theme2Group.add(crystalRing2);

    // =========================================================================
    // THEME 3: STELLAR NEBULA & QUANTUM VORTEX (SAMPLE 4)
    // =========================================================================
    const theme3Group = new THREE.Group();
    scene.add(theme3Group);

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
    theme3Group.add(vortexMesh);

    // Central pulsar core
    const pulsarGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const pulsarMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
    const pulsar = new THREE.Mesh(pulsarGeo, pulsarMat);
    theme3Group.add(pulsar);

    // Array of the 4 theme groups
    const themeGroups = [theme0Group, theme1Group, theme2Group, theme3Group];

    // =========================================================================
    // COMMON BACKGROUND: COSMIC PARTICLES & UNDULATING WAVE
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
        color: 0x94a1b2,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Undulating Cyber Wave Matrix
    const waveCols = 40;
    const waveRows = 40;
    const waveCount = waveCols * waveRows;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);

    const cWave1 = new THREE.Color(0x7f5af0);
    const cWave2 = new THREE.Color(0x38bdf8);

    let idx = 0;
    for (let ix = 0; ix < waveCols; ix++) {
        for (let iy = 0; iy < waveRows; iy++) {
            wavePositions[idx * 3] = (ix - waveCols / 2) * 3.6;
            wavePositions[idx * 3 + 1] = -25;
            wavePositions[idx * 3 + 2] = (iy - waveRows / 2) * 3.6 - 15;

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
    // DYNAMIC THEME POSITIONING & SWITCHING LOGIC
    // =========================================================================
    function getThemeBasePos() {
        const isDesktop = window.innerWidth > 968;
        return {
            x: isDesktop ? 18 : 0,
            y: isDesktop ? 3 : -3,
            z: 10
        };
    }

    function positionThemeGroups() {
        const pos = getThemeBasePos();
        themeGroups.forEach(grp => {
            grp.position.set(pos.x, pos.y, pos.z);
        });
    }
    positionThemeGroups();

    // Theme metadata
    const THEME_DATA = [
        {
            id: 0,
            name: 'Cosmic Sphere (Sample 1)',
            eyebrow: "HELLO, I'M",
            tagline: "I build modern, interactive and performant web experiences with Three.js and modern technologies.",
            accent: '#818cf8',
            gradient: 'linear-gradient(135deg, #a78bfa, #38bdf8)'
        },
        {
            id: 1,
            name: 'Quantum Rings (Sample 2)',
            eyebrow: "WELCOME TO MY PORTFOLIO",
            tagline: "I build modern, interactive and performant web experiences with Three.js and modern technologies.",
            accent: '#00d2ff',
            gradient: 'linear-gradient(135deg, #00d2ff, #c084fc)'
        },
        {
            id: 2,
            name: 'Cyber Crystal',
            eyebrow: "SENIOR FRONTEND ENGINEER",
            tagline: "Architecting scalable enterprise Angular & WebGL web apps with precision & craft.",
            accent: '#2cb67d',
            gradient: 'linear-gradient(135deg, #7f5af0, #2cb67d)'
        },
        {
            id: 3,
            name: 'Stellar Nebula',
            eyebrow: "CREATIVE TECH ARCHITECT",
            tagline: "Bridging creative design and robust frontend engineering at scale in Hamburg.",
            accent: '#f43f5e',
            gradient: 'linear-gradient(135deg, #f43f5e, #a855f7)'
        }
    ];

    // Auto theme calculated by current day of month (cycles 0..3)
    function getDateAutoThemeIndex() {
        const day = new Date().getDate(); // 1 to 31
        return (day - 1) % 4;
    }

    let currentThemeIndex = getDateAutoThemeIndex();
    let isAutoMode = true;

    // Apply Theme Function
    function applyTheme(index, isManual = false) {
        if (index < 0 || index >= themeGroups.length) index = 0;
        currentThemeIndex = index;
        if (isManual) isAutoMode = false;

        // Toggle visibility of 3D theme groups
        themeGroups.forEach((grp, i) => {
            grp.visible = (i === index);
            if (i === index) {
                grp.scale.set(0.2, 0.2, 0.2); // Smooth scale-in transition
            }
        });

        // Update DOM elements
        const data = THEME_DATA[index];
        const eyebrowEl = document.getElementById('heroEyebrow');
        if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

        const taglineEl = document.querySelector('.hero-tagline');
        if (taglineEl) taglineEl.textContent = data.tagline;

        const themeLabelEl = document.getElementById('themeLabel');
        if (themeLabelEl) {
            themeLabelEl.textContent = isAutoMode ? `📅 ${data.name.split(' ')[0]} (Day ${new Date().getDate()})` : data.name.split(' ')[0];
        }

        // Update body data-theme attribute for CSS accent styles
        document.body.setAttribute('data-theme', `theme-${index}`);

        // Update active class in menu
        document.querySelectorAll('.theme-opt').forEach(btn => {
            const btnTheme = btn.getAttribute('data-theme');
            if (isAutoMode && btnTheme === 'auto') {
                btn.classList.add('active');
            } else if (!isAutoMode && parseInt(btnTheme, 10) === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Trigger subtle shockwave
        createShockwave(0.3, 0);
    }

    // =========================================================================
    // INTERACTIVE CLICK SHOCKWAVE SYSTEM
    // =========================================================================
    const shockwaves = [];
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.4, 32);

    function createShockwave(x, y) {
        const vector = new THREE.Vector3(x, y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z + 10;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        const mat = new THREE.MeshBasicMaterial({
            color: currentThemeIndex === 1 ? 0x00d2ff : (currentThemeIndex === 2 ? 0x2cb67d : 0xa855f7),
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

    // =========================================================================
    // EVENT LISTENERS
    // =========================================================================
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
        maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    }, { passive: true });

    window.addEventListener('click', (e) => {
        // If clicking on interactive elements or dropdowns, don't shockwave
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
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Mouse smoothing (lerp)
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Scroll smoothing
        scrollY += (targetScrollY - scrollY) * 0.08;
        const scrollFraction = Math.min(1, Math.max(0, scrollY / maxScroll));

        const basePos = getThemeBasePos();

        // Animate Theme 0 (Cosmic Sphere)
        if (theme0Group.visible) {
            theme0Group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
            mainSphere.rotation.y = elapsedTime * 0.2;
            atmosphereMesh.rotation.y = -elapsedTime * 0.25;

            ringT0_1.rotation.z = elapsedTime * 0.35;
            ringT0_2.rotation.z = -elapsedTime * 0.28;
            ringT0_3.rotation.y = elapsedTime * 0.2;

            theme0Bubbles.forEach(b => {
                b.userData.angle += b.userData.speed;
                b.position.x = Math.cos(b.userData.angle) * b.userData.dist;
                b.position.z = Math.sin(b.userData.angle) * b.userData.dist;
                b.position.y = b.userData.yOffset + Math.sin(elapsedTime * 1.5 + b.userData.angle) * 2;
            });

            theme0Group.rotation.y = mouse.x * 0.45;
            theme0Group.rotation.x = -mouse.y * 0.3;
            theme0Group.position.x = basePos.x;
            theme0Group.position.y = basePos.y + scrollFraction * 20;
            theme0Group.position.z = basePos.z - scrollFraction * 25;
        }

        // Animate Theme 1 (Quantum Rings + Horizon)
        if (theme1Group.visible) {
            theme1Group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
            torusCyan.rotation.x = elapsedTime * 0.4;
            torusCyan.rotation.y = elapsedTime * 0.5;

            torusPurple.rotation.x = -elapsedTime * 0.35;
            torusPurple.rotation.z = elapsedTime * 0.45;

            orbitTrack.rotation.z = elapsedTime * 0.2;

            theme1Bubbles.forEach(b => {
                b.userData.angle += b.userData.speed;
                b.position.x = Math.cos(b.userData.angle) * b.userData.dist;
                b.position.z = Math.sin(b.userData.angle) * b.userData.dist;
                b.position.y = b.userData.yOffset + Math.cos(elapsedTime * 1.2 + b.userData.angle) * 2.5;
            });

            theme1Group.rotation.y = mouse.x * 0.45;
            theme1Group.rotation.x = -mouse.y * 0.3;
            theme1Group.position.x = basePos.x;
            theme1Group.position.y = basePos.y + scrollFraction * 20;
            theme1Group.position.z = basePos.z - scrollFraction * 25;
        }

        // Animate Theme 2 (Cyber Crystal)
        if (theme2Group.visible) {
            theme2Group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
            crystalMesh.rotation.x = elapsedTime * 0.3;
            crystalMesh.rotation.y = elapsedTime * 0.4;
            crystalNucleus.rotation.x = -elapsedTime * 0.4;
            crystalNucleus.rotation.y = elapsedTime * 0.5;

            crystalRing1.rotation.z = elapsedTime * 0.4;
            crystalRing2.rotation.z = -elapsedTime * 0.3;

            theme2Group.rotation.y = mouse.x * 0.45;
            theme2Group.rotation.x = -mouse.y * 0.3;
            theme2Group.position.x = basePos.x;
            theme2Group.position.y = basePos.y + scrollFraction * 20;
            theme2Group.position.z = basePos.z - scrollFraction * 25;
        }

        // Animate Theme 3 (Stellar Nebula)
        if (theme3Group.visible) {
            theme3Group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
            vortexMesh.rotation.y = elapsedTime * 0.45;
            vortexMesh.rotation.x = 0.2 + Math.sin(elapsedTime * 0.2) * 0.1;
            pulsar.scale.setScalar(1 + Math.sin(elapsedTime * 3) * 0.2);

            theme3Group.rotation.y = mouse.x * 0.45;
            theme3Group.rotation.x = -mouse.y * 0.3;
            theme3Group.position.x = basePos.x;
            theme3Group.position.y = basePos.y + scrollFraction * 20;
            theme3Group.position.z = basePos.z - scrollFraction * 25;
        }

        // Wave Matrix
        const wavePos = waveGeo.attributes.position.array;
        let pIndex = 0;
        for (let ix = 0; ix < waveCols; ix++) {
            for (let iy = 0; iy < waveRows; iy++) {
                const u = ix * 0.18 + elapsedTime * 1.2;
                const v = iy * 0.18 + elapsedTime * 1.0;
                const waveY = (Math.sin(u) * 3.5) + (Math.cos(v) * 2.8) + (Math.sin(u * 0.5 + v * 0.5) * 1.8);
                wavePos[pIndex * 3 + 1] = -25 + waveY;
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

            document.querySelectorAll('.theme-opt').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const themeVal = btn.getAttribute('data-theme');
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

        // Initialize with date-based theme
        applyTheme(getDateAutoThemeIndex(), false);
    }

    // =========================================================================
    // 3D CARD TILT INITIALIZATION
    // =========================================================================
    function initCardTilt() {
        const tiltCards = document.querySelectorAll(
            '.hero-floating-glass-card, .stat-card, .skill-category, .timeline-item, .education-card, .project-card, .lang-card, .about-image-card, .contact-card'
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
            createShockwave(0, 0);
        },
        explode: function () {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const rx = (Math.random() - 0.5) * 1.5;
                    const ry = (Math.random() - 0.5) * 1.5;
                    createShockwave(rx, ry);
                }, i * 110);
            }
        }
    };

})();
