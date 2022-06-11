import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils';

export const initialState = {
  name: '',
  gender: '',
  location: {
    lat: 0,
    long: 0
  }
};

const locationUpdate = (state, action) => {
  return updateObject(state, {
    location: action.data
  });
};


const DetailsReducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case actionTypes.LOCATION:
      return locationUpdate(state, action);
    default:
      return state;
  }
};

export default DetailsReducer;
