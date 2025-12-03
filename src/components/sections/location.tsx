import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { restaurantInfo } from '@/lib/data';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';

export function Location() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'location-map');
  const gmapsUrl = `https://maps.app.goo.gl/WqYHcwWWtjoFEgEdA`;

  return (
    <section id="location" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Encuéntranos Fácilmente</h2>
            <div className="flex items-start gap-4 text-lg">
                <MapPin className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                    <p className="font-semibold">{restaurantInfo.location.address}</p>
                    <p className="text-muted-foreground">{restaurantInfo.location.note}</p>
                </div>
            </div>
            <p className="text-muted-foreground">
              ¡Te esperamos para que disfrutes de una experiencia inolvidable!
            </p>
            <Button asChild size="lg">
                <a href={gmapsUrl} target="_blank" rel="noopener noreferrer">
                    Ver en Google Maps
                </a>
            </Button>
          </div>
          <div>
            {mapImage && (
              <a href={gmapsUrl} target="_blank" rel="noopener noreferrer">
                <Image
                  src={mapImage.imageUrl}
                  alt={mapImage.description}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg object-cover cursor-pointer"
                  data-ai-hint={mapImage.imageHint}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
