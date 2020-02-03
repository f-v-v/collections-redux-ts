import React, {useEffect, useState} from 'react'
// import {ICollectionUser} from '../../types/collections-user'
import { IStateCollectionsUser } from '../../reducers/collections-user';
import { IAppState } from '../../reducers';
import {getAllCollectionsUser,
        editCollectionUser,
        addCollectionUser
} from '../../actions/collections-user'
import { connect } from 'react-redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { ICollection } from '../../types/collection';
import { ModalCollection } from '../modal-collection';
import { useHistory } from 'react-router-dom';

type Props = LinkStateProps & LinkDispatchProps;

const ItemList: React.FC<Props> = props => {
    const  {collectionsUser:{isLoading, collections, error}, 
            getAllCollectionsUser,
            addCollectionUser,
            editCollectionUser } = props
    const defaultCollection:ICollection = {
        id:0,
        name:'',
        type:1,
        questions:0,
        active:false
    }
    const [showModal, setShowModal] = useState(false)

    const [currCollection, setCurrCollection] =useState(defaultCollection)
    
    useEffect(() => {
        getAllCollectionsUser()
    }, [])

    const history = useHistory()
    const handlEdit = (collection:ICollection):void => {
        setCurrCollection(collection)
        setShowModal(true)
    }

    const handlSave = (collection:ICollection):void => {
        if (collection.id === 0) {
            addCollectionUser(collection)
        } else {
            editCollectionUser(collection)
        }
        setShowModal(false)
    }

    const handlShowModalClose = () => {
        setShowModal(false)
    }

    const handlPermission = (id:number) => {
        history.push(`collections/${id}`)
    }

    if (isLoading) {
        return <Spinner />
    }
    
    if (error) {
        return <ErrorIndicator error={error} />
    }

    return (
        <>
        <ul className="list-group">
            <div className="container-fluid">
            {collections.map((item, index) => {
                const tmpCollection:ICollection = {
                    id:item.id,
                    name:item.name,
                    type:item.type,
                    questions:item.questions,
                    active:item.active,
                }
                return(
                    <li className={"list-group-item" + (item.active?"":" bg-danger")} key={item.id}>
                        {/* <div className={"row" + (item.active?"":" bg-danger")}> */}
                        <div className="row">
                            <div className="col-sm-1">{index}</div>
                            <div className="col-sm-3 "><span className="align-middle">{item.name}</span></div>
                            <div className="col-sm-1 align-middle">{item.type}</div>
                            <div className="col-sm-1">{item.questions}</div>
                            
                            <div className="col-sm-2">
                                <button 
                                type="button" 
                                className="btn btn-primary btn-sm " 
                                onClick={() => handlEdit (tmpCollection)}
                                disabled={!item.edit}
                                >Редактировать</button>
                            </div>
                            <div className="col-sm-2">
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {handlPermission(item.id)}}
                                    disabled={!item.own}
                                >Разрешения</button>
                            </div>
                            <div className="col-sm-2">
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-sm"
                                >Состав</button>
                            </div>
                        </div>
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

interface LinkStateProps {
    collectionsUser:IStateCollectionsUser;
}
interface LinkDispatchProps {
    getAllCollectionsUser: () => void;
    editCollectionUser: (collection:ICollection) => void;
    addCollectionUser: (collection:ICollection) => void;
}

const mapStateToProps = ({collectionsUser}:IAppState) => ({
    collectionsUser,
});
   
const mapDispatchToProps = {
    getAllCollectionsUser,
    addCollectionUser,
    editCollectionUser
    
};

export default connect(mapStateToProps, mapDispatchToProps) (ItemList)