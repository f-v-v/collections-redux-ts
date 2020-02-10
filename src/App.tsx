import React from 'react';
import NavBar from './components/nav-bar'
import './App.css';
import Login from './pages/login';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home'
import ItemList from './components/item-list/item-list';
// import CollectionPermission from './components/collection-permission'
import {CollectionPermissions} from './components/collection-permission'
import NotFound from './pages/not-found';
import PrivateRoute from './components/private-route'

const App: React.FC = () => {
  // const defaultProtectedRouteProps: PrivateRouteProps = {
  //   isAuthenticated: false,
  //   authenticationPath: '/login',
  // }

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/collections" exact component={ItemList} />
          <PrivateRoute path="/collections/:id" component={CollectionPermissions}/>
          <Route path="/error" exact component={NotFound} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
