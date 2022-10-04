import React, { useContext, useState, useEffect, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar } from 'react-native-paper';
import { RefreshControl, TouchableOpacity } from 'react-native';
import {
    StyledButtonLoadMore,
    StyledScrollView,
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { timeFormat } from '../../utils'

import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import Routes from '../../constants/routeConst';
import ListItem from '../../sharedComponents/listItem';
import Loader from '../../sharedComponents/loader';
import { snackbarUpdate } from '../../store/actions';
import defaultValue from '../../constants/defaultValue';

const NotificationScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(true);

    const apiCall = (pageCount) => {
        const varParam = {
            lat: detailsStore.location.lat,
            long: detailsStore.location.long,
            categoryPreference: JSON.stringify(detailsStore.expectedCat),
            page: pageCount
        }
        OutsideAuthApi()
            .myNotificationApi(varParam)
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
                setShowLoader(false);
            })
            .catch((err) => {
                setShowLoader(false);
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            });
    }

    useMemo(() => {
        if (isFocused && !refreshing) {
            setShowLoader(true);
            setPage(0);
            setDataLoader(true);
            apiCall(0)
        }
    }, [isFocused, refreshing])

    useMemo(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])

    const refreshFnc = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 200);
    }


    return (
        <DashboardLayout {...props}>
            {showLoader ? <Loader /> : <StyledScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
                }
            >
                {data.map((x, i) => (
                    <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes[x.data.route], { id: x.data.id })}>
                        <ListItem
                            title={(x.data.userVisible && x.created_by.userInfo ? x.created_by.userInfo.name.toLowerCase() + ' ' : "Someone ") + (x.data.title ? x.data.title : '')}
                            description={timeFormat(x.createdAt)}
                            image={x.data.userVisible && x.created_by.userInfo ? <Avatar.Image style={{ margin: spacing.width }} size={spacing.width * 15} source={{ uri: x?.created_by?.userInfo?.images && x.data.userVisible ? x.created_by.userInfo.images : "https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png" }} /> : null}
                        />
                    </TouchableOpacity>
                ))}
                {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
            </StyledScrollView>}
        </DashboardLayout>
    )
}
export default React.memo(NotificationScreen);