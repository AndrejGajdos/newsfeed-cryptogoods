import { put } from 'redux-saga/effects';
import fetchFeeds from '../actions/feeds.actions';
import getProfile from '../actions/profile.actions';

export default function* bootstrap() {
  yield put(fetchFeeds());
  yield put(getProfile());
}
