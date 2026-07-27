'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SessionUser = {
  name: string;
  email: string;
};

type StoredUser = SessionUser & {
  password: string;
};

const USERS_KEY = 'iqspark_users';
const SESSION_KEY = 'iqspark_session';

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

type AuthContextValue = {
  user: SessionUser | null;
  loading: boolean;
  userCount: number;
  signup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // localStorage doesn't exist during server rendering, so this read must happen
  // after mount. Doing it in an effect (rather than a lazy useState initializer)
  // keeps the server and first client render identical (both show `loading`),
  // avoiding a hydration mismatch, then syncs real state right after.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    setUserCount(getUsers().length);
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  function signup(name: string, email: string, password: string) {
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser: StoredUser = { name, email, password };
    const updated = [...users, newUser];
    saveUsers(updated);
    setUserCount(updated.length);

    const sessionUser = { name, email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  }

  function login(email: string, password: string) {
    const users = getUsers();
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) {
      throw new Error('Incorrect email or password.');
    }
    const sessionUser = { name: match.name, email: match.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, userCount, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
