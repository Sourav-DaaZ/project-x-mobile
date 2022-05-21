import styled from 'styled-components/native';
import { Dimensions, View, ScrollView } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import Button from '../../sharedComponents/button';
import ViewShot from "react-native-view-shot";

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledProfileButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
    margin-top: 20px;
`;
export const StyledRevProfileButton = styled(Button)`
    margin-top: 5px;
    text-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
`;

export const StyledModalView = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    padding-bottom: 80px;
`;

export const StyledProfile = styled(ScrollView)`
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledTitle = styled(Title)`
    font-size: ${height * .03}px;
    font-weight: 500;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
`;

export const StyledSemiTitle = styled(Title)`
    font-size: ${height * .025}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    letter-spacing: 1px;
    margin-bottom: 15px;
    text-align: center;
    font-weight: 500;
`;

export const StyledViewShot = styled(ViewShot)`
    padding: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor}; 
`;

export const StyledCenter = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledLeftContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
`;
