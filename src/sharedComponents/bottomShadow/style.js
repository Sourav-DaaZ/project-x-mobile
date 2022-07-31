import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';


export const StyledContainer = styled(Animatable.View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    border-radius: 10px;
    padding: 10px;
    margin: 15px;
    margin-top: 0px;
    display: flex;
`;
