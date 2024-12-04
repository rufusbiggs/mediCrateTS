// import { Link } from 'expo-router'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import PrescriptionCard from '../components/PrescriptionCard';
import { calculateFutureDate, getCurrentStock, daysLeft } from '../../services/functions';
import { FontAwesome5 } from '@expo/vector-icons'
import { useUser } from '../user/UserContext';
import { useAuth } from '../auth/AuthContext';
import { useEffect, useState } from 'react';

// Fetch Prescriptions e.g.
interface Prescription {
  drug: string,
  pillDose: number,
  dailyDose: number,
  startDate: string,
  initialStock: number,
  addedPills: number[],
}

const DELIVERY_TIME = 4;

const HomePage = () => {

  const { prescriptionData } = useUser();

  const today = calculateFutureDate(0, true);

  const calculatePrescriptionDaysLeft = (prescription : Prescription): number => {
    const numPerDay = prescription.dailyDose / prescription.pillDose;
    const startDateDateFormat = new Date(prescription.startDate);
    const currentStock = getCurrentStock(startDateDateFormat, prescription.dailyDose, prescription.pillDose, prescription.addedPills, prescription.initialStock);
    const timeLeft = daysLeft(currentStock, numPerDay);

    return timeLeft
  }

  let daysUntilSoonest = 0;
  let daysIncludingDelivery = 0;
  let runOutDate = calculateFutureDate(0, false);

  if (prescriptionData) {
    const allPrescriptionsDaysLeft = prescriptionData.map(prescription => calculatePrescriptionDaysLeft(prescription));
    daysUntilSoonest = Math.min(...allPrescriptionsDaysLeft);
    daysIncludingDelivery = daysUntilSoonest - DELIVERY_TIME;
    runOutDate = calculateFutureDate(daysIncludingDelivery, false);
  }

  return (
    <ScrollView style={styles.main}>
        <View style={styles.headingBar}>
          {/* <Button title="logout" onPress={handleLogout} ></Button> */}
          <Text>Today {today}</Text>
        </View>
        <View style={styles.notificationBox}>
          <FontAwesome5 name="pills" size={30} color="white" />
          <View>
            <Text style={styles.orderBefore}>Order prescription before {runOutDate}!</Text>
            <Text style={styles.runsOut}>Your stock will run out a few days later</Text>
          </View>
        </View>
        {prescriptionData ? 
          <>
            <Text style={styles.medications}>All Prescriptions</Text>
            {prescriptionData.map((prescription, idx) => {
              return (
                <PrescriptionCard key={idx} prescription={prescription} />
              )
            })}
          </>
        : <Text style={styles.medications}>No Current Prescriptions</Text>
        }
        
        
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

