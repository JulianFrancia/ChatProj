import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { body } from '../styles/styles';

const Login: React.FC = (props) => {
    return (
        <View style={body.container}>
            <Text style={body.instructionsSecondary}>
                LogIn to ChatProject
            </Text>
            <TextInput placeholder='username' />
            <TextInput placeholder='password' />
        </View>
    );
}

export default Login;