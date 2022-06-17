import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  Avatar
} from 'react-native-paper';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledProfile, StyledLeftContainer, StyledModalView } from './style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InsideAuthApi from '../../services/inSideAuth';
import { SnackbarUpdate, loader, tokenUpdate } from '../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = (props) => {
  const dispatch = useDispatch();
  const detailsStore = useSelector((state) => state.details, shallowEqual);
  const authStore = useSelector((state) => state.auth, shallowEqual);


  const onLoginOut = () => {
    InsideAuthApi(authStore)
      .logout()
      .then(async (res) => {
        await AsyncStorage.removeItem('token');
        dispatch(tokenUpdate({
          access_token: '',
          refresh_token: ''
        }));
      })
      .catch(async (err) => {
        await AsyncStorage.removeItem('token');
        dispatch(tokenUpdate({
          access_token: '',
          refresh_token: ''
        }));
      });
  }

  return (
    <DashboardLayout>
      {authStore.access_token && authStore.access_token !== '' ? <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <StyledProfileView>
          <View>
            <StyledTitle>{detailsStore.name}</StyledTitle>
            <StyledParagraph>{detailsStore.userCat}</StyledParagraph>
          </View>
          <Avatar.Image
            source={{
              uri:
                detailsStore.images ? detailsStore.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
            }}
            size={70}
          />
        </StyledProfileView>
      </TouchableOpacity> : <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
        <StyledProfileView>
          <View>
            <StyledTitle>Login</StyledTitle>
            <StyledParagraph>Please login for see the details</StyledParagraph>
          </View>
          <Avatar.Image
            source={{
              uri:
                detailsStore.images ? detailsStore.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
            }}
            size={70}
          />
        </StyledProfileView>
      </TouchableOpacity>}
      <StyledProfileView style={{ justifyContent: 'space-around' }}>
        <StyledCenter>
          <Ionicons name='settings-outline' size={30} />
          <StyledParagraph>Settings</StyledParagraph>
        </StyledCenter>
        <StyledCenter>
          <Ionicons name='settings-outline' size={30} />
          <StyledParagraph></StyledParagraph>
        </StyledCenter>
      </StyledProfileView>
      <StyledProfile>
        <TouchableOpacity>
          <StyledLeftContainer>
            <Ionicons style={{ marginRight: 20 }} name='settings-outline' size={20} />
            <StyledSemiTitle>Setting</StyledSemiTitle>
          </StyledLeftContainer>
        </TouchableOpacity>
      </StyledProfile>
      {authStore.access_token && authStore.access_token !== '' ? <StyledProfile>
        <TouchableOpacity onPress={onLoginOut}>
          <StyledLeftContainer>
            <MaterialIcons style={{ marginRight: 20 }} name='logout' size={25} />
            <StyledSemiTitle>Logout</StyledSemiTitle>
          </StyledLeftContainer>
        </TouchableOpacity>
      </StyledProfile> : null}
    </DashboardLayout>
  )
}

export default Setting;