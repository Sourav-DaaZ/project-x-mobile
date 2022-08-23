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
import { snackbarUpdate } from '../../../store/actions';
import InsideAuthApi from '../../../services/inSideAuth';
import Routes from '../../../constants/routeConst';
import Loader from '../../../sharedComponents/loader';
import { Avatar, Divider, Menu } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import ListItem from '../../../sharedComponents/listItem';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';

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
        const varParam = {
            application_id: props.route.params?.id ? props.route.params.id : ''
        }
        InsideAuthApi(authStore)
            .getApplicationDetailsApi(varParam)
            .then((res) => {
                setData(res.data);
                setShowLoader(false);
            })
            .catch((err) => {
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
                setShowLoader(false);
            });
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
                dispatch(snackbarUpdate({
                    type: 'success',
                    msg: res.message
                }));
                setShowMenu(false);
                props.navigation.goBack();
            })
            .catch((err) => {
                setLoading(false);
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }))
            });
    }

    return (
        showLoader ? <Loader /> : <ShadowWrapperContainer none {...props}>
            <StyledImageBackground resizeMode='cover' blurRadius={10} source={{ uri: data.images && data.images[0] ? data.images[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }}>
                <StyledCardCover source={{ uri: data.images && data.images[0] ? data.images[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
            </StyledImageBackground>
            <StyledCard animation='flipInX'>
                <StyledCardContent>
                    {data?.created_by?.userId && data.visible ? <TouchableOpacity onPress={() => props.navigation.navigate(Routes.profile, { id: data.created_by?._id })}><ListItem image={<Avatar.Image size={50} source={{ uri: data.created_by?.images && data.created_by.images[0] ? data.created_by.images[0] : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' }} />} title={data.created_by?.userId} /></TouchableOpacity> : null}
                    <StyledInlineContainer>
                        <StyledInlineLeft>
                            <StyledCardTitle style={{ marginBottom: 5 }}>{data?.details}</StyledCardTitle>
                        </StyledInlineLeft>
                        <StyledInlineRight>
                            {data?.expectedPrice ? <StyledCardTitle style={{ textAlign: 'right' }}>{data.expectedPrice} Rs</StyledCardTitle> : null}
                            {data?.genderSpecific && data.genderSpecific.toLowerCase() !== 'all' ? <StyledCardParagraph style={{ textAlign: 'right' }}>({data.genderSpecific} only)</StyledCardParagraph> : null}
                        </StyledInlineRight>
                    </StyledInlineContainer>
                </StyledCardContent>
                <StyledCardAction>
                    <StyledCardButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} disabled={data && detailsStore.id === ''} onPress={() => props.navigation.navigate(Routes.appChat, { id: data._id, name: data.details })}>Chat</StyledCardButton>
                    {detailsStore.id === data.created_by?._id ? <TouchableOpacity onPress={() => setShowMenu(true)}>
                        <Menu
                            visible={showMenu}
                            onDismiss={() => setShowMenu(false)}
                            anchor={<StyledDotIcon name='dots-three-vertical' size={25} />}
                        >
                            <Menu.Item onPress={() => {
                                props.navigation.navigate(Routes.editApplication, { data: data, image: data.images })
                                setShowMenu(false);
                            }} title="Edit Application" />
                            <Divider />
                            <Menu.Item onPress={deletePost} title="Delete Application" />
                        </Menu>
                    </TouchableOpacity> : null}
                </StyledCardAction>
            </StyledCard>
        </ShadowWrapperContainer>
    )
}

export default ApplicationDetails;