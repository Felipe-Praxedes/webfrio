import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Image } from 'react-native-elements'
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlices';
import "intl";
import "intl/locale-data/jsonp/pt-BR";

const data = [
    {
        id: 'webfrio-X-123',
        title: 'webfrio X',
        multiplier: 1,
        image: 'https://www.webfrio-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_303,h_170/f_auto,q_auto/products/carousel/webfrioX.png'
    },
    {
        id: 'webfrio-XL-456',
        title: 'webfrio XL',
        multiplier: 1.2,
        image: 'https://www.webfrio-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_303,h_170/f_auto,q_auto/products/carousel/webfrioXL.png'
    },
    {
        id: 'webfrio-LUX-789',
        title: 'webfrio LUX',
        multiplier: 1.5,
        image: 'https://www.webfrio-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_303,h_170/f_auto,q_auto/products/carousel/Black.png'
    }
]

const SURGE_CHARGE_RATE = 2.7;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const traveltimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}>
                    <Icon name='chevron-left' type='fontawesome' />
                </TouchableOpacity>
                <View>
                    <Text>Escolha uma viagem - </Text>
                    <Text>{traveltimeInformation?.distance?.text}</Text>
                </View>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}>
                        <Image
                            style={{
                                width: 100,
                                height: 90,
                                resizeMode: 'contain',
                                transform: [{ scale: 1.5 }]
                            }}
                            source={{ uri: image }}
                        />
                        <View>
                            <Text>{title}</Text>
                            <Text>{traveltimeInformation?.duration?.text}</Text>
                            <Text>Tempo de viagem</Text>
                        </View>
                        <Text>
                            
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(
                                (traveltimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                            )}

                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View>
                <TouchableOpacity disabled={!selected}>
                    <Text>Escolha {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard;

const styles = StyleSheet.create({});
