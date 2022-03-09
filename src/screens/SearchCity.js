import React, {useState} from 'react';
import { Searchbar, List } from 'react-native-paper';
import { View, FlatList, Button } from 'react-native';
import { stylesGlobal } from "./styles";
import { GetSearchCity } from '../providers/api';
import { storeFav, getFav } from '../providers/StoreFavorites';

export default function SearchCity({navigation}){
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const onChangeSearch = query => {
        setSearchQuery(query)
        if(query.length >= 3){
            handleSearch(query)
        }else{
            setSearchResult(null)
        }

        
    };

    async function handleStore(item){
        await storeFav(item);
        navigation.goBack();
    }


    async function handleSearch(name){
        const res = await GetSearchCity(name)
        setSearchResult(res.data);
    }

    const renderItem = ({item}) => {
        return (
            <List.Item
                title={item.name}
                description={item.country}
                left={props => <List.Icon {...props} icon="map-marker" />}
                onPress={() => handleStore(item)}
                style={{borderBottomWidth:1,borderBottomColor:'#d4d4d4'}}
            />
        )
    }



    return (
        <View style={stylesGlobal.container}>
            <Searchbar
                placeholder="Ciudad, País"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={handleSearch}
            />
            

            {searchResult ? <FlatList
                data={searchResult}
                renderItem={renderItem}
                keyExtractor={(item, index) => { return index}}
            />:null}


        </View>
    );
}
