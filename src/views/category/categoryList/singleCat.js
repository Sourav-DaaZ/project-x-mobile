import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Dimensions } from 'react-native'
import { StyledCard, StyledHeadline } from './style';
const { width, height } = Dimensions.get('screen');

const CategoryList = (props) => {

    return (
        <Animatable.View animation='flipInY'>
            <StyledCard>
                <StyledCard.Cover style={{height: height * .12}} source={props.img ? { uri: props.img } : null} />
                <StyledCard.Content>
                    <StyledHeadline style={{ textAlign: 'center' }}>{props.name}</StyledHeadline>
                </StyledCard.Content>
            </StyledCard>
        </Animatable.View>
    )
};

export default CategoryList;