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

const PrescriptionCard = ({ prescription } : { prescription : Prescription }) => {
  const { drug, pillDose, dailyDose, startDate, initialStock, addedPills } = prescription;
  const startDateDateFormat = new Date(startDate);
  const currentStock = getCurrentStock(startDateDateFormat, dailyDose, pillDose, addedPills, initialStock);
  const pillsPerDay = dailyDose / pillDose;

  return (
    <View style={styles.prescriptionContainer}>
      <View style={styles.topRow}>
        <Text style={styles.drugName}>{drug}: {pillDose}mg</Text>
        <Text>{pillsPerDay} pill{pillsPerDay > 1 ? 's' : ''} per day</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text>Runs out: {runsOut(dailyDose, pillDose, currentStock)}</Text>
        <Text>({currentStock} pills left)</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  prescriptionContainer: {
    display: 'flex',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomRow: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  drugName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  }
})

export default PrescriptionCard