import * as actionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReduxStore from '../../store';
import { detailsUpdate } from '../actions';
const { dispatch } = ReduxStore;

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
    if (data.access_token === '') {
        AsyncStorage.removeItem('userData');
        dispatch(detailsUpdate({
            id: '',
            name: '',
            gender: '',
            age: 0,
            userCat: '',
            expectedCat: [],
        }))
    }
    return {
        type: actionTypes.TOKEN_UPDATE,
        data: data
    };
};

export const snackbarUpdate = (data) => {
    return {
        type: actionTypes.SNACK_BAR,
        data: data
    };
};

export const fTokenUpdate = (data) => {
    return {
        type: actionTypes.F_TOKEN_UPDATE,
        data: data
    };
};