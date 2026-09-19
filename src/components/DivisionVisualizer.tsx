import React from 'react';
import { MathFraction } from './MathFraction';

interface DivisionVisualizerProps {
  numA: number; // e.g. 1
  denA: number; // e.g. 3 -> portion = 1/3 (120 deg)
  numB: number; // e.g. 1
  denB: number; // e.g. 4 -> pattern unit = 1/4 (90 deg)
  size?: number;
}

export const DivisionVisualizer: React.FC<DivisionVisualizerProps> = ({
  numA,
  denA,
  numB,
  denB,
  size = 200,
}) => {
  const center = size / 2;
  const radius = size * 0.42;

  // Fracción A (lo que tenemos): numA / denA
  const valA = (numA / denA);
  // Fracción B (la medida o rebanada patrón): numB / denB
  const valB = (numB / denB);
  // Resultado: cuántas veces cabe B en A
  const timesFits = valB > 0 ? valA / valB : 0;
  const fullTimes = Math.floor(timesFits);
  const remainderFraction = timesFits - fullTimes; // fracción de la rebanada que sobra

  // Ángulo total disponible en rad (-PI/2 es arriba)
  // Ángulo de A:
  const angleA = Math.min(2 * Math.PI, (numA / denA) * 2 * Math.PI);
  // Ángulo de B (la unidad patrón):
  const angleB = (numB / denB) * 2 * Math.PI;

  const startAngle = -Math.PI / 2;
  const endAngleA = startAngle + angleA;

  // Coordenadas para el sector A
  const xA1 = center + radius * Math.cos(startAngle);
  const yA1 = center + radius * Math.sin(startAngle);
  const xA2 = center + radius * Math.cos(endAngleA);
  const yA2 = center + radius * Math.sin(endAngleA);
  const largeArcA = angleA > Math.PI ? 1 : 0;

  const pathA = angleA >= 2 * Math.PI - 0.001
    ? `M ${center - radius} ${center} A ${radius} ${radius} 0 1 0 ${center + radius} ${center} A ${radius} ${radius} 0 1 0 ${center - radius} ${center} Z`
    : `M ${center} ${center} L ${xA1} ${yA1} A ${radius} ${radius} 0 ${largeArcA} 1 ${xA2} ${yA2} Z`;

  // Segmentos de la porción patrón B encajados dentro de A
  const fittedPatterns = [];
  let currentStart = startAngle;
  let fitsCount = 0;

  while (currentStart + 0.001 < endAngleA && fitsCount < 12) {
    const nextTarget = currentStart + angleB;
    const isFullFit = nextTarget <= endAngleA + 0.001;
    const actualEnd = Math.min(nextTarget, endAngleA);
    const spanAngle = actualEnd - currentStart;

    const x1 = center + radius * Math.cos(currentStart);
    const y1 = center + radius * Math.sin(currentStart);
    const x2 = center + radius * Math.cos(actualEnd);
    const y2 = center + radius * Math.sin(actualEnd);
    const largeArc = spanAngle > Math.PI ? 1 : 0;

    const segPath = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    fittedPatterns.push({
      index: fitsCount,
      path: segPath,
      isFullFit,
      portionOfPattern: spanAngle / angleB,
      midAngle: currentStart + spanAngle / 2,
    });

    currentStart = actualEnd;
    fitsCount++;
  }

  // Máximo común divisor para simplificar resultado
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const rawNumRes = numA * denB;
  const rawDenRes = denA * numB;
  const divisor = gcd(rawNumRes, rawDenRes);
  const simpNum = rawNumRes / divisor;
  const simpDen = rawDenRes / divisor;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-slate-950/90 rounded-2xl border border-slate-800">
      {/* GRÁFICO SUPERPUESTO */}
      <div className="relative flex flex-col items-center">
        <svg width={size} height={size} className="drop-shadow-lg overflow-visible">
          {/* Círculo base de fondo tenue (el pastel completo) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="rgba(15, 23, 42, 0.6)"
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Porción que tienes: Pastel A en amarillo translúcido */}
          <path
            d={pathA}
            fill="rgba(251, 191, 36, 0.25)"
            stroke="#fbbf24"
            strokeWidth="2"
          />

          {/* Encaje de la porción patrón B */}
          {fittedPatterns.map((seg, idx) => {
            const isFull = seg.isFullFit;
            const midX = center + (radius * 0.65) * Math.cos(seg.midAngle);
            const midY = center + (radius * 0.65) * Math.sin(seg.midAngle);

            return (
              <g key={idx}>
                <path
                  d={seg.path}
                  fill={isFull ? 'rgba(52, 211, 153, 0.7)' : 'rgba(244, 63, 94, 0.65)'}
                  stroke={isFull ? '#34d399' : '#f43f5e'}
                  strokeWidth="2"
                  strokeDasharray={isFull ? undefined : '2 2'}
                />
                {/* Etiqueta dentro de la rebanada */}
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {isFull ? `1 vez` : `+${(seg.portionOfPattern).toFixed(2).replace(/\.?0+$/, '')}`}
                </text>
              </g>
            );
          })}

          {/* Centro del pastel */}
          <circle cx={center} cy={center} r={3.5} fill="#fde68a" />
        </svg>

        <span className="text-[11px] font-mono text-slate-400 mt-2">
          Pastel superpuesto: Encaje exacto
        </span>
      </div>

      {/* EXPLICACIÓN LADO A LADO */}
      <div className="flex-1 space-y-3 text-left">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
            ¿Cómo se lee visualmente?
          </span>
        </div>

        <ul className="space-y-2 text-xs font-mono text-slate-300">
          <li className="flex items-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 shrink-0" />
            <span>
              Tienes un pedazo amarillo de <strong><MathFraction numerator={numA} denominator={denA} size="sm" variant="accent" /></strong> del pastel total.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
            <span>
              Tu molde o medida patrón verde es de <strong><MathFraction numerator={numB} denominator={denB} size="sm" variant="chalk" /></strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
            <span>
              Colocas el molde verde sobre el amarillo: 
              {fullTimes > 0 ? (
                <> Cabe <strong>{fullTimes} vez entera</strong>{remainderFraction > 0.001 ? ` y aún le sobra un pedacito.` : ` exacta.`}</>
              ) : (
                <> No alcanza a caber una vez entera porque el molde es más grande que lo que tienes.</>
              )}
            </span>
          </li>
        </ul>

        {/* RESULTADO EXACTO EN FRACCIÓN DERECHA */}
        <div className="bg-slate-900 p-3 rounded-xl border border-amber-400/30 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Total de veces que cabe:</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <MathFraction numerator={simpNum} denominator={simpDen} size="lg" variant="accent" />
            </div>
            <span className="text-xs font-mono text-amber-300 font-bold">
              ({timesFits.toFixed(2)} porciones)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
