import React, {useEffect, useState, useCallback} from 'react'
import { IStateCollectionsUser } from '../../reducers/collections-user';
import { IAppState } from '../../reducers';
import {
        collectionsUserRequested,
        fetchAddCollectionsUser,
        fetchEditCollectionsUser,
        // getAllCollectionsUser,
        // editCollectionUser,
        // addCollectionUser
} from '../../actions/collections-user'
import { connect } from 'react-redux';
import { ICollection } from '../../types/collection';
import { collectionUserActionTypes } from '../../types/actions-collections-user';
import CollectionList from './collection-list';

type Props = LinkStateProps & LinkDispatchProps;

const CollectionListContainer: React.FC<Props> = props => {
    const  {collectionsUser:{isLoading, collections, error}, 
            collectionsUserRequested,
            fetchAddCollectionsUser,
            fetchEditCollectionsUser } = props
    const defaultCollection:ICollection = {
        id:0,
        name:'',
        type:1,
        questions:0,
        active:false
    }
    const [showModal, setShowModal] = useState<boolean>(false)

    const [currCollection, setCurrCollection] =useState<ICollection>(defaultCollection)
    
    useEffect(() => {
        // getAllCollectionsUser()
        collectionsUserRequested()
    }, [])

    // const handlEdit = (collection:ICollection):void => {
    //     setCurrCollection(collection)
    //     setShowModal(true)
    // }
    //Что бы работала мемоизация в дочерних компонентах
    const handlEditMemo = useCallback(
        (collection:ICollection) => {
            setCurrCollection(collection)
            setShowModal(true)
        },[]
    )

    const handlSave = (collection:ICollection):void => {
        if (collection.id === 0) {
            fetchAddCollectionsUser(collection)
        } else {
            fetchEditCollectionsUser(collection)
        }
        setShowModal(false)
    }

    const handlShowModalClose = () => {
        setShowModal(false)
    }

    return (
        <CollectionList collections={collections} isLoading={isLoading} isError={error}
                        defaultCollection={defaultCollection} 
                        showModal= {showModal}
                        currCollection={currCollection} 
                        handlEdit={handlEditMemo} 
                        handlSave={handlSave}
                        handlShowModalClose={handlShowModalClose} />
      
    )
}

interface LinkStateProps {
    collectionsUser:IStateCollectionsUser;
}
interface LinkDispatchProps {
    collectionsUserRequested: () => collectionUserActionTypes;
    fetchAddCollectionsUser: (collection:ICollection) => collectionUserActionTypes;
    fetchEditCollectionsUser: (collection:ICollection) => collectionUserActionTypes;
    // getAllCollectionsUser: () => void;
    // editCollectionUser: (collection:ICollection) => void;
    // addCollectionUser: (collection:ICollection) => void;
}

const mapStateToProps = ({collectionsUser}:IAppState) => ({
    collectionsUser,
});
   
const mapDispatchToProps = {
    collectionsUserRequested,
    fetchAddCollectionsUser,
    fetchEditCollectionsUser,
    // getAllCollectionsUser,
    // addCollectionUser,
    // editCollectionUser
};

export default connect(mapStateToProps, mapDispatchToProps) (CollectionListContainer)