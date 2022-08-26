import * as actionTypes from './actionTypes';

export const configUpdate = (data) => {
    return {
        type: actionTypes.APP_CONFIG_UPDATE,
        data: data
    };
};

export const fTokenUpdate = (data) => {
    return {
        type: actionTypes.APP_FTOKEN_UPDATE,
        data: data
    };
};
