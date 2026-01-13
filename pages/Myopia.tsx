import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useContent } from '../components/ContentContext';
import SEO from '../components/SEO';

const Myopia: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const t = content[language].myopia;

  const seoTitle = language === 'fr' ? "Myopie Forte & Complications" : "High Myopia & Complications";
  const seoDesc = language === 'fr'
    ? "Suivi et chirurgie de la myopie forte. Implants phaques (ICL) et prévention des risques rétiniens."
    : "Monitoring and surgery for high myopia. Phakic lenses (ICL) and prevention of retinal risks.";

  return (
    <div className="bg-white min-h-screen py-16">
      <SEO title={seoTitle} description={seoDesc} path="/myopie" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-8">
          {t.title}
        </h1>
        
        <div className="bg-slate-50 p-8 md:p-12 mb-12">
          <p className="text-lg text-slate-800 font-medium mb-4">
            {t.intro}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {t.management_text && t.management_text}
          </p>
        </div>

        {t.techniques && (
           <div className="mb-12">
             <h2 className="text-2xl font-medium text-slate-900 mb-6 border-b border-gray-200 pb-4">
               {t.techniques_title}
             </h2>
             <ul className="space-y-4">
               {t.techniques.map((tech, idx) => (
                 <li key={idx} className="flex items-start">
                   <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-slate-400 mt-2.5 mr-3"></span>
                   <span className="text-slate-700 leading-relaxed">{tech}</span>
                 </li>
               ))}
             </ul>
           </div>
        )}

        {t.note && (
           <div className="border-l-4 border-slate-900 pl-6 py-2">
            <p className="text-slate-600 italic">
              {t.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Myopia;