import React from 'react'
import { connect } from 'react-redux'
import {getUsers} from '../../actions/users'
import {IAppState} from '../../reducers'
import {IStateUsers} from '../../reducers/users'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

// type ownProps = {
//     label: string;
// };
  
type State = {currentUser: number | null };
type Props = LinkStateProps & LinkDispatchProps;

class Login extends React.Component <Props, State> {
    
    readonly state: State = {
        currentUser:null,
    };

    hadleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
        this.setState({currentUser: parseInt (e.currentTarget.value)})
    }

    componentDidMount = () => {
        this.props.getUsers();    
    }
    
    render () {
        const {users:{isLoading, users, error}} = this.props;
        const options:JSX.Element[] = users.map (user => 
            <option key={user.id} value={user.id}>{user.name}</option>
        )
     
        if (isLoading) {
            return <Spinner />
        }
        
        if (error) {
            return <ErrorIndicator error={error} />
        }
        return (
            <div className ="jumbotron jumbotron-fluid">
                <div className ="container">
                    <div className ="form-group">
                        {/* <label for="exampleFormControlSelect1">Example select</label> */}
                        {/* <select className ="form-control" id="exampleFormControlSelect1"> */}
                        <select className ="form-control" onChange={this.hadleSelectChange}>
                            {options}
                        </select>
                    </div>
                    <div className ="form-group">
                        <button onClick={() => {console.log(this.state.currentUser)}} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

interface LinkStateProps {
   users:IStateUsers;
}
interface LinkDispatchProps {
    getUsers: () => void;
}

const mapStateToProps = ({users}:IAppState) => ({
    users,
  });
  
  const mapDispatchToProps = {
    getUsers,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Login);

  // export default Login