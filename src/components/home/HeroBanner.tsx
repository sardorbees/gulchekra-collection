import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import img from '../../components/banner/banner.jpg'
import img1 from '../../components/banner/banner1.jpg'

const slides = [
  {
    image: img,
    titleKey: 'slide1Title',
    subtitleKey: 'slide1Subtitle',
  },
  {
    image: img1,
    titleKey: 'slide3Title',
    subtitleKey: 'slide3Subtitle',
  },
];

export const HeroBanner = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[500px] md:h-[600px] w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
              </div>
              <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="text-center animate-fade-in-up max-w-3xl">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    {t.hero[slide.titleKey as keyof typeof t.hero] as string}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
                    {t.hero[slide.subtitleKey as keyof typeof t.hero] as string}
                  </p>
                  <Button
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-shadow"
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.hero.cta}
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
