import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { CONTENT } from '../constants';
import { Menu, X, Globe, MapPin } from 'lucide-react';

const Layout: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = CONTENT[language].nav;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Helper for active link class
  const linkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500 hover:text-slate-800'
    }`;
  };
  
  const mobileLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `block px-3 py-2 text-base font-medium ${
      isActive ? 'text-slate-900 bg-gray-50' : 'text-slate-500 hover:text-slate-800 hover:bg-gray-50'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar - Contact Info Only */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
             <span className="flex items-center opacity-80"><MapPin className="w-3 h-3 mr-1" /> Bruxelles / Wavre</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center hover:text-gray-300 transition-colors uppercase font-semibold"
            >
                <Globe className="w-3 h-3 mr-1" /> {language}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex flex-col" onClick={closeMenu}>
                <span className="text-xl font-semibold text-slate-900 tracking-tight">Dr Rémi Dewispelaere</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">Ophtalmologie</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={linkClass('/')}>{t.home}</Link>
              <Link to="/presentation" className={linkClass('/presentation')}>{t.surgeon}</Link>
              
              <div className="relative group h-full flex items-center">
                 <span className="text-sm font-medium text-slate-500 cursor-default hover:text-slate-800">Interventions</span>
                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-48 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/cataracte" className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">{t.cataract}</Link>
                    <Link to="/retine" className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">{t.retina}</Link>
                    <Link to="/myopie" className="block px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">{t.myopia}</Link>
                 </div>
              </div>

              <Link to="/consultations" className={linkClass('/consultations')}>{t.exams}</Link>
              <Link to="/lieux" className={linkClass('/lieux')}>{t.contact}</Link>
              <Link to="/rendez-vous" className="bg-slate-900 text-white px-5 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
                {t.appointment}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <Link to="/" className={mobileLinkClass('/')} onClick={closeMenu}>{t.home}</Link>
              <Link to="/presentation" className={mobileLinkClass('/presentation')} onClick={closeMenu}>{t.surgeon}</Link>
              <div className="pl-4 border-l-2 border-gray-100 my-2">
                <Link to="/cataracte" className={mobileLinkClass('/cataracte')} onClick={closeMenu}>{t.cataract}</Link>
                <Link to="/retine" className={mobileLinkClass('/retine')} onClick={closeMenu}>{t.retina}</Link>
                <Link to="/myopie" className={mobileLinkClass('/myopie')} onClick={closeMenu}>{t.myopia}</Link>
              </div>
              <Link to="/consultations" className={mobileLinkClass('/consultations')} onClick={closeMenu}>{t.exams}</Link>
              <Link to="/lieux" className={mobileLinkClass('/lieux')} onClick={closeMenu}>{t.contact}</Link>
              <Link to="/rendez-vous" className="block w-full text-center mt-4 bg-slate-900 text-white px-5 py-3 text-base font-medium" onClick={closeMenu}>
                {t.appointment}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4">Clinique Le Verseau – Wavre</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                Chaussée de Louvain 43/2, 1300 Wavre<br/>
                Tel: +32 10 41 28 01<br/>
                <a href="mailto:secretariat@cliniqueleverseau.be" className="text-slate-900 hover:underline">secretariat@cliniqueleverseau.be</a>
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4">Liens Rapides</h3>
              <ul className="space-y-2">
                <li><Link to="/presentation" className="text-sm text-slate-500 hover:text-slate-900">{t.surgeon}</Link></li>
                <li><Link to="/cataracte" className="text-sm text-slate-500 hover:text-slate-900">{t.cataract}</Link></li>
                <li><Link to="/rendez-vous" className="text-sm text-slate-500 hover:text-slate-900">{t.appointment}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><Link to="/mentions-legales" className="text-sm text-slate-500 hover:text-slate-900">{t.legal}</Link></li>
                <li><Link to="/politique-confidentialite" className="text-sm text-slate-500 hover:text-slate-900">{t.privacy}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Dr Rémi Dewispelaere.
            </p>
            <p className="text-xs text-slate-400 mt-2 md:mt-0">
               {language === 'fr' ? 'Site d\'information médicale' : 'Medical information website'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;