import { ScrollView, View, Text, StyleSheet } from "react-native"
import MissedDoseCard from "../../components/MissedDoseCard"
import { useUser } from "../../user/UserContext";

const missedDose = () => {
  const { prescriptionData } = useUser();

    return (
        <ScrollView style={styles.main}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>Select the prescription you missed</Text>
          </View>
            {prescriptionData.map((prescription, idx) => {
              return (
                <MissedDoseCard key={idx} prescription={prescription} />
              )
            })}
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

export default missedDose