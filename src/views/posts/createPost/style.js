import styled from 'styled-components/native';
import { Dimensions, View, Image, ScrollView, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button'

const { width, height } = Dimensions.get('screen');
const width_logo = width * .6;


export const SubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-bottom: 10px
    margin-top: 40px
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${height * .01}px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
`;


export const StyledInput = styled(View)`
    flex: 1;
    flex-direction: column;
`
export const StyledInlineInput = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px
`

export const StyledText = styled(Text)`
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`
export const StyledInlineInputContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 9;
    margin-bottom: 10px;
`
export const StyledImageBackground = styled(ImageBackground)`
    margin-bottom: -60px;
`;

export const StyledCardCover = styled(Image)`
    height: ${height * .35}px; 
    width: 100%;
    resizeMode: contain;
`;

export const InputWrapper = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-horizontal: 10px;
    padding: 30px;
    padding-top: 0px;
    margin: 10px;
    border-radius: 10px;
    z-index: 9
`;