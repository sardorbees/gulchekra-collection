import { Award, Medal, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const achievements = [
  {
    year: '2023',
    title: 'International Handicraft Excellence Award',
    description: 'Recognition for outstanding contribution to traditional crafts',
    icon: Trophy,
  },
  {
    year: '2022',
    title: 'Master Artisan Certification',
    description: 'Certified as a master artisan by the National Crafts Council',
    icon: Medal,
  },
  {
    year: '2021',
    title: 'Cultural Heritage Ambassador',
    description: 'Appointed as cultural ambassador for Uzbek handicrafts',
    icon: Award,
  },
  {
    year: '2020',
    title: 'Best Traditional Design Award',
    description: 'First prize at the Central Asian Crafts Exhibition',
    icon: Trophy,
  },
];

const Achievements = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Achievements & Certificates</h1>
          <p className="text-xl text-muted-foreground">
            Recognition and awards for excellence in handicraft artistry
          </p>
        </div>

        <div className="space-y-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {achievement.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="aspect-video overflow-hidden rounded-lg bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1567596275753-92607c3ce1ae?w=800"
              alt="Certificate 1"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-video overflow-hidden rounded-lg bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800"
              alt="Certificate 2"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;