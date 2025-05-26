import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/HomeScreen';
import ControlPanel from './screens/ControlPanel';
import MusicAndSound from './screens/MusicAndSound'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ControlPanel" component={ControlPanel} />
        <Stack.Screen name="MusicAndSound" component={MusicAndSound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
