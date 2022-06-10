import React, { useContext, useState, useEffect, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';

import {
    StyledScrollView
} from './style';

import SingleCategory from './singleCat';
import OutsideAuthApi from '../../services/outSideAuth';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';

const CategoryList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [category, setCategory] = useState([]);
    const [showMsg, setShowMsg] = useState('');
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
                setShowMsg(err.message)
            });
    }, []);


    return (
        <React.Fragment>
            <DashboardLayout fab={false} showLoader={showLoader} showMsg={showMsg} setShowMsg={() => setShowMsg('')}>
                <StyledScrollView>
                    {category?.map((x, i) => <TouchableOpacity key={i} onPress={() => props.navigation.navigate('SingleCategory', { data: x })}><SingleCategory name={x.category_name} img={x.images} /></TouchableOpacity>)}
                </StyledScrollView>
            </DashboardLayout>
        </React.Fragment>
    )
}
export default CategoryList;