import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { CONTENT } from '../constants';
import { Upload, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Referral: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language].referral;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    address: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Basic client-side validation (UX only, real validation is on server)
      if (selectedFile.type !== 'application/pdf') {
        alert(language === 'fr' ? "Format PDF uniquement" : "PDF format only");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert(language === 'fr' ? "Fichier trop volumineux (max 10MB)" : "File too large (max 10MB)");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Create FormData to send to Edge Function
      const submissionData = new FormData();
      submissionData.append('file', file);
      submissionData.append('name', formData.name);
      submissionData.append('birthDate', formData.birthDate);
      submissionData.append('address', formData.address);
      submissionData.append('phone', formData.phone);
      submissionData.append('email', formData.email);
      submissionData.append('message', formData.message || '');

      // Invoke Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('submit-referral', {
        body: submissionData,
      });

      if (error) {
        // If the function returns a 400/500, it comes here
        let message = error.message;
        try {
            // Try to parse the custom error message from the function if available
            const context = await error.context; 
            if (context && typeof context === 'object' && 'error' in context) {
                 message = (context as any).error;
            }
        } catch (e) {
            // Ignore parsing error
        }
        throw new Error(message || 'Submission failed');
      }

      // Success
      setIsSubmitted(true);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMsg(
        language === 'fr' 
          ? "Une erreur est survenue lors de l'envoi sécurisé. Veuillez réessayer." 
          : "An error occurred during secure transmission. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
             ? "Votre demande et le dossier médical ont été transmis de manière sécurisée."
             : "Your request and medical file have been securely transmitted."}
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

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">{t.form.name}</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-slate-700 mb-2">{t.form.birthDate}</label>
              <input 
                type="date" 
                id="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange} 
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
                value={formData.address}
                onChange={handleInputChange}
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
                value={formData.phone}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">{t.form.email}</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">{t.form.message}</label>
            <textarea 
              id="message" 
              value={formData.message}
              onChange={handleInputChange}
              rows={4} 
              className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
            ></textarea>
          </div>

          <div>
            <div className={`border-2 border-dashed p-8 text-center transition-colors cursor-pointer relative ${file ? 'border-slate-400 bg-slate-50' : 'border-gray-300 hover:bg-gray-50'}`}>
              <input 
                type="file" 
                accept=".pdf" 
                required 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className={`mx-auto h-10 w-10 mb-4 ${file ? 'text-slate-800' : 'text-slate-400'}`} />
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
               <div className="flex items-center">
                 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></span>
                 {language === 'fr' ? 'Traitement sécurisé...' : 'Processing...'}
               </div>
            ) : (
              t.form.submit
            )}
          </button>
          
          <div className="flex items-center justify-center text-xs text-slate-400 mt-4 bg-gray-50 p-2 rounded text-center">
             <AlertCircle className="w-3 h-3 mr-2 flex-shrink-0" />
             {language === 'fr' 
              ? "Transmission sécurisée et cryptée" 
              : "Secure and encrypted transmission"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Referral;