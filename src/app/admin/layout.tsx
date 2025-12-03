'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Home, Settings, Utensils, Coffee } from 'lucide-react';
import { restaurantInfo } from '@/lib/data';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: <Home /> },
  { href: '/admin/menu', label: 'Gestionar Menú', icon: <Utensils /> },
  { href: '/admin/settings', label: 'Configuración', icon: <Settings /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      <SidebarProvider>
          <Sidebar>
              <SidebarHeader>
                  <div className="flex items-center gap-2">
                      <Coffee className="size-6 text-primary"/>
                      <h2 className="text-lg font-semibold font-headline">{restaurantInfo.name} Admin</h2>
                  </div>
              </SidebarHeader>
              <Separator />
              <SidebarContent>
                  <SidebarMenu>
                      {adminNavItems.map((item) => (
                          <SidebarMenuItem key={item.href}>
                              <Link href={item.href}>
                                  <SidebarMenuButton isActive={pathname === item.href}>
                                      {item.icon}
                                      <span>{item.label}</span>
                                  </SidebarMenuButton>
                              </Link>
                          </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
              </SidebarContent>
              <Separator />
              <SidebarFooter>
                   <p className="text-xs text-muted-foreground">Acceso de administrador.</p>
              </SidebarFooter>
          </Sidebar>
          <main className="flex-1 flex flex-col bg-secondary/30">
              <header className="p-4 bg-background flex justify-between items-center md:hidden border-b">
                  <div className="flex items-center gap-2">
                      <Coffee className="size-6 text-primary"/>
                      <h2 className="text-lg font-semibold font-headline">{restaurantInfo.name} Admin</h2>
                  </div>
                  <SidebarTrigger />
              </header>
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                  {children}
              </div>
          </main>
      </SidebarProvider>
    </div>
  );
}
