import * as ActionTypes from '../constants/actionTypes';

export const fetchLikes = feedId => ({
  type: ActionTypes.FETCH_LIKES_REQUESTED,
  feedId,
});

export const addLike = likeObj => ({
  type: ActionTypes.ADD_LIKE_REQUESTED,
  likeObj,
});
