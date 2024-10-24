import { StyleSheet, View, Text } from "react-native";
import { getCurrentStock, runsOut } from "../../services/functions";

interface Prescription {
  id: number,
  drug: string,
  pillDose: number,
  dailyDose: number,
  startDate: string,
  initialStock: number,
  addedPills: number[],
}

const MissedDoseCard = ({ prescription } : { prescription : Prescription }) => {
  const { drug, pillDose, dailyDose, startDate, initialStock, addedPills } = prescription;
  const pillsPerDay = dailyDose / pillDose;

  return (
    <View style={styles.prescriptionContainer}>
      <View style={styles.prescriptionDetails}>
        <Text style={styles.drugName}>{drug} {pillDose}mg</Text>
        <Text style={styles.dailyDose}>{dailyDose}mg per day</Text>
      </View>
      {/* <Text style={styles.dailyPills}>Take {pillsPerDay} pill{pillsPerDay > 1 ? 's' : ''} per day</Text> */}
      <Text style={styles.missedInfo}>Selecting 'Missed Dose' will add {pillsPerDay} pill{pillsPerDay > 1 ? 's' : ''} back to your stock.</Text>
      <Text style={styles.missed}>Confirm Missed Dose</Text>
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
    padding: 8,
    paddingRight: 20,
    paddingLeft: 20,
    margin: 15,
    marginBottom: 15,
    alignSelf: 'center',
}
})

export default MissedDoseCard