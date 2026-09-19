import React, { useState } from 'react';
import { CakePie } from './CakePie';
import { MathFraction } from './MathFraction';
import { 
  PieChart, 
  Plus, 
  Minus, 
  X as MultiplyIcon, 
  Divide, 
  ArrowRight, 
  Utensils, 
  Check, 
  RotateCcw,
  Sparkles,
  Layers,
  Scissors,
  Wand2
} from 'lucide-react';
import { FractionSandbox } from './FractionSandbox';

type MainSection = 'anatomy' | 'twins' | 'equalize' | 'sandbox' | 'add' | 'subtract' | 'multiply' | 'divide';

export const FractionExplainer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<MainSection>('anatomy');

  // ================= 1. ANATOMÍA INTERACTIVA (RADIOGRAFÍA) =================
  const [inspectedPart, setInspectedPart] = useState<'num' | 'bar' | 'den'>('num');
  const [anatomyDen, setAnatomyDen] = useState<number>(4);
  const [anatomyNum, setAnatomyNum] = useState<number>(3);

  const toggleAnatomySlice = (idx: number) => {
    if (idx < anatomyNum) {
      setAnatomyNum(idx);
    } else {
      setAnatomyNum(idx + 1);
    }
  };

  // ================= 2. FRACCIONES GEMELAS (EQUIVALENCIA) =================
  // Comenzamos con 1/2. Podemos subdividir multiplicando numerador y denominador por 2, 3 o 4
  const [twinMultiplier, setTwinMultiplier] = useState<number>(1); // 1 => 1/2, 2 => 2/4, 3 => 3/6, 4 => 4/8

  // ================= 3. EL LABORATORIO DE IGUALAR BASES =================
  // Reto: Queremos sumar 1/2 y 1/3.
  // El usuario puede aplicar cortes al pastel A y cortes al pastel B
  const [cutA, setCutA] = useState<number>(1); // 1 = 1/2, 2 = 2/4, 3 = 3/6
  const [cutB, setCutB] = useState<number>(1); // 1 = 1/3, 2 = 2/6

  const denA = 2 * cutA;
  const numA = 1 * cutA;
  const denB = 3 * cutB;
  const numB = 1 * cutB;
  const basesAreEqual = denA === denB; // Se igualan cuando denA === 6 y denB === 6

  // ================= 4. SUMA =================
  const [addCutApplied, setAddCutApplied] = useState<boolean>(false);

  // ================= 5. RESTA =================
  const [subAte, setSubAte] = useState<boolean>(false);

  // ================= 6. MULTIPLICACIÓN =================
  // La mitad de un tercio = 1/6
  const [multStep, setMultStep] = useState<1 | 2>(1);

  // ================= 7. DIVISIÓN =================
  // ¿Cuántos cuartos caben en 1 pastel entero? = 4
  // ¿Cuántos sextos caben en medio pastel (1/2)? = 3

  return (
    <div className="space-y-6">
      {/* Navegación visual y limpia sin aburrimiento */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-1.5 shadow-2xs">
        <div className="flex items-center overflow-x-auto gap-1 text-xs font-bold scrollbar-none pb-1 sm:pb-0">
          <button
            onClick={() => setActiveSection('anatomy')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'anatomy'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>1. La Radiografía (Partes)</span>
          </button>

          <button
            onClick={() => setActiveSection('twins')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'twins'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Fracciones Gemelas</span>
          </button>

          <button
            onClick={() => setActiveSection('equalize')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'equalize'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>3. El Cuchillo (Visual)</span>
          </button>

          <button
            onClick={() => setActiveSection('sandbox')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'sandbox'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>4. Laboratorio Mecánico (Manipular)</span>
          </button>

          <button
            onClick={() => setActiveSection('add')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'add'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>5. Sumar (+)</span>
          </button>

          <button
            onClick={() => setActiveSection('subtract')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'subtract'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Minus className="w-3.5 h-3.5" />
            <span>6. Restar (-)</span>
          </button>

          <button
            onClick={() => setActiveSection('multiply')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'multiply'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MultiplyIcon className="w-3.5 h-3.5" />
            <span>7. Multiplicar (×)</span>
          </button>

          <button
            onClick={() => setActiveSection('divide')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSection === 'divide'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Divide className="w-3.5 h-3.5" />
            <span>8. Dividir (÷)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. LA RADIOGRAFÍA: NOMBRAR LAS PARTES DE LA FRACCIÓN                      */}
      {/* ========================================================================= */}
      {activeSection === 'anatomy' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
              Paso 1: Los Nombres Reales
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              La Anatomía de una Fracción
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Toca cada parte de la fracción para ver exactamente qué significa en el pastel.
            </p>
          </div>

          {/* Grid Principal: Radiografía Gigante y Pastel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-200/80 rounded-2xl p-6">
            
            {/* Columna Izquierda: La Fracción Gigante Interactiva */}
            <div className="md:col-span-6 flex flex-col items-center justify-center space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Haz clic en cualquier número:
              </span>

              {/* Contenedor Fracción Gigante */}
              <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col items-center justify-center min-w-[200px] select-none">
                
                {/* 1. NUMERADOR */}
                <button
                  onClick={() => setInspectedPart('num')}
                  className={`w-full py-2 px-6 rounded-2xl transition-all cursor-pointer flex flex-col items-center ${
                    inspectedPart === 'num'
                      ? 'bg-amber-500 text-white scale-105 shadow-md'
                      : 'hover:bg-amber-50 text-amber-900'
                  }`}
                >
                  <span className="text-5xl font-black font-mono">{anatomyNum}</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider mt-0.5">
                    Numerador
                  </span>
                </button>

                {/* 2. RAYA DE FRACCIÓN (VÍNCULO) */}
                <button
                  onClick={() => setInspectedPart('bar')}
                  className={`w-4/5 my-2 py-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                    inspectedPart === 'bar'
                      ? 'bg-slate-900 text-white shadow-md ring-4 ring-slate-200'
                      : 'bg-slate-300 hover:bg-slate-400 text-transparent'
                  }`}
                  title="Raya de fracción (División)"
                >
                  <span className="text-[10px] font-bold">
                    {inspectedPart === 'bar' ? 'Raya (División)' : '—'}
                  </span>
                </button>

                {/* 3. DENOMINADOR / BASE */}
                <button
                  onClick={() => setInspectedPart('den')}
                  className={`w-full py-2 px-6 rounded-2xl transition-all cursor-pointer flex flex-col items-center ${
                    inspectedPart === 'den'
                      ? 'bg-indigo-600 text-white scale-105 shadow-md'
                      : 'hover:bg-indigo-50 text-indigo-900'
                  }`}
                >
                  <span className="text-5xl font-black font-mono">{anatomyDen}</span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider mt-0.5">
                    Denominador (Base)
                  </span>
                </button>
              </div>

              {/* Botoncitos para variar el numerador y denominador */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-500 font-medium">Rebanadas servidas:</span>
                <button
                  onClick={() => setAnatomyNum(Math.max(0, anatomyNum - 1))}
                  className="w-7 h-7 bg-white border border-slate-300 rounded-lg font-bold text-xs hover:bg-slate-100"
                >
                  -
                </button>
                <span className="font-mono font-bold text-xs text-slate-800">{anatomyNum}</span>
                <button
                  onClick={() => setAnatomyNum(Math.min(anatomyDen, anatomyNum + 1))}
                  className="w-7 h-7 bg-amber-500 text-white rounded-lg font-bold text-xs hover:bg-amber-600 shadow-2xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Columna Derecha: Pastel y Explicación Viva */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex justify-center">
                <CakePie
                  totalSlices={anatomyDen}
                  filledSlices={anatomyNum}
                  size={200}
                  interactive={true}
                  onSliceClick={toggleAnatomySlice}
                  colorScheme={inspectedPart === 'den' ? 'indigo' : 'amber'}
                  label="Pastel en la mesa (Toca rebanadas para servir/quitar)"
                />
              </div>

              {/* Tarjeta dinámica de la parte inspeccionada */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                {inspectedPart === 'num' && (
                  <div>
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span>1. El Numerador (El Contador)</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900">
                      Viene de la palabra latina <em>"numerare"</em> (contar).
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Responde a: <strong>¿Cuántas rebanadas tienes en tu plato ahora mismo?</strong> En este momento tienes <span className="font-bold text-amber-700">{anatomyNum}</span> rebanadas servidas de color amarillo.
                    </p>
                  </div>
                )}

                {inspectedPart === 'bar' && (
                  <div>
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                      <span>2. La Raya de Fracción (El Cuchillo)</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900">
                      Es literalmente el cuchillo que divide y reparte.
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Toda fracción es secretamente una <strong>división dormida</strong>: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded">{anatomyNum} ÷ {anatomyDen}</span>. La raya separa lo que tienes de las partes en que cortaste el pastel.
                    </p>
                  </div>
                )}

                {inspectedPart === 'den' && (
                  <div>
                    <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs uppercase tracking-wider mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      <span>3. El Denominador (El Apellido o Base)</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900">
                      Viene de <em>"denominar"</em> (darle nombre a las cosas).
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Responde a: <strong>¿En cuántas partes iguales se rebanó todo el pastel?</strong> Como se cortó en <span className="font-bold text-indigo-700">{anatomyDen}</span>, el apellido de cada rebanada es <em>"cuartos"</em>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => setActiveSection('twins')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Siguiente: Descubre las "Fracciones Gemelas"</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FRACCIONES GEMELAS (EQUIVALENCIA SIN MEMORIZAR)                        */}
      {/* ========================================================================= */}
      {activeSection === 'twins' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full border border-indigo-200">
              Paso 2: Misma Comida, Distintos Cortes
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Las Fracciones Gemelas (Equivalentes)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              ¿Sabías que 1/2, 2/4, 3/6 y 4/8 son exactamente la misma porción de comida?
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
            
            {/* Selector interactivo de subdivisión */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-xs font-bold text-slate-900 block">
                  Corta cada rebanada en trozos más finos:
                </span>
                <span className="text-[11px] text-slate-500">
                  Mira cómo el pastel sigue teniendo la misma cantidad de masa servida.
                </span>
              </div>

              <div className="flex gap-2">
                {[
                  { m: 1, label: '1/2 (Original)' },
                  { m: 2, label: '2/4 (x2 cortes)' },
                  { m: 3, label: '3/6 (x3 cortes)' },
                  { m: 4, label: '4/8 (x4 cortes)' },
                ].map((item) => (
                  <button
                    key={item.m}
                    onClick={() => setTwinMultiplier(item.m)}
                    className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                      twinMultiplier === item.m
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparación Visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Pastel en vivo */}
              <div className="flex flex-col items-center justify-center">
                <CakePie
                  totalSlices={2 * twinMultiplier}
                  filledSlices={1 * twinMultiplier}
                  size={210}
                  colorScheme="indigo"
                  label={`Pastel cortado en ${2 * twinMultiplier} partes iguales`}
                />
              </div>

              {/* Explicación Matemática Humana */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-2xl border border-indigo-200 shadow-2xs">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Fracción Base</span>
                    <MathFraction numerator={1} denominator={2} size="lg" color="default" />
                  </div>
                  <span className="text-2xl font-black text-indigo-600">=</span>
                  <div className="text-center">
                    <span className="text-[10px] text-indigo-700 uppercase font-bold block mb-1">Fracción Gemela</span>
                    <MathFraction
                      numerator={1 * twinMultiplier}
                      denominator={2 * twinMultiplier}
                      size="lg"
                      color="indigo"
                    />
                  </div>
                </div>

                <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-950 space-y-2">
                  <strong className="block font-bold text-sm text-indigo-900">
                    ¿Por qué valen lo mismo?
                  </strong>
                  <p>
                    Porque si cortas el pastel en el <strong>doble de pedazos</strong> (el número de abajo se multiplica por 2), pero al mismo tiempo tomas el <strong>doble de rebanadas</strong> (el número de arriba también por 2), en tu estómago termina exactamente la <strong>misma cantidad de comida</strong>.
                  </p>
                  <p className="font-semibold text-indigo-800">
                    ¡Este es el súper poder que usaremos en el siguiente paso para sumar cualquier fracción del mundo!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => setActiveSection('equalize')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Siguiente: El Cuchillo para Igualar Bases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. EL LABORATORIO: IGUALAR BASES ANTES DE SUMAR                           */}
      {/* ========================================================================= */}
      {activeSection === 'equalize' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
              Paso 3: El Gran Secreto de las Matemáticas
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              El Cuchillo: Cómo Igualar los Apellidos (Bases)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Queremos juntar <strong className="text-slate-900">1/2</strong> y <strong className="text-slate-900">1/3</strong>. ¡Pero sus rebanadas son de tamaños distintos! Usa el cuchillo para subdividirlos hasta que tengan el mismo tamaño.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
            
            {/* Estado de igualdad actual */}
            <div className="text-center">
              {basesAreEqual ? (
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-full font-bold text-xs animate-bounce">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>¡Bases Igualadas! Ambos pasteles ahora están cortados en SEXTOS (6)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-2 rounded-full font-bold text-xs">
                  <span>Bases Desiguales: Pastel A ({denA}) vs Pastel B ({denB}). ¡Córtalos para igualar!</span>
                </div>
              )}
            </div>

            {/* Los Dos Pasteles Cara a Cara */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              
              {/* Pastel A: 1/2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-amber-900">Pastel A (Medios)</span>
                  <MathFraction numerator={numA} denominator={denA} size="md" color="amber" />
                </div>

                <CakePie totalSlices={denA} filledSlices={numA} size={150} colorScheme="amber" />

                <div className="w-full space-y-1 text-center">
                  <span className="text-[11px] font-bold text-slate-500 block">Cuchillo Pastel A:</span>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setCutA(1)}
                      className={`px-3 py-1 text-xs rounded-lg font-bold cursor-pointer ${
                        cutA === 1 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Sin corte (1/2)
                    </button>
                    <button
                      onClick={() => setCutA(2)}
                      className={`px-3 py-1 text-xs rounded-lg font-bold cursor-pointer ${
                        cutA === 2 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      En 2 (2/4)
                    </button>
                    <button
                      onClick={() => setCutA(3)}
                      className={`px-3 py-1 text-xs rounded-lg font-bold cursor-pointer ${
                        cutA === 3 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      En 3 (3/6) ✨
                    </button>
                  </div>
                </div>
              </div>

              {/* Pastel B: 1/3 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-indigo-900">Pastel B (Tercios)</span>
                  <MathFraction numerator={numB} denominator={denB} size="md" color="indigo" />
                </div>

                <CakePie totalSlices={denB} filledSlices={numB} size={150} colorScheme="indigo" />

                <div className="w-full space-y-1 text-center">
                  <span className="text-[11px] font-bold text-slate-500 block">Cuchillo Pastel B:</span>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setCutB(1)}
                      className={`px-3 py-1 text-xs rounded-lg font-bold cursor-pointer ${
                        cutB === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Sin corte (1/3)
                    </button>
                    <button
                      onClick={() => setCutB(2)}
                      className={`px-3 py-1 text-xs rounded-lg font-bold cursor-pointer ${
                        cutB === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      En 2 (2/6) ✨
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusión cuando se igualan */}
            {basesAreEqual ? (
              <div className="bg-emerald-50 border-2 border-emerald-400 p-5 rounded-2xl text-center space-y-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  ¡El Momento de la Verdad!
                </span>
                <div className="flex items-center justify-center gap-3 text-2xl font-black font-mono text-slate-900">
                  <MathFraction numerator={numA} denominator={denA} size="md" color="amber" />
                  <span>+</span>
                  <MathFraction numerator={numB} denominator={denB} size="md" color="indigo" />
                  <span>=</span>
                  <MathFraction numerator={numA + numB} denominator={denA} size="md" color="emerald" />
                </div>
                <p className="text-xs text-slate-700 max-w-md mx-auto">
                  Como ambos son <strong>sextos</strong>, solo sumamos los pedazos: 3 rebanadas + 2 rebanadas = <strong>5 sextos (5/6)</strong>.
                </p>
                <p className="text-[11px] text-slate-500">
                  Eso que llaman "Mínimo Común Múltiplo" no es más que buscar un corte de pastel en el que ambos puedan dividirse equitativamente.
                </p>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center text-xs text-slate-600">
                💡 <em>Pista: Corta el Pastel A en 3 y el Pastel B en 2 para que ambos tengan 6 rebanadas iguales.</em>
              </div>
            )}
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => setActiveSection('sandbox')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Siguiente: Laboratorio Mecánico (Manipular Números)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LABORATORIO MECÁNICO: MULTIPLICACIÓN ESTRATÉGICA & LIBERTAD NUMÉRICA   */}
      {/* ========================================================================= */}
      {activeSection === 'sandbox' && (
        <div className="space-y-6">
          <FractionSandbox />
          <div className="text-center pt-2">
            <button
              onClick={() => setActiveSection('add')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Siguiente: Sumar Fracciones con Bases Iguales (+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SUMA (+)                                                               */}
      {/* ========================================================================= */}
      {activeSection === 'add' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 px-3 py-1 rounded-full border border-blue-200">
              Operación Fundamental 1
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Sumar Fracciones: Con la Misma Base y con Distinta Base
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Aprende el método general y definitivo: <strong>Transformar multiplicando por el 1 disfrazado</strong> para sumar con tranquilidad y razonamiento.
            </p>
          </div>

          {/* CASO 1: BASES YA IGUALES */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Caso 1: Las bases ya son iguales</span>
                <span className="text-[11px] text-slate-500">Tienen el mismo apellido (cuartos). Solo contamos las rebanadas.</span>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-math font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200">
                1/4 + 2/4 = 3/4
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                <CakePie totalSlices={4} filledSlices={1} size={130} colorScheme="amber" />
                <span className="text-xs font-bold text-slate-800 mt-2 font-math">1 rebanada (1/4)</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                <CakePie totalSlices={4} filledSlices={2} size={130} colorScheme="indigo" />
                <span className="text-xs font-bold text-slate-800 mt-2 font-math">2 rebanadas (2/4)</span>
              </div>

              <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-300 flex flex-col items-center">
                <CakePie totalSlices={4} filledSlices={3} size={130} colorScheme="emerald" />
                <span className="text-xs font-bold text-emerald-900 mt-2 font-math">Total: 3 rebanadas (3/4)</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 text-center font-medium">
              Sumamos arriba: <strong className="font-math text-slate-900">1 + 2 = 3</strong>. Abajo se mantiene el <strong className="font-math text-slate-900">4</strong>, porque el tamaño de la rebanada sigue siendo cuartos.
            </div>
          </div>

          {/* CASO 2: BASES DISTINTAS (TRANSFORMANDO CON EL 1) */}
          <div className="bg-indigo-50/40 border-2 border-indigo-200 rounded-2xl p-6 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                Caso 2: ¿Bases Distintas? Multiplicamos por 1 Estratégico
              </span>
              <p className="text-xs text-slate-600">
                Queremos sumar <strong className="font-math text-slate-900">1/2 + 1/4</strong>. La base 2 y la base 4 no coinciden. ¿Qué hacemos? <strong>Convertimos el 1/2 en cuartos multiplicando por 2/2</strong>.
              </p>
            </div>

            {/* Visualización de la Transformación */}
            <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-2xs space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xl sm:text-2xl font-black text-slate-900 font-math">
                {/* 1/2 */}
                <div className="text-center">
                  <span className="text-[10px] font-sans font-bold text-slate-400 block mb-1">Medio</span>
                  <MathFraction numerator={1} denominator={2} size="md" color="amber" />
                </div>

                <span className="text-slate-300">×</span>

                {/* 2/2 */}
                <div className="text-center bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                  <span className="text-[10px] font-sans font-bold text-amber-800 block mb-1">El 1 Disfrazado</span>
                  <MathFraction numerator={2} denominator={2} size="md" color="amber" />
                </div>

                <span className="text-slate-300">=</span>

                {/* 2/4 */}
                <div className="text-center">
                  <span className="text-[10px] font-sans font-bold text-emerald-700 block mb-1">Ahora es Cuartos</span>
                  <MathFraction numerator={2} denominator={4} size="md" color="emerald" />
                </div>
              </div>

              {/* Ahora la suma real */}
              <div className="pt-3 border-t border-slate-100 text-center space-y-2">
                <span className="text-xs font-bold text-slate-600 block">Ahora que ambas tienen base 4, la suma es directa:</span>
                <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-black font-math text-slate-900">
                  <MathFraction numerator={2} denominator={4} size="lg" color="amber" />
                  <span>+</span>
                  <MathFraction numerator={1} denominator={4} size="lg" color="indigo" />
                  <span>=</span>
                  <MathFraction numerator={3} denominator={4} size="lg" color="emerald" />
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-indigo-950 font-medium">
              💡 <strong>Cero memorización mecánica de mariposas</strong>: Identificas qué le falta a la base más chica y la transformas multiplicando arriba y abajo.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. RESTA (-)                                                              */}
      {/* ========================================================================= */}
      {activeSection === 'subtract' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-900 px-3 py-1 rounded-full border border-rose-200">
              Operación 2
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Restar Fracciones (-)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Restar es quitar o comerse rebanadas que ya estaban sobre la mesa.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6 max-w-xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-bold text-rose-800 uppercase">
                5 sextos - 2 sextos = 3 sextos
              </span>
              <div className="flex items-center justify-center gap-3 mt-2 text-2xl font-black text-slate-900 font-mono">
                <MathFraction numerator={5} denominator={6} size="md" color="amber" />
                <span>-</span>
                <MathFraction numerator={2} denominator={6} size="md" color="rose" />
                <span>=</span>
                <MathFraction numerator={subAte ? 3 : '?'} denominator={6} size="md" color={subAte ? 'emerald' : 'default'} />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <CakePie
                totalSlices={6}
                filledSlices={subAte ? 3 : 5}
                size={180}
                colorScheme={subAte ? 'emerald' : 'amber'}
                label={subAte ? 'Quedan 3 sextos (3/6 = 1/2 pastel)' : 'Pastel servido: 5 sextos (5/6)'}
              />
            </div>

            <div className="text-center">
              {!subAte ? (
                <button
                  onClick={() => setSubAte(true)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Comerse 2 rebanadas (- 2/6)</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs text-slate-700">
                    Tenías <strong>5 sextos</strong> y te comiste <strong>2 sextos</strong>. Quedan <strong>3 sextos (3/6)</strong>. Si observas el pastel, ¡3 de 6 es exactamente la mitad del pastel entero (1/2)!
                  </div>
                  <button
                    onClick={() => setSubAte(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Volver a servir</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MULTIPLICACIÓN (×)                                                     */}
      {/* ========================================================================= */}
      {activeSection === 'multiply' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-900 px-3 py-1 rounded-full border border-teal-200">
              Operación 3
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Multiplicar Fracciones (×)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Multiplicar fracciones significa: <strong>Sacar una fracción "DE" otra fracción</strong>.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-bold text-teal-800 uppercase">
                ¿Cuánto es la mitad DE la mitad de un pastel? (1/2 × 1/2)
              </span>
              <div className="flex items-center justify-center gap-3 mt-2 text-2xl font-black text-slate-900 font-mono">
                <MathFraction numerator={1} denominator={2} size="md" color="indigo" />
                <span className="text-slate-400">×</span>
                <MathFraction numerator={1} denominator={2} size="md" color="amber" />
                <span>=</span>
                <MathFraction numerator={1} denominator={4} size="md" color="emerald" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">1. Empiezas con:</span>
                <CakePie totalSlices={2} filledSlices={1} size={110} colorScheme="amber" />
                <span className="text-xs font-bold text-slate-800 mt-2">Medio pastel (1/2)</span>
              </div>

              <div className="hidden sm:flex flex-col items-center justify-center text-slate-400">
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 mb-1">
                  Cortas a la mitad
                </span>
                <ArrowRight className="w-5 h-5 text-teal-500" />
              </div>

              <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-300 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase mb-2">2. Te queda:</span>
                <CakePie totalSlices={4} filledSlices={1} size={110} colorScheme="emerald" />
                <span className="text-xs font-bold text-emerald-950 mt-2">Un cuarto de pastel (1/4)</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">
                ¿Por qué en multiplicación se multiplica en línea recta?
              </strong>
              <p>
                Arriba: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">1 × 1 = 1</code> (sigues teniendo 1 porción).<br />
                Abajo: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">2 × 2 = 4</code> (al cortar el pastel entero en 2 partes y luego otra vez en 2 partes, ahora existen 4 partes en total). ¡Por eso da <strong>1/4</strong>!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. DIVISIÓN (÷)                                                           */}
      {/* ========================================================================= */}
      {activeSection === 'divide' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-900 px-3 py-1 rounded-full border border-purple-200">
              Operación 4
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Dividir Fracciones (÷)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Dividir responde a una sola pregunta: <strong>"¿Cuántas porciones de este tamaño caben dentro?"</strong>
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-bold text-purple-800 uppercase">
                ¿Cuántos cuartos (1/4) caben en 1 pastel entero?
              </span>
              <div className="flex items-center justify-center gap-3 mt-2 text-2xl font-black text-slate-900 font-mono">
                <span className="text-3xl">1</span>
                <span className="text-slate-400">÷</span>
                <MathFraction numerator={1} denominator={4} size="md" color="indigo" />
                <span>=</span>
                <span className="text-emerald-700 text-3xl font-black">4</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-slate-800 mb-2">1 Pastel Entero</span>
                <CakePie totalSlices={1} filledSlices={1} size={130} colorScheme="amber" />
              </div>

              <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-300 flex flex-col items-center text-center space-y-2">
                <span className="text-xs font-bold text-purple-950">
                  Caben exactamente 4 platos de 1/4
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-1 rounded-lg border border-purple-200 flex items-center justify-center">
                      <CakePie totalSlices={4} filledSlices={1} size={50} colorScheme="indigo" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">
                ¿Por qué al dividir entre una fracción el número crece?
              </strong>
              <p>
                Porque las rebanadas son más pequeñas que el entero. Si tienes 1 pastel y sirves rebanadas de <strong>1/4</strong>, puedes alimentar a <strong>4 personas</strong>. Por eso <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">1 ÷ 1/4 = 4</code>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
