import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <a
            href="https://parvoz-company.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <div className="text-lg font-semibold text-foreground">
              {t.footer.poweredBy} <span className="text-primary">Parvoz Company</span>
            </div>
          </a>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Hunarmandlik. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};