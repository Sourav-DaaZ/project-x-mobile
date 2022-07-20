import React, { useContext } from 'react';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator } from 'react-native-paper';
import { ThemeContext } from 'styled-components';

const Loader = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <Animatable.View animation='pulse' style={{
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10
        }}>
            <ActivityIndicator style={{
                padding: 10,
                borderRadius: 30,
                backgroundColor: colors.backgroundColor,
                width: 50,
                height: 50,
                shadowColor: colors.shadowColor,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.6,
                shadowRadius: 3,
                elevation: 7,

            }} animating={true} color={colors.mainColor} />
        </Animatable.View>
    );
};

export default Loader;