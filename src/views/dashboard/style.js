import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, Image } from 'react-native';
import { Headline } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const StyledHorizontalScrollView = styled(ScrollView)`
    
`;

export const StyledHeaderView = styled(View)`
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-vertical: 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledHeaderHeadline = styled(Headline)`
    font-weight: 600; 
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledSearchbarView = styled(View)`
    margin-top: 1px;
    margin-horizontal: 20px;
    margin-bottom: 30px;
`;

export const StyledWrapperDiv = styled(View)`
    flex: 1;
    margin-bottom: 10px;
    padding-horizontal: 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

