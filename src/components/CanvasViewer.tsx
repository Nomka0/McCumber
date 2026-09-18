import React, { useState, useRef } from 'react';
import { CANVAS_NODES, CANVAS_EDGES, CanvasNode } from '../data/mccumberContent';
import { ZoomIn, ZoomOut, Maximize2, Move, HelpCircle, Image as ImageIcon, X, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const CanvasViewer: React.FC = () => {
  const [zoom, setZoom] = useState(0.85);
  const [pan, setPan] = useState({ x: 80, y: 40 });
  const [isPanning, setIsPanning] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-center');
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking on canvas background or group
    if ((e.target as HTMLElement).dataset.canvasBg) {
      setIsPanning(true);
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(1.5, prev + 0.15));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.4, prev - 0.15));
  const handleReset = () => {
    setZoom(0.85);
    setPan({ x: 80, y: 40 });
  };

  const groupNode = CANVAS_NODES.find((n) => n.type === 'group');
  const textNodes = CANVAS_NODES.filter((n) => n.type !== 'group');

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Header Info */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Obsidian Canvas (.canvas)
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Lienzo Conceptual: Cubo_de_McCumber.canvas
          </h2>
          <p className="text-xs text-neutral-400">
            Representación en grafo visual de Obsidian. Puedes arrastrar el lienzo para desplazarte y hacer clic en las tarjetas.
          </p>
        </div>

        {/* Viewport Toolbar */}
        <div className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/90 p-1.5 backdrop-blur-md shadow-sm self-start">
          <button
            id="canvas-zoom-out"
            onClick={handleZoomOut}
            title="Alejar"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono text-neutral-400 px-1 min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            id="canvas-zoom-in"
            onClick={handleZoomIn}
            title="Acercar"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <div className="h-4 w-px bg-neutral-800 mx-1" />
          <button
            id="canvas-reset-view"
            onClick={handleReset}
            title="Ajustar vista original"
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reajustar</span>
          </button>
        </div>
      </div>

      {/* Interactive Obsidian Canvas Viewport */}
      <div
        data-canvas-bg="true"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative h-[640px] w-full select-none overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl ${
          isPanning ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(circle at 1.5px 1.5px, #334155 1.5px, transparent 0)',
          backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      >
        {/* Helper Badge */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none rounded-lg bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 text-xs text-neutral-400 backdrop-blur-md flex items-center gap-2">
          <Move className="h-3.5 w-3.5 text-purple-400" />
          <span>Arrastra el fondo para navegar • Clic en nodos para enfocar</span>
        </div>

        {/* Canvas World Transform Container */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '2000px',
            height: '1400px',
          }}
        >
          {/* Group Frame Node */}
          {groupNode && (
            <div
              data-canvas-bg="true"
              style={{
                position: 'absolute',
                left: `${groupNode.x}px`,
                top: `${groupNode.y}px`,
                width: `${groupNode.width}px`,
                height: `${groupNode.height}px`,
              }}
              className="rounded-3xl border-2 border-dashed border-neutral-700/60 bg-neutral-900/20 pointer-events-auto p-4 transition-colors"
            >
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {groupNode.label}
              </div>
            </div>
          )}

          {/* SVG Connection Edges Layer */}
          <svg
            className="absolute inset-0 pointer-events-none z-10"
            style={{ width: '2000px', height: '1400px' }}
          >
            <defs>
              <marker
                id="arrowhead-blue"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
              </marker>
              <marker
                id="arrowhead-purple"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
              </marker>
              <marker
                id="arrowhead-emerald"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
              </marker>
              <marker
                id="arrowhead-amber"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
              </marker>
              <marker
                id="arrowhead-cyan"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#06b6d4" />
              </marker>
            </defs>

            {CANVAS_EDGES.map((edge) => {
              const from = CANVAS_NODES.find((n) => n.id === edge.fromNode);
              const to = CANVAS_NODES.find((n) => n.id === edge.toNode);
              if (!from || !to) return null;

              // Calculate connection points based on specified side or defaults
              const isHorizontal = edge.fromSide === 'right' && edge.toSide === 'left';
              let startX = from.x + from.width / 2;
              let startY = from.y + from.height;
              let endX = to.x + to.width / 2;
              let endY = to.y;

              if (isHorizontal) {
                startX = from.x + from.width;
                startY = from.y + from.height / 2;
                endX = to.x;
                endY = to.y + to.height / 2;
              }

              const midX = (startX + endX) / 2;
              const midY = (startY + endY) / 2;
              const pathD = isHorizontal
                ? `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX - 6} ${endY}`
                : `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY - 6}`;

              const markerId =
                edge.color === '#3b82f6'
                  ? 'arrowhead-blue'
                  : edge.color === '#8b5cf6'
                  ? 'arrowhead-purple'
                  : edge.color === '#10b981'
                  ? 'arrowhead-emerald'
                  : edge.color === '#06b6d4'
                  ? 'arrowhead-cyan'
                  : 'arrowhead-amber';

              return (
                <g key={edge.id}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={edge.color || '#64748b'}
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    markerEnd={`url(#${markerId})`}
                  />
                  {edge.label && (
                    <text
                      x={midX}
                      y={isHorizontal ? midY - 6 : midY - 8}
                      fill="#94a3b8"
                      fontSize="11"
                      textAnchor="middle"
                      className="font-mono bg-neutral-900"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Text & Image Cards / Nodes */}
          {textNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <div
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNodeId(node.id);
                }}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.width}px`,
                  minHeight: `${node.height}px`,
                }}
                className={`z-20 cursor-pointer rounded-2xl border bg-neutral-900/95 p-4 sm:p-5 shadow-xl backdrop-blur-md transition-all duration-150 ${
                  isSelected
                    ? 'ring-2 ring-cyan-400 border-cyan-400 shadow-cyan-500/20'
                    : 'border-neutral-700/70 hover:border-neutral-500'
                }`}
              >
                {/* Obsidian Node Color Top Strip */}
                <div
                  className="absolute top-0 left-4 right-4 h-1 rounded-b-full"
                  style={{ backgroundColor: node.color || '#6366f1' }}
                />

                {node.type === 'file' && node.file ? (
                  <div className="flex flex-col h-full">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-medium text-cyan-400 truncate">
                        {node.label || 'Imagen Adjunta'}
                      </span>
                      <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-mono text-cyan-300">
                        Obsidian Asset
                      </span>
                    </div>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsImageExpanded(true);
                      }}
                      className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-2 flex items-center justify-center hover:border-cyan-500/50 transition-colors"
                    >
                      <img
                        src={node.file}
                        alt={node.alt || 'Asset'}
                        className="max-h-[120px] w-auto object-contain rounded transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded">
                        <div className="rounded-lg bg-neutral-900/90 px-2 py-1 text-[10px] text-white flex items-center gap-1 border border-neutral-700">
                          <Maximize2 className="h-3 w-3 text-cyan-400" />
                          <span>Ampliar</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-2 text-[10px] text-neutral-400 text-center font-mono truncate">
                      Pasted image 20260918111734.png
                    </p>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-xs leading-relaxed text-neutral-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {node.text || ''}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Canvas Image Expanded Lightbox */}
      {isImageExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setIsImageExpanded(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-h-[90vh] w-full max-w-4xl rounded-2xl border border-neutral-700 bg-neutral-900 p-4 sm:p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Diagrama del Cubo de McCumber (Obsidian Canvas Asset)
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-400">
                    Pasted image 20260918111734.png
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
                  onClick={() => setIsImageExpanded(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-auto py-4 flex items-center justify-center bg-neutral-950 rounded-xl my-4 border border-neutral-800 p-4">
              <img
                src="/assets/mccumber-cube.png"
                alt="Diagrama Original del Cubo de McCumber"
                className="max-h-[60vh] w-auto max-w-full rounded object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setIsImageExpanded(false)}
                className="rounded-lg bg-neutral-800 hover:bg-neutral-700 px-4 py-2 text-xs font-medium text-neutral-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
