import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // fireBase logic
    const handleLogin = () => {

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