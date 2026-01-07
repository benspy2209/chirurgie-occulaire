import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { CONTENT } from '../constants';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Referral: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language].referral;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center p-8 bg-slate-50 border border-slate-100 rounded-sm">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-light text-slate-900 mb-4">{t.form.success}</h2>
          <p className="text-slate-500 mb-8 text-sm">
            {language === 'fr' 
             ? "Votre demande a été enregistrée. Un membre de notre équipe traitera votre dossier."
             : "Your request has been recorded. A member of our team will process your file."}
          </p>
          <Link to="/" className="text-slate-900 underline text-sm hover:text-slate-700">
            {language === 'fr' ? "Retour à l'accueil" : "Back to Home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-8 text-center">
          {t.title}
        </h1>
        
        <p className="text-lg text-slate-600 font-light mb-12 text-center bg-slate-50 p-6 rounded-sm border border-slate-100">
          {t.intro}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">{t.form.name}</label>
              <input 
                type="text" 
                id="name" 
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-slate-700 mb-2">{t.form.birthDate}</label>
              <input 
                type="date" 
                id="birthDate" 
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
             <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">{t.form.address}</label>
             <input 
                type="text" 
                id="address" 
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
             />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">{t.form.phone}</label>
              <input 
                type="tel" 
                id="phone" 
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">{t.form.email}</label>
              <input 
                type="email" 
                id="email" 
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">{t.form.message}</label>
            <textarea 
              id="message" 
              rows={4} 
              className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
            ></textarea>
          </div>

          <div>
            <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept=".pdf" 
                required 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="mx-auto h-10 w-10 text-slate-400 mb-4" />
              <p className="text-sm text-slate-600 font-medium">
                {file ? file.name : t.form.file}
              </p>
              {!file && <p className="text-xs text-slate-400 mt-1">.PDF only</p>}
            </div>
            {t.form.file_help && (
              <p className="mt-3 text-sm text-slate-600 italic bg-blue-50 p-3 rounded-sm border border-blue-100">
                {t.form.file_help}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !file}
            className={`w-full py-4 px-6 text-white font-medium text-lg transition-colors flex items-center justify-center ${
              isLoading || !file ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {isLoading ? (
               <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              t.form.submit
            )}
          </button>
          
          <div className="flex items-center justify-center text-xs text-slate-400 mt-4 bg-gray-50 p-2 rounded text-center">
             <AlertCircle className="w-3 h-3 mr-2 flex-shrink-0" />
             {language === 'fr' 
              ? "Transmission exclusive à r.dewispelaere@cliniqueleverseau.be" 
              : "Transmitted exclusively to r.dewispelaere@cliniqueleverseau.be"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Referral;