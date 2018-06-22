import { put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../constants/actionTypes';

function* addLike(action) {
  const { likeObj } = action;
  try {
    yield put({ type: ActionTypes.ADD_LIKE_SUCCEEDED, likeObj });
  } catch (e) {
    yield put({ type: ActionTypes.ADD_LIKE_FAILED, message: e.message });
  }
}

export default function* watchAddLike() {
  yield takeLatest(ActionTypes.ADD_LIKE_REQUESTED, addLike);
}
