import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const register = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error de validación",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, {
        data: {
          full_name: data.fullName,
        }
      });
      
      if (error) {
        toast({
          title: "Error de registro",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "¡Registro exitoso!",
        description: "Verifica tu correo electrónico para activar tu cuenta.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al registrarse.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}
