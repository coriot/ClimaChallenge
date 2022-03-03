import React, {useEffect} from 'react';
import { View,Text } from 'react-native';
import { TestApi } from '../providers/api';
export default function Home(){

    useEffect(() =>{
        TestApi().then(res => console.log(res));
    },[]);


    return(
        <View>
            <Text>Home</Text>
        </View>
    );
}