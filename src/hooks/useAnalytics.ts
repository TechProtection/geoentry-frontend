import { useMemo } from 'react';
import { useEvents } from './useEvents';
import { useDevices } from './useDevices';
import { useLocations } from './useLocations';
import { format, subDays, startOfDay, endOfDay, differenceInMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

interface TimeAnalysis {
  location: string;
  timeInside: number;
  timeOutside: number;
  totalEvents: number;
  averageStay: number;
}

interface ActivityData {
  hour: string;
  enters: number;
  exits: number;
  total: number;
}

interface DeviceActivity {
  device: string;
  events: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

interface EventDistribution {
  name: string;
  value: number;
  color: string;
}

interface AnalyticsMetrics {
  todayEvents: number;
  activeDevices: number;
  occupiedLocations: number;
  totalLocations: number;
  totalEnters: number;
  totalExits: number;
  enterExitRatio: number;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

export const useAnalytics = () => {
  const { data: events = [] } = useEvents();
  const { data: devices = [] } = useDevices();
  const { data: locations = [] } = useLocations();

  // Métricas principales
  const metrics: AnalyticsMetrics = useMemo(() => {
    const today = new Date();
    const todayEvents = events.filter(event => {
      const eventDate = new Date(event.created_at || '');
      return eventDate >= startOfDay(today) && eventDate <= endOfDay(today);
    }).length;

    const activeDevices = devices.filter(device => {
      const lastEvent = events.find(e => e.device_id === device.id);
      return lastEvent && new Date().getTime() - new Date(lastEvent.created_at || '').getTime() < 24 * 60 * 60 * 1000;
    }).length;

    const occupiedLocations = locations.filter(location => {
      const lastEvent = events
        .filter(e => e.home_location_id === location.id)
        .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())[0];
      return lastEvent?.type === 'enter';
    }).length;

    const totalEnters = events.filter(event => event.type === 'enter').length;
    const totalExits = events.filter(event => event.type === 'exit').length;
    const enterExitRatio = totalExits > 0 ? totalEnters / totalExits : totalEnters;

    return {
      todayEvents,
      activeDevices,
      occupiedLocations,
      totalLocations: locations.length,
      totalEnters,
      totalExits,
      enterExitRatio,
    };
  }, [events, devices, locations]);

  // Análisis de tiempo por ubicación
  const timeAnalysis: TimeAnalysis[] = useMemo(() => {
    if (!events.length || !locations.length) return [];

    const analysis: TimeAnalysis[] = [];

    locations.forEach(location => {
      const locationEvents = events.filter(e => e.home_location_id === location.id);
      const enterEvents = locationEvents.filter(e => e.type === 'enter');
      const exitEvents = locationEvents.filter(e => e.type === 'exit');

      let totalTimeInside = 0;
      let validPairs = 0;

      // Calcular tiempo dentro de cada ubicación
      enterEvents.forEach(enterEvent => {
        const correspondingExit = exitEvents.find(exitEvent =>
          exitEvent.device_id === enterEvent.device_id &&
          new Date(exitEvent.created_at || '') > new Date(enterEvent.created_at || '')
        );

        if (correspondingExit) {
          const timeInside = differenceInMinutes(
            new Date(correspondingExit.created_at || ''),
            new Date(enterEvent.created_at || '')
          );
          totalTimeInside += timeInside;
          validPairs++;
        }
      });

      // Calcular tiempo fuera (aproximado)
      const totalTimeOutside = validPairs > 0 ? Math.max(0, (locationEvents.length * 60) - totalTimeInside) : 0;

      analysis.push({
        location: location.name,
        timeInside: totalTimeInside,
        timeOutside: totalTimeOutside,
        totalEvents: locationEvents.length,
        averageStay: validPairs > 0 ? totalTimeInside / validPairs : 0,
      });
    });

    return analysis.filter(item => item.totalEvents > 0);
  }, [events, locations]);

  // Análisis de actividad por horas
  const activityAnalysis: ActivityData[] = useMemo(() => {
    if (!events.length) return [];

    const activityByHour: { [key: string]: ActivityData } = {};

    // Inicializar todas las horas
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = hour.toString().padStart(2, '0') + ':00';
      activityByHour[hourStr] = {
        hour: hourStr,
        enters: 0,
        exits: 0,
        total: 0,
      };
    }

    // Contar eventos por hora
    events.forEach(event => {
      const hour = new Date(event.created_at || '').getHours();
      const hourStr = hour.toString().padStart(2, '0') + ':00';

      if (event.type === 'enter') {
        activityByHour[hourStr].enters++;
      } else if (event.type === 'exit') {
        activityByHour[hourStr].exits++;
      }
      activityByHour[hourStr].total++;
    });

    return Object.values(activityByHour);
  }, [events]);

  // Análisis de dispositivos
  const deviceAnalysis: DeviceActivity[] = useMemo(() => {
    if (!events.length || !devices.length) return [];

    const analysis: DeviceActivity[] = devices.map(device => {
      const deviceEvents = events.filter(e => e.device_id === device.id);
      const lastEvent = deviceEvents.sort((a, b) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      )[0];
      
      const isActive = lastEvent ?
        new Date().getTime() - new Date(lastEvent.created_at || '').getTime() < 24 * 60 * 60 * 1000 : false;

      return {
        device: device.name,
        events: deviceEvents.length,
        lastActive: lastEvent ? format(new Date(lastEvent.created_at || ''), 'dd/MM/yyyy HH:mm', { locale: es }) : 'Nunca',
        status: isActive ? 'active' : 'inactive',
      };
    });

    return analysis.sort((a, b) => b.events - a.events);
  }, [events, devices]);

  // Distribución de eventos por ubicación
  const eventDistribution: EventDistribution[] = useMemo(() => {
    if (!events.length || !locations.length) return [];

    const distribution = locations.map((location, index) => ({
      name: location.name,
      value: events.filter(e => e.home_location_id === location.id).length,
      color: COLORS[index % COLORS.length],
    })).filter(item => item.value > 0);

    return distribution;
  }, [events, locations]);

  // Datos formateados para los gráficos
  const chartData = useMemo(() => ({
    timeChart: timeAnalysis.map(item => ({
      location: item.location,
      'Tiempo Dentro (min)': item.timeInside,
      'Tiempo Fuera (min)': item.timeOutside,
    })),
    activityChart: activityAnalysis,
    distributionChart: eventDistribution,
  }), [timeAnalysis, activityAnalysis, eventDistribution]);

  return {
    metrics,
    timeAnalysis,
    activityAnalysis,
    deviceAnalysis,
    eventDistribution,
    chartData,
    isLoading: false, // Ya que dependemos de hooks que manejan su propio loading
  };
};

export default useAnalytics;
