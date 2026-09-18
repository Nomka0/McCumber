/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { MarkdownViewer } from './components/MarkdownViewer';
import { InteractiveCube3D } from './components/InteractiveCube3D';
import { MatrixView } from './components/MatrixView';
import { Shield, Box, BookOpen, LayoutGrid } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('doc');

  return (
    <div className="min-h-screen dot-grid-bg text-neutral-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content View Container */}
      <div className="flex-1">
        {activeTab === 'doc' && (
          <MarkdownViewer
            onGoToCube={() => setActiveTab('cube')}
          />
        )}

        {activeTab === 'cube' && <InteractiveCube3D />}

        {activeTab === 'matrix' && <MatrixView />}
      </div>

      {/* Page Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-900/90 py-6 text-xs text-neutral-400">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-neutral-300">Cubo de McCumber</span>
            <span className="text-neutral-500">•</span>
            <span>John McCumber (1991)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <button
              onClick={() => setActiveTab('doc')}
              className="hover:text-white transition-colors"
            >
              Documento
            </button>
            <button
              onClick={() => setActiveTab('cube')}
              className="text-cyan-300 font-bold hover:text-white transition-colors flex items-center gap-1"
            >
              <Box className="h-3.5 w-3.5" />
              <span>Explorar Cubo 3D</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className="hover:text-white transition-colors"
            >
              Matriz 27 Intersecciones
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="text-neutral-500 hidden md:inline">Seguridad de la Información</span>
            <span className="text-neutral-600 hidden md:inline">•</span>
            <span className="text-neutral-400">Aportado por</span>
            <span className="font-bold text-cyan-400 border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5">Nomka0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

