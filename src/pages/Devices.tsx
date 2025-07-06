
import { Smartphone, Edit, Trash2, Plus, Search, Activity, MapPin, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDevices, useDeviceStats } from '@/hooks/useDevices';
import { useEvents } from '@/hooks/useEvents';
import { useSensors, useSensorStats, getSensorTypeName, getSensorTypeIcon } from '@/hooks/useSensors';
import { useState } from 'react';

export default function Devices() {
  const { data: devices = [], isLoading, error } = useDevices();
  const { data: events = [] } = useEvents();
  const { data: sensors = [], isLoading: sensorsLoading } = useSensors();
  const stats = useDeviceStats(devices);
  const sensorStats = useSensorStats(sensors);
  const [searchTerm, setSearchTerm] = useState('');

  const statsCards = [
    { title: 'Total Dispositivos', value: stats.totalDevices.toString(), icon: Smartphone, color: 'text-blue-400' },
    { title: 'Dispositivos Activos', value: stats.activeDevices.toString(), icon: Activity, color: 'text-green-400' },
    { title: 'Total Sensores', value: sensorStats.totalSensors.toString(), icon: Lightbulb, color: 'text-yellow-400' },
    { title: 'Sensores Activos', value: sensorStats.activeSensors.toString(), icon: Lightbulb, color: 'text-green-400' },
  ];

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSensors = sensors.filter(sensor =>
    sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getSensorTypeName(sensor.sensor_type).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading || sensorsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Cargando dispositivos y sensores...</div>
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

      {/* Barra de búsqueda */}
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-geo-text-muted h-4 w-4" />
            <Input
              placeholder="Buscar dispositivos y sensores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-geo-darker border-geo-gray-light text-white placeholder-geo-text-muted"
            />
          </div>
        </CardContent>
      </Card>

      {/* Layout en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Celulares - Columna Izquierda */}
        <Card className="bg-geo-gray border-geo-gray-light">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              Mis Celulares
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {filteredDevices.length === 0 ? (
                <div className="text-center py-6">
                  <Smartphone className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                  <p className="text-geo-text-muted text-sm">
                    {devices.length === 0 ? 'No tienes dispositivos registrados' : 'No se encontraron dispositivos'}
                  </p>
                </div>
              ) : (
                filteredDevices.map((device) => (
                  <div key={device.id} className="bg-geo-darker p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-geo-blue rounded-lg flex items-center justify-center mr-3">
                          <Smartphone className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">{device.name}</h3>
                          <p className="text-geo-text-muted text-xs">{device.type}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-blue-400 text-xs font-medium">
                              {events.filter(e => e.device_id === device.id).length} eventos
                            </span>
                            <span className="text-green-400 text-xs font-medium">
                              {events.filter(e => e.device_id === device.id && 
                                new Date(e.created_at || '').toDateString() === new Date().toDateString()).length} hoy
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Activo</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dispositivos Inteligentes - Columna Derecha */}
        <Card className="bg-geo-gray border-geo-gray-light">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Dispositivos Inteligentes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {filteredSensors.length === 0 ? (
                <div className="text-center py-6">
                  <Lightbulb className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                  <p className="text-geo-text-muted text-sm">
                    {sensors.length === 0 ? 'No tienes sensores registrados' : 'No se encontraron sensores'}
                  </p>
                </div>
              ) : (
                filteredSensors.map((sensor) => (
                  <div key={sensor.id} className="bg-geo-darker p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-yellow-600 rounded-lg flex items-center justify-center mr-3 text-base">
                          {getSensorTypeIcon(sensor.sensor_type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">{sensor.name}</h3>
                          <p className="text-geo-text-muted text-xs">{getSensorTypeName(sensor.sensor_type)}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-blue-400 text-xs">
                              {new Date(sensor.updated_at).toLocaleDateString('es-ES')} {new Date(sensor.updated_at).toLocaleTimeString('es-ES', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${
                          sensor.isActive ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          sensor.isActive 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-600 text-gray-300'
                        }`}>
                          {sensor.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
