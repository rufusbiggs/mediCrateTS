import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import NewStock from './newStock';
import AddNewStockDetails from './addNewStockDetails';

export type NewStockStackParamList = {
    NewStock: undefined,
    AddNewStockDetails: undefined
}

const Stack = createStackNavigator<NewStockStackParamList>();

const NewStockStack = () => {
    return (
        <Stack.Navigator initialRouteName='NewStock'>
            <Stack.Screen 
                name='NewStock'
                component={NewStock}
                options={{ headerTitle: 'Add Pills'}}                
            />
            <Stack.Screen 
                name='AddNewStockDetails'
                component={AddNewStockDetails}
                options={{ headerTitle: 'Add Pills'}}                
            />
        </Stack.Navigator>
    )
}

export default NewStockStack;