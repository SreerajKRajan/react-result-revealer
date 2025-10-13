export type QuestionType = 'single-choice' | 'yes-no' | 'numeric' | 'text';

export interface Option {
  value: string;
  label: string;
  conditionalQuestions?: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
  };
  conditionalOn?: {
    questionId: string;
    value: string | string[];
  };
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface ResultStatement {
  id: string;
  title: string;
  content: string;
  conditions: {
    questionId: string;
    operator: 'equals' | 'greaterThan' | 'lessThan' | 'includes' | 'and' | 'or';
    value?: string | number | string[];
    subConditions?: Array<{
      questionId: string;
      operator: 'equals' | 'greaterThan' | 'lessThan' | 'includes';
      value: string | number | string[];
    }>;
  }[];
}

export interface QuestionnaireData {
  welcome: {
    title: string;
    introduction: string[];
    areas: string[];
    disclaimer: string;
    compliance: string;
  };
  sections: Section[];
  results: ResultStatement[];
  thankYou: {
    title: string;
    introduction: string;
    benefits: string[];
    goals: string[];
    closingStatement: string;
  };
}

export type Answers = Record<string, string | number>;
