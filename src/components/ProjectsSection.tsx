import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Database, BarChart3, Globe, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const ProjectsSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: 'Sistema CRUD de Gestión de Productos',
      description: 'Sistema desarrollado en Python para gestionar inventario de productos con operaciones completas de crear, leer, actualizar y eliminar. Incluye validación de datos y manejo de errores.',
      category: 'Desarrollo Backend',
      icon: <Database className="w-8 h-8 text-green-400" />,
      features: [
        'Base de datos SQLite',
        'Validación de datos',
        'Manejo de errores',
        'Interfaz por consola'
      ],
      technologies: ['Python', 'SQLite', 'CRUD Operations'],
      githubUrl: 'https://github.com/CesarM105',
      demoUrl: null,
      academic: true
    },
    {
      title: 'Dashboard de Análisis de Datos',
      description: 'Desarrollo de reportes interactivos usando Power BI para visualizar métricas clave de negocio. Automatización de procesos de extracción y transformación de datos.',
      category: 'Análisis de Datos',
      icon: <BarChart3 className="w-8 h-8 text-green-400" />,
      features: [
        'Visualizaciones interactivas',
        'KPIs automatizados',
        'Reportes dinámicos',
        'Integración Excel'
      ],
      technologies: ['Power BI', 'Excel', 'Data Analysis'],
      githubUrl: 'https://github.com/CesarM105',
      demoUrl: null,
      academic: true
    },
    {
      title: 'Aplicación Web de Gestión',
      description: 'Desarrollo full-stack de aplicación web para gestión empresarial con autenticación de usuarios y panel administrativo.',
      category: 'Desarrollo Web',
      icon: <Globe className="w-8 h-8 text-green-400" />,
      features: [
        'Autenticación de usuarios',
        'Panel administrativo',
        'Responsive design',
        'Base de datos MySQL'
      ],
      technologies: ['Python', 'Flask', 'MySQL'],
      githubUrl: 'https://github.com/CesarM105',
      demoUrl: null,
      academic: true
    },
    {
      title: 'API REST para E-commerce',
      description: 'Desarrollo de API REST completa para plataforma de e-commerce con integración de pagos y gestión de inventario.',
      category: 'API Development',
      icon: <ShoppingCart className="w-8 h-8 text-green-400" />,
      features: [
        'API REST completa',
        'Integración de pagos',
        'Gestión de inventario',
        'Documentación Swagger'
      ],
      technologies: ['Python', 'FastAPI', 'PostgreSQL'],
      githubUrl: 'https://github.com/CesarM105',
      demoUrl: null,
      academic: true
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
      id="proyectos" 
      className={`py-20 ${
        theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-400 mb-6">
          {t('projects.title')}
        </h2>
        <p className={`text-center text-lg mb-16 max-w-3xl mx-auto ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Proyectos desarrollados que demuestran habilidades técnicas y de gestión, desde desarrollo backend hasta análisis de datos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`shadow-lg hover:shadow-xl transition-all duration-300 h-full ${
                theme === 'dark' 
                  ? 'bg-[#16213e] border-slate-700 hover:border-green-500/30' 
                  : 'bg-white border-gray-200 hover:border-green-300'
              }`}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0">
                    {project.icon}
                  </div>
                  <div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2 text-xs">
                      {project.category}
                    </Badge>
                    <h3 className={`text-lg font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className={`mb-4 leading-relaxed flex-grow text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Características principales:
                  </h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center gap-2 text-xs ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="outline" 
                      className={`text-xs ${
                        theme === 'dark' 
                          ? 'border-gray-600 text-gray-300' 
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`flex-1 text-xs ${
                      theme === 'dark' 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Código
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10 text-xs"
                    disabled={!project.demoUrl}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Demo
                  </Button>
                </div>

                {project.academic && (
                  <p className={`text-xs italic mt-2 text-center ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    * Proyecto académico/profesional - Código no disponible públicamente
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;