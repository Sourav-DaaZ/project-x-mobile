import React, { useEffect } from 'react';
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { tokenUpdate } from '../store/actions';
import * as FCMNotificationHandler from "../services/google/firebase/FCMNotificationHandler";
import SplashScreen from '../views/splashScreen';
import AuthRouters from './authRouters';
import Loader from '../sharedComponents/loader';

function Routs(props) {
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  if (Platform.OS === "android") {
    FCMNotificationHandler.backgroundNotification();
    FCMNotificationHandler.requestUserPermission();
  }

  const fetchCredentials = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('token') || "{}");
    dispatch(tokenUpdate({
      access_token: data.access_token ? data.access_token : '',
      refresh_token: data.refresh_token ? data.refresh_token : ''
    }));
  }

  useEffect(() => {
    fetchCredentials();
  }, [])

  return (
    <React.Suspense fallback={
      <SplashScreen />
    }>
      <NavigationContainer>
        {authStore.access_token !== null && (authStore.firebase_token !== null || Platform.OS === 'ios') ? <AuthRouters {...props} islogin={authStore.access_token && authStore.access_token !== ''} /> : <Loader />}
      </NavigationContainer>
    </React.Suspense >
  );
}

export default Routs;