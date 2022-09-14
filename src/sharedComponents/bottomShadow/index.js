import React, { useContext, useEffect } from 'react';
import {
    View,
    SafeAreaView
} from 'react-native';
import { ThemeContext } from 'styled-components';
import { StyledContainer, StyledView } from './style';
import SnackBar from '../snackbar';
import { useDispatch } from 'react-redux';
import { navigationUpdate } from '../../store/actions';


export const BottomShadow = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    return (
        <View style={{ overflow: 'hidden', paddingBottom: props.small ? spacing.height * 2 : spacing.height * 4, backgroundColor: colors.backgroundDeepColor, marginBottom: props.small ? 0 : -(spacing.height * 2) }}>
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
        <SafeAreaView style={{ flex: 1 }}>
            {!props.noSnack ? <SnackBar /> : null}
            {props.none ? <StyledView>
                {props.children}
            </StyledView> : <StyledContainer style={props.style} animation={props.animation ? props.animation : 'flipInX'}>
                {props.children}
            </StyledContainer>}
        </SafeAreaView>
    );
};
