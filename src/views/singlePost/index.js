import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, Text, View } from 'react-native';

import {
    StyledHorizontalScrollView,
    StyledViewButton,
    StyledButtonView,
    StyledButtonActive,
    StyledTouchableOpacity
} from './style';

import Card from '../../sharedComponents/card';

import Modal from '../../sharedComponents/modal';
import Chat from '../chatScreen'

const SinglePost = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];

    const [globalPost, setGlobalPost] = useState(true);
    const [cmdPopup, setCmdPopup] = useState(false);


    const GlobalButton = (select, text, onPress) => (
        select ? <StyledButtonActive mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
    )

    return (
        <React.Fragment>
            <StyledViewButton>
                {GlobalButton(globalPost, 'Global Post', () => setGlobalPost(true))}
                {GlobalButton(!globalPost, 'Post Status', () => setGlobalPost(false))}
            </StyledViewButton>
            <StyledHorizontalScrollView>
                <TouchableOpacity onPress={() => setCmdPopup(true)}>
                    <Card />
                </TouchableOpacity>
            </StyledHorizontalScrollView>
            <Modal show={cmdPopup} onClose={() => setCmdPopup(false)} title='hi'>
                <Chat />
            </Modal>
        </React.Fragment>
    )
};

export default SinglePost;