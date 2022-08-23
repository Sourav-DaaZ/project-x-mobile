import React, { useContext, useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';

import {
    StyledScrollView,
    StyledChip,
    WrapperView
} from './style';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import OutsideAuthApi from '../../../services/outSideAuth';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import Routes from '../../../constants/routeConst';
import DashboardHeader from '../../dashboard/header';
import { FAB } from 'react-native-paper';
import Loader from '../../../sharedComponents/loader';
import { snackbarUpdate } from '../../../store/actions';

const TagList = (props) => {
    const themeContext = useContext(ThemeContext);
    const dispatch = useDispatch();
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [sTag, setStag] = useState([]);
    const [nTag, setNtag] = useState([]);
    const [showLoader, setShowLoader] = useState('');


    useEffect(() => {
        const varParam = {
            lat: detailsStore.location.lat,
            long: detailsStore.location.long
        }
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
    }, []);


    return (
        showLoader ? <Loader /> : <DashboardLayout {...props}>
            <StyledScrollView>
                <WrapperView animation='zoomIn'>
                    <DashboardHeader text='Secure Tags' />
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>{sTag.map((x, i) =>
                        <StyledChip key={i} accessibilityLabel={x.details} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: x.tag_name })}>
                            {x.tag_name}
                        </StyledChip>
                    )}</View>
                </WrapperView>
                <WrapperView animation='zoomIn'>
                    <DashboardHeader text='Other Tags' />
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>{nTag.map((x, i) =>
                        <StyledChip key={i} accessibilityLabel={x.details} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: x.tag_name })}>
                            {x.tag_name}
                        </StyledChip>
                    )}</View>
                </WrapperView>
            </StyledScrollView>
            {authStore.access_token && authStore.access_token !== '' ? <FAB
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
            /> : null}
        </DashboardLayout>
    )
}
export default TagList;