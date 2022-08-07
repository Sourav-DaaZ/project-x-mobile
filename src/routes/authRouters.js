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
import ApplicationChat from '../views/applicationChat';
import TagChat from '../views/tagChat';
import CreatePost from '../views/createPost';
import EditPost from '../views/editPost';
import MyPost from '../views/myPost';
import EditApplication from '../views/editApplication';
import ApplicationDetails from '../views/applicationDetails';
import CreateApplication from '../views/createApplication';
import CreateReview from '../views/createReview';
import EditReview from '../views/editReview';
import ApplicationList from '../views/applicationList';
import EditDetails from '../views/editDetails';
import Setting from '../views/setting';
import MyBooking from '../views/myBooking';
import MyReview from '../views/myReview';
import Camera from '../views/camera';
import TagList from '../views/tagList';
import Login from '../views/auth/login';
import Register from '../views/auth/register';
import AccessScreen from '../views/access';
import NotificationScreen from '../views/notification';

import Routes from '../constants/routeConst';

import { CustomTab, CustomHeader } from './custom';
import { BottomShadow } from '../sharedComponents/bottomShadow';
import AddTags from '../views/addTags';
import AddBooking from '../views/addBooking';
import EditTags from '../views/editTags';
import GlobalChat from '../views/globalChat';
import UserChat from '../views/userChat';
import MyTags from '../views/myTags';
import EditBooking from '../views/editBooking';

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
          lazy: true,
        }}
      >
        <Tab.Screen
          name={Routes.dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            header: () => (<CustomHeader
              left={<Image style={{ marginLeft: 10 }} source={logoImg} />}
            />),
            tabBarIcon: (color, size) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
          component={Dashboard} />
        <Tab.Screen
          name={Routes.category}
          options={{
            tabBarLabel: 'Category',
            header: () => (<BottomShadow>
              <CustomHeader
                logo={<Image style={{ marginLeft: 10 }} source={logoImg} />}
              />
            </BottomShadow>),
            tabBarIcon: (color, size) => (
              <Ionicons name="md-file-tray-stacked" color={color} size={size} />
            ),
          }}
          component={CategoryList} />
        <Tab.Screen
          name={Routes.tagList}
          options={{
            tabBarLabel: 'Tag List',
            header: () => (
              <CustomHeader
                logo={<Image style={{ marginLeft: 10 }} source={logoImg} />}
              />),
            tabBarIcon: (color, size) => (
              <Ionicons name="md-pricetags-outline" color={color} size={size} />
            ),
          }}
          component={TagList} />
        <Tab.Screen
          name={Routes.notification}
          options={{
            tabBarLabel: 'Notifications',
            header: () => (
              <BottomShadow>
                <CustomHeader
                  logo={<Image style={{ marginLeft: 10 }} source={logoImg} />}
                />
              </BottomShadow>),
            tabBarIcon: (color, size) => (
              <Ionicons name="notifications-outline" color={color} size={size} />
            ),
          }}
          component={NotificationScreen} />
        <Tab.Screen
          name={Routes.setting}
          options={{
            tabBarLabel: 'Setting',
            header: () => (
              <BottomShadow>
                <CustomHeader
                  logo={<Image style={{ marginLeft: 10 }} source={logoImg} />}
                />
              </BottomShadow>),
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
          headerShown: false,
        })} />
      <Stack.Screen
        name={Routes.access}
        component={AccessScreen}
        options={() => ({
          headerShown: false
        })} />
      <Stack.Screen
        name={Routes.search}
        component={SearchScreen}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
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
          headerShown: false
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createPost}
        component={CreatePost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editPost}
        component={EditPost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createApplication}
        component={CreateApplication}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.applicationDetails}
        component={ApplicationDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editApplication}
        component={EditApplication}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.applicationList}
        component={ApplicationList}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.myPost}
        component={MyPost}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.myTag}
        component={MyTags}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editDetails}
        component={EditDetails}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createReview}
        component={CreateReview}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editReview}
        component={EditReview}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.addTag}
        component={AddTags}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createBooking}
        component={AddBooking}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editBooking}
        component={EditBooking}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editTag}
        component={EditTags}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.myBooking}
        component={MyBooking}
        options={({ navigation }) => ({
          header: () =>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.myReview}
        component={MyReview}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.userChat}
        component={UserChat}
        options={({ navigation }) => ({
          headerShown: false
        })} /> : null}
      <Stack.Screen
        name={Routes.singleCategory}
        component={SingleCategory}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name={Routes.profile}
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} />
      <Stack.Screen
        name={Routes.appChat}
        component={ApplicationChat}
        options={({ navigation }) => ({
          headerShown: false
        })} />
      <Stack.Screen
        name={Routes.tagChat}
        component={TagChat}
        options={({ navigation }) => ({
          headerShown: false
        })} />
      <Stack.Screen
        name={Routes.globalChat}
        component={GlobalChat}
        options={({ navigation }) => ({
          headerShown: false
        })} />
      <Stack.Screen
        name={Routes.postDetails}
        component={PostDetails}
        options={({ navigation }) => ({
          header: () =>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
        })} />
    </Stack.Navigator>
  );
}


