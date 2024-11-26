import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { useUser } from '../../user/UserContext';
import { useAuth } from '../../auth/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NewStockStackParamList } from "./index";

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

    const navigation = useNavigation<NavigationProp<NewStockStackParamList>>();
    const { user } = useAuth();
    const { addPrescription } = useUser();

    const [drug, setDrug] = useState('');
    const [pillDose, setPillDose] = useState('');
    const [dailyDose, setDailyDose] = useState('');
    const [numberPills, setNumberPills] = useState('');
    const [startDate, setStartDate] = useState<Date | undefined >();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    }

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleSubmit = async () => {
        if (!drug || !pillDose || !dailyDose || !startDate || !numberPills) {
            Alert.alert('Error', 'You must fill in all the fields!');
            return;
        }

        setLoadingSubmit(true);
        const newPrescription: Prescription = {
            id: Date.now(),
            drug: drug,
            pillDose: Number(pillDose),
            dailyDose: Number(dailyDose),
            startDate: startDate ? startDate.toISOString() : new Date().toISOString(),
            initialStock: Number(numberPills),
            addedPills: [],
        }
        // add the prescription to the database
        try {
            addPrescription(user.uid, newPrescription);
            Alert.alert(
                'Success',
                'Prescription added successfully!',
                [{
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('NewStock');
                    }
                }]
            )
        }
        catch (e) {
            console.error('Error adding prescription', e);
            Alert.alert('Error', 'Something went wrong, please try again.')
        } finally {
            setLoadingSubmit(false);
        }      
    }

    return (
        <ScrollView style={styles.main}>
            <Text style={styles.description}>Enter the details of your new prescription.</Text>
            <View style={styles.inputsContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Prescription Name</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder = 'Drug Name'
                        value={drug}
                        onChangeText={setDrug}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Pill Dose (mg)</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder = 'Dose per pill (mg)'
                        value={pillDose}
                        keyboardType='numeric'
                        onChangeText={setPillDose}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Daily Dose (mg)</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder = 'Total per Day (mg)'
                        value={dailyDose}
                        keyboardType='numeric'
                        onChangeText={setDailyDose}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Stock</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder = 'Number of Pills'
                        value={numberPills}
                        keyboardType='numeric'
                        onChangeText={setNumberPills}
                />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Start Date</Text>
                    <TouchableOpacity onPress = {() => setShowDatePicker(true)}>
                        <TextInput style = {styles.input}
                            placeholder = 'Prescription Start Date'
                            value = {formatDate(startDate)}
                            editable={false} // prevents direct typing
                            />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {showDatePicker && 
                        <DateTimePicker 
                            value={startDate || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={handleDateChange}
                        />
                        }
                    </TouchableOpacity>
                </View>
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
    description: {fontSize: 16,},
    inputsContainer: {
        paddingTop: 20,
        paddingBottom: 30,
        display: 'flex',
        gap: 20,
    },
    buttonsContainer: {
        display: 'flex',
        gap: 15,
    },
    inputGroup: {},
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#00569D',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00569D',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 24,
        alignSelf: 'center',
    }

 
})