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
import Store from './store';
import { Provider as PaperProvider } from 'react-native-paper';
import GlobalThemeProvider from './contextProviders/globalThemeProvider';

if (__DEV__) {
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {

  return (
    <Provider store={Store}>
      <GlobalThemeProvider>
        <PaperProvider>
          <Routs />
        </PaperProvider>
      </GlobalThemeProvider>
    </Provider>
  )
};

export default App;
