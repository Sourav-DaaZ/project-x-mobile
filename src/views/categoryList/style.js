import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, TouchableOpacity } from 'react-native';
import { Headline, Card, Paragraph } from 'react-native-paper';
import Button from '../../sharedComponents/button'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledScrollView = styled(View)`
    background: white;
    padding: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
`;

export const StyledCard = styled(Card)`
    width: ${(width / 2) - 30}px;
    margin: 5px;
`;

export const StyledHeadline = styled(Paragraph)`
    text-align: center; 
    margin-top: 15px;
    font-size: ${height * .02}px;
    font-weight: 500
`;