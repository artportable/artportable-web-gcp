
import { SET_TAB } from '../actions/discoverActions';

const initialDiscoverTopArtTabState = {
  tab: 0
};

const discoverTopArtTabReducer = (state = initialDiscoverTopArtTabState, action) => {
  switch (action.type) {
    case SET_TAB:
      return {...state, tab: action.payload};
    default:
      return {...state};
  }
};

export default discoverTopArtTabReducer;