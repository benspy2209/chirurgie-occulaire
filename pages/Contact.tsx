import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useContent } from '../components/ContentContext';
import { MapPin, Phone, Calendar, Clock } from 'lucide-react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const t = content[language].contact;

  const seoTitle = language === 'fr' ? "Contact & Lieux de consultation" : "Contact & Locations";
  const seoDesc = language === 'fr'
    ? "Cabinets d'ophtalmologie à Wavre (Clinique Le Verseau) et Uccle (Messidor Eye Center). Contactez le Dr Dewispelaere."
    : "Ophthalmology practices in Wavre (Clinique Le Verseau) and Uccle (Messidor Eye Center). Contact Dr Dewispelaere.";

  return (
    <div className="bg-white min-h-screen py-16">
      <SEO title={seoTitle} description={seoDesc} path="/lieux" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-12 border-b border-gray-100 pb-8">
          {t.title}
        </h1>
        
        {/* Section 1: Consultations (Enhanced Design) */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium text-slate-900 mb-8 uppercase tracking-wider flex items-center">
            {t.consultation_title}
          </h2>
          
          <div className="space-y-16">
            {t.consultation_locations.map((loc, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Info */}
                  <div className="w-full lg:w-1/3 p-8 flex flex-col justify-between bg-slate-50/50">
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                        {loc.name}
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-start text-slate-600">
                          <MapPin className="w-5 h-5 mr-3 mt-1 text-slate-400 flex-shrink-0" />
                          <p className="text-base font-light leading-relaxed">{loc.address}</p>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Phone className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" />
                          <p className="text-base font-medium">{loc.phone}</p>
                        </div>
                        <div className="flex items-start text-slate-600">
                          <Clock className="w-5 h-5 mr-3 mt-1 text-slate-400 flex-shrink-0" />
                          <p className="text-base font-medium text-slate-800">{loc.hours}</p>
                        </div>
                      </div>
                    </div>

                    <a 
                      href={loc.mikrono_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-6 py-4 bg-slate-900 text-white text-base font-medium hover:bg-slate-800 transition-colors rounded-sm"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {loc.mikrono_text}
                    </a>
                  </div>

                  {/* Right: Map */}
                  <div className="w-full lg:w-2/3 h-64 lg:h-auto min-h-[300px] bg-gray-100 relative">
                     <iframe 
                       src={loc.map_url} 
                       width="100%" 
                       height="100%" 
                       style={{ border: 0, position: 'absolute', inset: 0 }} 
                       allowFullScreen={true} 
                       loading="lazy" 
                       referrerPolicy="no-referrer-when-downgrade"
                       title={`Carte ${loc.name}`}
                     ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Surgery (Simple Grid) */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-medium text-slate-900 mb-8 uppercase tracking-wider">
            {t.surgery_title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.surgery_locations.map((loc, idx) => (
              <div key={idx} className="border border-gray-200 p-8 rounded-sm bg-white hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-medium text-slate-900 mb-4">
                  {loc.name}
                </h3>
                <div className="flex items-center text-slate-600">
                  <Phone className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
                  <p className="text-base">{loc.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;