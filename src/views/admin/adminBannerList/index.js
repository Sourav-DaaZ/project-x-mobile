import React, { useState, useContext, useEffect } from 'react';
import { Linking, Alert } from 'react-native';

import {
    StyledScrollView
} from './style';

import SingleCategory from './singleCat';
import OutsideAuthApi from '../../../services/outSideAuth';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import Routes from '../../../constants/routeConst';
import Loader from '../../../sharedComponents/loader';
import { SnackbarUpdate } from '../../../store/actions';
import Banner from '../../../sharedComponents/banner';
import { ThemeContext } from 'styled-components';
import { FAB } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { openUrl } from '../../../utils';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';


const AdminBannerList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [showLoader, setShowLoader] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            OutsideAuthApi()
                .getBannerApi('?banner_for=all')
                .then((res) => {
                    setShowLoader(false);
                    let varData = [];
                    res.data?.map((x, i) => {
                        varData.push([{
                            key: x._id,
                            img: x.image,
                            onPress: () => openUrl(x.link),
                            onLongPress: () => props.navigation.navigate(Routes.adminBannerUpdate, { data: x })
                        }])
                    })
                    setData(varData);
                })
                .catch((err) => {
                    setShowLoader(false);
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err?.message
                    }));
                    setShowMsg(err.message)
                });
        })
        return () => unsubscribe;
    }, [])

    return (

        showLoader ? <Loader /> : <ShadowWrapperContainer none>
            <StyledScrollView none>
                {data.map((x, i) => <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    flexWrap: 'wrap'
                }} key={i}><Banner data={x} /></View>)}

                <FAB
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        bottom: 30,
                        backgroundColor: colors.mainColor
                    }}
                    icon="plus"
                    label='Banner'
                    onPress={() => props.navigation.navigate(Routes.adminBannerUpdate)}
                />
            </StyledScrollView>
        </ShadowWrapperContainer>
    )
}
export default AdminBannerList;