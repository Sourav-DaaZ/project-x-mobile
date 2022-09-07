import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Button from '../../sharedComponents/button';

import Ionicons from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('screen');


export const StyledCard = styled(Card)`
    margin-horizontal: ${width * .06}px;
    margin-top: -${height * .02}px;
    margin-bottom: ${height * .02}px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledCardCover = styled(Card.Cover)`
    height: ${height * .18}px; 
    width: ${width - (width * .08)}px;
    margin-left: ${width * .04}px;
    border-radius: 10px;
`;

export const StyledCardContent = styled(Card.Content)`
    margin: ${height * .01}px ${width * .01}px;
    margin-top: 0px;
    border-radius: 10px;
`;

export const StyledCardAction = styled(Card.Actions)`
    margin-left: ${width * .02}px;
    margin-right: ${width * .01}px;
    margin-bottom: ${height * .01}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const StyledCardTitle = styled(Title)`
    font-size: ${width * .05}px;
    font-weight: 600;
    margin-top: ${height * .01}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledCardParagraph = styled(Paragraph)`
    font-size: ${width * .04}px;
    margin-bottom: 0px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const StyledCardButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    width: ${width * .65}px;
    padding: ${height * .005}px ${width * .2}px;
    margin-right: ${width * .03}px;
`;

export const StyledView = styled(TouchableOpacity)`
    width: ${width * .15}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;