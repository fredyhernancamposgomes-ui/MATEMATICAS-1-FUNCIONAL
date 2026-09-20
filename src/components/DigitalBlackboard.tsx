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
      <div className="bg-[#14281c] border border-[#274b34] rounded-2xl p-2 sm:p-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fde047] animate-pulse ml-2" />
          <span className="text-xs font-mono text-[#d2e2d7] font-semibold tracking-wider uppercase">
            Pizarra de Aprendizaje
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveSection('intro')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'intro'
                ? 'bg-[#254631] text-[#fef08a] font-bold border border-[#3b6b4c] shadow-xs'
                : 'text-[#9eb6a7] hover:text-[#f5f7f2] hover:bg-[#1a3325]'
            }`}
          >
            <span>1. ¿Qué es una fracción?</span>
          </button>

          <button
            onClick={() => setActiveSection('identity')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'identity'
                ? 'bg-[#254631] text-[#fef08a] font-bold border border-[#3b6b4c] shadow-xs'
                : 'text-[#9eb6a7] hover:text-[#f5f7f2] hover:bg-[#1a3325]'
            }`}
          >
            <span>2. El truco del 1</span>
          </button>

          <button
            onClick={() => setActiveSection('workshop')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'workshop'
                ? 'bg-[#254631] text-[#fef08a] font-bold border border-[#3b6b4c] shadow-xs'
                : 'text-[#9eb6a7] hover:text-[#f5f7f2] hover:bg-[#1a3325]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3. Práctica interactiva</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 1: EL ORIGEN — ¿POR QUÉ EXISTEN LAS FRACCIONES?                  */}
      {/* ========================================================================= */}
      {activeSection === 'intro' && (
        <div className="bg-[#14281c] border border-[#274b34] rounded-3xl p-6 sm:p-10 shadow-md text-[#e8eee9] space-y-8 animate-in fade-in duration-300">
          
          {/* TÍTULO Y ARGUMENTO PRINCIPAL */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#fef08a] font-bold uppercase tracking-widest bg-[#1c3827] px-3 py-1 rounded-md border border-[#2e593e]">
              <Compass className="w-3.5 h-3.5" />
              Paso 01: Partir la comida en partes iguales
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f7f2] tracking-tight leading-tight">
              Los enteros cuentan cosas enteras. Las fracciones cuentan partes de algo.
            </h2>

            <p className="text-sm sm:text-base text-[#bfd4c7] leading-relaxed">
              Si tienes 3 panes completos, dices <span className="font-mono text-[#fef08a] font-bold">3</span>. Pero si tienes <strong>un solo pan</strong> y lo repartes entre 4 personas, ya no tienes panes enteros. Escribes dos números para saber qué pasó:
            </p>
          </div>

          {/* LA PIZARRA INTERACTIVA: EL COMPÁS Y LA FÓRMULA LATEX */}
          <div className="bg-[#0f1f16] border border-[#23432e] rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-inner">
            
            {/* LADO IZQUIERDO: EL DISCO / PASTEL GEOMÉTRICO */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative p-3 bg-[#162a1e] rounded-2xl border border-[#2b5138]">
                <PrecisionPie
                  totalSlices={introDen}
                  filledSlices={introNum}
                  size={190}
                  interactive={true}
                  onSliceClick={(idx) => setIntroNum(idx + 1)}
                  theme="paper"
                />
              </div>

              <div className="text-center space-y-1">
                <span className="text-xs text-[#fef08a] font-mono block font-medium">
                  Toca las rebanadas para tomarlas o soltarlas
                </span>
                <span className="text-[11px] text-[#9eb6a7]">
                  Tomaste {introNum} de {introDen} partes iguales
                </span>
              </div>
            </div>

            {/* LADO DERECHO: LA ANATOMÍA EN PIZARRA */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-[#162a1e] rounded-2xl border border-[#2b5138]">
                <span className="text-xs text-[#9eb6a7] font-mono uppercase tracking-wider">
                  En la pizarra:
                </span>
                <MathFraction
                  numerator={introNum}
                  denominator={introDen}
                  size="xl"
                  variant="accent"
                />
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-[#162a1e] p-3.5 rounded-xl border border-[#2b5138] space-y-1">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[#fde047] font-bold">Número de arriba ({introNum}):</span>
                    <span className="text-[11px] text-[#8ea797]">Numerador</span>
                  </div>
                  <p className="text-[#c6dcce]">
                    Cuántas rebanadas tomaste o tienes en tu plato.
                  </p>
                </div>

                <div className="bg-[#162a1e] p-3.5 rounded-xl border border-[#2b5138] space-y-1">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[#f5f7f2] font-bold">Número de abajo ({introDen}):</span>
                    <span className="text-[11px] text-[#8ea797]">Denominador</span>
                  </div>
                  <p className="text-[#c6dcce]">
                    En cuántas rebanadas iguales se cortó todo el pastel.
                  </p>
                </div>
              </div>

              {/* Controles del dial del calibre */}
              <div className="space-y-2 pt-2 border-t border-[#23432e]">
                <span className="text-[11px] text-[#9eb6a7] font-mono uppercase block font-medium">
                  Cambia en cuántos pedazos cortas el pastel:
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
                          ? 'bg-[#fde047] text-[#112017] border-[#fde047] font-black shadow-xs'
                          : 'bg-[#162a1e] text-[#d2e2d7] border-[#2b5138] hover:bg-[#1f3a2a]'
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
          <div className="bg-[#172e21] border border-[#2f593e] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono font-bold text-[#fef08a] uppercase tracking-wider block">
                La pregunta clave:
              </span>
              <p className="text-sm text-[#c6dcce]">
                ¿Qué pasa si tienes medio pastel y quieres cortarlo en más pedazos <strong>sin que cambie la cantidad de comida</strong>?
              </p>
            </div>

            <button
              onClick={() => setActiveSection('identity')}
              className="bg-[#244530] hover:bg-[#2d563d] text-[#fef08a] border border-[#3d6e4f] font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
            >
              <span>Ver el truco del 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECCIÓN 2: EL TRUCO DEL 1 (CONSERVAR LA MISMA COMIDA)                     */}
      {/* ========================================================================= */}
      {activeSection === 'identity' && (
        <div className="bg-[#14281c] border border-[#274b34] rounded-3xl p-6 sm:p-10 shadow-md text-[#e8eee9] space-y-8 animate-in fade-in duration-300">
          
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#fef08a] font-bold uppercase tracking-widest bg-[#1c3827] px-3 py-1 rounded-md border border-[#2e593e]">
              <Lightbulb className="w-3.5 h-3.5" />
              Paso 02: Cortar más fino sin cambiar la comida
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f7f2] tracking-tight leading-tight">
              Si multiplicas por 1, nada cambia de valor. Pero puedes cambiar cómo se ve.
            </h2>

            <p className="text-sm sm:text-base text-[#bfd4c7] leading-relaxed">
              Cualquier cosa multiplicada por 1 se queda exactamente igual (<span className="font-mono text-[#fef08a] font-semibold">x · 1 = x</span>). 
              Y como <span className="font-mono text-[#fef08a] font-semibold">2/2 = 1</span>, <span className="font-mono text-[#fef08a] font-semibold">3/3 = 1</span> y <span className="font-mono text-[#fef08a] font-semibold">4/4 = 1</span>, puedes cortar las rebanadas en pedacitos más chicos sin ganar ni perder comida.
            </p>
          </div>

          {/* EL EXPERIMENTO EN VIVO */}
          <div className="bg-[#0f1f16] border border-[#23432e] rounded-2xl p-6 sm:p-8 space-y-6 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#23432e] pb-4">
              <span className="text-xs font-mono text-[#9eb6a7] uppercase font-medium">
                Elige la porción inicial:
              </span>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setFactorBaseNum(1); setFactorBaseDen(2); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer border ${
                    factorBaseNum === 1 && factorBaseDen === 2
                      ? 'bg-[#fde047] text-[#112017] border-[#fde047]'
                      : 'bg-[#162a1e] text-[#d2e2d7] border-[#2b5138] hover:bg-[#1f3a2a]'
                  }`}
                >
                  1/2
                </button>
                <button
                  onClick={() => { setFactorBaseNum(2); setFactorBaseDen(3); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer border ${
                    factorBaseNum === 2 && factorBaseDen === 3
                      ? 'bg-[#fde047] text-[#112017] border-[#fde047]'
                      : 'bg-[#162a1e] text-[#d2e2d7] border-[#2b5138] hover:bg-[#1f3a2a]'
                  }`}
                >
                  2/3
                </button>
                <button
                  onClick={() => { setFactorBaseNum(3); setFactorBaseDen(4); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer border ${
                    factorBaseNum === 3 && factorBaseDen === 4
                      ? 'bg-[#fde047] text-[#112017] border-[#fde047]'
                      : 'bg-[#162a1e] text-[#d2e2d7] border-[#2b5138] hover:bg-[#1f3a2a]'
                  }`}
                >
                  3/4
                </button>
              </div>
            </div>

            {/* SELECTOR DE FACTOR DEL 1 */}
            <div className="space-y-2">
              <span className="text-xs text-[#fef08a] font-mono font-bold uppercase block">
                Multiplica arriba y abajo por el mismo número:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((k) => (
                  <button
                    key={k}
                    onClick={() => setChosenFactorK(k)}
                    className={`p-3 rounded-xl font-mono text-xs cursor-pointer transition-all border flex flex-col items-center gap-1 ${
                      chosenFactorK === k
                        ? 'bg-[#254631] text-[#fef08a] border-[#3b6b4c] font-black shadow-xs'
                        : 'bg-[#162a1e] text-[#d2e2d7] border-[#2b5138] hover:bg-[#1f3a2a]'
                    }`}
                  >
                    <span className="text-base font-bold">· ({k}/{k})</span>
                    <span className="text-[10px] text-[#9eb6a7]">
                      {k === 1 ? 'Sin cortar más' : `Corta cada rebanada en ${k}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Demostración Visual y Numérica */}
            <div className="bg-[#14281c] p-6 rounded-2xl border border-[#274b34] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-[#162a1e] rounded-2xl border border-[#2b5138]">
                  <PrecisionPie
                    totalSlices={factorBaseDen * chosenFactorK}
                    filledSlices={factorBaseNum * chosenFactorK}
                    size={180}
                    theme="paper"
                  />
                </div>
                <span className="text-xs font-mono text-[#d2e2d7] font-medium">
                  El área iluminada es exactamente la misma
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#162a1e] rounded-xl border border-[#2b5138]">
                  <span className="text-[10px] font-mono text-[#9eb6a7] uppercase block mb-2 font-medium">
                    Lo que escribes en la pizarra:
                  </span>
                  
                  <div className="flex flex-wrap items-center gap-3 text-2xl font-serif text-[#f5f7f2]">
                    <MathFraction
                      numerator={factorBaseNum}
                      denominator={factorBaseDen}
                      size="lg"
                      variant="chalk"
                    />
                    <span className="text-[#8ea797]">·</span>
                    <div className="border border-[#3d6e4f] bg-[#1a3325] px-2.5 py-0.5 rounded-lg text-[#fef08a]">
                      <MathFraction
                        numerator={chosenFactorK}
                        denominator={chosenFactorK}
                        size="lg"
                        variant="accent"
                      />
                    </div>
                    <span className="text-[#8ea797]">=</span>
                    <MathFraction
                      numerator={factorBaseNum * chosenFactorK}
                      denominator={factorBaseDen * chosenFactorK}
                      size="xl"
                      variant="accent"
                    />
                  </div>
                </div>

                <p className="text-xs text-[#c6dcce] leading-relaxed">
                  <strong>La clave para entender todo:</strong> Al multiplicar arriba y abajo por <span className="font-mono text-[#fde047] font-bold">{chosenFactorK}</span>, no creaste más comida. Solo cortaste cada pedazo en rebanadas más delgaditas. Con este truco tan simple resolverás cualquier suma o resta sin enredarte.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#172e21] border border-[#2f593e] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono font-bold text-[#fef08a] uppercase tracking-wider block">
                ¡Hora de jugar y practicar!:
              </span>
              <p className="text-sm text-[#c6dcce]">
                Vamos a usar este truco para sumar, restar, multiplicar y dividir sin fórmulas raras.
              </p>
            </div>

            <button
              onClick={() => setActiveSection('workshop')}
              className="bg-[#244530] hover:bg-[#2d563d] text-[#fef08a] border border-[#3d6e4f] font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
            >
              <span>Ir a la práctica</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECCIÓN 3: PRÁCTICA INTERACTIVA (LAS 4 OPERACIONES EN LA PIZARRA)         */}
      {/* ========================================================================= */}
      {activeSection === 'workshop' && (
        <div className="bg-[#14281c] border border-[#274b34] rounded-3xl p-6 sm:p-10 shadow-md text-[#e8eee9] space-y-8 animate-in fade-in duration-300">
          
          {/* HEADER DEL TALLER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#274b34] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#fef08a] font-bold uppercase tracking-widest bg-[#1c3827] px-3 py-1 rounded-md border border-[#2e593e] mb-2">
                <Cpu className="w-3.5 h-3.5" />
                Paso 03: Pon a prueba cualquier cuenta
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f7f2] tracking-tight">
                Mesa de Operaciones
              </h2>
            </div>

            {/* SELECTOR DE OPERACIÓN */}
            <div className="flex items-center bg-[#0f1f16] p-1.5 rounded-2xl border border-[#23432e] gap-1">
              {(['+', '-', '×', '÷'] as const).map((operation) => (
                <button
                  key={operation}
                  onClick={() => {
                    setOp(operation);
                    resetWorkshopFactors();
                  }}
                  className={`w-11 h-10 rounded-xl font-mono text-lg font-bold transition-all cursor-pointer flex items-center justify-center ${
                    op === operation
                      ? 'bg-[#fde047] text-[#112017] font-black shadow-xs'
                      : 'text-[#9eb6a7] hover:text-[#f5f7f2] hover:bg-[#1a3325]'
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
            <div className="bg-[#0f1f16] border border-[#23432e] rounded-2xl p-5 sm:p-6 space-y-5 shadow-inner">
              <div className="flex items-center justify-between border-b border-[#23432e] pb-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-[#9eb6a7] uppercase font-medium">Primera fracción</span>
                  <span className="text-[11px] text-[#7a9985] block">Lo que tienes al inicio</span>
                </div>
                <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
              </div>

              {/* Ajustadores numéricos */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#162a1e] p-3 rounded-xl border border-[#2b5138] space-y-1">
                  <span className="text-[#9eb6a7]">Rebanadas que tienes:</span>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setNumA(Math.max(1, numA - 1))}
                      className="w-7 h-7 bg-[#1f3a2a] hover:bg-[#284c37] text-[#f5f7f2] rounded font-bold cursor-pointer border border-[#30583f]"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-[#fde047]">{numA}</span>
                    <button
                      onClick={() => setNumA(numA + 1)}
                      className="w-7 h-7 bg-[#1f3a2a] hover:bg-[#284c37] text-[#f5f7f2] rounded font-bold cursor-pointer border border-[#30583f]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-[#162a1e] p-3 rounded-xl border border-[#2b5138] space-y-1">
                  <span className="text-[#9eb6a7]">Corte del pastel:</span>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setDenA(Math.max(2, denA - 1))}
                      className="w-7 h-7 bg-[#1f3a2a] hover:bg-[#284c37] text-[#f5f7f2] rounded font-bold cursor-pointer border border-[#30583f]"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-[#f5f7f2]">{denA}</span>
                    <button
                      onClick={() => setDenA(denA + 1)}
                      className="w-7 h-7 bg-[#1f3a2a] hover:bg-[#284c37] text-[#f5f7f2] rounded font-bold cursor-pointer border border-[#30583f]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* INYECTOR DEL FACTOR 1 PARA SUMA Y RESTA */}
              {(op === '+' || op === '-') && (
                <div className="space-y-2 pt-2 border-t border-[#23432e]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#d2e2d7]">Multiplica por el 1 neutro:</span>
                    <span className="text-[#fef08a] font-bold">· ({factorA}/{factorA})</span>
                  </div>
                  
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((k) => (
                      <button
                        key={k}
                        onClick={() => setFactorA(k)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono cursor-pointer border ${
                          factorA === k
                            ? 'bg-[#fde047] text-[#112017] font-bold border-[#fde047] shadow-xs'
                            : 'bg-[#162a1e] text-[#d2e2d7] border-[#2b5138] hover:bg-[#1f3a2a]'
                        }`}
                      >
                        {k}/{k}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#9eb6a7] pt-1">
                    <span>Rebanadas transformadas:</span>
                    <span className="text-[#fef08a] font-bold text-sm">
                      {scaledNumA} / {scaledDenA}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* TÉRMINO B */}
            <div className="bg-[#0f1f16] border border-[#23432e] rounded-2xl p-5 sm:p-6 space-y-5 shadow-inner">
              <div className="flex items-center justify-between border-b border-[#23432e] pb-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-[#9eb6a7] uppercase font-medium">Segunda fracción</span>
                  <span className="text-[11px] text-[#7a9985] block">Lo que vas a operar</span>
                </div>
                <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
              </div>

              {/* Ajustadores numéricos */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#162a1e] p-3 rounded-xl border border-[#2b5138] space-y-1">
                  <span className="text-[#9eb6a7]">Rebanadas que tienes:</span>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setNumB(Math.max(1, numB - 1))}
                      className="w-7 h-7 bg-[#1f3a2a] hover:bg-[#284c37] text-[#f5f7f2] rounded font-bold cursor-pointer border border-[#30583f]"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-[#fde047]">{numB}</span>
                    <button
                      onClick={() => setNumB(numB + 1)}
                      className="w-7 h-7 bg-[#1f3a2a] hover:bg-[#284c37] text-[#f5f7f2] rounded font-bold cursor-pointer border border-[#30583f]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-[#162a1e] p-3 rounded-xl border border-[#2b5138] space-y-1">
                  <span className="text-[#9eb6a7]">Corte del pastel:</span>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setDenB(Math.max(2, denB - 1))}
                      className="w-7 h-7 bg-[#1f3a2a] hover:bg-[#284c37] text-[#f5f7f2] rounded font-bold cursor-pointer border border-[#30583f]"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-[#f5f7f2]">{denB}</span>
                    <button
                      onClick={() => setDenB(denB + 1)}
                      className="w-7 h-7 bg-[#1f3a2a] hover:bg-[#284c37] text-[#f5f7f2] rounded font-bold cursor-pointer border border-[#30583f]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* INYECTOR DEL FACTOR 1 PARA SUMA Y RESTA */}
              {(op === '+' || op === '-') && (
                <div className="space-y-2 pt-2 border-t border-[#23432e]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#d2e2d7]">Multiplica por el 1 neutro:</span>
                    <span className="text-[#fef08a] font-bold">· ({factorB}/{factorB})</span>
                  </div>
                  
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((k) => (
                      <button
                        key={k}
                        onClick={() => setFactorB(k)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono cursor-pointer border ${
                          factorB === k
                            ? 'bg-[#fde047] text-[#112017] font-bold border-[#fde047] shadow-xs'
                            : 'bg-[#162a1e] text-[#d2e2d7] border-[#2b5138] hover:bg-[#1f3a2a]'
                        }`}
                      >
                        {k}/{k}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#9eb6a7] pt-1">
                    <span>Rebanadas transformadas:</span>
                    <span className="text-[#fef08a] font-bold text-sm">
                      {scaledNumB} / {scaledDenB}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* BOTÓN DE AUTO-EMPAREJAMIENTO DE BASES SI SON DISTINTAS */}
          {(op === '+' || op === '-') && !sameBase && (
            <div className="bg-[#1c3827] border border-[#2e593e] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-xs text-[#fef08a] font-mono font-bold block">
                  ¡Tus rebanadas tienen diferente tamaño ({scaledDenA} y {scaledDenB})!
                </span>
                <p className="text-xs text-[#c6dcce] font-mono">
                  Para sumar o restar sin enredos, córtalas al mismo tamaño común: <strong className="text-[#fde047] font-bold">{commonTarget}</strong> pedacitos.
                </p>
              </div>
              <button
                onClick={autoAlignBases}
                className="bg-[#fde047] hover:bg-[#fef08a] text-[#112017] font-black text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer font-mono whitespace-nowrap shadow-xs flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cortar al mismo tamaño</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA DESPLEGABLE ELEGANTE: ¿POR QUÉ FUNCIONA ESTO? (DEMOSTRACIÓN PURA) */}
          {/* ========================================================================= */}
          <div className="border border-[#274b34] bg-[#0f1f16] rounded-2xl overflow-hidden transition-all shadow-inner">
            <button
              onClick={() => setShowDemonstration(!showDemonstration)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-[#162a1e] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1c3827] border border-[#2e593e] flex items-center justify-center text-[#fde047]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#fef08a] font-bold block">
                    ¿Por qué funciona este truco?
                  </span>
                  <span className="text-sm text-[#c6dcce] font-medium">
                    {op === '+' && "¿Cómo se ven y se juntan los pasteles cortados iguales?"}
                    {op === '-' && "¿Cómo se quitan rebanadas del mismo tamaño sin equivocarse?"}
                    {op === '×' && "¿Qué significa multiplicar dos fracciones? (Tomar una parte de otra)"}
                    {op === '÷' && "¿Por qué se da vuelta la segunda fracción al dividir?"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#d2e2d7] bg-[#162a1e] px-3 py-1.5 rounded-xl border border-[#2b5138]">
                <span>{showDemonstration ? 'Cerrar explicación' : 'Ver el dibujo'}</span>
                {showDemonstration ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </button>

            {/* CONTENIDO DESPLEGABLE */}
            {showDemonstration && (
              <div className="p-5 sm:p-7 border-t border-[#23432e] bg-[#122419] space-y-6 animate-in fade-in duration-200">
                
                {/* EXPLICACIÓN PARA SUMA (+) */}
                {op === '+' && (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                      {/* Pastel A */}
                      <div className="bg-[#162a1e] p-4 rounded-xl border border-[#2b5138] flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-[#9eb6a7] font-medium">Pastel 1</span>
                        <GeometricPie
                          baseSlices={denA}
                          subdivisionK={factorA}
                          filledBaseSlices={numA}
                          size={130}
                          theme="amber"
                          label={`${numA}/${denA} · (${factorA}/${factorA}) = ${scaledNumA}/${scaledDenA}`}
                        />
                        <span className="text-[11px] font-mono text-[#7a9985]">
                          {factorA > 1 ? `Cada rebanada cortada en ${factorA}` : 'Corte original'}
                        </span>
                      </div>

                      <span className="text-2xl font-mono text-[#fde047] font-bold">+</span>

                      {/* Pastel B */}
                      <div className="bg-[#162a1e] p-4 rounded-xl border border-[#2b5138] flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-[#9eb6a7] font-medium">Pastel 2</span>
                        <GeometricPie
                          baseSlices={denB}
                          subdivisionK={factorB}
                          filledBaseSlices={numB}
                          size={130}
                          theme="emerald"
                          label={`${numB}/${denB} · (${factorB}/${factorB}) = ${scaledNumB}/${scaledDenB}`}
                        />
                        <span className="text-[11px] font-mono text-[#7a9985]">
                          {factorB > 1 ? `Cada rebanada cortada en ${factorB}` : 'Corte original'}
                        </span>
                      </div>

                      <span className="text-2xl font-mono text-[#8ea797] font-bold">=</span>

                      {/* Pastel Resultado */}
                      <div className="bg-[#1c3827] p-4 rounded-xl border border-[#2e593e] flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-[#fef08a] font-bold">Pastel Resultante</span>
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
                          <div className="w-[130px] h-[130px] rounded-full border border-dashed border-[#3d684e] flex items-center justify-center text-center p-2 text-xs font-mono text-[#9eb6a7]">
                            Tienen tamaños distintos: corta al mismo tamaño primero
                          </div>
                        )}
                        <span className="text-[11px] font-mono text-[#c6dcce]">
                          {sameBase ? `Suma: ${scaledNumA} + ${scaledNumB} rebanadas` : 'Corta al mismo tamaño'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#c6dcce] font-mono leading-relaxed bg-[#162a1e] p-4 rounded-xl border border-[#2b5138]">
                      💡 <strong>Fácil de recordar:</strong> Multiplicar por <strong className="text-[#fde047]">({factorA}/{factorA})</strong> no crea más pastel. Solo corta las rebanadas para que tengan el mismo tamaño que las del otro pastel. Una vez que todas miden lo mismo, las cuentas con los dedos una por una.
                    </p>
                  </div>
                )}

                {/* EXPLICACIÓN PARA RESTA (-) */}
                {op === '-' && (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                      <div className="bg-[#162a1e] p-4 rounded-xl border border-[#2b5138] flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-[#9eb6a7] font-medium">Tienes</span>
                        <GeometricPie
                          baseSlices={denA}
                          subdivisionK={factorA}
                          filledBaseSlices={numA}
                          size={130}
                          theme="amber"
                          label={`${scaledNumA}/${scaledDenA}`}
                        />
                      </div>

                      <span className="text-2xl font-mono text-[#fde047] font-bold">-</span>

                      <div className="bg-[#162a1e] p-4 rounded-xl border border-[#2b5138] flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-[#9eb6a7] font-medium">Te comes</span>
                        <GeometricPie
                          baseSlices={denB}
                          subdivisionK={factorB}
                          filledBaseSlices={numB}
                          size={130}
                          theme="emerald"
                          label={`${scaledNumB}/${scaledDenB}`}
                        />
                      </div>

                      <span className="text-2xl font-mono text-[#8ea797] font-bold">=</span>

                      <div className="bg-[#1c3827] p-4 rounded-xl border border-[#2e593e] flex flex-col items-center gap-2 text-center">
                        <span className="text-xs font-mono text-[#fef08a] font-bold">Te quedan</span>
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
                          <div className="w-[130px] h-[130px] rounded-full border border-dashed border-[#3d684e] flex items-center justify-center text-center p-2 text-xs font-mono text-[#9eb6a7]">
                            Corta al mismo tamaño para restar
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#c6dcce] font-mono leading-relaxed bg-[#162a1e] p-4 rounded-xl border border-[#2b5138]">
                      💡 No se pueden restar pedazos de distinto tamaño porque no sabrías qué te queda. Al cortarlos al mismo tamaño con el truco del 1, simplemente restas {scaledNumA} pedazos menos {scaledNumB} pedazos.
                    </p>
                  </div>
                )}

                {/* EXPLICACIÓN PARA MULTIPLICACIÓN (×) */}
                {op === '×' && (
                  <div className="space-y-4">
                    <div className="bg-[#162a1e] p-5 rounded-xl border border-[#2b5138] space-y-3">
                      <span className="text-xs font-mono text-[#fef08a] font-bold block uppercase">
                        ¿Qué significa multiplicar fracciones?
                      </span>
                      <p className="text-xs text-[#c6dcce] font-mono leading-relaxed">
                        En la vida real, multiplicar fracciones es sacar una porción <strong>DE</strong> otra porción.
                        Hacer <span className="text-[#fde047] font-bold">{numA}/{denA} × {numB}/{denB}</span> significa: 
                        tomar <span className="text-[#f5f7f2] font-bold">{numA}/{denA}</span> <strong>DE</strong> la porción de <span className="text-[#f5f7f2] font-bold">{numB}/{denB}</span>.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-center">
                        <div className="bg-[#0f1f16] p-3 rounded-lg border border-[#23432e]">
                          <span className="text-[11px] text-[#9eb6a7] block mb-2 font-medium">Porción inicial</span>
                          <GeometricPie baseSlices={denB} subdivisionK={1} filledBaseSlices={numB} size={110} theme="emerald" label={`${numB}/${denB}`} />
                        </div>
                        <div className="flex items-center justify-center text-xs font-mono text-[#d2e2d7]">
                          Cortamos esa porción en <strong className="text-[#fde047] mx-1">{denA}</strong> partes y tomamos <strong className="text-[#fde047] mx-1">{numA}</strong>
                        </div>
                        <div className="bg-[#0f1f16] p-3 rounded-lg border border-[#2e593e]">
                          <span className="text-[11px] text-[#fef08a] font-medium block mb-2">Resultado final</span>
                          <GeometricPie baseSlices={denA * denB} subdivisionK={1} filledBaseSlices={numA * numB} size={110} theme="amber" label={`${numA * numB}/${denA * denB}`} />
                        </div>
                      </div>

                      <p className="text-xs text-[#9eb6a7] font-mono pt-2">
                        Por eso es directa: arriba con arriba ({numA} × {numB} = {numA * numB}) y abajo con abajo ({denA} × {denB} = {denA * denB}). ¡Aquí jamás necesitas cortar al mismo tamaño!
                      </p>
                    </div>
                  </div>
                )}

                {/* EXPLICACIÓN PARA DIVISIÓN (÷) */}
                {op === '÷' && (
                  <div className="space-y-6">
                    <div className="bg-[#162a1e] p-5 rounded-2xl border border-[#2b5138] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#fef08a] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          ¿Qué significa <MathFraction numerator={numA} denominator={denA} size="sm" variant="accent" /> ÷ <MathFraction numerator={numB} denominator={denB} size="sm" variant="chalk" />?
                        </span>
                        <span className="text-[11px] font-mono text-[#9eb6a7]">
                          Encajar un pedazo en otro
                        </span>
                      </div>

                      <p className="text-xs text-[#c6dcce] font-mono leading-relaxed">
                        Dividir es responder una sola cosa: <strong>"¿Cuántas rebanadas de molde <MathFraction numerator={numB} denominator={denB} size="sm" variant="chalk" /> caben adentro de tu pastel <MathFraction numerator={numA} denominator={denA} size="sm" variant="accent" />?"</strong>
                      </p>

                      <DivisionVisualizer
                        numA={numA}
                        denA={denA}
                        numB={numB}
                        denB={denB}
                        size={190}
                      />
                    </div>

                    {/* DEMOSTRACIÓN ALGEBRAICA */}
                    <div className="bg-[#0f1f16] p-5 sm:p-7 rounded-2xl border border-[#23432e] space-y-5">
                      <div className="flex items-center gap-2 border-b border-[#23432e] pb-3">
                        <Sparkles className="w-4 h-4 text-[#fde047]" />
                        <span className="text-xs font-mono text-[#fef08a] font-bold uppercase tracking-wider">
                          Paso a paso: ¿Por qué se da vuelta la segunda fracción?
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                        {/* PASO 1 */}
                        <div className="bg-[#162a1e] p-4 rounded-xl border border-[#2b5138] flex flex-col items-center justify-between gap-3 min-h-[210px]">
                          <span className="text-[11px] font-mono text-[#fef08a] font-bold uppercase">Paso 1: Dos pisos</span>
                          <div className="inline-flex flex-col items-center justify-center my-auto">
                            <div className="px-3 py-1">
                              <MathFraction numerator={numA} denominator={denA} size="lg" variant="accent" />
                            </div>
                            <span className="w-24 border-t-[2.5px] border-[#f5f7f2] my-1" />
                            <div className="px-3 py-1">
                              <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                            </div>
                          </div>
                          <span className="text-[11px] text-[#9eb6a7] font-mono">
                            Escribimos la división como una sola fracción alta.
                          </span>
                        </div>

                        {/* PASO 2 */}
                        <div className="bg-[#1c3827] p-4 rounded-xl border border-[#2e593e] flex flex-col items-center justify-between gap-3 min-h-[210px]">
                          <span className="text-[11px] font-mono text-[#fef08a] font-bold uppercase">Paso 2: Multiplicar por 1</span>
                          <div className="inline-flex flex-col items-center justify-center my-auto">
                            <span className="text-[11px] font-mono text-[#c6dcce] mb-1 font-medium">Usamos el 1 invertido:</span>
                            <div className="px-2 py-0.5">
                              <MathFraction numerator={denB} denominator={numB} size="md" variant="accent" />
                            </div>
                            <span className="w-20 border-t-[2.5px] border-[#fde047] my-1" />
                            <div className="px-2 py-0.5">
                              <MathFraction numerator={denB} denominator={numB} size="md" variant="accent" />
                            </div>
                          </div>
                          <span className="text-[11px] text-[#c6dcce] font-mono">
                            Cualquier número entre sí mismo es 1.
                          </span>
                        </div>

                        {/* PASO 3 */}
                        <div className="bg-[#1a3526] p-4 rounded-xl border border-[#30583f] flex flex-col items-center justify-between gap-3 min-h-[210px]">
                          <span className="text-[11px] font-mono text-[#86efac] font-bold uppercase">Paso 3: Abajo da 1</span>
                          <div className="inline-flex flex-col items-center justify-center my-auto">
                            <div className="flex items-center gap-2 pb-1">
                              <MathFraction numerator={numA} denominator={denA} size="md" variant="chalk" />
                              <span className="text-[#fde047] font-sans font-bold text-sm">×</span>
                              <MathFraction numerator={denB} denominator={numB} size="md" variant="accent" />
                            </div>
                            <span className="w-28 border-t-[2px] border-[#3b6b4c] my-1" />
                            <div className="flex items-center gap-1 bg-[#254631] border border-[#3b6b4c] px-2 py-0.5 rounded text-[#86efac] text-xs font-mono font-bold mt-1">
                              <span>Abajo queda 1</span>
                            </div>
                          </div>
                          <span className="text-[11px] text-[#86efac] font-mono">
                            ¡La parte de abajo se cancela sola y queda 1!
                          </span>
                        </div>

                        {/* PASO 4 */}
                        <div className="bg-[#162a1e] p-4 rounded-xl border border-[#2b5138] flex flex-col items-center justify-between gap-3 min-h-[210px]">
                          <span className="text-[11px] font-mono text-[#fef08a] font-bold uppercase">Paso 4: Lo que queda</span>
                          <div className="flex items-center justify-center my-auto gap-2 text-xl font-serif text-[#f5f7f2]">
                            <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                            <span className="text-[#fde047] font-sans font-bold text-base">×</span>
                            <div className="border border-[#3d6e4f] bg-[#1a3325] px-1.5 py-0.5 rounded-xl">
                              <MathFraction numerator={denB} denominator={numB} size="lg" variant="accent" />
                            </div>
                          </div>
                          <span className="text-[11px] text-[#c6dcce] font-mono">
                            Por eso la segunda se voltea: ¡es el truco del 1!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PROCEDIMIENTO Y RESOLUCIÓN EN PIZARRA */}
          <div className="bg-[#0f1f16] border border-[#23432e] p-6 sm:p-8 rounded-2xl space-y-6 shadow-inner">
            <div className="flex items-center justify-between border-b border-[#23432e] pb-3">
              <span className="text-xs font-mono text-[#d2e2d7] uppercase tracking-wider font-bold">
                Paso a paso en la pizarra:
              </span>
              <span className="text-[11px] font-mono text-[#fef08a] font-medium">
                Sin saltarse nada
              </span>
            </div>

            {/* CASO SUMA */}
            {op === '+' && (
              <div className="space-y-6">
                {/* PASO 1 */}
                <div className="bg-[#162a1e] p-4 sm:p-5 rounded-xl border border-[#2b5138] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9eb6a7]">
                    <span className="text-[#fef08a] font-bold">PASO 1: Multiplicar por el 1 que no cambia nada</span>
                    <span className="text-[#7a9985]">x × 1 = x</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl font-serif text-[#f5f7f2] py-2">
                    <div className="flex items-center gap-2 bg-[#0f1f16] px-3 py-2 rounded-xl border border-[#23432e]">
                      <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                      <span className="text-[#8ea797] text-sm font-sans font-bold">×</span>
                      <div className="bg-[#1a3325] border border-[#3d6e4f] px-2 py-0.5 rounded-lg flex items-center">
                        <MathFraction numerator={factorA} denominator={factorA} size="lg" variant="accent" />
                      </div>
                    </div>

                    <span className="text-2xl font-mono text-[#fde047] font-bold">+</span>

                    <div className="flex items-center gap-2 bg-[#0f1f16] px-3 py-2 rounded-xl border border-[#23432e]">
                      <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                      <span className="text-[#8ea797] text-sm font-sans font-bold">×</span>
                      <div className="bg-[#1a3325] border border-[#3d6e4f] px-2 py-0.5 rounded-lg flex items-center">
                        <MathFraction numerator={factorB} denominator={factorB} size="lg" variant="accent" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#c6dcce] text-center font-mono">
                    Multiplicamos el primero por <strong className="text-[#fde047]">({factorA}/{factorA})</strong> y el segundo por <strong className="text-[#86efac]">({factorB}/{factorB})</strong>. Ambos valen 1. La cantidad de comida no cambia.
                  </p>
                </div>

                {/* PASO 2 */}
                <div className="bg-[#162a1e] p-4 sm:p-5 rounded-xl border border-[#2b5138] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9eb6a7]">
                    <span className="text-[#fef08a] font-bold">PASO 2: Multiplicamos arriba y abajo</span>
                    <span className="text-[#7a9985]">Arriba con arriba, abajo con abajo</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl font-serif text-[#f5f7f2] py-2">
                    <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-[#0f1f16] rounded-xl border border-[#23432e]">
                      <span className="text-lg font-serif text-[#fde047] font-semibold">{numA} × {factorA}</span>
                      <span className="w-full border-t border-[#2b5138] my-0.5" />
                      <span className="text-lg font-serif text-[#d2e2d7]">{denA} × {factorA}</span>
                    </div>

                    <span className="text-2xl font-mono text-[#8ea797] font-bold">+</span>

                    <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-[#0f1f16] rounded-xl border border-[#23432e]">
                      <span className="text-lg font-serif text-[#86efac] font-semibold">{numB} × {factorB}</span>
                      <span className="w-full border-t border-[#2b5138] my-0.5" />
                      <span className="text-lg font-serif text-[#d2e2d7]">{denB} × {factorB}</span>
                    </div>

                    <span className="text-[#8ea797] font-serif">=</span>

                    <MathFraction numerator={scaledNumA} denominator={scaledDenA} size="lg" variant="chalk" />
                    <span className="text-[#8ea797] font-serif">+</span>
                    <MathFraction numerator={scaledNumB} denominator={scaledDenB} size="lg" variant="chalk" />
                  </div>
                </div>

                {/* PASO 3 */}
                {sameBase ? (
                  <div className="bg-[#1c3827] p-4 sm:p-6 rounded-xl border border-[#2e593e] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#fef08a] font-bold">PASO 3: ¡Mismo tamaño conseguido ({scaledDenA})!</span>
                      <span className="text-[#c6dcce] font-mono">Contamos las rebanadas</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-3xl font-serif text-[#f5f7f2] py-2">
                      <MathFraction numerator={scaledNumA} denominator={scaledDenA} size="lg" variant="chalk" />
                      <span className="text-[#8ea797]">+</span>
                      <MathFraction numerator={scaledNumB} denominator={scaledDenA} size="lg" variant="chalk" />
                      <span className="text-[#8ea797]">=</span>
                      <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-[#14281c] rounded-xl border border-[#3b6b4c]">
                        <span className="text-xl sm:text-2xl font-serif text-[#fef08a] font-bold">{scaledNumA} + {scaledNumB}</span>
                        <span className="w-full border-t border-[#2b5138] my-0.5" />
                        <span className="text-xl sm:text-2xl font-serif text-[#d2e2d7]">{scaledDenA}</span>
                      </div>
                      <span className="text-[#8ea797]">=</span>
                      <MathFraction
                        numerator={scaledNumA + scaledNumB}
                        denominator={scaledDenA}
                        size="xl"
                        variant="accent"
                      />
                    </div>

                    <p className="text-xs text-[#c6dcce] text-center max-w-xl mx-auto font-mono">
                      Como ambas fracciones ya están cortadas al mismo tamaño ({scaledDenA}), el número de abajo se queda igual. Solo sumas los pedazos de arriba ({scaledNumA} + {scaledNumB} = {scaledNumA + scaledNumB}). ¡Listo, sin fórmulas raras!
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#162a1e] p-4 rounded-xl border border-[#2b5138] text-center text-xs text-[#9eb6a7] font-mono">
                    Los tamaños no coinciden todavía ({scaledDenA} ≠ {scaledDenB}). Toca el botón "Cortar al mismo tamaño" arriba para completar el paso 3.
                  </div>
                )}
              </div>
            )}

            {/* CASO RESTA */}
            {op === '-' && (
              <div className="space-y-6">
                <div className="bg-[#162a1e] p-4 sm:p-5 rounded-xl border border-[#2b5138] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9eb6a7]">
                    <span className="text-[#fef08a] font-bold">PASO 1: Usar el 1 para igualar los tamaños</span>
                    <span className="text-[#7a9985]">x × 1 = x</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl font-serif text-[#f5f7f2] py-2">
                    <div className="flex items-center gap-2 bg-[#0f1f16] px-3 py-2 rounded-xl border border-[#23432e]">
                      <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                      <span className="text-[#8ea797] text-sm font-sans font-bold">×</span>
                      <div className="bg-[#1a3325] border border-[#3d6e4f] px-2 py-0.5 rounded-lg flex items-center">
                        <MathFraction numerator={factorA} denominator={factorA} size="lg" variant="accent" />
                      </div>
                    </div>

                    <span className="text-2xl font-mono text-[#fde047] font-bold">-</span>

                    <div className="flex items-center gap-2 bg-[#0f1f16] px-3 py-2 rounded-xl border border-[#23432e]">
                      <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                      <span className="text-[#8ea797] text-sm font-sans font-bold">×</span>
                      <div className="bg-[#1a3325] border border-[#3d6e4f] px-2 py-0.5 rounded-lg flex items-center">
                        <MathFraction numerator={factorB} denominator={factorB} size="lg" variant="accent" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#162a1e] p-4 sm:p-5 rounded-xl border border-[#2b5138] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9eb6a7]">
                    <span className="text-[#fef08a] font-bold">PASO 2: Multiplicamos arriba y abajo</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl font-serif text-[#f5f7f2] py-2">
                    <MathFraction numerator={scaledNumA} denominator={scaledDenA} size="lg" variant="chalk" />
                    <span className="text-[#8ea797] font-serif">-</span>
                    <MathFraction numerator={scaledNumB} denominator={scaledDenB} size="lg" variant="chalk" />
                  </div>
                </div>

                {sameBase ? (
                  <div className="bg-[#1c3827] p-4 sm:p-6 rounded-xl border border-[#2e593e] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#fef08a] font-bold">PASO 3: Resta directa</span>
                      <span className="text-[#c6dcce] font-mono">Mismo corte {scaledDenA}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-3xl font-serif text-[#f5f7f2] py-2">
                      <MathFraction numerator={scaledNumA} denominator={scaledDenA} size="lg" variant="chalk" />
                      <span className="text-[#8ea797]">-</span>
                      <MathFraction numerator={scaledNumB} denominator={scaledDenA} size="lg" variant="chalk" />
                      <span className="text-[#8ea797]">=</span>
                      <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-[#14281c] rounded-xl border border-[#3b6b4c]">
                        <span className="text-xl sm:text-2xl font-serif text-[#fef08a] font-bold">{scaledNumA} - {scaledNumB}</span>
                        <span className="w-full border-t border-[#2b5138] my-0.5" />
                        <span className="text-xl sm:text-2xl font-serif text-[#d2e2d7]">{scaledDenA}</span>
                      </div>
                      <span className="text-[#8ea797]">=</span>
                      <MathFraction
                        numerator={scaledNumA - scaledNumB}
                        denominator={scaledDenA}
                        size="xl"
                        variant="accent"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#162a1e] p-4 rounded-xl border border-[#2b5138] text-center text-xs text-[#9eb6a7] font-mono">
                    Corta al mismo tamaño primero para restar directamente.
                  </div>
                )}
              </div>
            )}

            {/* CASO MULTIPLICACIÓN */}
            {op === '×' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-2xl font-serif text-[#f5f7f2] py-2">
                  <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                  <span className="text-[#fde047] font-sans font-bold">×</span>
                  <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                  <span className="text-[#8ea797]">=</span>
                  <div className="inline-flex flex-col items-center justify-center px-3 py-1 bg-[#14281c] rounded-xl border border-[#2b5138]">
                    <span className="text-xl font-serif text-[#fef08a] font-semibold">{numA} × {numB}</span>
                    <span className="w-full border-t border-[#2b5138] my-0.5" />
                    <span className="text-xl font-serif text-[#d2e2d7]">{denA} × {denB}</span>
                  </div>
                  <span className="text-[#8ea797]">=</span>
                  <MathFraction
                    numerator={numA * numB}
                    denominator={denA * denB}
                    size="xl"
                    variant="accent"
                  />
                </div>
                <p className="text-xs text-[#c6dcce] text-center max-w-xl mx-auto font-mono">
                  En línea recta: arriba con arriba ({numA} × {numB} = {numA * numB}) y abajo con abajo ({denA} × {denB} = {denA * denB}). No necesitas igualar nada porque tomas una rebanada de otra rebanada.
                </p>
              </div>
            )}

            {/* CASO DIVISIÓN */}
            {op === '÷' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-2xl font-serif text-[#f5f7f2] py-2">
                  <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                  <span className="text-[#8ea797] font-mono">÷</span>
                  <MathFraction numerator={numB} denominator={denB} size="lg" variant="chalk" />
                  <span className="text-[#8ea797]">→</span>
                  <MathFraction numerator={numA} denominator={denA} size="lg" variant="chalk" />
                  <span className="text-[#fde047] font-sans font-bold text-xl">×</span>
                  <div className="border border-[#3d6e4f] bg-[#1a3325] px-1.5 py-0.5 rounded-lg">
                    <MathFraction numerator={denB} denominator={numB} size="lg" variant="accent" />
                  </div>
                  <span className="text-[#8ea797]">=</span>
                  <MathFraction
                    numerator={numA * denB}
                    denominator={denA * numB}
                    size="xl"
                    variant="accent"
                  />
                </div>
                <p className="text-xs text-[#c6dcce] text-center max-w-xl mx-auto font-mono">
                  La división se convierte en multiplicación dando vuelta la segunda fracción ({numB}/{denB} → {denB}/{numB}). Luego multiplicas en línea recta como siempre.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
