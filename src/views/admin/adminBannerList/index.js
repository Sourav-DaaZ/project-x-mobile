import React, { useState, useContext, useEffect } from 'react';
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
    const spacing = themeContext.spacing;
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
                setData(res.data);
                setShowLoader(false);
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
                    flexDirection: 'column',
                    flex: 1,
                    flexWrap: 'wrap'
                }} key={i}><Banner data={[{
                    key: x._id,
                    img: x.image,
                    onPress: () => openUrl(x.link),
                    onLongPress: () => props.navigation.navigate(Routes.adminBannerUpdate, { data: x })
                }]} /></View>)}

            </StyledScrollView>
            <FAB
                style={{
                    position: 'absolute',
                    right: spacing.width * 5,
                    bottom: spacing.height * 3,
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