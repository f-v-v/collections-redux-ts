import React from 'react';
import NavBar from './components/nav-bar'
import './App.css';
import ItemList from './components/item-list/item-list';
import { ICollection } from './interfeices/collection';


const App: React.FC = () => {
  const collections:ICollection[] = [
    {
      id:1,
      name:'Коллекция 1',
      type:1,
      questions:5,
      use: true,
      edit: false,
      own:true,
      active:true
    },
    {
      id:2,
      name:'Коллекция 2',
      type:1,
      questions:5,
      use: true,
      edit: true,
      own:false,
      active:true
    },
    {
      id:3,
      name:'Коллекция 3',
      type:1,
      questions:5,
      use: true,
      edit: true,
      own:true,
      active:false
    },
  
  ]
  return (
    // <nav>
    //   <div className="nav-wrapper  blue darken-3">
    //     <a href="#" className="brand-logo">Logo</a>
    //     <ul className="right hide-on-med-and-down">
    //       <li><a href="/">Sass</a></li>
    //       <li><a href="/">Components</a></li>
    //     </ul>
    //   </div>
    // </nav>
    <>
      <NavBar />
      <ItemList collections={collections} />
    </>
    
  );
}

export default App;
