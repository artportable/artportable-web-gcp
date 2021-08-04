import {LOGIN_USER, LOGOUT_USER} from '../actions/userActions';

const initialUserState = {
  isSignedIn: false,
  username: null,
  profilePicture: null
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state,  ...action.payload };
    case LOGOUT_USER:
      return {...state, isSignedIn: false, username: null};
    default:
      return {...state};
  }
};

export default userReducer;
