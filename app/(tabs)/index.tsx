import { Link } from 'expo-router'
import { View, Text } from 'react-native'

const HomePage = () => {
  return (
    <View>
        <Text>Hello World</Text>
        <Link href = "/profile/1" style={{width: 100, height: 100, backgroundColor: 'blue'}}>Go to Profile</Link>
    </View>
  )
};

export default HomePage