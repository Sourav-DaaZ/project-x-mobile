import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext } from 'styled-components';
import saveMoneyImg from '../../assets/images/save_money.png';
import logoImg from '../../assets/images/logo.png';
import {
  SplashOuterView,
  SplashLogo,
  SplashBannerLogo,
  SplashTitle,
  SplashDescription,
  SplashButton
} from './style';

const SplashScreen = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  return (
    <SplashOuterView>
      <StatusBar backgroundColor={colors.backgroundColor} barStyle="dark-content" />
      <SplashLogo
        source={logoImg}
      />
      <SplashBannerLogo
        source={saveMoneyImg}
      />
      <SplashTitle>Stay connected!</SplashTitle>
      <SplashDescription>Best Solution to Connect people.</SplashDescription>
      <SplashButton mode='contained' circular onPress={() => props.navigation.navigate('login')}>
        Get Started
      </SplashButton>
    </SplashOuterView>
  );
};

export default SplashScreen;