
import { 
  Home, 
  Map, 
  BarChart, 
  Activity,
  MapPin,
  Smartphone,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDevices, useDeviceStats } from '@/hooks/useDevices';
import { useLocations, useLocationStats } from '@/hooks/useLocations';

export default function Dashboard() {
  const { data: devices = [], isLoading: devicesLoading } = useDevices();
  const { data: locations = [], isLoading: locationsLoading } = useLocations();
  const deviceStats = useDeviceStats(devices);
  const locationStats = useLocationStats(locations);

  const statsCards = [
    { title: 'Ubicaciones', value: locationStats.totalLocations.toString(), icon: MapPin, color: 'text-blue-400' },
    { title: 'Dispositivos', value: deviceStats.totalDevices.toString(), icon: Smartphone, color: 'text-green-400' },
    { title: 'Eventos Total', value: '2', icon: Activity, color: 'text-purple-400' },
    { title: 'Eventos Hoy', value: '2', icon: Calendar, color: 'text-orange-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-geo-text-muted">Monitoreo y análisis de ubicaciones en tiempo real</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="resumen" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-geo-gray border-geo-gray-light">
          <TabsTrigger 
            value="resumen" 
            className="flex items-center text-geo-text-muted data-[state=active]:bg-geo-gray-light data-[state=active]:text-white"
          >
            <Home className="h-4 w-4 mr-2" />
            Resumen
          </TabsTrigger>
          <TabsTrigger 
            value="mapa" 
            className="flex items-center text-geo-text-muted data-[state=active]:bg-geo-gray-light data-[state=active]:text-white"
          >
            <Map className="h-4 w-4 mr-2" />
            Mapa
          </TabsTrigger>
          <TabsTrigger 
            value="analiticas" 
            className="flex items-center text-geo-text-muted data-[state=active]:bg-geo-gray-light data-[state=active]:text-white"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Analíticas
          </TabsTrigger>
          <TabsTrigger 
            value="actividad" 
            className="flex items-center text-geo-text-muted data-[state=active]:bg-geo-gray-light data-[state=active]:text-white"
          >
            <Activity className="h-4 w-4 mr-2" />
            Actividad
          </TabsTrigger>
        </TabsList>

        {/* Resumen Tab */}
        <TabsContent value="resumen" className="space-y-6">
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ubicaciones */}
            <Card className="bg-geo-gray border-geo-gray-light">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Ubicaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locationsLoading ? (
                    <div className="text-geo-text-muted text-center py-4">
                      Cargando ubicaciones...
                    </div>
                  ) : locations.length === 0 ? (
                    <div className="text-geo-text-muted text-center py-4">
                      No hay ubicaciones registradas
                    </div>
                  ) : (
                    locations.slice(0, 3).map((location) => (
                      <div key={location.id} className="flex items-center justify-between p-4 bg-geo-darker rounded-md">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-3 ${
                            location.is_active ? 'bg-green-400' : 'bg-gray-400'
                          }`}></div>
                          <div>
                            <p className="text-white font-medium">{location.name}</p>
                            <p className="text-geo-text-muted text-sm">Radio {location.radius}m</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs ${
                            location.is_active 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-gray-300'
                          }`}>
                            {location.is_active ? 'Activo' : 'Inactivo'}
                          </span>
                          <p className="text-geo-text-muted text-xs mt-1">0 eventos</p>
                        </div>
                      </div>
                    ))
                  )}
                  {locations.length > 3 && (
                    <div className="text-center pt-2">
                      <p className="text-geo-text-muted text-sm">
                        +{locations.length - 3} ubicaciones más
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Dispositivos */}
            <Card className="bg-geo-gray border-geo-gray-light">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Dispositivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devicesLoading ? (
                    <div className="text-geo-text-muted text-center py-4">
                      Cargando dispositivos...
                    </div>
                  ) : devices.length === 0 ? (
                    <div className="text-geo-text-muted text-center py-4">
                      No hay dispositivos registrados
                    </div>
                  ) : (
                    devices.slice(0, 3).map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-4 bg-geo-darker rounded-md">
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
                          <div>
                            <p className="text-white font-medium">{device.name}</p>
                            <p className="text-geo-text-muted text-sm">{device.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Activo</span>
                          <p className="text-geo-text-muted text-xs mt-1">0 eventos</p>
                        </div>
                      </div>
                    ))
                  )}
                  {devices.length > 3 && (
                    <div className="text-center pt-2">
                      <p className="text-geo-text-muted text-sm">
                        +{devices.length - 3} dispositivos más
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mapa Tab */}
        <TabsContent value="mapa" className="space-y-6">
          <Card className="bg-geo-gray border-geo-gray-light">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Map className="h-5 w-5 mr-2" />
                Vista de Mapa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-geo-darker rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-geo-text-muted mx-auto mb-4" />
                  <p className="text-geo-text-muted">Cargando mapa...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analíticas Tab */}
        <TabsContent value="analiticas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-geo-gray border-geo-gray-light">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Análisis de Tiempo por Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-geo-darker rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                    <p className="text-geo-text-muted text-sm">Sin datos para mostrar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-geo-gray border-geo-gray-light">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Actividad por Horas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-geo-darker rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                    <p className="text-geo-text-muted text-sm">Sin datos para mostrar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-geo-gray border-geo-gray-light">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Distribución de Eventos por Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-geo-darker rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                    <p className="text-geo-text-muted text-sm">Sin datos para mostrar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-geo-gray border-geo-gray-light">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Análisis de Dispositivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-geo-darker rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Smartphone className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                    <p className="text-geo-text-muted text-sm">Sin datos para mostrar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Actividad Tab */}
        <TabsContent value="actividad" className="space-y-6">
          <Card className="bg-geo-gray border-geo-gray-light">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-geo-darker rounded-lg">
                  <div className="h-2 w-2 bg-green-400 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-medium">Entrada</span>
                      <span className="text-white text-sm">14:22</span>
                    </div>
                    <p className="text-geo-text-muted text-sm">Hogar</p>
                    <p className="text-geo-text-muted text-xs">hace 9 minutos</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-geo-darker rounded-lg">
                  <div className="h-2 w-2 bg-green-400 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-medium">Entrada</span>
                      <span className="text-white text-sm">14:23</span>
                    </div>
                    <p className="text-geo-text-muted text-sm">Hogar</p>
                    <p className="text-geo-text-muted text-xs">hace 8 minutos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
