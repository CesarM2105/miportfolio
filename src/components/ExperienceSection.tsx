import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const ExperienceSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      title: t('experience.job1.title'),
      company: t('experience.job1.company'),
      period: t('experience.current'),
      description: t('experience.job1.description'),
      current: true
    },
    {
      title: t('experience.job2.title'),
      company: t('experience.job2.company'),
      period: t('experience.job2.period'),
      description: t('experience.job2.description'),
      current: false
    },
    {
      title: t('experience.job3.title'),
      company: t('experience.job3.company'),
      period: t('experience.job3.period'),
      description: t('experience.job3.description'),
      current: false
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
      id="experiencia" 
      className={`py-20 ${
        theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-400 mb-16">
          {t('experience.title')}
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#16213e] border-slate-700 hover:border-green-500/30' 
                  : 'bg-white border-gray-200 hover:border-green-300'
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {exp.title}
                    </h3>
                    <p className="text-green-400 font-medium text-lg">
                      {exp.company}
                    </p>
                  </div>
                  <Badge 
                    className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 text-xs font-medium flex-shrink-0"
                  >
                    {exp.period}
                  </Badge>
                </div>
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {exp.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;