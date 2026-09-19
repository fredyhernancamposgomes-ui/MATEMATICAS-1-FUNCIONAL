import React from 'react';

interface CakePieProps {
  totalSlices: number; // Denominador
  filledSlices: number; // Numerador
  size?: number; // Diámetro en px
  interactive?: boolean;
  onSliceClick?: (index: number) => void;
  colorScheme?: 'amber' | 'indigo' | 'emerald' | 'rose';
  label?: string;
  showFractionBadge?: boolean;
  highlightCut?: boolean;
  subdividedSlices?: number; // Si se subdivide visualmente
}

export const CakePie: React.FC<CakePieProps> = ({
  totalSlices,
  filledSlices,
  size = 180,
  interactive = false,
  onSliceClick,
  colorScheme = 'amber',
  label,
  showFractionBadge = false,
  highlightCut = false,
}) => {
  const cx = 100;
  const cy = 100;
  const r = 84;

  const validTotal = Math.max(1, totalSlices);
  const validFilled = Math.max(0, Math.min(validTotal, filledSlices));
  const angleStep = (2 * Math.PI) / validTotal;

  // Esquema de colores para el pastel
  const colors = {
    amber: {
      filled: '#f59e0b', // Amber 500
      filledStroke: '#b45309', // Amber 700
      empty: '#fef3c7', // Amber 100
      emptyStroke: '#d97706',
      crust: '#92400e',
      text: '#78350f',
    },
    indigo: {
      filled: '#6366f1', // Indigo 500
      filledStroke: '#4338ca', // Indigo 700
      empty: '#e0e7ff', // Indigo 100
      emptyStroke: '#6366f1',
      crust: '#3730a3',
      text: '#312e81',
    },
    emerald: {
      filled: '#10b981', // Emerald 500
      filledStroke: '#047857', // Emerald 700
      empty: '#d1fae5', // Emerald 100
      emptyStroke: '#059669',
      crust: '#065f46',
      text: '#064e3b',
    },
    rose: {
      filled: '#f43f5e', // Rose 500
      filledStroke: '#be123c', // Rose 700
      empty: '#ffe4e6', // Rose 100
      emptyStroke: '#e11d48',
      crust: '#9f1239',
      text: '#881337',
    },
  }[colorScheme];

  // Helper para generar el arco SVG de cada rebanada
  const getSlicePath = (index: number) => {
    if (validTotal === 1) {
      return `M ${cx - r}, ${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
    }

    const startAngle = index * angleStep - Math.PI / 2;
    const endAngle = (index + 1) * angleStep - Math.PI / 2;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  };

  // Coordenadas para poner el texto en el centro de la rebanada
  const getSliceCenter = (index: number) => {
    const midAngle = (index + 0.5) * angleStep - Math.PI / 2;
    const textR = r * 0.62;
    return {
      x: cx + textR * Math.cos(midAngle),
      y: cy + textR * Math.sin(midAngle),
    };
  };

  return (
    <div className="flex flex-col items-center select-none">
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-sm transition-transform duration-200"
        >
          {/* Sombra base del plato de pastel */}
          <circle cx={cx} cy={cy + 3} r={r + 3} fill="#e2e8f0" />
          
          {/* Borde del molde o plato */}
          <circle cx={cx} cy={cy} r={r + 3} fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />

          {/* Rebanadas */}
          {Array.from({ length: validTotal }).map((_, i) => {
            const isFilled = i < validFilled;
            const pathData = getSlicePath(i);
            const center = getSliceCenter(i);

            return (
              <g
                key={i}
                onClick={() => interactive && onSliceClick && onSliceClick(i)}
                className={`transition-all duration-150 ${
                  interactive ? 'cursor-pointer hover:opacity-90' : ''
                }`}
              >
                {/* Rebanada de pastel */}
                <path
                  d={pathData}
                  fill={isFilled ? colors.filled : '#f8fafc'}
                  stroke={isFilled ? colors.filledStroke : '#cbd5e1'}
                  strokeWidth={isFilled ? '1.75' : '1.25'}
                  strokeDasharray={isFilled ? undefined : '3,3'}
                  className="transition-colors duration-200"
                />

                {/* Borde exterior de masa horneada / corteza si está llena */}
                {isFilled && validTotal > 1 && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke={colors.crust}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="opacity-70 pointer-events-none"
                  />
                )}

                {/* Etiqueta dentro de la rebanada */}
                {validTotal <= 8 && (
                  <text
                    x={center.x}
                    y={center.y + 4}
                    textAnchor="middle"
                    fontSize={validTotal > 5 ? '10' : '12'}
                    fontWeight="800"
                    fill={isFilled ? '#ffffff' : '#94a3b8'}
                    className="pointer-events-none font-mono"
                  >
                    {isFilled ? `1/${validTotal}` : ''}
                  </text>
                )}
              </g>
            );
          })}

          {/* Pivote central del pastel */}
          <circle cx={cx} cy={cy} r="4.5" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
        </svg>

        {/* Badge flotante opcional en el centro si no hay rebanadas */}
        {validFilled === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs font-bold text-slate-400 bg-white/90 px-2 py-0.5 rounded-md border border-slate-200">
              Vacío (0/{validTotal})
            </span>
          </div>
        )}
      </div>

      {/* Etiqueta o Título del pastel */}
      {label && (
        <span className="text-xs font-bold text-slate-700 mt-2 text-center">
          {label}
        </span>
      )}

      {showFractionBadge && (
        <span className="text-sm font-black text-slate-900 font-mono mt-1">
          {validFilled}/{validTotal}
        </span>
      )}
    </div>
  );
};
