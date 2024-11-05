import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from './auth/AuthContext';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const onSignUp = async () => {
        try {
            setLoading(true);
            await register(email, password);
        } catch (e) {
            setLoading(false);
            console.error('Failed to sign up', e);  
        }
    }

    return (
        <View>
            <Text>Sign Up</Text>

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
                title = {loading ? "Loading..." : "Sign Up"}
                onPress = {onSignUp}
                disabled = {loading}
            />
                
        </View>
    )
}

export default Register;