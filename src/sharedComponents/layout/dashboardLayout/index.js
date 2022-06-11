import React, { useContext, useState, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { location } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import {
    DashboardOuterView,
    StyledFullImg,
    StyledScrollView,
} from './style';
import Loader from '../../loader';
import SnackBar from '../../snackbar'
import BannerComponent from '../../banner';

const DashboardLayout = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            if (detailsStore.location.lat === 0 && detailsStore.location.long === 0) {
                Geolocation.getCurrentPosition(({ coords }) => {
                    dispatch(location({
                        lat: coords.latitude,
                        long: coords.longitude
                    }))
                },
                    (error) => props.navigation.navigate('Access', { type: 'Camera' }),
                    { enableHighAccuracy: true, timeout: 20000 }
                );
            }
        })
        return unsubscribe
    }, [detailsStore])

    return (
        <DashboardOuterView>
            <StatusBar backgroundColor={colors.backgroundColor} barStyle="dark-content" />
            <Loader show={props.showLoader ? props.showLoader : false} />
            <SnackBar show={props.showMsg ? props.showMsg !== '' : false} text={props.showMsg ? props.showMsg : ''} type={props.showMsgType ? props.showMsgType : 'error'} onDismiss={props.setShowMsg} />
            <BannerComponent showBanner={false} setShowBanner={() => console.log('hi')}></BannerComponent>
            {props.outsideScroll}
            <StyledScrollView
                showsVerticalScrollIndicator={false}
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