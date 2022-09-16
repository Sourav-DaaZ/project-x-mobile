import styled from 'styled-components/native';
import { Dimensions, ScrollView, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Button from '../../../sharedComponents/button';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(ScrollView)`
    padding: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 5}px;
    height: 100%;
`;

export const WrapperView = styled(Animatable.View)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 3}px;
    border-radius: ${(props) => props.theme.borderRedius.small}px;
`;

export const WrapperTagView = styled(View)`
    display: flex; 
    flex-direction: row; 
    flex-wrap: wrap;
    margin-vertical: ${(props) => props.theme.spacing.height}px
`;

export const StyledChip = styled(Chip)`
    margin-right: ${(props) => props.theme.spacing.width * 2}px;
    padding: ${(props) => props.theme.spacing.width * .3}px;
`;

export const LoginDescription = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    text-align: center;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashTitle = styled(Text)`
    font-size: ${(props) => props.theme.fonts.veryLarge}px;
    font-weight: ${(props) => props.theme.fontWeight.boldText};
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
    margin-bottom: ${(props) => props.theme.spacing.height * 7}px;
`;

export const CancelText = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-weight: ${(props) => props.theme.fontWeight.trueBold};
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;