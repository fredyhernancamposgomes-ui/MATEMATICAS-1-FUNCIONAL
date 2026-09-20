import React from 'react';

interface GeometricPieProps {
  baseSlices: number;       // e.g. 3
  subdivisionK: number;     // e.g. 4 (multiplicado por 1 = 4/4) -> total 12
  filledBaseSlices: number; // e.g. 1 -> se convierten en 4 llenos de 12
  size?: number;
  label?: string;
  theme?: 'amber' | 'emerald' | 'chalk';
  id?: string;
}

export const GeometricPie: React.FC<GeometricPieProps> = ({
  baseSlices,
  subdivisionK = 1,
  filledBaseSlices,
  size = 140,
  label,
  theme = 'amber',
  id,
}) => {
  const totalSlices = Math.max(1, baseSlices * subdivisionK);
  const filledSlices = filledBaseSlices * subdivisionK;

  const center = size / 2;
  const radius = size * 0.42;

  // Paleta de tiza limpia sobre pizarra verde mate
  const colorMap = {
    amber: {
      fill: 'rgba(253, 224, 71, 0.75)', // Tiza amarilla cálida
      stroke: '#fef08a',
      subStroke: 'rgba(254, 240, 138, 0.4)',
      baseBorder: '#4a7559',
      pivot: '#fef08a',
    },
    emerald: {
      fill: 'rgba(167, 243, 208, 0.75)', // Tiza menta suave
      stroke: '#a7f3d0',
      subStroke: 'rgba(167, 243, 208, 0.4)',
      baseBorder: '#4a7559',
      pivot: '#a7f3d0',
    },
    chalk: {
      fill: 'rgba(245, 247, 242, 0.75)', // Tiza blanca pura
      stroke: '#f5f7f2',
      subStroke: 'rgba(245, 247, 242, 0.4)',
      baseBorder: '#4a7559',
      pivot: '#f5f7f2',
    },
  }[theme];

  const anglePerSlice = (2 * Math.PI) / totalSlices;
  const baseAnglePerSlice = (2 * Math.PI) / Math.max(1, baseSlices);

  const slices = [];
  for (let i = 0; i < totalSlices; i++) {
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

    // Si coincide con el corte original de base o es un nuevo corte fino
    const isBaseCut = i % subdivisionK === 0;

    slices.push(
      <path
        key={i}
        d={pathData}
        fill={isFilled ? colorMap.fill : 'rgba(255, 255, 255, 0.04)'}
        stroke={isFilled ? (isBaseCut ? colorMap.stroke : colorMap.subStroke) : 'rgba(255, 255, 255, 0.12)'}
        strokeWidth={isBaseCut ? 1.5 : 0.8}
        strokeDasharray={!isBaseCut && !isFilled ? '2 2' : 'none'}
        className="transition-all duration-300"
      />
    );
  }

  // Trazar rayos principales del pastel base para que siempre se distinga el corte original
  const majorRays = [];
  if (subdivisionK > 1 && baseSlices > 1) {
    for (let b = 0; b < baseSlices; b++) {
      const angle = -Math.PI / 2 + b * baseAnglePerSlice;
      const rx = center + radius * Math.cos(angle);
      const ry = center + radius * Math.sin(angle);
      majorRays.push(
        <line
          key={`ray-${b}`}
          x1={center}
          y1={center}
          x2={rx}
          y2={ry}
          stroke="#e8eee9"
          strokeWidth={1.5}
        />
      );
    }
  }

  return (
    <div id={id} className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Circunferencia base de compás */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="rgba(255, 255, 255, 0.03)"
          stroke="#3d684e"
          strokeWidth={1}
        />

        {/* Sectores */}
        {slices}

        {/* Líneas mayores del corte original */}
        {majorRays}

        {/* Eje de compás */}
        <circle cx={center} cy={center} r={2.5} fill={colorMap.pivot} />
      </svg>

      {label && (
        <span className="text-[11px] font-mono text-[#d2e2d7] mt-1.5 text-center font-medium">
          {label}
        </span>
      )}
    </div>
  );
};
