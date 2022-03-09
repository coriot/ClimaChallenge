import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import StartScreen from '../screens/StartScreen';
import SearchCity from '../screens/SearchCity';

const Stack = createNativeStackNavigator();

export default function HomeStack() {

  function headerOptions(title){
		const header = {
			title:title,
			headerStyle: {
				backgroundColor: '#406882',
			},
			headerTintColor: '#fff'
		}

		return header;
	}


  return (
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen 
          name="StartScreen" 
          component={StartScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={headerOptions("Inicio")}
        />
        <Stack.Screen 
          name="SearchCity" 
          component={SearchCity}
          options={headerOptions("Agregar Ciudad")} 
        />
      </Stack.Navigator>
  );
}