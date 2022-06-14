import * as actionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const location = (data) => {
    return {
        type: actionTypes.LOCATION,
        data: data
    };
};

export const detailsUpdate = (data) => {
    return {
        type: actionTypes.DETAILS,
        data: data
    };
};
