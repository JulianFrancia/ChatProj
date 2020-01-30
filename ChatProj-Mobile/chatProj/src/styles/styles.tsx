import { StyleSheet } from 'react-native';

export const principal = StyleSheet.create({
    container: {
        flex: 1
    }
});

export const body = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    instructions: {
        textAlign: 'left',
        color: 'white',
        marginBottom: 5
    },
    instructionsSecondary: {
        textAlign: 'left',
        color: 'darkslateblue',
        marginBottom: 5
    },
    input : {
        width: 200,
        color: 'white',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomColor: 'white',
        textAlignVertical: 'bottom',
        marginTop: 40,
    },
    forgot : {
        color: 'white',
    },
    button : {
        marginTop: 35,
    },
    textBottom : {
        color: 'white',
        marginTop: 25
    },
    signUp: {
        color: '#9686F3',
        textDecorationLine: 'underline'
    }
});

export const header = StyleSheet.create({
    container: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'flex-end',
        justifyContent:'center'
    },
    instructions: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 5
    }
});