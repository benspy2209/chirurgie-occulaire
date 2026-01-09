import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { useContent } from '../components/ContentContext';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent(); // Use dynamic content
  
  const t = content[language].home;
  const tNav = content[language].nav;

  // Fallback image if database is empty/old
  const heroImage = t.hero.image || "https://media.publit.io/file/w_2048/IMG-0175-k.jpeg";

  // SVG Noise pattern for the grain effect
  const noisePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;

  return (
    <div className="flex flex-col h-full">
      {/* 50/50 Split Header Section - Full viewport height minus nav on desktop */}
      <section className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] md:h-[650px] bg-white">
        
        {/* Left: Image (50%) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden bg-slate-50 order-1">
          <img 
            src={heroImage} 
            alt="Dr Remi Dewispelaere" 
            className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
          />
          
          {/* Grain / Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.20] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: noisePattern }}
          ></div>

          {/* Gradient Fades (Fondu) */}
          {/* Mobile: Fade to bottom (white) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white md:hidden"></div>
          {/* Desktop: Fade to right (white) */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white"></div>
        </div>

        {/* Right: Text (50%) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white order-2 relative z-10">
          <div className="max-w-md">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
              {t.hero.subtitle}
            </h2>
            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
              {t.intro.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/rendez-vous" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                {t.hero.cta}
              </Link>
              <Link 
                to="/presentation" 
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-base font-medium text-slate-700 bg-transparent hover:bg-gray-50 transition-colors"
              >
                {tNav.surgeon} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Cards for Routing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/cataracte" className="group p-8 bg-white border border-gray-100 hover:border-slate-300 transition-all duration-300">
              <h3 className="text-2xl font-medium text-slate-900 mb-3 group-hover:text-teal-800 transition-colors">{tNav.cataract}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {language === 'fr' 
                  ? "Remplacement du cristallin opacifié par une technique moderne de phacoémulsification." 
                  : "Replacement of the clouded lens using modern phacoemulsification technique."}
              </p>
            </Link>
            <Link to="/retine" className="group p-8 bg-white border border-gray-100 hover:border-slate-300 transition-all duration-300">
              <h3 className="text-2xl font-medium text-slate-900 mb-3 group-hover:text-teal-800 transition-colors">{tNav.retina}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {language === 'fr' 
                  ? "Prise en charge chirurgicale des pathologies du fond de l'œil (vitrectomie)." 
                  : "Surgical management of posterior segment pathologies (vitrectomy)."}
              </p>
            </Link>
            <Link to="/consultations" className="group p-8 bg-white border border-gray-100 hover:border-slate-300 transition-all duration-300">
              <h3 className="text-2xl font-medium text-slate-900 mb-3 group-hover:text-teal-800 transition-colors">{tNav.exams}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {language === 'fr' 
                  ? "Bilan complet, OCT et biométrie au sein de cabinets équipés." 
                  : "Complete assessment, OCT and biometry in fully equipped practices."}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;