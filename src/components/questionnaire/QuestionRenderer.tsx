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
        const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          
          // Allow empty input
          if (value === '') {
            onAnswer(question.id, '');
            return;
          }
          
          const numValue = Number(value);
          
          // Check if value is a valid number
          if (isNaN(numValue)) {
            return;
          }
          
          // Enforce max validation
          if (question.validation?.max !== undefined && numValue > question.validation.max) {
            onAnswer(question.id, question.validation.max);
            return;
          }
          
          // Enforce min validation
          if (question.validation?.min !== undefined && numValue < question.validation.min) {
            onAnswer(question.id, question.validation.min);
            return;
          }
          
          onAnswer(question.id, numValue);
        };

        return (
          <div className="max-w-xs">
            <Input
              type="number"
              value={answer || ''}
              onChange={handleNumericChange}
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
            {question.validation?.min !== undefined && (
              <p className="text-sm text-muted-foreground mt-1">
                Minimum: {question.validation.min}
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
