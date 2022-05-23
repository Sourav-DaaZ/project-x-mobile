import styled from 'styled-components/native';
import { Dimensions, View, ScrollView } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import Button from '../../sharedComponents/button';
import ViewShot from "react-native-view-shot";

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledProfileButton = styled(Button)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
    margin: 10px;
`;