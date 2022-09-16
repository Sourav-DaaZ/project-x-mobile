import React, { useContext } from 'react';
import { View } from 'react-native';
import { StyledProfileView, StyledTitle, StyledParagraph, StyledParagraphBold } from './style';


export default ListItem = (props) => {
    return (
        <StyledProfileView style={props.topStyle} animation='zoomIn'>
            {props.image}
            <View style={{ marginLeft: 10 }}>
                {props.title ? <StyledTitle>{props.title}</StyledTitle> : null}
                {!props.descriptionBold && props.description ? <StyledParagraph>{props.description}</StyledParagraph> : null}
                {props.descriptionBold ? <StyledParagraphBold>{props.descriptionBold}</StyledParagraphBold> : null}
                {props.smallDescription ? <StyledParagraph>{props.smallDescription}</StyledParagraph> : null}
            </View>
        </StyledProfileView>
    );
};
