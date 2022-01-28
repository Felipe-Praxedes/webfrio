import React from 'react'
import { KeyboardAvoidingView, Platform, AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import { store } from './store';
import AuthOrApp from './src/screens/AuthOrApp'
import Auth from './src/screens/Auth'
import Navigator from "./src/Navigator"
import { name as appName } from './app.json'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpp from './src/screens/SignUp'

export default function Root() {

    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
                    >
                        <Stack.Navigator>
                            <Stack.Screen
                                name='AuthOrApp'
                                component={AuthOrApp}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name='Auth'
                                component={Auth}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name='Navigator'
                                component={Navigator}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack.Navigator>
                    </KeyboardAvoidingView>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    )
};

AppRegistry.registerComponent(appName, () => Root)
