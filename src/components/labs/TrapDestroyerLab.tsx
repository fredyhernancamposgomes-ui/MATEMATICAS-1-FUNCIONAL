import React, { useState } from 'react';
import { LearningMode } from '../../types';
import { Check, X } from 'lucide-react';

interface TrapDestroyerLabProps {
  mode: LearningMode;
}

const TRAPS = [
  {
    id: 'apples_oranges',
    title: '2x + 3 = 5x',
    expression: '2x + 3',
    mistake: '5x',
    correct: '2x + 3',
    testValue: 10,
    testResult: {
      mistake: '5(10) = 50',
      correct: '2(10) + 3 = 23',
    },
    explanation: 'No puedes sumar cajas con monedas. Son cosas diferentes.',
  },
  {
    id: 'fraction_cancel',
    title: '(3x + 6) / 3 = x + 6',
    expression: '(3x + 6) / 3',
    mistake: 'x + 6',
    correct: 'x + 2',
    testValue: 2,
    testResult: {
      mistake: '2 + 6 = 8',
      correct: '(6 + 6) / 3 = 4',
    },
    explanation: 'El 3 divide a TODO, no solo a la x. Debes dividir cada término.',
  },
  {
    id: 'minus_minus',
    title: '-3 - 2 = +5',
    expression: '-3 - 2',
    mistake: '+5',
    correct: '-5',
    testValue: 0,
    testResult: {
      mistake: 'Imaginario',
      correct: 'Debes 3 + debes 2 = debes 5',
    },
    explanation: '"Menos con menos" solo aplica en multiplicación. En suma, acumulas deudas.',
  },
  {
    id: 'negative_paren',
    title: '-(x - 4) = -x - 4',
    expression: '-(x - 4)',
    mistake: '-x - 4',
    correct: '-x + 4',
    testValue: 6,
    testResult: {
      mistake: '-6 - 4 = -10',
      correct: '-(6 - 4) = -2',
    },
    explanation: 'El menos afecta a TODO lo que está dentro del paréntesis.',
  },
];

export const TrapDestroyerLab: React.FC<TrapDestroyerLabProps> = ({ mode }) => {
  const [selectedTrap, setSelectedTrap] = useState(TRAPS[0]);
  const [testValue, setTestValue] = useState(selectedTrap.testValue);

  const handleSelectTrap = (trap: typeof TRAPS[0]) => {
    setSelectedTrap(trap);
    setTestValue(trap.testValue);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Explicación */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          Detector de Trampas Comunes
        </h2>
        <p className="text-sm text-slate-600">
          Prueba con números reales para ver si una regla funciona. Si no cuadra, es una trampa.
        </p>
      </div>

      {/* Selector de trampas */}
      <div className="grid grid-cols-2 gap-3">
        {TRAPS.map((trap) => (
          <button
            key={trap.id}
            onClick={() => handleSelectTrap(trap)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selectedTrap.id === trap.id
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold mb-1">Trampa:</div>
            <div className="text-sm font-mono font-bold">{trap.title}</div>
          </button>
        ))}
      </div>

      {/* Trampa seleccionada */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4">
          <div className="text-xs font-bold text-slate-500 uppercase mb-1">
            Expresión:
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {selectedTrap.expression}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          
          {/* Selector de valor de prueba */}
          <div>
            <div className="text-xs font-bold text-slate-600 mb-2">
              Probemos con x = 
            </div>
            <div className="flex gap-2">
              {[2, 3, 5, 10].map((val) => (
                <button
                  key={val}
                  onClick={() => setTestValue(val)}
                  className={`px-4 py-2 rounded-lg font-bold text-sm ${
                    testValue === val
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Comparación: Error vs Correcto */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Error */}
            <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <X className="w-5 h-5 text-rose-600" />
                <span className="text-xs font-bold text-rose-800">ERROR COMÚN</span>
              </div>
              <div className="text-lg font-mono font-bold text-rose-900 mb-2">
                = {selectedTrap.mistake}
              </div>
              <div className="text-xs text-rose-800 font-mono bg-white/60 rounded p-2">
                {selectedTrap.testResult.mistake}
              </div>
            </div>

            {/* Correcto */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800">CORRECTO</span>
              </div>
              <div className="text-lg font-mono font-bold text-emerald-900 mb-2">
                = {selectedTrap.correct}
              </div>
              <div className="text-xs text-emerald-800 font-mono bg-white/60 rounded p-2">
                {selectedTrap.testResult.correct}
              </div>
            </div>
          </div>

          {/* Explicación */}
          <div className="bg-slate-900 text-white rounded-xl p-4">
            <div className="text-xs font-bold text-amber-400 uppercase mb-2">
              ¿Por qué es trampa?
            </div>
            <p className="text-sm text-slate-200">
              {selectedTrap.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Regla de oro */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
        <p className="text-sm font-bold text-amber-900">
          💡 Regla de oro: Si una regla funciona para x = 2 pero falla para x = 10, es una trampa.
        </p>
      </div>

    </div>
  );
};
