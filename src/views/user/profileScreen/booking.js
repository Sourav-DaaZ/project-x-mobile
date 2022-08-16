import React, { useState, useEffect } from 'react';
import {
    StyledButtonLoadMore,
    StyledHorizontalScrollView,
    StyledParagraph,
    StyledStatus,
} from './style';
import InsideAuthApi from '../../../services/inSideAuth';
import Card from '../../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../../store/actions';
import OutsideAuthApi from '../../../services/outSideAuth';
import ListItem from '../../../sharedComponents/listItem';
import Loader from '../../../sharedComponents/loader';
import { dateFormat, timeFormat } from '../../../utils';
import { TouchableOpacity } from 'react-native';
import defaultValue from '../../../constants/defaultValue';

const Booking = (props) => {
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(true);

    const apiCall = (pageCount) => {
        if (props.myUser) {
            InsideAuthApi(authStore)
                .bookingListApi(`?page=${pageCount}`)
                .then((res) => {
                    if (res.data && pageCount > 0) {
                        let varData = data;
                        if (res.data instanceof Array) {
                        varData = varData.concat(res.data)
                    } else {
                        varData = varData.push(res.data)
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
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err?.message ? err.message : ''
                    }));
                    setLoading(false);
                });
        } else {
            OutsideAuthApi()
                .bookingListForAllApi(`?id=${props.route.params?.id}&page=${pageCount}`)
                .then((res) => {
                    if (res.data && pageCount > 0) {
                        let varData = data;
                        if (res.data instanceof Array) {
                        varData = varData.concat(res.data)
                    } else {
                        varData = varData.push(res.data)
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
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err?.message ? err.message : ''
                    }));
                    setLoading(false);
                });
        }
    }

    useEffect(() => {
        setData([]);
        setLoading(true);
        setPage(0);
        setDataLoader(true);
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
                            <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(x.startDate) + (x.endDate ? ' - ' + dateFormat(x.endDate) : '') + (x.reportTime ? ' (' + timeFormat(x.reportTime) + ')' : '')} />
                        }
                        title={x.description ? x.description : ''}
                        extraContent={
                            <StyledStatus>
                                <StyledParagraph>{x.status ? "status: " + x.status[x.status.length - 1] : null}</StyledParagraph>
                                <StyledParagraph>{x.status?.map((y, i) => y + (i !== x.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                            </StyledStatus>
                        }
                    />
                </TouchableOpacity>
            )}
            {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: props.colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
        </StyledHorizontalScrollView>
    )
};

export default Booking;