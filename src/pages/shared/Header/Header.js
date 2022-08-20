import { signOut } from "firebase/auth";
import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from './../../../firebase.config';
import './Header.css';
const Header = () => {
    const [user] = useAuthState(auth);

    const handleLogOut = () => {
        signOut(auth);

    }
    return (
        <div className='header'>
            <nav>
                <Link to='/home'>Home</Link>
                <Link to='/services'>Services</Link>
                <Link to='/products'>products</Link>
                {user ?
                    <Button className="m-2" onClick={handleLogOut}>Log out</Button>
                    : <Link to='/login'>Login</Link>
                }
                <Link to='/register'>Register</Link>
                {user && <span>{user.displayName}</span>}
            </nav>
        </div>
    );
};

export default Header;