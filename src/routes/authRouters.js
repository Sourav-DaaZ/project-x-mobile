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
import SingleCategory from '../views/singleCategory';
import CategoryList from '../views/categoryList';
import UpdateDetails from '../views/updateDetails';
import SearchScreen from '../views/searchScreen';
import ProfileScreen from '../views/profileScreen';
import PostDetails from '../views/postDetails';
import ChatScreen from '../views/chatScreen';
import CreatePost from '../views/createPost';
import EditPost from '../views/editPost';
import MyPost from '../views/myPost';
import EditApplication from '../views/editApplication';
import ApplicationDetails from '../views/applicationDetails';
import CreateApplication from '../views/createApplication';
import CreateReview from '../views/createReview';
import ApplicationList from '../views/applicationList';
import EditDetails from '../views/editDetails';
import Setting from '../views/setting';
import Camera from '../views/camera';
import TagList from '../views/tagList';
import Login from '../views/auth/login';
import Register from '../views/auth/register';
import AccessScreen from '../views/access';

import { CustomTab, CustomHeader } from './custom';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function AuthRouters(props) {
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
          name='TagList'
          options={{
            tabBarLabel: 'TagList',
            tabBarIcon: (color, size) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
          component={TagList} />
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
          header: () => <CustomHeader
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name="Access"
        component={AccessScreen}
        options={() => ({
          headerShown: false
        })} />
      {!props.islogin ? <Stack.Screen
        name="login"
        component={Login}
        options={() => ({
          headerShown: false
        })} /> : null}
      {!props.islogin ? <Stack.Screen
        name="register"
        component={Register}
        options={() => ({
          headerShown: false
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="UpdateDetails"
        component={UpdateDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            // left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="CreateApplication"
        component={CreateApplication}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="ApplicationDetails"
        component={ApplicationDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="EditApplication"
        component={EditApplication}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="ApplicationList"
        component={ApplicationList}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="MyPost"
        component={MyPost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="EditDetails"
        component={EditDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name="CreateReview"
        component={CreateReview}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      <Stack.Screen
        name="SingleCategory"
        component={SingleCategory}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name="Posts"
        component={PostDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
    </Stack.Navigator>
  );
}


