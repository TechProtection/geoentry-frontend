
import { Bell, Mail, Volume2, Settings as SettingsIcon, HelpCircle, ChevronDown, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const faqs = [
  "¿Cómo funciona el sistema de geofencing?",
  "¿Qué precisión tiene el seguimiento de ubicación?",
  "¿Puedo configurar múltiples ubicaciones?",
  "¿Cómo se registran los dispositivos?",
  "¿Se pueden exportar los datos de eventos?",
  "¿Cómo funcionan las notificaciones?",
  "¿Qué hago si un dispositivo no aparece en el mapa?",
  "¿Puedo cambiar el radio de una ubicación?"
];

export default function Configuration() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:u202212338@upc.edu.pe?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsDialogOpen(false);
  };
  return (
    <div className="space-y-6">
      {}
      <div>
        <h1 className="text-2xl font-bold text-white">Soporte</h1>
        <p className="text-geo-text-muted">Encuentra respuestas a las preguntas más comunes y contacta con nuestro equipo de soporte técnico</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="lg:col-span-2 space-y-6">

          {}
          <Card className="bg-geo-gray border-geo-gray-light">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Preguntas Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-geo-darker rounded-lg text-left hover:bg-geo-gray-light transition-colors">
                      <span className="text-white text-sm">{faq}</span>
                      <ChevronDown className="h-4 w-4 text-geo-text-muted" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-3 py-2">
                      <p className="text-geo-text-muted text-sm">
                        Esta es una respuesta de ejemplo para la pregunta frecuente. 
                        Aquí se proporcionaría información detallada sobre el tema.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {}
        <div>
          <Card className="bg-geo-gray border-geo-gray-light">
            <CardHeader>
              <CardTitle className="text-white">Soporte Técnico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="h-16 w-16 bg-geo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">¿Necesitas Ayuda?</h3>
                <p className="text-geo-text-muted text-sm mb-4">
                  Nuestro equipo de soporte está disponible para ayudarte con cualquier consulta.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-geo-darker rounded-lg">
                  <p className="text-white text-sm font-medium">Datos de ubicación en tiempo real</p>
                  <p className="text-geo-text-muted text-xs">Monitoreo avanzado y preciso</p>
                </div>
                
                <div className="p-3 bg-geo-darker rounded-lg">
                  <p className="text-white text-sm font-medium">Almacenamiento Servidor seguro con respaldo</p>
                  <p className="text-geo-text-muted text-xs">Acceso Solo usuarios autorizados</p>
                </div>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-geo-blue hover:bg-geo-blue-dark">
                    <Mail className="h-4 w-4 mr-2" />
                    Contactar Soporte
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-geo-gray border-geo-gray-light max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-white">Contactar Soporte Técnico</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-geo-darker border-geo-gray-light text-white placeholder:text-geo-text-muted"
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-geo-darker border-geo-gray-light text-white placeholder:text-geo-text-muted"
                        placeholder="tu.email@ejemplo.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">Asunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-geo-darker border-geo-gray-light text-white placeholder:text-geo-text-muted"
                        placeholder="Resumen del problema o consulta"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-geo-darker border-geo-gray-light text-white placeholder:text-geo-text-muted min-h-[120px]"
                        placeholder="Describe tu problema o consulta en detalle..."
                        required
                      />
                    </div>
                    
                    <DialogFooter className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-geo-gray-light text-geo-text-muted hover:bg-geo-darker"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="bg-geo-blue hover:bg-geo-blue-dark"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Email
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
