import styled from 'styled-components/native';
import { Dimensions, SafeAreaView, ScrollView, View, Text} from 'react-native';
import { Card } from 'react-native-paper';
import Input from '../../../sharedComponents/input';
import Button from '../../../sharedComponents/button';

const { width, height } = Dimensions.get('screen');


export const StyledCard = styled(Card)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledSafeAreaView = styled(SafeAreaView)`
    flex: 1
`;

export const StyledScrollView = styled(ScrollView)`
    height: 100%;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 10px;
`;

export const WrapperView = styled(View)`
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundDeepColor};
`;

export const StyledInputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: 0px -5px 5px #00000020;
    display: flex;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;

export const StyledInput = styled(Input)`
    padding-left: 20px;
    padding-right: 20px;
    margin-top: -30px;
    border-radius: 30px;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;

export const StyledUserChatView = styled(View)`
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    max-width: 70%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    align-self: flex-start
`;

export const StyledMyChatView = styled(View)`
    padding: 20px;
    border-radius: 20px;
    text-align: right;
    margin-bottom: 20px;
    margin-top: 20px;
    max-width: 70%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].borderColor};
    align-self: flex-end;
`;

export const StyledTimeView = styled(Text)`
    width: 100%;
    text-align: center;
    margin-vertical: 5px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`;

export const HeaderText = styled(Text)`
    font-weight: 500;
    font-size: ${width * .05}px;
    margin-top: 5px;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textDeep};
`;

export const StyledUserChatViewText = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    font-size: ${width * .04}px;
    letter-spacing: 1px;
`;

export const StyledMyChatViewText = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    font-size: ${width * .04}px;
    letter-spacing: 1px;
`;
export const StyledClock = styled(Text)`
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
    position: absolute;
    bottom: -40px;
    padding: 20px;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
`;