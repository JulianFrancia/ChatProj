import React from 'react';
import { Text, View } from 'react-native';
import { body, header } from '../styles/styles';

const Header: React.FC = (props) => {
    return (
        <View style={header.container}>
            <Text style={header.instructions}>
                HEADER
            </Text>
        </View>
    );
}

export default Header;