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

import Routes from '../../../constants/routeConst';
import ListItem from '../../../sharedComponents/listItem';
import Loader from '../../../sharedComponents/loader';
import { snackbarUpdate } from '../../../store/actions';
import InsideAuthApi from '../../../services/inSideAuth';
import defaultValue from '../../../constants/defaultValue';

const ChatScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const isFocused = useIsFocused();
    const colors = themeContext.colors[themeContext.baseColor];
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(true);
    const detailsStore = useSelector((state) => state.details, shallowEqual);

    const apiCall = (pageCount) => {
        const varParam = {
            page: pageCount
        }
        InsideAuthApi()
            .myChatListApi(varParam)
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
                    msg: err?.message && err?.message.length ? err.message : ''
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
            {data?.map((x, i) => (
                <TouchableOpacity key={i} style={{ borderBottom: '2px solid blue' }} onPress={() => props.navigation.navigate(Routes.userChat, { id: detailsStore.id !== x.sender_user_id._id ? x.sender_user_id?._id : x.receiver_user_id?._id })}>
                    <ListItem
                        title={(detailsStore.id !== x.sender_user_id._id ? x.sender_user_id?.userId : x.receiver_user_id?.userId)}
                        description={x?.comments ? x.comments[0]?.msg : ''}
                        descriptionBold={x?.viewList && x.viewList.length > 0 && !x.viewList.includes(detailsStore.id) ? x?.comments ? x.comments[0]?.msg : '' : null}
                        smallDescription={timeFormat(x?.updatedAt)}
                        image={<Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: detailsStore.id !== x.sender_user_id._id ? (x.sender_user_id?.userInfo?.images ? x.sender_user_id.userInfo.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png') : (x.receiver_user_id?.userInfo?.images ? x.receiver_user_id.userInfo.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png') }} />}
                    />
                </TouchableOpacity>
            ))}
            {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
        </StyledScrollView>
    )
}
export default ChatScreen;