import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <View style={[styles.container, props.style]}>
            <Icon name={props.icon} size={20} style={styles.icon} />
            <TextInput {...props} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#EEE',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#171717',
        elevation: 1
    },
    icon: {
        color: '#171717',
        marginLeft: 20,
    },
    input: {
        marginLeft: 20,
        width: '70%',
        fontSize: 20,
        color: '#171717'
    }
})