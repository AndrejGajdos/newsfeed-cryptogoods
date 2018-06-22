import * as ActionTypes from '../constants/actionTypes';

const comments = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMMENTS_SUCCEEDED: {
      return {
        ...state,
      };
    }
    case ActionTypes.ADD_COMMENT_SUCCEEDED: {
      const currCommentObj = action.commentObj;
      const feedId = currCommentObj.id;
      currCommentObj.id = currCommentObj.date.getUTCMilliseconds();
      return {
        ...state,
        [feedId]: state[feedId] ? [action.commentObj, ...state[feedId]] : [action.commentObj],
      };
    }
    default:
      return state;
  }
};

export default comments;
