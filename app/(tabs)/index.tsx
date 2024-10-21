// import { Link } from 'expo-router'
import { View, Text } from 'react-native'
import PrescriptionCard from '../components/PrescriptionCard';
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
  }
]
; 

const HomePage = () => {
  return (
    <View>
        <Text>Order pills by RUN_OUT_DATE</Text>
        <Text>Prescriptions</Text>
        {prescriptionsData.map((prescription, idx) => {
          return (
            <PrescriptionCard key={idx} prescription={prescription} />
          )
        })}
    </View>
  )
};

export default HomePage

