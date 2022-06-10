import * as actionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const loader = (loading) => {
    return {
        type: actionTypes.LOADING,
        loading: loading
    };
};

export const tokenUpdate = (data) => {
    AsyncStorage.setItem('token', JSON.stringify(data));
    return {
        type: actionTypes.TOKEN_UPDATE,
        data: data
    };
};

export const SnackbarUpdate = (data) => {
    return {
        type: actionTypes.SNACK_BAR,
        data: data
    };
};