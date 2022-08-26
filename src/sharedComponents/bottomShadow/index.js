import React, { useContext, useEffect, useState } from 'react';
import {
    Platform,
    View,
} from 'react-native';
import { ThemeContext } from 'styled-components';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { StyledContainer, StyledView } from './style';
import SnackBar from '../snackbar';
import { handleDynamicLink, handleOnloadDynamicLink } from '../../services/google/deepLinkingHandler';
import * as FCMNotificationHandler from "../../services/google/firebase/FCMNotificationHandler";


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
    if (!props.noSnack) {
        useEffect(() => {
            if (Platform.OS === "android" && props.navigation) {
                const unsubscribe = dynamicLinks().onLink((link) => handleDynamicLink(link, props.navigation));

                handleOnloadDynamicLink(props.navigation);

                return () => unsubscribe();
            }
        }, [])

        if (Platform.OS === "android" && props.navigation) {
            FCMNotificationHandler.NotifinationListener(props.navigation);
        }
    }
    return (
        <React.Fragment>
            {!props.noSnack ? <SnackBar /> : null}
            {props.none ? <StyledView>
                {props.children}
            </StyledView> : <StyledContainer style={props.style} animation={props.animation ? props.animation : 'flipInX'}>
                {props.children}
            </StyledContainer>}
        </React.Fragment>
    );
};
