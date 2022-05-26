import { View, Image, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Animatable from 'react-native-animatable';

export const LoginContainer = styled(View)`
  flex: 1;
  backgroundColor: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}
`;

export const LoginSafeView = styled(SafeAreaView)`
  flex: .4;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
  border-radius: 0px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  position: relative;
`;

export const LoginLogo = styled(Image)`
  margin-top: -60px;
  width: 120px;
`;

export const LoginBack = styled(MaterialIcon)`
  position: absolute;
  left: 30px;
  top: 20%;
  color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const LoginNetworkLogo = styled(FontAwesome)`
  margin: 20px;
`;

export const LoginDevider = styled(Animatable.View)`
  flex-direction: row; 
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;

export const LoginDeviderLine = styled(Animatable.View)`
  flex: 1;
  height: 1px; 
  background-color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const LoginDeviderText = styled(Animatable.Text)`
  width: 150px; 
  text-align: center;
  color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
  font-weight: bold
`;

export const LoginScrollView = styled(Animatable.View)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 20px;
  margin-top: -60px;
  background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}
`;

export const LoginNetworkView = styled(Animatable.View)`
  flex: .2;
  background-color: white;
  border-radius: 20px;
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;