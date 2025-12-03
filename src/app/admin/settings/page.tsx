'use client';

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useFirestore } from "@/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

type SettingsData = {
  cancelDays: number;
  modifyHours: number;
  depositPercentage: number;
  paymentMethods: {
    nequi: boolean;
    daviplata: boolean;
    bancolombia: boolean;
    breve: boolean;
  };
};

export default function AdminSettingsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [settings, setSettings] = useState<SettingsData>({
    cancelDays: 2,
    modifyHours: 8,
    depositPercentage: 15,
    paymentMethods: {
      nequi: true,
      daviplata: true,
      bancolombia: true,
      breve: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!firestore) return;
      setLoading(true);
      const settingsDocRef = doc(firestore, "settings", "general");
      const docSnap = await getDoc(settingsDocRef);

      if (docSnap.exists()) {
        setSettings(docSnap.data() as SettingsData);
      }
      setLoading(false);
    };

    fetchSettings();
  }, [firestore]);

  const handleSave = async () => {
    if (!firestore) return;
    setSaving(true);
    try {
      const settingsDocRef = doc(firestore, "settings", "general");
      await setDoc(settingsDocRef, settings);
      toast({
        title: "¡Éxito!",
        description: "La configuración se ha guardado correctamente.",
      });
    } catch (error) {
      console.error("Error saving settings: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar la configuración. Inténtalo de nuevo.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePaymentMethodChange = (method: keyof SettingsData['paymentMethods']) => {
    setSettings(prev => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [method]: !prev.paymentMethods[method]
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
            <p className="text-muted-foreground">
                Modifica las políticas y configuraciones generales de tu sitio web.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Menú Ejecutivo Diario</CardTitle>
                <CardDescription>Sube la imagen del menú del día. Se mostrará en la página principal.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="daily-menu-image">Imagen del Menú</Label>
                    <Input id="daily-menu-image" type="file" disabled />
                    <p className="text-xs text-muted-foreground">Esta función estará disponible próximamente.</p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Políticas de Reservas</CardTitle>
                <CardDescription>Define las reglas para cancelaciones y modificaciones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="cancel-days">Días para cancelar sin costo</Label>
                    <Input id="cancel-days" type="number" value={settings.cancelDays} onChange={(e) => setSettings({...settings, cancelDays: Number(e.target.value)})} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="modify-hours">Horas para modificar</Label>
                    <Input id="modify-hours" type="number" value={settings.modifyHours} onChange={(e) => setSettings({...settings, modifyHours: Number(e.target.value)})} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="deposit-percentage">Porcentaje de abono para eventos (%)</Label>
                    <Input id="deposit-percentage" type="number" value={settings.depositPercentage} onChange={(e) => setSettings({...settings, depositPercentage: Number(e.target.value)})} />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Configuración de Pagos</CardTitle>
                <CardDescription>Administra los métodos de pago disponibles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="nequi" checked={settings.paymentMethods.nequi} onCheckedChange={() => handlePaymentMethodChange('nequi')} />
                    <label htmlFor="nequi" className="text-sm font-medium leading-none">Nequi</label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="daviplata" checked={settings.paymentMethods.daviplata} onCheckedChange={() => handlePaymentMethodChange('daviplata')} />
                    <label htmlFor="daviplata" className="text-sm font-medium leading-none">Daviplata</label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="bancolombia" checked={settings.paymentMethods.bancolombia} onCheckedChange={() => handlePaymentMethodChange('bancolombia')} />
                    <label htmlFor="bancolombia" className="text-sm font-medium leading-none">Bancolombia</label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="breve" checked={settings.paymentMethods.breve} onCheckedChange={() => handlePaymentMethodChange('breve')} />
                    <label htmlFor="breve" className="text-sm font-medium leading-none">Breve (Próximamente)</label>
                </div>
                 <div className="grid w-full max-w-sm items-center gap-1.5 pt-4">
                    <Label htmlFor="qr-code">Subir QRs de pago</Label>
                    <Input id="qr-code" type="file" multiple disabled />
                    <p className="text-xs text-muted-foreground">Esta función estará disponible próximamente.</p>
                </div>
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Guardar Cambios'}
            </Button>
        </div>
    </div>
  )
}
