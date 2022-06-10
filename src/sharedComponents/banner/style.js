import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Card, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import Ionicons from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;

export const StyledClose = styled(Animatable.Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 3px;
    text-align: center;
    position: absolute;
    width: 70px;
    padding: 20px;
    padding-left: 15px;
    padding-top: 0px;
    left: 50%;
    margin-left: -35px;
`;
