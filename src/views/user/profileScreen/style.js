import styled from 'styled-components/native';
import { Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import { Paragraph, Title, Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button';
import Input from '../../../sharedComponents/input';
import Entypo from 'react-native-vector-icons/Entypo'

const { width, height } = Dimensions.get('screen');


export const StyledScrollView = styled(ScrollView)`
    flex: 1; 
    margin-bottom: ${height * .015}px;
`;

export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: ${height * .07}px;
    padding-bottom: ${height * .03}px;
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
    margin-top: ${height * .03}px;
`;

export const StyledReviewProfile = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: ${height * .01}px ${width * .05}px;
    margin-top: 0px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledTitle = styled(Title)`
    font-size: ${width * .07}px;
    line-height: ${width * .07}px;
    margin-bottom: ${height * .01}px;
    font-weight: 500;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
`;

export const StyledSemiTitle = styled(Title)`
    font-size: ${width * .05}px;
    line-height: ${width * .05}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    letter-spacing: 1px;
    font-weight: 500;
`;


export const StyledParagraph = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-size: ${width * .04}px;
    margin-bottom: ${height * .01}px;
    line-height: ${width * .04}px;
    font-weight: 400;
`;

export const StyledCenter = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-vertical: ${height * .015}px;
`;

export const ImageWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${height * .05}px;
    z-index: 9;
    margin-top: ${height * .05}px;
`;

export const StyledHorizontalScrollView = styled(View)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledViewButton = styled(View)`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;
export const StyledStatus = styled(View)`
    flex-direction: column;
`;

export const CardWrapper = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const StyledNotesView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}; 
    margin-vertical: ${width * .05}px;
    max-height: ${height / 2}px;
    margin-horizontal: ${height * .03}px;
`;

export const StyledPopupWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}; 
    margin-top: 0px;
    margin-horizontal: ${height * .03}px;
`;

export const StyledButtonView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.invert ? props.theme.colors[props.theme.baseColor].backgroundColor : props.theme.colors[props.theme.baseColor].mainByColor}; 
    fontWeight: 600;
    font-size: ${width * .04}px;
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

export const StyledInput = styled(Input)`
    padding-left: ${width * .08}px;
    padding-right: ${width * .08}px;
    margin-top: -${height * .05}px;
    border-radius: 30px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledDotIcon = styled(Entypo)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${width * .07}px;
    line-height: ${width * .07}px;
    margin-right: ${width * .05}px;
`;

export const StyledInputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    padding: ${height * .01}px ${width * .1}px;
    padding-top: ${height * .01}px;
    padding-bottom: ${height * .05}px;
    box-shadow: 0px -5px 5px #00000020;
    display: flex;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${height * .01}px;
`;