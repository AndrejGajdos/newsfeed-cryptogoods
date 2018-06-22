import { put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../constants/actionTypes';

function* addComment(action) {
  const { commentObj } = action;
  try {
    yield put({ type: ActionTypes.ADD_COMMENT_SUCCEEDED, commentObj });
  } catch (e) {
    yield put({ type: ActionTypes.ADD_COMMENT_FAILED, message: e.message });
  }
}

export default function* watchAddComment() {
  yield takeLatest(ActionTypes.ADD_COMMENT_REQUESTED, addComment);
}
