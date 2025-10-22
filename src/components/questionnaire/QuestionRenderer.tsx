import { Question, Answers } from '@/types/questionnaire';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface QuestionRendererProps {
  question: Question;
  answer: string | number | undefined;
  onAnswer: (questionId: string, value: string | number) => void;
  allAnswers: Answers;
}

export const QuestionRenderer = ({ question, answer, onAnswer, allAnswers }: QuestionRendererProps) => {
  // Check if question should be shown based on conditional logic
  if (question.conditionalOn) {
    const dependentAnswer = allAnswers[question.conditionalOn.questionId];
    const requiredValue = question.conditionalOn.value;
    
    if (Array.isArray(requiredValue)) {
      if (!requiredValue.includes(String(dependentAnswer))) {
        return null;
      }
    } else {
      if (dependentAnswer !== requiredValue) {
        return null;
      }
    }
  }

  const renderInput = () => {
    switch (question.type) {
      case 'yes-no':
        return (
          <RadioGroup
            value={String(answer || '')}
            onValueChange={(value) => onAnswer(question.id, value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${question.id}-yes`} />
              <Label htmlFor={`${question.id}-yes`} className="cursor-pointer font-normal">
                YES
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${question.id}-no`} />
              <Label htmlFor={`${question.id}-no`} className="cursor-pointer font-normal">
                NO
              </Label>
            </div>
          </RadioGroup>
        );

      case 'single-choice':
        return (
          <RadioGroup
            value={String(answer || '')}
            onValueChange={(value) => onAnswer(question.id, value)}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                <Label 
                  htmlFor={`${question.id}-${option.value}`}
                  className="cursor-pointer font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'numeric':
        return (
          <div className="max-w-xs">
            <Input
              type="number"
              value={answer || ''}
              onChange={(e) => onAnswer(question.id, Number(e.target.value))}
              placeholder="Enter Value"
              min={question.validation?.min}
              max={question.validation?.max}
              className="text-lg"
            />
            {question.validation?.max && (
              <p className="text-sm text-muted-foreground mt-2">
                Maximum: {question.validation.max}
              </p>
            )}
          </div>
        );

      case 'text':
        return (
          <Input
            type="text"
            value={answer || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            placeholder="Your answer"
            className="max-w-md text-lg"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 animate-slide-in">
      <div>
        <Label className="text-base font-semibold text-foreground">
          {question.text}
        </Label>
        {question.validation?.required && (
          <span className="text-destructive ml-1">*</span>
        )}
      </div>
      <div className="pl-1">
        {renderInput()}
      </div>
    </div>
  );
};
