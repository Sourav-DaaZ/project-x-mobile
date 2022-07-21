import styled from 'styled-components/native';
import { Dimensions,TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../sharedComponents/button'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;

export const SplashOuterView = styled(View)`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    height: 100%
`;

export const SplashLogo = styled(Image)`
    width: ${width * .5}px;
`;
