import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Button from '../../sharedComponents/button';

import Ionicons from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('screen');


export const StyledCard = styled(Card)`
    margin: 25px;
    margin-top: -20px;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledCardCover = styled(Card.Cover)`
    height: 150px; 
    width: ${width - 30}px;
    margin-left: 15px;
    border-radius: 10px;
`;

export const StyledCardContent = styled(Card.Content)`
    margin: 5px;
    margin-top: 0px;
    border-radius: 10px;
`;

export const StyledCardAction = styled(Card.Actions)`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const StyledCardTitle = styled(Title)`
    font-size: ${width * .05}px;
    font-weight: 600;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledCardParagraph = styled(Paragraph)`
    font-size: ${width * .04}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const StyledCardButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    width: 75%;
    margin-right: 2%;
`;

export const StyledView = styled(TouchableOpacity)`
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;