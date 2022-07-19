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
import OutsideAuthApi from '../../services/outSideAuth';
import { BottomShadow } from '../../sharedComponents/bottomShadow';
import { ThemeContext } from 'styled-components';

const Review = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const dispatch = useDispatch();
    const [globalPost, setGlobalPost] = useState(true);
    const [data, setData] = useState([]);


    const GlobalButton = (select, text, onPress) => (
        select ? <StyledButtonActive labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
    )

    useEffect(() => {
        setData([]);
        if (props.myUser) {
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
        } else {
            OutsideAuthApi()
                .getReviewForOtherApi(`?user_id=${props.route.params?.id}`)
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
    }, [globalPost, props])

    return (
        <React.Fragment>
            {props.myUser && authStore.access_token && authStore.access_token !== '' ? <BottomShadow>
                <StyledViewButton>
                    {GlobalButton(globalPost, 'Pbulic Review', () => setGlobalPost(true))}
                    {GlobalButton(!globalPost, 'Private Review', () => setGlobalPost(false))}
                </StyledViewButton>
            </BottomShadow> : null}
            <StyledHorizontalScrollView>
                {data.map((x, i) =>
                    <Card key={i} title={x.description} />
                )}
            </StyledHorizontalScrollView>
        </React.Fragment>
    )
};

export default Review;