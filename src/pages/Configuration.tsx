
import { Bell, Mail, Volume2, Settings as SettingsIcon, HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-geo-text-muted">Personaliza las preferencias y ajustes del sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notifications */}
          <Card className="bg-geo-gray border-geo-gray-light">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Notificaciones en la aplicación</p>
                  <p className="text-geo-text-muted text-sm">Recibir alertas en tiempo real</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Notificaciones por email</p>
                  <p className="text-geo-text-muted text-sm">Recibir resúmenes por correo electrónico</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Sonidos de notificación</p>
                  <p className="text-geo-text-muted text-sm">Reproducir sonidos para eventos importantes</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="bg-geo-gray border-geo-gray-light">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <SettingsIcon className="h-5 w-5 mr-2" />
                Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Actualización automática</p>
                  <p className="text-geo-text-muted text-sm">Actualizar datos automáticamente</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Intervalo de actualización</p>
                  <p className="text-geo-text-muted text-sm">Frecuencia de actualización de datos</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32 bg-geo-darker border-geo-gray-light text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-geo-darker border-geo-gray-light">
                    <SelectItem value="10">10 segundos</SelectItem>
                    <SelectItem value="30">30 segundos</SelectItem>
                    <SelectItem value="60">1 minuto</SelectItem>
                    <SelectItem value="300">5 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
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

        {/* Right Column - Support */}
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
              
              <Button className="w-full bg-geo-blue hover:bg-geo-blue-dark">
                <Mail className="h-4 w-4 mr-2" />
                Contactar Soporte
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-6 flex space-x-3">
            <Button variant="outline" className="flex-1 border-geo-gray-light text-white hover:bg-geo-gray-light">
              Restaurar por Defecto
            </Button>
            <Button className="flex-1 bg-geo-blue hover:bg-geo-blue-dark">
              Guardar Configuración
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
