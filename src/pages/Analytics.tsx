
import { BarChart3, PieChart, Activity, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const statsCards = [
  { title: 'Eventos Hoy', value: '2', icon: Activity, color: 'text-blue-400' },
  { title: 'Dispositivos Activos', value: '1', icon: Smartphone, color: 'text-green-400' },
  { title: 'Ubicaciones Ocupadas', value: '1', icon: BarChart3, color: 'text-orange-400' },
  { title: 'Total Ubicaciones', value: '1', icon: PieChart, color: 'text-purple-400' },
];

const hourlyData = [
  { hour: '01:00', eventos: 0 },
  { hour: '03:00', eventos: 0 },
  { hour: '05:00', eventos: 0 },
  { hour: '07:00', eventos: 0 },
  { hour: '09:00', eventos: 0 },
  { hour: '11:00', eventos: 0 },
  { hour: '13:00', eventos: 0 },
  { hour: '14:00', eventos: 2 },
  { hour: '15:00', eventos: 2 },
  { hour: '17:00', eventos: 0 },
  { hour: '19:00', eventos: 0 },
  { hour: '21:00', eventos: 0 },
  { hour: '23:00', eventos: 0 },
];

const pieData = [
  { name: 'Hogar', value: 100, color: '#4F6FFF' },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analíticas</h1>
        <p className="text-geo-text-muted">Análisis detallado de patrones de ubicación y actividad</p>
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Analysis Chart */}
        <Card className="bg-geo-gray border-geo-gray-light">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Análisis de Tiempo por Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-geo-gray-light rounded-lg">
              <p className="text-geo-text-muted">Sin datos suficientes para mostrar</p>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Activity Chart */}
        <Card className="bg-geo-gray border-geo-gray-light">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Actividad por Horas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
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
                    dataKey="eventos" 
                    stroke="#4F6FFF" 
                    fill="#4F6FFF" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Event Distribution Chart */}
        <Card className="bg-geo-gray border-geo-gray-light">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Distribución de Eventos por Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart data={pieData} cx="50%" cy="50%" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e2329', 
                      border: '1px solid #2a3038',
                      borderRadius: '6px',
                      color: '#e4e7eb'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Analysis */}
        <Card className="bg-geo-gray border-geo-gray-light">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              Análisis de Dispositivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-geo-darker rounded-lg">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-white font-medium">POCO X7 Pro</p>
                    <p className="text-geo-text-muted text-sm">Último evento 05/07/2025 14:22</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">2</p>
                  <p className="text-geo-text-muted text-xs">eventos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
