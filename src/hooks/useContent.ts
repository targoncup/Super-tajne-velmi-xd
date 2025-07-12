import { useState, useEffect } from 'react';
import { SiteContent, DEFAULT_CONTENT } from '../config/admin';

const CONTENT_STORAGE_KEY = 'targon_cup_content';

export const useContent = () => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        // Deep merge to ensure all new fields are included
        const mergedContent = deepMerge(DEFAULT_CONTENT, parsedContent);
        setContent(mergedContent);
      } catch (error) {
        console.error('Error parsing saved content:', error);
        setContent(DEFAULT_CONTENT);
      }
    }
  }, []);

  // Deep merge function to properly merge nested objects
  const deepMerge = (target: any, source: any): any => {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  };

  const updateContent = (newContent: Partial<SiteContent>) => {
    const updatedContent = deepMerge(content, newContent);
    setContent(updatedContent);
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(updatedContent));
  };

  const resetContent = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem(CONTENT_STORAGE_KEY);
  };

  return {
    content,
    updateContent,
    resetContent,
  };
};