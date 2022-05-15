import styled from 'styled-components/native';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get('screen');


export const StyledPreview = styled(RNCamera)`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: black
`;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
    background-color: #fff;
    border-Radius: 5px;
    padding: 15px;
    margin: 20px;
`;

export const StyledHeadline = styled(Animatable.View)`
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
    border-bottom-width: 2px;
    width: ${(width * .5) - 2}px;
    margin-top: ${width * .5}px
`;

export const StyledQrBox = styled(View)`
    border-width: 1.5px;
    border-radius: 5px;
    position: absolute;
    background-color: transparent;
    border-color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
    justify-content: center;
    height: ${width * .5}px;
    width: ${width * .5}px;
    padding: 0px;
    left: ${width * .25}px;
    top: ${height * .25}px
`;