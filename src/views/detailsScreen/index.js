import React, { useEffect, useState } from 'react';

import {
    StyledCard,
    StyledCardContent,
    StyledCardAction,
    StyledCardTitle,
    StyledCardParagraph,
    StyledCardCover,
    StyledCardButton,
    StyledCardIcon,
    StyledDotIcon
} from './style';
import { TouchableOpacity } from 'react-native';

import { Menu, Divider } from 'react-native-paper';

const DetailsScreen = (props) => {
    const [data, setData] = useState({});
    const [showMenu, setShowMenu] = useState(false);
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
                <StyledCardButton mode='contained' onPress={() => props.navigation.navigate('ApplyPost', { data: data })}>Apply</StyledCardButton>
                <TouchableOpacity onPress={() => props.navigation.navigate('Chat')}><StyledCardIcon name='chatbox-outline' /></TouchableOpacity>
                <TouchableOpacity onPress={() => setShowMenu(true)}>
                    <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={<StyledDotIcon name='dots-three-vertical' size={25} />}
                    >
                        <Menu.Item onPress={() => { }} title="Item 1" />
                        <Menu.Item onPress={() => { }} title="Item 2" />
                        <Divider />
                        <Menu.Item onPress={() => { }} title="Item 3" />
                    </Menu>
                </TouchableOpacity>
            </StyledCardAction>
        </StyledCard>
    )
}
export default DetailsScreen;