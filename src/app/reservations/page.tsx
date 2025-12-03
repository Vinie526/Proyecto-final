'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { restaurantInfo } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar, Clock, MessageCircle, Info, QrCode } from 'lucide-react';

export default function ReservationsPage() {
  const handleReservationClick = () => {
    const message = `Hola! Quiero hacer una reserva en Mana Coffee.\n\nNúmero de personas:\nFecha:\nHora:`;
    const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Reservas</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Asegura tu mesa en Mana Coffee. Todas las reservas se gestionan a través de WhatsApp para una atención personalizada.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Reserva tu Mesa</CardTitle>
          <CardDescription>
            Haz clic en el botón para ser redirigido a WhatsApp y coordinar tu reserva con nosotros.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button size="lg" className="w-full md:w-auto" onClick={handleReservationClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Reservar por WhatsApp
          </Button>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-4">
             <Alert>
                 <Info className="h-4 w-4" />
                <AlertTitle>Mensaje prellenado</AlertTitle>
                <AlertDescription>
                    Enviaremos un mensaje con los datos que necesitamos para tu reserva. ¡Solo tienes que completarlos!
                </AlertDescription>
            </Alert>
        </CardFooter>
      </Card>

      <div className="grid md:grid-cols-1 gap-8 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Política de Cancelación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p><strong>Cancelación:</strong> Se puede cancelar sin costo hasta 2 días antes de la fecha de la reserva.</p>
            <p><strong>Modificación:</strong> Se puede modificar la reserva hasta 8 horas antes.</p>
            <p><strong>Abono:</strong> Para eventos o platos especiales, se podría requerir un abono del 10% o 15% (configurable).</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
