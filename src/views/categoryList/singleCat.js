import React from 'react';
import { Card, Paragraph } from 'react-native-paper';

import { StyledCard, StyledHeadline } from './style'

const CategoryList = (props) => {

    return (
        <StyledCard>
            <StyledCard.Cover style={{ height: 100 }} source={{ uri: 'https://picsum.photos/700' }} />
            <StyledCard.Content>
                <StyledHeadline style={{ textAlign: 'center', marginTop: 15 }}>Card</StyledHeadline>
            </StyledCard.Content>
        </StyledCard>
    )
};

export default CategoryList;