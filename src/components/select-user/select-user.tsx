import React from 'react'

import { IUser } from '../../types/user'
import Select from '../select'
import { useSelector } from 'react-redux'
import { IAppState } from '../../reducers'

type Props = {
    onChangeUser: (user:IUser) => void,
    current: number | '0'
    disable: boolean
};
const SelectUser: React.FC<Props> = (props) => {
    const {onChangeUser, current ='0', disable = false} = props;
    const users = useSelector<IAppState, IUser[]>(state => state.users.users)
    const handlChangeUser = (id:number):void => {
        const selectedUser = users.find(item => item.id === id)
        onChangeUser(selectedUser!)
    }
    return(
        <div className ="form-group">
            <Select items={users} 
            onChangeUser={handlChangeUser} 
            current={current}
            disable={disable} />
        </div>

    )
}

export default SelectUser;