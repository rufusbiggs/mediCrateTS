import { View, Text, Button } from 'react-native'
import { useAuth } from '../../auth/AuthContext';

const Profile = () => {
  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
  }

  return (
    <View>
        <Text>Hello user</Text>
        <Button title='sign out' onPress={handleSignOut} />
    </View>
  )
}

export default Profile