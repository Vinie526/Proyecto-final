import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DollarSign, Utensils, Users, Settings } from "lucide-react"

const stats = [
    { title: "Ventas del Día", value: "$540.000", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: "Platos Vendidos", value: "87", icon: <Utensils className="h-4 w-4 text-muted-foreground" /> },
    { title: "Reservas Hoy", value: "5", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Un resumen de la actividad de tu restaurante.</p>
        </div>
        <div className="flex gap-2">
            <Button asChild>
                <Link href="/admin/menu">
                    <Utensils className="mr-2 h-4 w-4" />
                    Modificar Menú
                </Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Bienvenido al Panel de Administración</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Desde aquí puedes gestionar el contenido de tu página web. Usa el menú de la izquierda para navegar entre las diferentes secciones.
                Puedes cambiar el menú del día, modificar precios, platos y configurar las políticas del restaurante.
            </p>
        </CardContent>
      </Card>
    </div>
  )
}
