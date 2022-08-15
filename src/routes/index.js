import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { tokenUpdate } from '../store/actions';
import * as FCMNotificationHandler from "../services/google/firebase/FCMNotificationHandler";
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { handleDynamicLink } from '../services/google/deepLinkingHandler';
import SplashScreen from '../views/splashScreen';

const AuthenticationRoutes = React.lazy(() => import('./authRouters').then(module => ({ default: module.AuthRouters })));

function Routs(props) {
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();
  const navigationRef = useNavigationContainerRef()

  if (Platform.OS === "android") {
    FCMNotificationHandler.backgroundNotification();
    FCMNotificationHandler.requestUserPermission();
    FCMNotificationHandler.NotifinationListener(navigationRef);
  }

  const fetchCredentials = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('token') || "{}");
    dispatch(tokenUpdate({
      access_token: data.access_token,
      refresh_token: data.refresh_token
    }));
  }

  useEffect(() => {
    fetchCredentials();
    if (Platform.OS === "android") {
      dynamicLinks()
        .getInitialLink()
        .then(link => {
          console.log(link)
        });
    }
  }, [])

  useEffect(() => {
    if (Platform.OS === "android") {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
      // When the component is unmounted, remove the listener
      return () => unsubscribe();
    }
  }, []);


  return (
    <React.Suspense fallback={
      <SplashScreen />
    }>
      <NavigationContainer ref={navigationRef}>
        <AuthenticationRoutes {...props} islogin={authStore.access_token && authStore.access_token !== ''} />
      </NavigationContainer>
    </React.Suspense >
  );
}

export default Routs;