import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Environment configurations
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Authentication helper services
export const login = async (email: string, password: string): Promise<FirebaseUser> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const register = async (
  email: string, 
  password: string, 
  name: string, 
  role: 'Senior' | 'Caregiver'
): Promise<FirebaseUser> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store name and role selection inside displayName as a JSON string
  await updateProfile(user, {
    displayName: JSON.stringify({ name, role })
  });

  return user;
};

export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export const currentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

export const authListener = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
