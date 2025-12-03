
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import {
  Coffee,
  Facebook,
  Instagram,
  Menu,
} from 'lucide-react';
import { restaurantInfo } from '@/lib/data';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/menu', label: 'Menú' },
  { href: '/build-a-lunch', label: 'Arma tu Almuerzo' },
  { href: '/reservations', label: 'Reservas' },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="font-headline">{restaurantInfo.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
             <a href={restaurantInfo.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
             </a>
           </Button>
           <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
             <a href={restaurantInfo.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
               <Facebook className="h-5 w-5" />
             </a>
           </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setIsSheetOpen(false)}>
                    <Coffee className="h-6 w-6 text-primary" />
                    <span className="font-headline">{restaurantInfo.name}</span>
                </Link>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
