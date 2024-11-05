import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from './auth/AuthContext';
import { useNavigation } from 'expo-router/build';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigationTypes';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {

    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    // fireBase logic
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
        <View>
            <Text>Login</Text>

            <TextInput 
                placeholder = "Email"
                keyboardType = "email-address"
                value = {email}
                onChangeText = {setEmail}
                autoCapitalize = 'none'
            />

            <TextInput 
                placeholder = "Password"
                secureTextEntry
                value = {password}
                onChangeText = {setPassword}
            />

             <Button 
                title = {loading ? 'Loggin in...' : 'Login'}
                onPress = {handleLogin}
                disabled = {loading}
             />

             <Button 
                title = "Sign Up"
                onPress = {() => navigation.navigate('Register')}
             />

        </View>
    )
}

export default Login