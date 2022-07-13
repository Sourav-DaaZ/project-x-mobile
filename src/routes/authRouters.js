import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Image
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
import NotificationScreen from '../views/notification';

import Routes from '../constants/routeConst';

import { CustomTab, CustomHeader } from './custom';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function AuthRouters(props) {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
console.log(props);
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
          name={Routes.dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: (color, size) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
          component={Dashboard} />
        <Tab.Screen
          name={Routes.category}
          options={{
            tabBarLabel: 'Category',
            tabBarIcon: (color, size) => (
              <Ionicons name="md-file-tray-stacked" color={color} size={size} />
            ),
          }}
          component={CategoryList} />
        <Tab.Screen
          name={Routes.search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: (color, size) => (
              <Ionicons name="md-search" color={color} size={size} />
            ),
          }}
          component={SearchScreen} />
        <Tab.Screen
          name={Routes.notification}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: (color, size) => (
              <Ionicons name="notifications-outline" color={color} size={size} />
            ),
          }}
          component={NotificationScreen} />
        <Tab.Screen
          name={Routes.setting}
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
        name={Routes.home}
        component={TabComponent}
        options={() => ({
          header: () => <CustomHeader
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name={Routes.access}
        component={AccessScreen}
        options={() => ({
          headerShown: false
        })} />
      {!props.islogin ? <Stack.Screen
        name={Routes.login}
        component={Login}
        options={() => ({
          headerShown: false
        })} /> : null}
      {!props.islogin ? <Stack.Screen
        name={Routes.register}
        component={Register}
        options={() => ({
          headerShown: false
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.updateDetails}
        component={UpdateDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            // left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createPost}
        component={CreatePost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editPost}
        component={EditPost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createApplication}
        component={CreateApplication}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.applicationDetails}
        component={ApplicationDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editApplication}
        component={EditApplication}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.applicationList}
        component={ApplicationList}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.myPost}
        component={MyPost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editDetails}
        component={EditDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createReview}
        component={CreateReview}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      <Stack.Screen
        name={Routes.singleCategory}
        component={SingleCategory}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name={Routes.profile}
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name={Routes.appChat}
        component={ChatScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.mainColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name={Routes.postDetails}
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


