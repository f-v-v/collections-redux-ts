import { call, put, takeEvery } from 'redux-saga/effects'
import {getAllUsers} from '../services/service'
import { 
    FETCH_USERS_REQUESTING
} from "../types/actions-users";
import {UsersRequested, UsersLoaded, UsersError} from '../actions/users'
import { IUser } from '../types/user';


function* fetchUser() {
    try {
        yield put(UsersRequested());  
        const users:IUser[] = yield call(getAllUsers);
        yield put(UsersLoaded(users));
    } catch (e) {
        yield put(UsersError(e.message));
    }
}

//takeEvery или takeLatest!?
export function* usersSaga() {
  yield takeEvery(FETCH_USERS_REQUESTING, fetchUser);
}