import React, { useContext } from 'react';
import { View, StatusBar, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import { ThemeContext } from 'styled-components';
import Input from '../../sharedComponents/input';
import {
  LoginOuterView,
  SplashTitle,
  LoginDescription,
  LoginSubmitButton,
  InputView
} from './style';

const Login = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];

  return (
    <LoginLayout {...props}>
      <LoginOuterView>
        <StatusBar backgroundColor={colors.backgroundColor} barStyle="dark-content" />
        <SplashTitle>Login!</SplashTitle>
        <LoginDescription>Best Solution to Connect people.</LoginDescription>
        <InputView>
          <Text>Email</Text>
          <Input
            placeholder={'hii'}
            onInputChange={() => console.log('hii')}
            // onSubmit={() => Keyboard.dismiss()}
            value={'hii'}
            type={'input'}
            isValid={true}
            validation={false}
            icons={''}
            ele={'input'}
          />
          <Text>password</Text>
          <Input
            placeholder={'hii'}
            onInputChange={() => console.log('hii')}
            // onSubmit={() => Keyboard.dismiss()}
            value={'hii'}
            type={'input'}
            isValid={true}
            validation={false}
            icons={''}
            ele={'input'}
          />
        </InputView>
        <LoginSubmitButton mode='contained' onPress={() => console.log('Pressed')}>
          Login
        </LoginSubmitButton>
        <LoginDescription>Don't have any account? <LoginDescription style={{fontWeight: 'bold'}}>Sign-up</LoginDescription></LoginDescription>
      </LoginOuterView>
    </LoginLayout>
  );
};

export default Login;