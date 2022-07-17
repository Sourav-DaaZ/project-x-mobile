import styled from 'styled-components/native';
import { View, Dimensions } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export const StyledWrapper = styled(View)`
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledTitle = styled(Paragraph)`
    font-size: ${height * .021}px;
    margin-bottom: 0px;
    font-weight: 700;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
`;

export const StyledSemiTitle = styled(Title)`
    font-size: ${height * .02}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    letter-spacing: 1px;
    font-weight: 500;
`;

export const StyledParagraph = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-weight: 400;
    margin-bottom: 0px;
`;