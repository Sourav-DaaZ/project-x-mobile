import React, { useContext, useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
    StyledCardIcon,
    StyledButtonLoadMore
} from './style';
import InsideAuthApi from '../../../services/inSideAuth';
import Card from '../../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import Routes from '../../../constants/routeConst';
import { ThemeContext } from 'styled-components';
import Loader from '../../../sharedComponents/loader';
import defaultValue from '../../../constants/defaultValue';
import { useIsFocused } from '@react-navigation/native';

const ApplicationList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [dataLoader, setDataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [showLoader, setShowLoader] = useState(false);

    const apiCall = (pageCount) => {
        const varParam = {
            post_id: props.route.params?.id ? props.route.params.id : '',
            page: pageCount
        }
        setShowLoader(true);
        InsideAuthApi(authStore)
            .getAllApplicationsApi(varParam)
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
                setShowLoader(false);
            })
            .catch((err) => {
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
                setShowLoader(false);
            });
    }

    useEffect(() => {
        setData([]);
        apiCall(0)
    }, [isFocused])

    useEffect(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])

    return (
        showLoader ? <Loader /> :
            <StyledHorizontalScrollView>
                {data && data.map((x, i) =>
                    <Card key={i} images={x.images && x.images[0] ? x.images[0] : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} title={x.details} icon={<StyledCardIcon name='chatbox-outline' />} onIconPress={() => props.navigation.navigate(Routes.appChat, { id: x._id, name: x.details })} onViewPress={() => props.navigation.navigate(Routes.applicationDetails, { id: x._id })} />
                )}
                {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
            </StyledHorizontalScrollView>
    )
};

export default ApplicationList;