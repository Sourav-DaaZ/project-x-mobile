import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import {
  Text
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../views/auth/login'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function InsideAuthRouters() {

  const TabComponent = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen
          name="login"
          component={Login}
          options={() => ({
            headerTitle: () => (
              <Text>Login Page</Text>
            ),
            headerStyle: {
              backgroundColor: 'white',
              borderBottomWidth: 0,
              shadowOpacity: 0,
            },
            // headerLeft: () => (
            //   <BackBtn size={35} />
            // ),
          })} />
      </Stack.Navigator>
    )
  }

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, lazy: true }}
    >
      <Tab.Screen
        name='home'
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={TabComponent} />
    </Tab.Navigator >
  );
}


