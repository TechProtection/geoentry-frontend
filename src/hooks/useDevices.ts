import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useEventsByDevice } from '@/hooks/useEvents';

interface Device {
  id: string;
  name: string;
  type: string;
  profile_id: string;
  created_at: string;
  updated_at: string;
  profile?: {
    id: string;
    full_name: string;
    email: string;
  };
  sensors?: Array<{
    id: string;
    name: string;
    type: string;
    value: number;
    unit: string;
  }>;
}

const API_BASE_URL = import.meta.env.VITE_GEONTRY_BACKEND;

export const useDevices = () => {
  const { session } = useAuth();

  const fetchMyDevices = async (): Promise<Device[]> => {
    if (!session?.user?.id) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_BASE_URL}/devices/user/${session.user.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching devices: ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery({
    queryKey: ['user-devices', session?.user?.id],
    queryFn: fetchMyDevices,
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useDeviceStats = (devices: Device[] = []) => {
  const totalDevices = devices.length;
  const activeDevices = devices.length; // Asumiendo que todos están activos por ahora
  const devicesOutOfZone = 0; // Implementar lógica según ubicación
  const inactiveDevices = 0; // Implementar lógica según última actividad

  return {
    totalDevices,
    activeDevices,
    devicesOutOfZone,
    inactiveDevices,
  };
};
