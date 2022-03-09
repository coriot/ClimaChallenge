import React, { useEffect, useContext, useState } from 'react';
import { View, Text, FlatList, Dimensions, Button, StyleSheet, Alert } from 'react-native';
import { stylesGlobal } from './styles';
import { Card } from 'react-native-paper';
import { getFav, clearAll, removeFav } from '../providers/StoreFavorites';
import WeaterCardGeneral from './components/WeaterCardGeneral';
import { useIsFocused } from "@react-navigation/native";

const { height, width } = Dimensions.get('screen');

export default function Home({ navigation }) {
    const [favCities, setFavCities] = useState([]);
    const isFocused = useIsFocused();

    async function getFavorites() {
        const favs = await getFav();
        setFavCities(favs);
    }

    function deleteFavorite(id){
        Alert.alert(
            "Eliminar",
            "¿Está seguro que quiere eliminar la ciudad?",
            [
              {
                text: "Cancelar",
                style: "cancel"
              },
              { text: "Elimianar", onPress: () => handleDelete(id) }
            ]
          );
        
    }

    async function handleDelete(id){
        await removeFav(id)
        getFavorites()
    }

    useEffect(() => {
        if (isFocused) {
            getFavorites();
        }
    }, [navigation, isFocused])


    const renderItem = ({ item }) => {

        return (
            <WeaterCardGeneral
                latitude={item.lat}
                longitude={item.lon}
                nameFavorite={item.name}
                onPress={()=>deleteFavorite(item.id)}
            />
        );
    }

    


    return (
        <View style={stylesGlobal.container}>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <Text style={styles.sectionText}>Mi ubicación</Text>
                        <WeaterCardGeneral
                            currentLocation={true}
                            extendDays={true}
                        />
                        <Text style={styles.sectionText}>Favoritos {favCities.length}/5</Text>
                    </View>
                }
                data={favCities}
                renderItem={(item) => {
                        return renderItem(item)
                    }
                }
                refreshing={true}
                keyExtractor={(item, index) => { return index }}
                ListFooterComponent={
                    <View>
                        {favCities.length != 5 ? 
                            <Card onPress={() => navigation.navigate('SearchCity')} style={{ backgroundColor: '#d4d4d4' }}>
                                <Card.Content>
                                    <View style={{ height: height * 0.07, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>+ Agregar Ciudad</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                        :null}
                    </View>
                }
            />

        </View>
    );
}

const styles = StyleSheet.create({
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});