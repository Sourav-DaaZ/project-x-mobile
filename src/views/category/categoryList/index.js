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
import { snackbarUpdate } from '../../../store/actions';

const CategoryList = (props) => {
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
                        dispatch(snackbarUpdate({
                            type: 'error',
                            msg: err?.message ? err.message : ''
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
        <DashboardLayout {...props}>
            {showLoader ? <Loader /> : <StyledScrollView>
                {category?.map((x, i) => <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)}
            </StyledScrollView>}
        </DashboardLayout>
    )
}
export default CategoryList;