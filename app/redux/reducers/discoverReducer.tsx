
import { SET_TAB } from '../actions/discoverActions';

const initialDiscoverState = {
  tab: 0
};


export const discoverReducer = (state = initialDiscoverState, action) => {
  switch (action.type) {
    case SET_TAB:
      return {...state, tab: action.payload};
    default:
      return {...state};
  }
};

export default discoverReducer;