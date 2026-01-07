import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { CONTENT } from '../constants';
import { Award, Briefcase, Activity } from 'lucide-react';

const Surgeon: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language].surgeon;

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-12 border-b border-gray-100 pb-8">
          {t.title}
        </h1>

        <div className="space-y-12">
          {/* Diplomas */}
          <section>
            <div className="flex items-start mb-4">
              <Award className="w-6 h-6 text-slate-400 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-medium text-slate-900 mb-4">{language === 'fr' ? 'Diplômes & Certifications' : 'Diplomas & Certifications'}</h2>
                <ul className="space-y-3">
                  {t.diplomas.map((item, idx) => (
                    <li key={idx} className="text-slate-600 text-base leading-relaxed pl-4 border-l-2 border-gray-100">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Specializations */}
          <section>
            <div className="flex items-start mb-4">
              <Activity className="w-6 h-6 text-slate-400 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-medium text-slate-900 mb-4">{language === 'fr' ? 'Spécialisations' : 'Specializations'}</h2>
                <ul className="space-y-2">
                  {t.specializations.map((item, idx) => (
                    <li key={idx} className="text-slate-600 text-base">
                      • {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 bg-gray-50 p-6">
                  {t.activities.map((item, idx) => (
                    <p key={idx} className="text-slate-700 text-sm mb-2 last:mb-0">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Positions */}
          <section>
            <div className="flex items-start mb-4">
              <Briefcase className="w-6 h-6 text-slate-400 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-medium text-slate-900 mb-4">{language === 'fr' ? 'Fonctions Actuelles' : 'Current Positions'}</h2>
                <ul className="space-y-4">
                  {t.positions.map((item, idx) => (
                    <li key={idx} className="text-slate-600 text-base leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Surgeon;