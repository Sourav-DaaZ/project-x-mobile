import React, { useContext } from 'react';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import logoImg from '../../../assets/images/logo.png';
import { ThemeContext } from 'styled-components';
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
    statusCodes,
} from '@react-native-google-signin/google-signin';

import { Profile } from 'react-native-fbsdk-next';

const LoginLayout = (props) => {
    const themeContext = useContext(ThemeContext);
    const [visible, setVisible] = React.useState(true);
    const colors = themeContext.colors[themeContext.baseColor];

    const onPressGoogle = () => {
        GoogleSignin.configure({
            androidClientId: '1009154975780-lqus6fegc5ogv16ddrgk5fharjdkievn.apps.googleusercontent.com',
            // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                    console.warn(JSON.stringify(userInfo))
                }).catch((e) => {
                    console.warn("ERROR IS: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            console.warn("ERROR IS: " + JSON.stringify(e));
        })
    }

    const onPressFb = () => {
        Profile.getCurrentProfile().then(
            function (currentProfile) {
                if (currentProfile) {
                    console.warn(currentProfile);
                }
            }
        );
    }

    return (
        <LoginContainer>
            <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
            <LoginSafeView animation='lightSpeedIn'>
                <LoginBack onPress={() => props.navigation.goBack()}><StyledIonicons name='chevron-back' size={30} /></LoginBack>
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
                        size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressGoogle}>
                    <LoginNetworkLogo
                        name="google-plus-square"
                        style={{ color: '#db3236' }}
                        size={40} /></TouchableOpacity>
            </LoginNetworkView>
        </LoginContainer>
    )
};


export default LoginLayout;