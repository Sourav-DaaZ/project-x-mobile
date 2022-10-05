import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity, RefreshControl } from 'react-native';

import {
    StyledHorizontalScrollView,
    StyledUserWrapper,
    StyledButtonLoadMore,
} from './style';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import Routes from '../../../constants/routeConst';
import ListItem from '../../../sharedComponents/listItem';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Loader from '../../../sharedComponents/loader';
import { truncate } from '../../../utils';
import defaultValue from '../../../constants/defaultValue';
import InsideAuthApi from '../../../services/inSideAuth';

const AdminVerifyUser = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);
    const [showUserLoader, setUserShowLoader] = useState(false);
    const [dataLoader, setDataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const apiCall = (pageCount) => {

        const requestData = {
            page: pageCount
        }
        InsideAuthApi()
            .verifyUserList(requestData)
            .then((res) => {
                if (res.data && pageCount > 0) {
                    let varData = data;
                    if (res.data instanceof Array) {
                        varData = varData.concat(res.data)
                    } else {
                        varData.push(res.data)
                    };
                    setUserData(varData);
                } else {
                    setUserData(res.data);
                }
                if (res.data && res.data.length < defaultValue.paginationLength) {
                    setDataLoader(false)
                }
                setUserShowLoader(false);
            })
            .catch((err) => {
                if (err.message) {
                    dispatch(snackbarUpdate({
                        type: 'error',
                        msg: err?.message ? err.message : ''
                    }));
                }
                setUserShowLoader(false);
            });
    }

    useEffect(() => {
        if (!refreshing) {
            setUserShowLoader(true);
            setDataLoader(true);
            setPage(0);
            apiCall(0);
        }
    }, [refreshing])

    useEffect(() => {
        if (page !== 0) {
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
        <ShadowWrapperContainer none {...props}>
            <StyledHorizontalScrollView
                showsHorizontalScrollIndicator={false}
                stickyHeaderIndices={[1]}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
                }>
                {showUserLoader ? <Loader /> : userData.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate(Routes.adminUserVerifyAction, { data: x })}>
                    <StyledUserWrapper>
                        <ListItem
                            title={truncate(x.user ? x.user.userId : '', 20)}
                            image={<Avatar.Image style={{ margin: spacing.width }} size={spacing.width * 15} source={{ uri: x.user?.userInfo?.images ? x.user.userInfo.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' }} />} />
                    </StyledUserWrapper>
                </TouchableOpacity>)}
                {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
            </StyledHorizontalScrollView>
        </ShadowWrapperContainer>
    )
};

export default AdminVerifyUser;