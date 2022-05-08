import React from 'react';

import {
    StyledCard,
    StyledCardContent,
    StyledCardAction,
    StyledCardTitle,
    StyledCardParagraph,
    StyledCardCover,
    StyledCardButton,
    StyledCardsecondButton,
    StyledCardIcon
} from './style'

const DetailsScreen = (props) => {

    return (
        <StyledCard>
            <StyledCardCover source={{ uri: 'https://picsum.photos/700' }} />
            <StyledCardContent>
                <StyledCardTitle>Card</StyledCardTitle>
                <StyledCardParagraph>Card content</StyledCardParagraph>
            </StyledCardContent>
            <StyledCardAction>
                <StyledCardButton mode='contained'>Apply</StyledCardButton>
                <StyledCardsecondButton mode='text' onPress={() => props.navigation.navigate('Chat')}><StyledCardIcon name='chatbox-outline' /></StyledCardsecondButton>
                <StyledCardsecondButton mode='text'><StyledCardIcon name='share-outline' /></StyledCardsecondButton>
            </StyledCardAction>
        </StyledCard>
    )
}
export default DetailsScreen;