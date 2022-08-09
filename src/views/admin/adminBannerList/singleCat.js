import React from 'react';
import * as Animatable from 'react-native-animatable';
import { StyledCard, StyledHeadline } from './style';

const CategoryList = (props) => {

    return (
        <Animatable.View animation='flipInY'>
            <StyledCard>
                <StyledCard.Cover style={{ height: 100 }} source={props.img ? { uri: props.img } : null} />
                <StyledCard.Content>
                    <StyledHeadline style={{ textAlign: 'center', marginTop: 15 }}>{props.name}</StyledHeadline>
                </StyledCard.Content>
            </StyledCard>
        </Animatable.View>
    )
};

export default CategoryList;