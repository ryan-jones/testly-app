import { createContext, useEffect, useState, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebaseClient';
import { UserType } from '@/types/user';
import { IAuthContext } from '@/types/auth';
import nookies from 'nookies';
import { Page } from '@/types/pages';
import { useRouter } from 'next/router';

export const AuthContext = createContext<IAuthContext>({
  user: { email: null, uid: null },
  signUp: () => console.warn('no auth provider'),
  logIn: () => console.warn('no auth provider'),
  logOut: () => console.warn('no auth provider'),
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
        const token = await user.getIdToken();
        nookies.set(undefined, 'firebaseToken', token, { path: Page.Home });
      } else {
        setUser({ email: null, uid: null });
        nookies.set(undefined, 'firebaseToken', '', { path: Page.Home });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  const signUp = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
    router.push(Page.Home);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
