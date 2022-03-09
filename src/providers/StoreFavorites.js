import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/min/moment-with-locales';

export const storeFav = async (value) => {
    try {
        let favArr = await getFav();
        value.id = moment().unix();
        console.log(value)
        favArr.push(value);
        const jsonValue = JSON.stringify(favArr);
        await AsyncStorage.setItem('favorites', jsonValue);
        return true;
    } catch (e) {
      // saving error
    }
}

export const removeFav = async (id) => {
    try {
        let favArr = await getFav();
        let newArr = favArr.filter((item) => item.id != id);
        const jsonValue = JSON.stringify(newArr);
        await AsyncStorage.setItem('favorites', jsonValue);
        return true;
    } catch (e) {
      // saving error
    }
}

export const getFav = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      // error reading value
    }
}

export const clearAll = async (value) => {
    try {
       
        const jsonValue = JSON.stringify([]);
        await AsyncStorage.setItem('favorites', jsonValue);
    } catch (e) {
      // saving error
    }
}