/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/navigators/HomeStack';
import { UserContext } from './src/providers/UserContext';



export default function App(){
  const [userContext, setUserContext] = useState({
    userLocation: null,
  });

  const value = useMemo(() => {
    return { userContext, setUserContext };
  }, [userContext, setUserContext]);



  return (
    <UserContext.Provider value={value}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </UserContext.Provider>
  );
};


