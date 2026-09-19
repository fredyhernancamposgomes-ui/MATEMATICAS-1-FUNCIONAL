export type LearningMode = 'step_by_step' | 'agile_competitive';

export type LabId = 'arithmetic_base' | 'adventure_journey' | 'concept_ab' | 'balance_law' | 'linear_equation' | 'trap_destroyer';

export interface PresetEquation {
  id: string;
  title: string;
  difficulty: 'básico' | 'intermedio' | 'desafío';
  initialEquation: string;
  targetVariable: string;
  leftCoeff: number;
  leftConst: number;
  rightConst: number;
  explanation: string;
}

export interface RuleCheckScenario {
  id: string;
  name: string;
  expression: string;
  mistakeIdea: string;
  testValue: number;
  whyItFails: string;
  correctLogic: string;
}
