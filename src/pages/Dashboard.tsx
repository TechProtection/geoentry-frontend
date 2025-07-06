
import { 
  Home, 
  Map, 
  BarChart, 
  Activity,
  MapPin,
  Smartphone,
  TrendingUp,
  Calendar,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useDevices, useDeviceStats } from '@/hooks/useDevices';
import { useLocations, useLocationStats } from '@/hooks/useLocations';
import { useEvents, useEventStats } from '@/hooks/useEvents';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useSensors, useSensorStats, getSensorTypeName, getSensorTypeIcon } from '@/hooks/useSensors';
import InteractiveMap from '@/components/InteractiveMap';

export default function Dashboard() {
  const { data: devices = [], isLoading: devicesLoading } = useDevices();
  const { data: locations = [], isLoading: locationsLoading } = useLocations();
  const { data: events = [], isLoading: eventsLoading } = useEvents();
  const { data: sensors = [], isLoading: sensorsLoading } = useSensors();
  const deviceStats = useDeviceStats(devices);
  const locationStats = useLocationStats(locations);
  const eventStats = useEventStats(events);
  const sensorStats = useSensorStats(sensors);
  const { chartData, deviceAnalysis } = useAnalytics();

  const statsCards = [
    { title: 'Ubicaciones', value: locationStats.totalLocations.toString(), icon: MapPin, color: 'text-blue-400' },
    { title: 'Dispositivos', value: deviceStats.totalDevices.toString(), icon: Smartphone, color: 'text-green-400' },
    { title: 'Sensores', value: sensorStats.totalSensors.toString(), icon: Lightbulb, color: 'text-yellow-400' },
    { title: 'Eventos Hoy', value: eventStats.todayEvents.toString(), icon: Calendar, color: 'text-orange-400' },
  ];

  return (
    <div className="space-y-6">
      {}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-geo-text-muted">Monitoreo y análisis de ubicaciones en tiempo real</p>
      </div>

      {}
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

        {}
        <TabsContent value="resumen" className="space-y-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {}
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
                          <p className="text-geo-text-muted text-xs mt-1">
                            {events.filter(e => e.home_location_id === location.id).length} eventos
                          </p>
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

            {}
            <Card className="bg-geo-gray border-geo-gray-light">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Mis Celulares
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
                          <p className="text-geo-text-muted text-xs mt-1">
                            {events.filter(e => e.device_id === device.id).length} eventos
                          </p>
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

            {/* Dispositivos Inteligentes */}
            <Card className="bg-geo-gray border-geo-gray-light">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Dispositivos Inteligentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sensorsLoading ? (
                    <div className="text-geo-text-muted text-center py-4">
                      Cargando sensores...
                    </div>
                  ) : sensors.length === 0 ? (
                    <div className="text-geo-text-muted text-center py-4">
                      No hay sensores registrados
                    </div>
                  ) : (
                    sensors.slice(0, 3).map((sensor) => (
                      <div key={sensor.id} className="flex items-center justify-between p-4 bg-geo-darker rounded-md">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-3 ${
                            sensor.isActive ? 'bg-green-400' : 'bg-gray-400'
                          }`}></div>
                          <div>
                            <p className="text-white font-medium flex items-center">
                              <span className="mr-2">{getSensorTypeIcon(sensor.sensor_type)}</span>
                              {sensor.name}
                            </p>
                            <p className="text-geo-text-muted text-sm">{getSensorTypeName(sensor.sensor_type)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs ${
                            sensor.isActive 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-gray-300'
                          }`}>
                            {sensor.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                          <p className="text-geo-text-muted text-xs mt-1">
                            {getSensorTypeName(sensor.sensor_type)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {sensors.length > 3 && (
                    <div className="text-center pt-2">
                      <p className="text-geo-text-muted text-sm">
                        +{sensors.length - 3} sensores más
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {}
        <TabsContent value="mapa" className="space-y-6">
          <InteractiveMap />
        </TabsContent>

        {}
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
                {chartData.timeChart.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={chartData.timeChart}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a3038" />
                        <XAxis 
                          dataKey="location" 
                          stroke="#8b949e" 
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#8b949e" 
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e2329', 
                            border: '1px solid #2a3038',
                            borderRadius: '6px',
                            color: '#e4e7eb'
                          }}
                        />
                        <Bar dataKey="Tiempo Dentro (min)" fill="#4F6FFF" />
                        <Bar dataKey="Tiempo Fuera (min)" fill="#ef4444" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 bg-geo-darker rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                      <p className="text-geo-text-muted text-sm">Sin datos para mostrar</p>
                    </div>
                  </div>
                )}
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
                {chartData.activityChart.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData.activityChart}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a3038" />
                        <XAxis 
                          dataKey="hour" 
                          stroke="#8b949e" 
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#8b949e" 
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e2329', 
                            border: '1px solid #2a3038',
                            borderRadius: '6px',
                            color: '#e4e7eb'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="enters" 
                          stackId="1"
                          stroke="#10b981" 
                          fill="#10b981" 
                          fillOpacity={0.6}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="exits" 
                          stackId="1"
                          stroke="#ef4444" 
                          fill="#ef4444" 
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 bg-geo-darker rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                      <p className="text-geo-text-muted text-sm">Sin datos para mostrar</p>
                    </div>
                  </div>
                )}
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
                {chartData.distributionChart.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.distributionChart} 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={80}
                          dataKey="value"
                        >
                          {chartData.distributionChart.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e2329', 
                            border: '1px solid #2a3038',
                            borderRadius: '6px',
                            color: '#e4e7eb'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 bg-geo-darker rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                      <p className="text-geo-text-muted text-sm">Sin datos para mostrar</p>
                    </div>
                  </div>
                )}
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
                {deviceAnalysis.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {deviceAnalysis.slice(0, 4).map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-geo-darker rounded-lg">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-3 ${
                            device.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                          }`}></div>
                          <div>
                            <p className="text-white font-medium text-sm">{device.device}</p>
                            <p className="text-geo-text-muted text-xs">Último: {device.lastActive}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">{device.events}</p>
                          <p className="text-geo-text-muted text-xs">eventos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 bg-geo-darker rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Smartphone className="h-8 w-8 text-geo-text-muted mx-auto mb-2" />
                      <p className="text-geo-text-muted text-sm">Sin datos para mostrar</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {}
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
                {eventsLoading ? (
                  <div className="text-geo-text-muted text-center py-4">
                    Cargando actividad...
                  </div>
                ) : eventStats.recentEvents.length === 0 ? (
                  <div className="text-geo-text-muted text-center py-4">
                    No hay actividad reciente
                  </div>
                ) : (
                  eventStats.recentEvents.map((event) => {
                    const isEnter = event.type === 'enter';
                    const eventDate = new Date(event.created_at || '');
                    const now = new Date();
                    const diffInMinutes = Math.floor((now.getTime() - eventDate.getTime()) / (1000 * 60));
                    
                    return (
                      <div key={event.id} className="flex items-center p-4 bg-geo-darker rounded-lg">
                        <div className={`h-2 w-2 rounded-full mr-4 ${
                          isEnter ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${
                              isEnter ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {isEnter ? 'Entrada' : 'Salida'}
                            </span>
                            <span className="text-white text-sm">
                              {eventDate.toLocaleTimeString('es-ES', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <p className="text-geo-text-muted text-sm">{event.home_location_name}</p>
                          <p className="text-geo-text-muted text-xs">
                            {diffInMinutes === 0 ? 'hace menos de 1 minuto' : 
                             diffInMinutes === 1 ? 'hace 1 minuto' : 
                             `hace ${diffInMinutes} minutos`}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
