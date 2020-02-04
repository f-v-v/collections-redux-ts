import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { IStateUsersCollection } from '../../reducers/users-collection'
import { IAppState } from '../../reducers'
import { connect } from 'react-redux'
import {
    usersCollectionRequested,
    fetchModifyUsersCollection,
    // getAllUsersCollection,
    // ModifyUserPermission
} from '../../actions/users-collection'
import SelectedCollection from '../selected-collection'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import { ModalCollectionPermission } from '../modal-collection-permission/modal-collection-permission'
import { IUser } from '../../types/user'
import { Ipermissions } from '../../types/permissions'
import { ICollection } from '../../types/collection'
import { userCollectionActionTypes } from '../../types/actions-users-collection'

// type ownProps = {
//     // idCollection: number
// }

interface RouteParams {
    id: string
}
type Props = LinkStateProps & LinkDispatchProps;

const CollectionPermission:React.FC<Props> = (props) => {
    const {usersCollection:{isLoading, users, error, selectedCollection},
    usersCollectionRequested, fetchModifyUsersCollection
        } = props
    const ok:JSX.Element = <i className="fa fa-check-square-o"></i>
    const not:JSX.Element = <i className="fa fa-minus-square-o"></i>

    const defaultUser:IUser = {
        id:0,
        name:'',
    }
    const defaultPermissions:Ipermissions = {
        use: true,
        edit: false,
        own: false
    }
    
    const history = useHistory()
    
    const {id} = useParams<RouteParams>();
    const idCollection = parseInt(id)

    const [showModal, setShowModal] = useState(false)
    const [currUser, setCurrUser] =useState(defaultUser)
    const [currPermissions, setCurrPermissions] =useState(defaultPermissions)
    useEffect(() => {
        if (isNaN(idCollection)) {
            // history.push('/error')
            history.replace('/error');
        }
        usersCollectionRequested(idCollection)
    }, [idCollection])
    const handlEdit = (user:IUser, permissions:Ipermissions):void => {
        console.log('in hadlEdit user', user)
        console.log('in hadlEdit permission', permissions)
        setCurrUser(user)
        setCurrPermissions(permissions)
        console.log('in hadlEdit curUser', currUser)
        console.log('in hadlEdit curPermission', currPermissions)
        setShowModal(true)
    }
    const handlShowModalClose = () => {
        // setCurrUser(defaultUser)
        // setCurrPermissions(defaultPermissions)
        
        setShowModal(false)
    }
    const handlSave = (collection:ICollection, user:IUser, permissions: Ipermissions):void => {
        // editUserCollection(collection, user, permissions)
        fetchModifyUsersCollection(user, collection, permissions)
        setShowModal(false)
    }

    if (isLoading) {
        return <Spinner />
    }
    
    if (error) {
        return <ErrorIndicator error={error} />
    }
    return (
        <>
        <SelectedCollection collection={selectedCollection}/>
        <ul className="list-group">
            <div className="container-fluid">
            <li className={"list-group-item"}>
                        <div className="row">
                            <div className="col-sm-1">Индекс</div>
                            <div className="col-sm-3 align-middle"><span className="align-middle">Имя</span></div>
                            <div className="col-sm-2 align-middle"><span className="align-middle">Использование</span></div>
                            <div className="col-sm-2 align-middle"><span className="align-middle">Редактирование</span></div>
                            <div className="col-sm-2 align-middle"><span className="align-middle">Владение</span></div>
                            
                        </div>
                    </li>
            {users.map((item, index) => {
                const tmpUser:IUser = {
                    id:item.id,
                    name:item.name,
                }
                const tmpPermission:Ipermissions = {
                    use: item.use,
                    edit: item.edit,
                    own: item.own
                }
                return(
                    <li className={"list-group-item"} key={item.id}>
                        {/* <div className={"row" + (item.active?"":" bg-danger")}> */}
                        <div className="row">
                            <div className="col-sm-1">{index}</div>
                            <div className="col-sm-3 "><span className="align-middle">{item.name}</span></div>
                            <div className="col-sm-2 align-middle">{item.use?ok:not}</div>
                            <div className="col-sm-2 align-middle">{item.edit?ok:not}</div>
                            <div className="col-sm-2 align-middle">{item.own?ok:not}</div>
                            
                            <div className="col-sm-2">
                                <button 
                                type="button" 
                                className="btn btn-primary btn-sm " 
                                onClick={() => handlEdit (tmpUser, tmpPermission)}
                                >Редактировать</button>
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
                        onClick={() => handlEdit (defaultUser, defaultPermissions)}    
                    >Добавить</button>
                </div>
            </div>
        </div>
        <ModalCollectionPermission 
            onClose={handlShowModalClose} 
            show={showModal}
            onSave={handlSave}
            collection={selectedCollection!} // разобраться
            user={currUser}
            permission={currPermissions}
        />
        </>
    )
}

interface LinkStateProps {
    usersCollection:IStateUsersCollection;
}
interface LinkDispatchProps {
    usersCollectionRequested:(id:number) => userCollectionActionTypes;
    fetchModifyUsersCollection:(
        user:IUser, 
        collection:ICollection, 
        permissions: Ipermissions) => userCollectionActionTypes
    // getAllUsersCollection: (id:number) => void;
    // ModifyUserPermission: (user: IUser, collection: ICollection, permissions: Ipermissions) => void
}

const mapStateToProps = ({usersCollection}:IAppState) => ({
    usersCollection,
});
   
const mapDispatchToProps = {
    usersCollectionRequested,
    fetchModifyUsersCollection,
    // getAllUsersCollection,
    // ModifyUserPermission
};

export default connect(mapStateToProps, mapDispatchToProps) (CollectionPermission)