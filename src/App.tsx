import React from 'react';
import { DigitalBlackboard } from './components/DigitalBlackboard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Header Sobrio estilo Clase Magistral */}
      <header className="border-b border-slate-800/80 bg-[#090e1a]/80 backdrop-blur-md py-4 px-4 sm:px-8 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-serif font-black text-lg shadow-md">
              ½
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Fundamentos de Fracciones</span>
                <span className="text-[10px] font-mono text-slate-400 font-normal bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Pizarra Activa
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Comprensión estructural, conservación de valor y mecánica de operaciones
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-amber-400/90 hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Sin memorizar fórmulas ciegas</span>
          </div>
        </div>
      </header>

      {/* Contenido Central: La Pizarra Digital */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <DigitalBlackboard />
      </main>

      {/* Pie de página sutil */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-800/80 bg-[#090e1a]/40 font-mono">
        Matemáticas Fundamentales • Notación exacta y control mecánico directo
      </footer>
    </div>
  );
}

