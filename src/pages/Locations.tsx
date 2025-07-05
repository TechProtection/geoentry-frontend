
import { MapPin, Edit, Trash2, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocations, useLocationStats } from '@/hooks/useLocations';
import { useEvents } from '@/hooks/useEvents';
import { useState } from 'react';

export default function Locations() {
  const { data: locations = [], isLoading, error } = useLocations();
  const { data: events = [] } = useEvents();
  const stats = useLocationStats(locations);
  const [searchTerm, setSearchTerm] = useState('');

  const statsCards = [
    { title: 'Total Ubicaciones', value: stats.totalLocations.toString(), icon: MapPin, color: 'text-blue-400' },
    { title: 'Ubicaciones Activas', value: stats.activeLocations.toString(), icon: MapPin, color: 'text-green-400' },
    { title: 'Con Actividad', value: stats.locationsWithEvents.toString(), icon: MapPin, color: 'text-purple-400' },
    { title: 'Inactivas', value: stats.inactiveLocations.toString(), icon: MapPin, color: 'text-orange-400' },
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Cargando ubicaciones...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400">Error al cargar ubicaciones: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Ubicaciones</h1>
          <p className="text-geo-text-muted">Gestiona todas las ubicaciones registradas en el sistema</p>
        </div>
      </div>

      {}
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


      {}
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardHeader>
          <CardTitle className="text-white">Todas las Ubicaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLocations.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-geo-text-muted mx-auto mb-4" />
                <p className="text-geo-text-muted">
                  {locations.length === 0 ? 'No tienes ubicaciones registradas' : 'No se encontraron ubicaciones'}
                </p>
              </div>
            ) : (
              filteredLocations.map((location) => (
                <div key={location.id} className="bg-geo-darker p-6 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="h-12 w-12 bg-geo-blue rounded-full flex items-center justify-center mr-4">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{location.name}</h3>
                        <p className="text-geo-text-muted">Radio: {location.radius}m</p>
                        <p className="text-geo-text-muted text-sm flex items-center mt-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {location.address}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-geo-text-muted text-sm">Estado</p>
                            <span className={`px-2 py-1 rounded text-xs ${
                              location.is_active 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-600 text-gray-300'
                            }`}>
                              {location.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          <div>
                            <p className="text-geo-text-muted text-sm">Eventos Totales</p>
                            <p className="text-white font-semibold">
                              {events.filter(e => e.home_location_id === location.id).length}
                            </p>
                          </div>
                          <div>
                            <p className="text-geo-text-muted text-sm">Eventos (24h)</p>
                            <p className="text-white font-semibold">
                              {events.filter(e => e.home_location_id === location.id && 
                                new Date(e.created_at || '').toDateString() === new Date().toDateString()).length}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-sm text-geo-text-muted">
                          <p>Coordenadas: {location.latitude}, {location.longitude}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
