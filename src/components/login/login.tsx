import React from 'react'
import { connect } from 'react-redux'
import {getUsers} from '../../actions/users'
import {setLoggedUser} from '../../actions/logged-user'
import {IAppState} from '../../reducers'
import {IStateUsers} from '../../reducers/users'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import { IUser } from '../../types/user'

// type ownProps = {
//     label: string;
// };
  
type State = {currentUser: IUser | undefined };
type Props = LinkStateProps & LinkDispatchProps;

class Login extends React.Component <Props, State> {
    
    readonly state: State = {
        currentUser:undefined,
    };

    hadleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const id:number = parseInt (e.currentTarget.value)
        const user:IUser | undefined = this.props.users.users.find(item => item.id === id)

        this.setState({currentUser: user})
    }

    handleSetUser = () => {
        const curUser = this.state.currentUser
        if (!curUser) {return}
        this.props.setLoggedUser(curUser)
    }

    componentDidMount = () => {
        this.props.getUsers();    
    }
    
    render () {
        const {users:{isLoading, users, error}} = this.props;
        const options:JSX.Element[] = users.map ((user) => {
            
            return <option key={user.id} value={user.id}>{user.name}</option>
        }
        )
     
        if (isLoading) {
            return <Spinner />
        }
        
        if (error) {
            return <ErrorIndicator error={error} />
        }
        return (
            // <div className ="jumbotron jumbotron-fluid">
                <div className ="container">
                    <div className ="form-group">
                        {/* <label for="exampleFormControlSelect1">Example select</label> */}
                        {/* <select className ="form-control" id="exampleFormControlSelect1"> */}
                        <select className ="form-control" defaultValue={'DEFAULT'} onChange={this.hadleSelectChange}>
                            <option value="DEFAULT" disabled>Выбирите пользователя ...</option>
                            {options}
                        </select>
                    </div>
                    <div className ="form-group">
                        <button onClick={this.handleSetUser} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            // </div>
        )
    }
}

interface LinkStateProps {
   users:IStateUsers;
}
interface LinkDispatchProps {
    getUsers: () => void;
    setLoggedUser: (user:IUser) => void;
}

const mapStateToProps = ({users}:IAppState) => ({
    users,
  });
  
  const mapDispatchToProps = {
    getUsers,
    setLoggedUser,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Login);

  // export default Login