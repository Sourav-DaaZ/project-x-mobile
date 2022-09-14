import styled from 'styled-components/native';
import { Image, ImageBackground } from 'react-native';



export const StyledImageBackground = styled(ImageBackground)`
    width: ${(props) => props.theme.spacing.width * 100}px;
    height: ${(props) => props.theme.spacing.height * 18}px;
    min-height: ${(props) => props.theme.spacing.height * 18}px; 
`;

export const StyledCardCover = styled(Image)`
    min-height: ${(props) => props.theme.spacing.height * 18}px; 
    height: ${(props) => props.theme.spacing.height * 18}px; 
    width: 100%;
    resizeMode: contain;
`;