import React, { createContext, useContext, useState } from 'react';

interface AgeGateContextType {
  isVerified: boolean;
  verify: () => void;
}

const AgeGateContext = createContext<AgeGateContextType | undefined>(undefined);

const AGE_VERIFICATION_STORAGE_KEY = '@huumsexshop_age_verified';

export function AgeGateProvider({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(AGE_VERIFICATION_STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  const verify = () => {
    try {
      localStorage.setItem(AGE_VERIFICATION_STORAGE_KEY, 'true');
      setIsVerified(true);
    } catch (error) {
      console.error('Error saving age verification:', error);
    }
  };

  return (
    <AgeGateContext.Provider value={{ isVerified, verify }}>
      {children}
    </AgeGateContext.Provider>
  );
}

export function useAgeGate() {
  const context = useContext(AgeGateContext);
  if (!context) {
    throw new Error('useAgeGate must be used within AgeGateProvider');
  }
  return context;
}
