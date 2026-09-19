import React, { useState } from 'react';
import { MathFraction } from './MathFraction';
import { CakePie } from './CakePie';
import { 
  Wand2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Layers, 
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const FractionSandbox: React.FC = () => {
  // ================= 1. EL LABORATORIO DEL 1 ESTRATÉGICO =================
  const [baseNum, setBaseNum] = useState<number>(3);
  const [baseDen, setBaseDen] = useState<number>(4);
  const [factor, setFactor] = useState<number>(2);

  // ================= 2. MISIÓN DE TRANSFORMAR LA BASE =================
  // Ejemplos precargados para que el alumno razone
  const challenges = [
    { num: 2, den: 5, targetBase: 20, hint: '5 multiplicado por qué número da 20?' },
    { num: 1, den: 3, targetBase: 12, hint: '3 multiplicado por qué número da 12?' },
    { num: 3, den: 4, targetBase: 24, hint: '4 multiplicado por qué número da 24?' },
    { num: 5, den: 6, targetBase: 30, hint: '6 multiplicado por qué número da 30?' },
  ];

  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const currentChallenge = challenges[challengeIndex];
  const [userK, setUserK] = useState<number>(1);

  const isChallengeCorrect = currentChallenge.den * userK === currentChallenge.targetBase;

  // ================= 3. MINI TALLER DE SUMA TRANSFORMANDO BASES =================
  // Queremos sumar 1/4 + 1/6 sin fórmulas de mariposa
  // Denominador común objetivo: 12 (4*3 = 12, 6*2 = 12)
  const [kFractionA, setKFractionA] = useState<number>(1); // El usuario debe elegir 3 para 1/4 -> 3/12
  const [kFractionB, setKFractionB] = useState<number>(1); // El usuario debe elegir 2 para 1/6 -> 2/12

  const finalDenA = 4 * kFractionA;
  const finalNumA = 1 * kFractionA;
  const finalDenB = 6 * kFractionB;
  const finalNumB = 1 * kFractionB;

  const basesAreCommon = finalDenA === finalDenB;

  return (
    <div className="space-y-8">
      {/* TARJETA 1: LA FILOSOFÍA MATEMÁTICA - CERO FÓRMULAS CIEGAS */}
      <div className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-700" />
              La Verdadera Mecánica Algebraica
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Aprender a Manipular con Libertad
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl w-fit">
            Prohibido memorizar la mariposa
          </span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          El <strong>método de la mariposa</strong> o las fórmulas cruzadas son trucos que impiden razonar. En matemáticas superiores y en la vida real, lo que se hace es una cosa simple y poderosa: <strong>transformar la base multiplicando por el "1 disfrazado"</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              1. Multiplicar por 1
            </span>
            <p className="text-xs text-slate-500">
              Cualquier número multiplicado por 1 sigue valiendo exactamente lo mismo.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              2. El Disfraz Estratégico
            </span>
            <p className="text-xs text-slate-500">
              El 1 se puede escribir como <strong className="text-slate-700 font-math">2/2, 3/3, 5/5, k/k</strong>.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              3. Igualar Apellidos
            </span>
            <p className="text-xs text-slate-500">
              Transformas cualquier fracción hasta que tenga la misma base que la otra.
            </p>
          </div>
        </div>
      </div>

      {/* TARJETA 2: EL BANCO DE PRUEBAS DEL 1 DISFRAZADO */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
            Módulo 1: Experimentación Libre
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Transfórmalo tú mismo: ¿Qué pasa si multiplicas por 1?
          </h3>
          <p className="text-xs text-slate-500">
            Escoge cualquier fracción y aplícale un "1 disfrazado" para ver cómo cambia su ropa sin cambiar su valor.
          </p>
        </div>

        {/* Controles de Selección */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Configura tu fracción inicial:</span>
              <span className="text-[11px] text-slate-500">Prueba con cualquier combinación</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-bold text-slate-500">Numerador:</span>
                <button
                  onClick={() => setBaseNum(Math.max(1, baseNum - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xs cursor-pointer flex items-center justify-center"
                >
                  -
                </button>
                <span className="font-math font-black text-base w-5 text-center text-slate-800">{baseNum}</span>
                <button
                  onClick={() => setBaseNum(Math.min(baseDen, baseNum + 1))}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xs cursor-pointer flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-bold text-slate-500">Denominador:</span>
                <button
                  onClick={() => {
                    const next = Math.max(2, baseDen - 1);
                    setBaseDen(next);
                    if (baseNum > next) setBaseNum(next);
                  }}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xs cursor-pointer flex items-center justify-center"
                >
                  -
                </button>
                <span className="font-math font-black text-base w-5 text-center text-slate-800">{baseDen}</span>
                <button
                  onClick={() => setBaseDen(Math.min(10, baseDen + 1))}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-xs cursor-pointer flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Selector de Multiplicador Estratégico */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              Escoge el "1 Disfrazado" que vas a usar:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[2, 3, 4, 5, 10].map((k) => (
                <button
                  key={k}
                  onClick={() => setFactor(k)}
                  className={`py-2 px-3 rounded-xl font-math font-bold text-xs transition-all cursor-pointer border flex flex-col items-center gap-0.5 ${
                    factor === k
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm font-black tracking-tight">{k}/{k}</span>
                  <span className="text-[10px] font-sans opacity-80">(Factor ×{k})</span>
                </button>
              ))}
            </div>
          </div>

          {/* La Ecuación Tipográfica Impecable */}
          <div className="bg-white p-6 rounded-2xl border-2 border-indigo-100 shadow-sm">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xl sm:text-2xl font-black text-slate-900">
              
              {/* Original */}
              <div className="text-center">
                <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Tu Fracción
                </span>
                <MathFraction numerator={baseNum} denominator={baseDen} size="lg" color="amber" />
              </div>

              <span className="text-slate-300 font-math">×</span>

              {/* El 1 Disfrazado */}
              <div className="text-center bg-indigo-50/80 px-3 py-1.5 rounded-2xl border border-indigo-200">
                <span className="text-[10px] font-sans font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                  El "1 Disfrazado"
                </span>
                <MathFraction numerator={factor} denominator={factor} size="lg" color="indigo" />
              </div>

              <span className="text-slate-300 font-math">=</span>

              {/* El Procedimiento Racional */}
              <div className="text-center bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Mecánica Real
                </span>
                <div className="inline-flex flex-col items-center justify-center font-math leading-none">
                  <span className="text-base font-bold text-slate-800 pb-1">
                    {baseNum} × {factor}
                  </span>
                  <span className="w-full border-t-2 border-slate-400" />
                  <span className="text-base font-bold text-slate-800 pt-1">
                    {baseDen} × {factor}
                  </span>
                </div>
              </div>

              <span className="text-slate-300 font-math">=</span>

              {/* Resultado */}
              <div className="text-center">
                <span className="text-[10px] font-sans font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Resultado
                </span>
                <MathFraction
                  numerator={baseNum * factor}
                  denominator={baseDen * factor}
                  size="lg"
                  color="emerald"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
              ¿Viste lo que ocurrió? <strong className="text-slate-900 font-math">{baseNum}/{baseDen}</strong> y <strong className="text-emerald-800 font-math">{baseNum * factor}/{baseDen * factor}</strong> son <strong>la misma cantidad exacta</strong>. Acabas de inventarle una "ropa nueva" para usarla cuando te convenga.
            </div>
          </div>
        </div>
      </div>

      {/* TARJETA 3: LA MISIÓN MECÁNICA - ¿CÓMO LLEGAR A LA BASE QUE NECESITO? */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
            Módulo 2: Entrenamiento de Confianza
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Misión: Obligar a la Fracción a tener la Base que Necesitas
          </h3>
          <p className="text-xs text-slate-500">
            Aprende a razonar: <em>"¿Qué multiplicador debo usar para que el denominador se vuelva exactamente el número que quiero?"</em>
          </p>
        </div>

        <div className="bg-amber-50/40 border border-amber-200/90 rounded-2xl p-6 space-y-6 max-w-xl mx-auto">
          {/* Tarjeta del Reto */}
          <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tienes esta fracción:
              </span>
              <div className="mt-1">
                <MathFraction
                  numerator={currentChallenge.num}
                  denominator={currentChallenge.den}
                  size="lg"
                  color="amber"
                />
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                Base que necesitas forzar:
              </span>
              <span className="text-4xl font-black font-math text-amber-950 block mt-0.5">
                {currentChallenge.targetBase}
              </span>
            </div>
          </div>

          {/* Pregunta interactiva */}
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold text-slate-700 block">
              ¿Por cuál "1 disfrazado" debes multiplicar arriba y abajo?
            </span>
            <div className="flex justify-center gap-2">
              {[2, 3, 4, 5, 6, 7].map((k) => (
                <button
                  key={k}
                  onClick={() => setUserK(k)}
                  className={`w-11 h-11 rounded-xl font-math font-black text-sm transition-all cursor-pointer border ${
                    userK === k
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs scale-105'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  ×{k}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 italic mt-1">
              💡 {currentChallenge.hint}
            </p>
          </div>

          {/* Resultado de la manipulación */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 text-center space-y-3 shadow-2xs">
            <div className="flex items-center justify-center gap-3 text-2xl font-black text-slate-900">
              <MathFraction
                numerator={currentChallenge.num}
                denominator={currentChallenge.den}
                size="md"
                color="amber"
              />
              <span className="text-slate-300 font-math">×</span>
              <span className="bg-amber-100 text-amber-950 font-math px-2.5 py-1 rounded-xl text-base border border-amber-300 font-bold">
                {userK}/{userK}
              </span>
              <span className="text-slate-300 font-math">=</span>
              <MathFraction
                numerator={currentChallenge.num * userK}
                denominator={currentChallenge.den * userK}
                size="md"
                color={isChallengeCorrect ? 'emerald' : 'rose'}
              />
            </div>

            {isChallengeCorrect ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3.5 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-center gap-1.5 font-bold text-sm">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>¡Exacto! Base alcanzada con éxito.</span>
                </div>
                <p className="text-emerald-800">
                  {currentChallenge.den} × {userK} = <strong>{currentChallenge.targetBase}</strong>. Multiplicaste arriba y abajo por {userK}, así que la fracción sigue valiendo lo mismo, pero ahora tiene la base perfecta.
                </p>
              </div>
            ) : (
              <div className="text-xs text-rose-600 font-semibold">
                Actualmente el denominador da {currentChallenge.den * userK}. ¡Necesitamos que dé {currentChallenge.targetBase}! Prueba otro factor.
              </div>
            )}
          </div>

          {/* Selector de otros desafíos */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-500 mr-1">Probar otro caso:</span>
            {challenges.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setChallengeIndex(idx);
                  setUserK(1);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  challengeIndex === idx
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TARJETA 4: APLICACIÓN PRÁCTICA - SUMAR 1/4 + 1/6 SIN MARIPOSAS */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
            Módulo 3: El Gran Reto
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Sumar 1/4 + 1/6 usando Transformación de Bases
          </h3>
          <p className="text-xs text-slate-500">
            Los denominadores son 4 y 6. Queremos que ambos lleguen a la base <strong>12</strong>. Encuentra el "1 disfrazado" para cada una.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Fracción A: 1/4 hacia 12 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Fracción A:</span>
                <MathFraction numerator={1} denominator={4} size="md" color="amber" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-600 block">
                  ¿Por qué número multiplicas a 1/4 para que su base sea 12?
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((k) => (
                    <button
                      key={k}
                      onClick={() => setKFractionA(k)}
                      className={`flex-1 py-1.5 rounded-xl font-math font-bold text-xs cursor-pointer border ${
                        kFractionA === k
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      × ({k}/{k})
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-center">
                <span className="text-[10px] text-amber-800 font-bold uppercase block mb-1">Resultado A:</span>
                <MathFraction numerator={finalNumA} denominator={finalDenA} size="md" color="amber" />
                <span className="text-xs block text-slate-500 mt-1 font-math">Base actual: {finalDenA}</span>
              </div>
            </div>

            {/* Fracción B: 1/6 hacia 12 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Fracción B:</span>
                <MathFraction numerator={1} denominator={6} size="md" color="indigo" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-600 block">
                  ¿Por qué número multiplicas a 1/6 para que su base sea 12?
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((k) => (
                    <button
                      key={k}
                      onClick={() => setKFractionB(k)}
                      className={`flex-1 py-1.5 rounded-xl font-math font-bold text-xs cursor-pointer border ${
                        kFractionB === k
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      × ({k}/{k})
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-200 text-center">
                <span className="text-[10px] text-indigo-800 font-bold uppercase block mb-1">Resultado B:</span>
                <MathFraction numerator={finalNumB} denominator={finalDenB} size="md" color="indigo" />
                <span className="text-xs block text-slate-500 mt-1 font-math">Base actual: {finalDenB}</span>
              </div>
            </div>
          </div>

          {/* Conclusión de la Suma */}
          {basesAreCommon ? (
            <div className="bg-emerald-50 border-2 border-emerald-400 p-5 rounded-2xl text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>¡Bases completamente igualadas en 12!</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-2xl font-black text-slate-900 font-math">
                <MathFraction numerator={finalNumA} denominator={finalDenA} size="lg" color="amber" />
                <span>+</span>
                <MathFraction numerator={finalNumB} denominator={finalDenB} size="lg" color="indigo" />
                <span>=</span>
                <MathFraction numerator={finalNumA + finalNumB} denominator={finalDenA} size="lg" color="emerald" />
              </div>
              <p className="text-xs text-slate-700 max-w-md mx-auto">
                Multiplicaste <strong className="font-math text-amber-900">1/4 por 3/3 = 3/12</strong> y <strong className="font-math text-indigo-900">1/6 por 2/2 = 2/12</strong>. Ahora sumas directamente los numeradores: <span className="font-math font-bold">3 + 2 = 5/12</span>.
              </p>
              <p className="text-xs font-bold text-emerald-900">
                ¡Esto es pensar como un matemático real! Sin memorizar mariposas ni fórmulas ciegas.
              </p>
            </div>
          ) : (
            <div className="bg-amber-100/70 border border-amber-300 p-4 rounded-xl text-center text-xs text-amber-950 font-medium">
              Aún no coinciden: Tienes base {finalDenA} en A y base {finalDenB} en B. Busca que ambas tengan base 12 (Multiplica A por 3/3 y B por 2/2).
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
