import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const EducationSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const education = [
    {
      title: 'Lic. Administración de Empresas – UMRPSFX, 2023',
      icon: <GraduationCap className="w-6 h-6 text-green-400" />
    },
    {
      title: 'Programación Inicial con Python – Talento Tech, Junio 2025',
      icon: <GraduationCap className="w-6 h-6 text-green-400" />
    },
    {
      title: 'Capacitación en Python, SQL, Power BI, Databricks e IA aplicada – En curso',
      icon: <GraduationCap className="w-6 h-6 text-green-400" />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="formacion" 
      className={`py-20 ${
        theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-400 mb-16">
          {t('education.title')}
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((item, index) => (
            <Card 
              key={index} 
              className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#16213e] border-slate-700 hover:border-green-500/30' 
                  : 'bg-white border-gray-200 hover:border-green-300'
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <p className={`text-lg leading-relaxed ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;