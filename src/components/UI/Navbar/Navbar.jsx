import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className='navbar__links'>
                <div> <Link to='/'>Home</Link></div>
                <div> <Link to='/about'>About</Link></div>
                <div> <Link to='/posts'>Posts</Link></div>



            </div>
        </div>
    );
};

export default Navbar;