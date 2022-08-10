import styled from 'styled-components/native';
import { Dimensions, Image, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('screen');


export const StyledImageBackground = styled(ImageBackground)`
    width: ${width}px;
`;

export const StyledCardCover = styled(Image)`
    height: 150px; 
    width: 100%;
    resizeMode: contain;
`;