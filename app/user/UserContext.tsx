import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';
import { database } from '../../services/firebaseConfig';
import { ref, onValue, update, get } from 'firebase/database';

interface UserContextType {
    userData: UserDataType,
    updateUserData: (userId: string, data: Partial<UserDataType>) => Promise<void>;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    fetchData: (userId: string) => Promise<void>;
}

type UserDataType = {
    name?: string;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children : ReactNode }) => {
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

    const fetchData = async (userId: string) => {
        try {
            const dbRef = ref(database, `users/${userId}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No data exists for this user', userId)
            }
        } catch (e) {
            console.error('Error fetching user data', e)
        }
    }

    // const fetchRealTimeData = async (userId: string) => {

    // }

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
        <UserContext.Provider value={{userData, updateUserData, setUserData, fetchData}} >
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

export default UserProvider;
