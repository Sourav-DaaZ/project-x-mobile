import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Text, Image, TouchableOpacity
} from 'react-native';
import logoImg from '../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../views/dashboard';
import {CustomTab, CustomHeader} from './custom';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function InsideAuthRouters() {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const TabComponent = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen
          name="login"
          component={Dashboard}
          options={() => ({
            headerTitle: () => (
              <Text>Login Page</Text>
            ),
            header: () => <CustomHeader 
              left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} />}
              logo={<Image source={logoImg} />}
              right={<Ionicons name="ios-chatbox-ellipses-outline" color={colors.mainColor} size={25} />}
            />,
            // headerLeft: () => (
            //   <BackBtn size={35} />
            // ),
          })} />
      </Stack.Navigator>
    )
  }

  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} colors={colors} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
    >
      <Tab.Screen
        name='home'
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (color, size) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
        component={TabComponent} />
    </Tab.Navigator >
  );
}


