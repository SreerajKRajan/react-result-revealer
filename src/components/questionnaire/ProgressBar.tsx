import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
  sectionTitle: string;
}

export const ProgressBar = ({ current, total, sectionTitle }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-3 mb-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{sectionTitle}</span>
        <span className="text-muted-foreground">
          Section {current} of {total}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
