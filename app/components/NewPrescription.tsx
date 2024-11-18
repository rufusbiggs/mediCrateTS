import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

const NewPrescription = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('../(tabs)/newStock/addNewStockDetails');
  };

  return (
    <View>
        <Text style={styles.button}>+ New Prescription</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff2de',
        color: '#a05f3a',
        fontWeight: 'bold',
        borderRadius: 10,
        padding: 8,
        paddingRight: 20,
        paddingLeft: 20,
        margin: 15,
        marginBottom: 15,
        alignSelf: 'center',
    }
})

export default NewPrescription