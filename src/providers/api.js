import React from 'react';
import axios from 'axios';
import {API_KEY} from "@env"


export async function CurrentWatherData(lat,lon){
    var config = {
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
        headers: { }
      };

      const response = await apiCall(config);

      return response;
}

export async function FiveDaysWatherData(lat,lon){
  var config = {
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`,
      headers: { }
    };

    const response = await apiCall(config);

    return response;
}

export async function GetSearchCity(name){
  var config = {
      method: 'get',
      url: `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`,
      headers: { }
    };

    const response = await apiCall(config);

    return response;
}

async function apiCall(config){
  return axios(config)
      .then(function (response) {
        return {error:false,data:response.data};
      })
      .catch(function (error) {
        return {error:true,data:error.data};
  });
}