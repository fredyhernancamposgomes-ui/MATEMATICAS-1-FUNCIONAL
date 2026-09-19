import React from 'react';

interface PrecisionPieProps {
  totalSlices: number;
  filledSlices: number;
  size?: number;
  interactive?: boolean;
  onSliceClick?: (index: number) => void;
  theme?: 'chalkboard' | 'paper';
  label?: string;
  id?: string;
}

export const PrecisionPie: React.FC<PrecisionPieProps> = ({
  totalSlices,
  filledSlices,
  size = 180,
  interactive = false,
  onSliceClick,
  theme = 'chalkboard',
  label,
  id,
}) => {
  const center = size / 2;
  const radius = size * 0.42;

  // Temas visuales limpios tipo pizarrón / compás
  const isChalk = theme === 'chalkboard';

  const strokeColor = isChalk ? 'rgba(255, 255, 255, 0.4)' : '#334155';
  const diskBg = isChalk ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc';
  const activeSliceFill = isChalk ? 'rgba(251, 191, 36, 0.85)' : '#0f172a'; // Tiza dorada limpia o tinta grafito
  const activeSliceStroke = isChalk ? '#fde68a' : '#020617';
  const inactiveSliceFill = isChalk ? 'rgba(255, 255, 255, 0.04)' : '#ffffff';

  const slices = [];
  const anglePerSlice = (2 * Math.PI) / Math.max(1, totalSlices);

  for (let i = 0; i < totalSlices; i++) {
    // Comenzamos desde la parte superior (-PI/2)
    const startAngle = -Math.PI / 2 + i * anglePerSlice;
    const endAngle = startAngle + anglePerSlice;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArc = anglePerSlice > Math.PI ? 1 : 0;
    const isFilled = i < filledSlices;

    const pathData =
      totalSlices === 1
        ? `M ${center - radius} ${center} A ${radius} ${radius} 0 1 0 ${center + radius} ${center} A ${radius} ${radius} 0 1 0 ${center - radius} ${center} Z`
        : `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    slices.push(
      <path
        key={i}
        d={pathData}
        fill={isFilled ? activeSliceFill : inactiveSliceFill}
        stroke={isFilled ? activeSliceStroke : strokeColor}
        strokeWidth={isFilled ? 1.75 : 1}
        className={`transition-colors duration-150 ${
          interactive ? 'cursor-pointer hover:opacity-90' : ''
        }`}
        onClick={() => interactive && onSliceClick && onSliceClick(i)}
      />
    );
  }

  return (
    <div id={id} className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Círculo base guía (línea de compás) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill={diskBg}
          stroke={strokeColor}
          strokeWidth={1}
          strokeDasharray={isChalk ? '3 3' : 'none'}
        />

        {/* Sectores angulares */}
        {slices}

        {/* Punto pivote central de compás */}
        <circle
          cx={center}
          cy={center}
          r={2.5}
          fill={isChalk ? '#ffffff' : '#0f172a'}
        />
      </svg>

      {label && (
        <span
          className={`text-xs mt-1 font-mono tracking-tight ${
            isChalk ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
};
