import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useContent } from '../components/ContentContext';

const Privacy: React.FC = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const t = content[language].privacy;

  return (
    <div className="bg-white min-h-[60vh] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-8">
          {t.title}
        </h1>
        <div className="prose prose-slate prose-sm text-slate-500">
          <p>{t.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;