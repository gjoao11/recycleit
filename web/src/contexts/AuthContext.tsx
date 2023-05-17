import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

import { api } from "../services/api";

type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'recycleit.token': token } = parseCookies();

    if (token) {
      api.get('/users/recoveruserinfo')
        .then(response => setUser(response.data))
        .catch(error => console.log(error))
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { data: { token, user } } = await api.post('/users/signin', {
      email,
      password,
    })

    setCookie(undefined, 'recycleit.token', token, {
      maxAge: 60 * 60 * 24, // 24 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user);

    router.push('/');
  }

  async function signOut() {
    destroyCookie(undefined, 'recycleit.token');

    api.defaults.headers['Authorization'] = undefined;

    setUser(null);

    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}