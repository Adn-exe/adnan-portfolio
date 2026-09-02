import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

import './CircularGallery.css';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

const DEFAULT_FONT = 'bold 30px Figtree';
const DEFAULT_FONT_URL = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap';

function deriveFontFamilyFromUrl(url) {
  const fileName = (url.split('/').pop() || 'custom-font').split('?')[0];
  const base = fileName.replace(/\.(woff2?|ttf|otf|eot)$/i, '');
  return base.replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'CircularGalleryFont';
}

async function loadFontFromStylesheet(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch font stylesheet (${response.status})`);
  const cssText = await response.text();
  const faceBlocks = cssText.match(/@font-face\s*{[^}]*}/g) || [];
  let family = null;
  const fontFaces = [];
  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*['"]?([^;'"]+)['"]?/);
    const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
    if (!familyMatch || !urlMatch) continue;
    family = familyMatch[1].trim();
    const descriptors = {};
    const weightMatch = block.match(/font-weight:\s*([^;]+);/);
    const styleMatch = block.match(/font-style:\s*([^;]+);/);
    const rangeMatch = block.match(/unicode-range:\s*([^;]+);/);
    if (weightMatch) descriptors.weight = weightMatch[1].trim();
    if (styleMatch) descriptors.style = styleMatch[1].trim();
    if (rangeMatch) descriptors.unicodeRange = rangeMatch[1].trim();
    fontFaces.push(new FontFace(family, `url(${urlMatch[1]})`, descriptors));
  }
  if (!family) throw new Error('No @font-face rule found in the stylesheet');
  await Promise.allSettled(
    fontFaces.map(async face => {
      await face.load();
      document.fonts.add(face);
    })
  );
  return family;
}

async function loadFontFromFile(url) {
  const family = deriveFontFamilyFromUrl(url);
  const fontFace = new FontFace(family, `url(${url})`);
  await fontFace.load();
  document.fonts.add(fontFace);
  return family;
}

async function loadCustomFont(fontUrl) {
  const isStylesheet = fontUrl.includes('fonts.googleapis.com') || /\.css(\?.*)?$/i.test(fontUrl);
  return isStylesheet ? loadFontFromStylesheet(fontUrl) : loadFontFromFile(fontUrl);
}

async function resolveFont(font, fontUrl) {
  const effectiveUrl = fontUrl || (font === DEFAULT_FONT ? DEFAULT_FONT_URL : null);
  if (!effectiveUrl) {
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(font);
        await document.fonts.ready;
      } catch {
        // Ignore
      }
    }
    return font;
  }
  try {
    const family = await loadCustomFont(effectiveUrl);
    const sizeMatch = font.match(/^\s*(.*?\d+px)/);
    const prefix = sizeMatch ? sizeMatch[1].trim() : 'bold 30px';
    const resolved = `${prefix} "${family}"`;
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(resolved);
      } catch {
        // Ignore
      }
    }
    return resolved;
  } catch (error) {
    console.error('CircularGallery: unable to load font from', fontUrl, error);
    return font;
  }
}

function getFontSize(font) {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(gl, text, font = 'bold 30px monospace', color = 'black') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(getFontSize(font) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

function hexToRgb(hex) {
  if (!hex) return [0.0, 0.82, 1.0];
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [(num >> 16 & 255) / 255, (num >> 8 & 255) / 255, (num & 255) / 255];
}

function createCardWithTitleTexture(img, text, textColor = '#ffffff', accentColor = '#00D1FF', project = {}) {
  const canvas = document.createElement('canvas');
  const w = 800;
  const h = 1000;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Draw image with cover aspect fit
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = w / h;
  let renderW = w;
  let renderH = h;
  let offsetX = 0;
  let offsetY = 0;

  if (imgAspect > canvasAspect) {
    renderW = h * imgAspect;
    offsetX = (w - renderW) / 2;
  } else {
    renderH = w / imgAspect;
    offsetY = (h - renderH) / 2;
  }
  ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

  // Smooth dark gradient blend at the bottom of the card
  const gradient = ctx.createLinearGradient(0, h * 0.4, 0, h);
  gradient.addColorStop(0, 'rgba(5, 7, 12, 0)');
  gradient.addColorStop(0.5, 'rgba(5, 7, 12, 0.65)');
  gradient.addColorStop(1, 'rgba(5, 7, 12, 0.95)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // Extremely subtle inner border stroke
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 4;
  ctx.strokeRect(3, 3, w - 6, h - 6);

  // Decorative Accent bar matching unique project glow color
  ctx.fillStyle = accentColor;
  ctx.fillRect(40, h - 110, 44, 4);

  // Title text rendered INSIDE card with subtle glow
  ctx.fillStyle = textColor || '#FFFFFF';
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 6;
  ctx.fillText(text, 40, h - 50);

  // Direct Action Pill Buttons rendered on Card!
  let btnRight = w - 40;

  // Live Demo Button
  if (project.link && project.link !== '#') {
    const btnW = 160;
    const btnH = 46;
    const btnX = btnRight - btnW;
    const btnY = h - 85;

    ctx.fillStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 23);
    ctx.fill();

    ctx.fillStyle = '#05070C';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText('Live Demo ↗', btnX + btnW / 2, btnY + btnH / 2);

    btnRight -= (btnW + 16);
  }

  // GitHub Button
  if (project.github) {
    const btnW = 145;
    const btnH = 46;
    const btnX = btnRight - btnW;
    const btnY = h - 85;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 23);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GitHub ↗', btnX + btnW / 2, btnY + btnH / 2);
  }

  return canvas;
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    accentColor = '#00D1FF',
    originalData
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.accentColor = accentColor;
    this.originalData = originalData;
    this.createShader();
    this.createMesh();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = 0.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform vec3 uGlowColor;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          // Soft and subtle glowing colored border stroke on the card edge
          float borderMask = smoothstep(-0.005, -0.001, d) * (1.0 - smoothstep(-0.001, 0.0015, d));
          vec3 glowingEdge = uGlowColor * 0.7;

          vec3 finalColor = mix(color.rgb, glowingEdge, borderMask * 0.2);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [800, 1000] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
        uGlowColor: { value: hexToRgb(this.accentColor) }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      const cardCanvas = createCardWithTitleTexture(img, this.text, this.textColor, this.accentColor, this.originalData);
      texture.image = cardCanvas;
      this.program.uniforms.uImageSizes.value = [800, 1000];
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {}
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    // Smooth subtle scaling boost on hover
    this.hover = lerp(this.hover || 0, this.targetHover || 0, 0.1);

    const baseScaleY = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    const baseScaleX = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.scale.y = lerp(this.plane.scale.y, baseScaleY * (1.0 + this.hover * 0.04), 0.1);
    this.plane.scale.x = lerp(this.plane.scale.x, baseScaleX * (1.0 + this.hover * 0.04), 0.1);

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = '#ffffff',
      borderRadius = 0,
      font = 'bold 30px Figtree',
      scrollSpeed = 2,
      scrollEase = 0.05,
      onItemClick
    } = {}
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onItemClick = onItemClick;
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' }
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
        accentColor: data.accentColor || '#00D1FF',
        originalData: data.project || data
      });
    });
  }
  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
    this.startMouseX = e.touches ? e.touches[0].clientX : e.clientX;
    this.startMouseY = e.touches ? e.touches[0].clientY : e.clientY;
  }
  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }
  onTouchUp(e) {
    if (this.isDown) {
      const endX = e && e.changedTouches ? e.changedTouches[0].clientX : (e ? e.clientX : this.startMouseX);
      const endY = e && e.changedTouches ? e.changedTouches[0].clientY : (e ? e.clientY : this.startMouseY);
      const dist = Math.hypot((endX || this.startMouseX) - this.startMouseX, (endY || this.startMouseY) - this.startMouseY);

      if (dist < 10 && this.onItemClick && this.medias && this.medias.length > 0) {
        const rect = this.container.getBoundingClientRect();
        const relativeY = endY - rect.top;
        const relativeX = endX - rect.left;
        const screenX = (endX || this.startMouseX) - this.screen.width / 2;
        const glClickX = (screenX / (this.screen.width / 2)) * (this.viewport.width / 2);

        let clickedMedia = null;
        let minDistance = Infinity;

        this.medias.forEach(media => {
          const distance = Math.abs(media.plane.position.x - glClickX);
          if (distance < minDistance) {
            minDistance = distance;
            clickedMedia = media;
          }
        });

        if (clickedMedia) {
          const proj = clickedMedia.originalData || {};
          const isBottomActionArea = relativeY > rect.height * 0.65;

          if (isBottomActionArea) {
            if (relativeX > rect.width * 0.55 && proj.link && proj.link !== '#') {
              window.open(proj.link, '_blank');
              this.isDown = false;
              this.onCheck();
              return;
            }
            if (relativeX > rect.width * 0.35 && proj.github) {
              window.open(proj.github, '_blank');
              this.isDown = false;
              this.onCheck();
              return;
            }
          }

          this.onItemClick(proj);
        }
      }
    }
    this.isDown = false;
    this.onCheck();
  }
  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }
  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.scroll.target += this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        this.scroll.target -= this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case 'Home':
        e.preventDefault();
        this.scroll.target = 0;
        this.onCheckDebounce();
        break;

      default:
        break;
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  onMouseMove(e) {
    if (this.isDown) return;
    if (!this.medias || this.medias.length === 0 || !this.screen || !this.viewport) return;
    const rect = this.container.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    if (endX < 0 || endX > rect.width || endY < 0 || endY > rect.height) {
      this.medias.forEach(media => { media.targetHover = 0.0; });
      return;
    }

    const screenX = endX - this.screen.width / 2;
    const glClickX = (screenX / (this.screen.width / 2)) * (this.viewport.width / 2);

    let hoverIndex = -1;
    let minDistance = Infinity;

    this.medias.forEach((media, idx) => {
      const distance = Math.abs(media.plane.position.x - glClickX);
      if (distance < media.plane.scale.x / 2 && distance < minDistance) {
        minDistance = distance;
        hoverIndex = idx;
      }
    });

    this.medias.forEach((media, idx) => {
      media.targetHover = idx === hoverIndex ? 1.0 : 0.0;
    });
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    this.boundOnMouseMove = this.onMouseMove.bind(this);

    window.addEventListener('resize', this.boundOnResize);

    if (this.container) {
      this.container.addEventListener('mousewheel', this.boundOnWheel);
      this.container.addEventListener('wheel', this.boundOnWheel);
      this.container.addEventListener('mousedown', this.boundOnTouchDown);
      this.container.addEventListener('mousemove', this.boundOnTouchMove);
      this.container.addEventListener('mousemove', this.boundOnMouseMove);
      this.container.addEventListener('mouseup', this.boundOnTouchUp);
      this.container.addEventListener('mouseleave', this.boundOnTouchUp);
      this.container.addEventListener('touchstart', this.boundOnTouchDown);
      this.container.addEventListener('touchmove', this.boundOnTouchMove);
      this.container.addEventListener('touchend', this.boundOnTouchUp);
      this.container.addEventListener('keydown', this.boundOnKeyDown);
    }
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);

    if (this.container) {
      this.container.removeEventListener('mousewheel', this.boundOnWheel);
      this.container.removeEventListener('wheel', this.boundOnWheel);
      this.container.removeEventListener('mousedown', this.boundOnTouchDown);
      this.container.removeEventListener('mousemove', this.boundOnTouchMove);
      this.container.removeEventListener('mousemove', this.boundOnMouseMove);
      this.container.removeEventListener('mouseup', this.boundOnTouchUp);
      this.container.removeEventListener('mouseleave', this.boundOnTouchUp);
      this.container.removeEventListener('touchstart', this.boundOnTouchDown);
      this.container.removeEventListener('touchmove', this.boundOnTouchMove);
      this.container.removeEventListener('touchend', this.boundOnTouchUp);
      this.container.removeEventListener('keydown', this.boundOnKeyDown);
    }
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  fontUrl,
  scrollSpeed = 2,
  scrollEase = 0.05,
  onItemClick
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    let app;
    let isMounted = true;
    resolveFont(font, fontUrl).then(resolvedFont => {
      if (!isMounted || !containerRef.current) return;
      app = new App(containerRef.current, {
        items,
        bend,
        textColor,
        borderRadius,
        font: resolvedFont,
        scrollSpeed,
        scrollEase,
        onItemClick
      });
    });

    return () => {
      isMounted = false;
      if (app) app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase, onItemClick]);
  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular image gallery. Use left and right arrow keys to navigate."
    />
  );
}
