
import { Smartphone, Edit, Trash2, Plus, Search, Activity, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDevices, useDeviceStats } from '@/hooks/useDevices';
import { useEvents } from '@/hooks/useEvents';
import { useState } from 'react';

export default function Devices() {
  const { data: devices = [], isLoading, error } = useDevices();
  const { data: events = [] } = useEvents();
  const stats = useDeviceStats(devices);
  const [searchTerm, setSearchTerm] = useState('');

  const statsCards = [
    { title: 'Total Dispositivos', value: stats.totalDevices.toString(), icon: Smartphone, color: 'text-blue-400' },
    { title: 'Dispositivos Activos', value: stats.activeDevices.toString(), icon: Activity, color: 'text-green-400' },
    { title: 'Fuera de Zona', value: stats.devicesOutOfZone.toString(), icon: MapPin, color: 'text-red-400' },
    { title: 'Sin Actividad', value: stats.inactiveDevices.toString(), icon: Smartphone, color: 'text-gray-400' },
  ];

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Cargando dispositivos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400">Error al cargar dispositivos: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dispositivos</h1>
          <p className="text-geo-text-muted">Gestiona todos los dispositivos registrados en el sistema</p>
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
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredDevices.length === 0 ? (
              <div className="text-center py-8">
                <Smartphone className="h-12 w-12 text-geo-text-muted mx-auto mb-4" />
                <p className="text-geo-text-muted">
                  {devices.length === 0 ? 'No tienes dispositivos registrados' : 'No se encontraron dispositivos'}
                </p>
              </div>
            ) : (
              filteredDevices.map((device) => (
                <div key={device.id} className="bg-geo-darker p-6 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="h-12 w-12 bg-geo-blue rounded-lg flex items-center justify-center mr-4">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{device.name}</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-geo-text-muted text-sm">Tipo:</p>
                            <p className="text-white">{device.type}</p>
                          </div>
                          <div>
                            <p className="text-geo-text-muted text-sm">Usuario:</p>
                            <p className="text-white">{device.profile?.full_name || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <p className="text-geo-text-muted text-sm mt-3">
                          Email: {device.profile?.email || 'N/A'}
                        </p>
                        
                        <div className="flex items-center space-x-6 mt-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-400">
                              {events.filter(e => e.device_id === device.id).length}
                            </p>
                            <p className="text-geo-text-muted text-xs">Total Eventos</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-400">
                              {events.filter(e => e.device_id === device.id && 
                                new Date(e.created_at || '').toDateString() === new Date().toDateString()).length}
                            </p>
                            <p className="text-geo-text-muted text-xs">Hoy</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">Activo</span>
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
