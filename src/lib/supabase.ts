import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DatabaseRegistration {
  id: string;
  team_name: string;
  team_tag: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  captain_discord: string;
  players: Array<{
    name: string;
    summonerName: string;
    role: string;
    nationality: string;
  }>;
  substitutes: Array<{
    name: string;
    summonerName: string;
    role: string;
    nationality: string;
  }>;
  coach: {
    name: string;
    email: string;
    experience: string;
  };
  agree_to_rules: boolean;
  agree_to_streaming: boolean;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseContent {
  id: string;
  key: string;
  data: any;
  updated_at: string;
}