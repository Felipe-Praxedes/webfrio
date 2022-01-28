import React from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestionation } from '../slices/navSlices';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const greetingMessage = () => {
        let h = new Date().getHours();
        switch (true) {
          case h <= 5: return 'Boa madrugada';
          case h < 12: return 'Bom dia';
          case h < 18: return 'Boa tarde';
          default: return 'Boa noite';
        }   
      }
      

    return (
        <SafeAreaView>
            <Text>
            {greetingMessage()}, Felipe
            </Text>
            <View>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Para onde?'
                        styles={toInputBoxStyles}
                        returnKeyType={'search'}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestionation({
                                    location: details.geometry.location,
                                    description: data.description
                                })
                            );
                            navigation.navigate('RideOptionsCard');
                        }}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'pt-BR'
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                    />
                </View>
                <NavFavourites/>
            </View>

            <View>
                <TouchableOpacity 
                onPress={() => navigation.navigate('RideOptionsCard')}>
                   <Icon name='car' type='font-awesome' color='white' size={16}/>
                        <Text>Viagem</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => navigation.navigate('EatOptionsCard')}>
                   <Icon name='fast-food-outline' type='ionicon' color='black' size={16}/>
                        <Text>Entrega</Text>
                </TouchableOpacity>        
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
        justifyContent: 'space-evenly'
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})
