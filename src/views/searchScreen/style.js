import styled from 'styled-components/native';
import { Dimensions, View } from 'react-native';
import { Searchbar, Divider } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(View)`
    background: white;
    margin: 10px;
    margin-top: 0px;
`;

export const StyledSearchbar = styled(Searchbar)`
    width: ${width - 40}px;
    margin: 20px;
`;

export const StyledList = styled(View)`
    margin-bottom: 10px;
`;

export const StyledDivider = styled(Divider)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    margin-top: 5px;
    margin-bottom: 5px;

`;