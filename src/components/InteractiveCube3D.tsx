import React, { useState, useRef, useEffect } from 'react';
import {
  CUBE_CELLS,
  DIMENSIONS,
  CubeCell,
} from '../data/mccumberContent';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  Info,
  Shield,
  CheckCircle2,
  Clock,
  HardDrive,
  Network,
  Cpu,
  Laptop,
  FileText,
  Users,
  ExternalLink,
  ChevronRight,
  Eye,
  Sliders,
  Image as ImageIcon,
  Download,
  X,
  HelpCircle,
  MousePointer,
  Sparkles,
  BookOpen,
  Compass,
  Palette,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

const CIA_COLORS: Record<string, string> = {
  confidentiality: 'from-blue-600 to-indigo-600',
  integrity: 'from-emerald-600 to-teal-600',
  availability: 'from-amber-500 to-orange-500',
};

const CIA_BORDER: Record<string, string> = {
  confidentiality: 'border-blue-400/60',
  integrity: 'border-emerald-400/60',
  availability: 'border-amber-400/60',
};

export type ColorPaletteMode = 'canonical' | 'cia' | 'safeguards' | 'states';

export interface FaceConfig {
  gradient: string;
  borderColor: string;
  textColor: string;
  icon: React.ReactNode;
  title: string;
  category: string;
  brightness: number;
}

