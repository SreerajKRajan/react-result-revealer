import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  data: {
    title: string;
    introduction: string[];
    areas: string[];
    disclaimer: string;
    compliance: string;
  };
}

export const WelcomeScreen = ({ onStart, data }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/20">
      <Card className="w-full max-w-6xl p-8 md:p-12 animate-fade-in shadow-lg">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {data.title}
          </h1>

          <div className="space-y-4 text-foreground/90">
            {data.introduction.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-foreground">
              This questionnaire covers areas such as:
            </p>
            <ul className="space-y-2">
              {data.areas.map((area, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <p className="leading-relaxed text-foreground/90">
              {data.disclaimer}
            </p>
            <p className="leading-relaxed font-medium text-foreground">
              {data.compliance}
            </p>
          </div>

          <div className="pt-6">
            <Button 
              onClick={onStart}
              size="lg"
              className="w-full md:w-auto md:px-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md transition-all"
            >
              Start Questionnaire
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Thank you for trusting <strong>ATG – Advanced Tax Group</strong> — we look forward to helping you maximize your savings and plan for a stronger financial future.
          </p>
        </div>
      </Card>
    </div>
  );
};
