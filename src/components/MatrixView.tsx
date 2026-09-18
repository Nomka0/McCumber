import React, { useState, useMemo } from 'react';
import {
  CUBE_CELLS,
  DIMENSIONS,
  CubeCell,
} from '../data/mccumberContent';
import {
  Search,
  Filter,
  Shield,
  CheckCircle2,
  Clock,
  HardDrive,
  Network,
  Cpu,
  Laptop,
  FileText,
  Users,
  ChevronRight,
  ExternalLink,
  X,
  Copy,
  Check
} from 'lucide-react';

export const MatrixView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ciaFilter, setCiaFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [safeguardFilter, setSafeguardFilter] = useState<string>('all');
  const [selectedCell, setSelectedCell] = useState<CubeCell | null>(null);
  const [copiedCellId, setCopiedCellId] = useState<string | null>(null);

  const filteredCells = useMemo(() => {
    return CUBE_CELLS.filter((cell) => {
      // CIA filter
      if (ciaFilter !== 'all' && cell.ciaId !== ciaFilter) return false;
      // State filter
      if (stateFilter !== 'all' && cell.stateId !== stateFilter) return false;
      // Safeguard filter
      if (safeguardFilter !== 'all' && cell.safeguardId !== safeguardFilter) return false;

      // Text search
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        cell.title.toLowerCase().includes(query) ||
        cell.shortDescription.toLowerCase().includes(query) ||
        cell.objective.toLowerCase().includes(query) ||
        cell.controls.some((c) => c.toLowerCase().includes(query)) ||
        cell.realWorldExample.toLowerCase().includes(query) ||
        cell.standardReference.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, ciaFilter, stateFilter, safeguardFilter]);

  const handleCopyCell = async (cell: CubeCell) => {
    const text = `### ${cell.title}
- Meta CIA: ${cell.ciaId}
- Estado de Datos: ${cell.stateId}
- Salvaguarda: ${cell.safeguardId}
- Objetivo: ${cell.objective}
- Controles:
${cell.controls.map((c) => `  * ${c}`).join('\n')}
- Ejemplo real: ${cell.realWorldExample}
- Referencia: ${cell.standardReference}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedCellId(cell.id);
      setTimeout(() => setCopiedCellId(null), 2000);
    } catch {
      setCopiedCellId(cell.id);
      setTimeout(() => setCopiedCellId(null), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Title & Filter Bar */}
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Matriz Tridimensional Completa
            </span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-white">
            Las 27 Intersecciones de Ciberseguridad de McCumber
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-400">
            Explora, busca y filtra los controles de seguridad correspondientes a cada estado, meta y disciplina.
          </p>
        </div>

        {/* Search and Filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              id="matrix-search-input"
              type="text"
              placeholder="Buscar (ej. cifrado, backup, TLS, phishing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800/90 pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* CIA Select */}
          <div>
            <select
              id="matrix-cia-select"
              value={ciaFilter}
              onChange={(e) => setCiaFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800/90 px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">Todas las Metas (Tríada CIA)</option>
              <option value="confidentiality">🛡️ Confidencialidad</option>
              <option value="integrity">🔒 Integridad</option>
              <option value="availability">⚡ Disponibilidad</option>
            </select>
          </div>

          {/* State Select */}
          <div>
            <select
              id="matrix-state-select"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800/90 px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="all">Todos los Estados de Datos</option>
              <option value="rest">💾 En Reposo (Storage)</option>
              <option value="transit">🌐 En Tránsito (Network)</option>
              <option value="processing">⚡ En Proceso (RAM/CPU)</option>
            </select>
          </div>

          {/* Safeguard Select */}
          <div>
            <select
              id="matrix-safeguard-select"
              value={safeguardFilter}
              onChange={(e) => setSafeguardFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800/90 px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">Todas las Salvaguardas</option>
              <option value="technology">💻 Tecnología</option>
              <option value="policies">📜 Políticas y Prácticas</option>
              <option value="people">👥 Personas (Factor Humano)</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>
            Mostrando <strong>{filteredCells.length}</strong> de 27 intersecciones
          </span>
          {(ciaFilter !== 'all' || stateFilter !== 'all' || safeguardFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setCiaFilter('all');
                setStateFilter('all');
                setSafeguardFilter('all');
                setSearchQuery('');
              }}
              className="text-blue-400 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCells.map((cell) => {
          const isCopied = copiedCellId === cell.id;
          return (
            <div
              key={cell.id}
              onClick={() => setSelectedCell(cell)}
              className="group cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 hover:border-neutral-600 hover:bg-neutral-800/70 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      cell.ciaId === 'confidentiality'
                        ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                        : cell.ciaId === 'integrity'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {cell.ciaId === 'confidentiality'
                      ? 'Confidencialidad'
                      : cell.ciaId === 'integrity'
                      ? 'Integridad'
                      : 'Disponibilidad'}
                  </span>

                  <span className="rounded-md bg-purple-500/15 px-2 py-0.5 text-[10px] font-medium text-purple-300 border border-purple-500/30">
                    {cell.stateId === 'rest'
                      ? 'Reposo'
                      : cell.stateId === 'transit'
                      ? 'Tránsito'
                      : 'Proceso'}
                  </span>

                  <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-neutral-300 border border-neutral-700">
                    {cell.safeguardId === 'technology'
                      ? 'Tecnología'
                      : cell.safeguardId === 'policies'
                      ? 'Políticas'
                      : 'Personas'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {cell.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
                  {cell.shortDescription}
                </p>

                {/* Primary Control Preview */}
                <div className="mt-3 rounded-lg bg-neutral-950/60 p-2.5 text-[11px] text-neutral-300 border border-neutral-800">
                  <div className="text-[10px] font-semibold text-neutral-400 mb-1">
                    Control destacado:
                  </div>
                  <div className="text-neutral-300 text-xs leading-relaxed break-words">
                    {cell.controls[0]}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="font-mono text-neutral-500 text-[10px] truncate max-w-[160px]">
                  {cell.standardReference}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCell(cell);
                    }}
                    title="Copiar celda"
                    className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700"
                  >
                    {isCopied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <span className="text-blue-400 font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Detalles <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal Dialog */}
      {selectedCell && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedCell(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            {/* Close button */}
            <button
              id="modal-close-btn"
              onClick={() => setSelectedCell(null)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-md bg-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
                Meta: {selectedCell.ciaId}
              </span>
              <span className="rounded-md bg-purple-500/20 px-2.5 py-1 text-xs font-bold text-purple-400 border border-purple-500/30">
                Estado: {selectedCell.stateId}
              </span>
              <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                Salvaguarda: {selectedCell.safeguardId}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {selectedCell.title}
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              {selectedCell.shortDescription}
            </p>

            <div className="mt-4 space-y-4 text-xs text-neutral-300">
              {/* Objective */}
              <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800">
                <div className="font-semibold text-neutral-200 mb-1">
                  🎯 Objetivo de Seguridad:
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedCell.objective}
                </p>
              </div>

              {/* Controls */}
              <div>
                <div className="font-semibold text-neutral-200 mb-2">
                  🛠️ Controles y Mecanismos Recomendados:
                </div>
                <ul className="space-y-1.5">
                  {selectedCell.controls.map((ctrl, i) => (
                    <li key={i} className="flex items-start gap-2 bg-neutral-950/40 p-2 rounded-lg border border-neutral-800/80">
                      <ChevronRight className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{ctrl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real World Scenario */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
                <div className="font-semibold text-amber-300 mb-1">
                  🌍 Escenario en la Vida Real:
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedCell.realWorldExample}
                </p>
              </div>

              {/* Standard Ref & Risk */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500 uppercase">Referencia de Estándar</div>
                  <div className="font-mono text-xs text-neutral-300 mt-0.5">
                    {selectedCell.standardReference}
                  </div>
                </div>
                <div className="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500 uppercase">Riesgo Mitigado</div>
                  <div className="text-xs text-neutral-300 mt-0.5">
                    {selectedCell.riskMitigated}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-neutral-800">
              <button
                onClick={() => handleCopyCell(selectedCell)}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-700"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copiar Ficha</span>
              </button>
              <button
                onClick={() => setSelectedCell(null)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
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
