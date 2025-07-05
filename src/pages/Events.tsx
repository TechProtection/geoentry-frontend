
import { Calendar, ArrowUp, ArrowDown, Download, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statsCards = [
  { title: 'Total Eventos', value: '2', icon: Calendar, color: 'text-blue-400' },
  { title: 'Eventos Hoy', value: '2', icon: Calendar, color: 'text-green-400' },
  { title: 'Entradas', value: '2', icon: ArrowUp, color: 'text-green-400' },
  { title: 'Salidas', value: '0', icon: ArrowDown, color: 'text-red-400' },
];

const events = [
  {
    id: 1,
    type: 'Entrada',
    device: 'Dispositivo desconocido',
    location: 'Hogar',
    time: '05/07/2025 14:22:49',
    icon: ArrowUp,
    color: 'text-green-400'
  },
  {
    id: 2,
    type: 'Entrada',
    device: 'Dispositivo desconocido',
    location: 'Hogar',
    time: '05/07/2025 14:23:41',
    icon: ArrowUp,
    color: 'text-green-400'
  },
];

export default function Events() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Eventos de Proximidad</h1>
          <p className="text-geo-text-muted">Historial completo de entradas y salidas de dispositivos</p>
        </div>
        <Button className="bg-geo-blue hover:bg-geo-blue-dark">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-geo-gray border-geo-gray-light">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-geo-text-muted text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full bg-geo-darker ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-geo-text-muted" />
              <Input
                placeholder="Buscar eventos..."
                className="pl-10 bg-geo-darker border-geo-gray-light text-white placeholder:text-geo-text-muted"
              />
            </div>
            <Select>
              <SelectTrigger className="bg-geo-darker border-geo-gray-light text-white">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent className="bg-geo-darker border-geo-gray-light">
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="salida">Salida</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-geo-darker border-geo-gray-light text-white">
                <SelectValue placeholder="Todas las ubicaciones" />
              </SelectTrigger>
              <SelectContent className="bg-geo-darker border-geo-gray-light">
                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                <SelectItem value="hogar">Hogar</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-geo-darker border-geo-gray-light text-white">
                <SelectValue placeholder="Todos los dispositivos" />
              </SelectTrigger>
              <SelectContent className="bg-geo-darker border-geo-gray-light">
                <SelectItem value="all">Todos los dispositivos</SelectItem>
                <SelectItem value="poco">POCO X7 Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events History */}
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardHeader>
          <CardTitle className="text-white">Historial de Eventos (2)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-geo-darker p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full bg-geo-gray mr-4 ${event.color}`}>
                    <event.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">{event.type}</span>
                      <span className="text-white font-medium">{event.device}</span>
                    </div>
                    <div className="flex items-center text-geo-text-muted text-sm mt-1">
                      <span className="mr-4">📍 {event.location}</span>
                      <span>📱 Dispositivo desconocido</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{event.time.split(' ')[0]}</p>
                  <p className="text-geo-text-muted text-sm">{event.time.split(' ')[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
