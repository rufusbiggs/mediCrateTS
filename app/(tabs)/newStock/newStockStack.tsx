import { createStackNavigator } from '@react-navigation/stack';
import NewStock from './newStock';
import AddNewStockDetails from './addNewStockDetails';

const Stack = createStackNavigator();

const NewStockStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='newStock'
                component={NewStock}
                options={{ headerTitle: 'Add Pills' }}                
            />
            <Stack.Screen 
                name='addNewStockDetails'
                component={AddNewStockDetails}
                options={{ headerTitle: 'Add Pills' }}                
            />
        </Stack.Navigator>
    )
}

export default NewStockStack;