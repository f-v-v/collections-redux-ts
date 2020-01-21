import React from 'react';
import NavBar from './components/nav-bar'
import './App.css';
import Login from './components/login/';
// import ItemList from './components/item-list/item-list';
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
      <Login />
      {/* <ItemList collections={collections} /> */}
    </>
    
  );
}

export default App;
