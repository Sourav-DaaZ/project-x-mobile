import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import {
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

const NotificationScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const colors = themeContext.colors[themeContext.baseColor];
    const [data, setData] = useState([]);
    const detailsStore = useSelector((state) => state.details, shallowEqual);

    useEffect(() => {
        if (isFocused) {
            setShowLoader(true);
            OutsideAuthApi()
                .myNotificationApi(`?lat=${detailsStore.location.lat}&long=${detailsStore.location.long}&category_preference=${JSON.stringify(detailsStore.expectedCat)}`)
                .then((res) => {
                    setShowLoader(false);
                    setData(res.data)
                })
                .catch((err) => {
                    setShowLoader(false);
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err?.message
                    }));
                });
        }
    }, [isFocused, refreshing])


    return (
        <DashboardLayout {...props} fab={false} refreshFnc={() => setRefreshing(!refreshing)}>

            {showLoader ? <Loader /> : <StyledScrollView>
                {data.map((x, i) => (
                    <TouchableOpacity key={i} style={{ borderBottom: '2px solid blue' }} onPress={() => props.navigation.navigate(Routes[x.data.route], { id: x.data.id })}>
                        <ListItem
                            title={(x.data.userVisible & x.created_by.userInfo ? x.created_by.userInfo.name.toLowerCase() + ': ' : "anonymous: ") + (x.data.title ? x.data.title : '')}
                            description={timeFormat(x.createdAt)}
                            image={<Avatar.Image style={{ margin: 5 }} size={40} source={{ uri: x.images && x.data.userVisible ? x.images : "https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png" }} />}
                        />
                    </TouchableOpacity>
                ))}
            </StyledScrollView>}
        </DashboardLayout>
    )
}
export default NotificationScreen;