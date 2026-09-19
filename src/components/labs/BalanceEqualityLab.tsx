import React, { useState } from 'react';
import { LearningMode } from '../../types';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface BalanceEqualityLabProps {
  mode: LearningMode;
}

export const BalanceEqualityLab: React.FC<BalanceEqualityLabProps> = ({ mode }) => {
  const [leftWeight, setLeftWeight] = useState<number>(6);
  const [rightWeight, setRightWeight] = useState<number>(6);
  const [actionHistory, setActionHistory] = useState<string[]>([
    'Inicio: 6 = 6 (equilibrio)',
  ]);

  const isBalanced = leftWeight === rightWeight;
  const diff = leftWeight - rightWeight;

  const handleApplyBoth = (delta: number) => {
    const newL = Math.max(0, leftWeight + delta);
    const newR = Math.max(0, rightWeight + delta);
    setLeftWeight(newL);
    setRightWeight(newR);
    setActionHistory((prev) => [
      `${delta > 0 ? `+${delta}` : delta} a ambos lados → ${newL} = ${newR} ✓`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleApplyLeftOnly = (delta: number) => {
    const newL = Math.max(0, leftWeight + delta);
    setLeftWeight(newL);
    setActionHistory((prev) => [
      `⚠️ Solo izquierda: ${newL} ≠ ${rightWeight}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleApplyRightOnly = (delta: number) => {
    const newR = Math.max(0, rightWeight + delta);
    setRightWeight(newR);
    setActionHistory((prev) => [
      `⚠️ Solo derecha: ${leftWeight} ≠ ${newR}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleReset = () => {
    setLeftWeight(6);
    setRightWeight(6);
    setActionHistory(['Reiniciado: 6 = 6']);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Explicación */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          El signo "=" significa equilibrio
        </h2>
        <p className="text-sm text-slate-600">
          Si haces algo a un lado, debes hacer lo mismo al otro lado para mantener el equilibrio.
        </p>
      </div>

      {/* Balanza visual simple */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        
        {/* Indicador de equilibrio */}
        <div className="text-center mb-6">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
            isBalanced 
              ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300' 
              : 'bg-rose-100 text-rose-700 border-2 border-rose-300'
          }`}>
            {isBalanced ? '✓ EQUILIBRIO' : '⚠ DESEQUILIBRIO'}
          </div>
        </div>

        {/* Visualización de la balanza */}
        <div className="flex items-center justify-center gap-8 mb-6">
          
          {/* Plato izquierdo */}
          <div className="text-center">
            <div className="text-xs font-bold text-slate-500 mb-2">IZQUIERDA</div>
            <div 
              className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-4xl font-black transition-all"
              style={{
                borderColor: isBalanced ? '#10b981' : diff > 0 ? '#f59e0b' : '#ef4444',
                backgroundColor: isBalanced ? '#ecfdf5' : diff > 0 ? '#fffbeb' : '#fef2f2',
                transform: `translateY(${diff > 0 ? '8px' : diff < 0 ? '-8px' : '0'})`,
                transition: 'all 0.3s ease'
              }}
            >
              {leftWeight}
            </div>
          </div>

          {/* Signo igual */}
          <div className="text-5xl font-black text-slate-400">=</div>

          {/* Plato derecho */}
          <div className="text-center">
            <div className="text-xs font-bold text-slate-500 mb-2">DERECHA</div>
            <div 
              className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-4xl font-black transition-all"
              style={{
                borderColor: isBalanced ? '#10b981' : diff < 0 ? '#f59e0b' : '#ef4444',
                backgroundColor: isBalanced ? '#ecfdf5' : diff < 0 ? '#fffbeb' : '#fef2f2',
                transform: `translateY(${diff < 0 ? '8px' : diff > 0 ? '-8px' : '0'})`,
                transition: 'all 0.3s ease'
              }}
            >
              {rightWeight}
            </div>
          </div>
        </div>

        {/* Estado actual */}
        <div className="text-center text-2xl font-black text-slate-900 mb-6">
          {leftWeight} = {rightWeight} {isBalanced ? '✓' : '✗'}
        </div>

        {/* Controles */}
        <div className="space-y-4">
          
          {/* Acciones simétricas */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
            <div className="text-xs font-bold text-emerald-800 mb-3">
              ✓ ACCIONES SIMÉTRICAS (a ambos lados)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleApplyBoth(1)}
                className="py-2 px-3 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                +1 a ambos
              </button>
              <button
                onClick={() => handleApplyBoth(-1)}
                disabled={leftWeight <= 0 || rightWeight <= 0}
                className="py-2 px-3 bg-white hover:bg-emerald-100 disabled:opacity-40 text-emerald-900 border border-emerald-300 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5"
              >
                <Minus className="w-4 h-4" />
                -1 a ambos
              </button>
              <button
                onClick={() => handleApplyBoth(3)}
                className="py-2 px-3 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                +3 a ambos
              </button>
              <button
                onClick={() => handleApplyBoth(-3)}
                disabled={leftWeight < 3 || rightWeight < 3}
                className="py-2 px-3 bg-white hover:bg-emerald-100 disabled:opacity-40 text-emerald-900 border border-emerald-300 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5"
              >
                <Minus className="w-4 h-4" />
                -3 a ambos
              </button>
            </div>
          </div>

          {/* Acciones asimétricas */}
          <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4">
            <div className="text-xs font-bold text-rose-800 mb-3">
              ⚠ ACCIONES ASIMÉTRICAS (solo un lado)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleApplyLeftOnly(2)}
                className="py-2 px-3 bg-white hover:bg-rose-100 text-rose-900 border border-rose-300 rounded-lg text-sm font-bold"
              >
                +2 solo izquierda
              </button>
              <button
                onClick={() => handleApplyRightOnly(2)}
                className="py-2 px-3 bg-white hover:bg-rose-100 text-rose-900 border border-rose-300 rounded-lg text-sm font-bold"
              >
                +2 solo derecha
              </button>
              <button
                onClick={() => handleApplyLeftOnly(-2)}
                disabled={leftWeight < 2}
                className="py-2 px-3 bg-white hover:bg-rose-100 disabled:opacity-40 text-rose-900 border border-rose-300 rounded-lg text-sm font-bold"
              >
                -2 solo izquierda
              </button>
              <button
                onClick={() => handleApplyRightOnly(-2)}
                disabled={rightWeight < 2}
                className="py-2 px-3 bg-white hover:bg-rose-100 disabled:opacity-40 text-rose-900 border border-rose-300 rounded-lg text-sm font-bold"
              >
                -2 solo derecha
              </button>
            </div>
          </div>

          {/* Botón reiniciar */}
          <button
            onClick={handleReset}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            Equilibrar (6 = 6)
          </button>
        </div>
      </div>

      {/* Historial */}
      <div className="bg-slate-900 text-white rounded-2xl p-4">
        <div className="text-xs font-bold text-slate-400 uppercase mb-2">
          Historial de acciones
        </div>
        <div className="space-y-1 text-xs font-mono">
          {actionHistory.map((item, idx) => (
            <div key={idx} className={idx === 0 ? 'text-amber-300 font-bold' : 'text-slate-400'}>
              {idx === 0 ? '→' : '•'} {item}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
