import React, { useContext } from 'react';
import {
    View,
} from 'react-native';
import { ThemeContext } from 'styled-components';
import { StyledContainer } from './style';


export const BottomShadow = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    return (
        <View style={{ overflow: 'hidden', paddingBottom: props.small ? 15 : 40, backgroundColor: colors.backgroundDeepColor, marginBottom: props.small ? 0 : -20 }}>
            <View
                style={{
                    backgroundColor: colors.backgroundColor,
                    shadowColor: colors.shadowColor,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 3,
                    elevation: 10,
                }} >
                {props.children}
            </View>
        </View>
    );
};

export const ShadowWrapperContainer = (props) => {
    return (
        <StyledContainer style={props.style} animation={props.animation ? props.animation : 'flipInX'}>
            {props.children}
        </StyledContainer>
    );
};
