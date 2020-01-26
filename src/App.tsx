import React from 'react';
import NavBar from './components/nav-bar'
import './App.css';
import Login from './components/login/';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home'
import ItemList from './components/item-list/item-list';
// import { ICollectionUser } from './types/collections-user';


const App: React.FC = () => {
  // const collections:ICollectionUser[] = [
  //   {
  //     id:1,
  //     name:'Коллекция 1',
  //     type:1,
  //     questions:5,
  //     use: true,
  //     edit: false,
  //     own:true,
  //     active:true
  //   },
  //   {
  //     id:2,
  //     name:'Коллекция 2',
  //     type:1,
  //     questions:5,
  //     use: true,
  //     edit: true,
  //     own:false,
  //     active:true
  //   },
  //   {
  //     id:3,
  //     name:'Коллекция 3',
  //     type:1,
  //     questions:5,
  //     use: true,
  //     edit: true,
  //     own:true,
  //     active:false
  //   },
  
  // ]
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
