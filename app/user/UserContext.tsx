import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';
import { database } from '../../services/firebaseConfig';
import { ref, onValue, update, get, push, set } from 'firebase/database';

interface UserContextType {
    userData: UserDataType,
    prescriptionData: Prescription[],
    loading: boolean,
    updateUserData: (userId: string, data: Partial<UserDataType>) => Promise<void>;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    fetchData: (userId: string) => Promise<void>;
    addPrescription: (userId: string, prescription: Prescription) => Promise<void>;
    fetchPrescriptions: (userId: string) => Promise<void>;
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
    const [prescriptionData, setPrescriptionData] = useState<Prescription[]>([])
    const [loading, setLoading] = useState(true);

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

    const fetchPrescriptions = async (userId: string) => {
        try {
            const prescriptionRef = ref(database, `prescriptions/${userId}`);
            const snapshot = await get(prescriptionRef);
    
            if (snapshot.exists()) {
                const prescriptionData = snapshot.val();
                const prescriptionsArray = Object.entries(prescriptionData).map(([key, value]) => {
                    const data = value as Partial<Prescription>;

                    return {
                        id: data.id || Number(key), // Use Firebase key if id is missing
                        drug: data.drug || '',
                        pillDose: data.pillDose || 0,
                        dailyDose: data.dailyDose || 0,
                        startDate: data.startDate || '',
                        initialStock: data.initialStock || 0,
                        addedPills: data.addedPills || [],
                    };
                });
    
                setPrescriptionData(prescriptionsArray);
            } else {
                console.log('No prescriptions found');
            }
        } catch (e) {
            console.error('Error fetching prescriptions: ', e);
        }
    };

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

    const fetchUserData = async () => {
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            onValue(userRef, snapshot => {
                setUserData(snapshot.val());
            });
        } else {
            setUserData({});
        }
    };

    const checkAuth = async () => {
        if (user) {
          try {
            const data = await fetchData(user.uid);
            setUserData(data)
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (e) {
            console.error('Error fetching user data', e)
          } 
        } else {
          setLoading(false);
        }
      }

    // Initialize App - loading data in consolidated place

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            if (user) {
                try {
                    await checkAuth();
                    await fetchUserData();
                    await fetchPrescriptions(user.uid);
                } catch (e) {
                    console.error('Error initializing app: ', e);
                } finally {
                    setLoading(false);
                }
            }
        }

        initialize()
    }, [user])

    return (
        <UserContext.Provider value={{
            userData, 
            prescriptionData,
            loading,
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
