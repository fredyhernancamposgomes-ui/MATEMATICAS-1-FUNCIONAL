import React, { useState } from 'react';
import { MathFraction } from './MathFraction';
import { 
  ArrowRight, 
  RotateCcw, 
  Check, 
  Sliders, 
  HelpCircle,
  Plus, 
  Minus, 
  X as MultiplyIcon, 
  Divide,
  Cpu,
  BookOpen,
  Layers,
  Sparkles
} from 'lucide-react';

export const MechanicalSandbox: React.FC = () => {
  // Fracción 1: a/b
  const [numA, setNumA] = useState<number>(1);
  const [denA, setDenA] = useState<number>(3);

  // Fracción 2: c/d
  const [numB, setNumB] = useState<number>(1);
  const [denB, setDenB] = useState<number>(4);

  // Operación seleccionada
  const [operation, setOperation] = useState<'+' | '-' | '×' | '÷'>('+');

  // Multiplicadores manuales aplicados por el usuario para igualar bases
  const [userFactorA, setUserFactorA] = useState<number>(1);
  const [userFactorB, setUserFactorB] = useState<number>(1);

  // Valores transformados
  const transNumA = numA * userFactorA;
  const transDenA = denA * userFactorA;
  const transNumB = numB * userFactorB;
  const transDenB = denB * userFactorB;

  const basesAreEqual = transDenA === transDenB;

  // Cálculo automático del objetivo ideal
  // Para 1/3 y 1/4 el producto de denominadores es 12
  const targetCommonDen = denA * denB;
  const idealFactorA = denB;
  const idealFactorB = denA;

  // Auto-ajustar factores estratégicos con un clic
  const handleAutoEqualize = () => {
    setUserFactorA(idealFactorA);
    setUserFactorB(idealFactorB);
  };

  const handleResetFactors = () => {
    setUserFactorA(1);
    setUserFactorB(1);
  };

  // Cálculo de resultados
  const renderCalculation = () => {
    if (operation === '+') {
      if (!basesAreEqual) {
        return (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Paso previo requerido: Los números de abajo no son iguales
            </span>
            <p className="text-slate-600">
              Actualmente tienes base <strong className="font-math">{transDenA}</strong> y base <strong className="font-math">{transDenB}</strong>. 
              Usa los controles para inyectarle un "1" a cada una hasta que tengan el mismo número abajo, o pulsa el botón automático.
            </p>
          </div>
        );
      }
      const finalNum = transNumA + transNumB;
      const finalDen = transDenA;
      return (
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Mecánica de Suma Completada
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Base común: {finalDen}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-2xl font-math font-black py-2">
            <MathFraction numerator={transNumA} denominator={finalDen} size="lg" color="amber" />
            <span className="text-slate-500">+</span>
            <MathFraction numerator={transNumB} denominator={finalDen} size="lg" color="indigo" />
            <span className="text-slate-500">=</span>
            <div className="flex flex-col items-center justify-center font-math leading-none px-2 py-1 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-xl font-bold text-slate-200 pb-1">{transNumA} + {transNumB}</span>
              <span className="w-full border-t-2 border-slate-600" />
              <span className="text-xl font-bold text-slate-200 pt-1">{finalDen}</span>
            </div>
            <span className="text-slate-500">=</span>
            <MathFraction numerator={finalNum} denominator={finalDen} size="xl" color="emerald" />
          </div>

          <p className="text-xs text-slate-300 text-center max-w-lg mx-auto">
            Se suman únicamente los números de arriba (<strong className="font-math">{transNumA} + {transNumB} = {finalNum}</strong>). 
            El número de abajo se conserva (<strong className="font-math">{finalDen}</strong>) porque representa la unidad de medida común.
          </p>
        </div>
      );
    }

    if (operation === '-') {
      if (!basesAreEqual) {
        return (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Paso previo requerido: Los números de abajo no coinciden
            </span>
            <p className="text-slate-600">
              Empareja las bases multiplicando por el 1 que corresponda antes de restar.
            </p>
          </div>
        );
      }
      const finalNum = transNumA - transNumB;
      const finalDen = transDenA;
      return (
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider">
              Mecánica de Resta Completada
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Base común: {finalDen}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-2xl font-math font-black py-2">
            <MathFraction numerator={transNumA} denominator={finalDen} size="lg" color="amber" />
            <span className="text-slate-500">-</span>
            <MathFraction numerator={transNumB} denominator={finalDen} size="lg" color="indigo" />
            <span className="text-slate-500">=</span>
            <div className="flex flex-col items-center justify-center font-math leading-none px-2 py-1 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-xl font-bold text-slate-200 pb-1">{transNumA} - {transNumB}</span>
              <span className="w-full border-t-2 border-slate-600" />
              <span className="text-xl font-bold text-slate-200 pt-1">{finalDen}</span>
            </div>
            <span className="text-slate-500">=</span>
            <MathFraction numerator={finalNum} denominator={finalDen} size="xl" color="emerald" />
          </div>

          <p className="text-xs text-slate-300 text-center max-w-lg mx-auto">
            Se restan únicamente los números superiores: <strong className="font-math">{transNumA} - {transNumB} = {finalNum}</strong>.
          </p>
        </div>
      );
    }

    if (operation === '×') {
      const mulNum = numA * numB;
      const mulDen = denA * denB;
      return (
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider">
              Multiplicación Directa en Línea Recta
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              No requiere igualar denominadores
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-2xl font-math font-black py-2">
            <MathFraction numerator={numA} denominator={denA} size="lg" color="amber" />
            <span className="text-slate-500">×</span>
            <MathFraction numerator={numB} denominator={denB} size="lg" color="indigo" />
            <span className="text-slate-500">=</span>
            <div className="flex flex-col items-center justify-center font-math leading-none px-2.5 py-1 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-xl font-bold text-amber-300 pb-1">{numA} × {numB}</span>
              <span className="w-full border-t-2 border-slate-600" />
              <span className="text-xl font-bold text-indigo-300 pt-1">{denA} × {denB}</span>
            </div>
            <span className="text-slate-500">=</span>
            <MathFraction numerator={mulNum} denominator={mulDen} size="xl" color="emerald" />
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 text-center space-y-1 max-w-lg mx-auto">
            <strong className="text-white block font-sans">¿Por qué es en línea recta?</strong>
            <p>
              Arriba multiplicas cuántos pedazos tomas (<strong className="font-math">{numA} × {numB} = {mulNum}</strong>). 
              Abajo calculas en cuántas partes queda dividida la unidad total (<strong className="font-math">{denA} × {denB} = {mulDen}</strong>).
            </p>
          </div>
        </div>
      );
    }

    if (operation === '÷') {
      const divNum = numA * denB;
      const divDen = denA * numB;
      return (
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono text-purple-400 font-bold uppercase tracking-wider">
              División Mecánica Mediante Inversión
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Técnica formal: Multiplicar por el inverso
            </span>
          </div>

          <div className="space-y-4">
            {/* Paso 1: Planteamiento */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xl sm:text-2xl font-math font-black">
              <span className="text-xs font-sans text-slate-400 mr-2">División original:</span>
              <MathFraction numerator={numA} denominator={denA} size="md" color="amber" />
              <span className="text-slate-500">÷</span>
              <MathFraction numerator={numB} denominator={denB} size="md" color="indigo" />
            </div>

            {/* Paso 2: La transformación */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
              <span className="text-[11px] font-sans font-bold text-purple-300 block text-center">
                Mecanismo: Invertir la segunda fracción y multiplicar directo
              </span>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-xl sm:text-2xl font-math font-black">
                <MathFraction numerator={numA} denominator={denA} size="md" color="amber" />
                <span className="text-emerald-400">×</span>
                <div className="bg-purple-900/60 border border-purple-500 px-2 py-1 rounded-xl text-center">
                  <span className="text-[9px] font-sans text-purple-200 block uppercase">Invertida</span>
                  <MathFraction numerator={denB} denominator={numB} size="md" color="indigo" />
                </div>
                <span className="text-slate-500">=</span>
                <div className="flex flex-col items-center justify-center font-math leading-none px-2 py-1 bg-slate-900 rounded-xl border border-slate-700">
                  <span className="text-lg font-bold text-slate-200 pb-1">{numA} × {denB}</span>
                  <span className="w-full border-t-2 border-slate-600" />
                  <span className="text-lg font-bold text-slate-200 pt-1">{denA} × {numB}</span>
                </div>
                <span className="text-slate-500">=</span>
                <MathFraction numerator={divNum} denominator={divDen} size="lg" color="emerald" />
              </div>
            </div>

            <p className="text-xs text-slate-300 text-center max-w-lg mx-auto">
              Dividir entre una fracción es exactamente lo mismo que multiplicar por ella al revés. No necesitas aprender fórmulas cruzadas misteriosas; simplemente volteas la segunda fracción y multiplicas en línea recta.
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* TÍTULO Y DESCRIPCIÓN DEL BANCO DE TRABAJO */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-slate-200 mb-1">
              <Cpu className="w-3.5 h-3.5 text-slate-700" />
              Taller de Manipulación Numérica
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Control Mecánico Total de Fracciones
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg w-fit">
            Sin trucos ciegos • Manipulación directa
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Configura cualquier fracción y opera paso a paso. Observa cómo puedes transformar las estructuras numéricas a conveniencia usando la propiedad de multiplicar por 1 (<span className="font-math font-bold">k/k</span>).
        </p>

        {/* SELECTOR DE OPERACIÓN */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {(['+', '-', '×', '÷'] as const).map((op) => (
            <button
              key={op}
              onClick={() => {
                setOperation(op);
                handleResetFactors();
              }}
              className={`py-2.5 rounded-xl font-math font-black text-lg transition-all cursor-pointer border flex items-center justify-center gap-1 ${
                operation === op
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* PANEL DE CONFIGURACIÓN DE FRACCIONES */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* TÉRMINO A */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="text-xs font-mono font-bold text-slate-700 uppercase">
                Término A
              </span>
              <MathFraction numerator={numA} denominator={denA} size="lg" color="amber" />
            </div>

            {/* Controles numéricos */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-slate-500 font-semibold block">Numerador:</span>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setNumA(Math.max(1, numA - 1))}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-math font-black text-base">{numA}</span>
                  <button
                    onClick={() => setNumA(numA + 1)}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-slate-500 font-semibold block">Denominador:</span>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setDenA(Math.max(2, denA - 1))}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-math font-black text-base">{denA}</span>
                  <button
                    onClick={() => setDenA(denA + 1)}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Inyector del 1 (Solo relevante para Suma y Resta) */}
            {(operation === '+' || operation === '-') && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">
                    Inyectar "1" estratégico (k/k):
                  </span>
                  <span className="font-math text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    × ({userFactorA}/{userFactorA})
                  </span>
                </div>
                
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((k) => (
                    <button
                      key={k}
                      onClick={() => setUserFactorA(k)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-math font-bold cursor-pointer transition-all border ${
                        userFactorA === k
                          ? 'bg-amber-600 text-white border-amber-700 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {k}/{k}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between pt-1">
                  <span>Estructura resultante:</span>
                  <span className="font-math font-bold text-slate-800">
                    {transNumA}/{transDenA}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* TÉRMINO B */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="text-xs font-mono font-bold text-slate-700 uppercase">
                Término B
              </span>
              <MathFraction numerator={numB} denominator={denB} size="lg" color="indigo" />
            </div>

            {/* Controles numéricos */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-slate-500 font-semibold block">Numerador:</span>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setNumB(Math.max(1, numB - 1))}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-math font-black text-base">{numB}</span>
                  <button
                    onClick={() => setNumB(numB + 1)}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-slate-500 font-semibold block">Denominador:</span>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setDenB(Math.max(2, denB - 1))}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-math font-black text-base">{denB}</span>
                  <button
                    onClick={() => setDenB(denB + 1)}
                    className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Inyector del 1 (Solo relevante para Suma y Resta) */}
            {(operation === '+' || operation === '-') && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">
                    Inyectar "1" estratégico (k/k):
                  </span>
                  <span className="font-math text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    × ({userFactorB}/{userFactorB})
                  </span>
                </div>
                
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((k) => (
                    <button
                      key={k}
                      onClick={() => setUserFactorB(k)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-math font-bold cursor-pointer transition-all border ${
                        userFactorB === k
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {k}/{k}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between pt-1">
                  <span>Estructura resultante:</span>
                  <span className="font-math font-bold text-slate-800">
                    {transNumB}/{transDenB}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Herramienta de ayuda rápida para igualar bases en suma y resta */}
        {(operation === '+' || operation === '-') && !basesAreEqual && (
          <div className="flex items-center justify-between bg-slate-100/80 p-3.5 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-600">
              💡 Objetivo recomendado: Base común <strong className="font-math text-slate-900">{targetCommonDen}</strong> (Multiplicar A por {idealFactorA}/{idealFactorA} y B por {idealFactorB}/{idealFactorB}).
            </span>
            <button
              onClick={handleAutoEqualize}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-all whitespace-nowrap"
            >
              Aplicar Automáticamente
            </button>
          </div>
        )}

        {/* RENDERIZADO DEL RESULTADO Y PROCEDIMIENTO */}
        <div className="pt-2">
          {renderCalculation()}
        </div>
      </div>
    </div>
  );
};
