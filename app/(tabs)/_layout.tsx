import { Tabs } from "expo-router"
import { FontAwesome, Octicons } from '@expo/vector-icons'
import { AuthProvider, useAuth } from '../auth/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Register';
import Login from '../Login'; 

const Stack = createStackNavigator();

const Layout = () => {
  return (
    <AuthProvider>
        <AuthRouter />
    </AuthProvider>
  );
}

const AuthRouter = () => {
  const { user } = useAuth();

  return user ? (
      <Tabs>
          <Tabs.Screen name="index" options={{
              headerStatusBarHeight: 40,
              headerTitle: "Hi Emily",
              title: "Home",
              tabBarActiveTintColor: '#1e7378',
              tabBarActiveBackgroundColor: '#f4fef1',
              headerTintColor: 'black',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" color={color} size={size} />
              ),
          }}/>
          <Tabs.Screen name="newStock/newStock" options={{
              headerStatusBarHeight: 40,
              headerTitle: "Add Pills",
              title: "Add Pills",
              tabBarActiveTintColor: '#1e7378',
              tabBarActiveBackgroundColor: '#f4fef1',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="plus-circle" color={color} size={size} />
              ),
          }} />
          <Tabs.Screen name="missedDose/missedDose" options={{
            headerStatusBarHeight: 40,
            headerTitle: "Missed Dose",
            title: "Missed Dose",
            tabBarActiveTintColor: '#1e7378',
            tabBarActiveBackgroundColor: '#f4fef1',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="skip" color={color} size={size} />
            ),
          }} />
          <Tabs.Screen name="profile/[id]" options={{
              headerStatusBarHeight: 40,
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
            <Stack.Screen name = "Login" component = {Login} />
            <Stack.Screen name = "Register" component = {Register} />
          </Stack.Navigator>
      )
};

export default Layout;