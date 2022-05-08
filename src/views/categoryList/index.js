import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

import {
    StyledScrollView
} from './style';

import SingleCategory from './singleCat';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';

const CategoryList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];

    return (
        <DashboardLayout fab={false}>
            <StyledScrollView>
                <SingleCategory />
                <SingleCategory />
                <SingleCategory />
                <SingleCategory />
                <SingleCategory />
                <SingleCategory />
                <SingleCategory />
                <SingleCategory />
            </StyledScrollView>
        </DashboardLayout>
    )
}
export default CategoryList;