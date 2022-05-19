import * as React from 'react';
import {Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

const InsideAuthenticationRoutes =React.lazy( () => import('./insideAuthRouters').then(module => ({ default: module.InsideAuthRouters})));

function Routs(props) {
  return (
    <React.Suspense fallback={
      <Text>Loading</Text>
      }>
        <NavigationContainer>
            <InsideAuthenticationRoutes {...props}/>
        </NavigationContainer>
    </React.Suspense>
  );
}

export default Routs;