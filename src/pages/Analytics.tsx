
import { BarChart3, PieChart, Activity, Smartphone, MapPin, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useFilteredAnalytics } from '@/hooks/useFilteredAnalytics';

export default function Analytics() {
  const { metrics, chartData, deviceAnalysis, timeAnalysis, isLoading } = useAnalytics();
  const { 
    dateRange, 
    setDateRange, 
    trends, 
    dailyEvents, 
    totalEvents: filteredTotalEvents 
  } = useFilteredAnalytics();

  const statsCards = [
    { title: 'Eventos Hoy', value: metrics.todayEvents.toString(), icon: Activity, color: 'text-blue-400' },
    { title: 'Total Entradas', value: metrics.totalEnters.toString(), icon: TrendingUp, color: 'text-green-400' },
    { title: 'Total Salidas', value: metrics.totalExits.toString(), icon: TrendingDown, color: 'text-red-400' },
    { title: 'Dispositivos Activos', value: metrics.activeDevices.toString(), icon: Smartphone, color: 'text-purple-400' },
  ];

  const dateRangeOptions = [
    { value: '7d', label: 'Últimos 7 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '90d', label: 'Últimos 90 días' },
    { value: 'all', label: 'Todo el tiempo' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Cargando analíticas...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analíticas</h1>
          <p className="text-geo-text-muted">Análisis detallado de patrones de ubicación y actividad</p>
        </div>
        <div className="flex space-x-2">
          {dateRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={dateRange === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange(option.value as any)}
              className={`${
                dateRange === option.value 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-geo-darker border-geo-gray-light text-white hover:bg-geo-gray'
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Trends Card */}
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Tendencias de Eventos ({dateRangeOptions.find(o => o.value === dateRange)?.label})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-geo-darker rounded-lg">
              <div>
                <p className="text-geo-text-muted text-sm">Período Actual</p>
                <p className="text-2xl font-bold text-white">{filteredTotalEvents}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-geo-darker rounded-lg">
              <div>
                <p className="text-geo-text-muted text-sm">Período Anterior</p>
                <p className="text-2xl font-bold text-white">{trends.previousPeriod}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-geo-darker rounded-lg">
              <div>
                <p className="text-geo-text-muted text-sm">Cambio</p>
                <p className={`text-2xl font-bold ${trends.isIncreasing ? 'text-green-400' : 'text-red-400'}`}>
                  {trends.changePercentage > 0 ? '+' : ''}{trends.changePercentage.toFixed(1)}%
                </p>
              </div>
              {trends.isIncreasing ? (
                <TrendingUp className="h-8 w-8 text-green-400" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-400" />
              )}
            </div>
          </div>
          {dailyEvents.length > 0 && (
            <div className="mt-6">
              <h4 className="text-white font-medium mb-4">Eventos por Día</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyEvents}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a3038" />
                    <XAxis 
                      dataKey="date" 
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
                    <Line 
                      type="monotone" 
                      dataKey="events" 
                      stroke="#4F6FFF" 
                      strokeWidth={2}
                      dot={{ fill: '#4F6FFF', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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

      {/* Comparación Entradas vs Salidas */}
      <Card className="bg-geo-gray border-geo-gray-light">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Comparación Entradas vs Salidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-geo-darker rounded-lg">
              <div>
                <p className="text-geo-text-muted text-sm">Total Entradas</p>
                <p className="text-2xl font-bold text-green-400">{metrics.totalEnters}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-geo-darker rounded-lg">
              <div>
                <p className="text-geo-text-muted text-sm">Total Salidas</p>
                <p className="text-2xl font-bold text-red-400">{metrics.totalExits}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-geo-darker rounded-lg">
              <div>
                <p className="text-geo-text-muted text-sm">Ratio E/S</p>
                <p className="text-2xl font-bold text-blue-400">{metrics.enterExitRatio.toFixed(2)}</p>
                <p className="text-xs text-geo-text-muted">
                  {metrics.totalEnters > metrics.totalExits ? 'Más entradas' : 
                   metrics.totalEnters < metrics.totalExits ? 'Más salidas' : 'Equilibrado'}
                </p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

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
            {chartData.timeChart.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.timeChart}>
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
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-geo-gray-light rounded-lg">
                <p className="text-geo-text-muted">Sin datos suficientes para mostrar</p>
              </div>
            )}
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
            {chartData.distributionChart.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
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
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-geo-gray-light rounded-lg">
                <p className="text-geo-text-muted">Sin eventos registrados</p>
              </div>
            )}
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
              {deviceAnalysis.length > 0 ? (
                deviceAnalysis.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-geo-darker rounded-lg">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-3 ${
                        device.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <p className="text-white font-medium">{device.device}</p>
                        <p className="text-geo-text-muted text-sm">Último evento: {device.lastActive}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{device.events}</p>
                      <p className="text-geo-text-muted text-xs">eventos</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Smartphone className="h-12 w-12 text-geo-text-muted mx-auto mb-4" />
                  <p className="text-geo-text-muted">No hay dispositivos registrados</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      {timeAnalysis.length > 0 && (
        <Card className="bg-geo-gray border-geo-gray-light">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Estadísticas Detalladas por Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timeAnalysis.map((location, index) => (
                <div key={index} className="p-4 bg-geo-darker rounded-lg">
                  <h4 className="text-white font-medium mb-3">{location.location}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-geo-text-muted">Total eventos:</span>
                      <span className="text-white">{location.totalEvents}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-geo-text-muted">Tiempo dentro:</span>
                      <span className="text-green-400">{Math.round(location.timeInside)} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-geo-text-muted">Estancia promedio:</span>
                      <span className="text-blue-400">{Math.round(location.averageStay)} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
