import {LOGIN_USER, LOGOUT_USER} from '../actions/userActions';

const initialUserState = {
  isSignedIn: false,
  id: null,
  username: null
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, isSignedIn: true, id: action.payload};
    case LOGOUT_USER:
      return {...state, isSignedIn: false, id: null};
    default:
      return {...state};
  }
};

export default userReducer;
