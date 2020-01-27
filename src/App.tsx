import React from 'react';
import NavBar from './components/nav-bar'
import './App.css';
import Login from './components/login/';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home'
import ItemList from './components/item-list/item-list';
// import { ICollectionUser } from './types/collections-user';


const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/login" component={Login} />
          <Route path="/collections" component={ItemList} />
        </Switch>
      </div>
    </>
  );
}

export default App;
