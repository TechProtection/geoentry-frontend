import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await signOut();
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
      
      // Redirigir al login
      navigate('/login');
      return true;
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al cerrar sesión.",
        variant: "destructive",
      });
      return false;
    } finally {
      localStorage.clear();
      setLoading(false);
    }
  };

  return { logout, loading };
}
