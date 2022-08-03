import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  Avatar
} from 'react-native-paper';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledProfile, StyledLeftContainer } from './style';
import { ThemeContext } from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InsideAuthApi from '../../services/inSideAuth';
import { detailsUpdate, tokenUpdate } from '../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from '../../constants/routeConst';
import { ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';
import Loader from '../../sharedComponents/loader';

const Setting = (props) => {
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const detailsStore = useSelector((state) => state.details, shallowEqual);
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const [data, setData] = useState({});
  const [showLoader, setShowLoader] = useState(true);


  const onLoginOut = () => {
    InsideAuthApi(authStore)
      .logout()
      .then(async (res) => {
        await AsyncStorage.removeItem('token');
        dispatch(detailsUpdate({
          id: '',
          name: '',
          gender: '',
          userCat: '',
          expectedCat: [],
        }))
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

  useEffect(() => {
    if (authStore.access_token !== '') {
      InsideAuthApi(authStore)
        .detailsApi()
        .then((res) => {
          setShowLoader(false);
          if (res.data && res.data.name && res.data.category && res.data.category_preference) {
            dispatch(detailsUpdate({
              id: res.data.user,
              name: res.data.name,
              gender: res.data.gender,
              userCat: res.data.category,
              expectedCat: res.data.category_preference,
            }))
            setData(res.data)
          } else {
            props.navigation.navigate(Routes.updateDetails, { logedin: false })
          }
        })
        .catch((err) => {
          setShowLoader(false);
          console.log(err)
        });
    } else {
      setShowLoader(false);
    }
  }, [])

  return (
    showLoader ? <Loader /> : <DashboardLayout {...props} showMsg={''}>
      <ShadowWrapperContainer>
        {authStore.access_token && authStore.access_token !== '' ? <TouchableOpacity onPress={() => props.navigation.navigate(Routes.profile, { id: detailsStore.id })}>
          <StyledProfileView>
            <View>
              <StyledTitle>{data?.name}</StyledTitle>
              <StyledParagraph>{data?.category?.category_name}</StyledParagraph>
            </View>
            <Avatar.Image
              source={{
                uri:
                  data?.images ? "data:image/png;base64," + data.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
              }}
              size={70}
            />
          </StyledProfileView>
        </TouchableOpacity> : <TouchableOpacity onPress={() => props.navigation.navigate(Routes.login)}>
          <StyledProfileView>
            <View>
              <StyledTitle>Login</StyledTitle>
              <StyledParagraph>Please login for see the details</StyledParagraph>
            </View>
            <Avatar.Image
              source={{
                uri:
                  data?.images ? "data:image/png;base64," + data.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
              }}
              size={70}
            />
          </StyledProfileView>
        </TouchableOpacity>}
        <StyledProfileView style={{ justifyContent: 'space-around' }}>
          <StyledCenter>
            <Ionicons style={{ color: colors.textLight }} name='settings-outline' size={30} />
            <StyledParagraph>Setting</StyledParagraph>
          </StyledCenter>
        </StyledProfileView>
        <StyledProfile>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.applicationList)}>
            <StyledLeftContainer>
              <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
              <StyledSemiTitle>My Applications</StyledSemiTitle>
            </StyledLeftContainer>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.myPost)}>
            <StyledLeftContainer>
              <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
              <StyledSemiTitle>My Posts</StyledSemiTitle>
            </StyledLeftContainer>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.myTag)}>
            <StyledLeftContainer>
              <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
              <StyledSemiTitle>My Tags</StyledSemiTitle>
            </StyledLeftContainer>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.updateDetails, { logedin: true, image: data?.images })}>
            <StyledLeftContainer>
              <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
              <StyledSemiTitle>Details Update</StyledSemiTitle>
            </StyledLeftContainer>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.myBooking, { logedin: true, image: data?.images })}>
            <StyledLeftContainer>
              <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
              <StyledSemiTitle>My Booking</StyledSemiTitle>
            </StyledLeftContainer>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.myReview, { logedin: true, image: data?.images })}>
            <StyledLeftContainer>
              <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
              <StyledSemiTitle>My Review</StyledSemiTitle>
            </StyledLeftContainer>
          </TouchableOpacity>
        </StyledProfile>
        {authStore.access_token && authStore.access_token !== '' ? <StyledProfile>
          <TouchableOpacity onPress={onLoginOut}>
            <StyledLeftContainer>
              <MaterialIcons style={{ marginRight: 10, color: colors.textLight }} name='logout' size={25} />
              <StyledSemiTitle>Logout</StyledSemiTitle>
            </StyledLeftContainer>
          </TouchableOpacity>
        </StyledProfile> : null}
      </ShadowWrapperContainer>
    </DashboardLayout>
  )
}

export default Setting;