import Link from 'next/link';
import { Coffee, Facebook, Instagram, CreditCard } from 'lucide-react';
import { restaurantInfo } from '@/lib/data';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Coffee className="h-6 w-6 text-primary" />
              <span className="font-headline">{restaurantInfo.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {restaurantInfo.profile}
            </p>
            <div className="flex gap-4">
              <a href={restaurantInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
              </a>
              <a href={restaurantInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold tracking-wider text-card-foreground">Contacto</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-muted-foreground">{restaurantInfo.location.address}</li>
              <li className="text-muted-foreground">{restaurantInfo.location.note}</li>
              <li className="text-muted-foreground">WhatsApp: {restaurantInfo.whatsappNumber}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold tracking-wider text-card-foreground">Horarios</h3>
            <p className="mt-4 text-sm text-muted-foreground">{restaurantInfo.hours}</p>
          </div>

          <div>
             <h3 className="font-semibold tracking-wider text-card-foreground">Medios de Pago</h3>
             <div className="mt-4 flex flex-col gap-4 items-start text-sm">
                <div className="space-y-1">
                    <p className="font-semibold">BANCOLOMBIA</p>
                    <p className="text-muted-foreground">Ahorros: 47675777558</p>
                    <p className="text-muted-foreground">A nombre de Maria Mendoza</p>
                </div>
                <div className="space-y-1">
                    <p className="font-semibold">Breve</p>
                    <p className="text-muted-foreground">@3105539582</p>
                    <p className="text-muted-foreground">A nombre de Maria Mendoza</p>
                </div>
                <p className="text-xs text-muted-foreground pt-2">Por favor envíanos el comprobante, ya que será verificado.</p>
             </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {restaurantInfo.name}. Todos los derechos reservados.</p>
           <Button variant="ghost" asChild>
            <Link href="/admin/login">
                Acceso Admin
            </Link>
           </Button>
        </div>
      </div>
    </footer>
  );
}
