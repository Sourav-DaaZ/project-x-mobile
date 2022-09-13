import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get('screen');


export const StyledHorizontalScrollView = styled(ScrollView)`
    
`;

export const StyledUserWrapper = styled(View)`
    margin-horizontal: ${width * .04}px;
`;

export const StyledViewButton = styled(View)`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;

export const StyledListView = styled(Animatable.View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;

export const StyledButtonView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.invert ? props.theme.colors[props.theme.baseColor].backgroundColor : props.theme.colors[props.theme.baseColor].mainByColor}; 
    fontWeight: 600;
    font-size: ${width * .04}px;
    line-height: ${width * .04}px;
    text-transform: uppercase;
`;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
    width: 50%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;
export const StyledButtonActive = styled(TouchableOpacity)`
    width: 34%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}; 
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: ${height * .07}px
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${height * .02}px;
`;

export const StyledCardIcon = styled(Ionicons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${width * .07}px;
`;

export const StyledBannerWrapper = styled(View)`
    display: flex;
    flex: 1
    
`;
