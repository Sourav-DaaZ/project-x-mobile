import React, { useContext, useState, useEffect } from 'react';
import {
    StyledButtonLoadMore,
    StyledHorizontalScrollView,
} from './style';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import ListItem from '../../sharedComponents/listItem';
import Loader from '../../sharedComponents/loader';
import { dateFormat } from '../../utils';
import { TouchableOpacity } from 'react-native';

const Review = (props) => {
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(true);

    const apiCall = (pageCount) => {
        InsideAuthApi(authStore)
            .getReviewApi('?page=' + pageCount)
            .then((res) => {
                if (res.data && pageCount > 0) {
                    let varData = data;
                    varData = varData.concat(res.data)
                    setData(varData);
                } else {
                    setData(res.data);
                }
                if (res.data && res.data.length === 0) {
                    setDataLoader(false)
                }
                setLoading(false);
            })
            .catch((err) => {
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err?.message
                }));
                setLoading(false);
            });
    }

    useEffect(() => {
        setData([]);
        setLoading(true);
        apiCall(0);
    }, [props.modalShow])


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
                        title={x.description ? x.description : ''}
                    />
                </TouchableOpacity>
            )}
            {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: props.colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
        </StyledHorizontalScrollView>
    )
};

export default Review;