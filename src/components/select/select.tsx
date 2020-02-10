import React from 'react'
import { IUser } from '../../types/user'
import { ICollection } from '../../types/collection'
import Option from './option'

type Item = IUser | ICollection
// Разобраться с типами!!! Как сделать универсальный селект??!!
interface Props <T> {
    items:T[]
    onChangeUser: (id:number) => void, 
    disable?: boolean,
    current?: number | '0'
}

const Select: React.FC<Props<Item>> = (props) => {
    // console.log('i in select')
    const {items, onChangeUser, disable = false, current = '0'} = props;

    const hadleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
        onChangeUser(parseInt (e.currentTarget.value))
    }

    return(
        <div className ="form-group">
            <select 
                className ={"form-control"} 
                onChange={hadleSelectChange}
                value={current}
                disabled={disable}
            >
                <option value="0" disabled>Выбирите пользователя ...</option>
                {
                    items.map (item => {
                        return <Option key={item.id} id={item.id} name={item.name}/>
                    })
                }
            </select>
        </div>

    )
}

export default Select;