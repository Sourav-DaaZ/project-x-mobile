import React, { useContext } from 'react';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import logoImg from '../../../assets/images/logo.png';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { snackbarUpdate, tokenUpdate } from '../../../store/actions';
import OutsideAuthApi from '../../../services/outSideAuth';
import {
    LoginContainer,
    LoginSafeView,
    LoginLogo,
    LoginBack,
    LoginScrollView,
    LoginNetworkView,
    LoginNetworkLogo,
    LoginDevider,
    LoginDeviderLine,
    LoginDeviderText,
    StyledIonicons
} from './style';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';

import { Profile, LoginManager } from 'react-native-fbsdk-next';
import SnackBar from '../../snackbar';
import defaultValue from '../../../constants/defaultValue';

const LoginLayout = (props) => {
    const themeContext = useContext(ThemeContext);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;

    const onPressGoogle = () => {
        GoogleSignin.configure({
            androidClientId: defaultValue[defaultValue.env].googleClientID,
            // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                    const dataVal = {
                        "googleId": userInfo.user.id,
                        "name": userInfo.user.givenName + " " + userInfo.user.familyName,
                        "email": userInfo.user.email,
                        "img": userInfo.user.photo
                    }
                    OutsideAuthApi()
                        .socialLoginApi(dataVal)
                        .then((res) => {
                            dispatch(tokenUpdate({
                                access_token: res.data.access_token,
                                refresh_token: res.data.refresh_token
                            }))
                        })
                        .catch((err) => {
                            dispatch(snackbarUpdate({
                                type: 'error',
                                msg: err?.message ? err.message : ''
                            }))
                        });
                }).catch((e) => {
                    console.warn("ERROR IS: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            console.warn("ERROR IS: " + JSON.stringify(e));
        })
    }

    const onPressFb = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    Profile.getCurrentProfile().then(
                        function (currentProfile) {
                            if (currentProfile) {
                                const dataVal = {
                                    "fbId": currentProfile.userID,
                                    "name": currentProfile.name,
                                    "img": currentProfile.imageURL
                                }
                                OutsideAuthApi()
                                    .socialLoginApi(dataVal)
                                    .then((res) => {
                                        dispatch(tokenUpdate({
                                            access_token: res.data.access_token,
                                            refresh_token: res.data.refresh_token
                                        }))
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }
                        }
                    ).catch(e => {
                        console.warn(e)
                    })
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    return (
        <LoginContainer>
            <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
            <SnackBar text={authStore.message.msg} type={authStore.message.type} />
            <LoginSafeView animation='lightSpeedIn'>
                <LoginBack onPress={() => props.navigation.goBack()}><StyledIonicons name='chevron-back' size={spacing.width * 10} /></LoginBack>
                <LoginLogo
                    source={logoImg}
                />
            </LoginSafeView>
            <LoginScrollView animation='flipInX'>
                {props.children}
            </LoginScrollView>
            <LoginDevider animation='bounceIn'>
                <LoginDeviderLine />
                <View>
                    <LoginDeviderText animation='bounceIn'>Or Connect Using</LoginDeviderText>
                </View>
                <LoginDeviderLine />
            </LoginDevider>
            <LoginNetworkView animation='flipInY'>
                <TouchableOpacity onPress={onPressFb}>
                    <LoginNetworkLogo
                        name="facebook-square"
                        style={{ color: '#4267B2' }}
                        size={spacing.width * 12} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressGoogle}>
                    <LoginNetworkLogo
                        name="google-plus-square"
                        style={{ color: '#db3236' }}
                        size={spacing.width * 12} /></TouchableOpacity>
            </LoginNetworkView>
        </LoginContainer>
    )
};


export default LoginLayout;