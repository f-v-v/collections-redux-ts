import React from 'react';
import './nav-bar.css';

const NavBar: React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper  blue darken-3">
            <a href="#" className="brand-logo">Logo</a>
            <ul className="right hide-on-med-and-down">
                <li><a href="/">Sass</a></li>
                <li><a href="/">Components</a></li>
            </ul>
            </div>
        </nav>
    )
}

export default NavBar;
