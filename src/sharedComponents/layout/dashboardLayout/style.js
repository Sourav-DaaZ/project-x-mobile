import styled from 'styled-components/native';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView, Image } from 'react-native';
import { View } from 'react-native-animatable';
import Button from '../../button';


export const DashboardOuterView = styled(SafeAreaView)`
    display: flex;
    flex: 1;
    flex-direction: column;
    z-index: 1;
`;

export const StyledFullImg = styled(Image)`
    width: 100%;
    height: ${(props) => props.theme.spacing.height * 20}px;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const LoginDescription = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashTitle = styled(Text)`
    font-size: ${(props) => props.theme.fonts.large}px;
    font-weight: ${(props) => props.theme.borderRedius.boldText};
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}
`;

export const ButtonWrapper = styled(View)`
    display: flex;
    flex-Direction: row;
    flex: 1;
    margin-horizontal: ${(props) => props.theme.spacing.width * 3}px;
    justify-content: space-between;
`;

export const UpdateButton = styled(Button)`
    width: ${(props) => props.full ? '100%' : '48%'};
    background-color: ${(props) => props.mode !== 'outlined' ? props.theme.colors[props.theme.baseColor].mainColor : props.theme.colors[props.theme.baseColor].backgroundColor};
    border-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    border-width: 1px;
    margin-top: ${(props) => props.theme.spacing.height}px;
    margin-bottom: ${(props) => props.theme.spacing.height * 8}px;
`;

export const CancelText = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-weight: ${(props) => props.theme.borderRedius.boldText};
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;