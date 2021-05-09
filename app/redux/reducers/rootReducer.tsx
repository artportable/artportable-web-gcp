import { combineReducers } from 'redux';
import userReducer from './userReducer';
import signupReducer from './signupReducer';
import discoverReducer from './discoverReducer';

const rootReducer = combineReducers({
    user: userReducer,
    signup: signupReducer,
    discover: discoverReducer
});

export default rootReducer;
