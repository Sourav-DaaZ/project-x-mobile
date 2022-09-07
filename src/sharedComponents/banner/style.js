import styled from 'styled-components/native';
import { Dimensions, Image, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('screen');


export const StyledImageBackground = styled(ImageBackground)`
    width: ${width}px;
    height: ${height * .2}px;
    min-height: ${height * .2}px; 
`;

export const StyledCardCover = styled(Image)`
    min-height: ${height * .2}px; 
    height: ${height * .2}px; 
    width: 100%;
    resizeMode: contain;
`;