import React from 'react';
import { Eye, HelpCircle } from 'lucide-react';

interface ConceptGuideProps {
  title: string;
  description: string;
  ruleOfThumb?: string;
  actionHint?: string;
}

export const ConceptGuide: React.FC<ConceptGuideProps> = ({
  title,
  description,
  ruleOfThumb,
  actionHint,
}) => {
  return (
    <section 
      aria-label="Guía visual del concepto"
      className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 shadow-2xs"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
          <Eye className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>Principio Visual:</span>
              <span className="text-slate-950 font-extrabold">{title}</span>
            </span>

            {actionHint && (
              <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300/60 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-amber-700" />
                {actionHint}
              </span>
            )}
          </div>

          <p className="text-slate-800 text-sm font-medium leading-relaxed">
            {description}
          </p>

          {ruleOfThumb && (
            <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-xs text-slate-600 flex items-start gap-2">
              <span className="font-bold text-slate-800 shrink-0">Idea clave:</span>
              <span>{ruleOfThumb}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
