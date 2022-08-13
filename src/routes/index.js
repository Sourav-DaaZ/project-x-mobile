import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { tokenUpdate } from '../store/actions';
import Modal from '../sharedComponents/modal';
import OutsideAuthApi from '../services/outSideAuth';
import { UpdateButton, UpdateTitle, UpdateDescription, UpdateWrapper, ButtonWrapper, CancelText } from './style';
import defaultValue from '../constants/defaultValue';
import * as FCMNotificationHandler from "../services/google/firebase/FCMNotificationHandler";
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { handleDynamicLink } from '../services/google/deepLinkingHandler';
import SplashScreen from '../views/splashScreen';

const AuthenticationRoutes = React.lazy(() => import('./authRouters').then(module => ({ default: module.AuthRouters })));

function Routs(props) {
  const [updatePopup, setUpdatePopup] = useState(null);
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
    OutsideAuthApi()
      .appConfigApi()
      .then((res) => {
        setUpdatePopup(res.data);
      }).catch((x) => {
        console.log(x);
      })
  }

  useEffect(() => {
    fetchCredentials();
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log(link)
      });
  }, [])

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);


  return (
    <React.Suspense fallback={
      <SplashScreen />
    }>
      {updatePopup !== null ? <NavigationContainer ref={
        navigationRef
      }>
        <AuthenticationRoutes {...props} islogin={authStore.access_token && authStore.access_token !== ''} />
      </NavigationContainer> : null}
      {updatePopup && defaultValue.appVersion[Platform.OS] < updatePopup.buildVersion[Platform.OS] ? <Modal show={updatePopup && defaultValue.appVersion[Platform.OS] < updatePopup.buildVersion[Platform.OS]} onClose={!(defaultValue.appVersion[Platform.OS] < updatePopup.minBuildVersion[Platform.OS]) ? () => setUpdatePopup(null) : null}>
        <UpdateWrapper>
          <UpdateTitle critical={defaultValue.appVersion[Platform.OS] < updatePopup.minBuildVersion[Platform.OS]}>Update Alert!</UpdateTitle>
          <UpdateDescription mode="contained">{updatePopup.updateDetails[Platform.OS]}</UpdateDescription>
          <ButtonWrapper>
            {!(defaultValue.appVersion[Platform.OS] < updatePopup.minBuildVersion[Platform.OS]) ? <UpdateButton mode="outlined" textColor='#191B49'><CancelText>cancel</CancelText></UpdateButton> : null}
            <UpdateButton full={defaultValue.appVersion[Platform.OS] < updatePopup.minBuildVersion[Platform.OS]} mode="contained">Update</UpdateButton>
          </ButtonWrapper>
        </UpdateWrapper>
      </Modal> : null
      }
    </React.Suspense >
  );
}

export default Routs;