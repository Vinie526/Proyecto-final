'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFirestore } from '@/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import type { MenuItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItemSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido.'),
  description: z.string().min(1, 'La descripción es requerida.'),
  price: z.coerce.number().min(0, 'El precio debe ser un número positivo.'),
  category: z.string().min(1, 'La categoría es requerida.'),
  image: z.string().min(1, 'La imagen es requerida.'),
});

type MenuItemFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item: MenuItem | null;
  categories: string[];
};

export function MenuItemForm({ isOpen, setIsOpen, item, categories }: MenuItemFormProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
    },
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
      if (item.category && !categories.includes(item.category)) {
        setIsCreatingCategory(true);
        setNewCategory(item.category);
      } else {
        setIsCreatingCategory(false);
      }
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
      });
    }
  }, [item, form, categories]);

  const onSubmit = async (values: z.infer<typeof menuItemSchema>) => {
    if (!firestore) return;
    setLoading(true);
    
    const finalValues = {
        ...values,
        category: isCreatingCategory ? newCategory : values.category,
    }

    try {
      if (item && item.id) {
        // Update existing item
        const itemDoc = doc(firestore, 'menuItems', item.id);
        await updateDoc(itemDoc, finalValues);
        toast({ title: '¡Éxito!', description: 'Plato actualizado correctamente.' });
      } else {
        // Add new item
        await addDoc(collection(firestore, 'menuItems'), finalValues);
        toast({ title: '¡Éxito!', description: 'Plato agregado correctamente.' });
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo guardar el plato. Inténtalo de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? 'Editar Plato' : 'Agregar Nuevo Plato'}</DialogTitle>
          <DialogDescription>
            {item ? 'Modifica los detalles de este plato.' : 'Completa el formulario para añadir un nuevo plato al menú.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Pollo Gordon Blue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Pechuga de pollo rellena de jamón y queso..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ej: 25000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                   <Select onValueChange={(value) => {
                        if (value === 'new') {
                            setIsCreatingCategory(true);
                            field.onChange('');
                        } else {
                            setIsCreatingCategory(false);
                            field.onChange(value);
                        }
                    }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                      <SelectItem value="new">Crear nueva categoría...</SelectItem>
                    </SelectContent>
                  </Select>
                  {isCreatingCategory && (
                    <Input 
                        className="mt-2" 
                        placeholder="Nombre de la nueva categoría"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una imagen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PlaceHolderImages.map((img) => (
                        <SelectItem key={img.id} value={img.id}>{img.description}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Guardar Cambios'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}