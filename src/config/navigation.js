import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';



// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {
//     Dashboard,
//     Destination,
//     CarSelection,
//     YourTrips,
//     TripDetails,
//     Login,
//     SignUp,
//     Logout
//   } from '../views';

import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import UserTracking from '../views/UserTracking';
  
const Stack = createNativeStackNavigator()
//const Drawer = createDrawerNavigator()
//   const Tab = createMaterialTopTabNavigator()


export default function MainNavigator() {
    // const [user, setUser] = useState(true)
    
    
    return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Dashboard" component={WhatsappTabs} /> */}
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Dashboard" component={Dashboard}/>
      <Stack.Screen name="UserTracking" component={UserTracking}/>
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  // 
//   function MainStack() {
//     return <Drawer.Navigator initialRouteName="Dashboard">
//       <Drawer.Screen name="Dashboard" component={DashboardStack} />
   
//     </Drawer.Navigator>
//   }
  
//   function AuthStack() {
//     return <Stack.Navigator>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//     </Stack.Navigator>
//   }
  
//   function DashboardStack() {
//     return (
      
//     )
//   }
  
//   function TripStack() {
//     return (
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="YourTrips" component={YourTrips} />
//         <Stack.Screen name="TripDetails" component={TripDetails} />
//       </Stack.Navigator>
//     )
//   }
  
  
  /*
    1. Stack Navigator
    2.
  
  */