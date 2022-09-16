import styled from 'styled-components/native';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';


export const StyledScrollView = styled(View)`
    margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width}px;
    margin-top: ${(props) => props.theme.spacing.height}px;
`;

export const StyledWrapperBody = styled(View)`
    margin-horizontal: ${(props) => props.theme.spacing.width * 3}px;
`;

export const StyledWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-horizontal: ${(props) => props.theme.spacing.width}px;
    margin-bottom: ${(props) => props.theme.spacing.width * 2}px;
`;

export const StyledOptiondWrapper = styled(View)`
    display: flex; 
    flexDirection: row;
    flexWrap: wrap;
    margin: ${(props) => props.theme.spacing.height * 1.5}px ${(props) => props.theme.spacing.width}px;
`;

export const StyledChip = styled(Chip)`
    background-color: ${(props) => props.selected ? props.theme.colors[props.theme.baseColor].mainColor : props.theme.colors[props.theme.baseColor].borderColor};
    color: ${(props) => props.selected ? props.theme.colors[props.theme.baseColor].backgroundColor : props.theme.colors[props.theme.baseColor].borderColor};
    margin-right: ${(props) => props.theme.spacing.width * 2}px;
    padding: ${(props) => props.theme.spacing.width * .3}px;
`;