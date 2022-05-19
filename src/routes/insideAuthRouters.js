import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Text, Image, TouchableOpacity
} from 'react-native';
import logoImg from '../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Setting from '../views/setting';
import Camera from '../views/camera';
import { CustomHeader } from './custom';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function InsideAuthRouters() {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];

  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text>Login Page</Text>
          ),
          header: () => <CustomHeader
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text>Profile</Text>
          ),
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
    </Stack.Navigator>
  );
}


