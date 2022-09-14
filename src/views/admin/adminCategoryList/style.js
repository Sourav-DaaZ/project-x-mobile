import styled from 'styled-components/native';
import { View } from 'react-native';


export const StyledScrollView = styled(View)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 3}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;