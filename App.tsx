import React, { ReactNode, ErrorInfo } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext';
import { ContentProvider } from './components/ContentContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Surgeon from './pages/Surgeon';
import Cataract from './pages/Cataract';
import Retina from './pages/Retina';
import Myopia from './pages/Myopia';
import Consultations from './pages/Consultations';
import Appointment from './pages/Appointment';
import Referral from './pages/Referral';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';

// Helper component to scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
};

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("React Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h1 className="text-xl font-bold text-red-600 mb-4">Une erreur est survenue</h1>
            <p className="text-gray-600 mb-4">L'application n'a pas pu se charger correctement.</p>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto mb-4 text-red-800 border border-red-100">
              {this.state.error?.message}
            </pre>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })} 
              className="w-full bg-slate-900 text-white py-2 px-4 rounded hover:bg-slate-800"
            >
              Réessayer
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ContentProvider>
        <LanguageProvider>
          <HashRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="presentation" element={<Surgeon />} />
                <Route path="cataracte" element={<Cataract />} />
                <Route path="retine" element={<Retina />} />
                <Route path="myopie" element={<Myopia />} />
                <Route path="consultations" element={<Consultations />} />
                <Route path="rendez-vous" element={<Appointment />} />
                <Route path="reference" element={<Referral />} />
                <Route path="lieux" element={<Contact />} />
                <Route path="mentions-legales" element={<Legal />} />
                <Route path="politique-confidentialite" element={<Privacy />} />
                <Route path="admin" element={<Admin />} />
              </Route>
            </Routes>
          </HashRouter>
        </LanguageProvider>
      </ContentProvider>
    </ErrorBoundary>
  );
};

export default App;