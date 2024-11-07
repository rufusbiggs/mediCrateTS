import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useAuth } from './auth/AuthContext';
import { useUser } from './user/UserContext';
import CustomButton from './components/CustomButton';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const { register } = useAuth();
    const { updateUserData } = useUser();

    const onSignUp = async () => {
        try {
            setLoading(true);
            const user = await register(email, password);
            if (user) {
                await updateUserData(user.uid, { name })
            }
        } catch (e) {
            setLoading(false);
            console.error('Failed to sign up', e);  
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.pageContainer}>
            <View style = {styles.inputsContiner}>
                <TextInput 
                    placeholder = "Name"
                    keyboardType = "default"
                    value = {name}
                    onChangeText = {setName}
                    autoCapitalize = 'none'
                    style={styles.input}
                />

                <TextInput 
                    placeholder = "Email"
                    keyboardType = "email-address"
                    value = {email}
                    onChangeText = {setEmail}
                    autoCapitalize = 'none'
                    style={styles.input}
                />

                <TextInput 
                    placeholder = "Password"
                    secureTextEntry
                    value = {password}
                    onChangeText = {setPassword}
                    style={styles.input}
                />
            </View>

            

            <CustomButton 
                text = 'Sign Up'
                onPress = {onSignUp}
                loading = {loading}
                disabled = {loading}
                clickedText = 'Signing Up...'
                variant = 'signup'
            />
                
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 20,
        // justifyContent: 'center',
        backgroundColor: 'white',
        gap: 40,
    },
    inputsContiner: {
        paddingTop: 40,
        display: 'flex',
        gap: 20,
    },
    buttonsContainer: {
        display: 'flex',
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    login: {
        borderRadius: 20,
        borderWidth: 1,
    }
})