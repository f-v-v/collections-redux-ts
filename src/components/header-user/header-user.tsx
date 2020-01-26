import React from 'react'
import { IAppState } from '../../reducers'
import { connect } from 'react-redux'
import { IUser } from '../../types/user'

type Props = LinkStateProps

export const HeaderUser:React.FC <Props> = (props) => {
    const userName:string = props.user === null ? "Вход не выполнен": props.user.name
    return (
        <div>
            <span className="navbar-text">{userName} </span>
        </div>
    )
}

interface LinkStateProps {
    user:IUser | null;
 }
const mapStateToProps = ({loggedUser:{loggedUser}}:IAppState) => ({
    user: loggedUser,
});

export default connect(mapStateToProps)(HeaderUser);
