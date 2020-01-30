import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {IAppState} from '../../reducers'
import {IStateUsers} from '../../reducers/users'
import { IUser } from '../../types/user'

interface LinkStateProps {
    users:IStateUsers;
}

interface ownProps {
    onChangeUser: (user:IUser) => void, 
    disable: boolean,
    current: IUser | '0'
}

type Props = LinkStateProps & ownProps;
// Продумать работу компонента! Нужен ли внутренний стайт?
const SelectUser: React.FC<Props> = (props) => {
    const {users:{users}, onChangeUser, current} = props;

    const [currentUser, setCurrentUser] = useState<IUser | '0'>(current);
    useEffect(() => {
        setCurrentUser(current)

    }, [current])
    const hadleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const id:number = parseInt (e.currentTarget.value)
        const user:IUser = users.find(item => item.id === id)!
        setCurrentUser(user)
        onChangeUser(user)

    }
    const options:JSX.Element[] = users.map ((user) => {
        return <option key={user.id} value={user.id}>{user.name}</option>
    })
    return(
        <div className ="form-group">
            <select 
                className ={"form-control"} 
                // defaultValue={currentUser !=='0'?currentUser.id:'0'} 
                onChange={hadleSelectChange}
                value={currentUser !=='0'?currentUser.id:'0'}
                disabled={props.disable}
            >
                <option value="0" disabled>Выбирите пользователя ...</option>
                {options}
            </select>
        </div>

    )
}

const mapStateToProps = ({users}:IAppState) => ({
    users,
});

  export default connect(mapStateToProps)(SelectUser);