import * as React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import SplashScreen from '../views/auth/splashScreen';
import Login from '../views/auth/login';
import Register from '../views/auth/register';

const Stack = createNativeStackNavigator();

export function OutsideAuthRouters() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splashScreen"
        component={SplashScreen}
        options={() => ({
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
            shadowOpacity: 0,
          }
        })} />
      <Stack.Screen
        name="login"
        component={Login}
        options={() => ({
          headerShown: false
        })} />
      <Stack.Screen
        name="register"
        component={Register}
        options={() => ({
          headerShown: false
        })} />
    </Stack.Navigator>
  );
}


