import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

interface ProximityEvent {
  id: string;
  type: string;
  latitude: number;
  longitude: number;
  distance: number;
  home_location_id: string;
  home_location_name: string;
  device_id: string | null;
  user_id: string | null;
  created_at: string | null;
}

const API_BASE_URL = import.meta.env.VITE_GEONTRY_BACKEND;

export const useEvents = () => {
  const { session } = useAuth();

  const fetchMyEvents = async (): Promise<ProximityEvent[]> => {
    if (!session?.user?.id) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_BASE_URL}/proximity-events/user/${session.user.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery({
    queryKey: ['user-events', session?.user?.id],
    queryFn: fetchMyEvents,
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000, // 2 minutos (eventos se actualizan más frecuentemente)
  });
};

export const useEventsByDevice = (deviceId: string) => {
  const fetchEventsByDevice = async (): Promise<ProximityEvent[]> => {
    if (!deviceId) {
      throw new Error('Device ID requerido');
    }

    const response = await fetch(`${API_BASE_URL}/proximity-events/device/${deviceId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching device events: ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery({
    queryKey: ['device-events', deviceId],
    queryFn: fetchEventsByDevice,
    enabled: !!deviceId,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000,
  });
};

export const useEventsByLocation = (locationId: string) => {
  const fetchEventsByLocation = async (): Promise<ProximityEvent[]> => {
    if (!locationId) {
      throw new Error('Location ID requerido');
    }

    const response = await fetch(`${API_BASE_URL}/proximity-events/location/${locationId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching location events: ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery({
    queryKey: ['location-events', locationId],
    queryFn: fetchEventsByLocation,
    enabled: !!locationId,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000,
  });
};

export const useEventStats = (events: ProximityEvent[] = []) => {
  const totalEvents = events.length;
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.created_at || '');
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  }).length;
  
  const enterEvents = events.filter(event => event.type === 'enter').length;
  const exitEvents = events.filter(event => event.type === 'exit').length;
  
  const recentEvents = events
    .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
    .slice(0, 5);

  return {
    totalEvents,
    todayEvents,
    enterEvents,
    exitEvents,
    recentEvents,
  };
};
