
import { Smartphone, Edit, Trash2, Plus, Search, Activity, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const statsCards = [
  { title: 'Total Dispositivos', value: '1', icon: Smartphone, color: 'text-blue-400' },
  { title: 'Dispositivos Activos', value: '1', icon: Activity, color: 'text-green-400' },
  { title: 'Fuera de Zona', value: '0', icon: MapPin, color: 'text-red-400' },
  { title: 'Sin Actividad', value: '0', icon: Smartphone, color: 'text-gray-400' },
];

export default function Devices() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dispositivos</h1>
          <p className="text-geo-text-muted">Gestiona todos los dispositivos registrados en el sistema</p>
        </div>
        <Button className="bg-geo-blue hover:bg-geo-blue-dark">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Dispositivo
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-geo-text-muted" />
        <Input
          placeholder="Buscar dispositivos por nombre, tipo o usuario..."
          className="pl-10 bg-geo-darker border-geo-gray-light text-white placeholder:text-geo-text-muted"
        />
      </div>

      {/* Device List */}
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="bg-geo-darker p-6 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-geo-blue rounded-lg flex items-center justify-center mr-4">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">POCO X7 Pro</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-geo-text-muted text-sm">Tipo:</p>
                        <p className="text-white">android 15</p>
                      </div>
                      <div>
                        <p className="text-geo-text-muted text-sm">Usuario:</p>
                        <p className="text-white">N/A</p>
                      </div>
                      <div>
                        <p className="text-geo-text-muted text-sm">Ubicación actual:</p>
                        <p className="text-green-400">Hogar</p>
                      </div>
                      <div>
                        <p className="text-geo-text-muted text-sm">Última actividad:</p>
                        <p className="text-white">05/07/2025 14:22</p>
                      </div>
                    </div>
                    
                    <p className="text-geo-text-muted text-sm mt-3">Email: N/A</p>
                    
                    <div className="flex items-center space-x-6 mt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">2</p>
                        <p className="text-geo-text-muted text-xs">Total Eventos</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">2</p>
                        <p className="text-geo-text-muted text-xs">Hoy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">1</p>
                        <p className="text-geo-text-muted text-xs">Ubicaciones</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">Activo</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-geo-text hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
