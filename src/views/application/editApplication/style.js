import styled from 'styled-components/native';
import { View, Image, ScrollView, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../../sharedComponents/button'


export const SubmitButton = styled(Button)`
    width: 100%;
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].mainColor};
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    margin-top: ${(props) => props.theme.spacing.height * 3}px
`;

export const InputView = styled(View)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-bottom: ${(props) => props.theme.spacing.height}px;
    min-height: ${(props) => props.theme.spacing.height * 25}px;
    justify-content: center;
    width: 100%;
`;

export const StyledScrollView = styled(ScrollView)`
    background-color: ${(props) => props.theme.colors[props.theme.baseColor].backgroundColor};
    margin-top: -${(props) => props.theme.spacing.height * 2}px;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
    padding: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 5}px;
    margin-horizontal: ${(props) => props.theme.spacing.width * 4}px;
    padding-top: 0px;
    border-radius: 10px;
`;

export const StyledInlineInput = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const StyledText = styled(Text)`
    font-size: ${(props) => props.theme.fonts.regular}px;
    font-weight: ${(props) => props.theme.fontWeight.trueBold};
    color: ${(props) => props.theme.colors[props.theme.baseColor].textLight};
`
export const StyledInlineInputContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 999;
    margin-vertical: ${(props) => props.theme.spacing.height * 1}px;
`
export const StyledImageBackground = styled(ImageBackground)`
    margin-bottom: -${(props) => props.theme.spacing.height * 2}px;
`;

export const StyledCardCover = styled(Image)`
    height: ${(props) => props.theme.spacing.height * 30}px; 
    width: 100%;
    resizeMode: contain;
`;
