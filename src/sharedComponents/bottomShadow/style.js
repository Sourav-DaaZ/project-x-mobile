import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { View, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export const StyledContainer = styled(Animatable.View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    border-radius: 10px;
    padding: ${height * .01}px ${width * .03}px;
    margin: ${height * .01}px ${width * .03}px;
    margin-bottom: ${height * .015}px;
    margin-top: 0px;
    display: flex;
`;

export const StyledView = styled(View)`
    display: flex;
    flex: 1;
`;
