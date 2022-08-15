import styled from 'styled-components/native';
import { Dimensions, ScrollView, Text } from 'react-native';
import { Platform } from 'react-native';
import { SafeAreaView, Image } from 'react-native';
import { View } from 'react-native-animatable';
import Button from '../../button';

const { width, height } = Dimensions.get('screen');

export const DashboardOuterView = styled(SafeAreaView)`
    display: flex;
    flex: 1;
    flex-direction: column;
    z-index: 1;
`;

export const StyledFullImg = styled(Image)`
    width: 100%;
    height: 150px;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const LoginDescription = styled(Text)`
    font-size: ${width * .038}px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashTitle = styled(Text)`
    font-size: ${width * .1}px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}
`;

export const ButtonWrapper = styled(View)`
    display: flex;
    flex-Direction: row;
    flex: 1;
    margin-horizontal: 20px;
    justify-content: space-between;
`;

export const UpdateButton = styled(Button)`
    width: ${(props) => props.full ? '100%' : '48%'};
    background-color: ${(props) => props.mode !== 'outlined' ? props.theme.colors[props.theme.baseColor].mainColor : props.theme.colors[props.theme.baseColor].backgroundColor};
    border-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    border-width: 1px;
    margin-top: 10px;
    margin-bottom: 60px;
`;

export const CancelText = styled(Text)`
    font-size: ${width * .038}px;
    font-weight: 700;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;