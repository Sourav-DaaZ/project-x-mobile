import React from 'react';
import { TouchableOpacity } from 'react-native';
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
            {props.images ? <StyledCardCover source={{ uri: props.images }} /> : null}
            <StyledCard style={{ marginTop: !props.images ? 20 : -20 }}>
                <StyledCardContent>
                    {props.title ? <StyledCardTitle>{props.title}</StyledCardTitle> : null}
                    {props.message ? <StyledCardParagraph>{props.message}</StyledCardParagraph> : null}
                </StyledCardContent>
                <StyledCardAction>
                    <StyledCardButton mode='contained' contentStyle={{ padding: 3 }} onPress={props.onViewPress}>View</StyledCardButton>
                    <StyledCardsecondButton mode='text' onPress={props.onChatPress}><StyledCardIcon name='chatbox-outline' /></StyledCardsecondButton>
                    <StyledCardsecondButton mode='text' onPress={props.onSherePress}><StyledCardIcon name='share-outline' /></StyledCardsecondButton>
                </StyledCardAction>
            </StyledCard>
        </React.Fragment>
    )
};

export default CardComponent;