import React, { useContext, useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
    StyledViewButton,
    StyledButtonView,
    StyledButtonActive,
    StyledTouchableOpacity
} from './style';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, loader } from '../../store/actions';

const Review = (props) => {
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const dispatch = useDispatch();
    const [globalPost, setGlobalPost] = useState(true);
    const [data, setData] = useState([]);


    const GlobalButton = (select, text, onPress) => (
        select ? <StyledButtonActive mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
    )

    useEffect(() => {
        setData([]);
        dispatch(loader(true));
        if (globalPost) {
            InsideAuthApi(authStore)
                .getReviewApi('?isPublic=true')
                .then((res) => {
                    setData(res.data);
                    dispatch(loader(false));
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err.message
                    }));
                    dispatch(loader(false));
                });
        } else {
            InsideAuthApi(authStore)
                .getReviewApi('?isPublic=false')
                .then((res) => {
                    setData(res.data);
                    dispatch(loader(false));
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err.message
                    }));
                    dispatch(loader(false));
                });
        }
    }, [globalPost])

    return (
        <React.Fragment>
            {authStore.access_token && authStore.access_token !== '' ? <StyledViewButton>
                {GlobalButton(globalPost, 'Pbulic Review', () => setGlobalPost(true))}
                {GlobalButton(!globalPost, 'Private Review', () => setGlobalPost(false))}
            </StyledViewButton> : null}
            <StyledHorizontalScrollView>
                {data.map((x, i) =>
                    <Card key={i} message={x.description} />
                )}
            </StyledHorizontalScrollView>
        </React.Fragment>
    )
};

export default Review;