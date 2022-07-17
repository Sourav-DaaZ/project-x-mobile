import styled from 'styled-components/native';
import { Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import { Paragraph, Title, Text } from 'react-native-paper';
import Button from '../../sharedComponents/button';

import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(ScrollView)`
    flex: 1;
    margin-horizontal: 10px;
    margin-bottom: 10px;
    margin-top: -50px;
`;

export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-radius: 10px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledImage = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

export const StyledReviewProfile = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    margin-top: 0px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;
export const StyledContainer = styled(View)`
   
`;

export const StyledTitle = styled(Title)`
    font-size: ${height * .03}px;
    font-weight: 500;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
`;

export const StyledSemiTitle = styled(Title)`
    font-size: ${height * .025}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    letter-spacing: 1px;
    font-weight: 500;
`;

export const StyledParagraph = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-weight: 400;
`;

export const StyledCenter = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledHorizontalScrollView = styled(ScrollView)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledViewButton = styled(View)`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;

export const StyledButtonView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}; 
    fontWeight: 600;
    font-size: 15px;
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
export const StyledButtonActive = styled(Button)`
    width: 50%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}; 
    border-radius: 0px;
`;

