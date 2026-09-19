import React from 'react';
import { LabId, LearningMode } from '../types';
import { Scale, Box, Divide, CheckCircle2, Sparkles, Sliders, Compass, Layers } from 'lucide-react';

interface NavbarProps {
  currentLab: LabId;
  onSelectLab: (lab: LabId) => void;
  mode: LearningMode;
  onToggleMode: (mode: LearningMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLab,
  onSelectLab,
  mode,
  onToggleMode,
}) => {
  const labs: { id: LabId; label: string; icon: React.ReactNode; badge: string }[] = [
    {
      id: 'arithmetic_base',
      label: '0. Cimientos Aritméticos',
      icon: <Layers className="w-4 h-4" />,
      badge: 'Signos y Fracciones',
    },
    {
      id: 'concept_ab',
      label: '1. ¿Qué es a+b?',
      icon: <Box className="w-4 h-4" />,
      badge: 'Cajas y Números',
    },
    {
      id: 'balance_law',
      label: '2. Ley de la Balanza',
      icon: <Scale className="w-4 h-4" />,
      badge: 'El Equilibrio',
    },
    {
      id: 'linear_equation',
      label: '3. Resolver Ecuaciones',
      icon: <Divide className="w-4 h-4" />,
      badge: 'Paso a Paso',
    },
    {
      id: 'trap_destroyer',
      label: '4. Comprobador de Ideas',
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: 'Con Números Reales',
    },
    {
      id: 'adventure_journey',
      label: 'Aventura: 4 Fases',
      icon: <Compass className="w-4 h-4" />,
      badge: 'Zoológico a Cirujano',
    },
  ];

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <span className="text-amber-400">∑</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-950 tracking-tight text-lg">
                  Charlemos
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                  Matemáticas Vivas
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Simuladores interactivos para comprender y amar la lógica de las ecuaciones
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => onToggleMode('step_by_step')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                mode === 'step_by_step'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Muestra detalladamente cómo se cancelan los términos a ambos lados"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Modo Detallado</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleMode('agile_competitive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                mode === 'agile_competitive'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Permite manipular la ecuación con mayor agilidad"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Modo Directo</span>
            </button>
          </div>
        </div>

        {/* Labs Navigation Tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar" aria-label="Laboratorios interactivos">
          {labs.map((lab) => {
            const isActive = currentLab === lab.id;
            return (
              <button
                key={lab.id}
                type="button"
                onClick={() => onSelectLab(lab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                  {lab.icon}
                </span>
                <span>{lab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    isActive
                      ? 'bg-slate-800 text-amber-300'
                      : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {lab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
