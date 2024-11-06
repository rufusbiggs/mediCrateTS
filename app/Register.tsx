import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from './auth/AuthContext';
import { useUser } from './user/UserContext';

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
        <View>
            <Text>Sign Up</Text>

            <TextInput 
                placeholder = "Name"
                keyboardType = "default"
                value = {name}
                onChangeText = {setName}
                autoCapitalize = 'none'
            />

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