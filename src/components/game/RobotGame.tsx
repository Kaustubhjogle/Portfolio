import React, { useRef, useEffect, useState, useCallback } from "react";
import "./RobotGame.css";

const SCALE    = 2;
const PX_W     = 16;
const PX_H     = 18;
const BLOB_W   = PX_W * SCALE;
const BLOB_H   = PX_H * SCALE;

const GRAVITY        = 0.22;
const JUMP_FORCE     = -6.8;
const MAX_SPEED      = 1.8;
const FRICTION       = 0.82;
const BLOCK_H        = 8;
const SPAWN_INTERVAL = 22;
const CELL_COUNT     = 5;

interface BlobType {
  x: number;
  docY: number;
  vx: number;
  vy: number;
  onGround: boolean;
  frame: number;
  status: "playing" | "dead" | "won";
  spawning: boolean;
  bounces: number;
  scaleX: number;
  scaleY: number;
  doubleJumpAvailable: boolean;
}

interface BlockType {
  x: number;
  docY: number;
  w: number;
  isSpawn: boolean;
  spawnIdx?: number;
  isGoal: boolean;
  alpha: number;
  revealed: boolean;
}

interface CellType {
  x: number;
  docY: number;
  collected: boolean;
}

interface AvoidZone {
  top: number;
  bot: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

interface PopupText {
  x: number;
  y: number;
  text: string;
  alpha: number;
  vy: number;
}

// Helper to key out white backgrounds and trim empty space surrounding the sprite
function trimAndKeyImage(img: HTMLImageElement): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(img, 0, 0);
  let imgData;
  try {
    imgData = ctx.getImageData(0, 0, img.width, img.height);
  } catch (e) {
    return null;
  }
  const data = imgData.data;
  const len = data.length;

  // Key out white pixels (r, g, b > 240) by setting alpha to 0
  for (let i = 0; i < len; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  // Scan for non-transparent bounding box
  let minX = img.width;
  let minY = img.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const alpha = data[(y * img.width + x) * 4 + 3];
      if (alpha > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) return null;

  // Draw keyed pixels back
  ctx.putImageData(imgData, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = maxX - minX + 1;
  croppedCanvas.height = maxY - minY + 1;
  const croppedCtx = croppedCanvas.getContext("2d");
  if (!croppedCtx) return null;

  croppedCtx.drawImage(
    canvas,
    minX,
    minY,
    croppedCanvas.width,
    croppedCanvas.height,
    0,
    0,
    croppedCanvas.width,
    croppedCanvas.height
  );

  return croppedCanvas;
}

// Handles automatic cropping of the Memoji avatar (removing transparent margins)
function trimImage(img: HTMLImageElement): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(img, 0, 0);
  let imgData;
  try {
    imgData = ctx.getImageData(0, 0, img.width, img.height);
  } catch (e) {
    return null;
  }
  const data = imgData.data;

  let minX = img.width;
  let minY = img.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const alpha = data[(y * img.width + x) * 4 + 3];
      if (alpha > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) return null;

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = maxX - minX + 1;
  croppedCanvas.height = maxY - minY + 1;
  const croppedCtx = croppedCanvas.getContext("2d");
  if (!croppedCtx) return null;

  croppedCtx.drawImage(
    canvas,
    minX,
    minY,
    croppedCanvas.width,
    croppedCanvas.height,
    0,
    0,
    croppedCanvas.width,
    croppedCanvas.height
  );

  return croppedCanvas;
}

function drawBlob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  vx: number,
  scaleX: number,
  scaleY: number,
  img: HTMLCanvasElement | HTMLImageElement | null
): void {
  ctx.save();
  ctx.translate(x + BLOB_W / 2, y + BLOB_H);
  ctx.scale(scaleX * SCALE, scaleY * SCALE);

  if (img) {
    const sw = img.width;
    const sh = img.height;

    const targetH = 24;
    const targetW = targetH * (sw / sh);

    const drawX = -targetW / 2;
    const drawY = -targetH;

    ctx.shadowColor = "#64ffda";
    ctx.shadowBlur = 10;

    ctx.drawImage(img, drawX, drawY, targetW, targetH);
  } else {
    // Vector fallback
    ctx.shadowColor = "#64ffda";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#64ffda";

    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.bezierCurveTo(-8, -12, -7, -18, 0, -18);
    ctx.bezierCurveTo(7, -18, 8, -12, 8, 0);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    let eyeOffset = 0;
    if (vx > 0.25) eyeOffset = 1.8;
    else if (vx < -0.25) eyeOffset = -1.8;

    ctx.fillStyle = "#0a192f";
    ctx.fillRect(-4.5 + eyeOffset, -12, 2, 2);
    ctx.fillRect(2.5 + eyeOffset, -12, 2, 2);
  }

  ctx.restore();
}

