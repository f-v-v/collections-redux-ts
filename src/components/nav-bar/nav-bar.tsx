import React from 'react';
import './nav-bar.css';
import HeaderUser from '../header-user'
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
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
