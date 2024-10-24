// App.tsx
import { AuthProvider, useAuth } from './app/auth/AuthContext';
import { ExpoRoot } from 'expo-router';
import Login from './app/Login';  // Adjust the path as necessary

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />; // Redirect to Login if no user is logged in
  }

  return <ExpoRoot />; // Show the app content (e.g., tabs) if user is logged in
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
