import React, { useContext, useState, useEffect } from 'react';
import { StatusBar, View, RefreshControl } from 'react-native';
import { FAB } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { location } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, loader, detailsUpdate } from '../../../store/actions';
import InsideAuthApi from '../../../services/inSideAuth';
import {
    DashboardOuterView,
    StyledFullImg,
    StyledScrollView,
} from './style';
import Loader from '../../loader';
import SnackBar from '../../snackbar'
import BannerComponent from '../../banner';
import { useIsFocused } from '@react-navigation/native';

const DashboardLayout = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const [msg, setMsg] = useState(false);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            if (detailsStore.location.lat === 0 && detailsStore.location.long === 0) {
                Geolocation.getCurrentPosition(({ coords }) => {
                    const varData = {
                        lat: coords.latitude,
                        long: coords.longitude
                    }
                    dispatch(location(varData));
                },
                    (error) => props.navigation.navigate('Access', { type: 'Camera' }),
                    { enableHighAccuracy: true, timeout: 20000 }
                );
            }
            if (authStore.access_token) {
                apiCall(authStore);
            }
        })
        return () => unsubscribe
    }, [authStore.access_token, refreshing]);

    useEffect(() => {
        setMsg(props.showMsg);
    }, [props.showMsg])

    const apiCall = (authStore) => {
        const varData = {
            lat: detailsStore.location.lat,
            long: detailsStore.location.long
        }
        InsideAuthApi(authStore)
            .updateLocationApi(varData)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });
        InsideAuthApi(authStore)
            .detailsApi()
            .then((res) => {
                if (res.data && res.data.name && res.data.category && res.data.category_preference) {
                    dispatch(detailsUpdate({
                        id: res.data.user,
                        name: res.data.name,
                        gender: res.data.gender,
                        userCat: res.data.category,
                        expectedCat: res.data.category_preference,
                        profileImg: res.data.images
                    }))
                } else {
                    props.navigation.navigate('UpdateDetails')
                }
                setRefreshing(false);
            })
            .catch((err) => {
                if (err.error_code === "E-520") {
                    props.navigation.navigate('UpdateDetails')
                }
                setRefreshing(false);
            });
    };

    const onRefresh = () => {
        setRefreshing(true);
        props.refreshFnc();
        apiCall(authStore);
    };

    return (
        <DashboardOuterView>
            <StatusBar backgroundColor={colors.backgroundColor} barStyle="dark-content" />
            <Loader show={props.showLoader ? props.showLoader : false} />
            <SnackBar show={msg ? msg !== '' : false} text={msg ? msg : ''} type={props.showMsgType ? props.showMsgType : 'error'} onDismiss={(props.setShowMsg)} />
            <BannerComponent />
            {props.outsideScroll}
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                scrollEnabled={props.outerScrollViewScrollEnabled}>
                {props.banner ? <StyledFullImg
                    resizeMode='cover'
                    source={{
                        uri: props.banner,
                    }} /> : null}
                <View>
                    {props.children}
                </View>
            </StyledScrollView>
            {props.fab && authStore.access_token && authStore.access_token !== '' ? <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Post'
                onPress={() => props.navigation.navigate('CreatePost', { categories: props.category })}
            /> : null}
        </DashboardOuterView>
    );
};

export default DashboardLayout;