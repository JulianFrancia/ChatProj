import React, { useState } from 'react';
import GradientButton from 'react-native-gradient-buttons';
import { Text, TextInput, View } from 'react-native';
import { body } from '../styles/styles';


const Login = (props: any) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    
    return (
        <View style={body.container}>
            <TextInput placeholder='User*' placeholderTextColor='white' onChangeText={setUsername} style={body.input} autoCompleteType='username'/>
            <TextInput placeholder='Pasword*' placeholderTextColor='white' onChangeText={setPassword} secureTextEntry={true} style={body.input} autoCompleteType='password'/>
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
                onPressAction={() => props.login({username, password})}
    />
            </View>

            <Text style={body.textBottom}>Don`t have an account?<Text style={body.signUp}> Sign up</Text></Text>

        </View>
    );
}

export default Login;