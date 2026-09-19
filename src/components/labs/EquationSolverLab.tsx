import React, { useState } from 'react';
import { LearningMode, PresetEquation } from '../../types';
import { ArrowRight, RotateCcw, Shuffle, Check } from 'lucide-react';

interface EquationSolverLabProps {
  mode: LearningMode;
}

const PRESET_EQUATIONS: PresetEquation[] = [
  {
    id: 'easy_1',
    title: '2x + 4 = 10',
    difficulty: 'básico',
    initialEquation: '2x + 4 = 10',
    targetVariable: 'x',
    leftCoeff: 2,
    leftConst: 4,
    rightConst: 10,
    explanation: 'Ecuación simple para empezar.',
  },
  {
    id: 'easy_2',
    title: '3x + 2 = 14',
    difficulty: 'básico',
    initialEquation: '3x + 2 = 14',
    targetVariable: 'x',
    leftCoeff: 3,
    leftConst: 2,
    rightConst: 14,
    explanation: 'Otro ejemplo básico.',
  },
  {
    id: 'medium_1',
    title: '3x + 2 = 3',
    difficulty: 'intermedio',
    initialEquation: '3x + 2 = 3',
    targetVariable: 'x',
    leftCoeff: 3,
    leftConst: 2,
    rightConst: 3,
    explanation: 'El resultado será una fracción.',
  },
  {
    id: 'medium_2',
    title: '2x - 3 = 7',
    difficulty: 'intermedio',
    initialEquation: '2x - 3 = 7',
    targetVariable: 'x',
    leftCoeff: 2,
    leftConst: -3,
    rightConst: 7,
    explanation: 'Con resta en el lado izquierdo.',
  },
  {
    id: 'hard_1',
    title: '4x + 6 = 26',
    difficulty: 'desafío',
    initialEquation: '4x + 6 = 26',
    targetVariable: 'x',
    leftCoeff: 4,
    leftConst: 6,
    rightConst: 26,
    explanation: 'Cuatro cajas, más complejo.',
  },
];

const generateRandomEquation = (): PresetEquation => {
  const leftCoeff = Math.floor(Math.random() * 4) + 2;
  const leftConst = Math.floor(Math.random() * 11) - 5;
  const rightConst = Math.floor(Math.random() * 20) + 5;
  
  const constStr = leftConst >= 0 ? `+ ${leftConst}` : `- ${Math.abs(leftConst)}`;
  
  return {
    id: `random-${Date.now()}`,
    title: `${leftCoeff}x ${constStr} = ${rightConst}`,
    difficulty: 'desafío',
    initialEquation: `${leftCoeff}x ${constStr} = ${rightConst}`,
    targetVariable: 'x',
    leftCoeff,
    leftConst,
    rightConst,
    explanation: 'Ecuación generada automáticamente.',
  };
};

