import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import {
    StyledButtonLoadMore,
    StyledScrollView,
} from './style';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { timeFormat } from '../../../utils'

import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import Routes from '../../../constants/routeConst';
import ListItem from '../../../sharedComponents/listItem';
import Loader from '../../../sharedComponents/loader';
import { SnackbarUpdate } from '../../../store/actions';
import InsideAuthApi from '../../../services/inSideAuth';

const ChatScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const colors = themeContext.colors[themeContext.baseColor];
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(true);
    const detailsStore = useSelector((state) => state.details, shallowEqual);

    const apiCall = (pageCount) => {
        InsideAuthApi()
            .myChatListApi('?page=' + pageCount)
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
                setShowLoader(false);
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err?.message
                }));
            });
    }

    useEffect(() => {
        if (isFocused) {
            setShowLoader(true);
            apiCall(0)
        }
    }, [isFocused])

    useEffect(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])


    return (
        showLoader ? <Loader /> : <StyledScrollView>
            {data.map((x, i) => (
                <TouchableOpacity key={i} style={{ borderBottom: '2px solid blue' }} onPress={() => props.navigation.navigate(Routes.userChat, { id: detailsStore.id !== x.sender_user_id._id ? x.sender_user_id?._id : x.receiver_user_id?._id })}>
                    <ListItem
                        title={(detailsStore.id !== x.sender_user_id._id ? x.sender_user_id?.userId : x.receiver_user_id?.userId)}
                        description={x?.comments ? x.comments[0]?.msg : ''}
                        smallDescription={timeFormat(x?.updatedAt)}
                        image={<Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: detailsStore.id !== x.sender_user_id._id ? x.sender_user_id.userInfo.images : x.receiver_user_id.userInfo.images }} />}
                    />
                </TouchableOpacity>
            ))}
            {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
        </StyledScrollView>
    )
}
export default ChatScreen;