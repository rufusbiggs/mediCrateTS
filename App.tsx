import React from 'react';
import { AuthProvider, useAuth } from './app/auth/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import TabsLayout from './app/(tabs)/_layout';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './app/Register';
import Login from './app/Login'; 

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <TabsLayout /> 
      ) : (
        <Stack.Navigator>
          <Stack.Screen name = "Login" component = {Login} />
          <Stack.Screen name = "Register" component = {Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}

export default App;
