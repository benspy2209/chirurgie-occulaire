import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { CONTENT } from '../constants';
import { MapPin, Phone, Calendar } from 'lucide-react';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language].contact;

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-12 border-b border-gray-100 pb-8">
          {t.title}
        </h1>
        
        {/* Section 1: Consultations */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium text-slate-900 mb-8 uppercase tracking-wider">
            {t.consultation_title}
          </h2>
          <div className="space-y-12">
            {t.consultation_locations.map((loc, idx) => (
              <div key={idx} className="bg-gray-50 p-8 border border-gray-100 rounded-sm">
                <h3 className="text-xl font-medium text-slate-900 mb-4">
                  {loc.name}
                </h3>
                
                <div className="flex items-start text-slate-600 mb-6">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-slate-400 flex-shrink-0" />
                  <p className="text-base font-light">{loc.address}</p>
                </div>

                <a 
                  href={loc.mikrono_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {loc.mikrono_text}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Surgery */}
        <div>
          <h2 className="text-2xl font-medium text-slate-900 mb-8 uppercase tracking-wider">
            {t.surgery_title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.surgery_locations.map((loc, idx) => (
              <div key={idx} className="border border-gray-200 p-8 rounded-sm">
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