import type { Metadata } from 'next';
import './globals.css';
import { InnerLayout } from '@/components/layout/inner-layout';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Mana Restro Bar',
  description: 'Desayunos, almuerzos, cenas y el mejor café de Pamplona.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <InnerLayout>{children}</InnerLayout>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}