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
import Routes from '../constants/routeConst';
import { CustomTab, CustomHeader } from './custom';
import { BottomShadow } from '../sharedComponents/bottomShadow';

const Dashboard = React.lazy(() => import('../views/dashboard'));
const SingleCategory = React.lazy(() => import('../views/category/singleCategory'));
const CategoryList = React.lazy(() => import('../views/category/categoryList'));
const UpdateDetails = React.lazy(() => import('../views/user/updateDetails'));
const SearchScreen = React.lazy(() => import('../views/searchScreen'));
const ProfileScreen = React.lazy(() => import('../views/user/profileScreen'));
const PostDetails = React.lazy(() => import('../views/posts/postDetails'));
const ApplicationChat = React.lazy(() => import('../views/application/applicationChat'));
const TagChat = React.lazy(() => import('../views/tags/tagChat'));
const CreatePost = React.lazy(() => import('../views/posts/createPost'));
const EditPost = React.lazy(() => import('../views/posts/editPost'));
const MyPost = React.lazy(() => import('../views/posts/myPost'));
const EditApplication = React.lazy(() => import('../views/application/editApplication'));
const ApplicationDetails = React.lazy(() => import('../views/application/applicationDetails'));
const CreateApplication = React.lazy(() => import('../views/application/createApplication'));
const CreateReview = React.lazy(() => import('../views/review/createReview'));
const EditReview = React.lazy(() => import('../views/review/editReview'));
const ApplicationList = React.lazy(() => import('../views/application/applicationList'));
const Setting = React.lazy(() => import('../views/user/setting'));
const MyBooking = React.lazy(() => import('../views/booking/myBooking'));
const MyReview = React.lazy(() => import('../views/review/myReview'));
const ChatScreen = React.lazy(() => import('../views/chats/chatScreen'));
const Camera = React.lazy(() => import('../views/camera'));
const TagList = React.lazy(() => import('../views/tags/tagList'));
const Login = React.lazy(() => import('../views/auth/login'));
const ForgotPassword = React.lazy(() => import('../views/auth/forgotPassword'));
const Register = React.lazy(() => import('../views/auth/register'));
const AccessScreen = React.lazy(() => import('../views/access'));
const NotificationScreen = React.lazy(() => import('../views/notification'));

const AddTags = React.lazy(() => import('../views/tags/addTags'));
const AddBooking = React.lazy(() => import('../views/booking/addBooking'));
const EditTags = React.lazy(() => import('../views/tags/editTags'));
const GlobalChat = React.lazy(() => import('../views/chats/globalChat'));
const UserChat = React.lazy(() => import('../views/chats/userChat'));
const MyTags = React.lazy(() => import('../views/tags/myTags'));
const EditBooking = React.lazy(() => import('../views/booking/editBooking'));
const AdminBannerList = React.lazy(() => import('../views/admin/adminBannerList'));
const AdminUpdateBanner = React.lazy(() => import('../views/admin/adminUpdateBanner'));
const AdminCategoryList = React.lazy(() => import('../views/admin/adminCategoryList'));
const AdminUpdateCategory = React.lazy(() => import('../views/admin/adminUpdateCategory'));

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthRouters = (props) => {
  const themeContext = useContext(ThemeContext);
  const spacing = themeContext.spacing;
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
            headerShown: false,
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
                logo={<Image source={logoImg} />}
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
                logo={<Image source={logoImg} />}
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
                  logo={<Image source={logoImg} />}
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
                  logo={<Image source={logoImg} />}
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
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} />
      <Stack.Screen
        name={Routes.forgotPassword}
        component={ForgotPassword}
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
        name={Routes.adminBannerList}
        component={AdminBannerList}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.adminBannerUpdate}
        component={AdminUpdateBanner}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.adminCategoryList}
        component={AdminCategoryList}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.adminCategoryUpdate}
        component={AdminUpdateCategory}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.updateDetails}
        component={UpdateDetails}
        options={({ navigation }) => ({
          header: () =>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createPost}
        component={CreatePost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editPost}
        component={EditPost}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createApplication}
        component={CreateApplication}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.applicationDetails}
        component={ApplicationDetails}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editApplication}
        component={EditApplication}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.applicationList}
        component={ApplicationList}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
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
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
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
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.createReview}
        component={CreateReview}
        options={({ navigation }) => ({
          header: () =>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.editReview}
        component={EditReview}
        options={({ navigation }) => ({
          header: () =>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.addTag}
        component={AddTags}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
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
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
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
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
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
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
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
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
        })} /> : null}
      {props.islogin ? <Stack.Screen
        name={Routes.myReview}
        component={MyReview}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
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
      {props.islogin ? <Stack.Screen
        name={Routes.chatList}
        component={ChatScreen}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
          </BottomShadow>
        })} /> : null}
      <Stack.Screen
        name={Routes.singleCategory}
        component={SingleCategory}
        options={({ navigation }) => ({
          header: () => <CustomHeader
            left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
            logo={<Image source={logoImg} />}
          />
        })} />
      <Stack.Screen
        name={Routes.profile}
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: () => <BottomShadow>
            <CustomHeader
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
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
              left={<Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 8} onPress={() => navigation.goBack()} />}
              logo={<Image source={logoImg} />}
            />
        })} />
    </Stack.Navigator>
  );
}

export default AuthRouters;