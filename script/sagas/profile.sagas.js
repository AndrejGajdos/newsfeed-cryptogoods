import { put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../constants/actionTypes';

const faker = require('faker');

function* getProfile() {
  try {
    yield put({
      type: ActionTypes.PROFILE_SUCCEEDED,
      profile: {
        name: faker.name.findName(),
        img: faker.image.avatar(),
      },
    });
  } catch (e) {
    yield put({ type: ActionTypes.PROFILE_FAILED, message: e.message });
  }
}

export default function* watchGetProfile() {
  yield takeLatest(ActionTypes.PROFILE_REQUESTED, getProfile);
}
