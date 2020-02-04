import { call, put, select, takeEvery} from 'redux-saga/effects'
import {
    getUsersByIdCollection, 
    getCollectionById,
    addEditPermissionsByUserCollection
} from '../services/service'
import { 
    FETCH_USERS_COLLECTION_REQUEST,
    FETCH_MODIFY_USERS_COLLECTION,
    fetchModifyUsersCollectionAction,
    usersCollectionRequested,
} from "../types/actions-users-collection";
import {
        usersCollectionLoaded,
        usersCollectionError,        
        setSelectedCollections,
        usersCollectionEdit,
        usersCollectionAdd,
} from '../actions/users-collection'
import { IAppState } from '../reducers';
import { ICollection } from '../types/collection';
import { IUserCollection } from '../types/users-collection';


function* fetchUsersCollection(action:usersCollectionRequested) {
    try {
        const currCollection:ICollection = yield call(getCollectionById, action.payload)
        yield put(setSelectedCollections(currCollection))
        const usersCollection:IUserCollection[] = yield call(getUsersByIdCollection, currCollection.id);
        yield put(usersCollectionLoaded(usersCollection));
    } catch (e) {
        yield put(usersCollectionError(e.message));
    }
}

function* modifyUsersCollection(action:fetchModifyUsersCollectionAction) {
    try {
        // !!! Всю логику прересмотреть и переделать... 
        const {user, collection, permissions} = action 
        const userCollection:IUserCollection = yield call(
            addEditPermissionsByUserCollection, 
            user, collection, permissions);
        const getCurentUserCollection = (state:IAppState):IUserCollection |undefined =>{
            return state.usersCollection.users.find((item) => {
                return (item.id === userCollection.id)
            })
        }
        const isPresent = yield select(getCurentUserCollection)
        if (isPresent) {
            yield put(usersCollectionEdit(userCollection))
        } else {
            yield put(usersCollectionAdd(userCollection))
        }
    } catch (e) {
        // Определиться с поведением
        yield put(usersCollectionError(e.message));
    }
}

//takeEvery или takeLatest!?
export function* usersCollectionSaga() {
  yield takeEvery(FETCH_USERS_COLLECTION_REQUEST, fetchUsersCollection);
}
export function* modifyUsersCollectionSaga() {
  yield takeEvery(FETCH_MODIFY_USERS_COLLECTION, modifyUsersCollection);
}