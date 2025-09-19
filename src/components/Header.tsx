import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { label: t('nav.home'), href: '#inicio' },
    { label: t('nav.about'), href: '#sobre-mi' },
    { label: t('nav.skills'), href: '#habilidades' },
    { label: t('nav.experience'), href: '#experiencia' },
    { label: t('nav.education'), href: '#formacion' },
    { label: t('nav.projects'), href: '#proyectos' },
    { label: t('nav.contact'), href: '#contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#1a1a2e]/95 backdrop-blur-md border-b border-gray-800' 
        : 'bg-[#1a1a2e]/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              CM
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 text-yellow-400 hover:text-yellow-300"
            >
              <Sun className="w-5 h-5" />
            </Button>

            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={language === 'es' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 text-sm rounded-full ${
                  language === 'es' 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                ES
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm rounded-full ${
                  language === 'en' 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                EN
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left py-2 px-4 text-gray-300 hover:text-green-400 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;