import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CONTENT as DEFAULT_CONTENT } from '../constants';
import { SiteContent } from '../types';
import { supabase } from '../lib/supabaseClient';

interface ContentContextType {
  content: Record<string, SiteContent>;
  refreshContent: () => Promise<void>;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start with the static content as default
  const [content, setContent] = useState<Record<string, SiteContent>>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    try {
      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .order('id', { ascending: true })
        .limit(1)
        .single();

      if (error) {
        // If table doesn't exist or is empty, we stick to DEFAULT_CONTENT
        // quiet fail is okay here, we just use static site
        console.log('Using static content (Supabase fetch skipped or empty)');
      } else if (data && data.content) {
        console.log('Dynamic content loaded from Supabase');
        // Merge allows adding new keys to constants.ts without breaking DB content
        // But for simplicity, we treat DB as source of truth if it exists
        setContent(data.content);
      }
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, refreshContent: fetchContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};