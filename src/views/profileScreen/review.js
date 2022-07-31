import React, { useContext, useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
    StyledViewButton,
    StyledButtonView,
    StyledButtonActive,
    StyledTouchableOpacity,
    StyledParagraph,
    StyledInput,
    StyledStatus,
    StyledNotesView
} from './style';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import OutsideAuthApi from '../../services/outSideAuth';
import { BottomShadow } from '../../sharedComponents/bottomShadow';
import ListItem from '../../sharedComponents/listItem';
import Loader from '../../sharedComponents/loader';
import { ThemeContext } from 'styled-components';
import { Avatar, FAB } from 'react-native-paper';
import Input from '../../sharedComponents/input';
import { dateFormat } from '../../utils';

const Review = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setData([]);
        setLoading(true);
        if (props.myUser) {
            if (1) {
                InsideAuthApi(authStore)
                    .bookingListApi()
                    .then((res) => {
                        setData(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        dispatch(SnackbarUpdate({
                            type: 'error',
                            msg: err.message
                        }));
                        setLoading(false);
                    });
            } else {
                InsideAuthApi(authStore)
                    .getReviewApi('?isPublic=false')
                    .then((res) => {
                        setData(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        dispatch(SnackbarUpdate({
                            type: 'error',
                            msg: err.message
                        }));
                        setLoading(false);
                    });
            }
        } else {
            OutsideAuthApi()
                .getReviewForOtherApi(`?user_id=${props.route.params?.id}`)
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err.message
                    }));
                    setLoading(false);
                });

        }
    }, [])

    return (
        loading ? <Loader /> : <StyledHorizontalScrollView>
            {data.map((x, i) =>
                <Card
                    key={i}
                    profile={<ListItem topStyle={{ marginBottom: 0 }} title={dateFormat(x.updatedAt)} />}
                    title={x.description ? x.description : ''}
                    extraContent={
                        <React.Fragment>
                            <StyledStatus>
                                <StyledParagraph>{x.status ? "status: " + x.status[x.status.length - 1] : null}</StyledParagraph>
                                <StyledParagraph>{x.status?.map((y, i) => y + (i !== x.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                            </StyledStatus>
                            <StyledNotesView>
                                <StyledParagraph style={{ textAlign: 'center' }}>Notes:</StyledParagraph>
                                {x.notes?.map((y, i) => <StyledParagraph key={i} map={i}>{detailsStore.id === y.user ? 'Me' : 'User'}: {y.msg}</StyledParagraph>)}
                            </StyledNotesView>
                        </React.Fragment>}
                    actionItem={
                        <StyledInput styleView={{
                            borderBottomWidth: 0
                        }} ele='input' placeholder='Please add a note' />
                    } />
            )}
        </StyledHorizontalScrollView>
    )
};

export default Review;