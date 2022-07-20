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
    StyledInlineRight
} from './style';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { SnackbarUpdate } from '../../store/actions';
import InsideAuthApi from '../../services/inSideAuth';
import Routes from '../../constants/routeConst';
import Loader from '../../sharedComponents/loader';

const ApplicationDetails = (props) => {
    const [data, setData] = useState({});
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [showLoader, setShowLoader] = useState(true);
    const [loading, setLoading] = useState(false);
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
            <StyledCardCover source={{ uri: data.images && data.images[0] ? data.images[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' }} resizeMode='contain' />
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
                {detailsStore.id === data.created_by?._id ? <StyledCardAction>
                    <StyledCardButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} disabled={data && detailsStore.id === ''} onPress={() => props.navigation.navigate(Routes.editApplication, { data: data })}>Edit</StyledCardButton>
                    <StyledCardButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} disabled={data && detailsStore.id === ''} onPress={!loading ? deletePost : null}>Delete</StyledCardButton>
                </StyledCardAction> : null}
            </StyledCard>
        </React.Fragment>
    )
}

export default ApplicationDetails;