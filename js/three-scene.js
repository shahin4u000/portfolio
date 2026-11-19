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

        ctx.save();
        ctx.translate(128, 128);
        ctx.fillStyle = '#e34f26';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.moveTo(-60, -75);
        ctx.lineTo(60, -75);
        ctx.lineTo(48, 65);
        ctx.lineTo(0, 80);
        ctx.lineTo(-48, 65);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ef652a';
        ctx.beginPath();
        ctx.moveTo(0, -65);
        ctx.lineTo(48, -65);
        ctx.lineTo(38, 55);
        ctx.lineTo(0, 68);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 80px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('5', 0, 4);
        ctx.restore();

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // CSS3 Logo Texture
    function createCSS3LogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#1572b6';
        ctx.stroke();

        ctx.save();
        ctx.translate(128, 128);
        ctx.fillStyle = '#1572b6';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.moveTo(-60, -75);
        ctx.lineTo(60, -75);
        ctx.lineTo(48, 65);
        ctx.lineTo(0, 80);
        ctx.lineTo(-48, 65);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#33a9dc';
        ctx.beginPath();
        ctx.moveTo(0, -65);
        ctx.lineTo(48, -65);
        ctx.lineTo(38, 55);
        ctx.lineTo(0, 68);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 80px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('3', 0, 4);
        ctx.restore();

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // Docker / DevOps Logo Texture
    function createDevOpsLogoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f111a';
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 236, 40);
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#2496ed';
        ctx.stroke();

        ctx.save();
        ctx.translate(128, 112);
        ctx.fillStyle = '#2496ed';
        ctx.shadowColor = '#06d6e0';
        ctx.shadowBlur = 20;

        const bSize = 16;
        const bGap = 4;
        const startX = -32;
        ctx.fillRect(startX + bSize + bGap, -40, bSize, bSize);
        ctx.fillRect(startX + (bSize + bGap) * 2, -40, bSize, bSize);
        ctx.fillRect(startX, -20, bSize, bSize);
        ctx.fillRect(startX + bSize + bGap, -20, bSize, bSize);
        ctx.fillRect(startX + (bSize + bGap) * 2, -20, bSize, bSize);

        ctx.beginPath();
        ctx.moveTo(-50, 2);
        ctx.bezierCurveTo(-50, 26, -18, 34, 22, 34);
        ctx.bezierCurveTo(44, 34, 56, 18, 60, 4);
        ctx.lineTo(-50, 2);
        ctx.fill();
        ctx.restore();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('DevOps', 128, 194);
        ctx.font = '600 15px Inter, sans-serif';
        ctx.fillStyle = '#06d6e0';
        ctx.fillText('Docker · CI/CD', 128, 220);

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
    scene.fog = new THREE.FogExp2(0x060913, 0.028);

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

    // --- PROCEDURAL STUDIO ENVIRONMENT MAP (PMREM) FOR SPECULAR REFLECTIONS ON CYBER GLASS ---
    try {
        const pmremGen = new THREE.PMREMGenerator(renderer);
        pmremGen.compileEquirectangularShader();
        const envScene = new THREE.Scene();
        envScene.background = new THREE.Color(0x060913);

        const stripGeo = new THREE.PlaneGeometry(6, 1.4);
        const stripCyan = new THREE.Mesh(stripGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide }));
        stripCyan.position.set(4, 5, -3);
        stripCyan.rotation.set(-0.5, 0.4, 0.2);
        envScene.add(stripCyan);

        const stripIndigo = new THREE.Mesh(stripGeo, new THREE.MeshBasicMaterial({ color: 0x6366f1, side: THREE.DoubleSide }));
        stripIndigo.position.set(-4, 4, 3);
        stripIndigo.rotation.set(0.6, -0.5, -0.3);
        envScene.add(stripIndigo);

        const stripWhite = new THREE.Mesh(new THREE.PlaneGeometry(8, 0.8), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
        stripWhite.position.set(0, 7, 0);
        stripWhite.rotation.x = Math.PI / 2;
        envScene.add(stripWhite);

        const envRenderTarget = pmremGen.fromScene(envScene, 0.04);
        scene.environment = envRenderTarget.texture;
        pmremGen.dispose();
    } catch (e) {
        console.warn('Environment map generation skipped:', e);
    }

    // --- PROCEDURAL TEXTURE GENERATORS: BOKEH CIRCULAR PARTICLES & NEBULA VOLUMETRICS ---
    function createBokehParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        grad.addColorStop(0.25, 'rgba(125, 211, 252, 0.9)');
        grad.addColorStop(0.55, 'rgba(56, 189, 248, 0.45)');
        grad.addColorStop(0.85, 'rgba(99, 102, 241, 0.15)');
        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }
    const bokehParticleTexture = createBokehParticleTexture();

    function createNebulaGlowTexture(colorHex) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        const col = new THREE.Color(colorHex);
        grad.addColorStop(0, `rgba(${Math.round(col.r*255)}, ${Math.round(col.g*255)}, ${Math.round(col.b*255)}, 1.0)`);
        grad.addColorStop(0.35, `rgba(${Math.round(col.r*255)}, ${Math.round(col.g*255)}, ${Math.round(col.b*255)}, 0.55)`);
        grad.addColorStop(0.7, `rgba(${Math.round(col.r*255)}, ${Math.round(col.g*255)}, ${Math.round(col.b*255)}, 0.18)`);
        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }

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
    const html5LogoTex = createHTML5LogoTexture();
    const css3LogoTex = createCSS3LogoTexture();
    const devopsLogoTex = createDevOpsLogoTexture();
    const alienPlanetTex = createAlienPlanetTexture();
    const atmosphericHazeTex = createAtmosphericHazeTexture();

    // MOUSE & SCROLL STATE
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);

    // =========================================================================
    // THEME 0: ULTRA-RICH LUMINOUS CYBER-GLASS & NEON ENGINEERING STAGE
    // =========================================================================
    const devThemeGroup = new THREE.Group();
    scene.add(devThemeGroup);

    // 1. VOLUMETRIC AURORA / NEBULA GLOW BACKDROP (z = -4 to -7)
    const nebulaTexCyan = createNebulaGlowTexture(0x38bdf8);
    const nebulaTexIndigo = createNebulaGlowTexture(0x6366f1);
    const nebulaTexViolet = createNebulaGlowTexture(0xa855f7);

    const nebulaMat1 = new THREE.MeshBasicMaterial({
        map: nebulaTexCyan,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const nebulaPlane1 = new THREE.Mesh(new THREE.PlaneGeometry(17, 17), nebulaMat1);
    nebulaPlane1.position.set(3.0, 1.2, -5.5);
    devThemeGroup.add(nebulaPlane1);

    const nebulaMat2 = new THREE.MeshBasicMaterial({
        map: nebulaTexIndigo,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const nebulaPlane2 = new THREE.Mesh(new THREE.PlaneGeometry(21, 21), nebulaMat2);
    nebulaPlane2.position.set(-1.5, 0.5, -6.5);
    devThemeGroup.add(nebulaPlane2);

    const nebulaMat3 = new THREE.MeshBasicMaterial({
        map: nebulaTexViolet,
        transparent: true,
        opacity: 0.10,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const nebulaPlane3 = new THREE.Mesh(new THREE.PlaneGeometry(19, 19), nebulaMat3);
    nebulaPlane3.position.set(4.2, -1.0, -5.0);
    devThemeGroup.add(nebulaPlane3);

    // 2. ARCHITECTURAL PERSPECTIVE MICRO-GRID FLOOR at y = -2.2
    const gridHelper = new THREE.GridHelper(38, 76, 0x38bdf8, 0x1e293b);
    gridHelper.position.set(0, -2.2, 0);
    if (gridHelper.material) {
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.22;
        gridHelper.material.depthWrite = false;
    }
    devThemeGroup.add(gridHelper);

    // Concentric Floor Target Rings
    const floorRingGeo1 = new THREE.RingGeometry(1.6, 1.63, 64);
    const floorRingMat1 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    const floorRing1 = new THREE.Mesh(floorRingGeo1, floorRingMat1);
    floorRing1.rotation.x = -Math.PI / 2;
    floorRing1.position.set(2.6, -2.19, 0);
    devThemeGroup.add(floorRing1);

    const floorRingGeo2 = new THREE.RingGeometry(2.4, 2.43, 64);
    const floorRingMat2 = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    const floorRing2 = new THREE.Mesh(floorRingGeo2, floorRingMat2);
    floorRing2.rotation.x = -Math.PI / 2;
    floorRing2.position.set(2.6, -2.19, 0);
    devThemeGroup.add(floorRing2);

    // Expanding Neon Shockwave Ring on Floor (for 3D Energy Burst)
    const floorShockwaveGeo = new THREE.RingGeometry(0.2, 0.5, 64);
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

    let devBurstProgress = 1.0;
    let burstSpeedMult = 1.0;
    let burstWaveRadius = 0.0;

    function triggerDevEnergyBurst() {
        devBurstProgress = 0.0;
        burstSpeedMult = 3.6;
        burstWaveRadius = 0.1;
    }

    // 3. MULTI-TIERED ISOMETRIC CYBER-GLASS PLATFORM
    const stageGroup = new THREE.Group();
    stageGroup.position.set(2.6, 0.1, 0);
    stageGroup.rotation.set(0.42, -0.55, 0);
    devThemeGroup.add(stageGroup);

    // Helper: Add Dual-Layer Glowing Edges & Corner Vertex Nodes
    function setupDualGlowEdges(parentMesh, geometry, color1, color2, radiusNode) {
        const edgesGeo = new THREE.EdgesGeometry(geometry);
        // Inner crisp line
        const innerLine = new THREE.LineSegments(edgesGeo, new THREE.LineBasicMaterial({
            color: color1,
            transparent: true,
            opacity: 0.85
        }));
        parentMesh.add(innerLine);

        // Outer glowing line (scale 1.018, additive)
        const outerLine = new THREE.LineSegments(edgesGeo, new THREE.LineBasicMaterial({
            color: color2 || color1,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            linewidth: 2
        }));
        outerLine.scale.set(1.018, 1.018, 1.018);
        parentMesh.add(outerLine);

        // Corner vertex nodes
        if (radiusNode) {
            const posAttr = edgesGeo.attributes.position;
            const uniquePoints = [];
            for (let i = 0; i < posAttr.count; i++) {
                const p = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
                let found = false;
                for (const u of uniquePoints) {
                    if (u.distanceTo(p) < 0.06) { found = true; break; }
                }
                if (!found && uniquePoints.length < 14) uniquePoints.push(p);
            }

            const nodeGeo = new THREE.SphereGeometry(radiusNode, 10, 10);
            const nodeMat = new THREE.MeshBasicMaterial({
                color: color1,
                transparent: true,
                opacity: 0.95,
                blending: THREE.AdditiveBlending
            });
            uniquePoints.forEach(pt => {
                const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
                nodeMesh.position.copy(pt);
                parentMesh.add(nodeMesh);
            });
        }
    }

    // Tier 1: Base Tier - Dark brushed-obsidian beveled slab
    const baseSlabGeo = new THREE.CylinderGeometry(2.15, 2.35, 0.26, 6);
    const baseSlabMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a0f1d,
        roughness: 0.22,
        metalness: 0.88,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15
    });
    const baseSlab = new THREE.Mesh(baseSlabGeo, baseSlabMat);
    baseSlab.position.y = -0.32;
    setupDualGlowEdges(baseSlab, baseSlabGeo, 0x38bdf8, 0x818cf8, 0.045);
    stageGroup.add(baseSlab);

    // Tier 2: Middle Tier - Frosted translucent glass slab with specular transmission
    const glassSlabGeo = new THREE.CylinderGeometry(1.8, 1.92, 0.14, 6);
    const glassSlabMat = new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        transmission: 0.70,
        opacity: 0.50,
        transparent: true,
        roughness: 0.12,
        ior: 1.48,
        reflectivity: 0.85,
        clearcoat: 0.9,
        depthWrite: false
    });
    const glassSlab = new THREE.Mesh(glassSlabGeo, glassSlabMat);
    glassSlab.position.y = 0.02;
    setupDualGlowEdges(glassSlab, glassSlabGeo, 0x6366f1, 0x38bdf8, 0.04);

    // Circuit/architecture trace lines on frosted glass surface
    const traceGeo = new THREE.RingGeometry(0.5, 1.35, 6);
    const traceMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.40,
        blending: THREE.AdditiveBlending
    });
    const traceMesh = new THREE.Mesh(traceGeo, traceMat);
    traceMesh.rotation.x = -Math.PI / 2;
    traceMesh.position.y = 0.08;
    glassSlab.add(traceMesh);
    stageGroup.add(glassSlab);

    // Tier 3: Top Core Assembly (Reactive Architecture Core & Gyroscopic Energy Matrix)
    const coreGroup = new THREE.Group();
    coreGroup.position.y = 1.05;

    // A. Reactive Architecture Core (Faceted Icosahedron with Dual-Layer Glow)
    const coreGeo = new THREE.IcosahedronGeometry(0.72, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x060913,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.55,
        roughness: 0.18,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85,
        clearcoat: 1.0
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    setupDualGlowEdges(coreMesh, coreGeo, 0x38bdf8, 0x818cf8, 0.038);
    coreGroup.add(coreMesh);

    // B. Inner Energy Core (Pulsing Crystal Octahedron)
    const innerCrystalGeo = new THREE.OctahedronGeometry(0.36, 0);
    const innerCrystalMat = new THREE.MeshPhysicalMaterial({
        color: 0x060913,
        emissive: 0x6366f1,
        emissiveIntensity: 1.25,
        roughness: 0.15,
        metalness: 0.9,
        transparent: true,
        opacity: 0.95
    });
    const innerCrystalMesh = new THREE.Mesh(innerCrystalGeo, innerCrystalMat);
    coreGroup.add(innerCrystalMesh);

    // Counter-Rotating Gyroscopic Rings around inner crystal
    const gyroRingGeo1 = new THREE.TorusGeometry(0.50, 0.012, 16, 64);
    const gyroRingMat1 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.90,
        blending: THREE.AdditiveBlending
    });
    const gyroRing1 = new THREE.Mesh(gyroRingGeo1, gyroRingMat1);
    coreGroup.add(gyroRing1);

    const gyroRingGeo2 = new THREE.TorusGeometry(0.42, 0.010, 16, 64);
    const gyroRingMat2 = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const gyroRing2 = new THREE.Mesh(gyroRingGeo2, gyroRingMat2);
    gyroRing2.rotation.y = Math.PI / 2;
    coreGroup.add(gyroRing2);

    // C. 2 Tilted Thin Orbital Data Rings
    const orbitRingGeo1 = new THREE.TorusGeometry(1.28, 0.015, 16, 100);
    const orbitRingMat1 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending
    });
    const orbitRing1 = new THREE.Mesh(orbitRingGeo1, orbitRingMat1);
    orbitRing1.rotation.set(0.78, 0.38, 0.2);
    coreGroup.add(orbitRing1);

    const orbitRingGeo2 = new THREE.TorusGeometry(1.54, 0.012, 16, 100);
    const orbitRingMat2 = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.80,
        blending: THREE.AdditiveBlending
    });
    const orbitRing2 = new THREE.Mesh(orbitRingGeo2, orbitRingMat2);
    orbitRing2.rotation.set(-0.62, -0.68, 0.46);
    coreGroup.add(orbitRing2);

    // D. 7 Glowing Micro-Nodes Connected by Delicate Curved Data Splines
    const microNodes = [];
    const nodeCount = 7;
    const nodeSphGeo = new THREE.SphereGeometry(0.054, 16, 16);

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
            opacity: 0.50,
            blending: THREE.AdditiveBlending
        });
        const lineMesh = new THREE.Line(lineGeo, lineMat);
        coreGroup.add(lineMesh);
        nodeMesh.userData.splineLine = lineMesh;
    }

    // E. 8 Animated Data Pulse Beams (Light packets travelling along grid & orbit rings)
    const dataPulsePackets = [];
    const pulseSphGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const pulseMatCyan = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
    });
    const pulseMatIndigo = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
    });

    // 4 Floor grid packets travelling outwards along grid lines
    for (let i = 0; i < 4; i++) {
        const pMesh = new THREE.Mesh(pulseSphGeo, (i % 2 === 0) ? pulseMatCyan : pulseMatIndigo);
        pMesh.position.set(2.6, -2.18, 0);
        pMesh.userData = {
            type: 'grid',
            angle: (i / 4) * Math.PI * 2,
            distance: Math.random() * 8.0,
            speed: 0.05 + Math.random() * 0.035,
            maxDist: 8.5
        };
        devThemeGroup.add(pMesh);
        dataPulsePackets.push(pMesh);
    }

    // 4 Orbit packets travelling along tilted rings
    for (let i = 0; i < 4; i++) {
        const pMesh = new THREE.Mesh(pulseSphGeo, (i % 2 === 0) ? pulseMatCyan : pulseMatIndigo);
        pMesh.userData = {
            type: 'orbit',
            ringIndex: i % 2,
            angle: (i / 4) * Math.PI * 2,
            speed: 1.1 + (i % 2) * 0.5
        };
        coreGroup.add(pMesh);
        dataPulsePackets.push(pMesh);
    }
    stageGroup.add(coreGroup);

    // -------------------------------------------------------------------------
    // HOLOGRAPHIC FLOATING 3D TECH BADGES & ORBITING GLASS CUBES (CONCEPT 1)
    // Technologies: Angular, TypeScript, JavaScript, HTML5, CSS3, Docker/DevOps, RxJS, Three.js
    // -------------------------------------------------------------------------
    const techBadgesGroup = new THREE.Group();
    stageGroup.add(techBadgesGroup);

    const techConfigs = [
        { name: 'Angular', texture: angularLogoTex, color: 0xdd0031, glow: 0xf43f5e, radius: 2.38, height: 0.85, speed: 0.32, phase: 0.0 },
        { name: 'TypeScript', texture: tsLogoTex, color: 0x3178c6, glow: 0x38bdf8, radius: 2.68, height: 1.45, speed: 0.28, phase: 0.78 },
        { name: 'JavaScript', texture: jsLogoTex, color: 0xf7df1e, glow: 0xfbbf24, radius: 2.28, height: 0.25, speed: 0.35, phase: 1.57 },
        { name: 'RxJS', texture: rxjsLogoTex, color: 0xd80064, glow: 0xf43f5e, radius: 2.78, height: 1.65, speed: 0.26, phase: 2.35 },
        { name: 'HTML5', texture: html5LogoTex, color: 0xe34f26, glow: 0xf97316, radius: 2.48, height: 0.38, speed: 0.30, phase: 3.14 },
        { name: 'CSS3', texture: css3LogoTex, color: 0x1572b6, glow: 0x38bdf8, radius: 2.72, height: 1.15, speed: 0.29, phase: 3.92 },
        { name: 'DevOps', texture: devopsLogoTex, color: 0x2496ed, glow: 0x06d6e0, radius: 2.88, height: 0.12, speed: 0.27, phase: 4.71 },
        { name: 'Three.js', texture: threeLogoTex, color: 0x00d5ff, glow: 0x38bdf8, radius: 2.52, height: 1.82, speed: 0.31, phase: 5.49 }
    ];

    const floatingTechBadges = [];
    const techBadgeBoxGeo = new THREE.BoxGeometry(0.58, 0.58, 0.10);

    techConfigs.forEach((tech) => {
        const badgeGroup = new THREE.Group();

        // 6-sided materials: front face (index 4) has tech logo, other 5 faces have frosted dark cyber-glass
        const glassSideMat = new THREE.MeshPhysicalMaterial({
            color: 0x080d1a,
            roughness: 0.14,
            metalness: 0.88,
            transmission: 0.65,
            transparent: true,
            opacity: 0.90,
            clearcoat: 1.0,
            clearcoatRoughness: 0.12
        });

        const logoFrontMat = new THREE.MeshStandardMaterial({
            map: tech.texture,
            roughness: 0.15,
            metalness: 0.35,
            emissive: tech.color,
            emissiveIntensity: 0.35,
            transparent: true
        });

        // BoxGeometry face order: [px, nx, py, ny, pz, nz]. pz (index 4) is facing +Z
        const boxMats = [glassSideMat, glassSideMat, glassSideMat, glassSideMat, logoFrontMat, glassSideMat];
        const badgeBoxMesh = new THREE.Mesh(techBadgeBoxGeo, boxMats);
        badgeGroup.add(badgeBoxMesh);

        // Dual Glowing Neon Edges
        setupDualGlowEdges(badgeBoxMesh, techBadgeBoxGeo, tech.glow, tech.color, 0.026);

        // Soft halo sprite glow
        const haloSpriteMat = new THREE.SpriteMaterial({
            map: particleTexture,
            color: tech.glow,
            transparent: true,
            opacity: 0.42,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const haloSprite = new THREE.Sprite(haloSpriteMat);
        haloSprite.scale.set(1.15, 1.15, 1.0);
        haloSprite.position.set(0, 0, -0.05);
        badgeGroup.add(haloSprite);

        // Core-to-Badge Laser Connection Line
        const laserGeo = new THREE.BufferGeometry();
        const laserPos = new Float32Array(6);
        laserGeo.setAttribute('position', new THREE.BufferAttribute(laserPos, 3));
        const laserMat = new THREE.LineBasicMaterial({
            color: tech.glow,
            transparent: true,
            opacity: 0.32,
            blending: THREE.AdditiveBlending
        });
        const laserMesh = new THREE.Line(laserGeo, laserMat);
        devThemeGroup.add(laserMesh);

        badgeGroup.userData = {
            config: tech,
            laserMesh: laserMesh,
            currentAngle: tech.phase,
            baseHeight: tech.height,
            baseRadius: tech.radius,
            burstOffset: 0
        };

        techBadgesGroup.add(badgeGroup);
        floatingTechBadges.push(badgeGroup);
    });

    // Inter-badge polygon mesh lines (connecting badge i to i+1 for a cybernetic ring network)
    const interBadgeLines = [];
    for (let i = 0; i < techConfigs.length; i++) {
        const nextIdx = (i + 1) % techConfigs.length;
        const ringLineGeo = new THREE.BufferGeometry();
        const ringLinePos = new Float32Array(6);
        ringLineGeo.setAttribute('position', new THREE.BufferAttribute(ringLinePos, 3));
        const ringLineMat = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.20,
            blending: THREE.AdditiveBlending
        });
        const ringLineMesh = new THREE.Line(ringLineGeo, ringLineMat);
        devThemeGroup.add(ringLineMesh);
        interBadgeLines.push({ mesh: ringLineMesh, idxA: i, idxB: nextIdx });
    }

    // 4. RICH MULTI-LAYERED PARTICLE UNIVERSE (650+ GLOWING BOKEH PARTICLES ACROSS 3 DEPTH LAYERS)
    const totalParticles = 660;
    const pPositions = new Float32Array(totalParticles * 3);
    const pColors = new Float32Array(totalParticles * 3);
    const pSizes = new Float32Array(totalParticles);
    const pData = [];

    const cWhite = new THREE.Color(0xffffff);
    const cPaleCyan = new THREE.Color(0xa5f3fc);
    const cCyan = new THREE.Color(0x38bdf8);
    const cIndigo = new THREE.Color(0x6366f1);
    const cViolet = new THREE.Color(0xa855f7);
    const cEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < totalParticles; i++) {
        let x, y, z, size, col, speed, swayAmp, swayFreq, parallax;

        if (i < 360) {
            // Layer 1: Distant Starlight Dust (360 particles)
            x = (Math.random() - 0.5) * 26.0;
            y = -4.0 + Math.random() * 9.5;
            z = -8.0 + Math.random() * 4.5;
            size = 0.022 + Math.random() * 0.015;
            col = Math.random() > 0.4 ? cPaleCyan : (Math.random() > 0.5 ? cWhite : cIndigo);
            speed = 0.0018 + Math.random() * 0.003;
            swayAmp = 0.04 + Math.random() * 0.08;
            swayFreq = 0.3 + Math.random() * 0.8;
            parallax = 0.05;
        } else if (i < 590) {
            // Layer 2: Mid-ground Cyan/Indigo Data Motes (230 particles)
            x = (Math.random() - 0.5) * 20.0;
            y = -3.5 + Math.random() * 9.0;
            z = -3.5 + Math.random() * 4.5;
            size = 0.052 + Math.random() * 0.028;
            col = Math.random() > 0.5 ? cCyan : (Math.random() > 0.3 ? cIndigo : cEmerald);
            speed = 0.003 + Math.random() * 0.005;
            swayAmp = 0.08 + Math.random() * 0.15;
            swayFreq = 0.5 + Math.random() * 1.2;
            parallax = 0.18;
        } else {
            // Layer 3: Foreground Soft Bokeh Orbs (70 particles)
            x = (Math.random() - 0.5) * 15.0;
            y = -3.0 + Math.random() * 8.0;
            z = 1.5 + Math.random() * 4.0;
            size = 0.14 + Math.random() * 0.08;
            col = Math.random() > 0.5 ? cCyan : cViolet;
            speed = 0.004 + Math.random() * 0.006;
            swayAmp = 0.12 + Math.random() * 0.22;
            swayFreq = 0.4 + Math.random() * 0.9;
            parallax = 0.35;
        }

        pPositions[i * 3] = x;
        pPositions[i * 3 + 1] = y;
        pPositions[i * 3 + 2] = z;

        pColors[i * 3] = col.r;
        pColors[i * 3 + 1] = col.g;
        pColors[i * 3 + 2] = col.b;

        pSizes[i] = size;

        pData.push({
            speed,
            baseX: x,
            baseZ: z,
            swayAmp,
            swayFreq,
            parallax,
            twinklePhase: Math.random() * Math.PI * 2,
            repelX: 0,
            repelY: 0
        });
    }

    const universeGeo = new THREE.BufferGeometry();
    universeGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    universeGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const universeMat = new THREE.PointsMaterial({
        size: 0.045,
        map: bokehParticleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const universeParticles = new THREE.Points(universeGeo, universeMat);
    devThemeGroup.add(universeParticles);

    // 5. STUDIO LIGHTING SETUP
    const devAmbient = new THREE.AmbientLight(0x1e293b, 1.4);
    devThemeGroup.add(devAmbient);

    const devKeyLight = new THREE.DirectionalLight(0x38bdf8, 2.6);
    devKeyLight.position.set(6, 8, 5);
    devThemeGroup.add(devKeyLight);

    const devFillLight = new THREE.DirectionalLight(0x6366f1, 2.0);
    devFillLight.position.set(-6, -4, 4);
    devThemeGroup.add(devFillLight);

    const devPointLight = new THREE.PointLight(0x38bdf8, 1.6, 14);
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

        if (typeof floatingTechBadges !== 'undefined' && floatingTechBadges) {
            floatingTechBadges.forEach(b => {
                if (b.userData.laserMesh) b.userData.laserMesh.visible = (index === 0);
            });
        }
        if (typeof interBadgeLines !== 'undefined' && interBadgeLines) {
            interBadgeLines.forEach(item => {
                if (item.mesh) item.mesh.visible = (index === 0);
            });
        }

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

    // -------------------------------------------------------------------------
    // 360° INTERACTIVE STAGE ROTATION CONTROLLER (MOUSE DRAG / HOVER & TOUCH)
    // -------------------------------------------------------------------------
    let isDraggingStage = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let manualRotY = 0;
    let manualRotX = 0;
    let targetManualRotY = 0;
    let targetManualRotX = 0;
    let stageInertiaY = 0;
    let stageInertiaX = 0;
    let isInteractingWithStage = false;
    let stageReturnTimer = null;

    function notifyStageInteraction() {
        isInteractingWithStage = true;
        const hintEl = document.getElementById('stage360Hint');
        if (hintEl) hintEl.style.opacity = '0.2';
        clearTimeout(stageReturnTimer);
    }

    function scheduleStageReturn(delay = 1400) {
        clearTimeout(stageReturnTimer);
        stageReturnTimer = setTimeout(() => {
            isInteractingWithStage = false;
            const hintEl = document.getElementById('stage360Hint');
            if (hintEl) hintEl.style.opacity = '0.85';
        }, delay);
    }

    const hero3DZone = document.getElementById('hero3DZone');
    if (hero3DZone) {
        // Desktop mouse drag & hover
        hero3DZone.addEventListener('mousedown', (e) => {
            if (e.target.closest('button, a, input, select')) return;
            isDraggingStage = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            stageInertiaY = 0;
            stageInertiaX = 0;
            notifyStageInteraction();
            document.body.style.cursor = 'grabbing';
            hero3DZone.style.cursor = 'grabbing';
        });

        hero3DZone.addEventListener('mousemove', (e) => {
            if (!isDraggingStage) {
                // Interactive hover rotation over 3D model
                const rect = hero3DZone.getBoundingClientRect();
                const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                const relY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
                targetManualRotY += relX * 0.035;
                targetManualRotX = Math.max(-0.55, Math.min(0.55, targetManualRotX - relY * 0.02));
                notifyStageInteraction();
                scheduleStageReturn(1200);
            }
        });

        hero3DZone.addEventListener('mouseleave', () => {
            if (!isDraggingStage) {
                scheduleStageReturn(700);
            }
        });

        // Mobile touch swipe to rotate 360°
        hero3DZone.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDraggingStage = true;
                dragStartX = e.touches[0].clientX;
                dragStartY = e.touches[0].clientY;
                stageInertiaY = 0;
                stageInertiaX = 0;
                notifyStageInteraction();
            }
        }, { passive: true });

        hero3DZone.addEventListener('touchmove', (e) => {
            if (isDraggingStage && e.touches.length === 1) {
                const deltaX = e.touches[0].clientX - dragStartX;
                const deltaY = e.touches[0].clientY - dragStartY;
                targetManualRotY += deltaX * 0.012; // Free 360° rotation
                targetManualRotX = Math.max(-0.65, Math.min(0.65, targetManualRotX + deltaY * 0.008));
                stageInertiaY = deltaX * 0.012;
                stageInertiaX = deltaY * 0.008;
                dragStartX = e.touches[0].clientX;
                dragStartY = e.touches[0].clientY;
                notifyStageInteraction();
            }
        }, { passive: true });

        hero3DZone.addEventListener('touchend', () => {
            isDraggingStage = false;
            scheduleStageReturn(1500);
        }, { passive: true });
    }

    // Global drag tracking so fast drags don't stutter outside container
    window.addEventListener('mousemove', (e) => {
        if (isDraggingStage) {
            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;
            targetManualRotY += deltaX * 0.011; // 360° rotation
            targetManualRotX = Math.max(-0.65, Math.min(0.65, targetManualRotX + deltaY * 0.007));
            stageInertiaY = deltaX * 0.011;
            stageInertiaX = deltaY * 0.007;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            notifyStageInteraction();
        }
    });

    window.addEventListener('mouseup', () => {
        if (isDraggingStage) {
            isDraggingStage = false;
            document.body.style.cursor = '';
            if (hero3DZone) hero3DZone.style.cursor = 'grab';
            scheduleStageReturn(1600);
        }
    });

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

        // 1. ANIMATE THEME 0 (ULTRA-RICH LUMINOUS CYBER-GLASS & NEON SHOWCASE)
        if (devThemeGroup.visible) {
            devThemeGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);

            // Volumetric Nebula Glow Planes breathing & soft drift
            nebulaPlane1.position.x = 3.0 + Math.sin(elapsedTime * 0.35) * 0.45;
            nebulaPlane1.position.y = 1.2 + Math.cos(elapsedTime * 0.28) * 0.35;
            nebulaPlane1.material.opacity = 0.16 + Math.sin(elapsedTime * 0.6) * 0.04;

            nebulaPlane2.position.x = -1.5 + Math.cos(elapsedTime * 0.3) * 0.5;
            nebulaPlane2.position.y = 0.5 + Math.sin(elapsedTime * 0.25) * 0.4;
            nebulaPlane2.material.opacity = 0.18 + Math.cos(elapsedTime * 0.5) * 0.04;

            nebulaPlane3.position.x = 4.2 + Math.sin(elapsedTime * 0.22) * 0.4;
            nebulaPlane3.position.y = -1.0 + Math.cos(elapsedTime * 0.32) * 0.3;
            nebulaPlane3.material.opacity = 0.10 + Math.sin(elapsedTime * 0.45) * 0.025;

            // Full-page responsive 3D spatial trajectory across scroll
            const isDesktop = window.innerWidth > 968;
            const targetPosX = isDesktop ? (2.6 - scrollFraction * 1.4) : 0;
            const targetPosY = isDesktop ? (0.1 + Math.sin(scrollFraction * Math.PI) * 0.45) : -0.5;
            const targetPosZ = isDesktop ? (-scrollFraction * 1.6) : -1.5;
            const targetScale = isDesktop ? (1.0 - scrollFraction * 0.12) : 0.72;

            stageGroup.position.x = THREE.MathUtils.lerp(stageGroup.position.x, targetPosX, 0.08);
            stageGroup.position.y = THREE.MathUtils.lerp(stageGroup.position.y, targetPosY, 0.08);
            stageGroup.position.z = THREE.MathUtils.lerp(stageGroup.position.z, targetPosZ, 0.08);
            stageGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

            // Harmonic levitation with layered phase offset
            baseSlab.position.y = -0.32 + Math.sin(elapsedTime * 1.1) * 0.04;
            glassSlab.position.y = 0.02 + Math.sin(elapsedTime * 1.1 + 0.3) * 0.06;
            coreGroup.position.y = 1.05 + Math.sin(elapsedTime * 1.1 + 0.6) * 0.09;

            // Decay burst speed multiplier smoothly
            if (burstSpeedMult > 1.0) {
                burstSpeedMult = THREE.MathUtils.lerp(burstSpeedMult, 1.0, 0.035);
            }

            // Core rotations with burst acceleration
            coreMesh.rotation.y = elapsedTime * 0.35 * burstSpeedMult;
            coreMesh.rotation.x = elapsedTime * 0.15;

            // Inner Crystal pulse & gyroscopic counter-rotation
            innerCrystalMesh.rotation.y = -elapsedTime * 0.55 * burstSpeedMult;
            innerCrystalMesh.rotation.z = Math.sin(elapsedTime * 0.8) * 0.15;
            innerCrystalMat.emissiveIntensity = 1.25 + Math.sin(elapsedTime * 2.2) * 0.4;

            gyroRing1.rotation.x = elapsedTime * 1.2 * burstSpeedMult;
            gyroRing2.rotation.z = -elapsedTime * 1.4 * burstSpeedMult;

            // Orbital Rings rotation
            orbitRing1.rotation.z = elapsedTime * 0.40 * burstSpeedMult;
            orbitRing2.rotation.z = -elapsedTime * 0.32 * burstSpeedMult;

            // Micro-nodes orbit & curved splines update
            const corePos = new THREE.Vector3(0, 0, 0);
            microNodes.forEach((node) => {
                const angle = elapsedTime * node.userData.speed * burstSpeedMult + node.userData.phase;
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

            // Animated Data Pulse Beams
            dataPulsePackets.forEach(pkt => {
                if (pkt.userData.type === 'grid') {
                    pkt.userData.distance += pkt.userData.speed * burstSpeedMult;
                    if (pkt.userData.distance > pkt.userData.maxDist) {
                        pkt.userData.distance = 0.5;
                    }
                    const px = 2.6 + Math.cos(pkt.userData.angle) * pkt.userData.distance;
                    const pz = Math.sin(pkt.userData.angle) * pkt.userData.distance;
                    pkt.position.set(px, -2.18, pz);
                    pkt.material.opacity = (1 - pkt.userData.distance / pkt.userData.maxDist) * 0.95;
                } else if (pkt.userData.type === 'orbit') {
                    pkt.userData.angle += pkt.userData.speed * 0.02 * burstSpeedMult;
                    const rad = pkt.userData.ringIndex === 0 ? 1.28 : 1.54;
                    const tiltX = pkt.userData.ringIndex === 0 ? 0.78 : -0.62;
                    const ox = Math.cos(pkt.userData.angle) * rad;
                    const oz = Math.sin(pkt.userData.angle) * rad;
                    pkt.position.set(ox, Math.sin(tiltX) * oz, Math.cos(tiltX) * oz);
                }
            });

            // 650+ Bokeh Particles Animation with upward drift, cursor repulsion & ripple wave
            const positions = universeGeo.attributes.position.array;
            const mouseWorldX = mouse.x * 6.0;
            const mouseWorldY = -mouse.y * 4.0;

            if (burstWaveRadius > 0 && burstWaveRadius < 18.0) {
                burstWaveRadius += 0.45;
            } else {
                burstWaveRadius = 0;
            }

            for (let i = 0; i < totalParticles; i++) {
                const p = pData[i];
                // Upward drift
                positions[i * 3 + 1] += p.speed;

                // Sway
                let curX = p.baseX + Math.sin(elapsedTime * p.swayFreq) * p.swayAmp + mouse.x * p.parallax;
                let curY = positions[i * 3 + 1];
                let curZ = positions[i * 3 + 2];

                // Cursor repulsion
                const dx = curX - mouseWorldX;
                const dy = curY - mouseWorldY;
                const distMouse = Math.sqrt(dx * dx + dy * dy);
                if (distMouse < 2.8) {
                    const force = (1 - distMouse / 2.8) * 0.08;
                    p.repelX += (dx / (distMouse + 0.1)) * force;
                    p.repelY += (dy / (distMouse + 0.1)) * force;
                }
                p.repelX *= 0.92;
                p.repelY *= 0.92;

                // Burst ripple impulse
                if (burstWaveRadius > 0) {
                    const distCore = Math.sqrt((curX - 2.6) * (curX - 2.6) + curY * curY);
                    if (Math.abs(distCore - burstWaveRadius) < 1.4) {
                        positions[i * 3 + 1] += 0.04;
                    }
                }

                positions[i * 3] = curX + p.repelX;
                positions[i * 3 + 1] = curY + p.repelY;

                // Loop particle when exceeding top
                if (positions[i * 3 + 1] > 5.5) {
                    positions[i * 3 + 1] = -3.5;
                }
            }
            universeGeo.attributes.position.needsUpdate = true;

            // 360° Interactive Stage Rotation Blending (Drag / Hover / Inertia / Default Animation)
            if (isDraggingStage) {
                manualRotY = THREE.MathUtils.lerp(manualRotY, targetManualRotY, 0.22);
                manualRotX = THREE.MathUtils.lerp(manualRotX, targetManualRotX, 0.22);
            } else if (isInteractingWithStage) {
                // Decay inertia after user releases drag
                targetManualRotY += stageInertiaY;
                targetManualRotX = Math.max(-0.65, Math.min(0.65, targetManualRotX + stageInertiaX));
                stageInertiaY *= 0.92;
                stageInertiaX *= 0.92;
                manualRotY = THREE.MathUtils.lerp(manualRotY, targetManualRotY, 0.12);
                manualRotX = THREE.MathUtils.lerp(manualRotX, targetManualRotX, 0.12);
            } else {
                // User moved mouse away / released: smoothly glide back to default orientation ("jodi mouse sorai nai as usual ekon jemne animate korse temon e korbe")
                targetManualRotY = THREE.MathUtils.lerp(targetManualRotY, 0, 0.038);
                targetManualRotX = THREE.MathUtils.lerp(targetManualRotX, 0, 0.038);
                manualRotY = THREE.MathUtils.lerp(manualRotY, 0, 0.038);
                manualRotX = THREE.MathUtils.lerp(manualRotX, 0, 0.038);
                stageInertiaY = 0;
                stageInertiaX = 0;
            }

            const scrollPitch = Math.sin(scrollFraction * Math.PI * 2) * 0.10;
            const scrollYaw = Math.cos(scrollFraction * Math.PI) * 0.18;
            stageGroup.rotation.y = -0.55 + scrollYaw + manualRotY;
            stageGroup.rotation.x = 0.42 + scrollPitch + manualRotX;

            // Dynamic mouse-driven point light that follows cursor across page
            devPointLight.position.x = THREE.MathUtils.lerp(devPointLight.position.x, mouse.x * 4.5 + 2.6, 0.08);
            devPointLight.position.y = THREE.MathUtils.lerp(devPointLight.position.y, -mouse.y * 3.5 + 1.8, 0.08);

            if (waveMesh) waveMesh.visible = false;

            // Gentle scroll depth drift (keeps scene visible across entire page)
            devThemeGroup.position.y = -scrollFraction * 1.5;
            devThemeGroup.position.z = -scrollFraction * 2.0;

            // Enhanced 3D Energy Shockwave expansion
            if (devBurstProgress < 1.0) {
                devBurstProgress += 0.024;
                const shockRadius = 1 + devBurstProgress * 32;
                floorShockwaveRing.scale.set(shockRadius, shockRadius, 1);
                floorShockwaveMat.opacity = Math.max(0, (1 - devBurstProgress) * 0.95);
                coreMat.emissiveIntensity = 0.55 + Math.max(0, (1 - devBurstProgress) * 2.8);
                orbitRingMat1.opacity = 0.88 + Math.max(0, (1 - devBurstProgress) * 0.5);
                orbitRingMat2.opacity = 0.80 + Math.max(0, (1 - devBurstProgress) * 0.5);
            } else {
                floorShockwaveMat.opacity = 0;
            }

            // Concept 1: Floating Holographic Tech Badges & Orbiting Glass Cubes Animation
            const coreWorldPos = new THREE.Vector3();
            coreGroup.getWorldPosition(coreWorldPos);
            const badgeWorldPositions = [];

            floatingTechBadges.forEach((badge) => {
                const u = badge.userData;
                const cfg = u.config;

                // Push outwards smoothly during shockwave burst
                if (devBurstProgress < 1.0) {
                    u.burstOffset = THREE.MathUtils.lerp(u.burstOffset, (1.0 - devBurstProgress) * 0.9, 0.18);
                } else {
                    u.burstOffset = THREE.MathUtils.lerp(u.burstOffset, 0, 0.05);
                }

                u.currentAngle += cfg.speed * 0.016 * burstSpeedMult;
                const radScale = (window.innerWidth <= 968) ? 0.72 : 1.0;
                const r = (u.baseRadius + u.burstOffset) * radScale;
                const bx = Math.cos(u.currentAngle) * r;
                const bz = Math.sin(u.currentAngle) * r;
                const by = u.baseHeight * radScale + Math.sin(elapsedTime * 1.5 + cfg.phase) * 0.14;

                badge.position.set(bx, by, bz);

                const bScale = (window.innerWidth <= 968) ? 0.82 : 1.0;
                badge.scale.set(bScale, bScale, bScale);

                // Face outwards and slightly towards camera + mouse parallax tilt
                badge.rotation.y = -u.currentAngle + Math.PI / 2 + mouse.x * 0.4;
                badge.rotation.x = Math.sin(elapsedTime * 1.8 + cfg.phase) * 0.12 - mouse.y * 0.25;
                badge.rotation.z = Math.cos(elapsedTime * 1.4 + cfg.phase) * 0.08;

                const badgeWorldPos = new THREE.Vector3();
                badge.getWorldPosition(badgeWorldPos);
                badgeWorldPositions.push(badgeWorldPos);

                // Update core-to-badge laser line
                if (u.laserMesh) {
                    const lPos = u.laserMesh.geometry.attributes.position.array;
                    lPos[0] = coreWorldPos.x;
                    lPos[1] = coreWorldPos.y;
                    lPos[2] = coreWorldPos.z;
                    lPos[3] = badgeWorldPos.x;
                    lPos[4] = badgeWorldPos.y;
                    lPos[5] = badgeWorldPos.z;
                    u.laserMesh.geometry.attributes.position.needsUpdate = true;
                    u.laserMesh.material.opacity = 0.26 + Math.sin(elapsedTime * 2.8 + cfg.phase) * 0.12;
                }
            });

            // Update inter-badge network ring lines
            interBadgeLines.forEach(item => {
                const posA = badgeWorldPositions[item.idxA];
                const posB = badgeWorldPositions[item.idxB];
                if (posA && posB && item.mesh) {
                    const lPos = item.mesh.geometry.attributes.position.array;
                    lPos[0] = posA.x; lPos[1] = posA.y; lPos[2] = posA.z;
                    lPos[3] = posB.x; lPos[4] = posB.y; lPos[5] = posB.z;
                    item.mesh.geometry.attributes.position.needsUpdate = true;
                }
            });
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

        // Default theme is ALWAYS Cyber Theme (Theme 0 - 3D Developer Platform)
        applyTheme(0, false);
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
