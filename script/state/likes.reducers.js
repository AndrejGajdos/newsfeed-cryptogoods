import * as ActionTypes from '../constants/actionTypes';

const likes = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LIKES_SUCCEEDED: {
      return {
        ...state,
      };
    }
    case ActionTypes.ADD_LIKE_SUCCEEDED: {
      const currLikeObj = action.likeObj;
      const feedId = currLikeObj.id;
      currLikeObj.id = new Date().getUTCMilliseconds();
      return {
        ...state,
        [feedId]: state[feedId] ? [action.likeObj, ...state[feedId]] : [action.likeObj],
      };
    }
    default:
      return state;
  }
};

export default likes;
