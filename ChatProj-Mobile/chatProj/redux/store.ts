import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logged from './reducers/logged';
import theme from './reducers/theme';
import toaster from './reducers/toaster';
import { saveState, loadState } from './localStorage';

/* declaro la extensión con interfaz Window para poder utilizarla en el objeto window.*/
// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION__?: any;
//     }
// }

const reducer = combineReducers({
    logged,
    theme,
    toaster,
});

const initialData = loadState();

const store = createStore(reducer,
    initialData,
    composeWithDevTools(), /* para la extensión de chrome de Redux */
);

/* Otra manera de linkear la app a la extensión de chrome de Redux */
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/* para guardar TODO el estado de la aplicación: */
// store.subscribe(() => {
//     saveState(store.getState());
// });

/* para sólo guardar los reducers que queremos del local storage: */
store.subscribe(() => {
    saveState({
        logged: store.getState().logged,
        theme: store.getState().theme,
    });
});

/*************************/
/***** IMPORTANTE!!! ****/
/* NO exportar el store si se utiliza server-side-rendering, o todos los usuarios terminarán compartiendo el store */
export default store;