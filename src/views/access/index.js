import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext } from 'styled-components';
import logoImg from '../../assets/images/logo.png';
import {
  SplashOuterView,
  SplashLogo,
  SplashBannerLogo,
  SplashTitle,
  SplashDescription,
  SplashButton
} from './style';

const AccessScreen = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  return (
    <SplashOuterView>
      <StatusBar backgroundColor={colors.backgroundDeepColor} barStyle="dark-content" />
      <SplashLogo
        source={logoImg}
      />
      <SplashTitle>{props.route.params.type} Access ERROR!</SplashTitle>
      <SplashDescription>Please give your {props.route.params.type} access for better performance.</SplashDescription>
      <SplashButton mode='contained' circular onPress={() => props.navigation.goBack()}>
        Try Again
      </SplashButton>
    </SplashOuterView>
  );
};

export default AccessScreen;