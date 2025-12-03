'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Loader2 } from 'lucide-react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';
import type { MenuItem } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { collection } from 'firebase/firestore';

function MenuItemCard({ item }: { item: MenuItem }) {
  const image = PlaceHolderImages.find((img) => img.id === item.image);
  return (
    <Card className="overflow-hidden flex flex-col">
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-ai-hint={image.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
        <p className="text-primary font-bold text-lg mt-4">
          ${item.price.toLocaleString('es-CO')}
        </p>
      </CardContent>
    </Card>
  );
}

export default function MenuPage() {
  const firestore = useFirestore();
  const menuItemsCollection = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'menuItems');
  }, [firestore]);
  const { data: menuItems, loading } = useCollection<MenuItem>(menuItemsCollection);
  
  const categories = useMemo(() => [...new Set(menuItems?.map((item) => item.category).filter(Boolean) || [])], [menuItems]);
  const defaultCategory = categories.length > 0 ? categories[0] : '';
  
  const isLoading = loading || !firestore;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Nuestro Menú</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Platos preparados con ingredientes frescos y todo el amor de nuestra cocina.
        </p>
      </div>

      {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      ) : menuItems && menuItems.length > 0 && categories.length > 0 ? (
        <Tabs defaultValue={defaultCategory} className="w-full">
          <div className="flex justify-center mb-8">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                  {categories.map((category) => (
                      <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                  ))}
              </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              {category === 'Menú Vegetariano' && (
                  <Alert className="mb-8 bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-300">
                      <Info className="h-4 w-4 !text-green-800 dark:!text-green-300" />
                      <AlertTitle>¡Ahorra tiempo!</AlertTitle>
                      <AlertDescription>
                          Puedes preseleccionar tu plato vegetariano al momento de hacer la reserva para que lo tengamos listo cuando llegues.
                      </AlertDescription>
                  </Alert>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems
                  ?.filter((item) => item.category === category)
                  .map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Aún no hay platos en el menú. ¡Vuelve pronto!</p>
        </div>
      )}
    </div>
  );
}
