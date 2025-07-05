import { useMemo, useState } from 'react';
import { useEvents } from './useEvents';
import { format, isWithinInterval, subDays, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

type DateRange = '7d' | '30d' | '90d' | 'all';

interface FilteredAnalyticsData {
  events: any[];
  totalEvents: number;
  dateRange: DateRange;
  startDate: Date;
  endDate: Date;
}

export const useFilteredAnalytics = () => {
  const { data: allEvents = [] } = useEvents();
  const [dateRange, setDateRange] = useState<DateRange>('7d');

  const filteredData: FilteredAnalyticsData = useMemo(() => {
    const now = new Date();
    let startDate: Date;
    let endDate = now;

    switch (dateRange) {
      case '7d':
        startDate = subDays(now, 7);
        break;
      case '30d':
        startDate = subDays(now, 30);
        break;
      case '90d':
        startDate = subDays(now, 90);
        break;
      case 'all':
      default:
        startDate = new Date(0); // Desde el inicio de los tiempos
        break;
    }

    const filteredEvents = dateRange === 'all' 
      ? allEvents
      : allEvents.filter(event => {
          const eventDate = new Date(event.created_at || '');
          return isWithinInterval(eventDate, { 
            start: startOfDay(startDate), 
            end: endOfDay(endDate) 
          });
        });

    return {
      events: filteredEvents,
      totalEvents: filteredEvents.length,
      dateRange,
      startDate,
      endDate,
    };
  }, [allEvents, dateRange]);

  // Estadísticas de tendencias
  const trends = useMemo(() => {
    const { events } = filteredData;
    const now = new Date();
    
    // Comparar con el período anterior
    const periodDays = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 365;
    const previousStart = subDays(filteredData.startDate, periodDays);
    const previousEnd = filteredData.startDate;

    const previousEvents = allEvents.filter(event => {
      const eventDate = new Date(event.created_at || '');
      return isWithinInterval(eventDate, { 
        start: startOfDay(previousStart), 
        end: endOfDay(previousEnd) 
      });
    });

    const currentCount = events.length;
    const previousCount = previousEvents.length;
    const change = previousCount > 0 ? ((currentCount - previousCount) / previousCount) * 100 : 0;

    return {
      currentPeriod: currentCount,
      previousPeriod: previousCount,
      changePercentage: change,
      isIncreasing: change > 0,
    };
  }, [filteredData, allEvents, dateRange]);

  // Eventos por día
  const dailyEvents = useMemo(() => {
    const { events } = filteredData;
    const dailyCount: { [key: string]: number } = {};

    events.forEach(event => {
      const date = format(new Date(event.created_at || ''), 'yyyy-MM-dd');
      dailyCount[date] = (dailyCount[date] || 0) + 1;
    });

    return Object.entries(dailyCount)
      .map(([date, count]) => ({
        date: format(new Date(date), 'dd/MM', { locale: es }),
        events: count,
        fullDate: date,
      }))
      .sort((a, b) => a.fullDate.localeCompare(b.fullDate));
  }, [filteredData]);

  return {
    ...filteredData,
    setDateRange,
    trends,
    dailyEvents,
  };
};

export default useFilteredAnalytics;
