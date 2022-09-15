import styled from 'styled-components/native';
import { View, Image, ScrollView, ImageBackground } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import Button from '../../../sharedComponents/button';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';


export const StyledCard = styled(Animatable.View)`
    flex: 1;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledInlineContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    margin-top: -${(props) => props.theme.spacing.height * 2}px;
`;

export const StyledInlineLeft = styled(View)`
   width: 70%;
   padding-right: ${(props) => props.theme.spacing.width * 2}px;
`;
export const StyledInlineRight = styled(View)`
   width: 30%
`;

export const StyledCardCover = styled(Image)`
    height: ${(props) => props.theme.spacing.height * 30}px; 
    width: 100%;
    resizeMode: contain;
`;

export const StyledCardContent = styled(ScrollView)`
    margin-horizontal: ${(props) => props.theme.spacing.width * 4}px;
    margin-top: -${(props) => props.theme.spacing.height * 4}px;
    padding-top: ${(props) => props.theme.spacing.height * 2}px;
    padding-horizontal: ${(props) => props.theme.spacing.height * 1}px;
    border-top-right-radius: ${(props) => props.theme.borderRedius.small}px;
    border-top-left-radius: ${(props) => props.theme.borderRedius.small}px;
    flex: 1;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledCardAction = styled(View)`
    margin: ${(props) => props.theme.spacing.width * 4}px;
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    border-bottom-right-radius: ${(props) => props.theme.borderRedius.small}px;
    border-bottom-left-radius: ${(props) => props.theme.borderRedius.small}px;
    align-items: center;
    justify-content: space-between
    width: ${(props) => props.theme.spacing.width * 100 - props.theme.spacing.width * 8}px;
    padding-horizontal: ${(props) => props.theme.spacing.width * 4}px;
    padding-bottom: ${(props) => props.theme.spacing.height * 2}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledImageBackground = styled(ImageBackground)`
    
`;

export const StyledCardTitle = styled(Title)`
    font-size: ${(props) => props.theme.fonts.medium}px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-top: ${(props) => props.theme.spacing.height * 2}px;
    margin-bottom: 0px;
    margin-horizontal: ${(props) => props.theme.spacing.width * 4}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledCardParagraph = styled(Paragraph)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    margin-horizontal: ${(props) => props.theme.spacing.width * 4}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const StyledCardButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    width: 80%;
    margin-right: 1%;
`;

export const StyledCardIcon = styled(Ionicons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.large}px;
    margin-right: 2%;
`;

export const StyledDotIcon = styled(Entypo)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.large}px;
    margin-right: 4%
`;

