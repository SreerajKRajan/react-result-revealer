import atgLogoFooter from '@/assets/atg-logo-footer.jpeg';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={atgLogoFooter} alt="ATG - Advanced Tax Group" className="h-16 w-auto" />
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ATG – Advanced Tax Group. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Professional Tax Planning & Strategy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
