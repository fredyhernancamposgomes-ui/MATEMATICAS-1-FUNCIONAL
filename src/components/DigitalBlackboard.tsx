import React, { useState } from 'react';
import { MathFraction } from './MathFraction';
import { PrecisionPie } from './PrecisionPie';
import { GeometricPie } from './GeometricPie';
import { DivisionVisualizer } from './DivisionVisualizer';
import { 
  Play, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown,
  Plus, 
  Minus, 
  X as MultiplyIcon, 
  Divide, 
  ArrowRight,
  Sliders,
  Check,
  Compass,
  Cpu,
  HelpCircle,
  Lightbulb,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const DigitalBlackboard: React.FC = () => {
  // Sección activa de la pizarra:
  // 1: 'intro' -> ¿Qué es una fracción? (El origen del número roto)
  // 2: 'identity' -> El Arma Maestra: Multiplicar por 1 (k/k)
  // 3: 'workshop' -> El Taller Mecánico Activo (Las 4 operaciones en una sola mesa)
  const [activeSection, setActiveSection] = useState<'intro' | 'identity' | 'workshop'>('intro');

  // Pestaña desplegable: Demostración geométrica y el porqué de la regla
  const [showDemonstration, setShowDemonstration] = useState<boolean>(false);

  // ================= ESTADO DE LA INTRODUCCIÓN =================
  const [introDen, setIntroDen] = useState<number>(4);
  const [introNum, setIntroNum] = useState<number>(3);

  // ================= ESTADO DEL PRINCIPIO DEL 1 =================
  const [factorBaseNum, setFactorBaseNum] = useState<number>(1);
  const [factorBaseDen, setFactorBaseDen] = useState<number>(2);
  const [chosenFactorK, setChosenFactorK] = useState<number>(2); // k/k

  // ================= ESTADO DEL TALLER MECÁNICO =================
  const [op, setOp] = useState<'+' | '-' | '×' | '÷'>('+');
  
  // Término A: numA / denA
  const [numA, setNumA] = useState<number>(1);
  const [denA, setDenA] = useState<number>(3);
  const [factorA, setFactorA] = useState<number>(1);

  // Término B: numB / denB
  const [numB, setNumB] = useState<number>(1);
  const [denB, setDenB] = useState<number>(4);
  const [factorB, setFactorB] = useState<number>(1);

  // Valores multiplicados por el factor de escala k/k
  const scaledNumA = numA * factorA;
  const scaledDenA = denA * factorA;
  const scaledNumB = numB * factorB;
  const scaledDenB = denB * factorB;

  const sameBase = scaledDenA === scaledDenB;
  const commonTarget = denA * denB;

  const autoAlignBases = () => {
    setFactorA(denB);
    setFactorB(denA);
  };

  const resetWorkshopFactors = () => {
    setFactorA(1);
    setFactorB(1);
  };

  return (
    <div className="w-full space-y-6">
      {/* BARRA SUPERIOR DE LA PIZARRA (CONTROLES DE NAVEGACIÓN CONTINUA) */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ml-2" />
          <span className="text-xs font-mono text-slate-300 font-semibold tracking-wider uppercase">
            Pizarra Matemática Viva
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveSection('intro')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'intro'
                ? 'bg-slate-800 text-amber-300 font-semibold border border-slate-700 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>1. El Origen</span>
          </button>

          <button
            onClick={() => setActiveSection('identity')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'identity'
                ? 'bg-slate-800 text-amber-300 font-semibold border border-slate-700 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>2. La Ley del 1</span>
          </button>

          <button
            onClick={() => setActiveSection('workshop')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'workshop'
                ? 'bg-slate-800 text-amber-300 font-semibold border border-slate-700 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3. Taller Mecánico</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 1: EL ORIGEN — ¿POR QUÉ EXISTEN LAS FRACCIONES?                  */}
      {/* ========================================================================= */}
      {activeSection === 'intro' && (
        <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-100 space-y-8 animate-in fade-in duration-300">
          
          {/* TÍTULO Y ARGUMENTO PRINCIPAL */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
              <Compass className="w-3.5 h-3.5" />
              Fundamento 01: La Ruptura de la Unidad
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Los enteros cuentan cosas completas. Una fracción mide lo que se partió.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Si tienes 3 manzanas completas, dices <span className="font-mono text-amber-300 font-bold">3</span>. Pero si tienes <strong>una sola manzana</strong> y la repartes entre 4 personas, los números enteros se quedan mudos. Tuviste que inventar un símbolo con dos pisos:
            </p>
          </div>

          {/* LA PIZARRA INTERACTIVA: EL COMPÁS Y LA FÓRMULA LATEX */}
          <div className="bg-[#111c38]/60 border border-slate-800/90 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* LADO IZQUIERDO: EL DISCO / PASTEL GEOMÉTRICO */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative p-2 bg-[#090e1a] rounded-2xl border border-slate-800 shadow-inner">
                <PrecisionPie
                  totalSlices={introDen}
                  filledSlices={introNum}
                  size={190}
                  interactive={true}
                  onSliceClick={(idx) => setIntroNum(idx + 1)}
                  theme="chalkboard"
                />
              </div>

              <div className="text-center space-y-1">
                <span className="text-xs text-amber-300/90 font-mono block">
                  Toca los sectores para tomarlos
                </span>
                <span className="text-[11px] text-slate-400">
                  Tomaste {introNum} de {introDen} partes iguales
                </span>
              </div>
            </div>

            {/* LADO DERECHO: LA ANATOMÍA EN PIZARRA */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-[#090e1a]/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Notación exacta:
                </span>
                <MathFraction
                  numerator={introNum}
                  denominator={introDen}
                  size="xl"
                  variant="accent"
                />
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-amber-300 font-bold">Número de arriba ({introNum}):</span>
                    <span className="text-[11px] text-slate-500">Numerador</span>
                  </div>
                  <p className="text-slate-300">
                    Es el <strong>contador</strong>. Te dice cuántos pedazos tienes en la mano.
                  </p>
                </div>

                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-slate-100 font-bold">Número de abajo ({introDen}):</span>
                    <span className="text-[11px] text-slate-500">Denominador</span>
                  </div>
                  <p className="text-slate-300">
                    Es el <strong>calibre</strong>. Te dice en cuántas partes iguales se partió el entero.
                  </p>
                </div>
              </div>

              {/* Controles del dial del calibre */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono uppercase block">
                  Modifica el corte de la unidad (Denominador):
                </span>
                <div className="flex gap-2">
                  {[2, 3, 4, 6, 8, 12].map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setIntroDen(d);
                        if (introNum > d) setIntroNum(d);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all border ${
                        introDen === d
                          ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* EL PUENTE AL PRINCIPIO DEL 1 */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                La Gran Pregunta:
              </span>
              <p className="text-sm text-slate-200">
                ¿Qué pasa si tienes medio pastel y quieres cambiarlo a cuartos o sextos <strong>sin alterar cuánta comida hay</strong>?
              </p>
            </div>

            <button
              onClick={() => setActiveSection('identity')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
            >
              <span>Ver el Arma Maestra: El 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECCIÓN 2: LA LEY INVIOLABLE DEL "1" (CONSERVACIÓN DE VALOR)              */}
      {/* ========================================================================= */}
      {activeSection === 'identity' && (
        <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-100 space-y-8 animate-in fade-in duration-300">
          
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
              <Lightbulb className="w-3.5 h-3.5" />
              Fundamento 02: La Ley de Conservación
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              No puedes cambiar el valor de un número. Pero puedes cambiar su ropa multiplicando por 1.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Cualquier cosa multiplicada por 1 sigue siendo idéntica a sí misma (<span className="font-mono text-amber-300">x · 1 = x</span>). 
              Y como <span className="font-mono text-amber-300">2/2 = 1</span>, <span className="font-mono text-amber-300">3/3 = 1</span> y <span className="font-mono text-amber-300">k/k = 1</span>, puedes disfrazar cualquier fracción como a ti te convenga.
            </p>
          </div>

          {/* EL EXPERIMENTO EN VIVO */}
          <div className="bg-[#111c38]/60 border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Selecciona la fracción original:
              </span>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setFactorBaseNum(1); setFactorBaseDen(2); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer border ${
                    factorBaseNum === 1 && factorBaseDen === 2
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  1/2
                </button>
                <button
                  onClick={() => { setFactorBaseNum(2); setFactorBaseDen(3); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer border ${
                    factorBaseNum === 2 && factorBaseDen === 3
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  2/3
                </button>
                <button
                  onClick={() => { setFactorBaseNum(3); setFactorBaseDen(4); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer border ${
                    factorBaseNum === 3 && factorBaseDen === 4
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  3/4
                </button>
              </div>
            </div>

            {/* SELECTOR DE FACTOR DEL 1 */}
            <div className="space-y-2">
              <span className="text-xs text-amber-300 font-mono font-bold uppercase block">
                Inyecta el factor neutro (k/k):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((k) => (
                  <button
                    key={k}
                    onClick={() => setChosenFactorK(k)}
                    className={`p-3 rounded-xl font-mono text-xs cursor-pointer transition-all border flex flex-col items-center gap-1 ${
                      chosenFactorK === k
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-base font-bold">· ({k}/{k})</span>
                    <span className="text-[10px] opacity-80">
                      {k === 1 ? 'Valor sin alterar' : `Subdivide en ${k} partes`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Demostración Visual y Numérica */}
            <div className="bg-[#090e1a] p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center text-center space-y-2">
                <PrecisionPie
                  totalSlices={factorBaseDen * chosenFactorK}
                  filledSlices={factorBaseNum * chosenFactorK}
                  size={180}
                  theme="chalkboard"
                />
                <span className="text-xs font-mono text-slate-300">
                  Área cubierta: exactamente la misma
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">
                    Ecuación en pizarra:
                  </span>
                  
                  <div className="flex flex-wrap items-center gap-3 text-2xl font-serif text-white">
                    <MathFraction
                      numerator={factorBaseNum}
                      denominator={factorBaseDen}
                      size="lg"
                      variant="chalk"
                    />
                    <span className="text-slate-500">·</span>
                    <div className="border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 rounded-lg text-amber-300">
                      <MathFraction
                        numerator={chosenFactorK}
                        denominator={chosenFactorK}
                        size="lg"
                        variant="accent"
                      />
                    </div>
                    <span className="text-slate-500">=</span>
                    <MathFraction
                      numerator={factorBaseNum * chosenFactorK}
                      denominator={factorBaseDen * chosenFactorK}
                      size="xl"
                      variant="accent"
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>El secreto que te acompañará para siempre:</strong> Al multiplicar arriba y abajo por <span className="font-mono text-amber-300 font-bold">{chosenFactorK}</span>, el área no creció ni se achicó. Solo cambiaste la resolución del corte. Con esta sola herramienta puedes resolver cualquier suma o resta del planeta.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Paso Final:
              </span>
              <p className="text-sm text-slate-200">
                Llevemos esta herramienta al taller para operar <strong className="font-mono">+, -, ×, ÷</strong> con control absoluto.
              </p>
            </div>

            <button
              onClick={() => setActiveSection('workshop')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
            >
              <span>Entrar al Taller Mecánico</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECCIÓN 3: EL TALLER MECÁNICO ACTIVO (LAS 4 OPERACIONES EN UNA MESA)     */}
      {/* ========================================================================= */}
      {activeSection === 'workshop' && (
        <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-100 space-y-8 animate-in fade-in duration-300">
          
          {/* HEADER DEL TALLER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 mb-2">
                <Cpu className="w-3.5 h-3.5" />
                Banco de Operación Mecánica
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Mesa de Trabajo Numérica
              </h2>
            </div>

            {/* SELECTOR DE OPERACIÓN */}
            <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 gap-1">
              {(['+', '-', '×', '÷'] as const).map((operation) => (
                <button
                  key={operation}
                  onClick={() => {
                    setOp(operation);
                    resetWorkshopFactors();
                  }}
                  className={`w-11 h-10 rounded-xl font-mono text-lg font-bold transition-all cursor-pointer flex items-center justify-center ${
                    op === operation
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {operation}
                </button>
              ))}
            </div>
          </div>

          {/* LAS DOS FRACCIONES EN LA MESA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* TÉRMINO A */}
            <div className="bg-[#111c38]/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-slate-400 uppercase">Término A</span>
                  <span className="text-[11px] text-slate-500 block">Fracción de entrada</span>
                </div>
                <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
              </div>

              {/* Ajustadores numéricos */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Numerador:</span>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setNumA(Math.max(1, numA - 1))}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-white">{numA}</span>
                    <button
                      onClick={() => setNumA(numA + 1)}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Denominador:</span>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setDenA(Math.max(2, denA - 1))}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-white">{denA}</span>
                    <button
                      onClick={() => setDenA(denA + 1)}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* INYECTOR DEL FACTOR 1 PARA SUMA Y RESTA */}
              {(op === '+' || op === '-') && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Factor neutro (k/k):</span>
                    <span className="text-amber-300 font-bold">· ({factorA}/{factorA})</span>
                  </div>
                  
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((k) => (
                      <button
                        key={k}
                        onClick={() => setFactorA(k)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono cursor-pointer border ${
                          factorA === k
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {k}/{k}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                    <span>Estructura modificada:</span>
                    <span className="text-white font-bold text-sm">
                      {scaledNumA} / {scaledDenA}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* TÉRMINO B */}
            <div className="bg-[#111c38]/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-slate-400 uppercase">Término B</span>
                  <span className="text-[11px] text-slate-500 block">Fracción de entrada</span>
                </div>
                <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
              </div>

              {/* Ajustadores numéricos */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Numerador:</span>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setNumB(Math.max(1, numB - 1))}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-white">{numB}</span>
                    <button
                      onClick={() => setNumB(numB + 1)}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Denominador:</span>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setDenB(Math.max(2, denB - 1))}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-white">{denB}</span>
                    <button
                      onClick={() => setDenB(denB + 1)}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* INYECTOR DEL FACTOR 1 PARA SUMA Y RESTA */}
              {(op === '+' || op === '-') && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Factor neutro (k/k):</span>
                    <span className="text-amber-300 font-bold">· ({factorB}/{factorB})</span>
                  </div>
                  
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((k) => (
                      <button
                        key={k}
                        onClick={() => setFactorB(k)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono cursor-pointer border ${
                          factorB === k
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {k}/{k}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                    <span>Estructura modificada:</span>
                    <span className="text-white font-bold text-sm">
                      {scaledNumB} / {scaledDenB}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* BOTÓN DE AUTO-EMPAREJAMIENTO DE BASES SI SON DISTINTAS */}
          {(op === '+' || op === '-') && !sameBase && (
            <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-xs text-amber-300 font-mono font-bold block">
                  ¡No puedes sumar ni restar rebanadas de distinto tamaño!
                </span>
                <p className="text-xs text-slate-300 font-mono">
                  Bases actuales: <span className="text-white font-bold">{scaledDenA}</span> y <span className="text-white font-bold">{scaledDenB}</span>.
                  Objetivo común: <strong className="text-amber-400 font-bold">{commonTarget}</strong> (Multiplicar por 1 a cada una).
                </p>
              </div>
              <button
                onClick={autoAlignBases}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer font-mono whitespace-nowrap shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Aplicar el 1 y Emparejar Bases</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA DESPLEGABLE ELEGANTE: ¿POR QUÉ FUNCIONA ESTO? (DEMOSTRACIÓN PURA) */}
          {/* ========================================================================= */}
          <div className="border border-slate-800 bg-[#080d19] rounded-2xl overflow-hidden transition-all shadow-md">
            <button
              onClick={() => setShowDemonstration(!showDemonstration)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block">
                    Fundamento Teórico y Demostración
                  </span>
                  <span className="text-sm text-slate-300 font-medium">
                    {op === '+' && "¿Cómo se subdividen y unen los pasteles geométricos?"}
                    {op === '-' && "¿Cómo se restan rebanadas del mismo calibre en el pastel?"}
                    {op === '×' && "¿Qué significa multiplicar dos fracciones? (Una fracción de otra)"}
                    {op === '÷' && "¿Por qué diablos se da vuelta la segunda fracción al dividir?"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <span>{showDemonstration ? 'Ocultar explicación' : 'Ver el porqué'}</span>
                {showDemonstration ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </button>

            {/* CONTENIDO DESPLEGABLE */}
            {showDemonstration && (
              <div className="p-5 sm:p-7 border-t border-slate-800/80 bg-[#050914] space-y-6 animate-in fade-in duration-200">
                
                {/* EXPLICACIÓN PARA SUMA (+) */}
                {op === '+' && (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                      {/* Pastel A */}
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-slate-400">Término A</span>
                        <GeometricPie
                          baseSlices={denA}
                          subdivisionK={factorA}
                          filledBaseSlices={numA}
                          size={130}
                          theme="amber"
                          label={`${numA}/${denA} · (${factorA}/${factorA}) = ${scaledNumA}/${scaledDenA}`}
                        />
                        <span className="text-[11px] font-mono text-slate-400">
                          {factorA > 1 ? `Cada tercio cortado en ${factorA}` : 'Sin cortes extra'}
                        </span>
                      </div>

                      <span className="text-2xl font-mono text-slate-500 font-bold">+</span>

                      {/* Pastel B */}
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-slate-400">Término B</span>
                        <GeometricPie
                          baseSlices={denB}
                          subdivisionK={factorB}
                          filledBaseSlices={numB}
                          size={130}
                          theme="emerald"
                          label={`${numB}/${denB} · (${factorB}/${factorB}) = ${scaledNumB}/${scaledDenB}`}
                        />
                        <span className="text-[11px] font-mono text-slate-400">
                          {factorB > 1 ? `Cada cuarto cortado en ${factorB}` : 'Sin cortes extra'}
                        </span>
                      </div>

                      <span className="text-2xl font-mono text-slate-500 font-bold">=</span>

                      {/* Pastel Resultado */}
                      <div className="bg-amber-400/5 p-4 rounded-xl border border-amber-400/30 flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-amber-300 font-bold">Pastel Unificado</span>
                        {sameBase ? (
                          <GeometricPie
                            baseSlices={scaledDenA}
                            subdivisionK={1}
                            filledBaseSlices={Math.min(scaledDenA, scaledNumA + scaledNumB)}
                            size={130}
                            theme="amber"
                            label={`Total: ${scaledNumA + scaledNumB}/${scaledDenA}`}
                          />
                        ) : (
                          <div className="w-[130px] h-[130px] rounded-full border border-dashed border-slate-700 flex items-center justify-center text-center p-2 text-xs font-mono text-slate-500">
                            Rebanadas incompatibles hasta igualar bases
                          </div>
                        )}
                        <span className="text-[11px] font-mono text-slate-400">
                          {sameBase ? `Suma de ${scaledNumA} + ${scaledNumB} rebanadas` : 'Alinea los calibres'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      💡 <strong>El principio físico:</strong> Multiplicar por <strong className="text-amber-300">({factorA}/{factorA})</strong> no crea más masa de pastel. Simplemente pasa el cuchillo para subdividir cada porción en porciones más delgadas. Una vez que ambos pasteles tienen porciones del mismo tamaño (mismo calibre angular), ya puedes sumarlas contando los trozos uno a uno.
                    </p>
                  </div>
                )}

                {/* EXPLICACIÓN PARA RESTA (-) */}
                {op === '-' && (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-slate-400">Tienes</span>
                        <GeometricPie
                          baseSlices={denA}
                          subdivisionK={factorA}
                          filledBaseSlices={numA}
                          size={130}
                          theme="amber"
                          label={`${scaledNumA}/${scaledDenA}`}
                        />
                      </div>

                      <span className="text-2xl font-mono text-slate-500 font-bold">-</span>

                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-slate-400">Retiras</span>
                        <GeometricPie
                          baseSlices={denB}
                          subdivisionK={factorB}
                          filledBaseSlices={numB}
                          size={130}
                          theme="emerald"
                          label={`${scaledNumB}/${scaledDenB}`}
                        />
                      </div>

                      <span className="text-2xl font-mono text-slate-500 font-bold">=</span>

                      <div className="bg-rose-400/5 p-4 rounded-xl border border-rose-400/30 flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-rose-300 font-bold">Sobran</span>
                        {sameBase ? (
                          <GeometricPie
                            baseSlices={scaledDenA}
                            subdivisionK={1}
                            filledBaseSlices={Math.max(0, Math.min(scaledDenA, scaledNumA - scaledNumB))}
                            size={130}
                            theme="chalk"
                            label={`Quedan: ${scaledNumA - scaledNumB}/${scaledDenA}`}
                          />
                        ) : (
                          <div className="w-[130px] h-[130px] rounded-full border border-dashed border-slate-700 flex items-center justify-center text-center p-2 text-xs font-mono text-slate-500">
                            Empareja calibres para restar
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      💡 No se pueden restar 1 rebanada de tercio con 1 rebanada de cuarto porque no tienen el mismo tamaño. Al cortarlas a doceavos con el factor 1, restas directamente 4 trozos menos 3 trozos = 1 trozo de doceavo.
                    </p>
                  </div>
                )}

                {/* EXPLICACIÓN PARA MULTIPLICACIÓN (×) */}
                {op === '×' && (
                  <div className="space-y-4">
                    <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-mono text-amber-300 font-bold block uppercase">
                        ¿Qué significa físicamente multiplicar fracciones?
                      </span>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed">
                        En matemáticas, la palabra <strong>"de"</strong> significa multiplicar.
                        Calcular <span className="text-amber-300 font-bold">{numA}/{denA} × {numB}/{denB}</span> significa: 
                        tomar los <span className="text-white font-bold">{numA}/{denA}</span> <strong>DE</strong> una porción de <span className="text-white font-bold">{numB}/{denB}</span>.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-center">
                        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                          <span className="text-[11px] text-slate-400 block mb-2">Porción inicial</span>
                          <GeometricPie baseSlices={denB} subdivisionK={1} filledBaseSlices={numB} size={110} theme="emerald" label={`${numB}/${denB}`} />
                        </div>
                        <div className="flex items-center justify-center text-xs font-mono text-slate-400">
                          Cortamos esa porción en <strong className="text-white mx-1">{denA}</strong> partes y tomamos <strong className="text-white mx-1">{numA}</strong>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-lg border border-amber-400/30">
                          <span className="text-[11px] text-amber-300 block mb-2">Resultado final del entero</span>
                          <GeometricPie baseSlices={denA * denB} subdivisionK={1} filledBaseSlices={numA * numB} size={110} theme="amber" label={`${numA * numB}/${denA * denB}`} />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 font-mono pt-2">
                        Por eso la regla es directa: numerador por numerador ({numA} × {numB} = {numA * numB}) y denominador por denominador ({denA} × {denB} = {denA * denB}). ¡No requiere igualar denominadores jamás!
                      </p>
                    </div>
                  </div>
                )}

                {/* EXPLICACIÓN MAGISTRAL PARA DIVISIÓN (÷): CON PASTELES SUPERPUESTOS Y EL POR QUÉ SE VOLTEA */}
                {op === '÷' && (
                  <div className="space-y-6">
                    {/* VISUALIZACIÓN FÍSICA CON ENCAJE REAL DE PASTELES */}
                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          ¿Qué significa físicamente <MathFraction numerator={numA} denominator={denA} size="sm" variant="accent" /> ÷ <MathFraction numerator={numB} denominator={denB} size="sm" variant="chalk" />?
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          Encaje geométrico de moldes
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-mono leading-relaxed">
                        Dividir en la vida real es una sola pregunta: <strong>"¿Cuántas porciones de molde <MathFraction numerator={numB} denominator={denB} size="sm" variant="chalk" /> caben dentro de tu pastel <MathFraction numerator={numA} denominator={denA} size="sm" variant="accent" />?"</strong>
                      </p>

                      <DivisionVisualizer
                        numA={numA}
                        denA={denA}
                        numB={numB}
                        denB={denB}
                        size={190}
                      />
                    </div>

                    {/* DEMOSTRACIÓN ALGEBRAICA IMPECABLE EN PASOS NUMERADOS CON FRACCIONES VERTICALES DERECHAS */}
                    <div className="bg-[#0b1329] p-5 sm:p-7 rounded-2xl border border-amber-400/30 space-y-5">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                          Paso a Paso Impecable: ¿Por qué diablos se voltea la segunda fracción?
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                        {/* PASO 1: FRACCIÓN DE DOS PISOS VERTICAL */}
                        <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-between gap-3 min-h-[210px]">
                          <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Paso 1: Dos pisos</span>
                          <div className="inline-flex flex-col items-center justify-center my-auto">
                            {/* Fracción de arriba */}
                            <div className="px-3 py-1">
                              <MathFraction numerator={numA} denominator={denA} size="lg" variant="accent" />
                            </div>
                            {/* Barra divisoria principal horizontal y ancha */}
                            <span className="w-24 border-t-[2.5px] border-slate-200 my-1 shadow-xs" />
                            {/* Fracción de abajo */}
                            <div className="px-3 py-1">
                              <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Escribimos la división como una sola fracción gigante.
                          </span>
                        </div>

                        {/* PASO 2: INYECTAR EL 1 INVERSO VERTICAL */}
                        <div className="bg-slate-950/90 p-4 rounded-xl border border-amber-400/40 flex flex-col items-center justify-between gap-3 min-h-[210px]">
                          <span className="text-[11px] font-mono text-amber-300 font-bold uppercase">Paso 2: Inyectar el 1</span>
                          <div className="inline-flex flex-col items-center justify-center my-auto">
                            <span className="text-[11px] font-mono text-amber-300 mb-1">Multiplicamos por 1:</span>
                            {/* Fracción de 1 con numeradores invertidos arriba y abajo */}
                            <div className="px-2 py-0.5">
                              <MathFraction numerator={denB} denominator={numB} size="md" variant="accent" />
                            </div>
                            <span className="w-20 border-t-[2.5px] border-amber-400 my-1" />
                            <div className="px-2 py-0.5">
                              <MathFraction numerator={denB} denominator={numB} size="md" variant="accent" />
                            </div>
                          </div>
                          <span className="text-[11px] text-amber-300/90 font-mono">
                            Cualquier número dividido por sí mismo sigue valiendo 1.
                          </span>
                        </div>

                        {/* PASO 3: EL DENOMINADOR SE VUELVE 1 */}
                        <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-between gap-3 min-h-[210px]">
                          <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">Paso 3: Sótano a 1</span>
                          <div className="inline-flex flex-col items-center justify-center my-auto">
                            {/* Arriba: queda la multiplicación */}
                            <div className="flex items-center gap-2 pb-1">
                              <MathFraction numerator={numA} denominator={denA} size="md" variant="chalk" />
                              <span className="text-amber-400 font-sans font-bold text-sm">×</span>
                              <MathFraction numerator={denB} denominator={numB} size="md" variant="accent" />
                            </div>
                            {/* Barra principal */}
                            <span className="w-28 border-t-[2px] border-slate-500 my-1" />
                            {/* Abajo: se anula a 1 */}
                            <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-400 text-xs font-mono font-bold mt-1">
                              <span>Sótano = 1</span>
                            </div>
                          </div>
                          <span className="text-[11px] text-emerald-300 font-mono">
                            ¡El denominador se neutraliza y se convierte en 1!
                          </span>
                        </div>

                        {/* PASO 4: LO QUE SOBREVIVE */}
                        <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-between gap-3 min-h-[210px]">
                          <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Paso 4: Lo que queda</span>
                          <div className="flex items-center justify-center my-auto gap-2 text-xl font-serif text-white">
                            <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                            <span className="text-amber-400 font-sans font-bold text-base">×</span>
                            <div className="border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 rounded-xl">
                              <MathFraction numerator={denB} denominator={numB} size="lg" variant="accent" />
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-300 font-mono">
                            Por eso la segunda fracción aparece invertida: ¡La Ley del 1 en acción!
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-center text-xs font-mono text-slate-300">
                        Nota: Usamos el signo universal <strong className="text-amber-300 font-sans">×</strong> para multiplicar. En niveles avanzados verás que a veces se representa con un punto (<span className="text-white font-serif">·</span>), pero la mecánica es exactamente la misma.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PROCEDIMIENTO Y RESOLUCIÓN EN PIZARRA (CÁTEDRA DE MARÍA INÉS BARAGATTI) */}
          <div className="bg-[#090e1a] border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">
                Paso a Paso en la Pizarra (Sin Saltarse Nada):
              </span>
              <span className="text-[11px] font-mono text-amber-400/90">
                La tiza escribe exactamente lo que ocurre
              </span>
            </div>

            {/* CASO SUMA */}
            {op === '+' && (
              <div className="space-y-6">
                {/* PASO 1: LA PREGUNTA ORIGINAL Y LA INYECCIÓN DEL 1 */}
                <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-amber-400 font-bold">PASO 1: Inyectar el 1 que no altera el valor</span>
                    <span className="text-slate-500">x × 1 = x</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl font-serif text-white py-2">
                    {/* TÉRMINO A CON SU 1 */}
                    <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-700/80">
                      <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                      <span className="text-slate-400 text-sm font-sans font-bold">×</span>
                      <div className="bg-amber-400/15 border border-amber-400/40 px-2 py-0.5 rounded-lg flex items-center">
                        <MathFraction numerator={factorA} denominator={factorA} size="lg" variant="accent" />
                      </div>
                    </div>

                    <span className="text-2xl font-mono text-slate-400 font-bold">+</span>

                    {/* TÉRMINO B CON SU 1 */}
                    <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-700/80">
                      <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                      <span className="text-slate-400 text-sm font-sans font-bold">×</span>
                      <div className="bg-emerald-400/15 border border-emerald-400/40 px-2 py-0.5 rounded-lg flex items-center">
                        <MathFraction numerator={factorB} denominator={factorB} size="lg" variant="accent" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 text-center font-mono">
                    Multiplicamos el primer término por <strong className="text-amber-300">({factorA}/{factorA})</strong> y el segundo por <strong className="text-emerald-300">({factorB}/{factorB})</strong>. Son dos "Unos". No modificamos la cantidad de pastel.
                  </p>
                </div>

                {/* PASO 2: MULTIPLICACIÓN EXPLÍCITA ARRIBA Y ABAJO */}
                <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-amber-400 font-bold">PASO 2: Multiplicación directa de contadores y calibres</span>
                    <span className="text-slate-500">Arriba con arriba, abajo con abajo</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl font-serif text-white py-2">
                    <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-lg font-serif text-amber-300">{numA} × {factorA}</span>
                      <span className="w-full border-t border-slate-600 my-0.5" />
                      <span className="text-lg font-serif text-slate-300">{denA} × {factorA}</span>
                    </div>

                    <span className="text-2xl font-mono text-slate-400 font-bold">+</span>

                    <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-lg font-serif text-emerald-300">{numB} × {factorB}</span>
                      <span className="w-full border-t border-slate-600 my-0.5" />
                      <span className="text-lg font-serif text-slate-300">{denB} × {factorB}</span>
                    </div>

                    <span className="text-slate-400 font-serif">=</span>

                    <MathFraction numerator={scaledNumA} denominator={scaledDenA} size="lg" variant="chalk" />
                    <span className="text-slate-400 font-serif">+</span>
                    <MathFraction numerator={scaledNumB} denominator={scaledDenB} size="lg" variant="chalk" />
                  </div>
                </div>

                {/* PASO 3: SUMA DIRECTA CON MISMA BASE */}
                {sameBase ? (
                  <div className="bg-amber-400/5 p-4 sm:p-6 rounded-xl border border-amber-400/30 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-300 font-bold">PASO 3: ¡Mismo calibre conseguido ({scaledDenA})!</span>
                      <span className="text-slate-400 font-mono">Contamos los pedazos</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-3xl font-serif text-white py-2">
                      <MathFraction numerator={scaledNumA} denominator={scaledDenA} size="lg" variant="chalk" />
                      <span className="text-slate-400">+</span>
                      <MathFraction numerator={scaledNumB} denominator={scaledDenA} size="lg" variant="chalk" />
                      <span className="text-slate-400">=</span>
                      <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-slate-900 rounded-xl border border-slate-700">
                        <span className="text-xl sm:text-2xl font-serif text-amber-300">{scaledNumA} + {scaledNumB}</span>
                        <span className="w-full border-t border-slate-600 my-0.5" />
                        <span className="text-xl sm:text-2xl font-serif text-slate-300">{scaledDenA}</span>
                      </div>
                      <span className="text-slate-400">=</span>
                      <MathFraction
                        numerator={scaledNumA + scaledNumB}
                        denominator={scaledDenA}
                        size="xl"
                        variant="accent"
                      />
                    </div>

                    <p className="text-xs text-slate-300 text-center max-w-xl mx-auto font-mono">
                      Como ambas fracciones ya tienen el mismo calibre ({scaledDenA}), no tocamos el denominador. Se suman únicamente los contadores de arriba ({scaledNumA} + {scaledNumB} = {scaledNumA + scaledNumB}). ¡Misión cumplida sin fórmulas ciegas!
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center text-xs text-slate-400 font-mono">
                    Los calibres aún no coinciden ({scaledDenA} ≠ {scaledDenB}). Pulsa el botón "Aplicar el 1 y Emparejar Bases" arriba para completar el paso 3.
                  </div>
                )}
              </div>
            )}

            {/* CASO RESTA */}
            {op === '-' && (
              <div className="space-y-6">
                <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-amber-400 font-bold">PASO 1: Inyectar el 1 para igualar calibres</span>
                    <span className="text-slate-500">x × 1 = x</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl font-serif text-white py-2">
                    <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-700/80">
                      <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                      <span className="text-slate-400 text-sm font-sans font-bold">×</span>
                      <div className="bg-amber-400/15 border border-amber-400/40 px-2 py-0.5 rounded-lg flex items-center">
                        <MathFraction numerator={factorA} denominator={factorA} size="lg" variant="accent" />
                      </div>
                    </div>

                    <span className="text-2xl font-mono text-slate-400 font-bold">-</span>

                    <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-700/80">
                      <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                      <span className="text-slate-400 text-sm font-sans font-bold">×</span>
                      <div className="bg-emerald-400/15 border border-emerald-400/40 px-2 py-0.5 rounded-lg flex items-center">
                        <MathFraction numerator={factorB} denominator={factorB} size="lg" variant="accent" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-amber-400 font-bold">PASO 2: Multiplicación de numeradores y denominadores</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl font-serif text-white py-2">
                    <MathFraction numerator={scaledNumA} denominator={scaledDenA} size="lg" variant="chalk" />
                    <span className="text-slate-400 font-serif">-</span>
                    <MathFraction numerator={scaledNumB} denominator={scaledDenB} size="lg" variant="chalk" />
                  </div>
                </div>

                {sameBase ? (
                  <div className="bg-rose-400/5 p-4 sm:p-6 rounded-xl border border-rose-400/30 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-rose-300 font-bold">PASO 3: Resta de contadores</span>
                      <span className="text-slate-400 font-mono">Misma base {scaledDenA}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-3xl font-serif text-white py-2">
                      <MathFraction numerator={scaledNumA} denominator={scaledDenA} size="lg" variant="chalk" />
                      <span className="text-slate-400">-</span>
                      <MathFraction numerator={scaledNumB} denominator={scaledDenA} size="lg" variant="chalk" />
                      <span className="text-slate-400">=</span>
                      <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-slate-900 rounded-xl border border-slate-700">
                        <span className="text-xl sm:text-2xl font-serif text-rose-300">{scaledNumA} - {scaledNumB}</span>
                        <span className="w-full border-t border-slate-600 my-0.5" />
                        <span className="text-xl sm:text-2xl font-serif text-slate-300">{scaledDenA}</span>
                      </div>
                      <span className="text-slate-400">=</span>
                      <MathFraction
                        numerator={scaledNumA - scaledNumB}
                        denominator={scaledDenA}
                        size="xl"
                        variant="accent"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center text-xs text-slate-400 font-mono">
                    Iguala las bases con los factores k/k para restar directamente.
                  </div>
                )}
              </div>
            )}

            {/* CASO MULTIPLICACIÓN */}
            {op === '×' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-2xl font-serif text-white py-2">
                  <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                  <span className="text-amber-400 font-sans font-bold">×</span>
                  <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                  <span className="text-slate-500">=</span>
                  <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xl font-serif text-amber-300">{numA} × {numB}</span>
                    <span className="w-full border-t border-slate-600 my-0.5" />
                    <span className="text-xl font-serif text-slate-300">{denA} × {denB}</span>
                  </div>
                  <span className="text-slate-500">=</span>
                  <MathFraction
                    numerator={numA * numB}
                    denominator={denA * denB}
                    size="xl"
                    variant="accent"
                  />
                </div>
                <p className="text-xs text-slate-400 text-center max-w-xl mx-auto font-mono">
                  Multiplicación directa en línea recta: numerador por numerador ({numA} × {numB} = {numA * numB}) y denominador por denominador ({denA} × {denB} = {denA * denB}). No requiere igualar bases porque se calcula una fracción de otra fracción.
                </p>
              </div>
            )}

            {/* CASO DIVISIÓN */}
            {op === '÷' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-2xl font-serif text-white py-2">
                  <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                  <span className="text-slate-500 font-mono">÷</span>
                  <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                  <span className="text-slate-500">→</span>
                  <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                  <span className="text-amber-400 font-sans font-bold text-xl">×</span>
                  <div className="border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 rounded-lg">
                    <MathFraction numerator={denB} denominator={numB} size="lg" variant="accent" />
                  </div>
                  <span className="text-slate-500">=</span>
                  <MathFraction
                    numerator={numA * denB}
                    denominator={denA * numB}
                    size="xl"
                    variant="accent"
                  />
                </div>
                <p className="text-xs text-slate-400 text-center max-w-xl mx-auto font-mono">
                  La división se transforma en una multiplicación invirtiendo la segunda fracción ({numB}/{denB} → {denB}/{numB}). Luego se multiplica en línea recta con el signo <strong className="text-amber-300">×</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
