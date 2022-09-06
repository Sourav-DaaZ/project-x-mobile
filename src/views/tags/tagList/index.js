import React, { useContext, useState, useEffect, useMemo } from 'react';
import { RefreshControl, View } from 'react-native';
import { ThemeContext } from 'styled-components';

import {
    StyledScrollView,
    StyledChip,
    WrapperView,
    SplashTitle,
    LoginDescription,
    ButtonWrapper,
    UpdateButton,
    CancelText
} from './style';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import OutsideAuthApi from '../../../services/outSideAuth';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import Routes from '../../../constants/routeConst';
import DashboardHeader from '../../dashboard/header';
import { FAB, Menu } from 'react-native-paper';
import Loader from '../../../sharedComponents/loader';
import { snackbarUpdate } from '../../../store/actions';
import InsideAuthApi from '../../../services/inSideAuth';
import { useIsFocused } from '@react-navigation/native';
import Modal from '../../../sharedComponents/modal';

const TagList = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [sTag, setStag] = useState([]);
    const [nTag, setNtag] = useState([]);
    const [showLoader, setShowLoader] = useState('');
    const [showMenu, setShowMenu] = useState(null);
    const [refreshing, setRefreshing] = useState(false);


    useMemo(() => {
        const varParam = {
            lat: detailsStore.location.lat,
            long: detailsStore.location.long
        }
        if (!refreshing) {
            setShowLoader(true);
            OutsideAuthApi()
                .tagListApi(varParam)
                .then((res) => {
                    if (res.data) {
                        let secure = [];
                        let notSecure = [];
                        res.data?.map((x) => x.secure ? secure.push(x) : notSecure.push(x))
                        setStag(secure);
                        setNtag(notSecure);
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
    }, [isFocused, refreshing]);

    const refreshFnc = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 200);
    }

    const onSaveTag = (id) => {
        const varParam = {
            tag_id: id,
            isDeleted: false
        }
        InsideAuthApi()
            .saveTagApi(varParam)
            .then((res) => {
                dispatch(snackbarUpdate({
                    type: 'success',
                    msg: res?.message ? res.message : ''
                }));
            })
            .catch((err) => {
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            })
    }


    return (
        showLoader ? <Loader /> : <DashboardLayout {...props}>
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
                }
            >
                {sTag.length > 0 ? <WrapperView animation='zoomIn'>
                    <DashboardHeader text='Verified Tags' />
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                        {sTag.map((x, i) =>
                            <StyledChip key={i} accessibilityLabel={x.details} onLongPress={authStore.access_token !== '' ? () => setShowMenu(x._id) : null} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: x.tag_name })}>
                                {x.tag_name}
                            </StyledChip>
                        )}
                    </View>
                </WrapperView> : null}
                <WrapperView animation='zoomIn'>
                    <DashboardHeader text='User Tags' />
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                        {nTag.map((x, i) =>
                            <StyledChip key={i} accessibilityLabel={x.details} onLongPress={authStore.access_token !== '' ? () => setShowMenu(x._id) : null} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: x.tag_name })}>
                                {x.tag_name}
                            </StyledChip>)}
                    </View>
                </WrapperView>
                <Modal show={showMenu !== null} onClose={() => setShowMenu(null)}>
                    <SplashTitle>Save Tags!</SplashTitle>
                    <LoginDescription>Are You Want to Save this tag?</LoginDescription>
                    <ButtonWrapper>
                        <UpdateButton mode="outlined" onPress={() => setShowMenu(null)}>
                            <CancelText>Cancel</CancelText>
                        </UpdateButton>
                        <UpdateButton labelStyle={{ color: colors.backgroundColor }} mode="contained" onPress={() => onSaveTag(showMenu)}>
                            Save
                        </UpdateButton>
                    </ButtonWrapper>
                </Modal>
            </StyledScrollView>
            {
                authStore.access_token && authStore.access_token !== '' ? <FAB
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        bottom: 30,
                        backgroundColor: colors.mainColor
                    }}
                    icon="plus"
                    label='Tag'
                    onPress={() => props.navigation.navigate(Routes.addTag)}
                /> : null
            }
        </DashboardLayout >
    )
}
export default React.memo(TagList);