import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export type Role = 'student' | 'faculty' | 'admin' | null;

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: Role;
  department?: string;
  year?: string;
  semester?: string;
  usn?: string;
  employeeId?: string;
  subjects?: string[];
  photoURL?: string;
  joinedDate?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAuthReady: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getMockUser = () => {
    const role = localStorage.getItem('mockRole');
    
    if (!role) {
      return { user: null, userData: null };
    }

    let name = 'Admin User';
    let email = 'admin@campus.edu';
    
    if (role === 'student') {
      name = 'Akash C';
      email = 'akash@campus.edu';
    } else if (role === 'faculty') {
      name = 'Prof. VS Patil';
      email = 'vspatil@campus.edu';
    }

    return {
      user: {
        uid: `mock-${role}-123`,
        email,
        displayName: name,
      } as User,
      userData: {
        uid: `mock-${role}-123`,
        email,
        name,
        role: role as Role,
      }
    };
  };

  const [user, setUser] = useState<User | null>(getMockUser().user);
  const [userData, setUserData] = useState<UserData | null>(getMockUser().userData);
  const [loading, setLoading] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(true);

  useEffect(() => {
    // Listen for storage changes to update mock user across tabs or when changed
    const handleStorageChange = () => {
      const mock = getMockUser();
      setUser(mock.user);
      setUserData(mock.userData);
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also listen for a custom event so we can trigger it from the login page
    window.addEventListener('mockRoleChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mockRoleChanged', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};
