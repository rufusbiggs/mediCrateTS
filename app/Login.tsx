import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from './auth/AuthContext';

const Login = () => {

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
             />

        </View>
    )
}

export default Login