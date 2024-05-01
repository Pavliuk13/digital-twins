import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updatePassword,
} from 'firebase/auth';

import { auth } from '@@services/auth/firebase';

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser, password);
};

export const doSignOut = () => {
  return auth.signOut();
};
