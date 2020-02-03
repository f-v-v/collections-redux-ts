import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppState } from '../../reducers';
import { IUser } from '../../types/user';
import { isNull } from 'util';

type ownProps = {
    component:any
    // render:() => React.ReactNode
}
type Props = LinkStateProps & ownProps

const PrivateRoute:React.FC<Props> = ({ component: Component, loggedUser, ...rest }) => (
// const PrivateRoute:React.FC<Props> = (props)  => (
  <Route
    {...rest}
    render={props =>
      !isNull(loggedUser) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

interface LinkStateProps {
    loggedUser:IUser | null
}

const mapStateToProps = ({loggedUser:{loggedUser}}:IAppState) => ({
  loggedUser
});

export default connect(mapStateToProps)(PrivateRoute);