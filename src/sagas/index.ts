import { all, fork } from 'redux-saga/effects';
import { usersSaga } from './users';
import { collectionsUserSaga, AddCollectionsUserSaga, EditCollectionsUserSaga } from './collections-user';
import {usersCollectionSaga, modifyUsersCollectionSaga} from './users-collection'

export const rootSaga = function* root() {
  yield all([
      fork(usersSaga),
      fork(collectionsUserSaga),
      fork(AddCollectionsUserSaga),
      fork(EditCollectionsUserSaga),
      fork(usersCollectionSaga),
      fork(modifyUsersCollectionSaga),
    ]);
};