export const defaultState = {
    toaster: {
        showToast: false,
        message: '',
        duration: 5000,
        toastColor: '',
        toastHeader: '',
    }
};

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case "setToaster":
            return {
                toaster:
                {
                    ...state.toaster,
                    ...action.payload.toaster
                }
            };
        case "resetToaster":
            return defaultState

        default:
            return state
    };
}