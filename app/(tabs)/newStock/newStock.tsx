import { ScrollView, View, Text, StyleSheet } from "react-native"
import AddStockCard from "../../components/AddStockCard"
import NewPrescription from "../../components/NewPrescription"

interface Prescription {
  id: number,
  drug: string,
  pillDose: number,
  dailyDose: number,
  startDate: string,
  initialStock: number,
  addedPills: number[],
}

const prescriptionsData : Prescription[] = [
  {
  "id": 1,
  "drug": "Lacosamide",
  "pillDose": 50,
  "dailyDose": 300,
  "startDate": "2024-02-01T00:00:00.000Z",
  "initialStock": 1692,
  "addedPills": [50]
  },
  {
  "id": 2,
  "drug": "Levothyroxine",
  "pillDose": 250,
  "dailyDose": 250,
  "startDate": "2024-02-01T00:00:00.000Z",
  "initialStock": 392,
  "addedPills": [50, 100]
  },
  {
  "id": 3,
  "drug": "Dexamethasone",
  "pillDose": 50,
  "dailyDose": 100,
  "startDate": "2024-02-01T00:00:00.000Z",
  "initialStock": 392,
  "addedPills": [50, 90, 85]
  },
  {
  "id": 3,
  "drug": "Dexamethasone",
  "pillDose": 50,
  "dailyDose": 100,
  "startDate": "2024-02-01T00:00:00.000Z",
  "initialStock": 392,
  "addedPills": [50, 90, 85]
  }
]
;

const newStock = () => {
  return (
    <ScrollView style={styles.main}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Increase the stock of an already running prescription by selecting <Text style={{ fontWeight: 'bold', color: '#335db0'}}>Add Stock</Text>.</Text>
        <Text style={styles.description}>Add a new prescription with <Text style={{ fontWeight: 'bold', color: '#a05f3a'}}>New Prescription</Text>.</Text>
      </View>
        {prescriptionsData.map((prescription, idx) => {
          return (
            <AddStockCard key={idx} prescription={prescription} />
          )
        })}
      <NewPrescription />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  descriptionContainer: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    paddingBottom: 6,
    // fontWeight: 'bold',

  }
})

export default newStock