import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';


import { createNativeStackNavigator}  from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../views/authPage/login';
import Register from '../views/authPage/register';

const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();

export function InsideAuthenticationRoutesNative() {
    return (
     
       <NavigationContainer>
              <NativeStack.Navigator >
                  <NativeStack.Screen 
                      name="login" 
                      component={Login} />
                  <NativeStack.Screen 
                      name="register" 
                      component={Register} />
              </NativeStack.Navigator>  
        </NavigationContainer>
    );
  
  
  }

  export function InsideAuthenticationRoutes() {
    return (
      
      <Stack.Navigator >
          <Stack.Screen 
              name="login" 
              component={Login} />
          <Stack.Screen 
              name="register" 
              component={Register} />
        </Stack.Navigator>  
    );
  
  
  }
  
  
  
