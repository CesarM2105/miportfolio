import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mí',
    'nav.skills': 'Habilidades',
    'nav.experience': 'Experiencia',
    'nav.education': 'Formación',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.greeting': 'Hola, soy',
    'hero.name': 'César Mendoza',
    'hero.title': 'Lic. Administración de Empresas | Analista de Datos & Backend',
    'hero.description': 'Profesional orientado a resultados con experiencia en análisis de datos, SAP y automatización de procesos.',
    'hero.downloadCV': 'Descargar CV',
    
    // About Section
    'about.title': 'Sobre Mí',
    'about.description': 'Licenciado en Administración de Empresas con perfil orientado a resultados, adaptable y con ganas de crecer en el área de TI. Experiencia en análisis de datos, manejo de SAP y automatización de procesos. Busco aplicar mis conocimientos en Python, SQL y Power BI para generar valor en proyectos de datos.',
    
    // Skills Section
    'skills.title': 'Habilidades',
    'skills.projects': 'Proyectos',
    'skills.hours': 'Horas de Formación',
    'skills.experience': 'Años Experiencia',
    
    // Experience Section
    'experience.title': 'Experiencia',
    'experience.current': 'En curso',
    'experience.job1.title': 'Pasante en Análisis de Datos y SAP',
    'experience.job1.company': 'Artech + Fundación Pescar',
    'experience.job1.description': 'Programa de 417 horas enfocado en análisis de datos y manejo de SAP',
    'experience.job2.title': 'Proyecto de Simulación Empresarial',
    'experience.job2.company': 'USFX',
    'experience.job2.period': 'Mayo - Nov 2023',
    'experience.job2.description': 'Liderazgo en desarrollo de plan de negocios y análisis estratégico',
    'experience.job3.title': 'Auxiliar de Administración',
    'experience.job3.company': 'Gobernación de Chuquisaca',
    'experience.job3.period': 'Sep 2022 - Ene 2023',
    'experience.job3.description': 'Apoyo en procesos administrativos y gestión documental',
    
    // Education Section
    'education.title': 'Formación',
    
    // Projects Section
    'projects.title': 'Proyectos',
    'projects.subtitle': 'Proyectos desarrollados que demuestran habilidades técnicas y de gestión, desde desarrollo backend hasta análisis de datos.',
    'projects.backend': 'Desarrollo Backend',
    'projects.dataAnalysis': 'Análisis de Datos',
    'projects.code': 'Código',
    'projects.demo': 'Demo',
    'projects.note': '* Proyecto académico/profesional - Código no disponible públicamente',
    
    // Contact Section
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Tienes un proyecto en mente? ¡Me encantaría colaborar contigo!',
    'contact.info': 'Información de Contacto',
    'contact.form': 'Envíame un Mensaje',
    'contact.name': 'Tu nombre completo',
    'contact.email': 'tu@email.com',
    'contact.company': 'Nombre de tu empresa (opcional)',
    'contact.subject': 'Selecciona un tema',
    'contact.message': 'Cuéntame sobre tu proyecto o propuesta...',
    'contact.send': 'Enviar Mensaje',
    'contact.whyWork': '¿Por qué trabajar conmigo?',
    'contact.reason1': 'Sólida formación académica y técnica especializada',
    'contact.reason2': 'Experiencia en gestión y liderazgo de equipos',
    'contact.reason3': 'Enfoque en resultados y mejora continua',
    'contact.reason4': 'Adaptabilidad y pensamiento crítico',
    'contact.reason5': 'Compromiso con la excelencia y ética profesional',
    'contact.success': 'Mensaje enviado correctamente',
    'contact.error': 'Por favor completa todos los campos',
    
    // Footer
    'footer.rights': '© 2025 César Mendoza. Todos los derechos reservados.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Hello, I am',
    'hero.name': 'César Mendoza',
    'hero.title': 'Business Administration Graduate | Data Analyst & Backend',
    'hero.description': 'Results-oriented professional with experience in data analysis, SAP and process automation.',
    'hero.downloadCV': 'Download CV',
    
    // About Section
    'about.title': 'About Me',
    'about.description': 'Business Administration graduate with a results-oriented profile, adaptable and eager to grow in the IT area. Experience in data analysis, SAP management and process automation. I seek to apply my knowledge in Python, SQL and Power BI to generate value in data projects.',
    
    // Skills Section
    'skills.title': 'Skills',
    'skills.projects': 'Projects',
    'skills.hours': 'Training Hours',
    'skills.experience': 'Years Experience',
    
    // Experience Section
    'experience.title': 'Experience',
    'experience.current': 'Current',
    'experience.job1.title': 'Data Analysis and SAP Intern',
    'experience.job1.company': 'Artech + Fundación Pescar',
    'experience.job1.description': '417-hour program focused on data analysis and SAP management',
    'experience.job2.title': 'Business Simulation Project',
    'experience.job2.company': 'USFX',
    'experience.job2.period': 'May - Nov 2023',
    'experience.job2.description': 'Leadership in business plan development and strategic analysis',
    'experience.job3.title': 'Administrative Assistant',
    'experience.job3.company': 'Government of Chuquisaca',
    'experience.job3.period': 'Sep 2022 - Jan 2023',
    'experience.job3.description': 'Support in administrative processes and document management',
    
    // Education Section
    'education.title': 'Education',
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.subtitle': 'Developed projects that demonstrate technical and management skills, from backend development to data analysis.',
    'projects.backend': 'Backend Development',
    'projects.dataAnalysis': 'Data Analysis',
    'projects.code': 'Code',
    'projects.demo': 'Demo',
    'projects.note': '* Academic/professional project - Code not publicly available',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.subtitle': 'Do you have a project in mind? I would love to collaborate with you!',
    'contact.info': 'Contact Information',
    'contact.form': 'Send me a Message',
    'contact.name': 'Your full name',
    'contact.email': 'your@email.com',
    'contact.company': 'Your company name (optional)',
    'contact.subject': 'Select a topic',
    'contact.message': 'Tell me about your project or proposal...',
    'contact.send': 'Send Message',
    'contact.whyWork': 'Why work with me?',
    'contact.reason1': 'Solid academic and specialized technical training',
    'contact.reason2': 'Experience in team management and leadership',
    'contact.reason3': 'Focus on results and continuous improvement',
    'contact.reason4': 'Adaptability and critical thinking',
    'contact.reason5': 'Commitment to excellence and professional ethics',
    'contact.success': 'Message sent successfully',
    'contact.error': 'Please fill in all fields',
    
    // Footer
    'footer.rights': '© 2025 César Mendoza. All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};