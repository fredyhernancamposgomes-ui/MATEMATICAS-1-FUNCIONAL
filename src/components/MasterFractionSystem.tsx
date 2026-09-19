import React, { useState } from 'react';
import { MathFraction } from './MathFraction';
import { CakePie } from './CakePie';
import { MechanicalSandbox } from './MechanicalSandbox';
import { 
  Compass, 
  Cpu, 
  Layers, 
  ArrowRight, 
  Check, 
  Sparkles,
  HelpCircle,
  Plus,
  Minus,
  X as MultiplyIcon,
  Divide,
  RotateCcw,
  BookOpen,
  Info
} from 'lucide-react';

export const MasterFractionSystem: React.FC = () => {
  // Pestañas principales de alto nivel
  // 1: Fundamento Geométrico y el "1 Disfrazado"
  // 2: Mecánica de las 4 Operaciones Explicada
  // 3: Banco de Pruebas y Manipulación Libre
  const [activeTab, setActiveTab] = useState<'visual' | 'mechanics' | 'sandbox'>('visual');

  // ================= ESTADOS PARA EL MÓDULO VISUAL =================
  const [baseDen, setBaseDen] = useState<number>(4);
  const [baseNum, setBaseNum] = useState<number>(1);
  const [multiplier, setMultiplier] = useState<number>(1); // Factor del 1 disfrazado (1, 2, 3, 4)

  // ================= ESTADOS PARA EL MÓDULO DE MECÁNICA =================
  const [selectedOp, setSelectedOp] = useState<'add' | 'sub' | 'mul' | 'div'>('add');

  return (
    <div className="space-y-6">
      {/* NAVEGADOR PRINCIPAL - SERIO, ELEGANTE Y CLARO */}
      <nav aria-label="Navegación del sistema de fracciones" className="bg-white border border-slate-200/90 rounded-2xl p-1.5 sm:p-2 shadow-2xs">
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => setActiveTab('visual')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-center gap-2 border ${
              activeTab === 'visual'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="truncate">1. Concepto y el "1"</span>
          </button>

          <button
            onClick={() => setActiveTab('mechanics')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-center gap-2 border ${
              activeTab === 'mechanics'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="truncate">2. Las 4 Operaciones</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-center gap-2 border ${
              activeTab === 'sandbox'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span className="truncate">3. Taller Mecánico</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* MÓDULO 1: LA REALIDAD FÍSICA Y LA LEY DEL "1"                             */}
      {/* ========================================================================= */}
      {activeTab === 'visual' && (
        <div className="space-y-6">
          {/* Header del módulo */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Fundamento Matemático
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Estructura de una Fracción y el Poder del "1"
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 w-fit">
                a / b
              </span>
            </div>

            {/* DICCIONARIO DE DESMITIFICACIÓN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                  El Número de Arriba (Numerador)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  En palabras formales es el <em>numerador</em>. En la realidad es simplemente <strong>cuántas partes tienes seleccionadas</strong>.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                  El Número de Abajo (Denominador)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  En palabras formales es el <em>denominador</em>. En la realidad es <strong>el tamaño del corte</strong> (en cuántas partes iguales se dividió el total).
                </p>
              </div>
            </div>
          </div>

          {/* SIMULADOR DEL "1 DISFRAZADO" */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center space-y-1 max-w-xl mx-auto">
              <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
                Propiedad Fundamental de la Fracción
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Multiplicar por 1: Cambiar de Ropa sin Cambiar de Valor
              </h3>
              <p className="text-xs text-slate-500">
                En los exámenes lo llaman <em>"Fracciones Equivalentes"</em>. En la práctica, solo estás multiplicando arriba y abajo por el mismo número.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              {/* Controles de Configuración */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Fracción base:</span>
                  <span className="text-[11px] text-slate-500">Selecciona el corte original</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-500">Arriba:</span>
                    <button
                      onClick={() => setBaseNum(Math.max(1, baseNum - 1))}
                      className="w-6 h-6 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-math font-black text-sm w-4 text-center">{baseNum}</span>
                    <button
                      onClick={() => setBaseNum(Math.min(baseDen, baseNum + 1))}
                      className="w-6 h-6 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-500">Abajo:</span>
                    <button
                      onClick={() => {
                        const n = Math.max(2, baseDen - 1);
                        setBaseDen(n);
                        if (baseNum > n) setBaseNum(n);
                      }}
                      className="w-6 h-6 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-math font-black text-sm w-4 text-center">{baseDen}</span>
                    <button
                      onClick={() => setBaseDen(Math.min(8, baseDen + 1))}
                      className="w-6 h-6 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs cursor-pointer flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Selector de Factor del 1 */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Elige el "1" que vas a inyectar (k/k):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((k) => (
                    <button
                      key={k}
                      onClick={() => setMultiplier(k)}
                      className={`py-2 px-3 rounded-xl font-math font-bold text-xs cursor-pointer transition-all border flex flex-col items-center gap-0.5 ${
                        multiplier === k
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-sm font-black">{k}/{k}</span>
                      <span className="text-[10px] font-sans opacity-80 font-normal">
                        {k === 1 ? '(Original)' : `(Subdividir en ${k})`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Visualización Dual: Gráfico + Ecuación */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Visual */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <CakePie
                    totalSlices={baseDen * multiplier}
                    filledSlices={baseNum * multiplier}
                    size={160}
                    colorScheme="indigo"
                  />
                  <div className="text-xs">
                    <span className="font-extrabold text-slate-900 block font-math">
                      {baseNum * multiplier} de {baseDen * multiplier} partes
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Misma área total • Mayor número de divisiones
                    </span>
                  </div>
                </div>

                {/* Ecuación rigurosa paso a paso */}
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Operación de Conservación:
                    </span>
                    <div className="flex flex-wrap items-center gap-3 text-xl font-math font-black text-slate-900">
                      <MathFraction numerator={baseNum} denominator={baseDen} size="md" color="amber" />
                      <span className="text-slate-400">×</span>
                      <div className="bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200 text-indigo-800">
                        <MathFraction numerator={multiplier} denominator={multiplier} size="md" color="indigo" />
                      </div>
                      <span className="text-slate-400">=</span>
                      <MathFraction
                        numerator={baseNum * multiplier}
                        denominator={baseDen * multiplier}
                        size="md"
                        color="emerald"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>La regla que siempre recordarás:</strong> Como estás multiplicando arriba y abajo por la misma cantidad, la fracción <strong>no cambió de valor</strong>. Esto es lo que te permite acomodar cualquier fracción a la base que tú necesites.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('mechanics')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Continuar a las 4 Operaciones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MÓDULO 2: LAS 4 OPERACIONES EXPLICADAS CON CLARIDAD                       */}
      {/* ========================================================================= */}
      {activeTab === 'mechanics' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Reglas de Operación
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Las 4 Operaciones Desmitificadas
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 w-fit">
                +, -, ×, ÷
              </span>
            </div>

            {/* Pestañas secundarias de operaciones */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              <button
                onClick={() => setSelectedOp('add')}
                className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all border flex items-center justify-center gap-1.5 ${
                  selectedOp === 'add'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Suma</span>
              </button>

              <button
                onClick={() => setSelectedOp('sub')}
                className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all border flex items-center justify-center gap-1.5 ${
                  selectedOp === 'sub'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Minus className="w-4 h-4" />
                <span>Resta</span>
              </button>

              <button
                onClick={() => setSelectedOp('mul')}
                className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all border flex items-center justify-center gap-1.5 ${
                  selectedOp === 'mul'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <MultiplyIcon className="w-4 h-4" />
                <span>Multiplicación</span>
              </button>

              <button
                onClick={() => setSelectedOp('div')}
                className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all border flex items-center justify-center gap-1.5 ${
                  selectedOp === 'div'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Divide className="w-4 h-4" />
                <span>División</span>
              </button>
            </div>
          </div>

          {/* CONTENIDO 1: SUMA */}
          {selectedOp === 'add' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider block">
                  Mecánica de Suma
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  ¿Cómo se suma cuando las bases son distintas?
                </h3>
              </div>

              {/* El Procedimiento Racional vs El Truco Ciego */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
                <div className="text-xs font-bold text-slate-700">
                  Ejemplo objetivo: Sumar <span className="font-math text-slate-900">1/3 + 1/4</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Paso 1 */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      1. Inyectar el "1" para igualar bases
                    </span>
                    <p className="text-xs text-slate-500">
                      Multiplicas la primera por <span className="font-math font-bold">4/4</span> y la segunda por <span className="font-math font-bold">3/3</span> para llevar ambas a base 12:
                    </p>
                    <div className="flex flex-col gap-1.5 text-xs font-math font-bold text-slate-800 pt-1">
                      <div>(1/3) × (4/4) = <strong>4/12</strong></div>
                      <div>(1/4) × (3/3) = <strong>3/12</strong></div>
                    </div>
                  </div>

                  {/* Paso 2 */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      2. Sumar solo los numeradores
                    </span>
                    <p className="text-xs text-slate-500">
                      Como la base 12 ya es idéntica, solo sumas la cantidad de partes:
                    </p>
                    <div className="text-sm font-math font-black text-emerald-800 pt-1">
                      4/12 + 3/12 = (4 + 3)/12 = <strong>7/12</strong>
                    </div>
                  </div>
                </div>

                {/* Desmitificación */}
                <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl text-xs text-slate-700 space-y-1">
                  <strong className="text-blue-950 font-bold block">
                    ¿Por qué no usamos el truco de la mariposa?
                  </strong>
                  <p>
                    El método de la mariposa es solo un atajo memorístico que nadie recuerda después del examen. Multiplicar por el 1 disfrazado es la regla algebraica universal que usarás para siempre en física, química y matemáticas avanzadas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CONTENIDO 2: RESTA */}
          {selectedOp === 'sub' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider block">
                  Mecánica de Resta
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  La Misma Ley de la Base Común
                </h3>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Restar es exactamente idéntico a sumar: <strong>solo puedes restar cuando las fracciones tienen el mismo número abajo</strong>.
                </p>

                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">Ejemplo: 5/6 - 1/2</span>
                  <div className="flex flex-wrap items-center gap-3 text-lg font-math font-black text-slate-900">
                    <span>(1/2) × (3/3) = 3/6</span>
                    <span className="text-slate-300">→</span>
                    <MathFraction numerator={5} denominator={6} size="md" color="amber" />
                    <span>-</span>
                    <MathFraction numerator={3} denominator={6} size="md" color="indigo" />
                    <span>=</span>
                    <MathFraction numerator={2} denominator={6} size="md" color="emerald" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Se restan los números de arriba (<span className="font-math font-bold">5 - 3 = 2</span>) y se conserva el 6 de abajo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CONTENIDO 3: MULTIPLICACIÓN */}
          {selectedOp === 'mul' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider block">
                  Mecánica de Multiplicación
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  En Línea Recta: Arriba con Arriba, Abajo con Abajo
                </h3>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xl font-math font-black text-slate-900">
                    <MathFraction numerator="a" denominator="b" size="md" color="amber" />
                    <span className="text-slate-400">×</span>
                    <MathFraction numerator="c" denominator="d" size="md" color="indigo" />
                    <span className="text-slate-400">=</span>
                    <div className="flex flex-col items-center justify-center font-math leading-none px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                      <span className="text-base font-bold text-slate-800 pb-0.5">a × c</span>
                      <span className="w-full border-t border-slate-400" />
                      <span className="text-base font-bold text-slate-800 pt-0.5">b × d</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 max-w-lg mx-auto text-center">
                    <strong>¿Por qué no requiere igualar bases?</strong>
                    <p>
                      Porque multiplicar fracciones no es sumar cosas iguales: es calcular la proporción de una proporción (ejemplo: <em>la mitad de un tercio = un sexto</em>).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTENIDO 4: DIVISIÓN */}
          {selectedOp === 'div' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider block">
                  Mecánica de División
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Invertir la Segunda Fracción y Multiplicar
                </h3>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-lg sm:text-xl font-math font-black text-slate-900">
                    <MathFraction numerator="a" denominator="b" size="md" color="amber" />
                    <span className="text-slate-400">÷</span>
                    <MathFraction numerator="c" denominator="d" size="md" color="indigo" />
                    <span className="text-slate-400">→</span>
                    <MathFraction numerator="a" denominator="b" size="md" color="amber" />
                    <span className="text-purple-600">×</span>
                    <div className="bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      <MathFraction numerator="d" denominator="c" size="md" color="indigo" />
                    </div>
                    <span className="text-slate-400">=</span>
                    <div className="flex flex-col items-center justify-center font-math leading-none px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                      <span className="text-base font-bold text-slate-800 pb-0.5">a × d</span>
                      <span className="w-full border-t border-slate-400" />
                      <span className="text-base font-bold text-slate-800 pt-0.5">b × c</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-purple-50/60 p-3 rounded-xl border border-purple-200 max-w-lg mx-auto">
                    <strong className="text-purple-950 block mb-1">
                      Término técnico de examen: "Multiplicar por el recíproco"
                    </strong>
                    <p>
                      En el examen te preguntarán por el <em>"recíproco"</em>. Solo recuerda: <strong>volteas de cabeza la segunda fracción</strong> y multiplicas en línea recta como siempre.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('sandbox')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Abrir el Taller Mecánico Interactivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MÓDULO 3: BANCO DE TRABAJO Y LABORATORIO LIBRE                           */}
      {/* ========================================================================= */}
      {activeTab === 'sandbox' && (
        <MechanicalSandbox />
      )}
    </div>
  );
};
