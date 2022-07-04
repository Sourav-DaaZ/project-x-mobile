import React, { useEffect, useState } from 'react';
import { Text, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, shallowEqual } from 'react-redux';
import SnackBar from '../sharedComponents/snackbar';
import Loader from '../sharedComponents/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { tokenUpdate } from '../store/actions';
import Modal from '../sharedComponents/modal';
import OutsideAuthApi from '../services/outSideAuth';
import { UpdateButton, UpdateTitle, UpdateDescription, UpdateWrapper, ButtonWrapper, CancelText } from './style';
import defaultValue from '../constants/defaultValue';
import * as FCMNotificationHandler from "../services/Google/Firebase/FCMNotificationHandler";

const AuthenticationRoutes = React.lazy( () => import( './authRouters' ).then( module => ( { default: module.AuthRouters } ) ) );

function Routs ( props )
{
  const [ show, setShow ] = useState( false );
  const [ updatePopup, setUpdatePopup ] = useState( null );
  const authStore = useSelector( ( state ) => state.auth, shallowEqual );
  const dispatch = useDispatch();


  const fetchCredentials = async () =>
  {
    const data = JSON.parse( await AsyncStorage.getItem( 'token' ) || "{}" );
    dispatch( tokenUpdate( {
      access_token: data.access_token,
      refresh_token: data.refresh_token
    } ) );
    OutsideAuthApi()
      .appConfigApi()
      .then( ( res ) =>
      {
        setUpdatePopup( res.data );
      } ).catch( ( x ) =>
      {
        console.log( x );
      } )
  }

  useEffect( () =>
  {
    fetchCredentials();
  }, [] )
  useEffect( () =>
  {
    if ( authStore.message.msg !== '' )
    {
      setShow( true );
    }
  }, [ authStore.message ] )
  useEffect( () =>
  {
    //FCM handle
    FCMNotificationHandler.requestUserPermission();
    FCMNotificationHandler.NotifinationListener();
  }, [] );
  return (
    <React.Suspense fallback={
      <Text>Loading</Text>
    }>
      <SnackBar show={ show } text={ authStore.message.msg } type={ authStore.message.type } onDismiss={ () => setShow( false ) } />
      <Loader show={ authStore.loading } />
      <NavigationContainer>
        <AuthenticationRoutes { ...props } islogin={ authStore.access_token && authStore.access_token !== '' } />
      </NavigationContainer>
      { updatePopup && defaultValue.appVersion[ Platform.OS ] < updatePopup.buildVersion[ Platform.OS ] ? <Modal show={ updatePopup && defaultValue.appVersion[ Platform.OS ] < updatePopup.buildVersion[ Platform.OS ] } onClose={ !( defaultValue.appVersion[ Platform.OS ] < updatePopup.minBuildVersion[ Platform.OS ] ) ? () => setUpdatePopup( null ) : null }>
        <UpdateWrapper>
          <UpdateTitle critical={ defaultValue.appVersion[ Platform.OS ] < updatePopup.minBuildVersion[ Platform.OS ] }>Update Alert!</UpdateTitle>
          <UpdateDescription mode="contained">{ updatePopup.updateDetails[ Platform.OS ] }</UpdateDescription>
          <ButtonWrapper>
            { !( defaultValue.appVersion[ Platform.OS ] < updatePopup.minBuildVersion[ Platform.OS ] ) ? <UpdateButton mode="outlined" textColor='#191B49'><CancelText>cancel</CancelText></UpdateButton> : null }
            <UpdateButton full={ defaultValue.appVersion[ Platform.OS ] < updatePopup.minBuildVersion[ Platform.OS ] } mode="contained">Update</UpdateButton>
          </ButtonWrapper>
        </UpdateWrapper>
      </Modal> : null
      }
    </React.Suspense >
  );
}

export default Routs;