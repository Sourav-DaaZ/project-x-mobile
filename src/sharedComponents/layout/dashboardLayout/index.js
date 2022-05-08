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
            {props.outsideScroll}
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={props.outerScrollViewScrollEnabled}>
                {props.banner ? <StyledFullImg
                    resizeMode='cover'
                    source={{
                        uri: props.banner,
                    }} /> : null}
                <View>
                    {props.children}
                </View>
            </StyledScrollView>
            {props.fab ? <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Post'
                onPress={() => console.log('Pressed')}
            /> : null}
        </DashboardOuterView>
    );
};

export default DashboardLayout;