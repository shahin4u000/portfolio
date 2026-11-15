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

    // --- SETUP THREE.JS SCENE, CAMERA, RENDERER ---
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03040b, 0.007);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 72);

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

    // MOUSE & SCROLL STATE
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);

    // =========================================================================
    // THEME 0: 3D DEVELOPER SITTING ON FUTURISTIC PLATFORM (THE USER SPECIFICATION)
    // =========================================================================
    const devThemeGroup = new THREE.Group();
    scene.add(devThemeGroup);

    // 1. Futuristic Floating Rock Platform
    const platformGroup = new THREE.Group();
    devThemeGroup.add(platformGroup);

    // Irregular rocky top slab
    const rockGeo = new THREE.CylinderGeometry(15, 12, 3.8, 14);
    // Perturb vertices slightly for natural rock look
    const posAttr = rockGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const vz = posAttr.getZ(i);
        const noise = (Math.sin(vx * 0.8) + Math.cos(vz * 0.8)) * 0.4;
        posAttr.setY(i, vy + noise);
    }
    rockGeo.computeVertexNormals();

    const rockMat = new THREE.MeshStandardMaterial({
        color: 0x16132b,
        roughness: 0.85,
        metalness: 0.25,
        flatShading: true
    });
    const rockPlatform = new THREE.Mesh(rockGeo, rockMat);
    rockPlatform.position.y = -8;
    platformGroup.add(rockPlatform);

    // Glowing Neon Purple Light Strip below the platform
    const neonRingGeo1 = new THREE.TorusGeometry(15.2, 0.45, 16, 90);
    const neonRingMat1 = new THREE.MeshBasicMaterial({
        color: 0xb44dff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
    });
    const neonRing1 = new THREE.Mesh(neonRingGeo1, neonRingMat1);
    neonRing1.rotation.x = Math.PI / 2;
    neonRing1.position.y = -8.2;
    platformGroup.add(neonRing1);

    // Secondary lower cyan neon accent ring
    const neonRingGeo2 = new THREE.TorusGeometry(12.4, 0.22, 16, 80);
    const neonRingMat2 = new THREE.MeshBasicMaterial({
        color: 0x00d5ff,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const neonRing2 = new THREE.Mesh(neonRingGeo2, neonRingMat2);
    neonRing2.rotation.x = Math.PI / 2;
    neonRing2.position.y = -9.6;
    platformGroup.add(neonRing2);

    // 2. 3D Developer Character (Sitting Cross-legged with Laptop)
    const charGroup = new THREE.Group();
    charGroup.position.set(0, -6.1, 0);
    devThemeGroup.add(charGroup);

    // Crossed Legs (indigo jeans)
    const legMat = new THREE.MeshStandardMaterial({ color: 0x192138, roughness: 0.7 });
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.4, 7.5, 12), legMat);
    leftLeg.rotation.set(Math.PI / 2.3, 0.6, -Math.PI / 4);
    leftLeg.position.set(-2.6, 0.8, 1.2);
    charGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.4, 7.5, 12), legMat);
    rightLeg.rotation.set(Math.PI / 2.3, -0.6, Math.PI / 4);
    rightLeg.position.set(2.6, 0.8, 1.2);
    charGroup.add(rightLeg);

    // White Sneakers
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 3.8), shoeMat);
    shoeL.position.set(-4.8, 0.4, 3.2);
    shoeL.rotation.set(0, 0.4, 0);
    charGroup.add(shoeL);

    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 3.8), shoeMat);
    shoeR.position.set(4.8, 0.4, 3.2);
    shoeR.rotation.set(0, -0.4, 0);
    charGroup.add(shoeR);

    // Torso (Black Modern Hoodie)
    const hoodieMat = new THREE.MeshStandardMaterial({ color: 0x0c0d13, roughness: 0.6 });
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.2, 7.2, 16), hoodieMat);
    torso.position.set(0, 4.6, -0.4);
    charGroup.add(torso);

    // Hoodie Glowing Code Logo on Chest
    const logoBadgeMat = new THREE.MeshBasicMaterial({
        map: codeBracketsTex,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), logoBadgeMat);
    logoPlane.position.set(0, 5.0, 3.0);
    charGroup.add(logoPlane);

    // Hoodie Sleeves & Arms angled toward laptop
    const armMat = hoodieMat;
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.0, 5.5, 12), armMat);
    leftArm.rotation.set(Math.PI / 4, 0, -0.4);
    leftArm.position.set(-3.6, 5.2, 1.2);
    charGroup.add(leftArm);

    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.0, 5.5, 12), armMat);
    rightArm.rotation.set(Math.PI / 4, 0, 0.4);
    rightArm.position.set(3.6, 5.2, 1.2);
    charGroup.add(rightArm);

    // Hands
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.5 });
    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 12), skinMat);
    handL.position.set(-1.8, 4.2, 3.6);
    charGroup.add(handL);

    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 12), skinMat);
    handR.position.set(1.8, 4.2, 3.6);
    charGroup.add(handR);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(2.3, 24, 24), skinMat);
    head.position.set(0, 9.8, -0.2);
    charGroup.add(head);

    // Stylish Hair (Dark Volumetric)
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x050508, roughness: 0.9 });
    const hair = new THREE.Mesh(new THREE.SphereGeometry(2.5, 16, 16), hairMat);
    hair.position.set(0, 10.4, -0.5);
    hair.scale.set(1.05, 1.0, 1.15);
    charGroup.add(hair);

    // Stylish Glasses (Dark-rimmed)
    const glassesMat = new THREE.MeshBasicMaterial({ color: 0x00d5ff, wireframe: true });
    const glassesL = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.08, 8, 20), glassesMat);
    glassesL.position.set(-0.85, 9.8, 1.9);
    charGroup.add(glassesL);

    const glassesR = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.08, 8, 20), glassesMat);
    glassesR.position.set(0.85, 9.8, 1.9);
    charGroup.add(glassesR);

    // 3. Laptop with Glowing Angular Shield Logo on back
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 3.8, 2.5);
    charGroup.add(laptopGroup);

    // Keyboard Base
    const laptopBase = new THREE.Mesh(
        new THREE.BoxGeometry(6.6, 0.25, 4.6),
        new THREE.MeshStandardMaterial({ color: 0x232736, roughness: 0.3, metalness: 0.8 })
    );
    laptopGroup.add(laptopBase);

    // Laptop Screen Screen (Tilted open)
    const laptopScreenGroup = new THREE.Group();
    laptopScreenGroup.position.set(0, 0.15, -2.1);
    laptopScreenGroup.rotation.x = -Math.PI / 2.7;
    laptopGroup.add(laptopScreenGroup);

    const screenLid = new THREE.Mesh(
        new THREE.BoxGeometry(6.6, 4.4, 0.22),
        new THREE.MeshStandardMaterial({ color: 0x181a24, roughness: 0.3, metalness: 0.8 })
    );
    screenLid.position.set(0, 2.2, 0);
    laptopScreenGroup.add(screenLid);

    // Glowing Angular Shield on Back of Laptop Screen (Facing camera!)
    const angularLaptopBadge = new THREE.Mesh(
        new THREE.PlaneGeometry(2.8, 2.8),
        new THREE.MeshBasicMaterial({
            map: angularLogoTex,
            transparent: true,
            blending: THREE.AdditiveBlending
        })
    );
    angularLaptopBadge.position.set(0, 2.2, -0.15);
    angularLaptopBadge.rotation.y = Math.PI;
    laptopScreenGroup.add(angularLaptopBadge);

    // Glowing Screen Interior casting blue light onto developer
    const screenInnerGlow = new THREE.Mesh(
        new THREE.PlaneGeometry(5.8, 3.8),
        new THREE.MeshBasicMaterial({ color: 0x00d5ff, transparent: true, opacity: 0.75 })
    );
    screenInnerGlow.position.set(0, 2.2, 0.13);
    laptopScreenGroup.add(screenInnerGlow);

    // 4. Glowing Purple Orbital Rings wrapping around the Developer (from image!)
    const orbitRibbonGeo1 = new THREE.TorusGeometry(18.5, 0.18, 16, 120);
    const orbitRibbonMat1 = new THREE.MeshBasicMaterial({
        color: 0xb44dff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
    });
    const orbitRibbon1 = new THREE.Mesh(orbitRibbonGeo1, orbitRibbonMat1);
    orbitRibbon1.rotation.set(Math.PI / 3.2, Math.PI / 4, 0);
    devThemeGroup.add(orbitRibbon1);

    const orbitRibbonGeo2 = new THREE.TorusGeometry(20.5, 0.14, 16, 120);
    const orbitRibbonMat2 = new THREE.MeshBasicMaterial({
        color: 0x247bff,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const orbitRibbon2 = new THREE.Mesh(orbitRibbonGeo2, orbitRibbonMat2);
    orbitRibbon2.rotation.set(-Math.PI / 3.0, -Math.PI / 3.5, Math.PI / 5);
    devThemeGroup.add(orbitRibbon2);

    // 5. Floating Technology Cards Orbiting the Developer
    const techCards = [];

    function createTechCard(texture, size = 4.2) {
        const cardGeo = new THREE.BoxGeometry(size, size, 0.4);
        const cardMat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.96
        });
        const mesh = new THREE.Mesh(cardGeo, cardMat);
        return mesh;
    }

    // 1. Angular Shield Logo Card (Dominant & Most Prominent)
    const cardAngular = createTechCard(angularLogoTex, 5.4);
    cardAngular.position.set(-14, 5, 5);
    cardAngular.userData = { baseY: 5, floatSpeed: 1.4, rotSpeed: 0.005 };
    devThemeGroup.add(cardAngular);
    techCards.push(cardAngular);

    // 2. TypeScript Logo Card
    const cardTS = createTechCard(tsLogoTex, 4.4);
    cardTS.position.set(14, -2, 7);
    cardTS.userData = { baseY: -2, floatSpeed: 1.6, rotSpeed: -0.006 };
    devThemeGroup.add(cardTS);
    techCards.push(cardTS);

    // 3. Three.js Logo Card
    const cardThree = createTechCard(threeLogoTex, 4.4);
    cardThree.position.set(13, 8, 4);
    cardThree.userData = { baseY: 8, floatSpeed: 1.3, rotSpeed: 0.005 };
    devThemeGroup.add(cardThree);
    techCards.push(cardThree);

    // 4. JavaScript Logo Card
    const cardJS = createTechCard(jsLogoTex, 4.2);
    cardJS.position.set(13, 3, 9);
    cardJS.userData = { baseY: 3, floatSpeed: 1.5, rotSpeed: 0.007 };
    devThemeGroup.add(cardJS);
    techCards.push(cardJS);

    // 6. Floating Asteroid & Crystal Rocks
    const floatingRocks = [];
    const rockPieceGeo = new THREE.DodecahedronGeometry(1.6, 0);
    const rockPieceMat = new THREE.MeshStandardMaterial({
        color: 0x221a3a,
        roughness: 0.8,
        flatShading: true
    });

    for (let i = 0; i < 9; i++) {
        const rockPiece = new THREE.Mesh(rockPieceGeo, rockPieceMat);
        const scale = 0.5 + Math.random() * 0.9;
        rockPiece.scale.set(scale, scale, scale);
        const angle = (i / 9) * Math.PI * 2;
        const dist = 17 + Math.random() * 9;
        rockPiece.position.set(Math.cos(angle) * dist, -10 + Math.random() * 20, Math.sin(angle) * dist);
        rockPiece.userData = {
            rotX: (Math.random() - 0.5) * 0.02,
            rotY: (Math.random() - 0.5) * 0.02,
            baseY: rockPiece.position.y,
            speed: 0.8 + Math.random()
        };
        devThemeGroup.add(rockPiece);
        floatingRocks.push(rockPiece);
    }

    // =========================================================================
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
            // 3D Developer character sits slightly lower for perfect compositional balance
            return {
                x: isDesktop ? 18 : 0,
                y: isDesktop ? -1 : -6,
                z: 10
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
            name: '3D Developer Platform',
            eyebrow: "AVAILABLE FOR OPPORTUNITIES",
            subtitle: "Senior Angular Developer",
            tagline: "I build modern, scalable, interactive and high-performance web applications using Angular, TypeScript and cutting-edge frontend technologies.",
            accent: '#8b35ff'
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
            color: currentThemeIndex === 0 ? 0x8b35ff : (currentThemeIndex === 2 ? 0x00d2ff : 0xb44dff),
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
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        scrollY += (targetScrollY - scrollY) * 0.08;
        const scrollFraction = Math.min(1, Math.max(0, scrollY / maxScroll));

        const basePos = getThemeBasePos(currentThemeIndex);

        // 1. ANIMATE THEME 0 (3D DEVELOPER PLATFORM)
        if (devThemeGroup.visible) {
            devThemeGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);

            // Platform gentle floating bob
            platformGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.8;
            charGroup.position.y = -6.1 + Math.sin(elapsedTime * 1.2) * 0.8;

            // Rotating neon rings under rock
            neonRing1.rotation.z = elapsedTime * 0.5;
            neonRing2.rotation.z = -elapsedTime * 0.4;

            // Spiral purple ribbons wrapping developer
            orbitRibbon1.rotation.z = elapsedTime * 0.25;
            orbitRibbon2.rotation.z = -elapsedTime * 0.2;

            // Floating technology cards orbiting & bobbing
            techCards.forEach((card, idx) => {
                card.position.y = card.userData.baseY + Math.sin(elapsedTime * card.userData.floatSpeed + idx) * 0.9;
                card.rotation.y = Math.sin(elapsedTime * 0.8 + idx) * 0.15;
            });

            // Tumbling crystal rocks
            floatingRocks.forEach((rock, idx) => {
                rock.rotation.x += rock.userData.rotX;
                rock.rotation.y += rock.userData.rotY;
                rock.position.y = rock.userData.baseY + Math.sin(elapsedTime * rock.userData.speed + idx) * 1.2;
            });

            // Parallax mouse tilt
            devThemeGroup.rotation.y = mouse.x * 0.4;
            devThemeGroup.rotation.x = -mouse.y * 0.25;

            devThemeGroup.position.x = basePos.x;
            devThemeGroup.position.y = basePos.y + scrollFraction * 20;
            devThemeGroup.position.z = basePos.z - scrollFraction * 25;
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

        // Default to Theme 0 (3D Developer Platform)
        applyTheme(0, false);
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
