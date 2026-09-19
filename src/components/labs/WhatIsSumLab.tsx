import React, { useState } from 'react';
import { LearningMode } from '../../types';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface WhatIsSumLabProps {
  mode: LearningMode;
}

export const WhatIsSumLab: React.FC<WhatIsSumLabProps> = ({ mode }) => {
  const [boxesCount, setBoxesCount] = useState<number>(2);
  const [tokensCount, setTokensCount] = useState<number>(3);
  const [mysteryXValue, setMysteryXValue] = useState<number>(5);
  const [showTrapProof, setShowTrapProof] = useState<boolean>(false);

  const realValue = boxesCount * mysteryXValue + tokensCount;
  const trapValue = (boxesCount + tokensCount) * mysteryXValue;

  const handleReset = () => {
    setBoxesCount(2);
    setTokensCount(3);
    setMysteryXValue(5);
    setShowTrapProof(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Explicación simple */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          ¿Qué significa {boxesCount}x + {tokensCount}?
        </h2>
        <p className="text-sm text-slate-600">
          Tienes <strong>{boxesCount} cajas cerradas</strong> (cada una con un número secreto de monedas) 
          y <strong>{tokensCount} monedas sueltas</strong> que puedes contar.
        </p>
      </div>

      {/* Mesa de objetos */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700">Mesa de Objetos</h3>
          <button
            onClick={handleReset}
            className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar
          </button>
        </div>

        {/* Objetos visuales */}
        <div className="bg-slate-50 rounded-xl p-6 space-y-4">
          
          {/* Cajas */}
          <div>
            <div className="text-xs font-bold text-amber-900 mb-2">
              Cajas ({boxesCount}x):
            </div>
            <div className="flex flex-wrap gap-2 min-h-[56px]">
              {Array.from({ length: boxesCount }).map((_, idx) => (
                <div
                  key={`box-${idx}`}
                  className="w-14 h-14 rounded-xl bg-amber-100 border-2 border-amber-500 flex flex-col items-center justify-center text-amber-950 font-black relative group cursor-pointer hover:bg-amber-200 transition-colors"
                >
                  <span className="text-lg">x</span>
                  <span className="text-[9px] font-medium text-amber-700">caja {idx + 1}</span>
                  <div className="absolute -top-8 hidden group-hover:flex bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    Adentro: {mysteryXValue} monedas
                  </div>
                </div>
              ))}
              {boxesCount === 0 && (
                <span className="text-sm text-slate-400 italic">Sin cajas</span>
              )}
            </div>
          </div>

          {/* Monedas */}
          <div>
            <div className="text-xs font-bold text-sky-900 mb-2">
              Monedas sueltas (+{tokensCount}):
            </div>
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {Array.from({ length: tokensCount }).map((_, idx) => (
                <div
                  key={`token-${idx}`}
                  className="w-9 h-9 rounded-full bg-sky-100 border-2 border-sky-400 text-sky-900 font-bold text-xs flex items-center justify-center"
                >
                  +1
                </div>
              ))}
              {tokensCount === 0 && (
                <span className="text-sm text-slate-400 italic">Sin monedas</span>
              )}
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-950">Cajas</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBoxesCount(Math.max(0, boxesCount - 1))}
                className="w-7 h-7 rounded bg-white border border-amber-300 flex items-center justify-center hover:bg-amber-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-lg font-black text-amber-900 w-6 text-center">{boxesCount}</span>
              <button
                onClick={() => setBoxesCount(Math.min(6, boxesCount + 1))}
                className="w-7 h-7 rounded bg-white border border-amber-300 flex items-center justify-center hover:bg-amber-100"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs font-bold text-sky-950">Monedas</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTokensCount(Math.max(0, tokensCount - 1))}
                className="w-7 h-7 rounded bg-white border border-sky-300 flex items-center justify-center hover:bg-sky-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-lg font-black text-sky-900 w-6 text-center">{tokensCount}</span>
              <button
                onClick={() => setTokensCount(Math.min(10, tokensCount + 1))}
                className="w-7 h-7 rounded bg-white border border-sky-300 flex items-center justify-center hover:bg-sky-100"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Expresión algebraica */}
        <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
          <div className="text-xs text-slate-400 uppercase font-semibold mb-1">
            Se escribe así:
          </div>
          <div className="text-3xl font-black text-amber-400">
            {boxesCount > 0 ? `${boxesCount}x` : ''}
            {boxesCount > 0 && tokensCount > 0 ? ' + ' : ''}
            {tokensCount > 0 ? `${tokensCount}` : ''}
            {boxesCount === 0 && tokensCount === 0 ? '0' : ''}
          </div>
        </div>
      </div>

      {/* Valor secreto de x */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700">
            ¿Cuántas monedas hay en cada caja?
          </h3>
          <span className="text-sm font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-lg border border-amber-200">
            x = {mysteryXValue}
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="15"
          value={mysteryXValue}
          onChange={(e) => setMysteryXValue(parseInt(e.target.value, 10))}
          className="w-full accent-amber-600"
        />

        <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Total en {boxesCount} cajas:</span>
            <span className="font-bold">{boxesCount} × {mysteryXValue} = {boxesCount * mysteryXValue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Monedas sueltas:</span>
            <span className="font-bold">+{tokensCount}</span>
          </div>
          <div className="flex justify-between text-emerald-700 font-bold border-t border-slate-200 pt-2">
            <span>Total real:</span>
            <span>{realValue} monedas</span>
          </div>
        </div>
      </div>

      {/* Demostración de la trampa */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <button
          onClick={() => setShowTrapProof(!showTrapProof)}
          className="w-full text-left"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              ¿Por qué {boxesCount}x + {tokensCount} NO es igual a {boxesCount + tokensCount}x?
            </h3>
            <span className="text-xs text-amber-600 font-bold">
              {showTrapProof ? 'Ocultar' : 'Ver demostración'}
            </span>
          </div>
        </button>

        {showTrapProof && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-slate-700">
              Si alguien dice que {boxesCount}x + {tokensCount} = {boxesCount + tokensCount}x, probemos con x = {mysteryXValue}:
            </p>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2 font-mono text-sm">
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Lo correcto ({boxesCount}x + {tokensCount}):</span>
                <span>{boxesCount}({mysteryXValue}) + {tokensCount} = {realValue}</span>
              </div>
              <div className="flex justify-between text-rose-600 font-bold">
                <span>La confusión ({boxesCount + tokensCount}x):</span>
                <span>{boxesCount + tokensCount}({mysteryXValue}) = {trapValue}</span>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
              <p className="text-xs text-rose-900 font-medium">
                {realValue} ≠ {trapValue}. ¡No son iguales! Por eso las cajas y las monedas no se pueden mezclar.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
