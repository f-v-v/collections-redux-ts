import React from 'react'
import { IUser } from '../../types/user'
import { Ipermissions } from '../../types/permissions'
import { IUserCollection } from '../../types/users-collection'

interface IItem {
    id: number;
    name: string;
}

interface IItemPermissions extends IItem, Ipermissions {}

type Props = {
    items:IItemPermissions [],
    onEdit: (item:IItem, permissions:Ipermissions) => void //!!!!!
}

export const ItemsPermissions:React.FC<Props> = (props) => {
    const {items, onEdit} = props
    const ok:JSX.Element = <i className="fa fa-check-square-o"></i>
    const not:JSX.Element = <i className="fa fa-minus-square-o"></i>
    
    // const handlEdit = (user:IUser, permissions:Ipermissions):void => {
    // }
    const handlEdit = (item:IItem, permissions:Ipermissions):void => {
        onEdit(item, permissions)
    }
    return (
        <>
        {/* <SelectedCollection collection={selectedCollection}/> */}
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
            {items.map((item, index) => {
                const tmpItem:IItem = { //!!!!!!!!!!!
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
                                onClick={() =>handlEdit (tmpItem, tmpPermission)}//!!!!!!
                                >Редактировать</button>
                            </div>
                        </div>
                    </li>
                )
            })
            }
            </div>
        </ul>
        </>
    )
}
