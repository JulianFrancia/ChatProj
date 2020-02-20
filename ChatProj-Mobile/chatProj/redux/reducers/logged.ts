/* ARQUITECTURA BASE DE UN REDUCER */
//export const defaultState = 0;

// export default (state = defaultState, { type, payload }) => {
//     switch (type) {
//         default:
//             return state;
//     }
// }

export const defaultState = {
    userLogged: {
        isLogged: false,
        token: '',
        user: {},
        invalidToken: false,
    }
};

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case "setLogged":
            return {
                userLogged: {
                    isLogged: true,
                    token: action.payload.token,
                    user: action.payload.user
                }
            };
        case "logOut":
            return {
                userLogged: {
                    isLogged: false,
                    token: action.payload.token,
                    user: action.payload.user
                }
            };
        case "updateUser":
            return {
                userLogged: {
                    ...state.userLogged,
                    user: action.payload.user
                }
            };
        case "updateAvatar":
            return {
                userLogged: {
                    ...state.userLogged,
                    user: { ...state.userLogged.user, avatarUrl: action.payload.avatarUrl }
                }
            };
        case "invalidToken":
            return {
                userLogged: {
                    ...state.userLogged,
                    invalidToken: action.payload.invalidToken,
                }
            };

        default:
            return state
    };
}