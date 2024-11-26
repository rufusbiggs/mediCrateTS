import { ScrollView, View, Text, StyleSheet } from "react-native"
import AddStockCard from "../../components/AddStockCard"
import NewPrescription from "../../components/NewPrescription"
import { useUser } from "../../user/UserContext";


const NewStock = () => {
  const { prescriptionData } = useUser();

  return (
    <ScrollView style={styles.main}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Increase the stock of an already running prescription by selecting <Text style={{ fontWeight: 'bold', color: '#335db0'}}>Add Stock</Text>.</Text>
        <Text style={styles.description}>Add a new prescription with <Text style={{ fontWeight: 'bold', color: '#a05f3a'}}>New Prescription</Text>.</Text>
      </View>
        {prescriptionData.map((prescription, idx) => {
          return (
            <AddStockCard key={idx} prescription={prescription} />
          )
        })}
      <View style={styles.newPrescriptionbutton}>
        <NewPrescription />
      </View>
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
  },
  newPrescriptionbutton: {
    paddingTop: 20,
  }
})

export default NewStock