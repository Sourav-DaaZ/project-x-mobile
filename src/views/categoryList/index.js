import React, { useContext, useState, useEffect, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';

import {
    StyledScrollView
} from './style';

import SingleCategory from './singleCat';
import OutsideAuthApi from '../../services/outSideAuth';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import { useIsFocused } from '@react-navigation/native';

import Routes from '../../constants/routeConst';
import Loader from '../../sharedComponents/loader';

const CategoryList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const isFocused = useIsFocused();
    const [category, setCategory] = useState([]);
    const [showMsg, setShowMsg] = useState('');
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
                        setShowMsg(err.message)
                    }
                });
        }
        return () => {
            isMounted = true
        }
    }, [isFocused]);


    return (
        <DashboardLayout {...props} fab={false} showMsg={showMsg} setShowMsg={() => setShowMsg('')}>
            {showLoader ? <Loader /> : <StyledScrollView>
                {category?.map((x, i) => <TouchableOpacity key={i} activeOpacity={1} onPress={() => props.navigation.navigate(Routes.singleCategory, { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)}
            </StyledScrollView>}
        </DashboardLayout>
    )
}
export default CategoryList;