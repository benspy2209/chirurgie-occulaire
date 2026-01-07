import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { CONTENT } from '../constants';

const Retina: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language].retina;

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-8">
          {t.title}
        </h1>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-light">
          <p className="mb-8 leading-relaxed text-xl">
            {t.intro}
          </p>
          <hr className="border-gray-100 my-8"/>
          
          <div className="space-y-6">
            <p className="leading-relaxed">
              {t.details}
            </p>
            
            {t.procedure && (
              <p className="leading-relaxed text-slate-800">
                {t.procedure}
              </p>
            )}
            
            {t.recovery && (
              <p className="leading-relaxed bg-slate-50 p-4 border-l-2 border-slate-300">
                {t.recovery}
              </p>
            )}
          </div>
        </div>

        {t.cost && (
          <div className="mt-12 mb-12 border border-slate-200 p-8 rounded-sm">
             <h2 className="text-xl font-medium text-slate-900 mb-4">{t.cost.title}</h2>
             <p className="text-2xl font-light text-slate-800 mb-2">{t.cost.price}</p>
             <p className="text-sm text-slate-500">{t.cost.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Retina;