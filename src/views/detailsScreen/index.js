import React, { useEffect, useState } from 'react';

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
    const [data, setData] = useState({});
    useEffect(() => {
        setData(props.route.params.data);
    }, [])

    return (
        <StyledCard>
            {data.images && data.images[0] ? <StyledCardCover source={{ uri: data.images[0] }} resizeMode='contain' /> : null}
            <StyledCardContent>
                <StyledCardTitle>{data?.title}</StyledCardTitle>
                <StyledCardParagraph>{data?.message}</StyledCardParagraph>
                {data?.expected_price ? <StyledCardParagraph>Expected Cost: <StyledCardTitle style={{
                    fontSize: 18,
                }}>{data.expected_price} Rs.</StyledCardTitle></StyledCardParagraph> : null}
                {data?.genderSpecific ? <StyledCardParagraph>gender Specific: <StyledCardTitle style={{
                    fontSize: 18,
                }}>{data.genderSpecific}</StyledCardTitle></StyledCardParagraph> : null}
            </StyledCardContent>
            <StyledCardAction>
                <StyledCardButton mode='contained' onPress={() => props.navigation.navigate('ApplyPost', {data: data})}>Apply</StyledCardButton>
                <StyledCardsecondButton mode='text' onPress={() => props.navigation.navigate('Chat')}><StyledCardIcon name='chatbox-outline' /></StyledCardsecondButton>
                <StyledCardsecondButton mode='text'><StyledCardIcon name='share-outline' /></StyledCardsecondButton>
            </StyledCardAction>
        </StyledCard>
    )
}
export default DetailsScreen;