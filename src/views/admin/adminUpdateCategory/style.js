import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import Button from '../../../sharedComponents/button'

export const SubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-top: ${(props) => props.theme.spacing.height * 2}px;
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    justify-content: center;
    width: 100%;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    padding-top: 0px;
    text-align: center;
    padding: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 8}px;
`;

export const InputWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    padding-top: 0px;
    margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width}px;
    z-index: 9
`;