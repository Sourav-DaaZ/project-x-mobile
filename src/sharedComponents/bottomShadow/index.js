import React, { useContext, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { navigationUpdate } from '../../store/actions';


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
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.navigation) {
            dispatch(navigationUpdate(props.navigation.navigate));
        }
    }, [props.navigation])
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
