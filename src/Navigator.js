import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './screens/HomeScreen'
import Menu from './screens/Menu'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Reanimated 2'])

export default function app(props) {

    const Drawer = createDrawerNavigator();

    return (
            <Drawer.Navigator
                drawerContent={() =><Menu {...props}/>}
                screenOptions={{
                    activeTintColor: '#080',
                    inactiveTintColor: 'white',
                    itemStyle: { alignItems: 'flex-end' },
                }}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Settingss" component={HomeScreen} />
            </Drawer.Navigator>
    ); 
}

