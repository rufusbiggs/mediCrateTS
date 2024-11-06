import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';
import { database } from '../firebaseConfig';
import { ref, onValue, update } from 'firebase/database';

interface UserContextType {
    userData: UserDataType,
    updateUserData: (userId: string, data: Partial<UserDataType>) => Promise<void>;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
}

type UserDataType = {
    name?: string;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children : ReactNode }) => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserDataType>({});

    const updateUserData = async (userId: string, data: Partial<UserDataType>) => {
        try {
            const userRef = ref(database, `users/${userId}`);
            await update(userRef, data);
        } catch (e) {
            console.error('Error setting user data', e);
        }
    }

    useEffect(() => {
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            onValue(userRef, snapshot => {
                setUserData(snapshot.val());
            });
        } else {
            setUserData({});
        }
    }, [user]);

    return (
        <UserContext.Provider value={{userData, updateUserData, setUserData}} >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used with a UseProvider')
    }
    return context;
}
