import { StyleSheet } from 'react-native';

export const principal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'wheat',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
});

export const body = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'wheat',
        alignItems: 'flex-start',
        // justifyContent: 'center',
    },
    instructions: {
        textAlign: 'left',
        color: 'darkseagreen',
        marginBottom: 5
    },
    instructionsSecondary: {
        textAlign: 'left',
        color: 'darkslateblue',
        marginBottom: 5
    }
});

export const header = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'olive',
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: 'darkseagreen',
        marginBottom: 5
    }
});