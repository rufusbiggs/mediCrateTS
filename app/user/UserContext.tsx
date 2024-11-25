import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';
import { database } from '../../services/firebaseConfig';
import { ref, onValue, update, get, push, set } from 'firebase/database';
import { LocalRouteParamsContext } from 'expo-router/build/Route';

interface UserContextType {
    userData: UserDataType,
    updateUserData: (userId: string, data: Partial<UserDataType>) => Promise<void>;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    fetchData: (userId: string) => Promise<void>;
    addPrescription: (userId: string, prescription: Prescription) => Promise<void>;
    fetchPrescriptions: (userId: string) => Promise<Record<string, Prescription> | undefined>;
    addStock: (userId: string, prescriptionId: string, addedPills: number) => Promise<void>;
}

type UserDataType = {
    name?: string;
}

interface Prescription {
    id: number,
    drug: string,
    pillDose: number,
    dailyDose: number,
    startDate: string,
    initialStock: number,
    addedPills: number[],
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

    const addPrescription = async (userId: string, prescription: Prescription) => {
        try {
            const prescriptionRef = ref(database, `prescriptions/${userId}`);
            const newPrescriptionRef = push(prescriptionRef);
            await set(newPrescriptionRef, prescription);
            console.log('New Prescription Added');
        } catch (e) {
            console.error('Error adding prescription: ', e);
        }
    }

    const fetchPrescriptions = async (userId: string): Promise<Record<string, Prescription> | undefined> => {
        try {
            const prescriptionRef = ref(database, `prescriptions/${userId}`);
            const snapshot = await get(prescriptionRef);
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                console.log('No prescriptions found');
            }
        } catch (e) {
            console.error('Error fetching prescriptions: ', e);
        }
    }

    const addStock = async (userId: string, prescriptionId: string, addedPills: number) => {
        try {
            const prescriptionRef = ref(database, `prescriptions/${userId}/${prescriptionId}`);
            await update(prescriptionRef, {
                [Date.now()]: addedPills
            });
            console.log('Stock updated.');
        } catch (e) {
            console.error(`Error updating stock: `, e);
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
        <UserContext.Provider value={{
            userData, 
            updateUserData, 
            setUserData, 
            fetchData,
            addPrescription,
            fetchPrescriptions,
            addStock,
            }} >
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
