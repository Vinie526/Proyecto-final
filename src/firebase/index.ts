'use client';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useUser } from './auth/use-user';

let firebaseApp: FirebaseApp;
const apps = getApps();
if (apps.length > 0) {
  firebaseApp = apps[0];
} else {
  firebaseApp = initializeApp(firebaseConfig);
}

const auth: Auth = getAuth(firebaseApp);
const firestore: Firestore = getFirestore(firebaseApp);

export {
    firebaseApp,
    auth,
    firestore,
    FirebaseProvider,
    FirebaseClientProvider,
    useCollection,
    useUser,
    useFirebase,
    useFirebaseApp,
    useFirestore,
    useAuth,
};
