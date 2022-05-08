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

const CardComponent = (props) => {

    return (
        <React.Fragment>
            <StyledCardCover source={{ uri: 'https://picsum.photos/700' }} />
            <StyledCard>
                <StyledCardContent>
                    <StyledCardTitle>Card</StyledCardTitle>
                    <StyledCardParagraph>Card content</StyledCardParagraph>
                </StyledCardContent>
                <StyledCardAction>
                    <StyledCardButton mode='contained'>Apply</StyledCardButton>
                    <StyledCardsecondButton mode='text'><StyledCardIcon name='chatbox-outline' /></StyledCardsecondButton>
                    <StyledCardsecondButton mode='text'><StyledCardIcon name='share-outline' /></StyledCardsecondButton>
                </StyledCardAction>
            </StyledCard>
        </React.Fragment>
    )
};

export default CardComponent;