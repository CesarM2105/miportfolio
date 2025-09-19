import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const SkillsSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { number: '6', suffix: '+', label: t('skills.projects'), color: 'text-green-400' },
    { number: '417', suffix: '', label: t('skills.hours'), color: 'text-blue-400' },
    { number: '3', suffix: '+', label: t('skills.experience'), color: 'text-purple-400' }
  ];

  const skills = [
    { 
      name: 'Python & MySQL', 
      percentage: 90, 
      icon: '</>', 
      iconColor: 'text-blue-400'
    },
    { 
      name: 'Power BI & Excel', 
      percentage: 85, 
      icon: '📈', 
      iconColor: 'text-yellow-400'
    },
    { 
      name: 'Análisis de Datos', 
      percentage: 95, 
      icon: '📊', 
      iconColor: 'text-green-400'
    },
    // { 
    //   name: 'SAP & Automatización', 
    //   percentage: 80, 
    //   icon: '⚙️', 
    //   iconColor: 'text-blue-400'
    // },
    { 
      name: 'Liderazgo y Trabajo en Equipo', 
      percentage: 88, 
      icon: '👥', 
      iconColor: 'text-purple-400'
    },
    { 
      name: 'Pensamiento Crítico', 
      percentage: 92, 
      icon: '🧠', 
      iconColor: 'text-pink-400'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedValues(prev => {
                const newValues = [...prev];
                newValues[index] = skill.percentage;
                return newValues;
              });
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setAnimatedValues(new Array(skills.length).fill(0));
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="habilidades" 
      className={`py-20 ${
        theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-gray-50'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-400 mb-16">
          {t('skills.title')}
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className={`text-5xl font-bold ${stat.color}`}>
                {stat.number}
                <span className="text-3xl">{stat.suffix}</span>
              </div>
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card 
              key={index} 
              className={`shadow-lg hover:shadow-xl transition-shadow ${
                theme === 'dark' 
                  ? 'bg-[#16213e] border-slate-700 hover:border-green-500/30' 
                  : 'bg-white border-gray-200 hover:border-green-300'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`text-3xl ${skill.iconColor}`}>
                    {skill.icon}
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {skill.name}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className={`w-full rounded-full h-2 mr-4 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-2 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-green-500 to-blue-500"
                        style={{ width: `${animatedValues[index] || 0}%` }}
                      />
                    </div>
                    <span className={`font-medium text-lg min-w-[3rem] ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {animatedValues[index] || 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;