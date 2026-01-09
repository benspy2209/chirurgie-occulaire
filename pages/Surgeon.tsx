import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useContent } from '../components/ContentContext';
import { Award, Briefcase, Activity } from 'lucide-react';

const Surgeon: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const t = content[language].surgeon;

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

          {/* Specializations & Activities */}
          <section>
            <div className="flex items-start mb-4">
              <Activity className="w-6 h-6 text-slate-400 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-medium text-slate-900 mb-4">{language === 'fr' ? 'Spécialisations & Activité' : 'Specializations & Activity'}</h2>
                <ul className="space-y-2 mb-6">
                  {t.specializations.map((item, idx) => (
                    <li key={idx} className="text-slate-600 text-base">
                      • {item}
                    </li>
                  ))}
                </ul>
                
                {/* Grey Box for Volume/Activities */}
                <div className="bg-gray-50 p-6 mb-4">
                  {t.activities.map((item, idx) => (
                    <p key={idx} className="text-slate-800 font-medium text-sm mb-2 last:mb-0">
                      {item}
                    </p>
                  ))}
                </div>

                {/* Disclaimer (What I don't do) - Small and Italic */}
                <p className="text-xs text-slate-400 italic">
                  {t.disclaimer}
                </p>
              </div>
            </div>
          </section>

          {/* Positions - Moved to Bottom */}
          <section className="pt-8 border-t border-gray-100">
            <div className="flex items-start mb-4">
              <Briefcase className="w-6 h-6 text-slate-400 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-medium text-slate-900 mb-4">{language === 'fr' ? 'Fonctions Actuelles' : 'Current Positions'}</h2>
                <ul className="space-y-4">
                  {t.positions.map((item, idx) => (
                    <li key={idx} className="text-slate-600 text-base leading-relaxed font-light">
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