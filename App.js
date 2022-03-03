/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/navigators/HomeStack';




export default function App(){

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};


