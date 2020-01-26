import React from 'react';
import './nav-bar.css';
import HeaderUser from '../header-user'
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //     <HeaderUser />
      //   <div className="collapse navbar-collapse" id="navbarNav">
      //     <ul className="navbar-nav">
      //       <li className="nav-item active">
      //         <Link to="/" className="nav-link" href="/">Home <span className="sr-only">(current)</span></Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link to ="/login" className="nav-link" href="/">Features</Link>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
      <header className="header" >
            <ul className="d-flex justify-content-center">
                <li>
                <HeaderUser />
                </li>
                <li>
                    <Link to="/">HOME</Link> 
                </li>
                <li>
                    <Link to="/login">Login</Link> 
                </li>
                <li>
                    <Link to="/collections">Коллекции</Link> 
                </li>
  
            </ul>
            
        </header>

    )
}

export default NavBar;
