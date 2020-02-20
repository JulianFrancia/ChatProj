import React, { useEffect } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from "../components/login";
import Header from "../components/header";
import axios from 'axios';
import { principal } from '../styles/styles';
import { SERVER_URL } from 'react-native-dotenv';
// import setToaster from '../redux/actions/toaster/setToaster';
import invalidToken from '../../redux/actions/logged/invalidToken';
import { errorHandler } from '../utils/axiosGlobalUtils';
import setLogged from '../../redux/actions/logged/setLogged';

const LoginScreen: React.FC = (props: any) => {

    const { userLogged } = props.logged;
    const { actions } = props;

    /* Chequea si fue redireccionado al login por un vencimiento de la sesión */
    useEffect(() => {
        if (userLogged.invalidToken) {
            actions.setToast({
                message: 'Su sesión ha expirado, por favor vuelva a ingresar sus datos',
                duration: 5000,
                showToast: true,
                toastHeader: 'Sesión expirada',
                toastColor: 'danger',
            });

            actions.invalidToken(false);
        }
    }, [userLogged.invalidToken, actions]);

    const handleLogin = (inputs: any) => {
        const user = {
            "username": inputs.username,
            "password": inputs.password,
        };

        axios.post(`${SERVER_URL}/user/login`,
            user,
        )
            .then(response => {
                actions.setLogged(response.data);
                alert('se logueo');
            })
            .catch(errorws => {
                errorHandler(errorws, null, 3000);
                alert(errorws.response ? errorws.response.data.message : errorws);
                return errorws.response;
            });
    }

    return (
        <View style={principal.container}>
            <Header></Header>
            <Login login={handleLogin}></Login>
        </View>
    );
}

const mapStateToProps = state => ({
    logged: state.logged
});

const ActionCreators = Object.assign(
    {},
    {setLogged},
    // setToaster,
    {invalidToken},
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);