import React, { useEffect, useState, useContext } from 'react';

import {
    StyledCard,
    StyledCardContent,
    StyledCardAction,
    StyledCardTitle,
    StyledCardParagraph,
    StyledCardCover,
    StyledCardButton,
    StyledInlineContainer,
    StyledInlineLeft,
    StyledInlineRight,
    StyledDotIcon,
    StyledImageBackground
} from './style';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { SnackbarUpdate } from '../../store/actions';
import InsideAuthApi from '../../services/inSideAuth';
import Routes from '../../constants/routeConst';
import Loader from '../../sharedComponents/loader';
import { Divider, Menu } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

const ApplicationDetails = (props) => {
    const [data, setData] = useState({});
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [showLoader, setShowLoader] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            InsideAuthApi(authStore)
                .getApplicationDetailsApi(props.route.params?.id)
                .then((res) => {
                    setData(res.data);
                    setShowLoader(false);
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err.message
                    }));
                    setShowLoader(false);
                });
        })
        return () => unsubscribe
    }, [])

    const deletePost = () => {
        const requestData = {
            post_id: data._id,
            delete_post: true
        }
        setLoading(true);
        InsideAuthApi(authStore)
            .updatePost(requestData)
            .then((res) => {
                setLoading(false);
                dispatch(SnackbarUpdate({
                    type: 'success',
                    msg: res.message
                }));
                setShowMenu(false);
                props.navigation.goBack();
            })
            .catch((err) => {
                setLoading(false);
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err.message
                }))
            });
    }

    return (
        showLoader ? <Loader /> : <React.Fragment>
            <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: data.images && data.images[0] ? data.images[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}>
                <StyledCardCover source={{ uri: data.images && data.images[0] ? data.images[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
            </StyledImageBackground>
            <StyledCard animation='flipInX'>
                <StyledCardContent>
                    <StyledInlineContainer>
                        <StyledInlineLeft>
                            <StyledCardTitle style={{ marginBottom: 5 }}>{data?.details}</StyledCardTitle>
                        </StyledInlineLeft>
                        <StyledInlineRight>
                            {data?.expectedPrice ? <StyledCardTitle style={{ textAlign: 'right' }}>{data.expectedPrice} Rs</StyledCardTitle> : null}
                            {data?.genderSpecific && data.genderSpecific.toLowerCase() !== 'all' ? <StyledCardParagraph style={{ textAlign: 'right' }}>({data.genderSpecific} only)</StyledCardParagraph> : null}
                        </StyledInlineRight>
                    </StyledInlineContainer>
                    {data?.created_by?.userId ? <StyledCardParagraph>Created By: {data.created_by.userId}</StyledCardParagraph> : null}
                </StyledCardContent>
                <StyledCardAction>
                    <StyledCardButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} disabled={data && detailsStore.id === ''} onPress={() => props.navigation.navigate(Routes.appChat, { id: data._id })}>Chat</StyledCardButton>
                    {detailsStore.id === data.created_by?._id ? <TouchableOpacity onPress={() => setShowMenu(true)}>
                        <Menu
                            visible={showMenu}
                            onDismiss={() => setShowMenu(false)}
                            anchor={<StyledDotIcon name='dots-three-vertical' size={25} />}
                        >
                            <Menu.Item onPress={() => {
                                props.navigation.navigate(Routes.editApplication, { data: data })
                                setShowMenu(false);
                            }} title="Edit Application" />
                            <Divider />
                            <Menu.Item onPress={deletePost} title="Delete Application" />
                        </Menu>
                    </TouchableOpacity> : null}
                </StyledCardAction>
            </StyledCard>
        </React.Fragment>
    )
}

export default ApplicationDetails;