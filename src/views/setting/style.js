import styled from 'styled-components/native';
import { Dimensions, View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledProfileView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledModalView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 50px;
    padding-bottom: 80px;
`;

export const StyledProfile = styled(View)`
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
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

export const StyledLeftContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
`;
