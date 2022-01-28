import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlices';

const data = [
    {
        id: "123",
        title: "Viagem",
        image: 'https://www.webfrio-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_126,h_126/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_webfrioX.png',
        screen: 'MapScreen'
    },
    {
        id: "456",
        title: "Entrega",
        image: 'https://key0.cc/images/small/2105607_0b77440bd2f9371d84314ffbd10e7a09.png',
        screen: "Viagem"
    }
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    disabled={!origin}
                >
                    <View>
                        <Image
                            style={{ width: 120, height: 120, resizeMode: 'contain' }}
                            source={{ uri: item.image }}
                        />
                        <Text>{item.title}</Text>
                        <Icon
                            name='arrowright'
                            color='white'
                            type='antdesign' />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions
