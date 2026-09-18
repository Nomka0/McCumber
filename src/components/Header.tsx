import React from 'react';
import { BookOpen, Box, LayoutGrid, Share2, Download, Check } from 'lucide-react';
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

  // ponytail: slim single-row header, stripped out verbose subtitles, large badge animations and excessive padding
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-6">
        {/* Brand / Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 shadow-sm border border-cyan-400/40">
            <Box className="h-4 w-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">
              Cubo de McCumber
            </h1>
            <span className="hidden sm:inline-flex items-center bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
              1991
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex items-center gap-1 bg-neutral-950/80 p-1 border border-neutral-800 text-xs" aria-label="Tabs">
          <button
            id="tab-doc-btn"
            onClick={() => setActiveTab('doc')}
            className={`flex items-center gap-1.5 px-2.5 py-1 font-semibold uppercase tracking-wider transition-all border ${
              activeTab === 'doc'
                ? 'bg-neutral-800 text-white border-neutral-600 shadow-inner'
                : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-blue-400" />
            <span>Documento</span>
          </button>

          <button
            id="tab-cube-btn"
            onClick={() => setActiveTab('cube')}
            className={`flex items-center gap-1.5 px-2.5 py-1 font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'cube'
                ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white border-cyan-300 shadow-sm'
                : 'bg-cyan-950/40 text-cyan-200 border-cyan-500/30 hover:border-cyan-400 hover:text-white'
            }`}
          >
            <Box className="h-3.5 w-3.5 text-cyan-300" />
            <span>Cubo 3D</span>
          </button>

          <button
            id="tab-matrix-btn"
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 px-2.5 py-1 font-semibold uppercase tracking-wider transition-all border ${
              activeTab === 'matrix'
                ? 'bg-neutral-800 text-white border-neutral-600 shadow-inner'
                : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Matriz 27</span>
            <span className="sm:hidden">Matriz</span>
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            id="download-md-btn"
            onClick={handleDownloadMd}
            title="Descargar archivo Cubo_de_McCumber.md"
            className="flex items-center gap-1 border border-neutral-700 bg-neutral-800/80 px-2 py-1 text-xs font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-neutral-400" />
            <span className="hidden md:inline">.md</span>
          </button>

          <button
            id="share-link-btn"
            onClick={handleCopyShare}
            className="flex items-center gap-1 bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-500 shadow-sm transition-all active:scale-95 border border-blue-400/50"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-200" />
                <span className="hidden sm:inline">¡Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Compartir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