export const InteractiveCube3D: React.FC = () => {
  // Rotation angles
  const [rotX, setRotX] = useState(-25);
  const [rotY, setRotY] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [explodedDistance, setExplodedDistance] = useState(14); // Exploded spacing in px
  const [selectedCellId, setSelectedCellId] = useState<string>('conf-rest-tech');
  const [filterDimension, setFilterDimension] = useState<string>('all');
  const [isOriginalImageOpen, setIsOriginalImageOpen] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  // New customization controls for readability and vibrant 3D look
  const [colorMode, setColorMode] = useState<ColorPaletteMode>('canonical');
  const [cubeScale, setCubeScale] = useState<number>(68); // 56px (compact), 68px (standard), 80px (large)
  const [hoveredCellId, setHoveredCellId] = useState<string | null>(null);

  const instructionsRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToInstructions = () => {
    instructionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-rotate effect
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 0.6) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setRotY((prev) => prev + dx * 0.6);
    setRotX((prev) => Math.max(-85, Math.min(85, prev - dy * 0.6)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePos.current.x;
    const dy = e.touches[0].clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setRotY((prev) => prev + dx * 0.6);
    setRotX((prev) => Math.max(-85, Math.min(85, prev - dy * 0.6)));
  };

  const selectedCell = CUBE_CELLS.find((c) => c.id === selectedCellId) || CUBE_CELLS[0];
  const hoveredCell = CUBE_CELLS.find((c) => c.id === hoveredCellId) || null;

  // Camera presets
  const setPreset = (name: 'isometric' | 'front' | 'side' | 'top') => {
    setAutoRotate(false);
    if (name === 'isometric') {
      setRotX(-25);
      setRotY(45);
    } else if (name === 'front') {
      setRotX(0);
      setRotY(0);
    } else if (name === 'side') {
      setRotX(0);
      setRotY(90);
    } else if (name === 'top') {
      setRotX(-90);
      setRotY(0);
    }
  };

  // Coordinate mapping for 3x3x3 grid
  // X: States of data (-1: rest, 0: transit, 1: processing)
  // Y: CIA Triad (-1: availability, 0: integrity, 1: confidentiality)
  // Z: Safeguards (-1: people, 0: policies, 1: technology)
  const stateToX: Record<string, number> = { rest: -1, transit: 0, processing: 1 };
  const ciaToY: Record<string, number> = { confidentiality: 1, integrity: 0, availability: -1 };
  const safeguardToZ: Record<string, number> = { technology: 1, policies: 0, people: -1 };

  const cubeSize = cubeScale; // dynamic base size of each sub-cube in px
  const spacing = cubeSize + explodedDistance;

  // Face config generator for realistic, high-contrast, colorful 3D blocks
  const getFaceConfig = (
    cell: CubeCell,
    face: 'front' | 'back' | 'top' | 'bottom' | 'right' | 'left'
  ): FaceConfig => {
    // 3D optical shading according to light source from above-front
    let brightness = 1.0;
    if (face === 'top') brightness = 1.15;
    else if (face === 'bottom') brightness = 0.75;
    else if (face === 'right' || face === 'left') brightness = 0.92;
    else if (face === 'back') brightness = 0.85;

    // 1. CANONICAL MULTICOLOR MODE (Matches original 1991 paper illustration & 3D Rubik model)
    if (colorMode === 'canonical') {
      if (face === 'front' || face === 'back') {
        if (cell.ciaId === 'confidentiality') {
          return {
            gradient: 'from-blue-600 via-blue-700 to-indigo-800',
            borderColor: 'border-blue-300',
            textColor: 'text-white',
            icon: <Shield className="h-4 w-4 text-blue-200" />,
            title: 'CONFID.',
            category: 'Meta CIA',
            brightness,
          };
        } else if (cell.ciaId === 'integrity') {
          return {
            gradient: 'from-emerald-600 via-emerald-700 to-teal-800',
            borderColor: 'border-emerald-300',
            textColor: 'text-white',
            icon: <CheckCircle2 className="h-4 w-4 text-emerald-200" />,
            title: 'INTEGRID.',
            category: 'Meta CIA',
            brightness,
          };
        } else {
          return {
            gradient: 'from-amber-500 via-amber-600 to-orange-700',
            borderColor: 'border-amber-200',
            textColor: 'text-white',
            icon: <Clock className="h-4 w-4 text-amber-200" />,
            title: 'DISPONIB.',
            category: 'Meta CIA',
            brightness,
          };
        }
      } else if (face === 'top' || face === 'bottom') {
        if (cell.safeguardId === 'technology') {
          return {
            gradient: 'from-cyan-500 via-cyan-600 to-teal-700',
            borderColor: 'border-cyan-300',
            textColor: 'text-white',
            icon: <Cpu className="h-4 w-4 text-cyan-100" />,
            title: 'TECNOLOGÍA',
            category: 'Salvaguarda',
            brightness,
          };
        } else if (cell.safeguardId === 'policies') {
          return {
            gradient: 'from-purple-600 via-purple-700 to-indigo-900',
            borderColor: 'border-purple-300',
            textColor: 'text-white',
            icon: <FileText className="h-4 w-4 text-purple-200" />,
            title: 'POLÍTICAS',
            category: 'Salvaguarda',
            brightness,
          };
        } else {
          return {
            gradient: 'from-rose-500 via-rose-600 to-pink-700',
            borderColor: 'border-rose-300',
            textColor: 'text-white',
            icon: <Users className="h-4 w-4 text-rose-200" />,
            title: 'PERSONAS',
            category: 'Salvaguarda',
            brightness,
          };
        }
      } else {
        if (cell.stateId === 'rest') {
          return {
            gradient: 'from-indigo-600 via-indigo-700 to-slate-900',
            borderColor: 'border-indigo-300',
            textColor: 'text-white',
            icon: <HardDrive className="h-4 w-4 text-indigo-200" />,
            title: 'REPOSO',
            category: 'Estado Datos',
            brightness,
          };
        } else if (cell.stateId === 'transit') {
          return {
            gradient: 'from-sky-500 via-sky-600 to-blue-800',
            borderColor: 'border-sky-300',
            textColor: 'text-white',
            icon: <Network className="h-4 w-4 text-sky-200" />,
            title: 'TRÁNSITO',
            category: 'Estado Datos',
            brightness,
          };
        } else {
          return {
            gradient: 'from-teal-500 via-teal-600 to-emerald-800',
            borderColor: 'border-teal-300',
            textColor: 'text-white',
            icon: <Laptop className="h-4 w-4 text-teal-200" />,
            title: 'PROCESO',
            category: 'Estado Datos',
            brightness,
          };
        }
      }
    }

    // 2. CIA GOALS FOCUS PALETTE
    if (colorMode === 'cia') {
      const base =
        cell.ciaId === 'confidentiality'
          ? {
              gradient: 'from-blue-600 via-blue-700 to-indigo-800',
              borderColor: 'border-blue-300',
              textColor: 'text-white',
            }
          : cell.ciaId === 'integrity'
          ? {
              gradient: 'from-emerald-600 via-emerald-700 to-teal-800',
              borderColor: 'border-emerald-300',
              textColor: 'text-white',
            }
          : {
              gradient: 'from-amber-500 via-amber-600 to-orange-700',
              borderColor: 'border-amber-200',
              textColor: 'text-white',
            };

      const title =
        face === 'front' || face === 'back'
          ? cell.ciaId === 'confidentiality'
            ? 'CONFID.'
            : cell.ciaId === 'integrity'
            ? 'INTEGRID.'
            : 'DISPONIB.'
          : face === 'top' || face === 'bottom'
          ? cell.safeguardId === 'technology'
            ? 'TECNOLOGÍA'
            : cell.safeguardId === 'policies'
            ? 'POLÍTICAS'
            : 'PERSONAS'
          : cell.stateId === 'rest'
          ? 'REPOSO'
          : cell.stateId === 'transit'
          ? 'TRÁNSITO'
          : 'PROCESO';

      const category =
        face === 'front' || face === 'back'
          ? 'Meta CIA'
          : face === 'top' || face === 'bottom'
          ? 'Salvaguarda'
          : 'Estado Datos';

      const icon =
        face === 'front' || face === 'back'
          ? cell.ciaId === 'confidentiality'
            ? <Shield className="h-4 w-4" />
            : cell.ciaId === 'integrity'
            ? <CheckCircle2 className="h-4 w-4" />
            : <Clock className="h-4 w-4" />
          : face === 'top' || face === 'bottom'
          ? cell.safeguardId === 'technology'
            ? <Cpu className="h-4 w-4" />
            : cell.safeguardId === 'policies'
            ? <FileText className="h-4 w-4" />
            : <Users className="h-4 w-4" />
          : cell.stateId === 'rest'
          ? <HardDrive className="h-4 w-4" />
          : cell.stateId === 'transit'
          ? <Network className="h-4 w-4" />
          : <Laptop className="h-4 w-4" />;

      return { ...base, title, category, icon, brightness };
    }

    // 3. SAFEGUARDS FOCUS PALETTE
    if (colorMode === 'safeguards') {
      const base =
        cell.safeguardId === 'technology'
          ? {
              gradient: 'from-cyan-500 via-cyan-600 to-teal-700',
              borderColor: 'border-cyan-300',
              textColor: 'text-white',
            }
          : cell.safeguardId === 'policies'
          ? {
              gradient: 'from-purple-600 via-purple-700 to-indigo-900',
              borderColor: 'border-purple-300',
              textColor: 'text-white',
            }
          : {
              gradient: 'from-rose-500 via-rose-600 to-pink-700',
              borderColor: 'border-rose-300',
              textColor: 'text-white',
            };

      const title =
        face === 'top' || face === 'bottom'
          ? cell.safeguardId === 'technology'
            ? 'TECNOLOGÍA'
            : cell.safeguardId === 'policies'
            ? 'POLÍTICAS'
            : 'PERSONAS'
          : face === 'front' || face === 'back'
          ? cell.ciaId === 'confidentiality'
            ? 'CONFID.'
            : cell.ciaId === 'integrity'
            ? 'INTEGRID.'
            : 'DISPONIB.'
          : cell.stateId === 'rest'
          ? 'REPOSO'
          : cell.stateId === 'transit'
          ? 'TRÁNSITO'
          : 'PROCESO';

      const category =
        face === 'top' || face === 'bottom'
          ? 'Salvaguarda'
          : face === 'front' || face === 'back'
          ? 'Meta CIA'
          : 'Estado Datos';

      const icon =
        face === 'top' || face === 'bottom'
          ? cell.safeguardId === 'technology'
            ? <Cpu className="h-4 w-4" />
            : cell.safeguardId === 'policies'
            ? <FileText className="h-4 w-4" />
            : <Users className="h-4 w-4" />
          : face === 'front' || face === 'back'
          ? cell.ciaId === 'confidentiality'
            ? <Shield className="h-4 w-4" />
            : cell.ciaId === 'integrity'
            ? <CheckCircle2 className="h-4 w-4" />
            : <Clock className="h-4 w-4" />
          : cell.stateId === 'rest'
          ? <HardDrive className="h-4 w-4" />
          : cell.stateId === 'transit'
          ? <Network className="h-4 w-4" />
          : <Laptop className="h-4 w-4" />;

      return { ...base, title, category, icon, brightness };
    }

    // 4. DATA STATES FOCUS PALETTE
    const base =
      cell.stateId === 'rest'
        ? {
            gradient: 'from-indigo-600 via-indigo-700 to-slate-900',
            borderColor: 'border-indigo-300',
            textColor: 'text-white',
          }
        : cell.stateId === 'transit'
        ? {
            gradient: 'from-sky-500 via-sky-600 to-blue-800',
            borderColor: 'border-sky-300',
            textColor: 'text-white',
          }
        : {
            gradient: 'from-teal-500 via-teal-600 to-emerald-800',
            borderColor: 'border-teal-300',
            textColor: 'text-white',
          };

    const title =
      face === 'right' || face === 'left'
        ? cell.stateId === 'rest'
          ? 'REPOSO'
          : cell.stateId === 'transit'
          ? 'TRÁNSITO'
          : 'PROCESO'
        : face === 'front' || face === 'back'
        ? cell.ciaId === 'confidentiality'
          ? 'CONFID.'
          : cell.ciaId === 'integrity'
          ? 'INTEGRID.'
          : 'DISPONIB.'
        : cell.safeguardId === 'technology'
        ? 'TECNOLOGÍA'
        : cell.safeguardId === 'policies'
        ? 'POLÍTICAS'
        : 'PERSONAS';

    const category =
      face === 'right' || face === 'left'
        ? 'Estado Datos'
        : face === 'front' || face === 'back'
        ? 'Meta CIA'
        : 'Salvaguarda';

    const icon =
      face === 'right' || face === 'left'
        ? cell.stateId === 'rest'
          ? <HardDrive className="h-4 w-4" />
          : cell.stateId === 'transit'
          ? <Network className="h-4 w-4" />
          : <Laptop className="h-4 w-4" />
        : face === 'front' || face === 'back'
        ? cell.ciaId === 'confidentiality'
          ? <Shield className="h-4 w-4" />
          : cell.ciaId === 'integrity'
          ? <CheckCircle2 className="h-4 w-4" />
          : <Clock className="h-4 w-4" />
        : cell.safeguardId === 'technology'
        ? <Cpu className="h-4 w-4" />
        : cell.safeguardId === 'policies'
        ? <FileText className="h-4 w-4" />
        : <Users className="h-4 w-4" />;

    return { ...base, title, category, icon, brightness };
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Introduction Banner */}
      <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Visualizador Interactivo 3D
              </span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Explorador Tridimensional del Cubo de McCumber
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-3xl">
              Arrastra el cubo con el ratón o el dedo para girarlo en cualquier ángulo. Haz clic en cualquiera de los <strong>27 cubos individuales</strong> para analizar el objetivo, los controles tecnológicos, las políticas organizacionales y el factor humano en esa celda específica.
            </p>

            {/* Instruction Trigger Buttons in Banner */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                id="btn-open-instructions-banner"
                onClick={() => setShowInstructionsModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600/25 hover:bg-blue-600/35 border border-blue-500/40 px-3 py-1.5 text-xs font-semibold text-blue-300 transition-colors shadow-sm"
              >
                <HelpCircle className="h-4 w-4 text-blue-400" />
                <span>¿Cómo usar el Cubo 3D? (Instrucciones)</span>
              </button>
              <button
                onClick={scrollToInstructions}
                className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700/60 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5 text-neutral-400" />
                <span>Manual Rápido Paso a Paso</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-center">
              <div className="text-xs text-blue-300 font-medium">Metas (CIA)</div>
              <div className="text-lg font-bold text-blue-400">3 Ejes</div>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-center">
              <div className="text-xs text-purple-300 font-medium">Estados</div>
              <div className="text-lg font-bold text-purple-400">3 Fases</div>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center">
              <div className="text-xs text-emerald-300 font-medium">Medidas</div>
              <div className="text-lg font-bold text-emerald-400">3 Tipos</div>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center">
              <div className="text-xs text-amber-300 font-medium">Intersecciones</div>
              <div className="text-lg font-bold text-amber-400">27 Celdas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 3D Canvas on Left/Center, Cell Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Viewport Column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900/80 p-3">
            {/* Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-neutral-400 mr-1 hidden sm:inline">Vistas:</span>
              <button
                id="btn-preset-iso"
                onClick={() => setPreset('isometric')}
                className="rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Isométrica
              </button>
              <button
                id="btn-preset-front"
                onClick={() => setPreset('front')}
                className="rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Frontal (CIA)
              </button>
              <button
                id="btn-preset-side"
                onClick={() => setPreset('side')}
                className="rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Lateral (Estados)
              </button>
              <button
                id="btn-preset-top"
                onClick={() => setPreset('top')}
                className="rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Superior
              </button>
            </div>

            {/* Toggle auto-rotate, reset, instructions and view original diagram */}
            <div className="flex items-center gap-2">
              <button
                id="btn-toolbar-instructions"
                onClick={() => setShowInstructionsModal(true)}
                className="flex items-center gap-1.5 rounded-lg bg-blue-950/70 hover:bg-blue-900/80 border border-blue-700/50 px-2.5 py-1 text-xs font-medium text-blue-300 transition-colors"
                title="Ver guía paso a paso de uso"
              >
                <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
                <span className="hidden sm:inline">Instrucciones</span>
              </button>
              <button
                id="btn-view-original-diagram"
                onClick={() => setIsOriginalImageOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-700/50 px-2.5 py-1 text-xs font-medium text-cyan-300 transition-colors"
                title="Ver imagen y diagrama original de McCumber (1991)"
              >
                <ImageIcon className="h-3.5 w-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Diagrama Original</span>
              </button>
              <button
                id="btn-auto-rotate"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  autoRotate
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {autoRotate ? 'Detener Giro' : 'Auto-Girar'}
              </button>
              <button
                id="btn-reset-rot"
                onClick={() => {
                  setRotX(-25);
                  setRotY(45);
                  setAutoRotate(false);
                }}
                title="Restablecer rotación"
                className="rounded-lg bg-neutral-800 p-1.5 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Color Palette & Cube Scale Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900/70 p-3 text-xs text-neutral-300">
            {/* Color Palette Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-200">
                <Palette className="h-4 w-4 text-cyan-400" />
                <span>Colores 3D:</span>
              </span>
              <div className="flex flex-wrap items-center gap-1">
                <button
                  id="btn-color-canonical"
                  onClick={() => setColorMode('canonical')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    colorMode === 'canonical'
                      ? 'bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-500 text-white shadow-md shadow-blue-500/20 ring-1 ring-white/50'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                  title="Estilo Canónico McCumber 1991 (Multicolor 3D con colores específicos por cara y eje)"
                >
                  Canónico (Multicolor)
                </button>
                <button
                  id="btn-color-cia"
                  onClick={() => setColorMode('cia')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    colorMode === 'cia'
                      ? 'bg-blue-600 text-white shadow-md ring-1 ring-blue-300'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                  title="Colorea los cubos según su meta CIA: Azul (Confidencialidad), Verde (Integridad), Ámbar (Disponibilidad)"
                >
                  Metas CIA
                </button>
                <button
                  id="btn-color-safeguards"
                  onClick={() => setColorMode('safeguards')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    colorMode === 'safeguards'
                      ? 'bg-purple-600 text-white shadow-md ring-1 ring-purple-300'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                  title="Colorea los cubos según su salvaguarda: Cian (Tecnología), Púrpura (Políticas), Rosa (Personas)"
                >
                  Salvaguardas
                </button>
                <button
                  id="btn-color-states"
                  onClick={() => setColorMode('states')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    colorMode === 'states'
                      ? 'bg-teal-600 text-white shadow-md ring-1 ring-teal-300'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                  title="Colorea según el estado del dato: Índigo (Reposo), Celeste (Tránsito), Verde Azulado (Procesamiento)"
                >
                  Estados Datos
                </button>
              </div>
            </div>

            {/* Cube Size / Zoom */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-medium text-neutral-400">
                <ZoomIn className="h-3.5 w-3.5 text-blue-400" />
                <span>Tamaño:</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  id="btn-size-compact"
                  onClick={() => setCubeScale(56)}
                  className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
                    cubeScale === 56 ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                  title="Celdas compactas (56px)"
                >
                  S
                </button>
                <button
                  id="btn-size-standard"
                  onClick={() => setCubeScale(68)}
                  className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
                    cubeScale === 68 ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                  title="Celdas estándar recomendadas (68px)"
                >
                  M
                </button>
                <button
                  id="btn-size-large"
                  onClick={() => setCubeScale(80)}
                  className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
                    cubeScale === 80 ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                  title="Celdas grandes para máxima legibilidad (80px)"
                >
                  L
                </button>
              </div>
            </div>
          </div>

          {/* Exploded View Slider & Dimension Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-xs text-neutral-300">
            {/* Slider */}
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" />
              <span>Explosión de capas:</span>
              <input
                id="exploded-slider"
                type="range"
                min="0"
                max="32"
                value={explodedDistance}
                onChange={(e) => setExplodedDistance(Number(e.target.value))}
                className="h-1.5 w-28 accent-indigo-500 cursor-pointer bg-neutral-800 rounded-lg"
              />
              <span className="font-mono text-neutral-400 w-7">{explodedDistance}px</span>
            </div>

            {/* Filter by Dimension Highlight */}
            <div className="flex items-center gap-2">
              <Sliders className="h-3.5 w-3.5 text-neutral-400" />
              <span>Filtrar:</span>
              <select
                id="filter-dim-select"
                value={filterDimension}
                onChange={(e) => setFilterDimension(e.target.value)}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">Todas las 27 facetas</option>
                <optgroup label="Metas (Tríada CIA)">
                  <option value="confidentiality">Solo Confidencialidad (9)</option>
                  <option value="integrity">Solo Integridad (9)</option>
                  <option value="availability">Solo Disponibilidad (9)</option>
                </optgroup>
                <optgroup label="Estados de la Información">
                  <option value="rest">Solo En Reposo (9)</option>
                  <option value="transit">Solo En Tránsito (9)</option>
                  <option value="processing">Solo En Procesamiento (9)</option>
                </optgroup>
                <optgroup label="Salvaguardas">
                  <option value="technology">Solo Tecnología (9)</option>
                  <option value="policies">Solo Políticas (9)</option>
                  <option value="people">Solo Personas (9)</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* 3D Stage Box */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="relative h-[520px] sm:h-[580px] w-full select-none cursor-grab active:cursor-grabbing rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 p-4 overflow-hidden flex items-center justify-center shadow-2xl"
            style={{ perspective: '1200px' }}
          >
            {/* Background Grid Accent */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Helper drag & selection tips */}
            <div className="absolute top-3 left-3 pointer-events-none flex flex-wrap items-center gap-2 z-20">
              <div className="rounded-md bg-neutral-900/90 px-2.5 py-1 text-[11px] text-neutral-300 backdrop-blur-md border border-neutral-700/60 flex items-center gap-1.5 shadow">
                <MousePointer className="h-3 w-3 text-cyan-400" />
                <span>Arrastra 360°</span>
              </div>
              <div className="hidden sm:flex rounded-md bg-neutral-900/90 px-2.5 py-1 text-[11px] text-neutral-300 backdrop-blur-md border border-neutral-700/60 items-center gap-1.5 shadow">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Clic en cualquier cubo 3D</span>
              </div>
            </div>

            {/* Floating Quick Instructions Button in Stage Box */}
            <button
              onClick={() => setShowInstructionsModal(true)}
              className="absolute top-3 right-3 rounded-md bg-neutral-900/90 hover:bg-neutral-800 px-2.5 py-1 text-[11px] font-medium text-blue-300 hover:text-white backdrop-blur-md border border-blue-500/40 flex items-center gap-1.5 transition-colors shadow-lg z-30"
              title="Ver instrucciones detalladas"
            >
              <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
              <span>Instrucciones</span>
            </button>

            {/* Top Axis Guide Banner (Salvaguardas / Medidas de Seguridad) */}
            <div className="absolute top-12 inset-x-4 pointer-events-none hidden sm:flex justify-center z-10">
              <div className="flex items-center gap-2 rounded-full bg-neutral-900/90 border border-cyan-500/40 px-3 py-1 text-[11px] font-semibold text-cyan-300 backdrop-blur-md shadow-lg">
                <span className="text-neutral-400">⟵ Eje Z (Profundidad):</span>
                <span className="text-cyan-300 font-bold">Tecnología</span>
                <span className="text-neutral-600">•</span>
                <span className="text-purple-300 font-bold">Políticas</span>
                <span className="text-neutral-600">•</span>
                <span className="text-rose-300 font-bold">Personas</span>
                <span className="text-neutral-400">⟶</span>
              </div>
            </div>

            {/* Left Vertical Axis Guide Banner (Metas CIA) */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none hidden md:flex flex-col items-center gap-1.5 rounded-xl bg-neutral-900/90 border border-blue-500/40 p-2 text-[10px] font-semibold backdrop-blur-md shadow-lg z-10">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">Eje Y (Vertical)</span>
              <div className="flex flex-col gap-1 items-center">
                <span className="rounded bg-blue-600/30 px-1.5 py-0.5 text-blue-300 border border-blue-500/40">Confidencialidad</span>
                <span className="text-neutral-500 text-[9px]">▲</span>
                <span className="rounded bg-emerald-600/30 px-1.5 py-0.5 text-emerald-300 border border-emerald-500/40">Integridad</span>
                <span className="text-neutral-500 text-[9px]">▲</span>
                <span className="rounded bg-amber-600/30 px-1.5 py-0.5 text-amber-300 border border-amber-500/40">Disponibilidad</span>
              </div>
            </div>

            {/* Bottom Axis Guide Banner (Estados de Información) */}
            <div className="absolute bottom-14 inset-x-4 pointer-events-none hidden sm:flex justify-center z-10">
              <div className="flex items-center gap-2 rounded-full bg-neutral-900/90 border border-purple-500/40 px-3 py-1 text-[11px] font-semibold text-purple-300 backdrop-blur-md shadow-lg">
                <span className="text-neutral-400">⟵ Eje X (Horizontal):</span>
                <span className="text-indigo-300 font-bold">En Reposo</span>
                <span className="text-neutral-600">•</span>
                <span className="text-sky-300 font-bold">En Tránsito</span>
                <span className="text-neutral-600">•</span>
                <span className="text-teal-300 font-bold">En Procesamiento</span>
                <span className="text-neutral-400">⟶</span>
              </div>
            </div>

            {/* Bottom HUD Tooltip Bar (Interactive Inspection Banner) */}
            <div className="absolute bottom-2 inset-x-3 pointer-events-none flex items-center justify-between gap-2 rounded-xl bg-neutral-900/95 border border-neutral-700/80 px-3 py-2 text-xs backdrop-blur-md shadow-xl z-20">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-semibold text-neutral-200 truncate">
                  {hoveredCell ? (
                    <>
                      <span className="text-cyan-300 font-bold">{hoveredCell.title}</span>
                      <span className="text-neutral-400 ml-1">
                        ({hoveredCell.ciaId === 'confidentiality' ? 'Confidencialidad' : hoveredCell.ciaId === 'integrity' ? 'Integridad' : 'Disponibilidad'} • {hoveredCell.stateId === 'rest' ? 'Reposo' : hoveredCell.stateId === 'transit' ? 'Tránsito' : 'Proceso'} • {hoveredCell.safeguardId === 'technology' ? 'Tecnología' : hoveredCell.safeguardId === 'policies' ? 'Políticas' : 'Personas'})
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-blue-400 font-bold">{selectedCell.title}</span>
                      <span className="text-neutral-400 ml-1">
                        (Seleccionado • Clic en otro cubo para inspeccionar)
                      </span>
                    </>
                  )}
                </span>
              </div>
              <span className="hidden sm:inline-block text-[11px] text-neutral-400 shrink-0 font-mono">
                #{CUBE_CELLS.findIndex((c) => c.id === (hoveredCellId || selectedCellId)) + 1}/27
              </span>
            </div>

            {/* The 3D World Transform Group */}
            <div
              className="relative transition-transform duration-75 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                width: `${cubeSize}px`,
                height: `${cubeSize}px`,
              }}
            >
              {/* Render all 27 sub-cubes as solid 3D blocks with 6 faces */}
              {CUBE_CELLS.map((cell) => {
                const xIndex = stateToX[cell.stateId]; // -1, 0, 1
                const yIndex = ciaToY[cell.ciaId]; // 1, 0, -1
                const zIndex = safeguardToZ[cell.safeguardId]; // 1, 0, -1

                const posX = xIndex * spacing;
                const posY = -yIndex * spacing; // Invert for traditional screen Y (positive Y goes up)
                const posZ = zIndex * spacing;

                const isSelected = selectedCellId === cell.id;
                const isHovered = hoveredCellId === cell.id;

                // Match filter
                const matchesFilter =
                  filterDimension === 'all' ||
                  cell.ciaId === filterDimension ||
                  cell.stateId === filterDimension ||
                  cell.safeguardId === filterDimension;

                const renderFace = (
                  face: 'front' | 'back' | 'top' | 'bottom' | 'right' | 'left',
                  transformStyle: string
                ) => {
                  const cfg = getFaceConfig(cell, face);
                  return (
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center rounded-[6px] border-[1.5px] ${cfg.borderColor} bg-gradient-to-br ${cfg.gradient} ${cfg.textColor} p-1 text-center select-none shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.5),0_3px_6px_rgba(0,0,0,0.35)] transition-all`}
                      style={{
                        transform: transformStyle,
                        filter: `brightness(${cfg.brightness})`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        {cfg.icon}
                        <span className="text-[10px] font-black uppercase tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                          {cfg.title}
                        </span>
                        <span className="text-[7.5px] font-bold opacity-90 uppercase tracking-wider leading-none mt-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
                          {cfg.category}
                        </span>
                      </div>
                    </div>
                  );
                };

                return (
                  <div
                    key={cell.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCellId(cell.id);
                    }}
                    onMouseEnter={() => setHoveredCellId(cell.id)}
                    onMouseLeave={() => setHoveredCellId(null)}
                    className={`absolute cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'scale-110 z-40 ring-4 ring-white shadow-[0_0_35px_rgba(255,255,255,1),0_0_20px_rgba(6,182,212,0.9)] rounded-[8px]'
                        : isHovered
                        ? 'scale-105 z-30 ring-2 ring-cyan-300'
                        : ''
                    } ${!matchesFilter ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
                    style={{
                      width: `${cubeSize}px`,
                      height: `${cubeSize}px`,
                      transformStyle: 'preserve-3d',
                      transform: `translate3d(${posX}px, ${posY}px, ${posZ}px)`,
                    }}
                    title={`${cell.title}`}
                  >
                    {/* Selected Badge Beacon */}
                    {isSelected && (
                      <div
                        className="absolute -top-3 -right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-900 shadow-xl border-2 border-blue-500 animate-bounce"
                        style={{ transform: `translateZ(${cubeSize / 2 + 10}px)` }}
                        title="Celda activa"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                    )}

                    {/* Front Face (Z+) */}
                    {renderFace('front', `translateZ(${cubeSize / 2}px)`)}

                    {/* Back Face (Z-) */}
                    {renderFace('back', `rotateY(180deg) translateZ(${cubeSize / 2}px)`)}

                    {/* Right Face (X+) */}
                    {renderFace('right', `rotateY(90deg) translateZ(${cubeSize / 2}px)`)}

                    {/* Left Face (X-) */}
                    {renderFace('left', `rotateY(-90deg) translateZ(${cubeSize / 2}px)`)}

                    {/* Top Face (Y-) */}
                    {renderFace('top', `rotateX(90deg) translateZ(${cubeSize / 2}px)`)}

                    {/* Bottom Face (Y+) */}
                    {renderFace('bottom', `rotateX(-90deg) translateZ(${cubeSize / 2}px)`)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Cell Inspector Column */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 backdrop-blur-md shadow-xl">
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                Intersección #{CUBE_CELLS.findIndex((c) => c.id === selectedCell.id) + 1} de 27
              </span>
              <span className="font-mono text-[11px] text-neutral-500">{selectedCell.id}</span>
            </div>

            {/* Title */}
            <h3 className="mt-3 text-lg font-bold text-white leading-snug">
              {selectedCell.title}
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              {selectedCell.shortDescription}
            </p>

            {/* 3 Axis Badges */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {/* CIA Badge */}
              <div
                className={`rounded-xl border p-2.5 ${
                  selectedCell.ciaId === 'confidentiality'
                    ? 'border-blue-500/40 bg-blue-500/10'
                    : selectedCell.ciaId === 'integrity'
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : 'border-amber-500/40 bg-amber-500/10'
                }`}
              >
                <div className="text-[10px] font-medium uppercase flex items-center gap-1 text-neutral-300">
                  {selectedCell.ciaId === 'confidentiality' ? (
                    <Shield className="h-3 w-3 text-blue-400" />
                  ) : selectedCell.ciaId === 'integrity' ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <Clock className="h-3 w-3 text-amber-400" />
                  )}
                  <span>Meta (CIA)</span>
                </div>
                <div
                  className={`mt-1 text-xs font-bold ${
                    selectedCell.ciaId === 'confidentiality'
                      ? 'text-blue-300'
                      : selectedCell.ciaId === 'integrity'
                      ? 'text-emerald-300'
                      : 'text-amber-300'
                  }`}
                >
                  {selectedCell.ciaId === 'confidentiality'
                    ? 'Confidencialidad'
                    : selectedCell.ciaId === 'integrity'
                    ? 'Integridad'
                    : 'Disponibilidad'}
                </div>
              </div>

              {/* State Badge */}
              <div
                className={`rounded-xl border p-2.5 ${
                  selectedCell.stateId === 'rest'
                    ? 'border-indigo-500/40 bg-indigo-500/10'
                    : selectedCell.stateId === 'transit'
                    ? 'border-sky-500/40 bg-sky-500/10'
                    : 'border-teal-500/40 bg-teal-500/10'
                }`}
              >
                <div className="text-[10px] font-medium uppercase flex items-center gap-1 text-neutral-300">
                  {selectedCell.stateId === 'rest' ? (
                    <HardDrive className="h-3 w-3 text-indigo-400" />
                  ) : selectedCell.stateId === 'transit' ? (
                    <Network className="h-3 w-3 text-sky-400" />
                  ) : (
                    <Cpu className="h-3 w-3 text-teal-400" />
                  )}
                  <span>Estado</span>
                </div>
                <div
                  className={`mt-1 text-xs font-bold ${
                    selectedCell.stateId === 'rest'
                      ? 'text-indigo-300'
                      : selectedCell.stateId === 'transit'
                      ? 'text-sky-300'
                      : 'text-teal-300'
                  }`}
                >
                  {selectedCell.stateId === 'rest'
                    ? 'En Reposo'
                    : selectedCell.stateId === 'transit'
                    ? 'En Tránsito'
                    : 'En Proceso'}
                </div>
              </div>

              {/* Safeguard Badge */}
              <div
                className={`rounded-xl border p-2.5 ${
                  selectedCell.safeguardId === 'technology'
                    ? 'border-cyan-500/40 bg-cyan-500/10'
                    : selectedCell.safeguardId === 'policies'
                    ? 'border-purple-500/40 bg-purple-500/10'
                    : 'border-rose-500/40 bg-rose-500/10'
                }`}
              >
                <div className="text-[10px] font-medium uppercase flex items-center gap-1 text-neutral-300">
                  {selectedCell.safeguardId === 'technology' ? (
                    <Cpu className="h-3 w-3 text-cyan-400" />
                  ) : selectedCell.safeguardId === 'policies' ? (
                    <FileText className="h-3 w-3 text-purple-400" />
                  ) : (
                    <Users className="h-3 w-3 text-rose-400" />
                  )}
                  <span>Salvaguarda</span>
                </div>
                <div
                  className={`mt-1 text-xs font-bold ${
                    selectedCell.safeguardId === 'technology'
                      ? 'text-cyan-300'
                      : selectedCell.safeguardId === 'policies'
                      ? 'text-purple-300'
                      : 'text-rose-300'
                  }`}
                >
                  {selectedCell.safeguardId === 'technology'
                    ? 'Tecnología'
                    : selectedCell.safeguardId === 'policies'
                    ? 'Políticas'
                    : 'Personas'}
                </div>
              </div>
            </div>

            {/* Objective */}
            <div className="mt-4 rounded-xl bg-neutral-800/60 p-3 border border-neutral-700/40">
              <h4 className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Objetivo Fundamental
              </h4>
              <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                {selectedCell.objective}
              </p>
            </div>

            {/* Key Controls */}
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-neutral-200 mb-2">
                Mecanismos y Controles Clave:
              </h4>
              <ul className="space-y-1.5">
                {selectedCell.controls.map((ctrl, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <ChevronRight className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="break-words leading-relaxed">{ctrl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real World Scenario */}
            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
              <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                Ejemplo en la Vida Real
              </h4>
              <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                {selectedCell.realWorldExample}
              </p>
            </div>

            {/* Standard Reference */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
              <span>Referencia estándar:</span>
              <span className="font-mono text-neutral-300 font-medium">
                {selectedCell.standardReference}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guía e Instrucciones de Uso del Cubo 3D */}
      <section
        ref={instructionsRef}
        id="instrucciones-cubo-3d"
        className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-7 backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                Manual del Usuario • Guía Interactiva
              </span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-white">
              Instrucciones para Usar el Cubo 3D Interactivo
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl">
              Sigue estos 5 pasos prácticos para navegar la matriz tridimensional, acceder a las celdas interiores, filtrar dimensiones y analizar las 27 facetas de seguridad de la información.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-modal-instructions-open"
              onClick={() => setShowInstructionsModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 px-3.5 py-2 text-xs font-semibold text-blue-300 transition-colors shadow-sm"
            >
              <HelpCircle className="h-4 w-4 text-blue-400" />
              <span>Ver Guía en Modal</span>
            </button>
          </div>
        </div>

        {/* 5 Step-by-Step Instruction Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Paso 1: Navegación y Rotación 360° */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-700/80 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-full">
                  Paso 1
                </span>
                <Compass className="h-5 w-5 text-cyan-400" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">
                Rotación y Vistas 360°
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                <strong>Arrastra con el ratón o desliza con el dedo</strong> sobre la zona oscura del lienzo para rotar el cubo libremente en los ejes horizontal y vertical.
              </p>
              <ul className="mt-2.5 space-y-1.5 text-xs text-neutral-400">
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Vistas Rápidas:</strong> Pulsa <em>Isométrica</em>, <em>Frontal (CIA)</em>, <em>Lateral (Estados)</em> o <em>Superior</em>.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Auto-Giro:</strong> Activa una rotación constante continua.</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-neutral-500 font-medium">Probar:</span>
              <button
                onClick={() => setPreset('isometric')}
                className="rounded-md bg-neutral-800 hover:bg-neutral-700 px-2 py-1 text-[11px] text-neutral-300 transition-colors"
              >
                Isométrica
              </button>
              <button
                onClick={() => setPreset('front')}
                className="rounded-md bg-neutral-800 hover:bg-neutral-700 px-2 py-1 text-[11px] text-neutral-300 transition-colors"
              >
                Frontal CIA
              </button>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="rounded-md bg-blue-900/60 hover:bg-blue-800/70 border border-blue-700/50 px-2 py-1 text-[11px] text-blue-300 transition-colors"
              >
                {autoRotate ? 'Parar Giro' : 'Auto-Girar'}
              </button>
            </div>
          </div>

          {/* Paso 2: Explosión de Capas */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-700/80 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded-full">
                  Paso 2
                </span>
                <Layers className="h-5 w-5 text-indigo-400" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">
                Explosión de Capas (0px a 32px)
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                El cubo tiene <strong>27 celdas (3 × 3 × 3)</strong>. En estado compacto (0px), la celda central queda escondida por los bloques exteriores.
              </p>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Mueve el deslizador horizontal de <strong>Explosión</strong> a 14px–24px para separar los 27 bloques y poder ver y seleccionar cualquier celda interior sin que nada la tape.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-neutral-500 font-medium">Probar:</span>
              <button
                onClick={() => setExplodedDistance(0)}
                className={`rounded-md px-2 py-1 text-[11px] transition-colors ${
                  explodedDistance === 0 ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                Compacto (0px)
              </button>
              <button
                onClick={() => setExplodedDistance(16)}
                className={`rounded-md px-2 py-1 text-[11px] transition-colors ${
                  explodedDistance === 16 ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                Separado (16px)
              </button>
              <button
                onClick={() => setExplodedDistance(26)}
                className={`rounded-md px-2 py-1 text-[11px] transition-colors ${
                  explodedDistance === 26 ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                Máximo (26px)
              </button>
            </div>
          </div>

          {/* Paso 3: Filtro Analítico por Dimensión */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-700/80 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/50 px-2 py-0.5 rounded-full">
                  Paso 3
                </span>
                <Sliders className="h-5 w-5 text-purple-400" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">
                Filtro por Dimensión (Aislamiento)
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                Utiliza el menú desplegable <strong>Filtrar</strong> para aislar un plano de 9 celdas a la vez. Los otros 18 cubos se atenuarán visualmente:
              </p>
              <ul className="mt-2.5 space-y-1.5 text-xs text-neutral-400">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span><strong>Metas CIA:</strong> Confidencialidad, Integridad o Disponibilidad.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span><strong>Estados:</strong> En Reposo, En Tránsito o En Proceso.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span><strong>Salvaguardas:</strong> Tecnología, Políticas o Personas.</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-neutral-500 font-medium">Probar:</span>
              <button
                onClick={() => setFilterDimension('confidentiality')}
                className="rounded-md bg-blue-950/80 border border-blue-800/60 hover:bg-blue-900 px-2 py-1 text-[11px] text-blue-300 transition-colors"
              >
                Solo Confidencialidad
              </button>
              <button
                onClick={() => setFilterDimension('rest')}
                className="rounded-md bg-purple-950/80 border border-purple-800/60 hover:bg-purple-900 px-2 py-1 text-[11px] text-purple-300 transition-colors"
              >
                Solo En Reposo
              </button>
              <button
                onClick={() => setFilterDimension('all')}
                className="rounded-md bg-neutral-800 hover:bg-neutral-700 px-2 py-1 text-[11px] text-neutral-300 transition-colors"
              >
                Todas (27)
              </button>
            </div>
          </div>

          {/* Paso 4: Selección e Inspección de Celdas */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-700/80 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                  Paso 4
                </span>
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">
                Inspección de la Celda (Panel Derecho)
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                <strong>Haz clic en cualquier subcubo</strong> en la visualización 3D. El cubo seleccionado se ilumina y el panel derecho muestra su expediente completo:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-neutral-400">
                <li>• <strong>Objetivo Fundamental:</strong> Qué se protege en esa intersección.</li>
                <li>• <strong>Controles Clave:</strong> Tecnologías, procesos y conductas.</li>
                <li>• <strong>Ejemplo en la Vida Real:</strong> Amenaza y defensa concreta.</li>
                <li>• <strong>Norma Estándar:</strong> Cláusulas ISO 27001 y NIST SP 800-53.</li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-neutral-500 font-medium">Ejemplos:</span>
              <button
                onClick={() => setSelectedCellId('conf-rest-tech')}
                className="rounded-md bg-neutral-800 hover:bg-neutral-700 px-2 py-1 text-[11px] text-blue-300 transition-colors"
              >
                Cifrado Reposo
              </button>
              <button
                onClick={() => setSelectedCellId('integ-proc-pol')}
                className="rounded-md bg-neutral-800 hover:bg-neutral-700 px-2 py-1 text-[11px] text-emerald-300 transition-colors"
              >
                Núcleo Central
              </button>
              <button
                onClick={() => setSelectedCellId('avail-trans-peop')}
                className="rounded-md bg-neutral-800 hover:bg-neutral-700 px-2 py-1 text-[11px] text-amber-300 transition-colors"
              >
                Disponibilidad Red
              </button>
            </div>
          </div>

          {/* Paso 5: Diagrama Canónico de McCumber */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-700/80 transition-colors md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded-full">
                  Paso 5
                </span>
                <ImageIcon className="h-5 w-5 text-amber-400" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">
                Cotejo con el Diagrama Canónico de John McCumber (1991)
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                El gemelo 3D es una reconstrucción fiel y exacta del esquema histórico publicado por John McCumber en 1991 (archivo <code>Pasted image 20260918111734.png</code>).
              </p>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Presiona el botón <strong>"Diagrama Original"</strong> en cualquier momento para abrir el visor en alta resolución con opción de descarga y comparar los 3 ejes matemáticos con el esquema original.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Totalmente sincronizado con el modelo matemático de 27 dominios.</span>
              </div>
              <button
                onClick={() => setIsOriginalImageOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/60 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors shadow-sm"
              >
                <ImageIcon className="h-3.5 w-3.5 text-cyan-400" />
                <span>Abrir Diagrama Canónico</span>
              </button>
            </div>
          </div>
        </div>

        {/* Color Code Legend & Keyboard/Touch Guide */}
        <div className="mt-6 rounded-xl border border-neutral-800/80 bg-neutral-950/40 p-4">
          <h5 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3">
            Guía de Colores y Convenciones de Ejes
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-600 to-indigo-600 border border-blue-400/50 shadow" />
              <div>
                <div className="font-bold text-blue-300">Azul: Confidencialidad</div>
                <div className="text-[11px] text-neutral-400">Protección contra acceso no autorizado</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-4 w-4 rounded bg-gradient-to-br from-emerald-600 to-teal-600 border border-emerald-400/50 shadow" />
              <div>
                <div className="font-bold text-emerald-300">Verde: Integridad</div>
                <div className="text-[11px] text-neutral-400">Precisión, veracidad y no alteración</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="h-4 w-4 rounded bg-gradient-to-br from-amber-500 to-orange-500 border border-amber-400/50 shadow" />
              <div>
                <div className="font-bold text-amber-300">Ámbar: Disponibilidad</div>
                <div className="text-[11px] text-neutral-400">Acceso oportuno y resiliente cuando se requiere</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Instructions Modal */}
      {showInstructionsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowInstructionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-h-[92vh] w-full max-w-3xl rounded-2xl border border-neutral-700 bg-neutral-900 p-5 sm:p-7 shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30">
                  <HelpCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Instrucciones de Uso del Cubo 3D
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Gemelo digital del Cubo de McCumber (27 facetas interactivas)
                  </p>
                </div>
              </div>

              <button
                id="close-instructions-modal"
                onClick={() => setShowInstructionsModal(false)}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body with Scrollable Step Cards */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <Compass className="h-4 w-4 text-cyan-400" />
                  <span>1. ¿Cómo girar y mover el cubo?</span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                  Haz clic y arrastra con el ratón dentro del recuadro negro, o desliza tu dedo en dispositivos táctiles. El cubo responderá con rotación continua y suave en 360°. Si prefieres orientaciones fijas, usa los botones <strong>Isométrica</strong>, <strong>Frontal</strong>, <strong>Lateral</strong> o <strong>Superior</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-300">
                  <Layers className="h-4 w-4 text-indigo-400" />
                  <span>2. ¿Cómo ver las celdas ocultas del centro? (Explosión)</span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                  El cubo consta de 27 facetas (3×3×3). Para evitar que los cubos exteriores tapen el núcleo central, utiliza el control deslizante <strong>"Explosión de capas"</strong> (en la barra superior, a 14px–24px). Los bloques se separarán flotando en el espacio para que puedas hacer clic en el 100% de ellos.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-purple-300">
                  <Sliders className="h-4 w-4 text-purple-400" />
                  <span>3. ¿Cómo filtrar por un eje o dimensión?</span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                  En el desplegable <strong>Filtrar</strong>, puedes seleccionar cualquiera de las 9 facetas de una meta (Confidencialidad, Integridad, Disponibilidad), estado (Reposo, Tránsito, Proceso) o salvaguarda (Tecnología, Políticas, Personas). Las demás se vuelven semitransparentes para un análisis enfocado.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span>4. ¿Qué información muestra el Inspector al hacer clic?</span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                  Al pulsar sobre cualquiera de los 27 cubos, el panel derecho se actualiza con el <strong>Objetivo de Seguridad</strong> exacto, los <strong>Controles Clave</strong> recomendados (tecnología, procedimientos o personas), un <strong>Caso de la Vida Real</strong> con ejemplos de mitigación y los estándares normativos aplicables (<strong>ISO/IEC 27001</strong> y <strong>NIST SP 800-53</strong>).
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <span className="text-xs text-neutral-400">
                Tip: Presiona el icono de reinicio ↺ para volver a la orientación isométrica inicial.
              </span>
              <button
                id="btn-close-instructions-modal-footer"
                onClick={() => setShowInstructionsModal(false)}
                className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-semibold text-white transition-colors shadow-md"
              >
                ¡Entendido, Explorar Cubo!
              </button>
            </div>
          </div>
        </div>
      )}
      {isOriginalImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOriginalImageOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-h-[95vh] w-full max-w-4xl rounded-2xl border border-neutral-700 bg-neutral-900 p-4 sm:p-6 shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Diagrama Canónico del Cubo de McCumber (1991)
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-400">
                    Pasted image 20260918111734.png • John McCumber
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/assets/mccumber-cube.png"
                  download="Pasted image 20260918111734.png"
                  className="flex items-center gap-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs text-neutral-200 border border-neutral-700 transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Descargar</span>
                </a>
                <button
                  id="close-cube-image-modal"
                  onClick={() => setIsOriginalImageOpen(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Image Preview Container */}
            <div className="relative flex-1 overflow-auto py-4 flex items-center justify-center bg-neutral-950/90 rounded-xl my-4 border border-neutral-800 p-4">
              <img
                src="/assets/mccumber-cube.png"
                alt="Diagrama Original del Cubo de McCumber"
                className="max-h-[60vh] w-auto max-w-full rounded object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Explanatory Caption */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-800 text-xs text-neutral-400">
              <p className="text-center sm:text-left text-neutral-300">
                El modelo 3D interactivo en pantalla es la reconstrucción digital exacta de este diagrama de 27 celdas.
              </p>
              <button
                onClick={() => setIsOriginalImageOpen(false)}
                className="rounded-lg bg-neutral-800 hover:bg-neutral-700 px-4 py-1.5 text-xs font-medium text-neutral-300 transition-colors"
              >
                Volver al Cubo 3D
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
