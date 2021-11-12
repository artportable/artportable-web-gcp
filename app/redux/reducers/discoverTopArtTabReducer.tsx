
import { SET_TAB } from '../actions/discoverActions';

const discoverTopArtTabState = {
  tab: 3
};

const discoverTopArtTabReducer = (state = discoverTopArtTabState, action) => {
  switch (action.type) {
    case SET_TAB:
      return {...state, tab: action.payload};
    default:
      return {...state};
  }
};

export default discoverTopArtTabReducer;