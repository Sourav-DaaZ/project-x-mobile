import { Platform, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { View, TextInput, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const { width, height } = Dimensions.get('screen');

export const StyledInputView = styled(View)`
    flex-direction: row;
    border-bottom-width: 1.5px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    border-bottomColor: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    padding-bottom: ${Platform.OS === 'ios' ? '10px' : 0};
`;

export const StyledInputElement = styled(TextInput)`
    flex: 1;
    margin-top: ${Platform.OS === 'ios' ? 0 : '-15px'};
    font-size: ${height * .02}px;
    padding-left: 10px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledTitle = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
    font-weight: 500;
    font-size: ${height * .02}px;
    margin-bottom: 10px;
    margin-top: ${height * .03}px;
`;

export const StyledError = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].errorColor};
    font-weight: 400;
`;

export const StyledPicker = styled(DropDownPicker)`
    
`;
