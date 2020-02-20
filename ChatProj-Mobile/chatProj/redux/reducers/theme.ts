export const defaultState = {
    userTheme: {
        mode: null,
    }
};

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case "toggleThemeMode":
            let currentSettingSoDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return {
                userTheme: {
                    mode: !state.userTheme.mode ? (currentSettingSoDark ? 'light' : 'dark') : state.userTheme.mode === 'light' ? 'dark' : 'light',
                }
            };

        default:
            return state
    };
}