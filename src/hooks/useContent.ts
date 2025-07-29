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
        const { data, error } = await supabase
          .from('site_content')
          .select('data')
          .eq('key', 'site')
          .maybeSingle();

        if (error && error.code !== 'PGRST116') throw error;

        if (data && data.data) {
          const merged = deepMerge(DEFAULT_CONTENT, data.data);
          setContent(merged);
        } else {
          // If no data in Supabase, save default content
          await saveToSupabase(DEFAULT_CONTENT);
          setContent(DEFAULT_CONTENT);
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setContent(DEFAULT_CONTENT);
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

  const saveToSupabase = async (contentToSave: SiteContent) => {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ key: 'site', data: contentToSave }, { onConflict: 'key' });

      if (error) throw error;
    } catch (err) {
      console.error('Error saving content to Supabase:', err);
      throw err;
    }
  };

  const updateContent = async (newContent: Partial<SiteContent>) => {
    const updatedContent = deepMerge(content, newContent);
    setContent(updatedContent);

    // Save to Supabase
    await saveToSupabase(updatedContent);
  };

  const resetContent = async () => {
    setContent(DEFAULT_CONTENT);
    await saveToSupabase(DEFAULT_CONTENT);
  };

  return {
    content,
    updateContent,
    resetContent,
    loading,
  };
};