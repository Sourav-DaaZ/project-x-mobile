import styled from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';
import { Platform } from 'react-native';
import { View, Image } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const DashboardOuterView = styled(View)`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 35px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    height: 100%;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    box-shadow: 0px 9px 5px #00000020;
`;

export const StyledFullImg = styled(Image)`
    width: 100%;
    height: 150px;
`;

export const StyledScrollView = styled(ScrollView)`
    background: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;
