import React, { useEffect, useRef } from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native-elements/dist/buttons/Button'

export default function AuthOrApp() {

    const navigatePage = async () => {

            const navigation = useNavigation();

            const userDataJson = await AsyncStorage.getItem('userData')
            let userData = null

            try {
                userData = JSON.parse(userDataJson)
            } catch (e) {
                // userData está inválido
            }

            if (userData && userData.token) {
                axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
                navigation.navigate('Navigator', userData)
            } else {
                navigation.navigate('Auth')
            }
        }

    return (
        <View style={styles.container}>
            <Button onPress={navigatePage()}></Button>
            <ActivityIndicator size='large' />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})