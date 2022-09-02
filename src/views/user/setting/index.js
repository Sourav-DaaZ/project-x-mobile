import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Avatar
} from 'react-native-paper';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledCenter, StyledSemiTitle, StyledProfile, StyledLeftContainer, WrapperContainer } from './style';
import { ThemeContext } from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InsideAuthApi from '../../../services/inSideAuth';
import { detailsUpdate, tokenUpdate } from '../../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from '../../../constants/routeConst';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Loader from '../../../sharedComponents/loader';
import { useIsFocused } from '@react-navigation/native';
import { openUrl } from '../../../utils';

const Setting = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const detailsStore = useSelector((state) => state.details, shallowEqual);
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const [data, setData] = useState({});
  const [showLoader, setShowLoader] = useState(false);


  const onLoginOut = () => {
    InsideAuthApi()
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

  useEffect(() => {
    if (authStore.access_token !== '' && isFocused) {
      setShowLoader(true);
      InsideAuthApi()
        .detailsApi()
        .then((res) => {
          setShowLoader(false);
          const varData = {
            id: res.data.user ? res.data.user : '',
            name: res.data.name ? res.data.name : '',
            gender: res.data.gender ? res.data.gender : '',
            age: res.data.age ? res.data.age : 0,
            userCat: res.data.category ? res.data.category : '',
            expectedCat: res.data.categoryPreference ? res.data.categoryPreference : [],
          }
          dispatch(detailsUpdate(varData));
          setData(res.data);
          AsyncStorage.setItem('userData', JSON.stringify(varData));
        })
        .catch((err) => {
          setShowLoader(false);
        });
    }
  }, [isFocused])

  return (
    <DashboardLayout {...props} blockDetails>
      {showLoader ? <Loader /> : <ShadowWrapperContainer noSnack>
        <WrapperContainer>
          {authStore.access_token && authStore.access_token !== '' ? <TouchableOpacity onPress={() => props.navigation.navigate(Routes.profile, { id: detailsStore.id })}>
            <StyledProfileView>
              <View>
                <StyledTitle>{data?.name}</StyledTitle>
                <StyledParagraph>{data?.category?.category_name}</StyledParagraph>
              </View>
              <Avatar.Image
                source={{
                  uri:
                    data?.images ? data.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
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
                    data?.images ? data.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
                }}
                size={70}
              />
            </StyledProfileView>
          </TouchableOpacity>}
          {authStore.access_token && authStore.access_token !== '' ? <StyledProfileView style={{ justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => openUrl(data?.user_socials?.fb_link ? data.user_socials.fb_link : '')}>
              <StyledCenter>
                <FontAwesome style={{ color: colors.mainColor }} name='facebook-square' size={30} />
              </StyledCenter>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl(data?.user_socials?.insta_link ? data.user_socials.insta_link : '')}>
              <StyledCenter>
                <FontAwesome style={{ color: colors.mainColor }} name='instagram' size={30} />
              </StyledCenter>
            </TouchableOpacity>
          </StyledProfileView> : null}
          {authStore.access_token && authStore.access_token !== '' ? <StyledProfile>
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
            <TouchableOpacity onPress={() => props.navigation.navigate(Routes.updateDetails, { data: data })}>
              <StyledLeftContainer>
                <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
                <StyledSemiTitle>Details Update</StyledSemiTitle>
              </StyledLeftContainer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate(Routes.myBooking)}>
              <StyledLeftContainer>
                <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
                <StyledSemiTitle>My Booking</StyledSemiTitle>
              </StyledLeftContainer>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate(Routes.myReview)}>
              <StyledLeftContainer>
                <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
                <StyledSemiTitle>My Review</StyledSemiTitle>
              </StyledLeftContainer>
            </TouchableOpacity>
            {data.type === 'admin' ? <TouchableOpacity onPress={() => props.navigation.navigate(Routes.adminCategoryList)}>
              <StyledLeftContainer>
                <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
                <StyledSemiTitle>Admin Category List</StyledSemiTitle>
              </StyledLeftContainer>
            </TouchableOpacity> : null}
            {data.type === 'admin' ? <TouchableOpacity onPress={() => props.navigation.navigate(Routes.adminBannerList)}>
              <StyledLeftContainer>
                <Ionicons style={{ marginRight: 10, color: colors.textLight }} name='settings-outline' size={20} />
                <StyledSemiTitle>Admin Banner List</StyledSemiTitle>
              </StyledLeftContainer>
            </TouchableOpacity> : null}
          </StyledProfile> : null}
          {authStore.access_token && authStore.access_token !== '' ? <StyledProfile>
            <TouchableOpacity onPress={onLoginOut}>
              <StyledLeftContainer>
                <MaterialIcons style={{ marginRight: 10, color: colors.textLight }} name='logout' size={25} />
                <StyledSemiTitle>Logout</StyledSemiTitle>
              </StyledLeftContainer>
            </TouchableOpacity>
          </StyledProfile> : null}
        </WrapperContainer>
      </ShadowWrapperContainer>}
    </DashboardLayout>
  )
}

export default Setting;