import styled from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Button from '../../../sharedComponents/button';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledHorizontalScrollView = styled(ScrollView)`

`;

export const StyledCardIcon = styled(Ionicons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${width * .07}px;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: 20px;
`;
