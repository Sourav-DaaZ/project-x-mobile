import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';

import {
    StyledScrollView
} from './style';

import SingleCategory from './singleCat';
import OutsideAuthApi from '../../../services/outSideAuth';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Routes from '../../../constants/routeConst';
import Loader from '../../../sharedComponents/loader';
import { snackbarUpdate } from '../../../store/actions';
import DashboardHeader from '../../dashboard/header';
import { ThemeContext } from 'styled-components';

const CategoryList = (props) => {
    const isFocused = useIsFocused();
    const themeContext = useContext(ThemeContext);
    const [myCategory, setMyCategory] = useState([]);
    const [otherCategory, setOtherCategory] = useState([]);
    const spacing = themeContext.spacing;
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState('');
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        if (isFocused && !refreshing) {
            setShowLoader(true);
            OutsideAuthApi()
                .categoryListApi()
                .then((res) => {
                    setShowLoader(false);
                    let otherCat = [];
                    let myCat = [];
                    res.data?.map((x) => detailsStore.expectedCat?.length > 0 && authStore.access_token !== '' && detailsStore.expectedCat.includes(x._id) ? myCat.push(x) : otherCat.push(x))
                    setOtherCategory(otherCat);
                    setMyCategory(myCat);
                })
                .catch((err) => {
                    setShowLoader(false);
                    dispatch(snackbarUpdate({
                        type: 'error',
                        msg: err?.message ? err.message : ''
                    }));
                    setShowMsg(err.message)
                });
        }
    }, [isFocused, refreshing]);

    const refreshFnc = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 200);
    }


    return (
        <DashboardLayout {...props}>
            {showLoader ? <Loader /> : <StyledScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
                }
            >
                {myCategory.length > 0 ? <DashboardHeader style={{ marginHorizontal: spacing.width * 2 }} text='Your Category' /> : null}
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {myCategory?.map((x, i) => <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)}
                </View>
                {otherCategory.length > 0 ? <DashboardHeader style={{ marginHorizontal: spacing.width * 2 }} text={`${authStore.access_token !== '' ? 'Other' : 'All'} Category`} /> : null}
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {otherCategory?.map((x, i) => <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)}
                </View>
            </StyledScrollView>}
        </DashboardLayout>
    )
}
export default React.memo(CategoryList);