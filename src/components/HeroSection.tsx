import { Button } from '@/components/ui/button';
import { Download, Linkedin, Github, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Slot } from '@radix-ui/react-slot'; // necesario para asChild

const HeroSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const cvLink = '/assets/CV_JulioCesar.pdf';
  const linkedinLink = 'https://www.linkedin.com/in/julio-cesar-mendoza-revollo';
  const githubLink = 'https://github.com/CesarM105?tab=repositories';
  const mailLink = 'mailto:cesarmendoza2105@gmail.com';

  return (
    <section id="inicio" className={`min-h-screen flex items-center justify-center pt-20 ${
      theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-green-500/20">
              <img src="/assets/profile.jpeg" alt={t('hero.name')} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t('hero.greeting')}</p>
            <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('hero.name')}</h1>
            <h2 className="text-xl lg:text-2xl text-green-400 font-semibold mb-6">{t('hero.title')}</h2>
            <p className={`text-lg mb-8 max-w-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('hero.description')}</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href={cvLink} download>
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                  <Download className="w-5 h-5 mr-2" />
                  {t('hero.downloadCV')}
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button asChild variant="outline" size="icon" className={`rounded-full ${theme === 'dark' ? 'border-green-500/30 text-green-400 hover:bg-green-500/10' : 'border-green-500 text-green-600 hover:bg-green-50'}`}>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>

              <Button asChild variant="outline" size="icon" className={`rounded-full ${theme === 'dark' ? 'border-green-500/30 text-green-400 hover:bg-green-500/10' : 'border-green-500 text-green-600 hover:bg-green-50'}`}>
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>

              <Button asChild variant="outline" size="icon" className={`rounded-full ${theme === 'dark' ? 'border-green-500/30 text-green-400 hover:bg-green-500/10' : 'border-green-500 text-green-600 hover:bg-green-50'}`}>
                <a href={mailLink}>
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
