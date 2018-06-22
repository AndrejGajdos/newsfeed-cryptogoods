import { all, fork } from 'redux-saga/effects';
import watchFetchFeeds from './feeds.sagas';
import watchAddLike from './likes.sagas';
import watchAddComment from './comments.sagas';
import watchGetProfile from './profile.sagas';
import bootstrap from './bootstrap';

export default function* rootSaga() {
  yield all([
    fork(watchFetchFeeds),
    fork(watchGetProfile),
    fork(bootstrap),
    fork(watchAddLike),
    fork(watchAddComment),
  ]);
}

