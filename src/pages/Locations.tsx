
import { MapPin, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const statsCards = [
  { title: 'Total Ubicaciones', value: '1', icon: MapPin, color: 'text-blue-400' },
  { title: 'Ubicaciones Activas', value: '1', icon: MapPin, color: 'text-green-400' },
  { title: 'Con Actividad', value: '1', icon: MapPin, color: 'text-purple-400' },
  { title: 'Ocupadas Ahora', value: '1', icon: MapPin, color: 'text-orange-400' },
];

export default function Locations() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Ubicaciones</h1>
          <p className="text-geo-text-muted">Gestiona todas las ubicaciones registradas en el sistema</p>
        </div>
        <Button className="bg-geo-blue hover:bg-geo-blue-dark">
          + Agregar Ubicación
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

      {/* Locations List */}
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardHeader>
          <CardTitle className="text-white">Todas las Ubicaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-geo-darker p-6 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-geo-blue rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">Hogar</h3>
                    <p className="text-geo-text-muted">Radio: 50m</p>
                    <p className="text-geo-text-muted text-sm flex items-center mt-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      1473, Avenida Mariano H. Cornejo, Lima, Provincia de Lima
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-geo-text-muted text-sm">Estado</p>
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Activo</span>
                      </div>
                      <div>
                        <p className="text-geo-text-muted text-sm">Ocupación</p>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Ocupado</span>
                      </div>
                      <div>
                        <p className="text-geo-text-muted text-sm">Eventos Totales</p>
                        <p className="text-white font-semibold">2</p>
                      </div>
                      <div>
                        <p className="text-geo-text-muted text-sm">Eventos (24h)</p>
                        <p className="text-white font-semibold">2</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-geo-text-muted">
                      <p>Coordenadas: -12.067750, -77.066521</p>
                      <p>Última actividad: 05/07/2025 14:22</p>
                    </div>
                  </div>
                </div>
                
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
        </CardContent>
      </Card>
    </div>
  );
}
