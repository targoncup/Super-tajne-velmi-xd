import { useState, useEffect } from 'react';
import { TeamRegistration } from '../config/admin';

const REGISTRATIONS_STORAGE_KEY = 'targon_cup_registrations';

export const useRegistrations = () => {
  const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);

  useEffect(() => {
    const savedRegistrations = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (savedRegistrations) {
      try {
        const parsedRegistrations = JSON.parse(savedRegistrations);
        setRegistrations(parsedRegistrations);
      } catch (error) {
        console.error('Error parsing saved registrations:', error);
        setRegistrations([]);
      }
    }
  }, []);

  const addRegistration = (registration: Omit<TeamRegistration, 'id' | 'timestamp' | 'status' | 'notes'>) => {
    const newRegistration: TeamRegistration = {
      ...registration,
      id: Date.now().toString(),
      timestamp: Date.now(),
      status: 'pending',
      notes: '',
    };

    const updatedRegistrations = [...registrations, newRegistration];
    setRegistrations(updatedRegistrations);
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(updatedRegistrations));
    return newRegistration.id;
  };

  const updateRegistrationStatus = (id: string, status: TeamRegistration['status'], notes?: string) => {
    const updatedRegistrations = registrations.map(reg =>
      reg.id === id ? { ...reg, status, notes: notes || reg.notes } : reg
    );
    setRegistrations(updatedRegistrations);
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(updatedRegistrations));
  };

  const deleteRegistration = (id: string) => {
    const updatedRegistrations = registrations.filter(reg => reg.id !== id);
    setRegistrations(updatedRegistrations);
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(updatedRegistrations));
  };

  const getRegistrationStats = () => {
    const total = registrations.length;
    const pending = registrations.filter(reg => reg.status === 'pending').length;
    const approved = registrations.filter(reg => reg.status === 'approved').length;
    const rejected = registrations.filter(reg => reg.status === 'rejected').length;

    return { total, pending, approved, rejected };
  };

  return {
    registrations,
    addRegistration,
    updateRegistrationStatus,
    deleteRegistration,
    getRegistrationStats,
  };
};