import React, {useContext,useEffect} from 'react';
import { View, Text } from 'react-native';
import GetLocation from 'react-native-get-location'
import { UserContext } from '../providers/UserContext';

export default function StartScreen({navigation}){
    const { userContext, setUserContext } = useContext(UserContext);

    useEffect(() =>{

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            const newContext = { ...userContext, ...{userLocation:location} };
            setUserContext(newContext)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
            
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
      },[]);
    return(
        <View>
            <Text>Cargando..</Text>
        </View>
    );
}