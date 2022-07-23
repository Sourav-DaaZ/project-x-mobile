import React, { useContext, useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
    StyledButtonLoadMore
} from './style';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, loader } from '../../store/actions';
import Routes from '../../constants/routeConst';
import { ThemeContext } from 'styled-components';
import Loader from '../../sharedComponents/loader';

const MyPost = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [dataLoader, setDataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [showLoader, setShowLoader] = useState(true);

    const apiCall = (pageCount) => {
        InsideAuthApi(authStore)
            .getMyPostApi(`?page=${page}`)
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
                setShowLoader(false);
            })
            .catch((err) => {
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err.message
                }));
                setShowLoader(false);
            });
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            setData([]);
            setShowLoader(true);
            apiCall(0)
        })
        return () => unsubscribe
    }, [])

    useEffect(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])


    return (
        showLoader ? <Loader /> :
            <StyledHorizontalScrollView>
                {data.map((x, i) =>
                    <Card key={i} title={x.title} message={x.message} onViewPress={() => props.navigation.navigate(Routes.postDetails, { id: x._id })} />
                )}
                {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
            </StyledHorizontalScrollView>
    )
};

export default MyPost;