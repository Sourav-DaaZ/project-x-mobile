/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Routs from './routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import GlobalThemeProvider from './contextProviders/globalThemeProvider'

import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {

  return (
    <Provider store={store}>
      <GlobalThemeProvider>
        <Routs />
      </GlobalThemeProvider>
    </Provider>
  )
};

export default App;
