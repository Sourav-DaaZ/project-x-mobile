import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

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

const AdminBannerList = (props) => {
    const isFocused = useIsFocused();
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState('');


    useEffect(() => {
        let isMounted = true;
        if (isFocused) {
            setShowLoader(true);
            OutsideAuthApi()
                .categoryListApi()
                .then((res) => {
                    if (isMounted) {
                        setShowLoader(false);
                        setCategory(res.data);
                    }
                })
                .catch((err) => {
                    if (isMounted) {
                        setShowLoader(false);
                        dispatch(SnackbarUpdate({
                            type: 'error',
                            msg: err?.message
                        }));
                        setShowMsg(err.message)
                    }
                });
        }
        return () => {
            isMounted = true
        }
    }, [isFocused]);


    return (
        <DashboardLayout {...props} fab={false}>
            {showLoader ? <Loader /> : <StyledScrollView>
                <Banner />
                {/* {category?.map((x, i) => <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)} */}
            </StyledScrollView>}
        </DashboardLayout>
    )
}
export default AdminBannerList;