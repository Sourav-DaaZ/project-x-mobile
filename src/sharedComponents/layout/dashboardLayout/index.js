import React, { useContext, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import {
    DashboardOuterView,
    StyledFullImg,
    StyledScrollView,
} from './style';

const DashboardLayout = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <DashboardOuterView>
            <StatusBar backgroundColor={colors.backgroundColor} barStyle="dark-content" />
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={props.outerScrollViewScrollEnabled}>
                <StyledFullImg
                    resizeMode='cover'
                    source={{
                        uri: props.banner,
                    }} />
                <View>
                    {props.children}
                </View>
            </StyledScrollView>
            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Post'
                onPress={() => console.log('Pressed')}
            />
        </DashboardOuterView >
    );
};

export default DashboardLayout;