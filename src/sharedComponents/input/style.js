import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        color: 'gray',
        marginTop: 5,
    },
    text_header: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        marginTop: 30,
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: '#FEFEFE',
        borderBottomColor: '#EFEFEF',
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -15,
        paddingLeft: 10,
        color: '#05375a',

    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    },
});