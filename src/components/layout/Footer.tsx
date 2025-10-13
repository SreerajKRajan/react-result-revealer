import atgLogoFooter from '@/assets/atg-logo-footer.jpeg';

export const Footer = () => {
  return (
    <footer className="bg-primary border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {/* <img src={atgLogoFooter} alt="ATG - Advanced Tax Group" className="h-20 w-auto" /> */}
            <img src="src/assets/ATG_logo_white_footer.svg" alt="ATG - Advanced Tax Group" className="h-16 w-auto" />

          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-background">
              © {new Date().getFullYear()} ATG – Advanced Tax Group. All rights reserved.
            </p>
            <p className="text-xs text-background mt-1">
              Professional Tax Planning & Strategy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
