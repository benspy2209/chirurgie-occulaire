import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useContent } from '../components/ContentContext';

const Cataract: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const t = content[language].cataract;

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-8">
          {t.title}
        </h1>
        
        <div className="text-xl text-slate-600 font-light mb-12 leading-relaxed space-y-4">
          <p>{t.intro}</p>
          {t.intro_secondary && (
             <p>{t.intro_secondary}</p>
          )}
        </div>

        <div className="bg-gray-50 p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-medium text-slate-900 mb-6 border-b border-gray-200 pb-4">
            {t.technique.title}
          </h2>
          <ul className="space-y-6">
            {t.technique.steps.map((step, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 text-xs font-bold mt-0.5 mr-4">
                  {idx + 1}
                </span>
                <span className="text-slate-700 leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ul>
          {t.technique.implant_details && (
            <div className="mt-8 p-4 bg-white border-l-4 border-slate-900 shadow-sm">
                <p className="text-slate-700 italic text-sm md:text-base leading-relaxed">
                    {t.technique.implant_details}
                </p>
            </div>
          )}
        </div>
        
        {t.cost && (
          <div className="mb-12 border border-slate-200 p-8 rounded-sm">
             <h2 className="text-xl font-medium text-slate-900 mb-4">{t.cost.title}</h2>
             <p className="text-2xl font-light text-slate-800 mb-2">{t.cost.price}</p>
             <p className="text-sm text-slate-500">{t.cost.note}</p>
          </div>
        )}

        <div className="border-l-4 border-slate-900 pl-6 py-2">
          <p className="text-slate-600 italic">
            {t.note}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cataract;