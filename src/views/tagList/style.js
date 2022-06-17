import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import { Divider, Chip} from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(ScrollView)`
    background: white;
    padding: 20px;
`;

export const StyledDivider = styled(Divider)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    margin-top: 5px;
    margin-bottom: 5px;

`;

export const StyledChip = styled(Chip)`
    margin-right: 20px;
    margin-bottom: 20px;
`;