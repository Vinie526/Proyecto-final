import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function DailySpecial() {
  const dailySpecialImage = PlaceHolderImages.find((img) => img.id === 'daily-special-image');

  return (
    <section id="daily-special" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">El Menú Ejecutivo de Hoy</h2>
            <p className="text-lg text-muted-foreground">
              Cada día preparamos un menú ejecutivo fresco, delicioso y balanceado para tu almuerzo. ¡Sujeto a disponibilidad!
            </p>
            <p className="text-lg text-muted-foreground">
              Puedes armar tu propio almuerzo con nuestras variadas opciones, con precios desde $13.000.
            </p>
            <div className="flex gap-4">
                <Button asChild size="lg">
                    <Link href="/build-a-lunch">Arma tu Almuerzo</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/menu">Ver Menú Completo</Link>
                </Button>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center">
            {dailySpecialImage && (
              <div className="w-[300px] h-[400px] relative shadow-lg rounded-lg overflow-hidden transform rotate-3 transition-transform hover:rotate-0 hover:scale-105">
                <Image
                  src={dailySpecialImage.imageUrl}
                  alt={dailySpecialImage.description}
                  fill
                  style={{objectFit: 'cover'}}
                  className="rounded-lg"
                  data-ai-hint={dailySpecialImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
