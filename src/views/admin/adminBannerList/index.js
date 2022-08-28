import React, { useState, useContext, useEffect } from 'react';
import { Linking, Alert } from 'react-native';

import {
    StyledScrollView
} from './style';

import OutsideAuthApi from '../../../services/outSideAuth';

import Routes from '../../../constants/routeConst';
import Loader from '../../../sharedComponents/loader';
import { snackbarUpdate } from '../../../store/actions';
import Banner from '../../../sharedComponents/banner';
import { ThemeContext } from 'styled-components';
import { FAB } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { openUrl } from '../../../utils';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import { useIsFocused } from '@react-navigation/native';


const AdminBannerList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const isFocused = useIsFocused();
    const [showLoader, setShowLoader] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const paramData = {
            banner_for: 'all'
        }
        OutsideAuthApi()
            .getBannerApi(paramData)
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
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
                setShowMsg(err.message)
            });
    }, [isFocused])

    return (

        showLoader ? <Loader /> : <ShadowWrapperContainer none {...props}>
            <StyledScrollView none>
                {data.map((x, i) => <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    flexWrap: 'wrap'
                }} key={i}><Banner data={x} /></View>)}

            </StyledScrollView>
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
        </ShadowWrapperContainer>
    )
}
export default AdminBannerList;