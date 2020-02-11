import React from 'react'
import { ICollection } from '../../types/collection';
import { ModalCollection } from '../collection';
import CollectionItem from './collection-item';
import { ICollectionUser } from '../../types/collections-user';
import withIsLoadingError from '../../hoc/with-is-loading-error';

interface Props {
    collections: ICollectionUser[]
    defaultCollection:ICollection
    showModal:boolean
    currCollection:ICollection
    handlEdit : (collection:ICollection) =>void
    handlSave : (collection:ICollection) => void
    handlShowModalClose: () => void
}

const CollectionList: React.FC<Props> = props => {
    const  {collections, defaultCollection, showModal,
            currCollection, handlEdit, handlSave,
            handlShowModalClose } = props

    return (
        <>
        <ul className="list-group">
            <div className="container-fluid">
                {collections.map((item, index) => {
                    
                    return(
                        <li className={"list-group-item" + (item.active?"":" bg-danger")} key={item.id}>
                            <CollectionItem item={item} 
                                        index={index}
                                        onEdit={handlEdit}
                                        />
                        </li>
                    )
                })
            }
            </div>
        </ul>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-sm"
                        onClick={() => handlEdit (defaultCollection)}    
                    >Добавить</button>
                </div>
            </div>
        </div>
        <ModalCollection 
            onClose={handlShowModalClose} 
            show={showModal}
            onSave={handlSave}
            collection={currCollection}
        />
        </>
      
    )
}

export default withIsLoadingError<Props>(CollectionList)