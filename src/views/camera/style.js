import styled from 'styled-components/native';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('screen');


export const StyledContainer = styled(View)`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const StyledButton = styled(TouchableOpacity)`
    height: ${(props) => props.theme.spacing.width * 20}px;
    width: ${(props) => props.theme.spacing.width * 20}px;
    backgroundColor: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
    position: absolute;
    bottom: ${(props) => props.theme.spacing.height * 4}px;
    border-radius: 40px;
`;
export const StyledReverse = styled(Ionicons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
    font-size: ${(props) => props.theme.spacing.width * 12}px;
    margin-right: 2%;
    position: absolute;
    bottom: ${(props) => props.theme.spacing.height * 4 + props.theme.spacing.width * 4}px;
    left: ${(props) => props.theme.spacing.width * 10}px
`;
