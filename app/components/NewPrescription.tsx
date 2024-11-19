import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NewStockStackParamList } from "../(tabs)/newStock";
import CustomButton from "./CustomButton";

const NewPrescription = () => {
  const navigation = useNavigation<NavigationProp<NewStockStackParamList>>();

  const handlePress = () => {
    navigation.navigate('AddNewStockDetails');
  };

  return (
    <TouchableOpacity
    style={[
      styles.button
    ]}
    onPress={handlePress}
    disabled={false}
    >
        <Text style={styles.button}>+ New Prescription</Text>
    </TouchableOpacity>
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