import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';

export const StyledContainer = styled(Animatable.View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    border-radius: ${(props) => props.theme.borderRedius.small}px;
    padding: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 3}px;
    margin: ${(props) => props.theme.spacing.height}px ${(props) => props.theme.spacing.width * 3}px;
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    margin-top: 0px;
    display: flex;
`;

export const StyledView = styled(View)`
    display: flex;
    flex: 1;
`;
