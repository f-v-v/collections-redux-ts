import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import { IAppState } from '../../reducers';
import { IUser } from '../../types/user';
import { isNull } from 'util';

// Подсмотрено тут https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4-a/47754325#47754325
// Разобраться!!!

// export interface PrivateRouteProps extends RouteProps {
// //   isAuthenticated: boolean;
//   authenticationPath: string;
// }

interface LinkStateProps extends RouteProps{
    loggedUser:IUser | null
}

export const PrivateRoute: React.FC<LinkStateProps> = props => {
  let redirectPath = '';
  if (isNull(props.loggedUser)) {
    redirectPath = '/login/';
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

const mapStateToProps = ({loggedUser:{loggedUser}}:IAppState) => ({
  loggedUser
});
export default connect(mapStateToProps)(PrivateRoute);
// export default PrivateRoute;