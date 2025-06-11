import { ADD_DATA, ADD_PRICE } from '../actions/signupActions';

const initialSignupState = {};

const signupReducer = (state = initialSignupState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {...state, data: action.payload};
    case ADD_PRICE:
      return {...state, price: action.payload};
    default:
      return state;
  }
};

export default signupReducer;