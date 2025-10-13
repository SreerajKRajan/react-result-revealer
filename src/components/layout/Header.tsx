import atgLogo from '@/assets/atg-logo.svg';

export const Header = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={atgLogo} alt="ATG - Advanced Tax Group" className="h-12 w-auto" />
          </div>
          <div className="text-sm text-muted-foreground">
            Tax Planning Questionnaire
          </div>
        </div>
      </div>
    </header>
  );
};
