import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useResetPassword } from '@/hooks/useResetPassword';

export function ResetPasswordDialog() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const { sendResetEmail, loading } = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await sendResetEmail(email);
    if (success) {
      setEmail('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-geo-blue hover:text-geo-blue-dark text-sm font-medium">
          ¿Olvidaste tu contraseña?
        </button>
      </DialogTrigger>
      <DialogContent className="bg-geo-gray border-geo-gray-light">
        <DialogHeader>
          <DialogTitle className="text-white">Restablecer contraseña</DialogTitle>
          <DialogDescription className="text-geo-text-muted">
            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-white">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-geo-darker border-geo-gray-light text-white placeholder:text-geo-text-muted focus:border-geo-blue"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-geo-gray-light text-white hover:bg-geo-gray-light"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-geo-blue hover:bg-geo-blue-dark text-white"
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
