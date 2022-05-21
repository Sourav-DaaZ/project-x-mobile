import React, { useContext, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import {
    DashboardOuterView,
    StyledFullImg,
    StyledScrollView,
} from './style';

const Layout = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <DashboardOuterView>
            <StatusBar backgroundColor={colors.backgroundColor} barStyle="dark-content" />
            {props.children}
        </DashboardOuterView>
    );
};

export default Layout;