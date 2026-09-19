import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export interface PanItem {
  id: string;
  type: 'box' | 'weight' | 'negative_weight';
  value: number;
  label: string;
  color?: string;
}

interface BalanceScaleProps {
  leftItems: PanItem[];
  rightItems: PanItem[];
  leftWeightValue: number;
  rightWeightValue: number;
  variableValue?: number;
  leftLabel?: string;
  rightLabel?: string;
  title?: string;
}

export const BalanceScale: React.FC<BalanceScaleProps> = ({
  leftItems,
  rightItems,
  leftWeightValue,
  rightWeightValue,
  leftLabel = 'Plato Izquierdo',
  rightLabel = 'Plato Derecho',
  title,
}) => {
  const diff = leftWeightValue - rightWeightValue;
  const isBalanced = Math.abs(diff) < 0.001;
  
  let tiltAngle = 0;
  if (!isBalanced) {
    tiltAngle = diff > 0 ? -9 : 9;
  }

  return (
    <div 
      className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col items-center select-none"
      role="region"
      aria-label="Simulador visual de balanza de equilibrio"
    >
      {/* Header and status indicator */}
      <div className="w-full flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title || 'Balanza de la Igualdad'}
          </span>
          <div className="text-sm font-bold text-slate-900">
            {isBalanced ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> La igualdad se cumple: {leftWeightValue} = {rightWeightValue}
              </span>
            ) : (
              <span className="text-rose-600 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> ¡Desequilibrio! {leftWeightValue} ≠ {rightWeightValue}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${
              isBalanced
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
            }`}
          >
            {isBalanced ? 'ESTADO: EQUILIBRIO PERFECTO' : 'ESTADO: DESIGUALDAD'}
          </span>
        </div>
      </div>

      {/* SVG Physics Visualizer */}
      <div className="w-full max-w-2xl h-64 sm:h-72 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-xl border border-slate-200/60 p-2">
        <svg
          viewBox="0 0 600 240"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="panGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>

          {/* Central Fulcrum Stand */}
          <path
            d="M 300 130 L 270 210 L 330 210 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="2"
          />
          <rect x="250" y="210" width="100" height="12" rx="4" fill="#0f172a" />
          {/* Fulcrum Pivot Pin */}
          <circle cx="300" cy="130" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />

          {/* Tilting Beam Group */}
          <g
            style={{
              transformOrigin: '300px 130px',
              transform: `rotate(${tiltAngle}deg)`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Main Bar */}
            <rect
              x="80"
              y="126"
              width="440"
              height="8"
              rx="4"
              fill="url(#beamGradient)"
              stroke="#1e293b"
              strokeWidth="1"
            />
            {/* Center pointer needle */}
            <line x1="300" y1="130" x2="300" y2="80" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            
            {/* Left hanger pivot */}
            <circle cx="120" cy="130" r="5" fill="#f59e0b" />
            {/* Right hanger pivot */}
            <circle cx="480" cy="130" r="5" fill="#f59e0b" />

            {/* Left strings */}
            <line x1="120" y1="130" x2="70" y2="190" stroke="#94a3b8" strokeWidth="2" />
            <line x1="120" y1="130" x2="170" y2="190" stroke="#94a3b8" strokeWidth="2" />
            {/* Left Pan Tray */}
            <ellipse cx="120" cy="192" rx="60" ry="12" fill="url(#panGradient)" stroke="#64748b" strokeWidth="2" />

            {/* Right strings */}
            <line x1="480" y1="130" x2="430" y2="190" stroke="#94a3b8" strokeWidth="2" />
            <line x1="480" y1="130" x2="530" y2="190" stroke="#94a3b8" strokeWidth="2" />
            {/* Right Pan Tray */}
            <ellipse cx="480" cy="192" rx="60" ry="12" fill="url(#panGradient)" stroke="#64748b" strokeWidth="2" />
          </g>
        </svg>

        {/* DOM-rendered responsive items in Pans */}
        <div className="absolute inset-0 pointer-events-none flex justify-between px-6 sm:px-12 items-end pb-8">
          
          {/* Left Pan Container */}
          <div 
            className="w-40 sm:w-48 min-h-[90px] flex flex-col items-center justify-end pb-2"
            style={{
              transform: `translateY(${tiltAngle > 0 ? -12 : tiltAngle < 0 ? 14 : 0}px)`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[170px] mb-1">
              {leftItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-center font-bold text-xs rounded-md shadow-xs transition-all ${
                    item.type === 'box'
                      ? 'w-9 h-9 bg-amber-100 text-amber-900 border-2 border-amber-500 shadow-amber-200'
                      : item.type === 'negative_weight'
                      ? 'w-7 h-7 bg-rose-100 text-rose-800 border-2 border-rose-400'
                      : 'w-7 h-7 bg-sky-100 text-sky-800 border-2 border-sky-400'
                  }`}
                  title={item.label}
                >
                  {item.label}
                </div>
              ))}
              {leftItems.length === 0 && (
                <span className="text-xs text-slate-400 italic">Plato vacío (0)</span>
              )}
            </div>
            <div className="bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full border border-slate-200 text-[11px] font-bold text-slate-800 shadow-2xs">
              {leftLabel}: {leftWeightValue}
            </div>
          </div>

          {/* Right Pan Container */}
          <div 
            className="w-40 sm:w-48 min-h-[90px] flex flex-col items-center justify-end pb-2"
            style={{
              transform: `translateY(${tiltAngle < 0 ? -12 : tiltAngle > 0 ? 14 : 0}px)`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[170px] mb-1">
              {rightItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-center font-bold text-xs rounded-md shadow-xs transition-all ${
                    item.type === 'box'
                      ? 'w-9 h-9 bg-amber-100 text-amber-900 border-2 border-amber-500 shadow-amber-200'
                      : item.type === 'negative_weight'
                      ? 'w-7 h-7 bg-rose-100 text-rose-800 border-2 border-rose-400'
                      : 'w-7 h-7 bg-sky-100 text-sky-800 border-2 border-sky-400'
                  }`}
                  title={item.label}
                >
                  {item.label}
                </div>
              ))}
              {rightItems.length === 0 && (
                <span className="text-xs text-slate-400 italic">Plato vacío (0)</span>
              )}
            </div>
            <div className="bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full border border-slate-200 text-[11px] font-bold text-slate-800 shadow-2xs">
              {rightLabel}: {rightWeightValue}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
