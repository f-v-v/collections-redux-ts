import { ICollectionUser } from "../types/collections-user"
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {IStateCollectionsUser} from "../reducers/collections-user"
import { 
  CollectionActionTypes,
  FETCH_COLLECTIONS_FAILURE,
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS      
} from "../types/actions-collections";
import {getCollectionsByIdUser} from '../services/service'

const idUser = 1; 


type ThunkResult<R> = ThunkAction<R, IStateCollectionsUser, undefined, CollectionActionTypes>;

const CollectionsUserRequested = ():CollectionActionTypes => {
    return {type: FETCH_COLLECTIONS_REQUEST }
};

const CollectionsUserLoaded = (collections:ICollectionUser[]):CollectionActionTypes => {
    return {
        type: FETCH_COLLECTIONS_SUCCESS,
        payload: collections
    }
};
const CollectionsUserError = (error:string):CollectionActionTypes => {
    return {
        type: FETCH_COLLECTIONS_FAILURE,
        payload:error
    }
};

export const getAllCollectionsUser = (idUser:number):ThunkResult<void> => (dispatch) => {
    dispatch(CollectionsUserRequested());
    getCollectionsByIdUser(idUser).then (
        (collections) => dispatch(CollectionsUserLoaded(collections)), 
        (error) => dispatch(CollectionsUserError(error.message))
    )
}

