import React from 'react'
import { connect } from 'react-redux'
import {UsersRequesting} from '../../actions/users'
import {setLoggedUser} from '../../actions/logged-user'
import {IAppState} from '../../reducers'
import {IStateUsers} from '../../reducers/users'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import { IUser } from '../../types/user'
import SelectUser from '../select-user/select-user'
import { loggedUserActionTypes } from '../../types/actions-logged-user'
import { userActionTypes } from '../../types/actions-users'

type State = {currentUser: IUser | undefined };
type Props = LinkStateProps & LinkDispatchProps;

class Login extends React.Component <Props, State> {
    
    readonly state: State = {
        currentUser:undefined,
    };

    hadleSelectChange = (user:IUser) => {
        this.setState({currentUser: user})
    }

    handleSetUser = () => {
        const curUser = this.state.currentUser
        if (!curUser) {return}
        this.props.setLoggedUser(curUser)
    }

    componentDidMount = () => {
        // this.props.getUsers();    
        this.props.UsersRequesting();    
    }
    
    render () {
        const {users:{isLoading, error}} = this.props;
     
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
                        onChangeUser={this.hadleSelectChange} 
                        current="0"
                    />
                    <div className ="form-group">
                        <button onClick={this.handleSetUser} className="btn btn-primary">Login</button>
                    </div>
                    {/* <SelectUser2 
                        disable={false} 
                        onChangeUser={this.hadleSelectChange} 
                        current={this.state.currentUser?.id?this.state.currentUser.id:'0'}
                    /> */}
                </div>
            // </div>
        )
    }
}

interface LinkStateProps {
   users:IStateUsers;
}
interface LinkDispatchProps {
    // getUsers: () => void;
    UsersRequesting: () => userActionTypes;
    setLoggedUser: (user:IUser) => loggedUserActionTypes;
}

const mapStateToProps = ({users}:IAppState) => ({
    users,
  });
  
  const mapDispatchToProps = {
    // getUsers,
    UsersRequesting,
    setLoggedUser,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Login);