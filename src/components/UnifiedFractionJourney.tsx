import React, { useState } from 'react';
import { MathFraction } from './MathFraction';
import { CakePie } from './CakePie';
import { 
  Sparkles, 
  Scissors, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Utensils, 
  Smile, 
  Wand2, 
  HelpCircle,
  Plus,
  Minus,
  X as MultiplyIcon,
  Divide,
  RotateCcw,
  Zap,
  Flame,
  Award
} from 'lucide-react';

export const UnifiedFractionJourney: React.FC = () => {
  // 3 Actos Naturales:
  // 1: El Pastel y sus Nombres (La Realidad)
  // 2: El Cuchillo Mágico (El Cuchillo ES el 1 Disfrazado)
  // 3: El Banquete (Las 4 Operaciones sin esfuerzo)
  const [currentAct, setCurrentAct] = useState<1 | 2 | 3>(1);

  // ================= ACTO 1: EL PASTEL Y SUS NOMBRES =================
  const [act1Total, setAct1Total] = useState<number>(4);
  const [act1Filled, setAct1Filled] = useState<number>(1);
  const [clickedStoryStep, setClickedStoryStep] = useState<boolean>(false);

  // ================= ACTO 2: EL CUCHILLO ES EL 1 DISFRAZADO =================
  // Empezamos con una rebanada de 1/2 pastel
  // El niño puede usar el cuchillo para cortar cada pedazo en 2, 3 o 4 pedazos más chiquitos
  const [knifeCut, setKnifeCut] = useState<number>(1); // 1 = sin cortar (1/2), 2 = cortar en 2 (2/4), 3 = cortar en 3 (3/6), 4 = cortar en 4 (4/8)

  // Desafío Acto 2: "El Hambre del Amigo"
  // Un amigo quiere juntar 1/2 y 1/4. ¿Cómo cortamos el 1/2 para que tenga el mismo tamaño que el 1/4?
  const [friendHalfCut, setFriendHalfCut] = useState<number>(1); // Debe elegir 2 para que sea 2/4

  // ================= ACTO 3: LAS 4 AVENTURAS (OPERACIONES) =================
  const [activeOperation, setActiveOperation] = useState<'add' | 'sub' | 'mul' | 'div'>('add');

  // Suma interactiva: 1/2 + 1/4
  const [addStep, setAddStep] = useState<'problem' | 'knife' | 'ready'>('problem');

  // Resta interactiva: Tenías 3/4 y le das 1/4 a tu hermano
  const [subSlicesLeft, setSubSlicesLeft] = useState<number>(3);

  // Multiplicación interactiva: Cortar la mitad de un tercio
  const [mulStep, setMulStep] = useState<1 | 2>(1);

  // División interactiva: ¿Cuántos cuartos caben en 1 pastel entero?
  const [divFoundCount, setDivFoundCount] = useState<number>(0);

  return (
    <div className="space-y-6">
      {/* BARRA DE VIAJE: 3 ESTACIONES FLUIDAS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2 sm:p-3 shadow-xs">
        <div className="grid grid-cols-3 gap-2">
          {/* Estación 1 */}
          <button
            onClick={() => setCurrentAct(1)}
            className={`p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer text-left border ${
              currentAct === 1
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                currentAct === 1 ? 'bg-white text-amber-600' : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </span>
              <span className="text-xs sm:text-sm font-extrabold tracking-tight">El Pastel Real</span>
            </div>
            <p className={`text-[11px] hidden sm:block ${currentAct === 1 ? 'text-amber-100' : 'text-slate-400'}`}>
              ¿De dónde salen los números?
            </p>
          </button>

          {/* Estación 2 */}
          <button
            onClick={() => setCurrentAct(2)}
            className={`p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer text-left border ${
              currentAct === 2
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                currentAct === 2 ? 'bg-white text-indigo-600' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span className="text-xs sm:text-sm font-extrabold tracking-tight">El Cuchillo Mágico</span>
            </div>
            <p className={`text-[11px] hidden sm:block ${currentAct === 2 ? 'text-indigo-100' : 'text-slate-400'}`}>
              El secreto del "1 Disfrazado"
            </p>
          </button>

          {/* Estación 3 */}
          <button
            onClick={() => setCurrentAct(3)}
            className={`p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer text-left border ${
              currentAct === 3
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                currentAct === 3 ? 'bg-white text-emerald-600' : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </span>
              <span className="text-xs sm:text-sm font-extrabold tracking-tight">Las 4 Aventuras</span>
            </div>
            <p className={`text-[11px] hidden sm:block ${currentAct === 3 ? 'text-emerald-100' : 'text-slate-400'}`}>
              Sumar, restar, multiplicar y dividir
            </p>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTO 1: EL PASTEL REAL                                                    */}
      {/* ========================================================================= */}
      {currentAct === 1 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Paso 1: La Regla Más Fácil del Mundo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Una fracción no es un monstruo. Es solo un pastel cortado.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Imagina que es tu cumpleaños. El número de <strong>abajo</strong> te dice en cuántas rebanadas iguales cortaste el pastel. El número de <strong>arriba</strong> te dice cuántas tienes en tu plato.
            </p>
          </div>

          {/* El Pastel Viviente */}
          <div className="bg-amber-50/40 border border-amber-200/90 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-around gap-6">
            
            {/* El Pastel Interactivo */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
                <CakePie
                  totalSlices={act1Total}
                  filledSlices={act1Filled}
                  size={170}
                  colorScheme="amber"
                  interactive={true}
                  onSliceClick={(idx) => {
                    setAct1Filled(idx + 1);
                    setClickedStoryStep(true);
                  }}
                />
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full">
                👆 Toca las rebanadas para servirlas en tu plato
              </span>
            </div>

            {/* La Fracción Traducida a Palabras Humanas */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200/90 space-y-4 max-w-xs w-full shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Así se escribe:</span>
                <MathFraction numerator={act1Filled} denominator={act1Total} size="xl" color="amber" />
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                  <span className="font-extrabold text-amber-900 block font-math">
                    Arriba: {act1Filled} {act1Filled === 1 ? 'rebanada' : 'rebanadas'}
                  </span>
                  <span className="text-[11px] text-amber-700">Las que tienes en tu plato listas para comer.</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="font-extrabold text-slate-800 block font-math">
                    Abajo: En {act1Total} partes
                  </span>
                  <span className="text-[11px] text-slate-500">
                    El tamaño del corte. {act1Total === 2 ? 'Medios' : act1Total === 3 ? 'Tercios' : act1Total === 4 ? 'Cuartos' : act1Total === 6 ? 'Sextos' : 'Octavos'}.
                  </span>
                </div>
              </div>

              {/* Botones para cambiar el corte */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Cambia el corte del pastel:
                </span>
                <div className="flex gap-1.5">
                  {[2, 3, 4, 6, 8].map((cuts) => (
                    <button
                      key={cuts}
                      onClick={() => {
                        setAct1Total(cuts);
                        if (act1Filled > cuts) setAct1Filled(cuts);
                      }}
                      className={`flex-1 py-1 rounded-lg text-xs font-math font-bold cursor-pointer transition-all border ${
                        act1Total === cuts
                          ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cuts}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* El Puente hacia el Acto 2 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                Ahora viene el gran misterio:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                ¿Qué pasa si tienes medio pastel y quieres cortarlo en pedazos más chicos sin que se pierda nada de pastel?
              </p>
            </div>

            <button
              onClick={() => setCurrentAct(2)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>Tomar el Cuchillo Mágico</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTO 2: EL CUCHILLO ES EL "1 DISFRAZADO"                                 */}
      {/* ========================================================================= */}
      {currentAct === 2 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="bg-indigo-100 text-indigo-900 border border-indigo-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <Scissors className="w-3.5 h-3.5 text-indigo-600" />
              Paso 2: La Conexión Suprema
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Cortar con el cuchillo ES multiplicar por 1
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mucha gente se asusta cuando los maestros dicen: <em>"multiplica arriba y abajo por 2"</em>. Pero no es magia rara: <strong>¡es simplemente pasar un cuchillo a cada rebanada!</strong>
            </p>
          </div>

          {/* EL EXPERIMENTO VIVO: EL CUCHILLO EN ACCIÓN */}
          <div className="bg-indigo-50/40 border-2 border-indigo-200 rounded-3xl p-6 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                Empezamos con exactamente medio pastel (1/2):
              </span>
              <p className="text-xs text-slate-500">
                Usa los botones del cuchillo para subdividir cada mitad y observa cómo cambian los números en vivo:
              </p>
            </div>

            {/* Controles del Cuchillo */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-700 mr-2 flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5 text-indigo-600" />
                Corta cada mitad:
              </span>
              
              <button
                onClick={() => setKnifeCut(1)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs cursor-pointer transition-all border ${
                  knifeCut === 1
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Sin cortar (1/2)
              </button>

              <button
                onClick={() => setKnifeCut(2)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs cursor-pointer transition-all border ${
                  knifeCut === 2
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                En 2 rebanadas (× 2/2) ✨
              </button>

              <button
                onClick={() => setKnifeCut(3)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs cursor-pointer transition-all border ${
                  knifeCut === 3
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                En 3 rebanadas (× 3/3)
              </button>

              <button
                onClick={() => setKnifeCut(4)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs cursor-pointer transition-all border ${
                  knifeCut === 4
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                En 4 rebanadas (× 4/4)
              </button>
            </div>

            {/* El Pastel y la Ecuación Lado a Lado */}
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Lado Visual */}
              <div className="flex flex-col items-center text-center space-y-2">
                <CakePie
                  totalSlices={2 * knifeCut}
                  filledSlices={1 * knifeCut}
                  size={160}
                  colorScheme="indigo"
                />
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 block font-math">
                    {1 * knifeCut} de {2 * knifeCut} rebanadas
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {knifeCut === 1 ? 'El corte original' : `Cortaste cada rebanada en ${knifeCut} pedacitos`}
                  </span>
                </div>
              </div>

              {/* Lado Numérico */}
              <div className="space-y-4 text-center md:text-left">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    ¿Qué hiciste con los números?
                  </span>
                  
                  <div className="flex items-center justify-center md:justify-start gap-3 text-xl sm:text-2xl font-black text-slate-900 font-math">
                    <MathFraction numerator={1} denominator={2} size="md" color="amber" />
                    <span className="text-slate-300">×</span>
                    <div className="bg-indigo-50 px-2 py-1 rounded-xl border border-indigo-200 text-indigo-800">
                      <MathFraction numerator={knifeCut} denominator={knifeCut} size="md" color="indigo" />
                    </div>
                    <span className="text-slate-300">=</span>
                    <MathFraction
                      numerator={1 * knifeCut}
                      denominator={2 * knifeCut}
                      size="md"
                      color="emerald"
                    />
                  </div>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed">
                  {knifeCut === 1 ? (
                    <span>Toca los botones de arriba para pasar el cuchillo y ver cómo se viste de otra forma.</span>
                  ) : (
                    <span>
                      ¡Mira el pastel! <strong>Sigue habiendo exactamente la misma cantidad de pastel servido</strong> (la mitad). Lo único que cambió fue el tamaño del corte. Multiplicar por <strong className="font-math text-indigo-900">{knifeCut}/{knifeCut}</strong> es tu superpoder para cambiarle de ropa a las fracciones cuando quieras.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DESAFÍO RÁPIDO: "AYUDA A TU AMIGO A IGUALAR EL TAMAÑO" */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                ?
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Misión Secreta: El Plato de tu Amigo
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              Tu amigo tiene en su plato <strong>1/4 de pastel</strong>. Tú tienes <strong>1/2</strong>. No pueden comparar sus platos ni sumarlos porque los pedazos son de diferente tamaño. ¿Por cuánto tienes que cortar tu 1/2 para que tus pedazos sean cuartos?
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {[1, 2, 3, 4].map((choice) => (
                <button
                  key={choice}
                  onClick={() => setFriendHalfCut(choice)}
                  className={`py-2 px-4 rounded-xl font-math font-bold text-xs cursor-pointer transition-all border ${
                    friendHalfCut === choice
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Cortar en {choice} (× {choice}/{choice})
                </button>
              ))}
            </div>

            {friendHalfCut === 2 ? (
              <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>¡Brillante!</strong> Cortaste cada mitad en 2. Ahora tu 1/2 se convirtió en <strong className="font-math">2/4</strong>. Como ambos platos tienen cuartos, ¡ya pueden sumar y comer juntos!
                </span>
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                Tu plato actualmente tiene base <strong className="font-math">{2 * friendHalfCut}</strong>. Tu amigo necesita base <strong>4</strong>. Prueba otro corte.
              </div>
            )}
          </div>

          {/* El Puente hacia el Acto 3 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                ¡Ahora eres un maestro de las fracciones!
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                Como ya sabes cómo usar el cuchillo, ninguna suma, resta, multiplicación o división te volverá a asustar.
              </p>
            </div>

            <button
              onClick={() => setCurrentAct(3)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>Entrar al Banquete (Operaciones)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTO 3: LAS 4 AVENTURAS (SUMAR, RESTAR, MULTIPLICAR, DIVIDIR)             */}
      {/* ========================================================================= */}
      {currentAct === 3 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Paso 3: El Gran Banquete
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Las 4 Operaciones Explicadas con Sentido Común
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Elige cualquier operación. Verás que todas son cosas que ya haces en tu vida cotidiana cuando compartes pastel con tus amigos.
            </p>
          </div>

          {/* Selector de Operación */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveOperation('add')}
              className={`py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all flex items-center gap-1.5 border ${
                activeOperation === 'add'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Suma (+)</span>
            </button>

            <button
              onClick={() => setActiveOperation('sub')}
              className={`py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all flex items-center gap-1.5 border ${
                activeOperation === 'sub'
                  ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Minus className="w-4 h-4" />
              <span>Resta (-)</span>
            </button>

            <button
              onClick={() => setActiveOperation('mul')}
              className={`py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all flex items-center gap-1.5 border ${
                activeOperation === 'mul'
                  ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <MultiplyIcon className="w-4 h-4" />
              <span>Multiplicación (×)</span>
            </button>

            <button
              onClick={() => setActiveOperation('div')}
              className={`py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all flex items-center gap-1.5 border ${
                activeOperation === 'div'
                  ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Divide className="w-4 h-4" />
              <span>División (÷)</span>
            </button>
          </div>

          {/* CONTENIDO 1: SUMA (+) */}
          {activeOperation === 'add' && (
            <div className="bg-blue-50/40 border border-blue-200 rounded-2xl p-6 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                  Sumar = Poner rebanadas en el mismo plato
                </span>
                <p className="text-xs text-slate-600">
                  Queremos juntar <strong className="font-math">1/2</strong> con <strong className="font-math">1/4</strong>. Como no tienen el mismo tamaño, primero usamos nuestro cuchillo mágico.
                </p>
              </div>

              {/* Los 3 pasos interactivos de la suma */}
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setAddStep('problem')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer border ${
                    addStep === 'problem'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  1. El Problema (1/2 + 1/4)
                </button>
                <button
                  onClick={() => setAddStep('knife')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer border ${
                    addStep === 'knife'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  2. El Cuchillo (1/2 × 2/2 = 2/4)
                </button>
                <button
                  onClick={() => setAddStep('ready')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer border ${
                    addStep === 'ready'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  3. Juntar en el Plato (3/4)
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-blue-100 text-center space-y-4">
                {addStep === 'problem' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-6">
                      <div className="flex flex-col items-center">
                        <CakePie totalSlices={2} filledSlices={1} size={110} colorScheme="amber" />
                        <span className="text-xs font-bold mt-1">1/2 pastel grande</span>
                      </div>
                      <span className="text-2xl font-black text-slate-300 font-math">+</span>
                      <div className="flex flex-col items-center">
                        <CakePie totalSlices={4} filledSlices={1} size={110} colorScheme="indigo" />
                        <span className="text-xs font-bold mt-1">1/4 pastel chico</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      ¡No podemos decir que tenemos 2 medios ni 2 cuartos! Son rebanadas de diferente tamaño. Necesitamos cortar la rebanada grande.
                    </p>
                  </div>
                )}

                {addStep === 'knife' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4 text-xl sm:text-2xl font-black font-math text-slate-900">
                      <MathFraction numerator={1} denominator={2} size="md" color="amber" />
                      <span className="text-slate-300">×</span>
                      <span className="bg-amber-100 text-amber-900 px-2 py-1 rounded-xl text-sm font-bold border border-amber-300">
                        2/2 (Cuchillo)
                      </span>
                      <span className="text-slate-300">=</span>
                      <MathFraction numerator={2} denominator={4} size="md" color="emerald" />
                    </div>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Cortamos el medio pastel en 2 rebanadas. Sigue siendo la misma comida, ¡pero ahora se llama <strong>2 cuartos</strong>!
                    </p>
                  </div>
                )}

                {addStep === 'ready' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4 text-2xl font-black font-math text-slate-900">
                      <MathFraction numerator={2} denominator={4} size="lg" color="amber" />
                      <span>+</span>
                      <MathFraction numerator={1} denominator={4} size="lg" color="indigo" />
                      <span>=</span>
                      <MathFraction numerator={3} denominator={4} size="lg" color="emerald" />
                    </div>
                    <div className="flex justify-center">
                      <CakePie totalSlices={4} filledSlices={3} size={130} colorScheme="emerald" />
                    </div>
                    <p className="text-xs font-bold text-emerald-900">
                      ¡2 rebanadas + 1 rebanada = 3 cuartos de pastel! Así de simple es sumar fracciones.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONTENIDO 2: RESTA (-) */}
          {activeOperation === 'sub' && (
            <div className="bg-rose-50/40 border border-rose-200 rounded-2xl p-6 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block">
                  Restar = Comer rebanadas del plato
                </span>
                <p className="text-xs text-slate-600">
                  Tenías <strong>3/4</strong> de pastel en tu refrigerador. Llega tu hermano y se come <strong>1/4</strong>. ¿Cuánto queda?
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-rose-100 text-center space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <CakePie totalSlices={4} filledSlices={subSlicesLeft} size={150} colorScheme="rose" />
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSubSlicesLeft(Math.max(0, subSlicesLeft - 1))}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Comer 1 rebanada (-1/4)</span>
                    </button>

                    <button
                      onClick={() => setSubSlicesLeft(3)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-3 rounded-xl text-xs cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reiniciar</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 text-2xl font-black font-math text-slate-900 pt-2 border-t border-slate-100">
                  <MathFraction numerator={3} denominator={4} size="md" color="rose" />
                  <span>-</span>
                  <MathFraction numerator={3 - subSlicesLeft} denominator={4} size="md" color="slate" />
                  <span>=</span>
                  <MathFraction numerator={subSlicesLeft} denominator={4} size="lg" color="emerald" />
                </div>

                <p className="text-xs text-slate-600">
                  Los numeradores se restan (<span className="font-math font-bold">3 - {3 - subSlicesLeft} = {subSlicesLeft}</span>). El número de abajo se queda en 4 porque las rebanadas siguen teniendo el mismo tamaño de cuartos.
                </p>
              </div>
            </div>
          )}

          {/* CONTENIDO 3: MULTIPLICACIÓN (×) */}
          {activeOperation === 'mul' && (
            <div className="bg-teal-50/40 border border-teal-200 rounded-2xl p-6 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">
                  Multiplicar = Sacar una rebanada DE otra rebanada
                </span>
                <p className="text-xs text-slate-600">
                  En el mundo de los niños, <strong className="font-math">1/2 × 1/2</strong> significa: <em>"¿Cuánto es la mitad DE medio pastel?"</em>
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-teal-100 text-center space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-500 mb-1">Paso 1: Tienes medio pastel</span>
                    <CakePie totalSlices={2} filledSlices={1} size={120} colorScheme="amber" />
                    <span className="text-xs font-math font-bold mt-1 text-slate-800">1/2</span>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 flex flex-col items-center">
                    <span className="text-xs font-bold text-teal-900 mb-1">Paso 2: Cortas esa mitad por la mitad</span>
                    <CakePie totalSlices={4} filledSlices={1} size={120} colorScheme="emerald" />
                    <span className="text-xs font-math font-bold mt-1 text-emerald-900">1/4 de pastel entero</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 text-2xl font-black font-math text-slate-900 pt-2 border-t border-slate-100">
                  <MathFraction numerator={1} denominator={2} size="md" color="amber" />
                  <span className="text-slate-400">×</span>
                  <MathFraction numerator={1} denominator={2} size="md" color="indigo" />
                  <span>=</span>
                  <MathFraction numerator={1} denominator={4} size="lg" color="emerald" />
                </div>

                <div className="text-xs text-slate-600 bg-teal-50/60 p-3 rounded-xl border border-teal-200 max-w-lg mx-auto">
                  <strong>¿Por qué se multiplica en línea recta?</strong><br />
                  Arriba: <span className="font-math font-bold">1 × 1 = 1</span> (te llevas 1 rebanada).<br />
                  Abajo: <span className="font-math font-bold">2 × 2 = 4</span> (porque si partieses todo el pastel así, saldrían 4 rebanadas en total).
                </div>
              </div>
            </div>
          )}

          {/* CONTENIDO 4: DIVISIÓN (÷) */}
          {activeOperation === 'div' && (
            <div className="bg-purple-50/40 border border-purple-200 rounded-2xl p-6 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                  Dividir = "¿Cuántos pedazos de estos caben adentro?"
                </span>
                <p className="text-xs text-slate-600">
                  Si te preguntan <strong className="font-math">1 ÷ (1/4)</strong>, no te asustes. Solo te están preguntando: <em>"¿Cuántos cuartos de pastel caben adentro de 1 pastel entero?"</em>
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-purple-100 text-center space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <CakePie totalSlices={4} filledSlices={divFoundCount} size={150} colorScheme="indigo" />
                  </div>

                  <button
                    onClick={() => setDivFoundCount(Math.min(4, divFoundCount + 1))}
                    disabled={divFoundCount >= 4}
                    className={`py-2 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      divFoundCount >= 4
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {divFoundCount >= 4
                      ? '🎉 ¡Completaste el pastel con 4 cuartos!'
                      : `Acomodar otro cuarto adentro (${divFoundCount}/4)`}
                  </button>

                  {divFoundCount > 0 && (
                    <button
                      onClick={() => setDivFoundCount(0)}
                      className="text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                    >
                      Vaciar pastel
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-center gap-3 text-2xl font-black font-math text-slate-900 pt-2 border-t border-slate-100">
                  <span className="text-3xl font-black">1 pastel</span>
                  <span className="text-slate-400">÷</span>
                  <MathFraction numerator={1} denominator={4} size="md" color="indigo" />
                  <span>=</span>
                  <span className="text-4xl font-black text-purple-900 font-math">4</span>
                </div>

                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Caben exactamente <strong>4 rebanadas de 1/4</strong> para llenar 1 pastel entero. Por eso la respuesta es 4. No hay trucos raros, ¡es pura lógica de espacio!
                </p>
              </div>
            </div>
          )}

          {/* Botón para volver a empezar el viaje */}
          <div className="text-center pt-2">
            <button
              onClick={() => setCurrentAct(1)}
              className="text-xs text-slate-400 hover:text-slate-700 underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Volver a ver el viaje desde el Acto 1</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
