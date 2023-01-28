import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';

function Header() {
    return(
        <div className='header'>
            <div className="logo">
                <h1>Notes</h1>
            </div>
            <div className='navbar'>
                <Link to="/"><h1>Home</h1></Link>
                <Link to="/articles"><h1>Articles</h1></Link>
                <Link to="/login"><h1>Login</h1></Link>
            </div>  
      </div>
    )
};

export default Header;