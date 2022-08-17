import styled from 'styled-components/native';
import { Dimensions, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button'
import ButtonComponent from '../../../sharedComponents/button';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const SubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-bottom: 20px
    margin-top: 50px
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${height * .01}px;
    justify-content: center;
    width: 100%;
`;

export const BodyWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    padding: 10px;
    margin: 10px;
    padding-top: 30px;
`;

export const StyledScrollView = styled(ScrollView)`
    margin-top: -50px;
    border-radius: 10px;
    margin-top: 1px;
    width: 100%;
`;

export const StyledInput = styled(View)`
    flex: 1;
    flex-direction: column;
`
export const StyledInlineInput = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px
`

export const StyledText = styled(Text)`
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`

export const StyledLgout = styled(Text)`
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
`
export const StyledInlineInputContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 999;
    margin-bottom: 10px;
`

export const WrapperImage = styled(View)`
    flex: 1;
    margin: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: -50px;
`
export const StyledButtonView = styled(Text)`
    width: 100%;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}; 
    fontWeight: 600;
    font-size: 15px;
    text-transform: uppercase;
`;

export const StyledViewButton = styled(View)`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;

export const StyledButtonActive = styled(ButtonComponent)`
    width: 50%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor}; 
    border-radius: 0px;
`;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
    width: 50%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;