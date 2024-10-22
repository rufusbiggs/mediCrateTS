// import { Link } from 'expo-router'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import PrescriptionCard from '../components/PrescriptionCard';
import { calculateFutureDate } from '../../services/functions';
import { FontAwesome5 } from '@expo/vector-icons'

// import PRESCRIPTIONS from '../../mock_data/prescriptions.JSON';


// Fetch Prescriptions e.g.
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

const HomePage = () => {

  const today = calculateFutureDate(0);
  return (
    <ScrollView style={styles.main}>
        <View style={styles.headingBar}>
          <Text>Today {today}</Text>
        </View>
        <View style={styles.notificationBox}>
          <FontAwesome5 name="pills" size={30} color="white" />
          <View>
            <Text style={styles.orderBefore}>Order prescription before 4 March!</Text>
            <Text style={styles.runsOut}>Your stock will run out a few days later</Text>
          </View>
        </View>
        <Text style={styles.medications}>All Prescriptions</Text>
        {prescriptionsData.map((prescription, idx) => {
          return (
            <PrescriptionCard key={idx} prescription={prescription} />
          )
        })}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1, // Use flex: 1 to take full height and enable scrolling
  },
  headingBar: {
    padding: 10,
    paddingLeft: 15,
    gap: 5,
    backgroundColor: 'white',
  },
  notificationBox: {
    padding: 12,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#8857dd',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  orderBefore: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',

  },
  medications: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  runsOut: {
    color: 'white'
  },
  headingText: {
    color: '#1e7378',
    fontSize: 16,
    fontWeight: 'bold',
  }
})

export default HomePage

