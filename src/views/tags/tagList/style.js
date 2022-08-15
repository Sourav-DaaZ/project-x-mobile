import styled from 'styled-components/native';
import { Dimensions, ScrollView, View } from 'react-native';
import { Chip} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(ScrollView)`
    padding: 20px;
    height: 100%;
`;

export const WrapperView = styled(Animatable.View)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
`;


export const StyledChip = styled(Chip)`
    margin-right: 20px;
`;