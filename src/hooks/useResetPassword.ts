import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const sendResetEmail = async (email: string) => {
    if (!email) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa tu email.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Email enviado",
        description: "Verifica tu correo para restablecer tu contraseña.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al enviar el email.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendResetEmail, loading };
}
