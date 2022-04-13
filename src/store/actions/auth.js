import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const loading = (load) => {
    return {
        type: actionTypes.LOADING,
        loading: load
    };
};

export const tokenUpdate = (data) => {
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