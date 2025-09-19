import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const form = useRef<HTMLFormElement>(null);

  const whyWorkReasons = [
    t('contact.reason1'),
    t('contact.reason2'),
    t('contact.reason3'),
    t('contact.reason4'),
    t('contact.reason5')
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lastSent = localStorage.getItem("lastEmailSent");
    if (lastSent) {
      const diff = Date.now() - parseInt(lastSent, 10);
      if (diff < 24 * 60 * 60 * 1000) {
        toast.error("Ya enviaste un mensaje. Podés volver a enviar uno en 24 horas.");
        return;
      }
    }

    const service_id = "service_n3ji0j8";
    const templateID = "template_uykovnr";
    const publicKey = "llH7Qjy8R58lULjCw";

    if (form.current) {
      setIsSubmitting(true);
      emailjs.sendForm(service_id, templateID, form.current, publicKey).then(
        () => {
          setIsSubmitting(false);
          localStorage.setItem("lastEmailSent", Date.now().toString());
          toast.success("Mensaje enviado correctamente ✅");

          setFormData({
            name: '',
            email: '',
            company: '',
            subject: '',
            message: ''
          });
        },
        (error) => {
          setIsSubmitting(false);
          toast.error(`Error al intentar enviar mail: ${error}`);
        }
      );
    }
  };

  return (
    <section 
      id="contacto" 
      className={`py-20 ${theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1 lg:w-1/2">
              <Card className={`h-full ${theme === 'dark' ? 'bg-[#16213e] border-slate-700' : 'bg-white border-gray-200'}`}>
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-400">
                      {t('contact.whyWork')}
                    </h3>
                  </div>
                  <div className="space-y-4 flex-1">
                    {whyWorkReasons.map((reason, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                          {reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="flex-1 lg:w-1/2">
              <Card className={`h-full ${theme === 'dark' ? 'bg-[#16213e] border-slate-700' : 'bg-white border-gray-200'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl text-green-400">
                    Envíame un Mensaje
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <form ref={form} onSubmit={handleSubmit} className="space-y-6 h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={t('contact.name')}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`${theme === 'dark' 
                          ? 'bg-[#1a1a2e] border-slate-600 text-white placeholder-gray-400 focus:border-green-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'}`}
                      />
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={t('contact.emailPlaceholder')}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`${theme === 'dark' 
                          ? 'bg-[#1a1a2e] border-slate-600 text-white placeholder-gray-400 focus:border-green-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'}`}
                      />
                    </div>

                    <Select onValueChange={handleSelectChange} value={formData.subject}>
                      <SelectTrigger className={`${theme === 'dark' 
                        ? 'bg-[#1a1a2e] border-slate-600 text-white focus:border-green-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'}`}>
                        <SelectValue placeholder={t('contact.subjectPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className={`${theme === 'dark' ? 'bg-[#1a1a2e] border-slate-600' : 'bg-white border-gray-300'}`}>
                        <SelectItem value="collaboration">Colaboración en Proyecto</SelectItem>
                        <SelectItem value="job">Oportunidad Laboral</SelectItem>
                        <SelectItem value="consulting">Consultoría</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>

                    <Textarea
                      name="message"
                      placeholder={t('contact.messagePlaceholder')}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={`min-h-[120px] resize-none ${theme === 'dark' 
                        ? 'bg-[#1a1a2e] border-slate-600 text-white placeholder-gray-400 focus:border-green-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'}`}
                    />

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Enviando..." : t('contact.send')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
