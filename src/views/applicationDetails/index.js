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
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, loader } from '../../store/actions';
import InsideAuthApi from '../../services/inSideAuth';

const ApplicationDetails = (props) => {
    const [data, setData] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            dispatch(loader(true));
            InsideAuthApi(authStore)
                .getApplicationDetailsApi(props.route.params?.id)
                .then((res) => {
                    setData(res.data);
                    dispatch(loader(false));
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err.message
                    }));
                    dispatch(loader(false));
                });
        })
        return () => unsubscribe
    }, [])

    const deletePost = () => {
        const requestData = {
            post_id: data._id,
            delete_post: true
        }
        InsideAuthApi(authStore)
            .updatePost(requestData)
            .then((res) => {
                dispatch(loader(false));
                dispatch(SnackbarUpdate({
                    type: 'success',
                    msg: res.message
                }));
                setShowMenu(false);
                props.navigation.goBack();
            })
            .catch((err) => {
                dispatch(loader(false));
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err.message
                }))
            });
    }

    return (
        <StyledCard>
            {data.images && data.images[0] ? <StyledCardCover source={{ uri: data.images[0] }} resizeMode='contain' /> : null}
            <StyledCardContent>
                <StyledCardTitle>{data?.details}</StyledCardTitle>
                {data?.expectedPrice ? <StyledCardParagraph>Expected Cost: <StyledCardTitle style={{
                    fontSize: 18,
                }}>{data.expectedPrice} Rs.</StyledCardTitle></StyledCardParagraph> : null}
                {data?.created_by?.userId ? <StyledCardParagraph>Created By: <StyledCardTitle style={{
                    fontSize: 18,
                }}>{data.created_by.userId}</StyledCardTitle></StyledCardParagraph> : null}
            </StyledCardContent>
            <StyledCardAction>
                <StyledCardButton mode='contained'>Apply</StyledCardButton>
                <TouchableOpacity onPress={() => props.navigation.navigate('Chat')}><StyledCardIcon name='chatbox-outline' /></TouchableOpacity>
                <TouchableOpacity onPress={() => setShowMenu(true)}>
                    <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={<StyledDotIcon name='dots-three-vertical' size={25} />}
                    >
                        <Menu.Item onPress={() => {
                            props.navigation.navigate('EditPost', { data: data })
                            setShowMenu(false);
                        }} title="Edit Post" />
                        <Divider />
                        <Menu.Item onPress={deletePost} title="Delete Post" />
                    </Menu>
                </TouchableOpacity>
            </StyledCardAction>
        </StyledCard>
    )
}
export default ApplicationDetails;