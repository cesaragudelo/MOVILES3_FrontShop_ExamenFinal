
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerScreen from './CustomerScreen'
import ListCustomer from './listCustomer';
import reservas from './reservas'
import {MaterialIcons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function HomeTabs () {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarActiveBackgroundColor:'powderblue'
        }}
    >
      <Tab.Screen name="Customer" component={CustomerScreen} options={{
        title:'Habitaciones',
        tabBarIcon:({color})=>(
            <MaterialIcons name='account-circle' size={25} color='black'/>
        ),
        }} />
       <Tab.Screen name="reserva" component={reservas} options={{
        title:'Reservas',
        tabBarIcon:({color})=>(
            <MaterialIcons name='view-list' size={25} color='black'/>
        ),
        }}/>

      <Tab.Screen name="List" component={ListCustomer} options={{
        title:'Listado Habitaciones',
        tabBarIcon:({color})=>(
            <MaterialIcons name='view-list' size={25} color='black'/>
        ),
        }}/>
       
    </Tab.Navigator>
  );
}