/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import Routs from './routes';

import { Provider, useStore } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import GlobalThemeProvider from './contextProviders/globalThemeProvider';
import * as FCMNotificationHandler from "./services/Google/Firebase/FCMNotificationHandler";

import AuthReducer from './store/reducers/auth';
import DetailsReducer from './store/reducers/userDetails';

import messaging from '@react-native-firebase/messaging';

if (__DEV__) {
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'));
}

const rootReducer = combineReducers({
  auth: AuthReducer,
  details: DetailsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

if (Platform.OS === "android") {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  FCMNotificationHandler.requestUserPermission();
  FCMNotificationHandler.NotifinationListener();
}
const App = () => {

  return (
    <Provider store={store}>
      <GlobalThemeProvider>
        <PaperProvider>
          <Routs />
        </PaperProvider>
      </GlobalThemeProvider>
    </Provider>
  )
};

export default App;