export const EquationSolverLab: React.FC<EquationSolverLabProps> = ({ mode }) => {
  const [selectedEqIndex, setSelectedEqIndex] = useState<number>(0);
  const [customEquation, setCustomEquation] = useState<PresetEquation | null>(null);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const currentEq = customEquation || PRESET_EQUATIONS[selectedEqIndex];
  const targetX = (currentEq.rightConst - currentEq.leftConst) / currentEq.leftCoeff;
  const isTargetInteger = Number.isInteger(targetX);
  const formattedX = isTargetInteger ? `${targetX}` : targetX.toFixed(2);

  const handleNextStep = () => {
    if (stepIndex < 4) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
  };

  const handleGenerateRandom = () => {
    const newEq = generateRandomEquation();
    setCustomEquation(newEq);
    setStepIndex(0);
  };

  const handleSelectPreset = (idx: number) => {
    setSelectedEqIndex(idx);
    setCustomEquation(null);
    setStepIndex(0);
  };

  // Construir la visualización paso a paso
  const getStepContent = () => {
    const steps = [];
    
    // Paso 0: Ecuación original
    steps.push({
      equation: currentEq.initialEquation,
      explanation: `Esta es la ecuación. Queremos encontrar el valor de x.`,
      action: null,
    });

    // Paso 1: Aplicar operación inversa
    const op = currentEq.leftConst >= 0 ? `- ${currentEq.leftConst}` : `+ ${Math.abs(currentEq.leftConst)}`;
    steps.push({
      equation: `${currentEq.leftCoeff}x ${currentEq.leftConst >= 0 ? `+ ${currentEq.leftConst}` : `- ${Math.abs(currentEq.leftConst)}`} ${op} = ${currentEq.rightConst} ${op}`,
      explanation: `Aplicamos ${op} a AMBOS lados para eliminar el ${currentEq.leftConst >= 0 ? `+${currentEq.leftConst}` : currentEq.leftConst}.`,
      action: `Aplicar ${op} a ambos lados`,
    });

    // Paso 2: Simplificar
    const simplified = currentEq.rightConst - currentEq.leftConst;
    steps.push({
      equation: `${currentEq.leftCoeff}x = ${simplified}`,
      explanation: `Los números se cancelan a la izquierda. Nos queda ${currentEq.leftCoeff}x = ${simplified}.`,
      action: `Simplificar`,
    });

    // Paso 3: Dividir
    steps.push({
      equation: `${currentEq.leftCoeff}x ÷ ${currentEq.leftCoeff} = ${simplified} ÷ ${currentEq.leftCoeff}`,
      explanation: `Dividimos ambos lados entre ${currentEq.leftCoeff} para dejar x sola.`,
      action: `Dividir entre ${currentEq.leftCoeff}`,
    });

    // Paso 4: Resultado
    steps.push({
      equation: `x = ${formattedX}`,
      explanation: `¡Listo! El valor de x es ${formattedX}.`,
      action: `Resultado final`,
    });

    return steps[stepIndex];
  };

  const currentStep = getStepContent();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Selector de ecuaciones */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-700">Elige una ecuación:</h3>
          <button
            onClick={handleGenerateRandom}
            className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-slate-800 flex items-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Aleatoria
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_EQUATIONS.map((eq, idx) => (
            <button
              key={eq.id}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                selectedEqIndex === idx && !customEquation
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {eq.initialEquation}
            </button>
          ))}
          {customEquation && (
            <button className="px-3 py-1.5 rounded-lg text-sm font-bold bg-amber-500 text-slate-950">
              {customEquation.initialEquation}
            </button>
          )}
        </div>
      </div>

      {/* Simulador principal */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        
        {/* Indicador de progreso */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              Paso {stepIndex + 1} de 5
            </span>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setStepIndex(s)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    s === stepIndex ? 'bg-amber-500 w-6' : s < stepIndex ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contenido del paso */}
        <div className="p-8 space-y-6">
          
          {/* Ecuación grande */}
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight">
              {currentStep.equation}
            </div>
          </div>

          {/* Explicación */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-700 text-center font-medium">
              {currentStep.explanation}
            </p>
          </div>

          {/* Representación visual simple */}
          {stepIndex === 0 && (
            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <div className="text-6xl mb-2">📦</div>
                <div className="text-xs font-bold text-slate-600">
                  {currentEq.leftCoeff} cajas + {currentEq.leftConst >= 0 ? currentEq.leftConst : `(${currentEq.leftConst})`} monedas
                </div>
              </div>
              <div className="text-4xl font-black text-slate-400">=</div>
              <div className="text-center">
                <div className="text-6xl mb-2">🔵</div>
                <div className="text-xs font-bold text-slate-600">
                  {currentEq.rightConst} monedas
                </div>
              </div>
            </div>
          )}

          {stepIndex === 1 && (
            <div className="flex items-center justify-center gap-4 py-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {currentEq.leftCoeff}x {currentEq.leftConst >= 0 ? `+ ${currentEq.leftConst}` : `- ${Math.abs(currentEq.leftConst)}`}
                </div>
                <div className="text-lg font-mono font-bold text-rose-600 animate-pulse">
                  {currentEq.leftConst >= 0 ? `- ${currentEq.leftConst}` : `+ ${Math.abs(currentEq.leftConst)}`}
                </div>
              </div>
              <div className="text-4xl font-black text-slate-400">=</div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {currentEq.rightConst}
                </div>
                <div className="text-lg font-mono font-bold text-rose-600 animate-pulse">
                  {currentEq.leftConst >= 0 ? `- ${currentEq.leftConst}` : `+ ${Math.abs(currentEq.leftConst)}`}
                </div>
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <div className="text-6xl mb-2">📦</div>
                <div className="text-xs font-bold text-slate-600">
                  {currentEq.leftCoeff} cajas
                </div>
              </div>
              <div className="text-4xl font-black text-slate-400">=</div>
              <div className="text-center">
                <div className="text-6xl mb-2">🔵</div>
                <div className="text-xs font-bold text-slate-600">
                  {currentEq.rightConst - currentEq.leftConst} monedas
                </div>
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <div className="text-6xl mb-2">📦</div>
                <div className="text-xs font-bold text-slate-600">
                  {currentEq.leftCoeff} cajas ÷ {currentEq.leftCoeff}
                </div>
              </div>
              <div className="text-4xl font-black text-slate-400">=</div>
              <div className="text-center">
                <div className="text-6xl mb-2">🔵</div>
                <div className="text-xs font-bold text-slate-600">
                  {currentEq.rightConst - currentEq.leftConst} ÷ {currentEq.leftCoeff}
                </div>
              </div>
            </div>
          )}

          {stepIndex === 4 && (
            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <div className="text-6xl mb-2">📦</div>
                <div className="text-xs font-bold text-emerald-600">
                  1 caja = {formattedX} monedas
                </div>
              </div>
              <div className="text-4xl font-black text-emerald-500">✓</div>
              <div className="text-center">
                <div className="text-6xl mb-2">🔵</div>
                <div className="text-xs font-bold text-emerald-600">
                  {formattedX} monedas
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Controles */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-sm text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>

          {stepIndex < 4 ? (
            <button
              onClick={handleNextStep}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-5 h-5" />
              <span>¡Resuelto!</span>
            </div>
          )}
        </div>

      </div>

      {/* Comprobación final */}
      {stepIndex === 4 && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-emerald-900 mb-3">
            Comprobación: ¿Es correcto?
          </h3>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Sustituimos x = {formattedX}:</span>
              <span className="font-bold">{currentEq.leftCoeff}({formattedX}) {currentEq.leftConst >= 0 ? `+ ${currentEq.leftConst}` : `- ${Math.abs(currentEq.leftConst)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Calculamos:</span>
              <span className="font-bold">{(currentEq.leftCoeff * targetX).toFixed(isTargetInteger ? 0 : 2)} {currentEq.leftConst >= 0 ? `+ ${currentEq.leftConst}` : `- ${Math.abs(currentEq.leftConst)}`}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold border-t border-emerald-200 pt-2">
              <span>Resultado:</span>
              <span>{currentEq.rightConst} = {currentEq.rightConst} ✓</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
