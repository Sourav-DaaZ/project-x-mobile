import styled from 'styled-components/native';
import { Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import { Paragraph, Title, Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button';
import Input from '../../../sharedComponents/input';
import Entypo from 'react-native-vector-icons/Entypo'

const { width, height } = Dimensions.get('screen');


export const StyledScrollView = styled(ScrollView)`
    flex: 1; 
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;

export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: ${(props) => props.theme.spacing.height * 7}px;
    padding-bottom: ${(props) => props.theme.spacing.height * 3}px;
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
    margin-top: ${(props) => props.theme.spacing.height * 3}px;
`;

export const StyledReviewProfile = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 5}px;
    margin-top: 0px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledTitle = styled(Title)`
    font-size: ${(props) => props.theme.fonts.large}px;
    line-height: ${(props) => props.theme.fonts.large}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    font-weight: ${(props) => props.theme.fontWeight.semiBold};
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
`;

export const StyledSemiTitle = styled(Title)`
    font-size: ${(props) => props.theme.fonts.medium}px;
    line-height: ${(props) => props.theme.fonts.medium}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    letter-spacing: 1px;
    font-weight: ${(props) => props.theme.fontWeight.semiBold};
`;


export const StyledParagraph = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-size: ${(props) => props.theme.fonts.regular}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    line-height: ${(props) => props.theme.fonts.regular}px;
    font-weight: ${(props) => props.theme.fontWeight.light};
`;

export const StyledCenter = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-vertical: ${(props) => props.theme.spacing.height}px;
`;

export const ImageWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${(props) => props.theme.spacing.height * 5}px;
    z-index: 9;
    margin-top: ${(props) => props.theme.spacing.height * 5}px;
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
    margin-vertical: ${(props) => props.theme.spacing.width * 5}px;
    max-height: ${(props) => props.theme.spacing.height * 50}px;
    margin-horizontal: ${(props) => props.theme.spacing.height * 3}px;
`;

export const StyledPopupWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}; 
    margin-top: 0px;
    margin-horizontal: ${(props) => props.theme.spacing.height * 3}px;
`;

export const StyledButtonView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.invert ? props.theme.colors[props.theme.baseColor].backgroundColor : props.theme.colors[props.theme.baseColor].mainByColor}; 
    fontWeight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fonts.large}px;
    text-transform: uppercase;
`;

export const StyledDotIcon = styled(Entypo)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.large}px;
    margin-right: ${(props) => props.theme.spacing.width * 5}px;
`;

export const StyledInputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width}px;
    padding-top: ${(props) => props.theme.spacing.height}px;
    padding-bottom: ${(props) => props.theme.spacing.height * 5}px;
    box-shadow: 0px -5px 5px #00000020;
    display: flex;
    border-top-left-radius: ${(props) => props.theme.borderRedius.semi}px;
    border-top-right-radius: ${(props) => props.theme.borderRedius.semi}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;