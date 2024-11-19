import { Tabs } from "expo-router"
import { FontAwesome, Octicons } from '@expo/vector-icons'
import AuthProvider, { useAuth } from '../auth/AuthContext';
import { useUser } from '../user/UserContext';
import UserProvider from "../user/UserContext";
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Register';
import Login from '../Login'; 
import { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const Layout = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <AuthRouter />
      </UserProvider>
    </AuthProvider>
  );
}

const AuthRouter = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const { user } = useAuth();
  const { fetchData } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      if (user) {
        try {
          const data = await fetchData(user.uid);
          setUserData(data)
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (e) {
          console.error('Error fetching user data', e)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false);
      }
    }

    checkAuth();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return user ? (
      <Tabs>
          <Tabs.Screen name="index" options={{
              headerStatusBarHeight: 10,
              headerTitle: `Hello ${userData.name}`,
              title: "Home",
              tabBarActiveTintColor: '#1e7378',
              tabBarActiveBackgroundColor: '#f4fef1',
              headerTintColor: 'black',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" color={color} size={size} />
              ),
          }}/>
          <Tabs.Screen name="newStock" options={{
              headerStatusBarHeight: 10,
              headerTitle: "Add Pills",
              title: "Add Pills",
              tabBarActiveTintColor: '#1e7378',
              tabBarActiveBackgroundColor: '#f4fef1',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="plus-circle" color={color} size={size} />
              ),
          }}/>
          <Tabs.Screen name="missedDose/index" options={{
            headerStatusBarHeight: 10,
            headerTitle: "Missed Dose",
            title: "Missed Dose",
            tabBarActiveTintColor: '#1e7378',
            tabBarActiveBackgroundColor: '#f4fef1',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="skip" color={color} size={size} />
            ),
          }} />
          <Tabs.Screen name="profile/[id]" options={{
              headerStatusBarHeight: 10,
              headerTitle: "Emily Moench",
              title: "Account",
              tabBarActiveTintColor: '#1e7378',
              tabBarActiveBackgroundColor: '#f4fef1',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={size} />
              ),
          }}/>
      </Tabs>
      ) : (
          <Stack.Navigator>
            <Stack.Screen name = "Login" component = {Login} options = {{title: 'Welcome to PillTrack'}} />
            <Stack.Screen name = "Register" component = {Register} options = {{title: 'Sign Up to PillTrack'}} />
          </Stack.Navigator>
      )
};

export default Layout;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
})