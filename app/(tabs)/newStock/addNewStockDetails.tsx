import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Touchable } from 'react-native';
import { useState } from 'react';
import { useUser } from '../../user/UserContext';

interface Prescription {
    id: number,
    drug: string,
    pillDose: number,
    dailyDose: number,
    startDate: string,
    initialStock: number,
    addedPills: number[],
  }

const AddNewStockDetails = () => {

    const { userData } = useUser();

    const [drug, setDrug] = useState('');
    const [pillDose, setPillDose] = useState('');
    const [dailyDose, setDailyDose] = useState('');
    const [numberPills, setNumberPills] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [prescription, setPrescription] = useState<Prescription>();

    const addPrescription = () => {
        // find out if there are any prescriptions already
        // set the ID (+1 on the latest ID or 1)
        // Set the Name, Pill Dose, Dose per Pill, Number of Pills (initial stock)
        // Set startDate
    }

    const handleSubmit = () => {
        setLoadingSubmit(true);
        // add the prescription to the database

    }

    return (
        <ScrollView style={styles.main}>
            <Text>Please enter the details of your new prescription. If you have more than one, submit each prescription separately.</Text>
            <View style={styles.inputsContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder = 'Drug Name'
                    value={drug}
                    onChangeText={setDrug}
                />
                <TextInput 
                    style={styles.input}
                    placeholder = 'Pill Dose (mg)'
                    value={pillDose}
                    keyboardType='numeric'
                    onChangeText={setDrug}
                />
                <TextInput 
                    style={styles.input}
                    placeholder = 'Dose per Day (mg)'
                    value={dailyDose}
                    keyboardType='numeric'
                    onChangeText={setDrug}
                />
                <TextInput 
                    style={styles.input}
                    placeholder = 'Number of Pills'
                    value={numberPills}
                    keyboardType='numeric'
                    onChangeText={setDrug}
                />
            </View>

            <Text style={styles.startDate}>Start Date</Text>
            <View style={styles.startDateButtons}>
                <TouchableOpacity style = {styles.startButton}>
                    <Text style = {styles.startButton}>Today</Text>    
                </TouchableOpacity>

                <TouchableOpacity style = {styles.startButton}>
                    <Text style = {styles.startButton}>Tomorrow</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.startButton}>
                    <Text style = {styles.startButton}>Select Date</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style = {styles.button}
                onPress={handleSubmit}
                disabled={loadingSubmit}
            >
                <Text style={styles.button}>{loadingSubmit ? 'Adding Prescription...' : '+ Add to Stock'}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AddNewStockDetails

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
        gap: 20,
    },
    inputsContainer: {
        paddingTop: 20,
        paddingBottom: 40,
        display: 'flex',
        gap: 20,
    },
    buttonsContainer: {
        display: 'flex',
        gap: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#00569D',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 24,
        alignSelf: 'center',
    },
    startButton: {
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 4,
        alignSelf: 'center'
    },
    startDate: {
        color: '#E0E0E0',
    },
    startDateButtons: {
        flexDirection: 'row'
    },
})