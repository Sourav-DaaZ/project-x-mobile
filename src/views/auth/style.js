import styled from 'styled-components/native';
import { Dimensions,TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../sharedComponents/button'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;

export const SplashOuterView = styled(View)`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    height: 100%
`;

export const LoginOuterView = styled(ScrollView)`
    flex: 1;
    flex-direction: column;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 20px;
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const SplashLogo = styled(Image)`
    width: 120px;
    margin-bottom: ${height * .08}px;
`;

export const LoginSubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-bottom: 10px
`;

export const SplashBannerLogo = styled(Image)`
    width: ${width_logo}px;
    height: ${width_logo}px;
    margin-bottom: ${height * .08}px;
`;

export const StyledViewButton = styled(View)`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;

export const StyledForgot = styled(View)`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: ${height * .02}px;
`;

export const SplashTitle = styled(Text)`
    font-size: ${width * .1}px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}
`;

export const SplashDescription = styled(Text)`
    font-size: ${width * .05}px;
    font-weight: 600;
    text-align: center;
    margin-bottom: ${height * .1}px;
    margin-top: ${height * .03}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const LoginDescription = styled(Text)`
    font-size: ${width * .04}px;
    font-weight: 600;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const LoginButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${height * .01}px;
    min-height: ${height * .25}px;
    justify-content: center;
    width: 100%;
`;

export const StyledInputOtp = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${height * .02}px;
    width: 100%;
    padding: 20px;
    padding-top: 0px;
`;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
    width: 50%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;
export const StyledButtonActive = styled(Button)`
    width: 50%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}; 
    border-radius: 0px;
`;

export const StyledButtonView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}; 
    fontWeight: 600;
    font-size: 15px;
    text-transform: uppercase;
`;