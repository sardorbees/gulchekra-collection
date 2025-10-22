import img from '../components/assets/logo/logo.png'
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.videos.win}</h1>
          <p className="text-xl text-muted-foreground">{t.videos.wins}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={img}
              alt="Sattorova"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Gulschehra Collection</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.videos.wins}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.videos.wina}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">{t.videos.v11}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">{t.videos.v12}</h3>
            </div>
            <div className="text-center p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">{t.videos.v13}</h3>
            </div>
            <div className="text-center p-6 rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-3">{t.videos.v14}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;