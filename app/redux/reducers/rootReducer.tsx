import { combineReducers } from 'redux';
import userReducer from './userReducer';
import signupReducer from './signupReducer';
import discoverReducer from './discoverReducer';
import discoverTopArtTabReducer from './discoverTopArtTabReducer';

const rootReducer = combineReducers({
    user: userReducer,
    signup: signupReducer,
    discover: discoverReducer,
    discoverTopArtTab: discoverTopArtTabReducer
});

export default rootReducer;
