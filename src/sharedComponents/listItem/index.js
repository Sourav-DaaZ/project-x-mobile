import React, { useContext } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { StyledProfileView, StyledTitle, StyledParagraph } from './style';


export default ListItem = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <StyledProfileView animation='bounceInUp'>
           {props.image}
            <View style={{marginLeft: 10}}>
                <StyledTitle>{props.title}</StyledTitle>
                <StyledParagraph>{props.description}</StyledParagraph>
            </View>
        </StyledProfileView>
    );
};
