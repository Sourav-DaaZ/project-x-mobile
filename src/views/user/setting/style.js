import styled from 'styled-components/native';
import { Dimensions, ScrollView, View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${height * .01}px;
    padding-bottom: ${height * .02}px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledProfile = styled(View)`
    padding-bottom: ${height * .01}px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledTitle = styled(Title)`
    font-size: ${width * .07}px;
    font-weight: 500;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
`;

export const StyledSemiTitle = styled(Title)`
    font-size: ${width * .05}px;
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
    padding-vertical: ${height * .01}px;
`;

export const StyledLeftContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-vertical: ${height * .01}px;
    margin-bottom: ${height * .005}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
`;

export const WrapperContainer = styled(ScrollView)`
    display: flex;
`;
