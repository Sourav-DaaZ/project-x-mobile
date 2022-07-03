/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Routs from './routes';

import { Provider, useStore } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider as PaperProvider } from 'react-native-paper';
import GlobalThemeProvider from './contextProviders/globalThemeProvider';

import AuthReducer from './store/reducers/auth';
import DetailsReducer from './store/reducers/userDetails';

import messaging from '@react-native-firebase/messaging';

if ( __DEV__ )
{
  import( './reactotronConfig' ).then( () => console.log( 'Reactotron Configured' ) );
}

const rootReducer = combineReducers( {
  auth: AuthReducer,
  details: DetailsReducer,
} );

const store = createStore( rootReducer, applyMiddleware( thunk ) );

messaging().setBackgroundMessageHandler( async remoteMessage =>
{
  console.log( 'Message handled in the background!', remoteMessage );
} );

const App = () =>
{
  return (
    <Provider store={ store }>
      <GlobalThemeProvider>
        <PaperProvider>
          <Routs />
        </PaperProvider>
      </GlobalThemeProvider>
    </Provider>
  )
};

export default App;
