import React, { useState, useEffect } from 'react'
import { ICollection } from '../../types/collection'
import { IUser } from '../../types/user'
import { Ipermissions } from '../../types/permissions'
import SelectUser from '../select-user'

type Props = {
    collection: ICollection,
    user:IUser,
    permission:Ipermissions
    onSave: (collection:ICollection, user: IUser, permissions: Ipermissions) => void
    onClose: () => void
}

export const CollectionUserpermissions: React.FC<Props > = ({
            collection,
            user,
            permission,
            onSave, 
            onClose,

        }) => {
    const [use, setUse] =useState(permission.use)
    const [edit, setEdit] =useState(permission.edit)
    const [own, setOwn] =useState(permission.own)
    const [userState, setUserState ] =useState<IUser>(user)
    
    useEffect(()=> {
        setUse(permission.use)
        setEdit(permission.edit)
        setOwn(permission.own)
        setUserState(user)
    }, [permission])
    
    const handlUse = (e: React.FormEvent<HTMLInputElement>): void => {
        setUse(e.currentTarget.checked)
    }
    const handlEdit = (e: React.FormEvent<HTMLInputElement>): void => {
        setEdit(e.currentTarget.checked)
    }
    const handlOwn = (e: React.FormEvent<HTMLInputElement>): void => {
        setOwn(e.currentTarget.checked)
    }
    const handlSelectUser = (user:IUser): void => {
        setUserState(user)
    }
    const handlSave = (): void => {
        const state = {
            use,
            edit,
            own
        }
        onSave(collection, userState, state)
    }
    const handlClose = (e: React.FormEvent<HTMLButtonElement>):void => {
        e.preventDefault() //если спользовал onCLose на прямую, почему-то первый раз происходит перезагрузка страницы!
        onClose()
    }

    return (
        <form>
            <div className="form-group row">
                <div className="col-sm-10">
                <input type="text" 
                    disabled 
                    className="form-control-plaintext" 
                    value="Разрешения на коллекцию для пользователя:"
                />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Коллекция</label>
                <div className="col-sm-10">
                <input type="text" 
                    disabled 
                    className="form-control-plaintext" 
                    value={collection.name}
                />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Пользователь</label>
                <div className="col-sm-10">
                <SelectUser 
                    onChangeUser={handlSelectUser} 
                    disable={user.id !== 0? true: false}
                    current={user.id === 0? "0": user}
                />
                {/* <input type="text" 
                    disabled 
                    className="form-control-plaintext" 
                    value={user.name}
                /> */}
                </div>
            </div>
            <div className="form-group row">
            <div className="col-sm-2">Использование</div>
            <div className="col-sm-10">
                <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={use} 
                    onChange={handlUse}    
                />
                <label className="form-check-label" >
                    Разрешение для использования
                </label>
                </div>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-sm-2">Редактирование</div>
            <div className="col-sm-10">
                <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={edit} 
                    onChange={handlEdit}    
                />
                <label className="form-check-label" >
                    Разрешение для редактирования
                </label>
                </div>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-sm-2">Владение</div>
            <div className="col-sm-10">
                <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={own} 
                    onChange={handlOwn}    
                />
                <label className="form-check-label" >
                    Разрешение для владения
                </label>
                </div>
            </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-2">
                    <button 
                        className="btn btn-primary"
                        onClick={handlSave}
                    >Сохранить</button>
                </div>
                <div className="col-sm-2">
                    <button 
                        className="btn btn-primary"
                        onClick={handlClose}
                    >Закрыть</button>
                </div>
            </div>
        </form>
      )
}
