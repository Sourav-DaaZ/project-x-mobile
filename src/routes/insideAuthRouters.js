import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Text, Image, TouchableOpacity
} from 'react-native';
import logoImg from '../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../views/dashboard';
import SinglePost from '../views/singlePost';
import CategoryList from '../views/categoryList';
import SearchScreen from '../views/searchScreen';
import ProfileScreen from '../views/profileScreen';
import DetailsScreen from '../views/detailsScreen';
import ChatScreen from '../views/chatScreen';
import Setting from '../views/setting';
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
          name='Dashboard'
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: (color, size) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
          component={Dashboard} />
        <Tab.Screen
          name='Category'
          options={{
            tabBarLabel: 'Category',
            tabBarIcon: (color, size) => (
              <Ionicons name="md-file-tray-stacked" color={color} size={size} />
            ),
          }}
          component={CategoryList} />
        <Tab.Screen
          name='Search'
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: (color, size) => (
              <Ionicons name="md-search" color={color} size={size} />
            ),
          }}
          component={SearchScreen} />
        <Tab.Screen
          name='Posts'
          options={{
            tabBarLabel: 'Posts',
            tabBarIcon: (color, size) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
          component={DetailsScreen} />
        <Tab.Screen
          name='Setting'
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: (color, size) => (
              <Fontisto name="player-settings" color={color} size={size} />
            ),
          }}
          component={Setting} />
      </Tab.Navigator >
    )
  }


  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        component={TabComponent}
        options={() => ({
          headerTitle: () => (
            <Text>Login Page</Text>
          ),
          header: () => <CustomHeader
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name="SinglePost"
        component={SinglePost}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text>Login Page</Text>
          ),
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text>Profile</Text>
          ),
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
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


