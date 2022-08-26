import styled from 'styled-components/native';
import { Dimensions, ScrollView, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Button from '../../../sharedComponents/button';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(ScrollView)`
    padding: 20px;
    height: 100%;
`;

export const WrapperView = styled(Animatable.View)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
`;


export const StyledChip = styled(Chip)`
    margin-right: 20px;
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