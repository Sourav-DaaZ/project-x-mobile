import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button'

export const SubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-bottom: ${(props) => props.theme.spacing.height}px
    margin-top: ${(props) => props.theme.spacing.height * 2}px
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height * 3}px;
    justify-content: center;
    width: 100%;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 3}px;
    padding-top: 0px;
    margin-bottom: ${(props) => props.theme.spacing.height }px;
    border-radius: ${(props) => props.theme.borderRedius.small}px;
`;

export const StyledInlineInput = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const StyledText = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-weight: ${(props) => props.theme.fontWeight.trueBold};
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`
export const StyledInlineInputContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 999;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
`
