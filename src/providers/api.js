import React from 'react';
import axios from 'axios';


export async function TestApi(){
    var config = {
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b9d3a29d7f144301e5bcbbb605001b97x',
        headers: { }
      };

      return axios(config)
      .then(function (response) {
        return {error:false,data:response.data};
      })
      .catch(function (error) {
        return {error:true,data:error.data};
      });
}