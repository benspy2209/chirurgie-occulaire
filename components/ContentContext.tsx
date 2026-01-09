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

// Helper function to check if item is a plain object
function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

// Deep merge function: Merges source into target
// We use this to merge DB content (source) into Default content (target)
// This ensures that if the DB lacks a new field (like 'image'), the Default value is preserved.
function mergeDeep(target: any, source: any): any {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        // For arrays and primitives, Source (DB) overrides Target (Default)
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

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
        console.log('Using static content (Supabase fetch skipped or empty)');
      } else if (data && data.content) {
        console.log('Dynamic content loaded from Supabase');
        // We merge the DB content ON TOP of the Default content.
        // This ensures that any new fields added to constants.ts (like 'image') 
        // will show up even if the DB record is older and missing them.
        const merged = mergeDeep(DEFAULT_CONTENT, data.content);
        setContent(merged);
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