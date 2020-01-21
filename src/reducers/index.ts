import { combineReducers, Reducer, Dispatch  } from 'redux';
// import {CollectionActionTypes} from '../types/actions-collections'
import {IStateCollectionsUser, collectionsUserReducer} from './collections-user'
import {IStateLoggedUser, loggedUserUserReducer} from './logged-user'
import {IStateUsers, usersReducer} from './users'

// !!! Разобраться с combinereducer!!! 

export interface IAppState {
    collectionsUser: IStateCollectionsUser,
    loggedUser: IStateLoggedUser,
    users: IStateUsers
}

export const rootReducer:Reducer<IAppState> = combineReducers<IAppState>({
    collectionsUser: collectionsUserReducer,
    loggedUser: loggedUserUserReducer,
    users: usersReducer
})

// export default rootReducer