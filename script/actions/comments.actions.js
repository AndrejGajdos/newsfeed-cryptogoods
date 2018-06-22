import * as ActionTypes from '../constants/actionTypes';

export const fetchComments = feedId => ({
  type: ActionTypes.FETCH_COMMENTS_REQUESTED,
  feedId,
});

export const addComment = commentObj => ({
  type: ActionTypes.ADD_COMMENT_REQUESTED,
  commentObj,
});
