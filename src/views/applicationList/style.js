import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../sharedComponents/button'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledHorizontalScrollView = styled(ScrollView)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;