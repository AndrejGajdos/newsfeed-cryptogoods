import * as ActionTypes from '../constants/actionTypes';

const profile = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.PROFILE_SUCCEEDED: {
      return {
        name: action.profile.name,
        img: action.profile.img,
      };
    }
    default:
      return state;
  }
};

export default profile;