function drawBlock(ctx: CanvasRenderingContext2D, bx: number, by: number, bw: number, alpha = 1): void {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;

  const sh = 3; // surface height

  // 1. Draw procedurally jagged mud bottom structure
  ctx.fillStyle = "#4c3c31"; // lighter warm earthy mud
  ctx.beginPath();
  ctx.moveTo(bx, by + sh);

  const segments = 5;
  const step = bw / segments;
  for (let i = 1; i < segments; i++) {
    const px = bx + i * step;
    const middleFactor = Math.sin((i / segments) * Math.PI);
    const noise = Math.sin(bx * 0.14 + by * 0.27 + i * 2.3) * 4;
    const py = by + sh + 2 + (middleFactor * 11) + noise;
    ctx.lineTo(px, py);
  }
  ctx.lineTo(bx + bw, by + sh);
  ctx.closePath();
  ctx.fill();

  // 2. Draw vertical soil textures (roots/cracks) inside mud
  ctx.strokeStyle = "#635042"; // lighter soil highlight texture
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 1; i < segments; i++) {
    const px = bx + i * step;
    const middleFactor = Math.sin((i / segments) * Math.PI);
    const noise = Math.sin(bx * 0.19 + by * 0.33 + i * 1.7) * 2.5;
    const length = 2 + (middleFactor * 6) + noise;
    ctx.moveTo(px, by + sh + 1);
    ctx.lineTo(px, by + sh + length);
  }
  ctx.stroke();

  // 3. Draw plain surface stone slab
  ctx.fillStyle = "#5c4d3c"; // stone/dry clay surface
  ctx.fillRect(bx, by, bw, sh);

  // 4. Draw neon moss/grass accent top line
  ctx.fillStyle = "#64ffda"; 
  ctx.fillRect(bx, by, bw, 1);

  ctx.restore();
}

