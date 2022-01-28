import React, { Component } from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity, Background, ImageBackground } from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logoWebFrio from '../../assets/img/WebFrio.png'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSuccess } from '../common'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                nome: this.state.name,
                email: this.state.email,
                telefone: '',
                senha: this.state.password,
                confirmSenha: this.state.confirmPassword,
            })

            showSuccess('Usuário cadastro!')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                senha: this.state.password
            })

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Navigator', res.data)
        } catch (e) {
            showError(e)
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <SafeAreaView style={styles.background}>
                <Image source={logoWebFrio} style={styles.logo} />
                <ScrollView style={{ width: '100%', height: '100%', alignContent: 'center' }}>
                    <Text style={styles.title}>Faça parte desta comunidade</Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.subtitle}>
                            {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                        </Text>
                        {this.state.stageNew &&
                            <AuthInput icon='user' placeholder='Nome'
                                value={this.state.name}
                                style={styles.input}
                                onChangeText={name => this.setState({ name })} />
                        }
                        <AuthInput icon='at' placeholder='E-mail'
                            value={this.state.email}
                            style={styles.input}
                            onChangeText={email => this.setState({ email })} />
                        <AuthInput icon='lock' placeholder='Senha'
                            value={this.state.password}
                            style={styles.input} secureTextEntry={true}
                            onChangeText={password => this.setState({ password })} />
                        {this.state.stageNew &&
                            <AuthInput icon='asterisk'
                                placeholder='Confirmação de Senha'
                                value={this.state.confirmPassword}
                                style={styles.input} secureTextEntry={true}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                        }
                        <TouchableOpacity onPress={this.signinOrSignup}
                            disabled={!validForm}>
                            <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                                <Text style={{ color: '#FFF', fontSize: 20 }}>
                                    {this.state.stageNew ? 'Continuar' : 'Entrar'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: 5, padding: 10, backgroundColor: 'rgba(245, 245, 245, 0.8)', borderRadius: 20, alignSelf: 'center' }}
                        onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        position: 'relative',
        alignSelf: 'center',
        marginTop: 20,
        height: 100,
        width: '80%',
        resizeMode: 'stretch',
    },
    title: {
        fontFamily: commonStyles.fontFamily.Variable,
        color: commonStyles.colors.primary,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 50,
        marginHorizontal: 15,
        padding: 10,
        alignItems: 'center',
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily.regular,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(245, 245, 245,1)',
        padding: 20,
        width: '90%',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 3,
        alignContent: 'center',
        alignSelf: 'center'
    },
    input: {
        marginTop: 15,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: 'rgb(66, 66, 66,0.8)',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily.bold,
        color: commonStyles.colors.secondary,
        fontSize: 20
    }
})