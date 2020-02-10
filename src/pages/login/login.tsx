import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {UsersRequesting} from '../../actions/users'
import {setLoggedUser} from '../../actions/logged-user'
import {IAppState} from '../../reducers'
import Spinner from '../../components/spinner'
import ErrorIndicator from '../../components/error-indicator'
import { IUser } from '../../types/user'
import SelectUser from '../../components/select-user/select-user'

type Props = {}

const Login: React.FC<Props> = () => {

    const [currentUser, setCurrentUser] = useState<IUser | '0'>('0');
    const hadleSelectChange = (user:IUser):void => {
        setCurrentUser(user)
    }

    const handleSetUser = () => {
        if (currentUser === '0') {return}
        dispatch(setLoggedUser(currentUser))
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(UsersRequesting());    
    }, [])
    const isLoading = useSelector<IAppState, boolean>(state => state.users.isLoading) 
    const error = useSelector<IAppState, string|null>(state => state.users.error) 

    if (isLoading) {
        return <Spinner />
    }
    
    if (error) {
        return <ErrorIndicator error={error} />
    }
    return (
        // <div className ="jumbotron jumbotron-fluid">
            <div className ="container">
                <SelectUser 
                    disable={false} 
                    onChangeUser={hadleSelectChange} 
                    current={currentUser !== '0'?currentUser.id:'0'}
                />
                <div className ="form-group">
                    <button onClick={handleSetUser} className="btn btn-primary">Login</button>
                </div>
            </div>
        // </div>
    )
}

export default Login;