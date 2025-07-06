import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

interface Sensor {
  id: string;
  name: string;
  sensor_type: 'led_tv' | 'smart_light' | 'air_conditioner' | 'coffee_maker';
  isActive: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = import.meta.env.VITE_GEONTRY_BACKEND;

export const useSensors = () => {
  const { session } = useAuth();

  const fetchMySensors = async (): Promise<Sensor[]> => {
    if (!session?.user?.id) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_BASE_URL}/sensors/user/${session.user.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching sensors: ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery({
    queryKey: ['user-sensors', session?.user?.id],
    queryFn: fetchMySensors,
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useSensorStats = (sensors: Sensor[] = []) => {
  const totalSensors = sensors.length;
  const activeSensors = sensors.filter(sensor => sensor.isActive).length;
  const inactiveSensors = sensors.filter(sensor => !sensor.isActive).length;

  // Estadísticas por tipo
  const sensorsByType = sensors.reduce((acc, sensor) => {
    acc[sensor.sensor_type] = (acc[sensor.sensor_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalSensors,
    activeSensors,
    inactiveSensors,
    sensorsByType,
  };
};

// Función para obtener el nombre en español del tipo de sensor
export const getSensorTypeName = (type: string): string => {
  const typeNames: Record<string, string> = {
    led_tv: 'Smart TV',
    smart_light: 'Luz Inteligente',
    air_conditioner: 'Aire Acondicionado',
    coffee_maker: 'Cafetera',
  };
  return typeNames[type] || type;
};

// Función para obtener el icono del tipo de sensor
export const getSensorTypeIcon = (type: string): string => {
  const typeIcons: Record<string, string> = {
    led_tv: '📺',
    smart_light: '💡',
    air_conditioner: '❄️',
    coffee_maker: '☕',
  };
  return typeIcons[type] || '🔌';
};
