import React, { useContext } from 'react';
import {
    StyledCard,
    StyledCardContent,
    StyledCardAction,
    StyledCardTitle,
    StyledCardParagraph,
    StyledCardCover,
    StyledCardButton,
    StyledView,
    StyledCardIcon
} from './style';
import { ThemeContext } from 'styled-components';
import * as Animatable from 'react-native-animatable';

const CardComponent = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <Animatable.View animation='bounceIn'>
            {props.images ? <StyledCardCover source={{ uri: props.images }} /> : null}
            <StyledCard style={{ marginTop: !props.images ? 20 : -20 }}>
                <StyledCardContent>
                    {props.title ? <StyledCardTitle>{props.title}</StyledCardTitle> : null}
                    {props.message ? <StyledCardParagraph>{props.message}</StyledCardParagraph> : null}
                </StyledCardContent>
                <StyledCardAction>
                    {props.onViewPress ? <StyledCardButton labelStyle={{ color: colors.backgroundColor }} mode='contained' contentStyle={{ padding: 3 }} onPress={props.onViewPress}>View</StyledCardButton> : null}
                    {props.onSherePress ? <StyledView><StyledCardIcon name='share-outline' /></StyledView> : null}
                </StyledCardAction>
            </StyledCard>
        </Animatable.View>
    )
};

export default CardComponent;