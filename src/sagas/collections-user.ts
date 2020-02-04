import { call, put, select, takeEvery} from 'redux-saga/effects'
import {getCollectionsByIdUser, 
        addCollectionByIdUser,
        editCollections} from '../services/service'
import { 
    FETCH_COLLECTIONS_USER_REQUEST,
    FETCH_ADD_COLLECTIONS_USER,
    FETCH_EDIT_COLLECTIONS_USER,
    fetchAddCollectionsUserAction,
    fetchEditCollectionsUserAction,
} from "../types/actions-collections-user";
import {
        collectionsUserLoaded,
        collectionsUserError,
        collectionsUserAdd,
        collectionsUserEdit,
} from '../actions/collections-user'
import { IUser } from '../types/user';
import { ICollectionUser } from '../types/collections-user';
import { IAppState } from '../reducers';


function* fetchCollectionsUser() {
    try {
        // yield put(UsersRequested());
        type typeGetLoggedUsers = (state:IAppState) => IUser|null 
        const getLoggedUsers:typeGetLoggedUsers = (state:IAppState) => state.loggedUser.loggedUser
        //тут разобраться !! проверка на null?!
        const loggedUser:IUser = yield select (getLoggedUsers)
        const collections:ICollectionUser[] = yield call(getCollectionsByIdUser, loggedUser.id);
        yield put(collectionsUserLoaded(collections));
    } catch (e) {
        yield put(collectionsUserError(e.message));
    }
}

function* editCollectionsUser(action:fetchAddCollectionsUserAction) {
    try {
        const collection:ICollectionUser = yield call(editCollections, action.payload);
        yield put(collectionsUserEdit(collection));
    } catch (e) {
        // Определиться с поведением
        yield put(collectionsUserError(e.message));
    }
}

function* addCollectionsUser(action:fetchEditCollectionsUserAction) {
    try {
        const getLoggedUsers = (state:IAppState):IUser|null => state.loggedUser.loggedUser
        //тут разобраться !! проверка на null?!
        const {id:idCollection, ...collection_}=action.payload
        const loggedUser:IUser = yield select (getLoggedUsers)
        const collection:ICollectionUser = yield call(addCollectionByIdUser, loggedUser.id, collection_);
        yield put(collectionsUserAdd(collection));
    } catch (e) {
        // Определиться с поведением
        yield put(collectionsUserError(e.message));
    }
}

//takeEvery или takeLatest!?
export function* collectionsUserSaga() {
  yield takeEvery(FETCH_COLLECTIONS_USER_REQUEST, fetchCollectionsUser);
}
export function* AddCollectionsUserSaga() {
  yield takeEvery(FETCH_ADD_COLLECTIONS_USER, addCollectionsUser);
}
export function* EditCollectionsUserSaga() {
  yield takeEvery(FETCH_EDIT_COLLECTIONS_USER, editCollectionsUser);
}