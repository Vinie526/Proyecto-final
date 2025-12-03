'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { auth as fAuth, firestore as fFirestore, firebaseApp as fApp } from '@/firebase';

interface FirebaseContextType {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

export function FirebaseProvider({
  children,
}: { children: ReactNode }) {
  // We ignore the props and use the initialized instances directly
  const value = { firebaseApp: fApp, auth: fAuth, firestore: fFirestore };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = (): FirebaseApp => {
    return useFirebase().firebaseApp;
}

export const useAuth = (): Auth => {
    return useFirebase().auth;
}

export const useFirestore = (): Firestore => {
    return useFirebase().firestore;
}
