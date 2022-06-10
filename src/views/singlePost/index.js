import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, Text, View } from 'react-native';

import {
    StyledHorizontalScrollView,
    StyledViewButton,
    StyledButtonView,
    StyledButtonActive,
    StyledTouchableOpacity
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import Card from '../../sharedComponents/card';
import Modal from '../../sharedComponents/modal';
import Chat from '../chatScreen';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';

const SingleCategory = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch();
    const [globalPost, setGlobalPost] = useState(true);
    const [cmdPopup, setCmdPopup] = useState(false);
    const [data, setData] = useState([]);


    const GlobalButton = (select, text, onPress) => (
        select ? <StyledButtonActive mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
    )

    useEffect(() => {
        let requestData = {
            category_id: props.route.params.data._id,
            location: {
                lat: 102,
                long: 21
            },
            distance: 500000,
            // gender: "male"
        }
        OutsideAuthApi()
            .getPostsApi(requestData)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err.message
                }))
            });
    }, [])
    return (
        <React.Fragment>
            <StyledViewButton>
                {GlobalButton(globalPost, 'Global Post', () => setGlobalPost(true))}
                {GlobalButton(!globalPost, 'Post Status', () => setGlobalPost(false))}
            </StyledViewButton>
            <StyledHorizontalScrollView>
                {data.map((x, i) =>
                    <Card key={i} title={x.title} message={x.message} onViewPress={() => props.navigation.navigate('Posts', { data: x })} />
                )}
            </StyledHorizontalScrollView>
            <Modal show={cmdPopup} onClose={() => setCmdPopup(false)} title='hi'>
                <Chat />
            </Modal>
        </React.Fragment>
    )
};

export default SingleCategory;