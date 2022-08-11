import styled from 'styled-components/native';
import { Dimensions, Image, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('screen');


export const StyledImageBackground = styled(ImageBackground)`
    width: ${width}px;
    height: 150px;
    min-height: 150px; 
`;

export const StyledCardCover = styled(Image)`
    min-height: 150px; 
    height: 150px; 
    width: 100%;
    resizeMode: contain;
`;