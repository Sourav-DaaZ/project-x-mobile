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
    StyledDotIcon,
    StyledInlineLeft,
    StyledInlineRight,
    StyledImageBackground
} from './style';
import { TouchableOpacity } from 'react-native';

import { Menu, Divider, Avatar } from 'react-native-paper';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { snackbarUpdate } from '../../../store/actions';
import OutsideAuthApi from '../../../services/outSideAuth';
import InsideAuthApi from '../../../services/inSideAuth';
import Routes from '../../../constants/routeConst';
import Loader from '../../../sharedComponents/loader';
import ListItem from '../../../sharedComponents/listItem'
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import { useIsFocused } from '@react-navigation/native';

const PostDetails = (props) => {
    const [data, setData] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const themeContext = useContext(ThemeContext);
    const isFocused = useIsFocused();
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        const varParam = {
            post_id: props.route.params?.id ? props.route.params.id : ''
        }
        setShowLoader(true);
        OutsideAuthApi()
            .getPostDetailsApi(varParam)
            .then((res) => {
                setData(res.data);
                setShowLoader(false)
            })
            .catch((err) => {
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
                setShowLoader(false)
            });
    }, [isFocused])

    const deletePost = () => {
        const requestData = {
            post_id: data._id,
            delete_post: true
        }
        setShowLoader(true);
        InsideAuthApi(authStore)
            .updatePost(requestData)
            .then((res) => {
                setShowLoader(false)
                dispatch(snackbarUpdate({
                    type: 'success',
                    msg: res.message
                }));
                setShowMenu(false);
                props.navigation.goBack();
            })
            .catch((err) => {
                setShowLoader(false)
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
                    {data?.owner?._id && data.visible ? <TouchableOpacity onPress={() => props.navigation.navigate(Routes.profile, { id: data?.owner?.user })}><ListItem image={<Avatar.Image size={50} source={{ uri: data?.owner?.images ? data.owner.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' }} />} title={data.owner?.name} /></TouchableOpacity> : null}
                    <StyledInlineContainer>
                        <StyledInlineLeft>
                            <StyledCardTitle style={{ marginBottom: 5 }}>{data?.title}</StyledCardTitle>
                        </StyledInlineLeft>
                        <StyledInlineRight>
                            {data?.expectedPrice ? <StyledCardTitle style={{ textAlign: 'right' }}>{data.expectedPrice} Rs</StyledCardTitle> : null}
                            {data?.genderSpecific && data.genderSpecific.toLowerCase() !== 'all' ? <StyledCardParagraph style={{ textAlign: 'right' }}>({data.genderSpecific} only)</StyledCardParagraph> : null}
                        </StyledInlineRight>
                    </StyledInlineContainer>
                    <StyledCardParagraph>{data?.message}</StyledCardParagraph>
                </StyledCardContent>
                <StyledCardAction>
                    <StyledCardButton labelStyle={{ color: colors.backgroundColor }} mode='contained' disabled={data.length === 0 || detailsStore.id === ''} onPress={() => detailsStore.id === data.owner?.user ? props.navigation.navigate(Routes.applicationList, { id: data._id }) : props.navigation.navigate(Routes.createApplication, { id: data._id })}>{detailsStore.id === data.owner?.user ? 'View' : 'Apply'}</StyledCardButton>
                    {detailsStore.id === data.owner?.user ? <TouchableOpacity onPress={() => setShowMenu(true)}>
                        <Menu
                            visible={showMenu}
                            onDismiss={() => setShowMenu(false)}
                            anchor={<StyledDotIcon name='dots-three-vertical' size={25} />}
                        >
                            <Menu.Item onPress={() => {
                                props.navigation.navigate(Routes.editPost, { data: data, image: data.images })
                                setShowMenu(false);
                            }} title="Edit Post" />
                            <Divider />
                            <Menu.Item onPress={deletePost} title="Delete Post" />
                        </Menu>
                    </TouchableOpacity> : null}
                </StyledCardAction>
            </StyledCard>
        </ShadowWrapperContainer>
    )
}
export default PostDetails;