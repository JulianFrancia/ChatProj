import React from 'react';
import { Provider } from "react-redux";
import store from './redux/store';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import LoginScreen from './src/screens/login.screen';

export default function App() {
  return (
    <Provider store={store}>
      <LoginScreen></LoginScreen>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => App);