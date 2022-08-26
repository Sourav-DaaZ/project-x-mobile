import React, { useContext, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { FAB } from 'react-native-paper';
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
        if (detailsStore.location.lat === 0 && detailsStore.location.long === 0) {
            Geolocation.getCurrentPosition(({ coords }) => {
                const varData = {
                    lat: coords.latitude,
                    long: coords.longitude
                }
                dispatch(location(varData));
            },
                (error) => props.navigation.navigate(Routes.access, { type: 'Location' }),
                { enableHighAccuracy: true, timeout: 20000 }
            );
        }
        if (configStore.appConfig === null) {
            OutsideAuthApi()
                .appConfigApi()
                .then((res) => {
                    dispatch(configUpdate(res.data))
                    setUpdatePopup(res.data);
                }).catch((x) => {
                    console.log(x);
                })
        }
    }, [isFocused]);

    useEffect(() => {
        if (authStore.access_token !== '' && !props.blockDetails && detailsStore.id === '') {
            apiCallWithToken();
        }
    }, [authStore.access_token, props.refreshing]);


    const apiCallWithToken = () => {
        InsideAuthApi()
            .detailsApi()
            .then((res) => {
                setDetailsData(res.data);
                dispatch(detailsUpdate({
                    id: res.data.user ? res.data.user : '',
                    name: res.data.name ? res.data.name : '',
                    gender: res.data.gender ? res.data.gender : '',
                    age: res.data.age ? res.data.age : 0,
                    userCat: res.data.category ? res.data.category : '',
                    expectedCat: res.data.categoryPreference ? res.data.categoryPreference : [],
                }))
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
                <Modal show={detailsShow} onClose={() => setDetailsShow(false)}>
                    <SplashTitle>Details Alert!</SplashTitle>
                    <LoginDescription>Please update your details.</LoginDescription>
                    <ButtonWrapper>
                        <UpdateButton mode="outlined" onPress={() => setDetailsShow(false)}>
                            <CancelText>Cancel</CancelText>
                        </UpdateButton>
                        <UpdateButton labelStyle={{ color: colors.backgroundColor }} disabled={detailsData === null} mode="contained" onPress={() => {
                            props.navigation.navigate(Routes.updateDetails, { data: detailsData });
                            setDetailsShow(false);
                        }}>
                            Details
                        </UpdateButton>
                    </ButtonWrapper>
                </Modal>
                {updatePopup && defaultValue.appVersion[Platform.OS] < updatePopup?.buildVersion[Platform.OS] ? <Modal show={updatePopup && defaultValue.appVersion[Platform.OS] < updatePopup?.buildVersion[Platform.OS]} onClose={!(defaultValue.appVersion[Platform.OS] < updatePopup.minBuildVersion[Platform.OS]) ? () => setUpdatePopup(null) : null}>
                    <SplashTitle critical={defaultValue.appVersion[Platform.OS] < updatePopup?.minBuildVersion[Platform.OS]}>Update Alert!</SplashTitle>
                    <LoginDescription mode="contained">{updatePopup.updateDetails[Platform.OS]}</LoginDescription>
                    <ButtonWrapper>
                        {!(defaultValue?.appVersion[Platform.OS] < updatePopup.minBuildVersion[Platform.OS]) ? <UpdateButton mode="outlined"><CancelText>cancel</CancelText></UpdateButton> : null}
                        <UpdateButton labelStyle={{ color: colors.backgroundColor }} full={defaultValue.appVersion[Platform.OS] < updatePopup?.minBuildVersion[Platform.OS]} mode="contained">Update</UpdateButton>
                    </ButtonWrapper>
                </Modal> : null}
            </DashboardOuterView>
        </ShadowWrapperContainer>
    );
};

export default DashboardLayout;