import styled from 'styled-components/native';
import { Dimensions, View } from 'react-native';
import { Searchbar, Divider, Chip } from 'react-native-paper';

import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(View)`
    margin: 10px;
    margin-top: 0px;
`;

export const StyledSearchbar = styled(Searchbar)`
    width: ${width - 40}px;
    margin: 20px;
    margin-bottom: 40px;
`;

export const StyledList = styled(View)`
    margin-bottom: 10px;
`;

export const StyledWrapper = styled(Animatable.View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: 10px;
    border-radius: 10px;
`;

export const StyledChip = styled(Chip)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    margin-left: 20px;
    margin-bottom: 10px;
`;