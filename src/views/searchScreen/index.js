import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { List, Avatar } from 'react-native-paper';
import {
    StyledScrollView,
    StyledSearchbar,
    StyledDivider
} from './style';

import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SearchScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];

    return (
        <DashboardLayout fab={false} outsideScroll={
            <StyledSearchbar focus clear />
        }>
            <StyledScrollView>
                <List.Item
                    title="First Item"
                    description="Item description"
                    left={props => <Avatar.Image style={{margin: 5}} size={40} source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=60'}} />} />
                <StyledDivider />
                <List.Item
                    title="First Item"
                    description="Item description"
                    left={props => <Avatar.Image style={{margin: 5}} size={40} source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=60'}} />} />

            </StyledScrollView>
        </DashboardLayout>
    )
}
export default SearchScreen;