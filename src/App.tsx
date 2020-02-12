import React from 'react';
import NavBar from './components/nav-bar'
import './App.css';
import Login from './pages/login';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home'
import CollectionListContainer from './components/collection-list'
import {ConteinerCollectionPermissions} from './components/collection-permission'
import NotFound from './pages/not-found';
import PrivateRoute from './components/private-route'

const App: React.FC = () => {

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/collections" exact component={CollectionListContainer} />
          <PrivateRoute path="/collections/:id" component={ConteinerCollectionPermissions}/>
          <Route path="/error" exact component={NotFound} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
