import styled from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('screen');


export const StyledScrollView = styled(ScrollView)`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;
