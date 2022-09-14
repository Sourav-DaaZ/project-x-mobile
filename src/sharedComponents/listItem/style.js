import styled from 'styled-components/native';
import { Paragraph, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export const StyledProfileView = styled(Animatable.View)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 2}px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    border-radius: ${(props) => props.theme.borderRedius.small}px;
`;

export const StyledTitle = styled(Paragraph)`
    font-size: ${(props) => props.theme.fonts.medium}px;
    margin-bottom: 0px;
    font-weight: ${(props) => props.theme.fontWeight.boldText};
    line-height: ${(props) => props.theme.fonts.medium}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
`;

export const StyledSemiTitle = styled(Title)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    line-height: ${(props) => props.theme.fonts.regular}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    font-weight: ${(props) => props.theme.fontWeight.boldText};
`;

export const StyledParagraph = styled(Paragraph)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    line-height: ${(props) => props.theme.fonts.regular}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight}; 
    font-weight: ${(props) => props.theme.fontWeight.light};
    margin-vertical: ${(props) => props.theme.spacing.height}px;
    margin-bottom: 0px;
`;

export const StyledParagraphBold = styled(Paragraph)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}; 
    font-weight: ${(props) => props.theme.fontWeight.boldText};
    font-size: ${(props) => props.theme.fonts.regular}px;
    line-height: ${(props) => props.theme.fonts.regular}px;
    margin-bottom: 0px;
`;