import React, { useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
    StyledParagraph,
    StyledStatus,
} from './style';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import OutsideAuthApi from '../../services/outSideAuth';
import ListItem from '../../sharedComponents/listItem';
import Loader from '../../sharedComponents/loader';
import { dateFormat, timeFormat } from '../../utils';
import { TouchableOpacity } from 'react-native';

const Booking = (props) => {
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const apiCall = () => {
        setData([]);
        if (props.myUser) {
            setLoading(true);
            InsideAuthApi(authStore)
                .bookingListApi('')
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err?.message
                    }));
                    setLoading(false);
                });
        } else {
            setLoading(true);
            OutsideAuthApi()
                .bookingListForAllApi(`?id=${props.route.params?.id}`)
                .then((res) => {
                    setData(res.data);
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
    }

    useEffect(() => {
        apiCall()
    }, [props.modalShow])


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
        </StyledHorizontalScrollView>
    )
};

export default Booking;