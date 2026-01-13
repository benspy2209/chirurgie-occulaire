import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from './LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  isHome?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, path = "", isHome = false }) => {
  const { language } = useLanguage();
  
  const siteName = "Dr Remi Dewispelaere";
  const fullTitle = isHome ? title : `${title} | ${siteName}`;
  const baseUrl = "https://chir-ophta.be";
  const currentUrl = `${baseUrl}${path}`;

  // Données structurées pour Médecin (Schema.org Physician)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr Remi Dewispelaere",
    "url": baseUrl,
    "image": "https://media.publit.io/file/w_2048/IMG-0175-k.jpeg",
    "description": description,
    "medicalSpecialty": ["Ophthalmology", "Cataract Surgery", "Vitreoretinal Surgery"],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Chaussée de Louvain 43/2",
        "addressLocality": "Wavre",
        "postalCode": "1300",
        "addressCountry": "BE"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Avenue de Messidor 213",
        "addressLocality": "Uccle",
        "postalCode": "1180",
        "addressCountry": "BE"
      }
    ],
    "telephone": "+32 10 41 28 01",
    "priceRange": "$$"
  };

  return (
    <Helmet>
      {/* Balises standards */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://media.publit.io/file/w_2048/IMG-0175-k.jpeg" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://media.publit.io/file/w_2048/IMG-0175-k.jpeg" />

      {/* JSON-LD Schema.org pour Google Maps/Business */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;