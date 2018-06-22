import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'utils/api';
import delay from 'utils/utils';
import * as ActionTypes from '../constants/actionTypes';

function* fetchAllFeeds() {
  while (true) {
    try {
      const feeds = yield call(
        get,
        '/feeds',
      );
      yield put({ type: ActionTypes.FETCH_FEEDS_SUCCEEDED, feeds });
    } catch (e) {
      yield put({ type: ActionTypes.FETCH_FEEDS_FAILED, message: e.message });
    }
    yield delay(15000);
  }
}

export default function* watchFetchFeeds() {
  yield takeLatest(ActionTypes.FETCH_FEEDS_REQUESTED, fetchAllFeeds);
}
