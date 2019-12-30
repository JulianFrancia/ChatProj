import React from 'react';
import { View } from 'react-native';
import Login from "../components/login";
import Header from "../components/header";
import { principal } from '../styles/styles';

const LoginScreen: React.FC = (props) => {
    return (
        <View style={principal.container}>
            <Header></Header>
            <Login></Login>
        </View>
    );
}

export default LoginScreen;