import styled from 'styled-components/native';
import { View } from 'react-native';
import { Divider, Chip } from 'react-native-paper';


export const StyledScrollView = styled(View)`
    margin: 10px;
    margin-top: 0px;
`;

export const StyledWrapperBody = styled(View)`
    margin-top: 40px;
`;

export const StyledWrapperList = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-vertical: 10px;
    border-radius: 10px
`;

export const StyledList = styled(View)`
    margin-bottom: 10px;
`;

export const StyledDivider = styled(Divider)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const StyledWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-horizontal: 20px;
    margin-bottom: 10px;
`;

export const StyledOptiondWrapper = styled(View)`
    display: flex; 
    flexDirection: row;
    flexWrap: wrap;
    margin: 10px;
    margin-top: -30px;
`;

export const StyledChip = styled(Chip)`
    background-color: ${(props) => props.selected ? props.theme.colors[props.theme.baseColor].mainColor : props.theme.colors[props.theme.baseColor].borderColor};
    text: ${(props) => props.selected ? props.theme.colors[props.theme.baseColor].backgroundColor : props.theme.colors[props.theme.baseColor].borderColor};
    margin-right: 20px;
`;