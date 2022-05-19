import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { View, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const StyledTabView = styled(View)`
    display: flex;
    flex-Direction: row;
    justify-content: space-around;
    align-items: center;
    height: ${height * .06}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledHeaderView = styled(SafeAreaView)`
    display: flex;
    flex-Direction: row;
    justify-content: space-between;
    box-shadow: none;
    background-color: ${(props) => props.dark ? props.theme.colors[props.theme.baseColor].mainColor : props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledEachHeaderView = styled(View)`
    padding: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
`;

export const StyledCercularBorder = styled(View)`
    padding: ${height * .015}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    border-radius: 50px;
    margin-top: -${height * .045}px
`;

export const StyledCercularByBorder = styled(View)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    border-radius: 50px;
    padding: ${height * .015}px;
    margin-top: -${height * .045}px
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
`;

export const StyledOption = styled(View)`
    padding: ${height * .015}px;
    margin-top: -${height * .045}px
`;