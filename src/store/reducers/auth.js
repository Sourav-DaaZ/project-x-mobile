import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

export const initialState = {
  access_token: '',
  refresh_token: '',
  loading: false,
  message: {
    type: 'error',
    msg: ''
  }
};

const loader = (state, action) => {
  return updateObject(state, {
    loading: action.loading
  });
};

const tokenUpdate = (state, action) => {
  if (action.data) {
    return updateObject(state, {
      access_token: action.data.access_token,
      refresh_token: action.data.refresh_token,
    });
  } else {
    return null
  }
};

const SnackbarUpdate = (state, action) => {
  return updateObject(state, {
    message: action.data,
  });
};

const reducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return loader(state, action);
    case actionTypes.TOKEN_UPDATE:
      return tokenUpdate(state, action);
    case actionTypes.SNACK_BAR:
      return SnackbarUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;
