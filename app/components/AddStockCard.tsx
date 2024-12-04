import { StyleSheet, View, Text } from "react-native";
import { getCurrentStock, runsOut } from "../../services/functions";

interface Prescription {
  drug: string,
  pillDose: number,
  dailyDose: number,
  startDate: string,
  initialStock: number,
  addedPills: number[],
}

const AddStockCard = ({ prescription } : { prescription : Prescription }) => {
  const { drug, pillDose } = prescription;


  return (
    <View style={styles.prescriptionContainer}>
      <View style={styles.prescriptionDetails}>
        <Text style={styles.drugName}>{drug} {pillDose}mg</Text>
        <Text style={styles.dailyPills}>+ Add Stock</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  prescriptionContainer: {
    display: 'flex',
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
    justifyContent: 'space-between',
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
  dailyPills: {
    backgroundColor: '#edf2f9',
    color: '#335db0',
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 5,
    margin: 4,
    alignSelf: 'flex-start',
  },
})

export default AddStockCard