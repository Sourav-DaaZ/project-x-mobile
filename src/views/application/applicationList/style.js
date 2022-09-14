import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Button from '../../../sharedComponents/button';



export const StyledHorizontalScrollView = styled(ScrollView)`

`;

export const StyledCardIcon = styled(Ionicons)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${(props) => props.theme.fonts.large}px;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
`;
