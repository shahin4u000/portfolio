/**
 * 3D Interactive WebGL Scene for Portfolio
 * Powered by Three.js
 *
 * Features:
 * - Holographic 3D Interactive Hero Core (Icosahedron, Cyber Rings, Glowing Vertices)
 * - Undulating 3D Particle Wave Field (Cyber Matrix)
 * - Deep Space Floating Constellation & Tech Dust
 * - Floating 3D Parallax Shapes (Octahedrons, Torus Knots, Tetrahedrons)
 * - Mouse Parallax & Interactive Damping (Lerp)
 * - Click Particle Shockwave Effect
 * - Scroll-Driven Camera 3D Fly-Through
 * - Dynamic 3D Card Tilt with Glare Reflection
 * - Tab-Visibility & Retina Performance Optimizations
 */

(function () {
    'use strict';

    // Check WebGL availability
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

    // --- PROCEDURAL GLOW TEXTURE GENERATOR ---
    function createParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(167, 139, 250, 0.8)');
        gradient.addColorStop(0.5, 'rgba(127, 90, 240, 0.3)');
        gradient.addColorStop(1, 'rgba(10, 10, 11, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.008);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 65);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleTexture = createParticleTexture();

    // --- MOUSE & SCROLL STATE ---
    const mouse = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        speedX: 0,
        speedY: 0,
        lastX: 0,
        lastY: 0
    };

    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);

    // --- 1. HERO 3D HOLOGRAPHIC CORE ---
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 4, 15);
    scene.add(heroGroup);

    // Outer wireframe icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(12, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0x7f5af0,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    heroGroup.add(icosahedron);

    // Inner glowing vertices
    const icoVertices = icoGeometry.attributes.position.clone();
    const icoPointsGeo = new THREE.BufferGeometry();
    icoPointsGeo.setAttribute('position', icoVertices);
    const icoPointsMat = new THREE.PointsMaterial({
        size: 1.8,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        color: 0xa78bfa,
        depthWrite: false
    });
    const icoPoints = new THREE.Points(icoPointsGeo, icoPointsMat);
    heroGroup.add(icoPoints);

    // Inner geometric nucleus (Dodecahedron)
    const nucleusGeo = new THREE.DodecahedronGeometry(6, 0);
    const nucleusMat = new THREE.MeshBasicMaterial({
        color: 0x2cb67d,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    heroGroup.add(nucleus);

    // Cyber Orbital Rings
    const ringGroup = new THREE.Group();
    heroGroup.add(ringGroup);

    function createOrbitalRing(radius, tube, color, rotX, rotY) {
        const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = rotX;
        ringMesh.rotation.y = rotY;
        return ringMesh;
    }

    const ring1 = createOrbitalRing(16, 0.08, 0x7f5af0, Math.PI / 3, Math.PI / 6);
    const ring2 = createOrbitalRing(18, 0.08, 0x2cb67d, -Math.PI / 4, Math.PI / 4);
    const ring3 = createOrbitalRing(20, 0.08, 0xe056a0, Math.PI / 2, 0);
    ringGroup.add(ring1);
    ringGroup.add(ring2);
    ringGroup.add(ring3);

    // Orbiting nano-particles along the rings
    const nanoCount = 40;
    const nanoGeo = new THREE.BufferGeometry();
    const nanoPositions = new Float32Array(nanoCount * 3);
    for (let i = 0; i < nanoCount; i++) {
        const angle = (i / nanoCount) * Math.PI * 2;
        nanoPositions[i * 3] = Math.cos(angle) * 16;
        nanoPositions[i * 3 + 1] = Math.sin(angle) * 16;
        nanoPositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    nanoGeo.setAttribute('position', new THREE.BufferAttribute(nanoPositions, 3));
    const nanoMat = new THREE.PointsMaterial({
        size: 1.2,
        map: particleTexture,
        color: 0x2cb67d,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const nanoParticles = new THREE.Points(nanoGeo, nanoMat);
    ring1.add(nanoParticles);

    // --- 2. UNDULATING 3D PARTICLE WAVE FIELD (CYBER MATRIX) ---
    const waveCols = 45;
    const waveRows = 45;
    const waveCount = waveCols * waveRows;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);

    const cPurple = new THREE.Color(0x7f5af0);
    const cGreen = new THREE.Color(0x2cb67d);
    const cCyan = new THREE.Color(0x38ef7d);

    let idx = 0;
    for (let ix = 0; ix < waveCols; ix++) {
        for (let iy = 0; iy < waveRows; iy++) {
            const posX = (ix - waveCols / 2) * 3.5;
            const posY = -26;
            const posZ = (iy - waveRows / 2) * 3.5 - 20;

            wavePositions[idx * 3] = posX;
            wavePositions[idx * 3 + 1] = posY;
            wavePositions[idx * 3 + 2] = posZ;

            // Gradient color based on distance
            const mixRatio = (ix + iy) / (waveCols + waveRows);
            const col = cPurple.clone().lerp(cGreen, mixRatio);
            waveColors[idx * 3] = col.r;
            waveColors[idx * 3 + 1] = col.g;
            waveColors[idx * 3 + 2] = col.b;

            idx++;
        }
    }
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
        size: 1.6,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const waveMesh = new THREE.Points(waveGeo, waveMat);
    scene.add(waveMesh);

    // --- 3. DEEP SPACE FLOATING CONSTELLATION & PARTICLES ---
    const starCount = 900;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starVelocities = [];

    for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 220;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        starVelocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
        size: 1.2,
        map: particleTexture,
        color: 0x94a1b2,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- 4. FLOATING 3D BACKGROUND PARALLAX SHAPES ---
    const floatingShapes = [];
    const shapeGeometries = [
        new THREE.OctahedronGeometry(3.5, 0),
        new THREE.TetrahedronGeometry(4, 0),
        new THREE.TorusGeometry(3, 0.8, 8, 24),
        new THREE.IcosahedronGeometry(3, 0)
    ];

    const shapeColors = [0x7f5af0, 0x2cb67d, 0xe056a0, 0xa78bfa];

    for (let i = 0; i < 7; i++) {
        const geo = shapeGeometries[i % shapeGeometries.length];
        const mat = new THREE.MeshBasicMaterial({
            color: shapeColors[i % shapeColors.length],
            wireframe: true,
            transparent: true,
            opacity: 0.22
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            (Math.random() - 0.5) * 90,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 40 - 10
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.userData = {
            rotSpeedX: (Math.random() - 0.5) * 0.015,
            rotSpeedY: (Math.random() - 0.5) * 0.015,
            floatSpeed: 0.8 + Math.random() * 1.2,
            initialY: mesh.position.y
        };
        scene.add(mesh);
        floatingShapes.push(mesh);
    }

    // --- 5. INTERACTIVE CLICK SHOCKWAVE SYSTEM ---
    const shockwaves = [];
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.4, 32);

    function createShockwave(x, y) {
        // Unproject 2D screen coordinate to 3D plane
        const vector = new THREE.Vector3(x, y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z + 10;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        const mat = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0x7f5af0 : 0x2cb67d,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const shockwave = new THREE.Mesh(shockwaveGeo, mat);
        shockwave.position.copy(pos);
        shockwave.lookAt(camera.position);
        shockwave.userData = {
            scale: 1,
            opacity: 0.9,
            growth: 1.8 + Math.random() * 1.2
        };
        scene.add(shockwave);
        shockwaves.push(shockwave);

        // Also pulse the hero nucleus
        nucleus.scale.set(1.4, 1.4, 1.4);
    }

    // --- EVENT LISTENERS ---
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
        maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    }, { passive: true });

    window.addEventListener('click', (e) => {
        const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
        const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
        createShockwave(ndcX, ndcY);
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    });

    // Pause rendering when tab is not active to preserve system performance
    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();
        const delta = Math.min(clock.getDelta(), 0.1);

        // Smooth mouse damping (Lerp)
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Smooth scroll damping
        scrollY += (targetScrollY - scrollY) * 0.08;
        const scrollFraction = Math.min(1, Math.max(0, scrollY / maxScroll));

        // 1. Hero Core Animations & Parallax
        icosahedron.rotation.x = elapsedTime * 0.25;
        icosahedron.rotation.y = elapsedTime * 0.35;
        nucleus.rotation.x = -elapsedTime * 0.4;
        nucleus.rotation.y = elapsedTime * 0.5;

        // Slowly return nucleus scale to 1 if pulsed
        nucleus.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);

        ring1.rotation.z = elapsedTime * 0.4;
        ring2.rotation.z = -elapsedTime * 0.3;
        ring3.rotation.y = elapsedTime * 0.2;

        // Mouse tilts the hero group
        heroGroup.rotation.y = mouse.x * 0.5;
        heroGroup.rotation.x = -mouse.y * 0.3;

        // Hero group shifts subtly as user scrolls down
        heroGroup.position.y = 4 + scrollFraction * 20;
        heroGroup.position.z = 15 - scrollFraction * 25;
        const heroOpacity = Math.max(0.08, 1 - scrollFraction * 2.2);
        icoMaterial.opacity = 0.35 * heroOpacity;
        nucleusMat.opacity = 0.5 * heroOpacity;
        ring1.material.opacity = 0.4 * heroOpacity;

        // 2. Wave Field Animation
        const wavePos = waveGeo.attributes.position.array;
        let pIndex = 0;
        for (let ix = 0; ix < waveCols; ix++) {
            for (let iy = 0; iy < waveRows; iy++) {
                const u = ix * 0.18 + elapsedTime * 1.2;
                const v = iy * 0.18 + elapsedTime * 1.0;
                // Complex wave synthesis
                const waveY = (Math.sin(u) * 3.5) + (Math.cos(v) * 2.8) + (Math.sin(u * 0.5 + v * 0.5) * 2.0);
                wavePos[pIndex * 3 + 1] = -24 + waveY;
                pIndex++;
            }
        }
        waveGeo.attributes.position.needsUpdate = true;
        waveMesh.rotation.y = elapsedTime * 0.03 + mouse.x * 0.15;

        // 3. Floating Stars Drift
        const starPos = starGeo.attributes.position.array;
        for (let i = 0; i < starCount; i++) {
            starPos[i * 3 + 1] += Math.sin(elapsedTime * 0.5 + i) * 0.02;
            starPos[i * 3] += Math.cos(elapsedTime * 0.5 + i) * 0.01;
        }
        starGeo.attributes.position.needsUpdate = true;
        starField.rotation.y = elapsedTime * 0.01 + mouse.x * 0.05;

        // 4. Floating Parallax Shapes
        floatingShapes.forEach((shape, i) => {
            shape.rotation.x += shape.userData.rotSpeedX;
            shape.rotation.y += shape.userData.rotSpeedY;
            shape.position.y = shape.userData.initialY + Math.sin(elapsedTime * shape.userData.floatSpeed + i) * 3;
            // Scroll parallax offset
            shape.position.y -= (scrollY * 0.015) * ((i % 3) + 1);
        });

        // 5. Expand & Fade Shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
            const sw = shockwaves[i];
            sw.userData.scale += sw.userData.growth;
            sw.scale.set(sw.userData.scale, sw.userData.scale, sw.userData.scale);
            sw.userData.opacity -= 0.03;
            sw.material.opacity = Math.max(0, sw.userData.opacity);

            if (sw.userData.opacity <= 0) {
                scene.remove(sw);
                sw.geometry.dispose();
                sw.material.dispose();
                shockwaves.splice(i, 1);
            }
        }

        // 6. Camera Parallax & Scroll Gliding
        camera.position.x += (mouse.x * 4 - camera.position.x) * 0.04;
        camera.position.y += (-mouse.y * 3 - (scrollY * 0.03) - camera.position.y) * 0.04;
        camera.lookAt(0, -scrollY * 0.025, 0);

        renderer.render(scene, camera);
    }

    animate();

    // --- 3D TILT EFFECT ON CARDS ---
    function initCardTilt() {
        const tiltCards = document.querySelectorAll(
            '.stat-card, .skill-category, .timeline-item, .education-card, .project-card, .lang-card, .about-image-card, .contact-card'
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

                const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
                const rotateY = ((x - centerX) / centerX) * 9;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`;

                // Update glare highlight
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

    // Initialize Card Tilt after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardTilt);
    } else {
        initCardTilt();
    }

    // Expose interactive trigger for UI buttons
    window.portfolio3D = {
        pulse: function () {
            createShockwave(0, 0);
        },
        explode: function () {
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const rx = (Math.random() - 0.5) * 1.5;
                    const ry = (Math.random() - 0.5) * 1.5;
                    createShockwave(rx, ry);
                }, i * 120);
            }
        }
    };

})();
