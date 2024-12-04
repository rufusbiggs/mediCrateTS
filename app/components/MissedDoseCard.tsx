import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useUser } from "../user/UserContext";
import { useAuth } from "../auth/AuthContext";

interface Prescription {
  id?: string,
  drug: string,
  pillDose: number,
  dailyDose: number,
  startDate: string,
  initialStock: number,
  addedPills: number[],
}

const MissedDoseCard = ({ prescription } : { prescription : Prescription }) => {
  
  const { userData, addStock } = useUser();
  const { user } = useAuth();

  const { id, drug, pillDose, dailyDose } = prescription;
  const pillsPerDay = dailyDose / pillDose;


  const handlePress = async () => {
    if (!id) {
      console.error('Prescription ID is missing.');
      return;
    }

    try {
      await addStock(user.uid, id, pillsPerDay)
      console.log(`Stock updated for prescriptionID: ${id}`);
    } catch (e) {
      console.error('Error adding prescription: ', e);
    }
  }

  return (
    <View style={styles.prescriptionContainer}>
      <View style={styles.prescriptionDetails}>
        <Text style={styles.drugName}>{drug} {pillDose}mg</Text>
        <Text style={styles.dailyDose}>{dailyDose}mg per day</Text>
      </View>
      <Text style={styles.missedInfo}>Selecting 'Missed Dose' will add {pillsPerDay} pill{pillsPerDay > 1 ? 's' : ''} back to your stock.</Text>
      <TouchableOpacity
      style={styles.missed}
      onPress={handlePress}
      disabled={false}
      >
        <Text style={styles.missed}>Confirm Missed Dose</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  prescriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
    borderRadius: 15,
    borderColor: '#f2f2f2',
    borderWidth: 1,
  },
  prescriptionDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  prescriptionText: {
    color: 'black',
    marginBottom: 4,
  },
  drugName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: 'black',
  },
  dailyDose: {
    color: 'grey',
  },
  dailyPills: {
    backgroundColor: '#edf2f9',
    color: '#335db0',
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 5,
    margin: 4,
    alignSelf: 'flex-start',
  },
  missedInfo: {
    paddingLeft: 10,
  },
  missed: {
    backgroundColor: '#fff2de',
    color: '#a05f3a',
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 2,
    paddingRight: 20,
    paddingLeft: 20,
    margin: 8,
    marginBottom: 8,
    alignSelf: 'center',
  },
})

export default MissedDoseCard