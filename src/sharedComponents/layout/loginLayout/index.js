import React, { useContext } from 'react';
import { StatusBar, View } from 'react-native';
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
    LoginDeviderText
} from './style';


const LoginLayout = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <LoginContainer>
            <StatusBar backgroundColor={colors.backgroundColor} barStyle="light-content" />
            <LoginSafeView>
                <LoginLogo
                    source={logoImg}
                />
                <LoginBack
                    name="arrow-back-ios"
                    size={25}
                    onPress={() => props.navigation.goBack()}
                />
            </LoginSafeView>
            <LoginScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {props.children}
            </LoginScrollView>
            <LoginDevider>
                <LoginDeviderLine />
                <View>
                    <LoginDeviderText>Or Connect Using</LoginDeviderText>
                </View>
                <LoginDeviderLine />
            </LoginDevider>
            <LoginNetworkView>
                <LoginNetworkLogo
                    name="facebook-square"
                    style={{ color: '#4267B2' }}
                    size={40} />
                <LoginNetworkLogo
                    name="google-plus-square"
                    style={{ color: '#db3236' }}
                    size={40} />
            </LoginNetworkView>
        </LoginContainer>
    )
};


export default LoginLayout;