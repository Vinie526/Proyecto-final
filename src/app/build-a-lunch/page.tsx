'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { buildYourLunchData, restaurantInfo } from '@/lib/data';
import type { LunchOption, LunchCategory } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, ShoppingCart, MessageCircle } from 'lucide-react';

type Selections = {
  [categoryId: string]: string[];
};

export default function BuildYourLunchPage() {
  const [selections, setSelections] = useState<Selections>({});
  const [includeContainer, setIncludeContainer] = useState(false);
  const { toast } = useToast();

  const handleSelection = (categoryId: string, optionId: string, limit: number) => {
    setSelections((prev) => {
      const currentCategorySelections = prev[categoryId] || [];
      const isSelected = currentCategorySelections.includes(optionId);
      
      let newSelections: string[];
      if (isSelected) {
        newSelections = currentCategorySelections.filter((id) => id !== optionId);
      } else {
        if (limit === 1) {
          // Si es una categoría de opción única (como ejecutivos), deselecciona otras categorías de opción única.
          const otherSingleLimitCategories = buildYourLunchData.categories.filter(c => c.limit === 1 && c.id !== categoryId).map(c => c.id);
          const tempSelections = {...prev};
          otherSingleLimitCategories.forEach(id => delete tempSelections[id]);
          newSelections = [optionId];
          return { ...tempSelections, [categoryId]: newSelections };
        } else {
          if (currentCategorySelections.length < limit) {
            newSelections = [...currentCategorySelections, optionId];
          } else {
            toast({
              title: 'Límite alcanzado',
              description: `Solo puedes seleccionar hasta ${limit} opciones en esta categoría.`,
              variant: 'destructive',
            })
            return prev;
          }
        }
      }
      return { ...prev, [categoryId]: newSelections };
    });
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    // Check if a single-selection item is chosen (Especial or Ejecutivo)
    const singleSelectionCategory = buildYourLunchData.categories.find(c => c.limit === 1 && selections[c.id]?.length > 0);
    
    if (singleSelectionCategory) {
        const optionId = selections[singleSelectionCategory.id][0];
        const option = singleSelectionCategory.options.find(o => o.id === optionId);
        if (option) {
            total += option.price;
        }
        // Add accompaniments if an executive is chosen
        if (singleSelectionCategory.id === 'ejecutivos' && selections['acompanamientos']) {
             const accompanimentsCategory = buildYourLunchData.categories.find(c => c.id === 'acompanamientos');
             selections['acompanamientos'].forEach(accId => {
                 const accOption = accompanimentsCategory?.options.find(o => o.id === accId);
                 if (accOption) total += accOption.price;
             })
        }
    }
    
    // Add price of 'adicionales'
    if (selections['adicionales']) {
        const adicionalesCategory = buildYourLunchData.categories.find(c => c.id === 'adicionales');
        selections['adicionales'].forEach(adicionalId => {
            const adicionalOption = adicionalesCategory?.options.find(o => o.id === adicionalId);
            if (adicionalOption) total += adicionalOption.price;
        });
    }

    if (includeContainer) {
      total += buildYourLunchData.containerPrice;
    }
    return total;
  }, [selections, includeContainer]);

  const sendOrderToWhatsApp = () => {
    let orderDetails = 'Hola! Quisiera ordenar un almuerzo para domicilio:\n\n';
    let hasItems = false;
    
    buildYourLunchData.categories.forEach(category => {
      const selectedOptionIds = selections[category.id];
      if (selectedOptionIds && selectedOptionIds.length > 0) {
        hasItems = true;
        orderDetails += `*${category.name}:*\n`;
        selectedOptionIds.forEach(optionId => {
          const option = category.options.find(o => o.id === optionId);
          if (option) {
            orderDetails += `- ${option.name}\n`;
          }
        });
        orderDetails += '\n';
      }
    });

    if (!hasItems) {
        toast({
            title: 'Almuerzo vacío',
            description: 'Por favor, selecciona al menos un ítem para tu almuerzo.',
            variant: 'destructive',
        });
        return;
    }

    if (includeContainer) {
      orderDetails += '*Para llevar (Costo Adicional):* Sí\n\n';
    }

    orderDetails += `*Total: $${totalPrice.toLocaleString('es-CO')}*\n\n`;
    orderDetails += 'Gracias!';

    const encodedMessage = encodeURIComponent(orderDetails);
    const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (price: number) => {
    return price > 0 ? `+ $${price.toLocaleString('es-CO')}` : 'Incluido';
  }
  
  const isEjecutivoSelected = selections['ejecutivos'] && selections['ejecutivos'].length > 0;


  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Arma tu Almuerzo</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Elige uno de nuestros platos del día o construye tu almuerzo desde cero con tus ingredientes favoritos.
            </p>
        </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {buildYourLunchData.categories.map((category: LunchCategory) => {
            const isSingleChoice = category.limit === 1;
            const Component = isSingleChoice ? RadioGroup : 'div';
            const isDisabled = category.id === 'acompanamientos' && !isEjecutivoSelected;

            return (
              <Card key={category.id} className={isDisabled ? 'opacity-50 pointer-events-none' : ''}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>
                    {isSingleChoice ? 'Selecciona 1 opción.' : `Selecciona hasta ${category.limit} opción(es).`}
                     {isDisabled ? ' (solo disponible con un plato ejecutivo)' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Component 
                    className="grid sm:grid-cols-2 gap-4"
                    onValueChange={isSingleChoice ? (value) => handleSelection(category.id, value, category.limit) : undefined}
                    value={isSingleChoice ? selections[category.id]?.[0] : undefined}
                  >
                    {category.options.map((option: LunchOption) => (
                      <Label
                        key={option.id}
                        htmlFor={`${category.id}-${option.id}`}
                        className={`flex items-center space-x-3 p-4 rounded-md border transition-all cursor-pointer ${selections[category.id]?.includes(option.id) ? 'bg-secondary border-primary' : 'hover:bg-secondary/50'}`}
                      >
                        {isSingleChoice ? (
                          <RadioGroupItem value={option.id} id={`${category.id}-${option.id}`} />
                        ) : (
                          <Checkbox
                              id={`${category.id}-${option.id}`}
                              checked={selections[category.id]?.includes(option.id)}
                              onCheckedChange={() => handleSelection(category.id, option.id, category.limit)}
                          />
                        )}
                        <div className="flex justify-between w-full">
                          <span>{option.name}</span>
                          <span className={`${selections[category.id]?.includes(option.id) ? 'text-primary' : 'text-muted-foreground'}`}>{formatPrice(option.price)}</span>
                        </div>
                      </Label>
                    ))}
                  </Component>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="lg:col-span-1 sticky top-24 self-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShoppingCart className="h-6 w-6"/>Tu Pedido</CardTitle>
              <CardDescription>Resumen de tu almuerzo personalizado.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Disponibilidad</AlertTitle>
                    <AlertDescription>
                        Todos los items están sujetos a disponibilidad en el restaurante.
                    </AlertDescription>
                </Alert>
                <div className="flex items-center justify-between">
                    <Label htmlFor="container-switch">Para llevar (Costo Adicional)</Label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">+ ${buildYourLunchData.containerPrice.toLocaleString('es-CO')}</span>
                        <Switch
                            id="container-switch"
                            checked={includeContainer}
                            onCheckedChange={setIncludeContainer}
                        />
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${totalPrice.toLocaleString('es-CO')}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={sendOrderToWhatsApp}>
                <MessageCircle className="mr-2 h-5 w-5"/>
                Enviar Pedido a WhatsApp
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
