import { ADD_DATA } from '../actions/signupActions';

const initialSignupState = null;

const signupReducer = (state = initialSignupState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {...state, data: action.payload}
    default:
      return {...state};
  }
};

export default signupReducer;