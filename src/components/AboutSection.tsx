import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const AboutSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      id="sobre-mi" 
      className={`py-20 ${
        theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-400 mb-12">
          {t('about.title')}
        </h2>

        <div className="max-w-4xl mx-auto">
          <Card className={`shadow-xl ${
            theme === 'dark' 
              ? 'bg-[#16213e] border-slate-700' 
              : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-8">
              <p className={`text-lg leading-relaxed text-center ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('about.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;