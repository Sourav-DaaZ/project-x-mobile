import React, { useState, useEffect } from 'react';
import {
    StyledButtonLoadMore,
    StyledHorizontalScrollView,
} from './style';
import InsideAuthApi from '../../../services/inSideAuth';
import Card from '../../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import ListItem from '../../../sharedComponents/listItem';
import Loader from '../../../sharedComponents/loader';
import { dateFormat } from '../../../utils';
import { TouchableOpacity } from 'react-native';
import defaultValue from '../../../constants/defaultValue';

const Review = (props) => {
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(true);

    const apiCall = (pageCount) => {
        const varParam = {
            page: pageCount,
            isPublic: props.globalPost === 'public' ? true : props.globalPost === 'private' ? false : false,
            ...props.globalPost === 'myReview' && { myReview: true }
        }
        InsideAuthApi(authStore)
            .getReviewApi(varParam)
            .then((res) => {
                if (res.data && pageCount > 0) {
                    let varData = data;
                    if (res.data instanceof Array) {
                        varData = varData.concat(res.data)
                    } else {
                        varData.push(res.data)
                    }
                    setData(varData);
                } else {
                    setData(res.data);
                }
                if (res.data && res.data.length < defaultValue.paginationLength) {
                    setDataLoader(false)
                }
                setLoading(false);
            })
            .catch((err) => {
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
                setLoading(false);
            });
    }

    useEffect(() => {
        if (!props.modalShow) {
            setData([]);
            setLoading(true);
            apiCall(0);
        }
    }, [props.modalShow, props.globalPost, props.isFocused])


    useEffect(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])

    return (
        loading ? <Loader /> : <StyledHorizontalScrollView>
            {data.map((x, i) =>
                <TouchableOpacity key={i} onPress={() => {
                    props.setPopupData(x);
                    props.setModalShow(true);
                }}>
                    <Card
                        profile={
                            <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(x.createdAt) + ` (${x.isPublic ? 'public' : 'private'})`} />
                        }
                        review={x.rating ? x.rating : 0}
                        title={x.description ? x.description : ''}
                    />
                </TouchableOpacity>
            )}
            {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: props.colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
        </StyledHorizontalScrollView>
    )
};

export default Review;