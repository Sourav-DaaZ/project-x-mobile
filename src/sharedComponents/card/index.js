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
                {props.profile}
                <StyledCardContent>
                    {props.title ? <StyledCardTitle>{props.title}</StyledCardTitle> : null}
                    {props.message ? <StyledCardParagraph>{props.message}</StyledCardParagraph> : null}
                    {props.extraContent}
                </StyledCardContent>
                <StyledCardAction>
                    {props.onViewPress ? <StyledCardButton labelStyle={{ color: colors.backgroundColor }} mode='contained' contentStyle={{ padding: 3 }} onPress={props.onViewPress}>View</StyledCardButton> : null}
                    {props.onIconPress ? <StyledView onPress={props.onIconPress}>{props.icon}</StyledView> : null}
                    {props.actionItem}
                </StyledCardAction>
            </StyledCard>
        </Animatable.View>
    )
};

export default CardComponent;