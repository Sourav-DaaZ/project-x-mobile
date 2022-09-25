import React, { useContext, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { location } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { detailsUpdate, configUpdate } from '../../../store/actions';
import InsideAuthApi from '../../../services/inSideAuth';
import {
    DashboardOuterView,
    SplashTitle,
    LoginDescription,
    ButtonWrapper,
    UpdateButton,
    CancelText
} from './style';
import Routes from '../../../constants/routeConst';
import { useIsFocused } from '@react-navigation/native';
import { ShadowWrapperContainer } from '../../bottomShadow';
import Modal from '../../modal';
import OutsideAuthApi from '../../../services/outSideAuth';
import defaultValue from '../../../constants/defaultValue';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardLayout = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const configStore = useSelector((state) => state.config, shallowEqual);
    const [detailsShow, setDetailsShow] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(null);
    const [detailsData, setDetailsData] = useState(null);

    useEffect(() => {
        if (detailsStore.location.lat === 0 && detailsStore.location.long === 0 && !props.refreshing) {
            Geolocation.getCurrentPosition(({ coords }) => {
                const varData = {
                    lat: coords.latitude,
                    long: coords.longitude
                }
                dispatch(location(varData));
            },
                (error) => props.navigation.navigate(Routes.access, { type: 'Location', err: error.message }),
                { enableHighAccuracy: false, timeout: 20000 }
            );
        }
        if (configStore.appConfig === null && !props.refreshing) {
            OutsideAuthApi()
                .appConfigApi()
                .then((res) => {
                    setUpdatePopup(res.data);
                    dispatch(configUpdate(res.data));
                }).catch((x) => {
                    console.log(x);
                })
        }
    }, [isFocused, props.refreshing]);

    useEffect(() => {
        if (authStore.access_token !== '' && !props?.blockDetails && detailsStore.id === '') {
            apiCallWithToken();
        }
    }, [authStore.access_token, props.refreshing, isFocused]);


    const apiCallWithToken = () => {
        InsideAuthApi()
            .detailsApi()
            .then((res) => {
                setDetailsData(res.data);
                const varData = {
                    id: res.data.user ? res.data.user : '',
                    name: res.data.name ? res.data.name : '',
                    gender: res.data.gender ? res.data.gender : '',
                    age: res.data.age ? res.data.age : 0,
                    userCat: res.data.category ? res.data.category : '',
                    expectedCat: res.data.categoryPreference ? res.data.categoryPreference : [],
                }
                dispatch(detailsUpdate(varData));
                AsyncStorage.setItem('userData', JSON.stringify(varData));
                if (!(res.data && res.data.name && res.data.category && res.data.categoryPreference)) {
                    setDetailsShow(true);
                }
            })
            .catch((err) => {
                if (err.error_code === "E-520") {
                    props.navigation.navigate(Routes.updateDetails, { logedin: false })
                }
            });
    };

    return (
        <ShadowWrapperContainer none {...props}>
            <DashboardOuterView>
                <StatusBar backgroundColor={colors.backgroundColor} barStyle="dark-content" />
                {props.children}
                <Modal show={detailsShow} onClose={() => setDetailsShow(false)} btn={[{
                    text: 'Cancel',
                    onPress: () => setDetailsShow(false),
                    disabled: false
                }, {
                    text: 'Details',
                    onPress: () => {
                        props.navigation.navigate(Routes.updateDetails, { data: detailsData });
                        setDetailsShow(false);
                    },
                    disabled: detailsData === null
                }]}>
                    <SplashTitle>Details Alert!</SplashTitle>
                    <LoginDescription>Please update your details.</LoginDescription>

                </Modal>
                {updatePopup && defaultValue.appVersion[Platform.OS] < updatePopup?.buildVersion[Platform.OS] ? <Modal show={updatePopup && defaultValue.appVersion[Platform.OS] < updatePopup?.buildVersion[Platform.OS]} onClose={!(defaultValue.appVersion[Platform.OS] < updatePopup.minBuildVersion[Platform.OS]) ? () => setUpdatePopup(null) : null} btn={[{
                    text: !(defaultValue?.appVersion[Platform.OS] < updatePopup.minBuildVersion[Platform.OS]) ? 'Cancel' : null,
                    onPress: () => setUpdatePopup(null)
                }, {
                    text: 'Update',
                    onPress: () => console.log('hii'),
                    full: defaultValue.appVersion[Platform.OS] < updatePopup?.minBuildVersion[Platform.OS]
                }]}>
                    <SplashTitle critical={defaultValue.appVersion[Platform.OS] < updatePopup?.minBuildVersion[Platform.OS]}>Update Alert!</SplashTitle>
                    <LoginDescription mode="contained">{updatePopup.updateDetails[Platform.OS]}</LoginDescription>
                </Modal> : null}
            </DashboardOuterView>
        </ShadowWrapperContainer>
    );
};

export default DashboardLayout;