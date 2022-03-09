import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import StartScreen from '../screens/StartScreen';
import SearchCity from '../screens/SearchCity';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SearchCity" component={SearchCity} />
      </Stack.Navigator>
  );
}