import React, { createContext, useEffect, useState, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            console.error(e);
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (e) {
            console.error(e);
        }
    };

    const logout = async () => {
        try {
            await auth().signOut();
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
  