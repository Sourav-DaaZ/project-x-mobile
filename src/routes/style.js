import styled from 'styled-components/native';
import { Dimensions, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../sharedComponents/button';

const { width, height } = Dimensions.get('screen');

export const StyledTabView = styled(View)`
    display: flex;
    flex-Direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 5px;
    border-top-width: 1px;
    border-top-color:  ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
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
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainByColor};
    border-radius: 50px;
`;

export const StyledCercularByBorder = styled(View)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    border-radius: 50px;
    padding: ${height * .015}px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const StyledOption = styled(View)`
    padding: ${height * .015}px;
`;

export const UpdateButton = styled(Button)`
    width: ${(props) => props.full ? "100%" : "48%"};
    background-color: ${(props) => props.mode !== 'outlined' ? props.theme.colors[props.theme.baseColor].mainColor : props.theme.colors[props.theme.baseColor].backgroundColor};
    border-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    border-width: 1px;
    margin-bottom: 10px;
`;

export const UpdateTitle = styled(Text)`
    font-size: ${width * .1}px;
    font-weight: bold;
    text-align: center;
    margin-bottom: ${height * .015}px;
    color: ${(props) => props.critical? props.theme.colors[props.theme.baseColor].errorColor: props.theme.colors[props.theme.baseColor].textDeep}
`;

export const UpdateDescription = styled(Text)`
    font-size: ${width * .038}px;
    font-weight: 600;
    text-align: center;
    margin-bottom: ${height * .035}px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;
export const CancelText = styled(Text)`
    font-size: ${width * .038}px;
    font-weight: 700;
    text-align: center;
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
`;

export const UpdateWrapper = styled(View)`
    padding: ${height * .015}px;
    margin-bottom: ${height * .035}px
`;

export const ButtonWrapper = styled(View)`
    display: flex;
    flex-Direction: row;
    flex: 1;
    justify-content: space-between;
`;
