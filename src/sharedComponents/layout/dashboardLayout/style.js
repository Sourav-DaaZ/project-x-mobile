import styled from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';
import { Platform } from 'react-native';
import { View, Image } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const DashboardOuterView = styled(View)`
    display: flex;
    flex: 1;
    flex-direction: column;
    z-index: 1;
`;

export const StyledFullImg = styled(Image)`
    width: 100%;
    height: 150px;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;
