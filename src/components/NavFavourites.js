import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';

export default function NavFavourites() {

    const data=[
        {
            id: '123',
            icon: 'home',
            location: 'Casa',
            destination: "Av. Reynaldo Porcari, 1385 - Medeiros, Jundiaí - SP, Brasil"
        },
        {
            
            id: '456',
            icon: 'briefcase',
            location: 'Trabalho',
            destination: "Cento de Distribuição Via Varejo - Castanho, Jundiaí - SP, Brasil"
        }
    ];

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => ( <View style={{height: 0.5}} /> )}
            renderItem={({item: { location, destination, icon} }) => (
                <TouchableOpacity 
                style={{flexDirection: 'row'}}>
                    <Icon
                        name={icon}
                        type='ionicon'
                        color='white'
                        size={18}
                        />
                        <View>
                            <Text>{location}</Text>
                            <Text>{destination}</Text>
                        </View>
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({})
