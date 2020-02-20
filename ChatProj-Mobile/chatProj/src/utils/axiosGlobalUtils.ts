import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import store from '../../redux/store';

export const axiosInstance = axios.create({
    baseURL: `${SERVER_URL}`
});

const requestHandler = (request) => {
    // Modify request here...

    // este acceso al store sólo es posible si se exporta el store, cosa que está mal si se usa server-side-rendering
    request.headers['Authorization'] = 'Bearer ' + store.getState().logged.userLogged.token;

    return request;
};

export const errorHandler = (error, toastTitle?: string, toastDuration?: number) => {
    let message = '';
    let title = toastTitle ? toastTitle : 'Algo salió mal';

    // Handle errors
    if (error.response) {
        if (error.response && error.response.data && error.response.data.msg) {
            const { msg } = error.response.data;
            message = msg;
        } else if (error.response.data.message && error.response.data.message.msg) {
            const { msg } = error.response.data.message;
            message = msg;
        } else if (error.response.data.message) {
            message = error.response.data.message;
        } else {
            message = error.message;
        }
    } else {
        message = error.message;
    }

    if (error.response && error.response.status === 401) {
        store.dispatch({ type: 'logOut', payload: '' });
        store.dispatch({ type: 'invalidToken', payload: { invalidToken: true } });
        window.location.replace('/login');
    };

    store.dispatch({
        type: 'setToaster', payload: {
            toaster: {
                message,
                duration: toastDuration ? toastDuration : 7000,
                showToast: true,
                toastHeader: title,
                toastColor: 'danger'
            }
        }
    });

    return error;
    // return Promise.reject({ ...error }); /* de esta forma salta el error Possible Unhandled Promise */
};

const successHandler = (response) => {
    // Handle responses
    return response;
};

axiosInstance.interceptors.request.use(
    request => requestHandler(request),
);
axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error),
);
