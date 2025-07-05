import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocations } from '@/hooks/useLocations';
import { useDevices } from '@/hooks/useDevices';
import { useEvents } from '@/hooks/useEvents';
import { MapPin, Home, Smartphone, Activity } from 'lucide-react';

// Importar CSS de Leaflet
import 'leaflet/dist/leaflet.css';

// Fix para iconos por defecto de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente principal del mapa
const InteractiveMap: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([-12.0677512, -77.0664982]);
  const [mapZoom, setMapZoom] = useState(13);

  const { data: locations = [], isLoading: locationsLoading } = useLocations();
  const { data: devices = [], isLoading: devicesLoading } = useDevices();
  const { data: events = [] } = useEvents();

  // Actualizar el centro del mapa con la última ubicación del usuario
  useEffect(() => {
    if (locations && locations.length > 0) {
      // Ordenar las ubicaciones por fecha de creación (más reciente primero)
      const sortedLocations = [...locations].sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA; // Orden descendente (más reciente primero)
      });
      
      const lastLocation = sortedLocations[0];
      setMapCenter([lastLocation.latitude, lastLocation.longitude]);
      
      // Opcional: ajustar el zoom basado en el radio de la ubicación
      if (lastLocation.radius) {
        // Calcular zoom apropiado basado en el radio
        const zoomLevel = lastLocation.radius > 1000 ? 11 : 
                         lastLocation.radius > 500 ? 13 : 
                         lastLocation.radius > 100 ? 15 : 16;
        setMapZoom(zoomLevel);
      }
    }
  }, [locations]);

  const getLocationStatus = (location: any) => {
    const locationEvents = events?.filter(event => event.home_location_id === location.id) || [];
    const recentEvents = locationEvents.filter(event => {
      const eventDate = new Date(event.created_at || '');
      const now = new Date();
      return now.getTime() - eventDate.getTime() < 24 * 60 * 60 * 1000;
    });
    
    const lastEvent = locationEvents.sort((a, b) => 
      new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
    )[0];
    const isCurrentlyOccupied = lastEvent?.type === 'enter';
    
    return {
      isCurrentlyOccupied,
      recentEventsCount: recentEvents.length,
      lastEventTime: lastEvent?.created_at,
    };
  };

  const getDeviceName = (deviceId: string | null) => {
    if (!deviceId) return 'Dispositivo desconocido';
    const device = devices.find(d => d.id === deviceId);
    return device ? device.name : 'Dispositivo desconocido';
  };

  const getDeviceCurrentLocation = (device: any) => {
    const deviceEvents = events?.filter(event => event.device_id === device.id) || [];
    const lastEvent = deviceEvents.sort((a, b) => 
      new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
    )[0];
    return lastEvent?.type === 'enter' ? lastEvent.home_location_name : null;
  };

  if (locationsLoading || devicesLoading) {
    return (
      <Card className="bg-geo-gray border-geo-gray-light h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-geo-text-muted">Cargando mapa...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapa de Ubicaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2 p-3 bg-geo-darker rounded-lg">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              <span className="text-white text-sm font-medium">Ubicaciones ({locations?.length || 0})</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-geo-darker rounded-lg">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <span className="text-white text-sm font-medium">Dispositivos Activos</span>
            </div>
          </div>

          <div className="h-[600px] w-full rounded-lg overflow-hidden border border-geo-gray-light">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              className="h-full w-full z-0"
              style={{ minHeight: '600px', height: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {locations?.map((location) => {
                const status = getLocationStatus(location);
                return [
                  <Marker
                    key={`marker-${location.id}`}
                    position={[location.latitude, location.longitude]}
                  >
                    <Popup className="min-w-[280px]">
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            {location.name}
                          </h3>
                          <Badge variant={status.isCurrentlyOccupied ? "default" : "secondary"}>
                            {status.isCurrentlyOccupied ? "Ocupado" : "Libre"}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Radio:</span>
                            <span>{location.radius} metros</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Eventos (24h):</span>
                            <span className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              {status.recentEventsCount}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Estado:</span>
                            <span className={`font-medium ${location.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                              {location.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          
                          {location.address && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                              <strong>Dirección:</strong><br />
                              {location.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>,
                  
                  <Circle
                    key={`circle-${location.id}`}
                    center={[location.latitude, location.longitude]}
                    radius={location.radius}
                    pathOptions={{
                      color: location.is_active ? '#4F6FFF' : '#6b7280',
                      fillColor: location.is_active ? '#4F6FFF' : '#6b7280',
                      fillOpacity: status.isCurrentlyOccupied ? 0.3 : 0.1,
                      weight: 2,
                    }}
                  />
                ];
              })}

              {devices?.map((device) => {
                const currentLocation = getDeviceCurrentLocation(device);
                const locationData = locations?.find(loc => loc.name === currentLocation);
                
                if (!locationData) return null;
                
                return (
                  <Marker
                    key={`device-${device.id}`}
                    position={[locationData.latitude, locationData.longitude]}
                  >
                    <Popup>
                      <div className="p-3">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                          <Smartphone className="h-5 w-5" />
                          {device.name}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Tipo:</span>
                            <span>{device.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Ubicación:</span>
                            <span className="text-blue-600">{currentLocation}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Usuario:</span>
                            <span>{device.profile?.full_name || 'N/A'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Email:</span>
                            <span className="text-xs">{device.profile?.email || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-geo-darker rounded-lg">
              <h4 className="font-medium text-blue-400 mb-1">Ubicaciones Monitoreadas</h4>
              <p className="text-2xl font-bold text-white">{locations?.length || 0}</p>
            </div>
            <div className="p-3 bg-geo-darker rounded-lg">
              <h4 className="font-medium text-green-400 mb-1">Dispositivos Registrados</h4>
              <p className="text-2xl font-bold text-white">{devices?.length || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveMap;
