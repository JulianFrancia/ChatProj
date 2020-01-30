import React from 'react';
import GradientButton from 'react-native-gradient-buttons';
import { Text, TextInput, View } from 'react-native';
import { body } from '../styles/styles';


const Login: React.FC = (props) => {
    
    
    return (
        <View style={body.container}>
            <TextInput placeholder='User*' placeholderTextColor='white'  style={body.input}/>
            <TextInput placeholder='Pasword*' placeholderTextColor='white' style={body.input}/>
            <Text style={body.forgot}>Forgot your password?</Text>
            
            <View style={body.button}>
            <GradientButton
                style={{ marginVertical: 8 }}
                text="Login"
                textStyle={{ fontSize: 20 }}
                gradientBegin="#A80068"
                gradientEnd="#333333"
                gradientDirection="diagonal"
                height={50}
                width={200}
                radius={75}
                impact
                impactStyle='Light'
                onPressAction={() => alert('You pressed me!')}
    />
            </View>

            <Text style={body.textBottom}>Don`t have an account?<Text style={body.signUp}> Sign up</Text></Text>

        </View>
    );
}

export default Login;