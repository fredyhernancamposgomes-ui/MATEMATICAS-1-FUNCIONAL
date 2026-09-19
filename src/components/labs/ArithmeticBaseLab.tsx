import React, { useState } from 'react';
import { LearningMode } from '../../types';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeftRight, 
  Check, 
  Layers, 
  ShieldAlert,
  Sliders,
  Maximize2
} from 'lucide-react';

interface ArithmeticBaseLabProps {
  mode: LearningMode;
}

type SubTab = 'signs' | 'fractions_homogenize' | 'challenge';

export const ArithmeticBaseLab: React.FC<ArithmeticBaseLabProps> = ({ mode }) => {
  const [activeTab, setActiveTab] = useState<SubTab>('fractions_homogenize');

  // ==================== ESTADO: LEYES DE SIGNOS ====================
  const [posTokens, setPosTokens] = useState<number>(3);
  const [negTokens, setNegTokens] = useState<number>(5);
  const [isNeutralized, setIsNeutralized] = useState<boolean>(false);

  // Multiplicación vectorial (giros de 180)
  const [factorA, setFactorA] = useState<number>(-2);
  const [factorB, setFactorB] = useState<number>(-3);

  // ==================== ESTADO: FRACCIONES SIN MARIPOSAS ====================
  // Fracción 1: n1 / d1, Fracción 2: n2 / d2
  const [op, setOp] = useState<'+' | '-'>('+');
  const [n1, setN1] = useState<number>(1);
  const [d1, setD1] = useState<number>(2);
  const [n2, setN2] = useState<number>(1);
  const [d2, setD2] = useState<number>(3);
  
  // Paso de homogeneización:
  // 0 = inicial (apellidos distintos), 1 = amplificación visible (multiplicar por 1 astuto), 2 = suma unificada
  const [homoStep, setHomoStep] = useState<number>(0);

  // Utilidad MCD y MCM
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number): number => Math.abs(a * b) / gcd(a, b);

  const commonDenom = lcm(d1, d2);
  const mult1 = commonDenom / d1;
  const mult2 = commonDenom / d2;
  const newN1 = n1 * mult1;
  const newN2 = n2 * mult2;
  const rawFinalNumerator = op === '+' ? newN1 + newN2 : newN1 - newN2;
  const finalGcd = gcd(Math.abs(rawFinalNumerator), commonDenom);
  const simpNum = rawFinalNumerator / (finalGcd || 1);
  const simpDen = commonDenom / (finalGcd || 1);

  // ==================== ESTADO: RETO GUIADO ====================
  const challenges = [
    {
      id: 1,
      desc: 'Suma de medios y tercios',
      n1: 1, d1: 2, op: '+', n2: 1, d2: 3,
      correctLcm: 6,
      mult1: 3, mult2: 2,
      resultNum: 5, resultDen: 6,
      concept: 'El medio se convierte en 3/6 y el tercio en 2/6.'
    },
    {
      id: 2,
      desc: 'Resta con denominadores múltiplos',
      n1: 3, d1: 4, op: '-', n2: 1, d2: 8,
      correctLcm: 8,
      mult1: 2, mult2: 1,
      resultNum: 5, resultDen: 8,
      concept: '¡Aquí no necesitas alterar el 8! Solo amplificas la primera fracción por 2/2.'
    },
    {
      id: 3,
      desc: 'Fracciones con signos mezclados',
      n1: 2, d1: 5, op: '+', n2: 3, d2: 10,
      correctLcm: 10,
      mult1: 2, mult2: 1,
      resultNum: 7, resultDen: 10,
      concept: 'Homogeneizar a décimos permite sumar directamente los numeradores: 4 + 3 = 7.'
    }
  ];

  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const currentCh = challenges[currentChallengeIdx];
  const [userLcm, setUserLcm] = useState<string>('');
  const [challengeStep, setChallengeStep] = useState<'ask_lcm' | 'verified'>('ask_lcm');
  const [challengeFeedback, setChallengeFeedback] = useState<string>('');

  const handleVerifyLcm = () => {
    const val = parseInt(userLcm.trim());
    if (val === currentCh.correctLcm) {
      setChallengeStep('verified');
      setChallengeFeedback(`¡Exacto! El apellido común es ${currentCh.correctLcm}. Ahora ambas fracciones hablan el mismo idioma.`);
    } else {
      setChallengeFeedback(`Cuidado: ${val} no es el mínimo común múltiplo entre ${currentCh.d1} y ${currentCh.d2}. Busca el menor número que esté en la tabla de ambos.`);
    }
  };

  const nextChallenge = () => {
    const nextIdx = (currentChallengeIdx + 1) % challenges.length;
    setCurrentChallengeIdx(nextIdx);
    setUserLcm('');
    setChallengeStep('ask_lcm');
    setChallengeFeedback('');
  };

  // Preset quick setter
  const applyPreset = (n_1: number, d_1: number, operator: '+' | '-', n_2: number, d_2: number) => {
    setN1(n_1);
    setD1(d_1);
    setOp(operator);
    setN2(n_2);
    setD2(d_2);
    setHomoStep(0);
  };

  return (
    <div className="space-y-6">
      {/* Header del Laboratorio */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Layers className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Cimientos Aritméticos: La Verdad sin Trucos Mágicos
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                  Nivel Cero a Pre
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Prohibido el método de la mariposa. Aquí aprendemos la regla universal: <strong>homogeneizar igualando apellidos</strong> y la física real de los signos.
              </p>
            </div>
          </div>

          {/* Sub-Pestañas */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('fractions_homogenize')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'fractions_homogenize'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Fracciones (Igualar Bases)</span>
            </button>

            <button
              onClick={() => setActiveTab('signs')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'signs'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-600" />
              <span>Leyes de Signos Reales</span>
            </button>

            <button
              onClick={() => setActiveTab('challenge')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'challenge'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Retos de Dominio</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: FRACCIONES (IGUALAR BASES / CERO MARIPOSAS)                   */}
      {/* ========================================================================= */}
      {activeTab === 'fractions_homogenize' && (
        <div className="space-y-6">
          {/* Manifiesto: Por qué la mariposa es un veneno para la UNI */}
          <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 text-xs text-amber-950">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold text-amber-900 block text-sm">
                  ¿Por qué prohibimos la "Carita Feliz" o "Método de la Mariposa"?
                </strong>
                <p className="text-amber-800 leading-relaxed">
                  En la escuela te enseñan a multiplicar cruzado: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">ad ± bc / bd</code>. 
                  Eso es una receta ciega. Cuando llegas a la academia y tienes que sumar 3 fracciones o resolver <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">1/x + 1/(x+1) + 2</code>, la mariposa <strong>explota y colapsa</strong>.
                </p>
                <p className="text-amber-900 font-medium">
                  El único método que usan los matemáticos e ingenieros es la <strong>Homogeneización</strong>: multiplicar cada fracción por un <em>"1 inteligente"</em> (<code className="bg-amber-200/80 px-1 py-0.2 rounded font-mono">k / k = 1</code>) hasta que todos los pedazos tengan el mismo apellido (denominador).
                </p>
              </div>
            </div>
          </div>

          {/* Panel Principal de Homogeneización */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Columna Izquierda: Controles y Ecuación */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Configurar Fracciones
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    MCM({d1}, {d2}) = {commonDenom}
                  </span>
                </div>

                {/* Presets didácticos */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-2">
                    Casos típicos de preparación:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => applyPreset(1, 2, '+', 1, 3)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                    >
                      1/2 + 1/3 (Clásico)
                    </button>
                    <button
                      onClick={() => applyPreset(3, 4, '-', 1, 6)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                    >
                      3/4 - 1/6 (Múltiplos)
                    </button>
                    <button
                      onClick={() => applyPreset(2, 5, '+', 3, 10)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                    >
                      2/5 + 3/10 (Uno contiene al otro)
                    </button>
                  </div>
                </div>

                {/* Inputs de fracciones */}
                <div className="grid grid-cols-5 items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/70">
                  {/* Fracción 1 */}
                  <div className="col-span-2 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500">Fracción A</span>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={n1}
                      onChange={(e) => { setN1(Math.max(1, parseInt(e.target.value) || 1)); setHomoStep(0); }}
                      className="w-14 text-center font-bold text-sm bg-white border border-slate-300 rounded-lg py-1 shadow-2xs"
                      title="Numerador A"
                    />
                    <div className="w-12 h-0.5 bg-slate-400 rounded-full"></div>
                    <input
                      type="number"
                      min="2"
                      max="12"
                      value={d1}
                      onChange={(e) => { setD1(Math.max(2, parseInt(e.target.value) || 2)); setHomoStep(0); }}
                      className="w-14 text-center font-bold text-sm bg-indigo-50 border border-indigo-300 text-indigo-900 rounded-lg py-1 shadow-2xs"
                      title="Denominador A (Apellido)"
                    />
                  </div>

                  {/* Operador */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => { setOp(op === '+' ? '-' : '+'); setHomoStep(0); }}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-300 text-slate-800 font-black text-lg flex items-center justify-center hover:bg-slate-100 shadow-2xs transition-transform active:scale-95"
                      title="Cambiar operación (+ ó -)"
                    >
                      {op}
                    </button>
                  </div>

                  {/* Fracción 2 */}
                  <div className="col-span-2 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500">Fracción B</span>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={n2}
                      onChange={(e) => { setN2(Math.max(1, parseInt(e.target.value) || 1)); setHomoStep(0); }}
                      className="w-14 text-center font-bold text-sm bg-white border border-slate-300 rounded-lg py-1 shadow-2xs"
                      title="Numerador B"
                    />
                    <div className="w-12 h-0.5 bg-slate-400 rounded-full"></div>
                    <input
                      type="number"
                      min="2"
                      max="12"
                      value={d2}
                      onChange={(e) => { setD2(Math.max(2, parseInt(e.target.value) || 2)); setHomoStep(0); }}
                      className="w-14 text-center font-bold text-sm bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg py-1 shadow-2xs"
                      title="Denominador B (Apellido)"
                    />
                  </div>
                </div>

                {/* Botón de acción: Secuencia pedagógica */}
                <div className="space-y-2 pt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHomoStep(0)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        homoStep === 0
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      1. Ver Desigualdad
                    </button>
                    <button
                      onClick={() => setHomoStep(1)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        homoStep === 1
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      2. El 1 Inteligente
                    </button>
                    <button
                      onClick={() => setHomoStep(2)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        homoStep === 2
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      3. Suma Directa
                    </button>
                  </div>
                </div>
              </div>

              {/* Bitácora Matemática Formal (Nivel UNI) */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold">Justificación Axiomática</span>
                  <span className="text-[10px] text-amber-400">Paso {homoStep + 1} de 3</span>
                </div>

                {homoStep === 0 && (
                  <div className="space-y-2 text-slate-300">
                    <div className="text-amber-300 font-bold">
                      Problema: {n1}/{d1} {op} {n2}/{d2}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Los denominadores son diferentes ({d1} y {d2}). Es como intentar sumar {n1} perros con {n2} gatos. No puedes decir que son {n1 + n2} de nada.
                    </p>
                    <p className="text-[11px] text-emerald-400 font-sans">
                      Objetivo: Encontrar el Mínimo Común Múltiplo. MCM({d1}, {d2}) = <strong>{commonDenom}</strong>.
                    </p>
                  </div>
                )}

                {homoStep === 1 && (
                  <div className="space-y-2">
                    <div className="text-indigo-300">
                      Multiplicando por el elemento neutro (1 = k/k):
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-lg text-amber-300">
                      ({n1}/{d1} · <span className="text-indigo-400">{mult1}/{mult1}</span>) {op} ({n2}/{d2} · <span className="text-emerald-400">{mult2}/{mult2}</span>)
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Como {mult1}/{mult1} = 1 y {mult2}/{mult2} = 1, el valor físico no cambia en absoluto; solo cambiamos el grosor del corte.
                    </p>
                  </div>
                )}

                {homoStep === 2 && (
                  <div className="space-y-2">
                    <div className="text-emerald-300 font-bold">
                      ¡Mismo Apellido Alcanzado! (Homogéneas):
                    </div>
                    <div className="bg-slate-800/80 p-2.5 rounded-lg text-emerald-400 text-sm">
                      {newN1}/{commonDenom} {op} {newN2}/{commonDenom} = ({newN1} {op} {newN2}) / {commonDenom}
                    </div>
                    <div className="text-white text-base font-bold">
                      = {rawFinalNumerator}/{commonDenom}
                      {finalGcd > 1 && (
                        <span className="text-amber-400 text-xs ml-2">
                          (Simplificando entre {finalGcd} → {simpNum}/{simpDen})
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Columna Derecha: El Simulador Visual de Barras Proporcionales */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-sm font-bold text-slate-900">
                      Visualizador de Partición Física de Barras
                    </h2>
                    <span className="text-xs text-slate-500">
                      {homoStep === 0 ? 'Trozo original' : homoStep === 1 ? 'Subdividiendo con el 1 astuto' : 'Cortes del mismo tamaño'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Observa cómo las rebanadas cambian de tamaño pero la cantidad coloreada total sigue siendo exactamente la misma.
                  </p>
                </div>

                {/* Barra A */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-900">
                      Fracción A: {homoStep >= 1 ? `${newN1}/${commonDenom}` : `${n1}/${d1}`}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {homoStep >= 1 ? `Rebanadas de 1/${commonDenom}` : `Rebanadas de 1/${d1}`}
                    </span>
                  </div>

                  {/* Representación de la Barra 1 */}
                  <div className="h-10 w-full bg-slate-100 rounded-xl border border-slate-300 p-1 flex gap-1 shadow-inner overflow-hidden">
                    {Array.from({ length: homoStep >= 1 ? commonDenom : d1 }).map((_, i) => {
                      const isFilled = i < (homoStep >= 1 ? newN1 : n1);
                      return (
                        <div
                          key={i}
                          className={`h-full flex-1 rounded-sm transition-all duration-300 flex items-center justify-center text-[10px] font-bold ${
                            isFilled
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-200/70 text-slate-400'
                          }`}
                        >
                          {isFilled ? '1' : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Barra B */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-900">
                      Fracción B: {homoStep >= 1 ? `${newN2}/${commonDenom}` : `${n2}/${d2}`}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {homoStep >= 1 ? `Rebanadas de 1/${commonDenom}` : `Rebanadas de 1/${d2}`}
                    </span>
                  </div>

                  {/* Representación de la Barra 2 */}
                  <div className="h-10 w-full bg-slate-100 rounded-xl border border-slate-300 p-1 flex gap-1 shadow-inner overflow-hidden">
                    {Array.from({ length: homoStep >= 1 ? commonDenom : d2 }).map((_, i) => {
                      const isFilled = i < (homoStep >= 1 ? newN2 : n2);
                      return (
                        <div
                          key={i}
                          className={`h-full flex-1 rounded-sm transition-all duration-300 flex items-center justify-center text-[10px] font-bold ${
                            isFilled
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-200/70 text-slate-400'
                          }`}
                        >
                          {isFilled ? '1' : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Barra Resultado (Visible cuando se llega a homogeneización o suma) */}
                {homoStep === 2 && (
                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">
                        Resultado Combinado ({rawFinalNumerator}/{commonDenom})
                      </span>
                      <span className="text-[11px] text-indigo-700 font-bold">
                        {rawFinalNumerator} rebanadas de tamaño 1/{commonDenom}
                      </span>
                    </div>

                    <div className="h-12 w-full bg-slate-100 rounded-xl border border-slate-300 p-1 flex gap-1 shadow-inner overflow-hidden">
                      {Array.from({ length: Math.max(commonDenom, rawFinalNumerator) }).map((_, i) => {
                        const isPartA = i < newN1;
                        const isPartB = op === '+' ? (i >= newN1 && i < rawFinalNumerator) : false;
                        const isFilled = i < rawFinalNumerator;

                        return (
                          <div
                            key={i}
                            className={`h-full flex-1 rounded-sm transition-all duration-300 flex items-center justify-center text-[10px] font-bold ${
                              isPartA
                                ? 'bg-indigo-600 text-white'
                                : isPartB
                                ? 'bg-emerald-600 text-white'
                                : isFilled
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-200/70 text-slate-400'
                            }`}
                          >
                            {isFilled ? '1' : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Explicación pedagógica de síntesis */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>La Ley Sagrada de los Apellidos Iguales:</span>
                  </div>
                  <p className="leading-relaxed">
                    1. Si los apellidos son distintos ({d1} y {d2}), <strong>no sumes numeradores directamente</strong> ({n1} + {n2} no es {n1 + n2}/{d1 + d2}).
                  </p>
                  <p className="leading-relaxed">
                    2. Al multiplicar arriba y abajo por el factor necesario, obtienes fracciones equivalentes de igual denominador ({commonDenom}).
                  </p>
                  <p className="leading-relaxed font-semibold text-indigo-900">
                    3. Cuando las dos barras tienen los mismos cortes de 1/{commonDenom}, solo sumas cuántos pedacitos tienes en total: {newN1} {op} {newN2} = {rawFinalNumerator}.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: LEYES DE SIGNOS (SALDO VS DEUDA Y GIRO DE 180°)               */}
      {/* ========================================================================= */}
      {activeTab === 'signs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sub-modulo A: Suma y Resta (Fichas y Pares Nulos) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-200">
                  Aritmética Física
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  1. Suma y Resta: El Principio del Par Nulo
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Un positivo (+1) y un negativo (-1) se neutralizan a cero: (+1 - 1 = 0). Las deudas se acumulan entre sí; los saldos se acumulan entre sí.
                </p>
              </div>

              {/* Controles de Fichas */}
              <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-emerald-800 block">Positivos (+): {posTokens}</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      onClick={() => { setPosTokens(Math.max(0, posTokens - 1)); setIsNeutralized(false); }}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <button
                      onClick={() => { setPosTokens(posTokens + 1); setIsNeutralized(false); }}
                      className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-2xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-rose-800 block">Negativos (-): {negTokens}</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      onClick={() => { setNegTokens(Math.max(0, negTokens - 1)); setIsNeutralized(false); }}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <button
                      onClick={() => { setNegTokens(negTokens + 1); setIsNeutralized(false); }}
                      className="w-7 h-7 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 shadow-2xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setIsNeutralized(!isNeutralized)}
                  className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shrink-0 shadow-xs"
                >
                  {isNeutralized ? 'Separar' : 'Neutralizar a Cero'}
                </button>
              </div>

              {/* Tablero de Fichas */}
              <div className="min-h-[160px] p-4 bg-slate-100/70 rounded-xl border border-slate-200 flex flex-col justify-center gap-3">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Representación Física en Vivo:
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  {/* Fichas Positivas */}
                  {Array.from({ length: posTokens }).map((_, i) => {
                    const isCancelled = isNeutralized && i < Math.min(posTokens, negTokens);
                    return (
                      <div
                        key={`pos-${i}`}
                        className={`w-9 h-9 rounded-full font-black text-xs flex items-center justify-center transition-all ${
                          isCancelled
                            ? 'bg-slate-300 text-slate-500 opacity-40 scale-75 line-through'
                            : 'bg-emerald-500 text-white shadow-xs'
                        }`}
                        title={isCancelled ? 'Neutralizado a 0' : '+1 a favor'}
                      >
                        +1
                      </div>
                    );
                  })}

                  {/* Fichas Negativas */}
                  {Array.from({ length: negTokens }).map((_, i) => {
                    const isCancelled = isNeutralized && i < Math.min(posTokens, negTokens);
                    return (
                      <div
                        key={`neg-${i}`}
                        className={`w-9 h-9 rounded-full font-black text-xs flex items-center justify-center transition-all ${
                          isCancelled
                            ? 'bg-slate-300 text-slate-500 opacity-40 scale-75 line-through'
                            : 'bg-rose-500 text-white shadow-xs'
                        }`}
                        title={isCancelled ? 'Neutralizado a 0' : '-1 deuda'}
                      >
                        -1
                      </div>
                    );
                  })}
                </div>

                {/* Balance Neto */}
                <div className="mt-2 pt-2 border-t border-slate-200 text-xs font-mono flex items-center justify-between">
                  <span className="text-slate-600">
                    Expresión: (+{posTokens}) + (-{negTokens})
                  </span>
                  <span className={`font-bold text-sm ${posTokens - negTokens >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    Saldo Neto = {posTokens - negTokens > 0 ? `+${posTokens - negTokens}` : posTokens - negTokens}
                  </span>
                </div>
              </div>

              {/* Casos frecuentes explicados */}
              <div className="text-[11px] text-slate-600 space-y-1 bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                <strong>¿Por qué -3 - 5 no es +8?</strong>
                <p>
                  Porque no estás multiplicando. Si le debes 3 soles a una tienda y luego te endeudas con 5 soles más, tienes 8 de deuda (-8). Solo la multiplicación cambia direcciones.
                </p>
              </div>
            </div>

            {/* Sub-modulo B: Multiplicación (Giro de 180° en la Recta) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full border border-blue-200">
                  Orientación Vectorial
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  2. Multiplicación: El Giro de 180° en la Recta
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Multiplicar por (+) conserva el sentido hacia adelante. Multiplicar por (-) es una orden de dar media vuelta (rotar 180°).
                </p>
              </div>

              {/* Selector de Factores */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Primer factor (a):</label>
                  <div className="flex gap-1.5">
                    {[-3, -2, 2, 3].map((v) => (
                      <button
                        key={v}
                        onClick={() => setFactorA(v)}
                        className={`px-2 py-1 rounded-lg font-mono font-bold text-xs ${
                          factorA === v ? 'bg-slate-900 text-white' : 'bg-white border border-slate-300 text-slate-700'
                        }`}
                      >
                        {v > 0 ? `+${v}` : v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Segundo factor (b):</label>
                  <div className="flex gap-1.5">
                    {[-3, -2, 2, 3].map((v) => (
                      <button
                        key={v}
                        onClick={() => setFactorB(v)}
                        className={`px-2 py-1 rounded-lg font-mono font-bold text-xs ${
                          factorB === v ? 'bg-slate-900 text-white' : 'bg-white border border-slate-300 text-slate-700'
                        }`}
                      >
                        {v > 0 ? `+${v}` : v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visualizador de la Recta Numérica */}
              <div className="p-4 bg-slate-900 text-white rounded-xl shadow-inner space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span>Operación: ({factorA > 0 ? `+${factorA}` : factorA}) × ({factorB > 0 ? `+${factorB}` : factorB})</span>
                  <span className="text-amber-400 font-bold text-sm">
                    = {factorA * factorB > 0 ? `+${factorA * factorB}` : factorA * factorB}
                  </span>
                </div>

                {/* Explicación del Giro */}
                <div className="text-[11px] text-slate-300 space-y-1.5 font-sans leading-relaxed">
                  {factorA < 0 && factorB < 0 && (
                    <p className="text-emerald-400">
                      <strong>(-a) × (-b) = +ab:</strong> El primer negativo te orienta a la izquierda (180°). El segundo negativo te vuelve a girar 180°, terminando mirando al frente (hacia los positivos). ¡Dos medias vueltas completan una vuelta!
                    </p>
                  )}
                  {((factorA < 0 && factorB > 0) || (factorA > 0 && factorB < 0)) && (
                    <p className="text-amber-300">
                      <strong>(±) × (∓) = -:</strong> Un solo factor negativo da la orden de giro de 180°. El resultado apunta irrevocablemente a la izquierda (hacia los negativos).
                    </p>
                  )}
                  {factorA > 0 && factorB > 0 && (
                    <p className="text-indigo-300">
                      <strong>(+) × (+) = +:</strong> No hay ninguna orden de giro. Ambos avanzan en la dirección natural hacia adelante.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600">
                <strong>Resumen para no confundirse jamás:</strong>
                <p className="mt-0.5">
                  • <em>¿Hay multiplicación o división?</em> Aplica la regla de giros: signos iguales dan (+), signos distintos dan (-).
                  <br />
                  • <em>¿Hay suma o resta?</em> Es una cuenta bancaria: junta deudas con deudas, y cancela deudas con plata a favor.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 3: RETO DE DOMINIO                                                */}
      {/* ========================================================================= */}
      {activeTab === 'challenge' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-3xl mx-auto space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-200">
                Desafío {currentCh.id} de {challenges.length}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                {currentCh.desc}
              </h3>
            </div>
            <button
              onClick={nextChallenge}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Siguiente Reto</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Ecuación del Reto */}
          <div className="bg-slate-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-slate-900 font-mono">
              {currentCh.n1}/{currentCh.d1} {currentCh.op} {currentCh.n2}/{currentCh.d2}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              ¿Cuál es el <strong>Mínimo Común Múltiplo</strong> (el apellido común) para homogeneizar ambas fracciones?
            </p>
          </div>

          {/* Input de Respuesta */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                placeholder="MCM"
                value={userLcm}
                onChange={(e) => setUserLcm(e.target.value)}
                className="w-24 text-center text-lg font-bold py-2 border border-slate-300 rounded-xl focus:border-indigo-600 focus:outline-hidden"
              />
              <button
                onClick={handleVerifyLcm}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors"
              >
                Verificar Apellido Común
              </button>
            </div>

            {challengeFeedback && (
              <div
                className={`p-3.5 rounded-xl text-xs font-semibold text-center border ${
                  challengeStep === 'verified'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border-rose-200'
                }`}
              >
                {challengeFeedback}
              </div>
            )}
          </div>

          {/* Si ya verificó el MCM, mostramos la resolución completa paso a paso */}
          {challengeStep === 'verified' && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Solución Paso a Paso por Homogeneización:</span>
              </div>
              <div className="font-mono bg-white p-3 rounded-lg border border-slate-200 space-y-1 text-slate-700">
                <p>1. Amplificamos Fracción 1 por {currentCh.mult1}/{currentCh.mult1}: ({currentCh.n1 * currentCh.mult1}/{currentCh.correctLcm})</p>
                <p>2. Amplificamos Fracción 2 por {currentCh.mult2}/{currentCh.mult2}: ({currentCh.n2 * currentCh.mult2}/{currentCh.correctLcm})</p>
                <p className="font-bold text-indigo-700 pt-1 border-t border-slate-100">
                  3. Suma directa: ({currentCh.n1 * currentCh.mult1} {currentCh.op} {currentCh.n2 * currentCh.mult2}) / {currentCh.correctLcm} = {currentCh.resultNum}/{currentCh.resultDen}
                </p>
              </div>
              <p className="text-slate-600 text-[11px]">
                💡 <em>{currentCh.concept}</em>
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
