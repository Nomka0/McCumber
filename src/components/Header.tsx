import React from 'react';
import { BookOpen, Box, LayoutGrid, Network, Share2, Download, Check, Sparkles } from 'lucide-react';
import { RAW_MARKDOWN_CONTENT } from '../data/mccumberContent';

export type ActiveTab = 'doc' | 'cube' | 'matrix';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenRawMd?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadMd = () => {
    const blob = new Blob([RAW_MARKDOWN_CONTENT], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Cubo_de_McCumber.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/20 border border-cyan-400/40">
            <Box className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white sm:text-lg">
                Cubo de McCumber
              </h1>
              <span className="inline-flex items-center bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
                1991 • Ciberseguridad
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Marco de 3 dimensiones y 27 facetas de seguridad de la información
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex items-center gap-2 bg-neutral-950/80 p-1.5 border border-neutral-800" aria-label="Tabs">
          <button
            id="tab-doc-btn"
            onClick={() => setActiveTab('doc')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all border ${
              activeTab === 'doc'
                ? 'bg-neutral-800 text-white border-neutral-600 shadow-inner'
                : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-blue-400" />
            <span>Documento</span>
          </button>

          {/* EYE-CATCHING 3D CUBE CTA TAB */}
          <button
            id="tab-cube-btn"
            onClick={() => setActiveTab('cube')}
            className={`relative group flex items-center gap-2.5 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'cube'
                ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                : 'bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-indigo-950/80 text-cyan-200 border-cyan-500/50 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-cyan-400"></span>
            </span>
            <Box className="h-4 w-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
            <span className="font-extrabold text-white">Explorar Cubo 3D</span>
            <span className="bg-cyan-400/20 text-cyan-200 border border-cyan-400/40 px-1.5 py-0.5 text-[10px] font-mono font-bold tracking-normal">
              INTERACTIVO
            </span>
          </button>

          <button
            id="tab-matrix-btn"
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all border ${
              activeTab === 'matrix'
                ? 'bg-neutral-800 text-white border-neutral-600 shadow-inner'
                : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Matriz 27</span>
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            id="download-md-btn"
            onClick={handleDownloadMd}
            title="Descargar archivo Cubo_de_McCumber.md"
            className="flex items-center gap-1.5 border border-neutral-700 bg-neutral-800/80 px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Descargar</span> .md
          </button>

          <button
            id="share-link-btn"
            onClick={handleCopyShare}
            className="flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 shadow-sm shadow-blue-500/20 transition-all active:scale-95 border border-blue-400/50"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-200" />
                <span>¡Enlace copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Compartir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
