import { useState, useEffect } from 'react';
import { SiteContent, DEFAULT_CONTENT } from '../config/admin';
import { supabase } from '../lib/supabase';

export const useContent = () => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setError(null);
        const { data, error } = await supabase
          .from('site_content')
          .select('data')
          .eq('key', 'site')
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No data found, create initial record
            await saveToSupabase(DEFAULT_CONTENT);
            setContent(DEFAULT_CONTENT);
          } else {
            throw error;
          }
        } else if (data && data.data) {
          const merged = deepMerge(DEFAULT_CONTENT, data.data);
          setContent(merged);
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
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
      setError(null);
      const { error } = await supabase
        .from('site_content')
        .upsert({ key: 'site', data: contentToSave }, { onConflict: 'key' });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Content saved successfully to Supabase');
    } catch (err) {
      console.error('Error saving content to Supabase:', err);
      setError(err instanceof Error ? err.message : 'Failed to save content');
      throw err;
    }
  };

  const updateContent = async (newContent: Partial<SiteContent>) => {
    try {
      setError(null);
      
      // Create updated content by merging with current content
      const updatedContent = deepMerge(content, newContent);
      
      // First update local state
      setContent(updatedContent);
      
      // Then save to database with proper error handling
      const { error: upsertError } = await supabase
        .from('site_content')
        .upsert({ 
          key: 'site', 
          data: updatedContent 
        }, { 
          onConflict: 'key' 
        });

      if (upsertError) {
        console.error('Supabase upsert error:', upsertError);
        // Revert local state on error
        setContent(content);
        throw new Error(`Database error: ${upsertError.message}`);
      }
      
      console.log('Content updated and saved successfully to Supabase');
    } catch (err) {
      console.error('Error updating content:', err);
      setError(err instanceof Error ? err.message : 'Failed to update content');
      throw err;
    }
  };

  const resetContent = async () => {
    try {
      setError(null);
      
      // Save default content to database first
      const { error: upsertError } = await supabase
        .from('site_content')
        .upsert({ 
          key: 'site', 
          data: DEFAULT_CONTENT 
        }, { 
          onConflict: 'key' 
        });

      if (upsertError) {
        console.error('Supabase reset error:', upsertError);
        throw new Error(`Database error: ${upsertError.message}`);
      }
      
      // Then update local state
      setContent(DEFAULT_CONTENT);
      console.log('Content reset successfully');
    } catch (err) {
      console.error('Error resetting content:', err);
      setError(err instanceof Error ? err.message : 'Failed to reset content');
      throw err;
    }
  };

  // Force reload content from database
  const reloadContent = async () => {
    setLoading(true);
    try {
      setError(null);
      const { data, error } = await supabase
        .from('site_content')
        .select('data')
        .eq('key', 'site')
        .single();

      if (error) throw error;
      
      if (data && data.data) {
        const merged = deepMerge(DEFAULT_CONTENT, data.data);
        setContent(merged);
      }
    } catch (err) {
      console.error('Error reloading content:', err);
      setError(err instanceof Error ? err.message : 'Failed to reload content');
    } finally {
      setLoading(false);
    }
  };

  return {
    content,
    updateContent,
    resetContent,
    reloadContent,
    loading,
    error,
  };
};