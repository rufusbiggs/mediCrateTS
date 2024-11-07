import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from './auth/AuthContext';
import { useNavigation } from 'expo-router/build';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigationTypes';
import CustomButton from './components/CustomButton';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            setLoading(true);
            await login(email, password);
        } catch (e) {
            setLoading(false);
            console.error('Login failed', e);
        }
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.inputsContiner} >
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
            
            <View style={styles.buttonsContainer}>
                <CustomButton 
                    text = 'Login'
                    onPress = {handleLogin}
                    loading = {loading}
                    disabled = {loading}
                    clickedText = 'Logging in...'
                    variant = 'login'
                />

                <CustomButton 
                    text = 'Sign Up'
                    onPress = {() => navigation.navigate('Register')}
                    loading = {false}
                    disabled = {false}
                    clickedText = 'Sign Up'
                    variant = 'signup'
                />
            </View>
        </View>
    )
}

export default Login

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
    login: {
        borderRadius: 20,
        borderWidth: 1,
    }
})