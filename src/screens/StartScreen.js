import React, {useContext,useEffect, useState} from 'react';
import { View, ActivityIndicator } from 'react-native';
import GetLocation from 'react-native-get-location'
import { UserContext } from '../providers/UserContext';

export default function StartScreen({navigation}){
    const { userContext, setUserContext } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        setLoading(true)
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            const newContext = { ...userContext, ...{userLocation:location} };
            setUserContext(newContext)
            setLoading(false)
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
        <View style={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator size={60} color="#406882" />
        </View>
    );
}