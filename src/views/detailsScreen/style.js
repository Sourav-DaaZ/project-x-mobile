import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Button from '../../sharedComponents/button';

import Ionicons from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledCard = styled(Card)`
    display: flex;
    flex: 1;
    width: ${width}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledCardCover = styled(Card.Cover)`
    height: ${height * .40}px; 
    width: ${width}px;
`;

export const StyledCardContent = styled(Card.Content)`
    margin: 5px;
    margin-top: 0px;
    border-radius: 10px;
    margin-bottom: 50px;
`;

export const StyledCardAction = styled(Card.Actions)`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    position: absolute;
    bottom: 10px;
`;

export const StyledCardTitle = styled(Title)`
    font-size: ${width * .06}px;
    font-weight: 600;
    margin-top: 20px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledCardParagraph = styled(Paragraph)`
    font-size: ${width * .04}px;
    margin-top: 10px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const StyledCardButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    width: 50%;
    margin-right: 2%;
`;

export const StyledCardsecondButton = styled(Button)`
    margin-left: 4%;
    width: 20%;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const StyledCardIcon = styled(Ionicons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${width * .07}px;
`;

