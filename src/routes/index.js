import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Loading from '../common/layout/loading'

const InsideAuthenticationRoutesNative =React.lazy( () => import('./InsideAuthenticationRoutes').then(module => ({ default: module.InsideAuthenticationRoutesNative})));
const InsideAuthenticationRoutes =React.lazy( () => import('./InsideAuthenticationRoutes').then(module => ({ default: module.InsideAuthenticationRoutes})));

function RootAuthenticationRoutes() {
  return (
    <React.Suspense fallback={
      <Loading/>
      }>
        <NavigationContainer>
            <InsideAuthenticationRoutes/>
        </NavigationContainer>
    </React.Suspense>
  );


}



export default RootAuthenticationRoutes;