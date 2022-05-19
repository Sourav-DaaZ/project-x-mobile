import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import Fontisto from 'react-native-vector-icons/Fontisto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../views/home';
import Camera from '../views/camera';
import { CustomTab, CustomHeader } from './custom';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function InsideAuthRouters() {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];


  const TabComponent = () => {
    return (
      <Tab.Navigator
        tabBar={props => <CustomTab {...props} colors={colors} />}
        screenOptions={{
          headerShown: false,
          lazy: true,
        }}
      >
        <Tab.Screen
          name='Home'
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: (color, size) => (
              <Fontisto name="player-settings" color={color} size={size} />
            ),
          }}
          component={Home} />
        <Tab.Screen
          name='Camera'
          options={{
            tabBarLabel: 'Camera',
            tabBarIcon: (color, size) => (
              <Fontisto name="player-settings" color={color} size={size} />
            ),
          }}
          component={Camera} />
      </Tab.Navigator >
    )
  }


  return (
    <Stack.Navigator >
      <Stack.Screen
        name="tab"
        options={{headerShown: false}}
        component={TabComponent}
     />
    
    </Stack.Navigator>
  );
}


