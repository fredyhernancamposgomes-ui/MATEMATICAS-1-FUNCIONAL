import React from 'react';
import { DigitalBlackboard } from './components/DigitalBlackboard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#15271d] text-[#e8eee9] flex flex-col font-sans selection:bg-[#345942] selection:text-[#fef08a]">
      {/* Marco superior sereno de la pizarra escolar verde mate */}
      <header className="border-b border-[#234330] bg-[#112017]/95 backdrop-blur-md py-3.5 px-4 sm:px-8 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#234330] border border-[#3b6b4e]/70 text-[#fde047] flex items-center justify-center font-serif font-black text-lg shadow-inner">
              ½
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-[#f5f7f2] tracking-tight flex items-center gap-2">
                <span>Pizarra de Fracciones</span>
                <span className="text-[10px] font-mono text-[#a3bfae] font-normal bg-[#1a3325] px-2 py-0.5 rounded border border-[#2d563e]">
                  En tiza clara
                </span>
              </h1>
              <p className="text-xs text-[#9eb6a7]">
                Visualiza cómo se cortan, se juntan y encajan los pedazos
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-[#fef08a] hidden sm:flex items-center gap-2 bg-[#1b3426] px-3 py-1.5 rounded-full border border-[#305841]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fde047] animate-pulse" />
            <span>Paso a paso visual y relajado</span>
          </div>
        </div>
      </header>

      {/* Contenido Central: La Pizarra Verde */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8">
        <DigitalBlackboard />
      </main>

      {/* Pie de pizarra sutil */}
      <footer className="py-4 text-center text-xs text-[#82a38e] border-t border-[#1f3a2a] bg-[#112017] font-mono">
        Pizarra de Tiza • Toca, ajusta los números y mira qué pasa sin enredos
      </footer>
    </div>
  );
}

