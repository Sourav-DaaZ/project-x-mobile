import React, { useContext, useState, useEffect } from 'react';
import {
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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setData([]);
        setLoading(true);
        InsideAuthApi(authStore)
            .getReviewApi()
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
                            <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(x.createdAt) + ` (${x.isPublic ? 'public' : 'private'})`} />
                        }
                        title={x.description ? x.description : ''}
                    />
                </TouchableOpacity>
            )}
        </StyledHorizontalScrollView>
    )
};

export default Review;