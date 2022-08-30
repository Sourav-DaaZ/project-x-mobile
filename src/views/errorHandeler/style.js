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
    padding: 20px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    height: 100%
`;

export const SplashLogo = styled(Image)`
    width: 120px;
    margin-bottom: ${height * .08}px;
`;

export const SplashBannerLogo = styled(Image)`
    width: ${width_logo}px;
    height: ${width_logo}px;
    margin-bottom: ${height * .08}px;
`;

export const SplashTitle = styled(Text)`
    font-size: ${width * .1}px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep}
`;

export const SplashDescription = styled(Text)`
    font-size: ${width * .05}px;
    font-weight: 600;
    text-align: center;
    line-height: 30px;
    margin-bottom: ${height * .1}px;
    margin-top: ${height * .03}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const SplashButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;
