import styled from 'styled-components/native';
import { Dimensions, ScrollView, View, Image } from 'react-native';
import { Chip, Headline } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');


export const StyledHorizontalScrollView = styled(ScrollView)`
    
`;

export const StyledHeaderView = styled(View)`
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${height * .01}px;
    padding-bottom: ${height * .01}px;
    border-bottom-width: ${height * .001}px;
    border-bottom-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
`;

export const StyledHeaderHeadline = styled(Headline)`
    font-weight: 600; 
    font-size: ${width * .06}px;
    margin-vertical: ${width * .01}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledSearchbarView = styled(View)`
    padding-top: ${height * .02}px;
    margin-horizontal: ${width * .035}px;
    margin-bottom: ${height * .03}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;
export const StyledBannerWrapper = styled(View)`
    margin-bottom: ${height * .015}px;
    margin-horizontal: ${width * .03}px;
    width: ${width - (width * .06)}px;
    overflow: hidden;
    display: flex;
    flex: 1;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledChip = styled(Chip)`
    margin-right: ${width * .03}px;
`;

export const StyledImage = styled(Image)`
    width: ${width * .25}px;
    height: ${height * .05}px;
    margin-horizontal: ${width * .003}px;
`;