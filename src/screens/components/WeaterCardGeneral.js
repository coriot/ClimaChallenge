import React, { useEffect, useState, useContext } from 'react';
import {    View, 
            Text, 
            Image, 
            Dimensions, 
            StyleSheet, 
            ActivityIndicator, 
            Pressable 
        } from 'react-native';
import { Card, Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment/min/moment-with-locales';
import { CurrentWatherData, FiveDaysWatherData } from '../../providers/api'
import { UserContext } from '../../providers/UserContext'

moment.locale('es');

const { height, width } = Dimensions.get('screen');

export default function WeaterCardGeneral(
    {   currentLocation = false, 
        latitude, 
        longitude,
        extendDays = false,
        onPress,
        nameFavorite
    }) {
    const [weatherData, setWeatherData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const { userContext } = useContext(UserContext);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const getData = async (lat, lon) => {
        const [ current, res ] = await Promise.all([
            CurrentWatherData(lat,lon), FiveDaysWatherData(lat,lon)
        ])

        if (!res.error && !current.error) {
            setWeatherData(res.data);
            setCurrentData(current.data);
        } else {
            setWeatherData(null);
            setCurrentData(null);
        }

    }

    useEffect(() => {
        if(currentLocation){
            const { userLocation } = userContext;
            getData(userLocation.latitude, userLocation.longitude);
        }else{
            getData(latitude, longitude);
        }
        
    }, []);

    return (
        <Card style={styles.card}>
            {weatherData && currentData ? 
                <Card.Content>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={{flex:0.5, flexDirection:'row'}}>
                            <MaterialCommunityIcons
                                name='map-marker'
                                color={'red'}
                                size={22}
                            />
                            <Text style={styles.textCity}>{currentLocation ? `${currentData.name}` : nameFavorite}, {currentData.sys.country}</Text>
                            </View>
                            {!currentLocation ? <View style={{flex:0.5,alignItems:'flex-end'}}>
                                <Pressable onPress={onPress}>
                                    <MaterialCommunityIcons
                                        name='delete'
                                        color={'gray'}
                                        size={22}
                                    />
                                </Pressable>
                            </View>:null}
                        </View>
                        <View>
                            <Text style={styles.textDate}>
                                {moment.unix(weatherData.current.dt).format('lll')}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.containerTemp}>
                                <Image
                                    source={{ uri: `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png` }}
                                    style={styles.iconWeather}
                                />
                                <Text style={{ fontSize: 44 }} >{Math.round(weatherData.current.temp)}°</Text>
                            </View>
                            <View style={styles.containerExtra}>
                                <Text style={{ textTransform: 'capitalize' }}>{weatherData.current.weather[0].description}</Text>
                                <Text>Sensación Térmica {Math.round(weatherData.current.feels_like)}°</Text>
                            </View>
                        </View>
                        {!extendDays ? <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /> : null}
                    </View>
                    {extendDays || isSwitchOn ? 
                        <View style={styles.containerDaily}>
                            {weatherData.daily.slice(1, 6).map((item, index) => {
                                return (
                                    <View key={index} style={styles.dailyRow}>
                                        <Text style={{ textTransform: 'capitalize' }}>{moment.unix(item.dt).format('dddd')}</Text>
                                        <Image
                                            source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                                            style={styles.iconDaily}
                                        />
                                        <Text>{Math.round(item.temp.max)}°/{Math.round(item.temp.min)}°</Text>
                                    </View>
                                )
                            })}
                            
                        </View>
                    :null}
                </Card.Content>:
                currentLocation ?
                <View style={{padding:15}}>
                    <ActivityIndicator size={48} color="#0000ff" />
                </View>
            :null}
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    },
    container: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    textCity: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    textDate: {
        marginLeft: 10,
        fontSize: 12,
        color: 'gray',
        fontWeight: 'bold'
    },
    containerTemp: {
        paddingTop: 10,
        flexDirection: 'row',
        flex: 0.5,
        alignItems: 'center'
    },
    iconWeather: {
        width: width * 0.2,
        height: width * 0.2,
        backgroundColor: '#d4d4d4',
        marginRight: 10,
        borderRadius: (width * 0.2) / 2
    },
    iconDaily: {
        width: width * 0.08,
        height: width * 0.08,
        backgroundColor: '#d4d4d4',
        borderRadius: (width * 0.2) / 2
    },
    containerExtra: {
        flex: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    containerDaily: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#d4d4d4',
        marginTop: 10,
        paddingTop: 5
    },
    dailyRow: {
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10
    }

});