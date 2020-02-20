export const type = 'setLogged';

const setLogged = (data: any) => {
    return {
        type,
        payload: { token: data.token, user: data.user }
    };
};
export default setLogged;