import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Gallery() {
  const galleryImages = PlaceHolderImages.filter((img) => img.id.startsWith('gallery-'));

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">Un Vistazo a Nuestro Sabor</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explora la variedad y calidad que nos caracteriza en cada plato que servimos.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
             <div key={image.id} className={`relative overflow-hidden rounded-lg shadow-lg aspect-square ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                    data-ai-hint={image.imageHint}
                />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
