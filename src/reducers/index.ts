import { combineReducers, Reducer} from 'redux';
// import {CollectionActionTypes} from '../types/actions-collections'
import {IStateCollectionsUser, collectionsUserReducer} from './collections-user'
import {IStateLoggedUser, loggedUserUserReducer} from './logged-user'
import {IStateUsers, usersReducer} from './users'
import {IStateUsersCollection, usersCollectionReducer} from './users-collection'

// !!! Разобраться с combinereducer!!! 

export interface IAppState {
    collectionsUser: IStateCollectionsUser,
    loggedUser: IStateLoggedUser,
    users: IStateUsers,
    usersCollection: IStateUsersCollection
}

export const rootReducer:Reducer<IAppState> = combineReducers<IAppState>({
    collectionsUser: collectionsUserReducer,
    loggedUser: loggedUserUserReducer,
    users: usersReducer,
    usersCollection: usersCollectionReducer
})

// export default rootReducer