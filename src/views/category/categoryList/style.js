import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import { Headline, Card, Paragraph } from 'react-native-paper';
import Button from '../../../sharedComponents/button'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(ScrollView)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-horizontal: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledCard = styled(Card)`
    width: ${(width / 2) - 20}px;
    margin: 5px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledHeadline = styled(Paragraph)`
    text-align: center; 
    margin-top: 15px;
    font-size: ${height * .02}px;
    font-weight: 500;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;