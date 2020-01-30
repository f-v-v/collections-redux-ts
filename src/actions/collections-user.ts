import { ICollectionUser } from "../types/collections-user"
import { ThunkAction } from 'redux-thunk'
// import {IStateCollectionsUser} from "../reducers/collections-user"
import {IAppState} from '../reducers'
import { 
  collectionUserActionTypes,
  FETCH_COLLECTIONS_USER_FAILURE,
  FETCH_COLLECTIONS_USER_REQUEST,
  FETCH_COLLECTIONS_USER_SUCCESS,
  ADD_COLLECTIONS_USER,
  EDIT_COLLECTIONS_USER      
} from "../types/actions-collections-user";
import {getCollectionsByIdUser, 
        addCollectionByIdUser,
        editCollections
    } from '../services/service'
import { ICollection } from "../types/collection";
import { Action } from "redux";
// import {Action} from 'redux'


// type ThunkResult<R> = ThunkAction<R, IAppState, undefined, collectionUserActionTypes>;
type ThunkResult<R> = ThunkAction<R, IAppState, undefined, Action>;
// type MyThunkDispatch = ThunkDispatch<IAppState, undefined, Action>;

const collectionsUserRequested = ():collectionUserActionTypes => {
    return {type: FETCH_COLLECTIONS_USER_REQUEST }
};

const collectionsUserLoaded = (collections:ICollectionUser[]):collectionUserActionTypes => {
    return {
        type: FETCH_COLLECTIONS_USER_SUCCESS,
        payload: collections
    }
};
const collectionsUserError = (error:string):collectionUserActionTypes => {
    return {
        type: FETCH_COLLECTIONS_USER_FAILURE,
        payload:error
    }
};
const collectionsUserAdd = (collection:ICollectionUser):collectionUserActionTypes => {
    return {
        type: ADD_COLLECTIONS_USER,
        payload:collection
    }
};
const collectionsUserEdit = (collection:ICollection):collectionUserActionTypes => {
    return {
        type: EDIT_COLLECTIONS_USER,
        payload:collection
    }
};

export const getAllCollectionsUser = ():ThunkResult<void> => (dispatch, getState) => {
    const idUser:number|undefined = getState().loggedUser.loggedUser?.id
    if (!idUser) return // если залогиненный user = undefined пока ничего не делаем!
    dispatch(collectionsUserRequested());
    getCollectionsByIdUser(idUser).then (
        (collections) => dispatch(collectionsUserLoaded(collections)), 
        (error) => dispatch(collectionsUserError(error.message))
    )
}

// Подумать нужно ли тут использовать isLoading и error??!!
export const addCollectionUser = (collection:ICollection):ThunkResult<void> => (dispatch, getState) => {
    const idUser:number|undefined = getState().loggedUser.loggedUser?.id
    if (!idUser) return // если залогиненный user = undefined пока ничего не делаем!
    const {id:idCollection, ...collection_}=collection
    addCollectionByIdUser(idUser, collection_).then(
        (collectionUser) => dispatch(collectionsUserAdd(collectionUser)),
        (error:Error) => dispatch(collectionsUserError(error.message))
    )
}

// Подумать нужно ли тут использовать isLoading и error??!!
export const editCollectionUser = (collection:ICollection):ThunkResult<void> => (dispatch) => {
    return editCollections(collection).then(
        (item) => dispatch(collectionsUserEdit(item)),
        (error:Error) => dispatch(collectionsUserError(error.message))
    )
}
