import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../views/home';
import Camera from '../views/camera';
import FileDecoder from '../views/fileDecoder';
import { CustomTab, CustomHeader } from './custom';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function InsideAuthRouters() {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];


  const TabComponent = (props) => {
    return (
      <Tab.Navigator
        tabBar={props => <CustomTab {...props} colors={colors} />}
        screenOptions={{
          headerShown: false,
          lazy: true,
        }}
      >
        <Tab.Screen
          name='HomeScreen'
          {...props}
          options={{
            tabBarLabel: 'HomeScreen',
            tabBarIcon: (color, size) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
          component={Home} />
        <Tab.Screen
          name='Camera'
          {...props}
          options={{
            tabBarLabel: 'Camera',
            tabBarIcon: (color, size) => (
              <Ionicons name="camera" color={color} size={size} />
            ),
          }}
          component={Camera} />
        <Tab.Screen
          name='FileDecoder'
          {...props}
          options={{
            tabBarLabel: 'FileDecoder',
            tabBarIcon: (color, size) => (
              <Foundation name="upload" color={color} size={size} />
            ),
          }}
          component={FileDecoder} />
      </Tab.Navigator >
    )
}


return (
  <Stack.Navigator >
    <Stack.Screen
      name="tab"
      options={{ headerShown: false }}
      component={TabComponent}
    />
  </Stack.Navigator>
);
}


