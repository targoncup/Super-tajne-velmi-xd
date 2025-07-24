import { useState, useEffect } from 'react';
import { SiteContent, DEFAULT_CONTENT } from '../config/admin';
import { supabase } from '../lib/supabase';

const CONTENT_STORAGE_KEY = 'targon_cup_content';

export const useContent = () => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log('Loading content from Supabase...');
        const { data, error } = await supabase
          .from('site_content')
          .select('data')
          .eq('key', 'site')
          .maybeSingle();

        if (error && error.code !== 'PGRST116') throw error;

        if (data && data.data) {
          console.log('Loaded content from Supabase:', data.data);
          const merged = deepMerge(DEFAULT_CONTENT, data.data);
          console.log('Merged content:', merged);
          setContent(merged);
          localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(merged));
        } else {
          console.log('No data from Supabase, using localStorage or default');
          const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
          if (savedContent) {
            const parsed = JSON.parse(savedContent);
            console.log('Loaded from localStorage:', parsed);
            setContent(deepMerge(DEFAULT_CONTENT, parsed));
          }
        }
      } catch (err) {
        console.error('Error loading content:', err);
        const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
        if (savedContent) {
          try {
            const parsed = JSON.parse(savedContent);
            setContent(deepMerge(DEFAULT_CONTENT, parsed));
          } catch {
            setContent(DEFAULT_CONTENT);
          }
        } else {
          setContent(DEFAULT_CONTENT);
        }
      } finally {
        setLoading(false);
      }
    };

    loadContent();
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

  const updateContent = async (newContent: Partial<SiteContent>) => {
    const updatedContent = deepMerge(content, newContent);
    setContent(updatedContent);
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(updatedContent));

    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ key: 'site', data: updatedContent }, { onConflict: 'key' });

      if (error) throw error;
    } catch (err) {
      console.error('Error saving content to Supabase:', err);
    }
  };

  const resetContent = async () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem(CONTENT_STORAGE_KEY);

    try {
      const { error } = await supabase
        .from('site_content')
        .update({ data: DEFAULT_CONTENT })
        .eq('key', 'site');
      if (error) throw error;
    } catch (err) {
      console.error('Error resetting content in Supabase:', err);
    }
  };

  return {
    content,
    updateContent,
    resetContent,
    loading,
  };
};