import React, { useContext } from 'react';
import * as Animatable from 'react-native-animatable';
import { StyledCard, StyledHeadline } from './style';
import { ThemeContext } from 'styled-components';

const CategoryList = (props) => {
    const themeContext = useContext(ThemeContext);
    const spacing = themeContext.spacing;

    return (
        <Animatable.View animation='flipInY'>
            <StyledCard>
                <StyledCard.Cover style={{ height: spacing.height * 12 }} source={props.img ? { uri: props.img } : null} />
                <StyledCard.Content>
                    <StyledHeadline style={{ textAlign: 'center' }}>{props.name}</StyledHeadline>
                </StyledCard.Content>
            </StyledCard>
        </Animatable.View>
    )
};

export default CategoryList;