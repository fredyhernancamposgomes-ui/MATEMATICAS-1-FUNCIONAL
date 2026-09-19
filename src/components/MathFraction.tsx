import React from 'react';

interface MathFractionProps {
  numerator: React.ReactNode;
  denominator: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'chalk' | 'ink' | 'subtle' | 'accent';
  color?: string; // backwards compatibility
  className?: string;
  id?: string;
}

export const MathFraction: React.FC<MathFractionProps> = ({
  numerator,
  denominator,
  size = 'md',
  variant = 'ink',
  color,
  className = '',
  id
}) => {
  // Proporciones tipográficas estilo LaTeX / STIX Two Math
  const sizeClasses = {
    sm: 'text-sm font-medium px-1',
    md: 'text-lg sm:text-xl font-normal px-1.5',
    lg: 'text-2xl sm:text-3xl font-normal px-2',
    xl: 'text-3xl sm:text-4xl font-normal px-2.5',
    '2xl': 'text-4xl sm:text-5xl font-normal px-3',
  };

  const computedVariant = variant || (color === 'amber' ? 'accent' : 'ink');

  const variantClasses = {
    // Estilo pizarra oscura con tiza nítida
    chalk: 'text-slate-100 font-serif',
    // Estilo papel / pizarra blanca de alta definición
    ink: 'text-slate-900 font-serif',
    subtle: 'text-slate-500 font-serif',
    accent: 'text-amber-400 font-serif',
  };

  const lineBorderClasses = {
    chalk: 'border-slate-300',
    ink: 'border-slate-800',
    subtle: 'border-slate-300',
    accent: 'border-amber-400',
  };

  return (
    <span
      id={id}
      className={`inline-flex flex-col items-center justify-center align-middle select-none ${sizeClasses[size]} ${variantClasses[computedVariant]} ${className}`}
      style={{
        fontFamily: '"STIX Two Math", "KaTeX_Main", Cambria, "Times New Roman", serif',
        lineHeight: 1.1,
      }}
    >
      <span className="text-center px-1 pb-0.5 tracking-normal">
        {numerator}
      </span>
      <span
        className={`w-full border-t-[1.5px] ${lineBorderClasses[variant]} my-0.5`}
        style={{ minWidth: '1.2em' }}
      />
      <span className="text-center px-1 pt-0.5 tracking-normal">
        {denominator}
      </span>
    </span>
  );
};
