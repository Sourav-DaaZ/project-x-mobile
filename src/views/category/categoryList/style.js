import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import { Headline, Card, Paragraph } from 'react-native-paper';
import Button from '../../../sharedComponents/button'

const { width, height } = Dimensions.get('screen');


export const StyledScrollView = styled(ScrollView)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-horizontal: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledCard = styled(Card)`
    width: ${(width / 2) - 20}px;
    margin: ${width * .01}px;
    margin-left: .5px;
    margin-right: ${width * .05}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledHeadline = styled(Paragraph)`
    text-align: center; 
    margin-top: ${height * .02}px;
    margin-bottom: ${height * .005}px;
    font-size: ${height * .02}px;
    font-weight: 500;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;