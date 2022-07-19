import styled from 'styled-components/native';
import { Dimensions, View, Image, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Button from '../../sharedComponents/button';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledCard = styled(Animatable.View)`
    flex: 1;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledInlineContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5px;
`;

export const StyledInlineLeft = styled(View)`
   width: 70%;
   padding-right: 10px
`;
export const StyledInlineRight = styled(View)`
   width: 30%
`;

export const StyledCardCover = styled(Image)`
    height: ${height * .35}px; 
    width: 100%;
    resizeMode: contain;
    z-index: -1;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].borderDeep};
`;

export const StyledCardContent = styled(ScrollView)`
    margin-horizontal: 10px;
    padding-horizontal: 10px;
    margin-top: -30px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    flex: 1;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledCardAction = styled(View)`
    margin: 10px;
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    align-items: center;
    justify-content: space-between
    width: ${width - 20}px;
    padding-horizontal: 10px;
    padding-bottom: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledCardTitle = styled(Title)`
    font-size: ${width * .045}px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 0px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledCardParagraph = styled(Paragraph)`
    font-size: ${width * .04}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const StyledCardButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    width: 80%;
    margin-right: 2%;
`;

export const StyledCardIcon = styled(Ionicons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${width * .07}px;
    margin-right: 2%;
`;

export const StyledDotIcon = styled(Entypo)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${width * .07}px;
    margin-right: 4%
`;

