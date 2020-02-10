import React from 'react'
import { Ipermissions } from '../../types/permissions'

export interface IItem {
    id: number;
    name: string;
}

export interface IItemPermissions extends IItem, Ipermissions {}

type Props = {
    index:number,
    item:IItemPermissions,
    onEdit: (item:IItem, permissions:Ipermissions) => void //!!!!!
}

const ItemPermissions:React.FC<Props> = (props) => {
    // console.log('in item-permission')
    const {index, item, onEdit} = props
    const ok:JSX.Element = <i className="fa fa-check-square-o"></i>
    const not:JSX.Element = <i className="fa fa-minus-square-o"></i>

    const tmpItem:IItem = { //!!!!!!!!!!!
        id:item.id,
        name:item.name,
    }
    const tmpPermission:Ipermissions = {
        use: item.use,
        edit: item.edit,
        own: item.own
    }
    const handlEdit = ():void => {
        onEdit (tmpItem, tmpPermission)
    }
    return(
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
                onClick={handlEdit}//!!!!!!
                >Редактировать</button>
            </div>
        </div>
    )
            
}
// для понимания почему не работал Memo.
// без использования useCallback в вызывающем компоненье(по цепочке)
// prevProps.onEdit был всегда !== nextProps.onEdit.
// function areEqual(prevProps:Props, nextProps:Props) {
    // const rin: boolean= prevProps.index === nextProps.index
    // const ri: boolean= prevProps.item === nextProps.item
    // const rf: boolean= prevProps.onEdit === nextProps.onEdit
    // console.log('rin=', rf)
    // console.log('ri=', ri)
    // console.log('rfp=', prevProps.onEdit)
    // console.log('rfn=', nextProps.onEdit)
    
    // return ri && rin
// }
// export default React.memo(ItemPermissions, areEqual) //не дает эффекта...

export default React.memo(ItemPermissions)