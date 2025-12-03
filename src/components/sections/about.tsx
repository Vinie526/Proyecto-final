import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { restaurantInfo } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { UtensilsCrossed, Users, Trophy } from 'lucide-react';

export function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-image');

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Capacidad',
      value: restaurantInfo.capacity,
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: 'Concursos',
      value: '2 de Hamburguesas',
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
      title: 'Perfil',
      value: restaurantInfo.profile,
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Nuestra Historia</h2>
            <p className="text-lg text-muted-foreground">{restaurantInfo.history}</p>
            <p className="text-lg text-muted-foreground">{restaurantInfo.competitions}</p>
            <p className="text-lg text-muted-foreground">{restaurantInfo.partners}</p>
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-secondary rounded-full p-3 w-fit">
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg">{stat.title}</CardTitle>
                    <p className="text-muted-foreground">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={800}
                height={600}
                className="rounded-lg shadow-lg object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
