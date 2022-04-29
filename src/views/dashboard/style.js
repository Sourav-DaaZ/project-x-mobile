import styled from 'styled-components/native';
import { Dimensions, ScrollView,View, Image } from 'react-native';
import { Headline } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledHorizontalScrollView = styled(ScrollView)`
    background: white;
`;

export const StyledHeaderView = styled(View)`
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 15px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledHeaderHeadline = styled(Headline)`
    font-weight: 600; 
    padding-left: 20px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

