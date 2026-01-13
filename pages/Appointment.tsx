import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useContent } from '../components/ContentContext';
import { Calendar, Phone, MapPin, Eye, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Appointment: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const t = content[language].appointment;
  const opts = t.options;

  const seoTitle = language === 'fr' ? "Prendre Rendez-vous" : "Book Appointment";
  const seoDesc = language === 'fr'
    ? "Rendez-vous en ligne via Mikrono pour le Dr Dewispelaere. Cabinet Wavre (Le Verseau) ou Uccle (Messidor)."
    : "Book online via Mikrono for Dr Dewispelaere. Practices in Wavre (Le Verseau) or Uccle (Messidor).";

  return (
    <div className="bg-white min-h-screen py-16">
      <SEO title={seoTitle} description={seoDesc} path="/rendez-vous" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-8 text-center">
          {t.title}
        </h1>
        
        <p className="text-xl text-slate-600 font-light mb-16 text-center max-w-2xl mx-auto">
          {t.intro}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Option 1: Wavre */}
          <div className="bg-white border border-gray-200 rounded-sm p-8 flex flex-col hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-900">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-medium text-slate-900 mb-2">{opts.wavre.city}</h2>
            <h3 className="text-lg text-slate-600 mb-6">{opts.wavre.title}</h3>
            
            <div className="space-y-4 mb-8 flex-grow">
              <p className="text-slate-500 text-sm flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                {opts.wavre.address}
              </p>
              <p className="text-slate-500 text-sm flex items-center">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                {opts.wavre.phone}
              </p>
            </div>

            <a 
              href={opts.wavre.mikronoLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {opts.wavre.mikronoText}
            </a>
          </div>

          {/* Option 2: Messidor */}
          <div className="bg-white border border-gray-200 rounded-sm p-8 flex flex-col hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full text-slate-900">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-medium text-slate-900 mb-2">{opts.messidor.city}</h2>
            <h3 className="text-lg text-slate-600 mb-6">{opts.messidor.title}</h3>
            
            <div className="space-y-4 mb-8 flex-grow">
              <p className="text-slate-500 text-sm flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                {opts.messidor.address}
              </p>
              <p className="text-slate-500 text-sm flex items-center">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                {opts.messidor.phone}
              </p>
            </div>

            <a 
              href={opts.messidor.mikronoLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {opts.messidor.mikronoText}
            </a>
          </div>

          {/* Option 3: Referral / Emergency */}
          <div className="bg-slate-50 border border-slate-200 rounded-sm p-8 flex flex-col hover:border-slate-300 transition-all duration-300">
            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-full text-slate-900">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-medium text-slate-900 mb-2">{opts.referral.title}</h2>
            
            <div className="space-y-4 mb-8 flex-grow">
              <p className="text-slate-600 font-light leading-relaxed">
                {opts.referral.subtitle}
              </p>
              <p className="text-slate-500 text-sm italic">
                {opts.referral.description}
              </p>
            </div>

            <Link 
              to="/reference" 
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-white border border-slate-300 text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors group"
            >
              {opts.referral.actionText}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Appointment;