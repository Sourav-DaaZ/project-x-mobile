import styled from 'styled-components/native';
import { Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import { Paragraph, Title, Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button';
import Input from '../../../sharedComponents/input';
import Entypo from 'react-native-vector-icons/Entypo'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(ScrollView)`
    flex: 1;
    margin-bottom: 10px;
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
    margin-top: 20px;
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
   flex: 1
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

export const ImageWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40px;
    z-index: 9;
    margin-top: 40px;
`;

export const StyledHorizontalScrollView = styled(ScrollView)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    display: flex;
    flex: 1
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
    margin-vertical: 10px;
    max-height: ${height / 2}px;
    margin-horizontal: 20px;
`;

export const StyledPopupWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}; 
    margin-top: 0px;
    margin-horizontal: 20px;
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

export const StyledInput = styled(Input)`
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 0px;
    border-radius: 30px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledDotIcon = styled(Entypo)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${width * .07}px;
    margin-right: 12px;
`;

export const StyledInputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    padding: 30px;
    padding-top: 20px;
    padding-bottom: 45px;
    box-shadow: 0px -5px 5px #00000020;
    display: flex;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: 20px;
`;