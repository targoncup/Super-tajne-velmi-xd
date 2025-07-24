import { useState, useEffect } from 'react';
import { supabase, DatabaseRegistration } from '../lib/supabase';
import { TeamRegistration } from '../config/admin';

export const useSupabaseRegistrations = () => {
  const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert database format to app format
  const convertFromDatabase = (dbReg: DatabaseRegistration): TeamRegistration => ({
    id: dbReg.id,
    timestamp: new Date(dbReg.created_at).getTime(),
    teamName: dbReg.team_name,
    teamTag: dbReg.team_tag,
    captainName: dbReg.captain_name,
    captainEmail: dbReg.captain_email,
    captainPhone: dbReg.captain_phone || '',
    captainDiscord: dbReg.captain_discord,
    players: dbReg.players,
    substitutes: dbReg.substitutes,
    coach: dbReg.coach,
    agreeToRules: dbReg.agree_to_rules,
    agreeToStreaming: dbReg.agree_to_streaming,
    status: dbReg.status,
    notes: dbReg.notes || '',
    logo: dbReg.logo,
  });

  // Convert app format to database format
  const convertToDatabase = (appReg: Omit<TeamRegistration, 'id' | 'timestamp'>): Omit<DatabaseRegistration, 'id' | 'created_at' | 'updated_at'> => ({
    team_name: appReg.teamName,
    team_tag: appReg.teamTag,
    captain_name: appReg.captainName,
    captain_email: appReg.captainEmail,
    captain_phone: appReg.captainPhone || null,
    captain_discord: appReg.captainDiscord,
    players: appReg.players,
    substitutes: appReg.substitutes,
    coach: appReg.coach,
    agree_to_rules: appReg.agreeToRules,
    agree_to_streaming: appReg.agreeToStreaming,
    status: appReg.status || 'pending',
    notes: appReg.notes || '',
    logo: appReg.logo || null,
  });

  // Fetch registrations from database
  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      const convertedData = data?.map(convertFromDatabase) || [];
      setRegistrations(convertedData);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  // Add new registration
  const addRegistration = async (registration: Omit<TeamRegistration, 'id' | 'timestamp' | 'status' | 'notes'>): Promise<string> => {
    try {
      setError(null);
      
      const dbData = convertToDatabase({
        ...registration,
        status: 'pending',
        notes: '',
      });

      const { data, error: insertError } = await supabase
        .from('registrations')
        .insert([dbData])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Add to local state immediately
      const newRegistration = convertFromDatabase(data);
      setRegistrations(prev => [newRegistration, ...prev]);

      return data.id;
    } catch (err) {
      console.error('Error adding registration:', err);
      setError(err instanceof Error ? err.message : 'Failed to add registration');
      throw err;
    }
  };

  // Update registration status
  const updateRegistrationStatus = async (id: string, status: TeamRegistration['status'], notes?: string) => {
    try {
      setError(null);

      const updateData: any = { status };
      if (notes !== undefined) {
        updateData.notes = notes;
      }

      const { error: updateError } = await supabase
        .from('registrations')
        .update(updateData)
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      // Update local state
      setRegistrations(prev =>
        prev.map(reg =>
          reg.id === id ? { ...reg, status, notes: notes || reg.notes } : reg
        )
      );
    } catch (err) {
      console.error('Error updating registration:', err);
      setError(err instanceof Error ? err.message : 'Failed to update registration');
      throw err;
    }
  };

  // Delete registration
  const deleteRegistration = async (id: string) => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Remove from local state
      setRegistrations(prev => prev.filter(reg => reg.id !== id));
    } catch (err) {
      console.error('Error deleting registration:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete registration');
      throw err;
    }
  };

  // Get registration statistics
  const getRegistrationStats = () => {
    const total = registrations.length;
    const pending = registrations.filter(reg => reg.status === 'pending').length;
    const approved = registrations.filter(reg => reg.status === 'approved').length;
    const rejected = registrations.filter(reg => reg.status === 'rejected').length;

    return { total, pending, approved, rejected };
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchRegistrations();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('registrations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'registrations',
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newRegistration = convertFromDatabase(payload.new as DatabaseRegistration);
            setRegistrations(prev => [newRegistration, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedRegistration = convertFromDatabase(payload.new as DatabaseRegistration);
            setRegistrations(prev =>
              prev.map(reg => reg.id === updatedRegistration.id ? updatedRegistration : reg)
            );
          } else if (payload.eventType === 'DELETE') {
            setRegistrations(prev => prev.filter(reg => reg.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    registrations,
    loading,
    error,
    addRegistration,
    updateRegistrationStatus,
    deleteRegistration,
    getRegistrationStats,
    refetch: fetchRegistrations,
  };
};