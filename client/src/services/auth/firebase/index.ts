import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'digital-twins-7f3f4.firebaseapp.com',
  projectId: 'digital-twins-7f3f4',
  storageBucket: 'digital-twins-7f3f4.appspot.com',
  messagingSenderId: '553124995373',
  appId: '1:553124995373:web:7c6ed9453f3a0cef8fb3a4',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
