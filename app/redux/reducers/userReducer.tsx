import {LOGIN_USER, LOGOUT_USER} from '../actions/userActions';

const initialUserState = {
  username: null,
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, username: 'Kalle'};
    case LOGOUT_USER:
      return {...state, username: null};
    default:
      return {...state};
  }
};

export default userReducer;