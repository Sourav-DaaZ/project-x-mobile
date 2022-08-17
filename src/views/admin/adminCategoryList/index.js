import React, { useContext, useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import {
    StyledScrollView
} from './style';

import SingleCategory from '../../category/categoryList/singleCat';
import OutsideAuthApi from '../../../services/outSideAuth';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import Routes from '../../../constants/routeConst';
import Loader from '../../../sharedComponents/loader';
import { snackbarUpdate } from '../../../store/actions';
import { FAB } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const AdminCategoryList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const isFocused = useIsFocused();
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState('');


    useEffect(() => {
        setShowLoader(true);
        OutsideAuthApi()
            .categoryListApi()
            .then((res) => {
                setShowLoader(false);
                setCategory(res.data);
            })
            .catch((err) => {
                setShowLoader(false);
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
                setShowMsg(err.message)
            });
    }, []);


    return (
        showLoader ? <Loader /> : <StyledScrollView style={{ flex: 1 }}>
            {category?.map((x, i) => <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.adminCategoryUpdate, { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)}
            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Category'
                onPress={() => props.navigation.navigate(Routes.adminCategoryUpdate)}
            />
        </StyledScrollView>
    )
}
export default AdminCategoryList;