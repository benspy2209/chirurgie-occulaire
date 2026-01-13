import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useContent } from '../components/ContentContext';
import { Eye } from 'lucide-react';
import SEO from '../components/SEO';

const Consultations: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const t = content[language].exams;

  const seoTitle = language === 'fr' ? "Examens & Consultations" : "Exams & Consultations";
  const seoDesc = language === 'fr'
    ? "Bilan ophtalmologique complet : OCT, biométrie, fond d'œil. Plateau technique de pointe."
    : "Complete ophthalmological assessment: OCT, biometry, fundus. State-of-the-art technical facilities.";

  return (
    <div className="bg-white min-h-screen py-16">
      <SEO title={seoTitle} description={seoDesc} path="/consultations" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-8">
          {t.title}
        </h1>
        
        <p className="text-xl text-slate-600 font-light mb-12">
          {t.intro}
        </p>

        <div className="grid gap-4">
          {t.list.map((item, idx) => (
            <div key={idx} className="flex items-center p-4 border border-gray-100 hover:border-slate-200 transition-colors">
              <Eye className="w-5 h-5 text-slate-400 mr-4" />
              <span className="text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Consultations;