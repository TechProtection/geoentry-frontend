import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
  is_active: boolean;
  profile_id: string;
  created_at: string;
  updated_at: string;
  profile?: {
    id: string;
    full_name: string;
    email: string;
  };
}

const API_BASE_URL = import.meta.env.VITE_GEONTRY_BACKEND;

export const useLocations = () => {
  const { session } = useAuth();

  const fetchMyLocations = async (): Promise<Location[]> => {
    if (!session?.user?.id) {
      throw new Error('No hay sesión activa');
    }

    const response = await fetch(`${API_BASE_URL}/locations/user/${session.user.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching locations: ${response.statusText}`);
    }

    return response.json();
  };

  return useQuery({
    queryKey: ['user-locations', session?.user?.id],
    queryFn: fetchMyLocations,
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useLocationStats = (locations: Location[] = []) => {
  const totalLocations = locations.length;
  const activeLocations = locations.filter(location => location.is_active).length;
  const inactiveLocations = locations.filter(location => !location.is_active).length;
  const locationsWithEvents = 0; // Implementar lógica según eventos

  return {
    totalLocations,
    activeLocations,
    inactiveLocations,
    locationsWithEvents,
  };
};
