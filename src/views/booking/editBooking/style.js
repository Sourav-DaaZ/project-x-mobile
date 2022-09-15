import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import Button from '../../../sharedComponents/button'

export const SubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-vertical: ${(props) => props.theme.spacing.height}px;
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    justify-content: center;
    width: 100%;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-top: -${(props) => props.theme.spacing.height}px;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width}px;
    padding-top: 0px;
`;

export const StyledInlineInput = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
