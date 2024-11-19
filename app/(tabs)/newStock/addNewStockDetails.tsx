import { View, ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

const AddNewStockDetails = () => {

    const [drug, setDrug] = useState('');
    const [pillDose, setPillDose] = useState('');
    const [dailyDose, setDailyDose] = useState('');
    const [numberPills, setNumberPills] = useState('');

    return (
        <ScrollView style={styles.main}>
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
})