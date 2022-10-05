import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';


export const StyledHorizontalScrollView = styled(ScrollView)`
    
`;

export const StyledUserWrapper = styled(View)`
    margin-horizontal: ${(props) => props.theme.spacing.width * 4}px;
`;

export const StyledListView = styled(Animatable.View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor}; 
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
`;

