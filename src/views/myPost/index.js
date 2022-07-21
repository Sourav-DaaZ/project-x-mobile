import React, { useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
} from './style';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, loader } from '../../store/actions';
import Routes from '../../constants/routeConst';
import { ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';

const MyPost = (props) => {
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);


    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            setData([]);
            dispatch(loader(true));
            InsideAuthApi(authStore)
                .getMyPostApi('')
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
        })
        return () => unsubscribe
    }, [])

    return (
        <ShadowWrapperContainer>
            <StyledHorizontalScrollView>
                {data.map((x, i) =>
                    <Card key={i} title={x.title} message={x.message} onViewPress={() => props.navigation.navigate(Routes.postDetails, { id: x._id })} />
                )}
            </StyledHorizontalScrollView>
        </ShadowWrapperContainer>
    )
};

export default MyPost;