function drawStarShape(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number): void {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

// Renders the rotating cutting chai cup
function drawChaiCup(
  ctx: CanvasRenderingContext2D,
  ex: number,
  ey: number,
  scrollY: number,
  idx: number,
  img: HTMLCanvasElement | HTMLImageElement | null
): void {
  const sy = ey - scrollY;
  if (sy < -24 || sy > ctx.canvas.height + 24) return;

  const t   = Date.now() * 0.003 + idx * 1.5;
  const bob = Math.sin(t * 1.5) * 3;
  const angle = Math.sin(t * 0.5) * 0.25; // gentle swaying rotation back and forth
  const cx  = Math.round(ex + 8);
  const cy  = Math.round(sy + bob + 8);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  if (img) {
    const sw = img.width;
    const sh = img.height;
    
    const targetH = 48; // even larger cutting glass
    const targetW = targetH * (sw / sh);

    // Warm amber tea glow
    ctx.shadowColor = "#ea580c";
    ctx.shadowBlur = 10;

    ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
  } else {
    // Vector fallback star
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#fbbf24";
    drawStarShape(ctx, 0, 0, 5, 24, 10);
  }

  ctx.restore();
}

function generateCellLayout(
  nb: number,
  vw: number,
  totalHeight: number,
  avoidZones: AvoidZone[] = []
): { cells: CellType[]; extraLedges: BlockType[] } {
  const layoutType = Math.floor(Math.random() * 3);

  // 1. Dynamic Chai Cup placement
  const cells: CellType[] = [];
  const sectionInterval = (totalHeight - nb - 300) / CELL_COUNT;
  
  for (let i = 0; i < CELL_COUNT; i++) {
    const minY = nb + 180 + i * sectionInterval;
    const maxY = nb + 180 + (i + 0.8) * sectionInterval;
    const cellY = Math.round(minY + Math.random() * (maxY - minY));
    
    const col = i % 3;
    const cLeft  = Math.max(40, (vw - 900) / 2);
    const cRight = Math.min(vw - 60, cLeft + 900);
    
    let cellX = 60;
    if (col === 1) cellX = Math.round(vw / 2 - 8);
    else if (col === 2) cellX = Math.round(cRight - 60);
    
    cellX += Math.round((Math.random() - 0.5) * 60);
    cellX = Math.max(40, Math.min(vw - 80, cellX));
    
    cells.push({ x: cellX, docY: cellY, collected: false });
  }

  // 2. Dynamic Ledge generator
  const extraLedges: BlockType[] = [];
  const mk = (x: number, docY: number, w: number): BlockType => ({
    x, docY, w, isSpawn: false, isGoal: false, alpha: 0, revealed: false,
  });

  let currentY = nb + 160;
  let stepIdx = 0;
  while (currentY < totalHeight - 220) {
    const hasPlatform = avoidZones.some(
      (z) => currentY + 15 > z.top && currentY - 15 < z.bot
    );

    if (!hasPlatform) {
      let x = 40;
      if (layoutType === 0) {
        const col = stepIdx % 3;
        if (col === 1) x = Math.round(vw / 2 - 36);
        else if (col === 2) x = Math.round(vw - 120);
        x += Math.round((Math.random() - 0.5) * 40);
      } else if (layoutType === 1) {
        x = 40 + Math.round(Math.random() * (vw - 160));
      } else {
        const side = stepIdx % 2;
        if (side === 0) {
          x = 40 + Math.round(Math.random() * 60);
        } else {
          x = vw - 140 - Math.round(Math.random() * 60);
        }
      }

      x = Math.max(30, Math.min(vw - 100, x));
      extraLedges.push(mk(x, currentY, 72));
    }
    
    cells.forEach((cell) => {
      if (Math.abs(cell.docY + 16 - currentY) < 40) {
        extraLedges.push(mk(cell.x - 24, cell.docY + 16, 64));
      }
    });

    currentY += 150 + Math.round(Math.random() * 30);
    stepIdx++;
  }

  return { cells, extraLedges };
}

const PLATFORM_SELECTORS = [
  "h1",
  "h2",
  "h3",
  "p",
  "li",
  ".section-label",
];

function getNavbarBottom(): number {
  const nb = document.querySelector("nav");
  return nb ? nb.getBoundingClientRect().bottom : 60;
}

const DEAD_TEXT_OPTIONS = [
  {
    title: "Chai Spilled!",
    sub: "You dropped your hot cutting chai!",
    btn: "Brew Another Cup",
  },
  {
    title: "Cup Shattered!",
    sub: "A tragic end for a perfect hot brew!",
    btn: "Pour a Fresh Cup",
  },
  {
    title: "Tea Time Ruined!",
    sub: "The chai did not make it to the saucer!",
    btn: "Boil More Water",
  },
];

const getWonTextOptions = (cellCount: number) => [
  {
    title: "Chai Party Ready!",
    sub: `All ${cellCount} cups of hot cutting chai secured!`,
    btn: "Drink Again",
  },
  {
    title: "Perfect Brew!",
    sub: `You gathered all ${cellCount} chai cups flawlessly!`,
    btn: "Refill Cups",
  },
  {
    title: "Chai Pe Charcha!",
    sub: `Tea is served hot with all ${cellCount} cups ready!`,
    btn: "Pour Another Round",
  },
];

interface RobotGameProps {
  active: boolean;
}

const RobotGame = ({ active }: RobotGameProps) => {
  const canvasRef    = useRef<HTMLCanvasElement | null>(null);
  const animRef      = useRef<number | null>(null);
  const blobRef      = useRef<BlobType | null>(null);
  const blocksRef    = useRef<BlockType[]>([]);
  const cellsRef     = useRef<CellType[]>([]);
  const keysRef      = useRef<Set<string>>(new Set());
  const frameRef     = useRef<number>(0);

  // Image references
  const mascotImgRef = useRef<HTMLImageElement | null>(null);
  const croppedMascotRef = useRef<HTMLCanvasElement | HTMLImageElement | null>(null);
  const chaiCupImgRef = useRef<HTMLCanvasElement | HTMLImageElement | null>(null);

  // FX references
  const particlesRef = useRef<Particle[]>([]);
  const popupsRef    = useRef<PopupText[]>([]);
  const shakeAmountRef = useRef<number>(0);

  const [gameStatus,      setGameStatus]      = useState<"playing" | "dead" | "won">("playing");
  const [restartKey,      setRestartKey]      = useState<number>(0);
  const [cellsCollected,  setCellsCollected]  = useState<number>(0);
  const [deadTextIndex,   setDeadTextIndex]   = useState<number>(0);
  const [wonTextIndex,    setWonTextIndex]    = useState<number>(0);

  const restart = useCallback(() => setRestartKey((k) => k + 1), []);

  // Pre-load assets
  useEffect(() => {
    if (!active) return;

    // Load avatar
    const imgAvatar = new Image();
    imgAvatar.src = "/Kaustubh_Jogle.png";
    imgAvatar.onload = () => {
      mascotImgRef.current = imgAvatar;
      const trimmed = trimImage(imgAvatar);
      croppedMascotRef.current = trimmed || imgAvatar;
    };

    // Load Chai Cup
    const imgChai = new Image();
    imgChai.src = "/chai_cup.png";
    imgChai.onload = () => {
      const trimmed = trimAndKeyImage(imgChai);
      chaiCupImgRef.current = trimmed || imgChai;
    };
  }, [active]);

  const emitParticles = useCallback((x: number, y: number, color: string, count: number, speed: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (0.4 + Math.random() * 0.6) * speed;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 1.0,
        color,
        size: color === "#ea580c" ? (2 + Math.random() * 3) : (1.5 + Math.random() * 2),
        alpha: 1.0,
        decay: 0.015 + Math.random() * 0.015,
      });
    }
  }, []);

  const getPlatforms = useCallback(() => {
    const scrollY   = window.scrollY;
    const platforms = blocksRef.current
      .filter((b) => b.alpha > 0.5)
      .map((b) => ({ x: b.x, y: b.docY, w: b.w }));

    PLATFORM_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 60 || r.height > 100) return;
        const docTop = r.top + scrollY;
        if (docTop > scrollY + window.innerHeight + 200 || docTop + r.height < scrollY - 200) return;
        platforms.push({ x: r.left, y: docTop, w: r.width });
      });
    });
    return platforms;
  }, []);

  useEffect(() => {
    if (!active) {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const nb = getNavbarBottom();
    frameRef.current = 0;
    setCellsCollected(0);
    setDeadTextIndex(Math.floor(Math.random() * DEAD_TEXT_OPTIONS.length));
    setWonTextIndex(Math.floor(Math.random() * getWonTextOptions(CELL_COUNT).length));
    particlesRef.current = [];
    popupsRef.current = [];
    shakeAmountRef.current = 0;

    const allDomZones: AvoidZone[] = [];
    const textZones: AvoidZone[] = [];
    PLATFORM_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 60 || r.height < 4) return;
        allDomZones.push({ top: r.top - 4, bot: r.bottom + 4 });
        if (r.height <= 55) textZones.push({ top: r.top - 4, bot: r.bottom + 4 });
      });
    });

    const totalHeight = document.documentElement.scrollHeight;
    const { cells, extraLedges } = generateCellLayout(nb, canvas.width, totalHeight, allDomZones);
    cellsRef.current = cells;

    // Spawn platforms at the top of page (randomized X positions on restart)
    const spawn1_X = 20 + Math.round(Math.random() * 30);
    const spawn2_X = 140 + Math.round(Math.random() * 40);
    const spawn3_X = 290 + Math.round(Math.random() * 40);
    const spawn4_X = 420 + Math.round(Math.random() * 40);

    blocksRef.current = [
      { x: spawn1_X, docY: nb + 200, w: 80, isSpawn: true, spawnIdx: 0, isGoal: false, alpha: 0, revealed: false },
      { x: spawn2_X, docY: nb + 155, w: 76, isSpawn: true, spawnIdx: 1, isGoal: false, alpha: 0, revealed: false },
      { x: spawn3_X, docY: nb + 235, w: 76, isSpawn: true, spawnIdx: 2, isGoal: false, alpha: 0, revealed: false },
      { x: spawn4_X, docY: nb + 175, w: 76, isSpawn: true, spawnIdx: 3, isGoal: false, alpha: 0, revealed: false },
      ...extraLedges,
    ];

    const b0 = blocksRef.current[0];
    blobRef.current = {
      x:        Math.round(b0.x + b0.w / 2 - BLOB_W / 2),
      docY:     b0.docY - BLOB_H - 280,
      vx:       0,
      vy:       0,
      onGround: false,
      frame:    0,
      status:   "playing",
      spawning: true,
      bounces:  0,
      scaleX:   1.0,
      scaleY:   1.0,
      doubleJumpAvailable: true,
    };

    setGameStatus("playing");

    const onKeyDown = (e: KeyboardEvent) => {
      const a = blobRef.current;
      if (!a) return;

      if (e.code === "Space" && a.status === "dead") {
        restart();
        return;
      }

      if (["Space", "ArrowUp", "KeyW"].includes(e.code)) {
        if (a.status === "playing" && !a.spawning) {
          if (a.onGround) {
            // Standard Jump
            a.vy = JUMP_FORCE;
            a.onGround = false;
            a.scaleY = 1.45;
            a.scaleX = 0.65;
            emitParticles(a.x + BLOB_W / 2, a.docY + BLOB_H, "rgba(204, 214, 246, 0.5)", 8, 1.4);
          } else if (a.doubleJumpAvailable) {
            // Mid-air Double Jump!
            a.vy = JUMP_FORCE * 0.92;
            a.doubleJumpAvailable = false;
            a.scaleY = 1.35;
            a.scaleX = 0.7;
            emitParticles(a.x + BLOB_W / 2, a.docY + BLOB_H / 2, "rgba(100, 255, 218, 0.7)", 12, 1.8);
            shakeAmountRef.current = 2.5;
          }
        }
      }

      keysRef.current.add(e.code);
      if (["Space", "ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown", "KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code))
        e.preventDefault();
    };

    const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.code);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",   onKeyUp);

    const loop = () => {
      const a = blobRef.current;
      if (!a || a.status !== "playing") return;

      if (canvas.width  !== window.innerWidth)  canvas.width  = window.innerWidth;
      if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

      const scrollY = window.scrollY;
      frameRef.current++;

      blocksRef.current.forEach((b) => {
        if (!b.revealed) {
          if (b.isSpawn) {
            if (frameRef.current >= (b.spawnIdx ?? 0) * SPAWN_INTERVAL) b.revealed = true;
          } else {
            if (b.docY - scrollY < canvas.height + 80) b.revealed = true;
          }
        }
        if (b.revealed && b.alpha < 0.62) b.alpha = Math.min(b.alpha + 0.05, 0.62);
      });

      ctx.save();
      if (shakeAmountRef.current > 0) {
        const dx = (Math.random() - 0.5) * shakeAmountRef.current;
        const dy = (Math.random() - 0.5) * shakeAmountRef.current;
        ctx.translate(dx, dy);
        shakeAmountRef.current *= 0.85;
        if (shakeAmountRef.current < 0.1) shakeAmountRef.current = 0;
      }

      ctx.clearRect(-15, -15, canvas.width + 30, canvas.height + 30);

      // 1. Draw platforms
      blocksRef.current.forEach((b) => {
        if (b.alpha <= 0) return;
        const sy = b.docY - scrollY;
        if (sy > -BLOCK_H - 4 && sy < canvas.height + 4)
          drawBlock(ctx, b.x, sy, b.w, b.alpha);
      });

      // 2. Draw Chai Cups
      cellsRef.current.forEach((cell, idx) => {
        if (!cell.collected) drawChaiCup(ctx, cell.x, cell.docY, scrollY, idx, chaiCupImgRef.current);
      });

      // 3. Draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045;
        p.alpha -= p.decay;

        if (p.alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        if (p.color === "#ea580c") {
          ctx.beginPath();
          ctx.arc(p.x, p.y - scrollY, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(p.x, p.y - scrollY, p.size, p.size);
        }
        ctx.restore();
        return true;
      });

      // 4. Draw floating popups
      popupsRef.current = popupsRef.current.filter((pop) => {
        pop.y += pop.vy;
        pop.alpha -= 0.016;

        if (pop.alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = pop.alpha;
        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 11px var(--font-mono)";
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 3;
        ctx.textAlign = "center";
        ctx.fillText(pop.text, pop.x, pop.y - scrollY);
        ctx.restore();
        return true;
      });

      // 5. Spawning bounds physics
      if (a.spawning) {
        a.vy = Math.min(a.vy + GRAVITY, 8);
        a.docY += a.vy;
        a.frame++;

        const b = blocksRef.current[0];
        if (b.alpha > 0.5) {
          const rBot = a.docY + BLOB_H, prev = rBot - a.vy;
          if (a.x + BLOB_W > b.x && a.x < b.x + b.w &&
              prev <= b.docY + 4 && rBot >= b.docY && a.vy > 0) {
            a.docY = b.docY - BLOB_H;
            a.bounces++;
            if (a.bounces === 1) {
              a.vy = -4.5;
              a.scaleY = 0.65;
              a.scaleX = 1.35;
              emitParticles(a.x + BLOB_W / 2, a.docY + BLOB_H, "rgba(204, 214, 246, 0.4)", 5, 1.0);
            } else if (a.bounces === 2) {
              a.vy = -1.8;
              a.scaleY = 0.8;
              a.scaleX = 1.2;
              emitParticles(a.x + BLOB_W / 2, a.docY + BLOB_H, "rgba(204, 214, 246, 0.4)", 3, 0.7);
            } else {
              a.vy = 0;
              a.onGround = true;
              a.spawning = false;
              a.scaleX = 1.0;
              a.scaleY = 1.0;
            }
          }
        }

        a.scaleX += (1.0 - a.scaleX) * 0.12;
        a.scaleY += (1.0 - a.scaleY) * 0.12;

        const sy = a.docY - scrollY;
        if (sy > -BLOB_H && sy < canvas.height)
          drawBlob(ctx, a.x, sy, a.vx, a.scaleX, a.scaleY, croppedMascotRef.current);

        ctx.restore();
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      // 6. Horizontal controls
      const keys  = keysRef.current;
      const left  = keys.has("ArrowLeft")  || keys.has("KeyA");
      const right = keys.has("ArrowRight") || keys.has("KeyD");

      if (left)       a.vx = Math.max(a.vx - 0.32, -MAX_SPEED);
      else if (right) a.vx = Math.min(a.vx + 0.32,  MAX_SPEED);
      else            a.vx *= FRICTION;

      a.vy = Math.min(a.vy + GRAVITY, 8);
      a.x += a.vx;
      a.docY += a.vy;
      a.frame++;

      if (a.x < 0)                      { a.x = 0;                      a.vx = 0; }
      if (a.x + BLOB_W > canvas.width)  { a.x = canvas.width - BLOB_W;  a.vx = 0; }

      // 7. Squash & Stretch calculations
      let targetScaleX = 1.0;
      let targetScaleY = 1.0;

      if (a.onGround) {
        if (Math.abs(a.vx) < 0.25) {
          const breath = Math.sin(a.frame * 0.08) * 0.035;
          targetScaleY = 1.0 + breath;
          targetScaleX = 1.0 - breath;
        } else {
          const runCycle = Math.sin(a.frame * 0.2) * 0.06;
          targetScaleY = 1.0 - Math.abs(runCycle);
          targetScaleX = 1.0 + Math.abs(runCycle);
          if (a.frame % 12 === 0) {
            emitParticles(a.x + BLOB_W / 2, a.docY + BLOB_H, "rgba(204, 214, 246, 0.2)", 1, 0.4);
          }
        }
      } else {
        targetScaleY = 1.0 + Math.abs(a.vy) * 0.055;
        targetScaleX = 1.0 - Math.abs(a.vy) * 0.04;
      }

      a.scaleX += (targetScaleX - a.scaleX) * 0.18;
      a.scaleY += (targetScaleY - a.scaleY) * 0.18;

      // 8. Ground collision detection
      const platforms = getPlatforms();
      const wasOnGround = a.onGround;
      a.onGround = false;

      for (const p of platforms) {
        const rBot = a.docY + BLOB_H, prev = rBot - a.vy;
        if (a.x + BLOB_W > p.x + 2 && a.x < p.x + p.w - 2 &&
            prev <= p.y + 5 && rBot >= p.y - 1 && a.vy >= 0) {
          a.docY = p.y - BLOB_H;

          if (!wasOnGround) {
            a.scaleY = 0.55;
            a.scaleX = 1.35;
            a.doubleJumpAvailable = true;
            emitParticles(a.x + BLOB_W / 2, a.docY + BLOB_H, "rgba(204, 214, 246, 0.4)", 6, 1.2);
            if (a.vy > 3) {
              shakeAmountRef.current = Math.min(a.vy * 0.7, 6);
            }
          }

          a.vy = 0;
          a.onGround = true;
          break;
        }
      }

      // 9. Death checking
      if (a.docY - scrollY > canvas.height + 100) {
        a.status = "dead";
        shakeAmountRef.current = 10;
        setGameStatus("dead");
        ctx.restore();
        return;
      }

      // 10. Star collecting
      const aCx = a.x + BLOB_W / 2;
      const aCy = a.docY + BLOB_H / 2;
      cellsRef.current.forEach((cell) => {
        if (cell.collected) return;
        const cCx = cell.x + 8;
        const cCy = cell.docY + 8;
        if (Math.abs(aCx - cCx) < 32 && Math.abs(aCy - cCy) < 34) {
          cell.collected = true;
          setCellsCollected((c) => {
            const nextVal = c + 1;
            emitParticles(cell.x + 8, cell.docY + 8, "#ea580c", 18, 2.2);
            
            popupsRef.current.push({
              x: cell.x + 8,
              y: cell.docY - 8,
              text: ["CHAI!", "HOT TEA!", "SIP SIP!", "TEA TIME!", "CUTTING CHAI!"][Math.floor(Math.random() * 5)],
              alpha: 1.0,
              vy: -0.8,
            });
            shakeAmountRef.current = 6;
            return nextVal;
          });
        }
      });

      // 11. Won checking
      if (cellsRef.current.length > 0 && cellsRef.current.every((c) => c.collected)) {
        a.status = "won";
        setGameStatus("won");
        ctx.restore();
        return;
      }

      // 12. Draw mascot
      const sy = a.docY - scrollY;
      if (sy > -BLOB_H && sy < canvas.height + 40) {
        drawBlob(ctx, a.x, sy, a.vx, a.scaleX, a.scaleY, croppedMascotRef.current);
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup",   onKeyUp);
      window.removeEventListener("resize",  onResize);
      keysRef.current.clear();
    };
  }, [active, restartKey, getPlatforms, restart, emitParticles]);

  if (!active) return null;

  return (
    <>
      <canvas ref={canvasRef} className="robot-game-canvas" />

      {gameStatus === "playing" && (
        <div className="cell-counter">
          <span className="cell-counter-pip" style={{ background: '#ea580c', boxShadow: '0 0 8px #ea580c' }} />
          <span className="cell-counter-text">{cellsCollected} / {CELL_COUNT}</span>
        </div>
      )}

      {gameStatus === "dead" && (
        <div className="robot-game-status robot-game-status--dead">
          <div className="robot-game-status-title">{DEAD_TEXT_OPTIONS[deadTextIndex].title}</div>
          <div className="robot-game-status-sub">{DEAD_TEXT_OPTIONS[deadTextIndex].sub}</div>
          <button className="robot-game-status-btn" onClick={restart}>{DEAD_TEXT_OPTIONS[deadTextIndex].btn}</button>
          <div className="robot-game-status-hint">or press space</div>
        </div>
      )}

      {gameStatus === "won" && (
        <div className="robot-game-status robot-game-status--won">
          <div className="robot-game-status-title">{getWonTextOptions(CELL_COUNT)[wonTextIndex].title}</div>
          <div className="robot-game-status-sub">{getWonTextOptions(CELL_COUNT)[wonTextIndex].sub}</div>
          <button className="robot-game-status-btn" onClick={restart}>{getWonTextOptions(CELL_COUNT)[wonTextIndex].btn}</button>
        </div>
      )}
    </>
  );
};

export default RobotGame;
