import React from 'react'
import SelectedCollection from '../selected-collection'
import { ModalCollectionPermission } from '../collection-user-permission'
import { IUser } from '../../types/user'
import { Ipermissions } from '../../types/permissions'
import { ICollection } from '../../types/collection'
import {ItemsPermissions} from '../items-permissions'
import withIsLoadingError from '../../hoc/with-is-loading-error'
import { IUserCollection } from '../../types/users-collection'

interface Props {
    users: IUserCollection[],
    selectedCollection: ICollection |null, // Перенести получение в SelectedCollection?!
    defaultUser:IUser,
    defaultPermissions:Ipermissions,
    showModal: boolean,
    currUser: IUser,
    currPermissions: Ipermissions,
    handlEdit : (user:IUser, permissions:Ipermissions) =>void
    handlSave : (collection:ICollection, user:IUser, permissions: Ipermissions) => void
    handlShowModalClose: () => void
}

const CollectionPermissions:React.FC<Props> = (props) => {
    const {users, selectedCollection,
        defaultUser, defaultPermissions, showModal,
        currUser, currPermissions, 
        handlEdit, handlSave, handlShowModalClose
        } = props

    return (
        <>
        <SelectedCollection collection={selectedCollection}/>
        <ItemsPermissions items={users} onEdit={handlEdit} />
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

export default withIsLoadingError<Props>(CollectionPermissions)