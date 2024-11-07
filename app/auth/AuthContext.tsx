import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../firebaseConfig'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<User | undefined>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed. User:', user);
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful')
        } catch (e) {
            console.error(e);
        }
    };

    const register = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user
        } catch (e) {
            console.error(e);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("Auth state changed. Logout. User", user);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <AuthContext.Provider
            value = {{
                user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used with an AuthProvider')
    }
    return context;
}