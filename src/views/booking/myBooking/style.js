import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import Button from '../../../sharedComponents/button';
import Input from '../../../sharedComponents/input';
import Entypo from 'react-native-vector-icons/Entypo'


export const StyledScrollView = styled(ScrollView)`
    flex: 1;
    margin-bottom: ${(props) => props.theme.spacing.height * 5}px;
`;

export const StyledContainer = styled(View)`
   flex: 1
`;

export const StyledParagraph = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-weight: 400;
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
    margin-vertical: ${(props) => props.theme.spacing.height * 2}px;
    max-height: ${(props) => props.theme.spacing.height * 50}px;
    margin-horizontal: ${(props) => props.theme.spacing.width * 5}px;
`;

export const StyledPopupWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}; 
    margin-top: 0px;
    margin-horizontal: ${(props) => props.theme.spacing.width * 5}px;
`;

export const StyledInput = styled(Input)`
    padding-horizontal: ${(props) => props.theme.spacing.width * 8}px;
    margin-top: -${(props) => props.theme.spacing.height * 4}px;
    border-radius: ${(props) => props.theme.borderRedius.semi}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledDotIcon = styled(Entypo)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.large}px;
    margin-right: ${(props) => props.theme.spacing.width * 5}px;
`;

export const StyledInputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    padding-horizontal: ${(props) => props.theme.spacing.width * 7}px;
    box-shadow: 0px -5px 5px #00000020;
    display: flex;
    padding-bottom: ${(props) => props.theme.spacing.height * 5}px;
    border-top-left-radius: ${(props) => props.theme.borderRedius.semi}px;
    border-top-right-radius: ${(props) => props.theme.borderRedius.semi}px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`;