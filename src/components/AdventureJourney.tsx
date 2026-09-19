import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

type Phase = 'welcome' | 'zoo' | 'factory' | 'balance' | 'surgeon';

export const AdventureJourney: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('welcome');

  // ========== FASE 1: ZOOLOGICO ==========
  const [zooAnimals, setZooAnimals] = useState<{ id: number; type: 'sheep' | 'cow'; x: number }[]>([
    { id: 1, type: 'sheep', x: 100 },
    { id: 2, type: 'sheep', x: 200 },
    { id: 3, type: 'cow', x: 400 },
  ]);
  const [zooMessage, setZooMessage] = useState('');
  const [zooError, setZooError] = useState(false);

  const handleZooClick = (id: number) => {
    const animal = zooAnimals.find(a => a.id === id);
    const others = zooAnimals.filter(a => a.id !== id);
    const sameType = others.find(a => a.type === animal?.type);
    
    if (sameType) {
      // Intentar combinar animales de la misma especie
      setZooAnimals(prev => prev.filter(a => a.id !== id && a.id !== sameType.id));
      setZooMessage(`✓ ¡Correcto! Combinaste 2 ${animal?.type === 'sheep' ? 'ovejas' : 'vacas'}. Ahora tienes 2${animal?.type === 'sheep' ? 'x' : 'y'}.`);
      setZooError(false);
    } else {
      setZooMessage('⚠ Solo puedes combinar animales de la misma especie. Las ovejas van con ovejas, las vacas con vacas.');
      setZooError(true);
    }
  };

  // ========== FASE 2: FABRICA ==========
  const [factoryBlocks, setFactoryBlocks] = useState<string[]>(['2x', '+', '3x']);
  const [factoryResult, setFactoryResult] = useState('');

  const addBlock = (block: string) => {
    setFactoryBlocks([...factoryBlocks, block]);
  };

  const simplifyExpression = () => {
    const expr = factoryBlocks.join(' ');
    const xTerms = expr.match(/(\d+)x/g) || [];
    const constants = expr.match(/\b\d+\b(?!x)/g) || [];
    
    const xSum = xTerms.reduce((sum, term) => sum + parseInt(term), 0);
    const constSum = constants.reduce((sum, c) => sum + parseInt(c), 0);
    
    let result = '';
    if (xSum > 0) result += `${xSum}x`;
    if (constSum > 0) result += ` + ${constSum}`;
    
    setFactoryResult(result || '0');
  };

  const resetFactory = () => {
    setFactoryBlocks(['2x', '+', '3x']);
    setFactoryResult('');
  };

  // ========== FASE 3: BALANZA ==========
  const [leftWeight, setLeftWeight] = useState(5);
  const [rightWeight, setRightWeight] = useState(5);
  const [balanceMessage, setBalanceMessage] = useState('');

  const addToBoth = (value: number) => {
    setLeftWeight(leftWeight + value);
    setRightWeight(rightWeight + value);
    setBalanceMessage(`✓ Agregaste ${value} a ambos lados. El equilibrio se mantiene: ${leftWeight + value} = ${rightWeight + value}`);
  };

  const addToLeft = (value: number) => {
    setLeftWeight(leftWeight + value);
    setBalanceMessage(`⚠ Agregaste ${value} solo a la izquierda. La balanza se desequilibró: ${leftWeight + value} ≠ ${rightWeight}`);
  };

  // ========== FASE 4: CIRUJANO ==========
  const [equation] = useState({ left: '3x + 2', right: '14' });
  const [surgerySteps, setSurgerySteps] = useState<string[]>(['3x + 2 = 14']);
  const [surgeryMessage, setSurgeryMessage] = useState('');

  const performSurgery = (operation: string, value: number, side: 'both' | 'left' | 'right') => {
    const opSymbol = operation === '+' ? '+' : operation === '-' ? '-' : operation === '*' ? '×' : '÷';
    
    if (side === 'both') {
      setSurgeryMessage(`✓ Aplicaste ${opSymbol}${value} a ambos lados. La igualdad se mantiene.`);
      setSurgerySteps([...surgerySteps, `${equation.left} ${opSymbol}${value} = ${equation.right} ${opSymbol}${value}`]);
    } else {
      setSurgeryMessage(`⚠ Aplicaste ${opSymbol}${value} solo a ${side === 'left' ? 'izquierda' : 'derecha'}. Esto rompe el equilibrio.`);
      setSurgerySteps([...surgerySteps, `⚠ ${equation.left} ${opSymbol}${value} = ${equation.right} (DESEQUILIBRIO)`]);
    }
  };

  // ========== RENDER ==========

  // Pantalla de bienvenida
  if (phase === 'welcome') {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-center shadow-xl">
        <div className="max-w-3xl w-full mx-auto">
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 mb-5 shadow-2xl">
              <span className="text-4xl font-black text-white">∑</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
              Charlemos
            </h2>
            <p className="text-xl text-slate-300 font-light">
              Matemáticas Vivas: Un viaje por el mundo del Álgebra
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Las 4 Fases de la Intuición Matemática
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0 text-xl shadow-xs">
                  🐑
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-0.5">Fase 1: El Zoológico</h4>
                  <p className="text-slate-300 text-xs">Aprende por qué no se pueden mezclar especies diferentes (términos no semejantes).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 text-xl shadow-xs">
                  🏭
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-0.5">Fase 2: La Fábrica</h4>
                  <p className="text-slate-300 text-xs">Construye expresiones algebraicas y agrupa términos semejantes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0 text-xl shadow-xs">
                  ⚖️
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-0.5">Fase 3: El Equilibrio</h4>
                  <p className="text-slate-300 text-xs">Descubre la ley de la balanza: toda acción debe ser simétrica.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-rose-500 flex items-center justify-center flex-shrink-0 text-xl shadow-xs">
                  🔬
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-0.5">Fase 4: El Cirujano</h4>
                  <p className="text-slate-300 text-xs">Aplica operaciones inversas con precisión para aislar la incógnita.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase('zoo')}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black py-4 px-10 rounded-2xl text-lg transition-all shadow-xl hover:shadow-amber-500/50 flex items-center gap-3 mx-auto cursor-pointer"
          >
            Comenzar el Viaje
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Fase 1: Zoológico
  if (phase === 'zoo') {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-900 mb-2">🐑 El Zoológico de Variables</h2>
            <p className="text-base sm:text-lg text-emerald-700">Haz clic en dos animales de la misma especie para combinarlos</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-emerald-100">
            <div className="flex justify-center gap-8 mb-8 min-h-[160px] items-center">
              {zooAnimals.map(animal => (
                <button
                  key={animal.id}
                  onClick={() => handleZooClick(animal.id)}
                  className="text-7xl hover:scale-110 transition-transform cursor-pointer focus:outline-hidden"
                  title={`Seleccionar ${animal.type === 'sheep' ? 'oveja (x)' : 'vaca (y)'}`}
                >
                  {animal.type === 'sheep' ? '🐑' : '🐄'}
                </button>
              ))}
            </div>

            {zooMessage && (
              <div className={`text-center p-4 rounded-2xl ${zooError ? 'bg-rose-100 text-rose-900 border border-rose-200' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'}`}>
                <p className="text-base font-bold">{zooMessage}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setZooAnimals([
                  { id: 1, type: 'sheep', x: 100 },
                  { id: 2, type: 'sheep', x: 200 },
                  { id: 3, type: 'cow', x: 400 },
                ]);
                setZooMessage('');
              }}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl flex items-center gap-2 border border-slate-200 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-5 h-5" />
              Reiniciar
            </button>
            <button
              onClick={() => setPhase('factory')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
            >
              Siguiente: La Fábrica
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fase 2: Fábrica
  if (phase === 'factory') {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-2">🏭 La Fábrica de Expresiones</h2>
            <p className="text-base sm:text-lg text-blue-700">Construye expresiones y simplifica términos semejantes</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border border-blue-100">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-2">Tu expresión:</h3>
              <div className="bg-slate-100 rounded-2xl p-6 min-h-[80px] flex items-center justify-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                  {factoryBlocks.join(' ')}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-2">Agregar bloques:</h3>
              <div className="flex flex-wrap gap-2.5">
                {['2x', '3x', '5', '+', '-', 'y', '2y'].map(block => (
                  <button
                    key={block}
                    onClick={() => addBlock(block)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-2.5 px-5 rounded-xl text-lg transition-colors cursor-pointer"
                  >
                    {block}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={simplifyExpression}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl text-base cursor-pointer shadow-md"
              >
                Simplificar
              </button>
              <button
                onClick={resetFactory}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
            </div>

            {factoryResult && (
              <div className="mt-6 bg-emerald-100 rounded-2xl p-6 text-center border border-emerald-200">
                <p className="text-sm font-bold text-emerald-900 mb-1">Resultado simplificado:</p>
                <p className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">{factoryResult}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPhase('zoo')}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border border-slate-200 cursor-pointer shadow-xs"
            >
              ← Volver al Zoológico
            </button>
            <button
              onClick={() => setPhase('balance')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
            >
              Siguiente: El Equilibrio
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fase 3: Balanza
  if (phase === 'balance') {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-purple-900 mb-2">⚖️ El Equilibrio Sagrado</h2>
            <p className="text-base sm:text-lg text-purple-700">Descubre la propiedad fundamental de la igualdad</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border border-purple-100">
            <div className="flex justify-around items-center mb-8">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-black text-purple-900 mb-1">{leftWeight}</div>
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Izquierda</div>
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-400">=</div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-black text-purple-900 mb-1">{rightWeight}</div>
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Derecha</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-2.5 text-center">Acciones Simétricas (a ambos lados)</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToBoth(1)}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  +1 a ambos
                </button>
                <button
                  onClick={() => addToBoth(-1)}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  -1 a ambos
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-2.5 text-center">Acciones Asimétricas (solo un lado)</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToLeft(2)}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  +2 solo izquierda
                </button>
                <button
                  onClick={() => {
                    setRightWeight(rightWeight + 2);
                    setBalanceMessage(`⚠ Agregaste 2 solo a la derecha. La balanza se desequilibró: ${leftWeight} ≠ ${rightWeight + 2}`);
                  }}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  +2 solo derecha
                </button>
              </div>
            </div>

            {balanceMessage && (
              <div className={`p-4 rounded-2xl ${balanceMessage.includes('✓') ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-rose-100 text-rose-900 border border-rose-200'}`}>
                <p className="text-base font-bold text-center">{balanceMessage}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPhase('factory')}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border border-slate-200 cursor-pointer shadow-xs"
            >
              ← Volver a la Fábrica
            </button>
            <button
              onClick={() => setPhase('surgeon')}
              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
            >
              Siguiente: El Cirujano
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fase 4: Cirujano
  if (phase === 'surgeon') {
    return (
      <div className="bg-gradient-to-br from-rose-50 to-orange-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-rose-900 mb-2">🔬 El Cirujano de Ecuaciones</h2>
            <p className="text-base sm:text-lg text-rose-700">Resuelve ecuaciones paso a paso aplicando operaciones inversas</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border border-rose-100">
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 mb-6 text-center shadow-inner">
              <div className="text-4xl sm:text-5xl font-black text-white font-mono">
                {equation.left} = {equation.right}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-2">Operación disponible:</h3>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {['+', '-', '*', '/'].map(op => (
                  <button
                    key={op}
                    className="bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold py-3.5 rounded-xl text-xl cursor-pointer transition-colors"
                  >
                    {op === '*' ? '×' : op === '/' ? '÷' : op}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-2">Aplicar (-2) a:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => performSurgery('-', 2, 'both')}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  Ambos lados
                </button>
                <button
                  onClick={() => performSurgery('-', 2, 'left')}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  Solo izquierda
                </button>
                <button
                  onClick={() => performSurgery('-', 2, 'right')}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold py-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  Solo derecha
                </button>
              </div>
            </div>

            {surgeryMessage && (
              <div className={`p-4 rounded-2xl mb-6 ${surgeryMessage.includes('✓') ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-rose-100 text-rose-900 border border-rose-200'}`}>
                <p className="text-base font-bold text-center">{surgeryMessage}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-2">Historial de operaciones:</h3>
              <div className="space-y-2">
                {surgerySteps.map((step, idx) => (
                  <div key={idx} className="bg-slate-100 rounded-xl p-3 font-mono text-sm border border-slate-200">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('balance')}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border border-slate-200 cursor-pointer shadow-xs"
            >
              ← Volver al Equilibrio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
