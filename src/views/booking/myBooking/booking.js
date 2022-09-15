import React, { useContext, useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
    StyledParagraph,
    StyledStatus,
    StyledButtonLoadMore
} from './style';
import InsideAuthApi from '../../../services/inSideAuth';
import Card from '../../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import ListItem from '../../../sharedComponents/listItem';
import Loader from '../../../sharedComponents/loader';
import { ThemeContext } from 'styled-components';
import { dateFormat, timeFormat } from '../../../utils';
import { TouchableOpacity } from 'react-native';
import defaultValue from '../../../constants/defaultValue';

const Booking = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(true);
    const [loading, setLoading] = useState(false);


    const apiCall = (pageCount) => {
        let varParam = {
            myBooking: true,
            page: pageCount
        }
        if (props.bookingType) {
            varParam = {
                myBooking: true,
                past: true,
                page: pageCount
            }
        }
        InsideAuthApi(authStore)
            .bookingListApi(varParam)
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
        setPage(0);
        setDataLoader(true);
        setLoading(true);
        apiCall(0);
    }, [props.modalShow, props.bookingType])

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
            {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
        </StyledHorizontalScrollView>
    )
};

export default Booking;