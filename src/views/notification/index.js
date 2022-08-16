import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
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
import { SnackbarUpdate } from '../../store/actions';
import defaultValue from '../../constants/defaultValue';

const NotificationScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const colors = themeContext.colors[themeContext.baseColor];
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(true);

    const apiCall = (pageCount) => {
        OutsideAuthApi()
            .myNotificationApi(`?lat=${detailsStore.location.lat}&long=${detailsStore.location.long}&categoryPreference=${JSON.stringify(detailsStore.expectedCat)}&page=${pageCount}`)
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
                setShowLoader(false);
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            });
    }

    useEffect(() => {
        if (isFocused) {
            setShowLoader(true);
            setPage(0);
            setDataLoader(true);
            apiCall(0)
        }
    }, [isFocused, refreshing])

    useEffect(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])


    return (
        <DashboardLayout {...props} fab={false} refreshFnc={() => setRefreshing(!refreshing)}>

            {showLoader ? <Loader /> : <StyledScrollView>
                {data.map((x, i) => (
                    <TouchableOpacity key={i} style={{ borderBottom: '2px solid blue' }} onPress={() => props.navigation.navigate(Routes[x.data.route], { id: x.data.id })}>
                        <ListItem
                            title={(x.data.userVisible && x.created_by.userInfo ? x.created_by.userInfo.name.toLowerCase() + ': ' : "") + (x.data.title ? x.data.title : '')}
                            description={timeFormat(x.createdAt)}
                            image={x.data.userVisible && x.created_by.userInfo ? <Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: x.images && x.data.userVisible ? x.images : "https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png" }} /> : null}
                        />
                    </TouchableOpacity>
                ))}
                {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
            </StyledScrollView>}
        </DashboardLayout>
    )
}
export default NotificationScreen;