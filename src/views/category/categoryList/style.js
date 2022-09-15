import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import { Headline, Card, Paragraph } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


export const StyledScrollView = styled(ScrollView)`
    flex: 1;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    margin-horizontal: ${(props) => props.theme.spacing.width * 2}px;
`;

export const StyledCard = styled(Card)`
    width: ${(props) => props.theme.spacing.width * 50 - props.theme.spacing.width * 6}px;
    margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 2}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledHeadline = styled(Paragraph)`
    text-align: center; 
    margin-top: ${(props) => props.theme.spacing.height * 2}px;
    margin-bottom: ${(props) => props.theme.spacing.height * .5}px;
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-weight: ${(props) => props.theme.fontWeight.semiBold};
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;